// Exercise the actual Canvas processor in a temporary, headless Chromium profile.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
function compile(file) {
  return ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
}
function load(code, dependencies = {}) {
  const module = { exports: {} };
  new Function("exports", "require", code)(module.exports, (id) => {
    if (!(id in dependencies)) throw new Error(`Unexpected dependency: ${id}`);
    return dependencies[id];
  });
  return module.exports;
}

const dimensionsCode = compile("src/lib/image-resize.ts");
const processorCode = compile("src/lib/image-processor.ts");
const { getResizeDimensions, isValidResizeSize } = load(dimensionsCode);
assert.deepEqual(getResizeDimensions(1920, 1080, { width: 1000, height: 500, keepAspectRatio: false }), { width: 1000, height: 500 });
assert.deepEqual(getResizeDimensions(1920, 1080, { width: 1000, height: 500, keepAspectRatio: true }), { width: 889, height: 500 });
assert.deepEqual(getResizeDimensions(1080, 1920, { width: 1000, height: 500, keepAspectRatio: true }), { width: 281, height: 500 });
for (const [width, height] of [[0, 500], [-1, 500], [1.5, 500], [Infinity, 1], [NaN, 1], [8193, 1], [8192, 8192]]) {
  assert.equal(isValidResizeSize(width, height), false);
  assert.throws(() => getResizeDimensions(1920, 1080, { width, height, keepAspectRatio: false }));
}
assert.equal(isValidResizeSize(1, 1), true);
assert.equal(isValidResizeSize(8000, 4000), true);
assert.throws(() => getResizeDimensions(0, 1080, { width: 1000, height: 500, keepAspectRatio: true }));
console.log("PASS: exact/landscape/portrait sizing, invalid dimensions and output pixel limits");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const browser = candidates.find((candidate) => fs.existsSync(candidate));
assert(browser, "Set CHROME_PATH to a Chromium browser to run the Canvas integration tests.");

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "mediakit-resize-test-"));
async function runBrowserTests() {
  let child;
  let socket;
  try {
  const html = `<!doctype html><html><body><pre id="result">RUNNING</pre><script>
    const load = ${load.toString()};
    const dimensions = load(${JSON.stringify(dimensionsCode)});
    const { resizeImage, convertImageFormat } = load(${JSON.stringify(processorCode)}, { "./image-resize": dimensions });
    function check(value, message) { if (!value) throw new Error(message); }
    async function rejects(action, message) {
      try { await action(); } catch { return; }
      throw new Error(message);
    }
    (async () => {
      const source = document.createElement("canvas");
      source.width = 1920; source.height = 1080;
      const context = source.getContext("2d");
      context.fillStyle = "#1976a8";
      context.fillRect(0, 0, 960, 1080);
      const png = await new Promise(resolve => source.toBlob(resolve, "image/png"));
      const file = new File([png], "source.png", { type: "image/png" });
      const exact = await resizeImage(file, { width: 1000, height: 500, keepAspectRatio: false });
      const bitmap = await createImageBitmap(exact.blob);
      check(bitmap.width === 1000 && bitmap.height === 500, "Encoded PNG must be 1000x500");
      check(exact.width === bitmap.width && exact.height === bitmap.height, "Reported dimensions must match encoded dimensions");
      const output = document.createElement("canvas"); output.width = 1000; output.height = 500;
      const outputContext = output.getContext("2d"); outputContext.drawImage(bitmap, 0, 0); bitmap.close();
      check(outputContext.getImageData(750, 250, 1, 1).data[3] === 0, "PNG transparency must survive resizing");
      check(outputContext.getImageData(250, 250, 1, 1).data[3] === 255, "Image content must survive resizing");
      const fit = await resizeImage(file, { width: 1000, height: 500, keepAspectRatio: true });
      const fitBitmap = await createImageBitmap(fit.blob);
      check(fitBitmap.width === 889 && fitBitmap.height === 500, "Aspect-preserving output must fit target box"); fitBitmap.close();
      for (const mime of ["image/jpeg", "image/webp"]) {
        const blob = await new Promise(resolve => source.toBlob(resolve, mime, 0.9));
        const input = new File([blob], "photo." + (mime === "image/jpeg" ? "jpg" : "webp"), { type: mime });
        const resized = await resizeImage(input, { width: 1000, height: 500, keepAspectRatio: false });
        const decoded = await createImageBitmap(resized.blob);
        check(resized.blob.type === mime, "Must preserve " + mime);
        check(decoded.width === 1000 && decoded.height === 500, "Wrong encoded dimensions for " + mime); decoded.close();
      }
      const enlarged = await resizeImage(file, { width: 2000, height: 1200, keepAspectRatio: false });
      const enlargedBitmap = await createImageBitmap(enlarged.blob);
      check(enlargedBitmap.width === 2000 && enlargedBitmap.height === 1200, "Upscaling must use exact dimensions"); enlargedBitmap.close();
      const gif = new File([Uint8Array.from(atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), c => c.charCodeAt(0))], "pixel.gif", { type: "image/gif" });
      const fallback = await resizeImage(gif, { width: 20, height: 10, keepAspectRatio: false });
      check(fallback.blob.type === "image/png", "GIF must export a static PNG");
      await rejects(() => resizeImage(file, { width: 0, height: 500, keepAspectRatio: false }), "Invalid dimensions must fail");
      await rejects(() => resizeImage(new File(["invalid"], "broken.png", { type: "image/png" }), { width: 1000, height: 500, keepAspectRatio: false }), "Corrupt input must fail");
      const converted = await convertImageFormat(file, "jpg");
      const convertedBitmap = await createImageBitmap(converted);
      check(converted.type === "image/jpeg" && convertedBitmap.width === 1920 && convertedBitmap.height === 1080, "Existing conversion must retain source dimensions"); convertedBitmap.close();
      document.getElementById("result").textContent = "PASS: actual Canvas PNG/JPG/WebP resizing, alpha/content, exact 1000x500, aspect fit, upscaling, GIF fallback, invalid/corrupt input and existing format conversion";
    })().catch(error => document.getElementById("result").textContent = "FAIL: " + error.message);
  </script></body></html>`;
  const input = path.join(temp, "test.html");
  fs.writeFileSync(input, html);
  child = spawn(browser, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--disable-background-networking", "--remote-debugging-port=0", "--user-data-dir=" + path.join(temp, "profile"), "about:blank"], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
  let browserError;
  child.on("error", (error) => { browserError = error; });
  const devtoolsFile = path.join(temp, "profile", "DevToolsActivePort");
  const deadline = Date.now() + 30000;
  const pause = () => new Promise(resolve => setTimeout(resolve, 100));
  while (!fs.existsSync(devtoolsFile)) {
    if (browserError) throw browserError;
    assert(Date.now() < deadline && child.exitCode === null, "Headless browser could not start");
    await pause();
  }
  const [port, endpoint] = fs.readFileSync(devtoolsFile, "utf8").trim().split(/\r?\n/);
  socket = new WebSocket(`ws://127.0.0.1:${port}${endpoint}`);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let sequence = 0;
  const pending = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const request = pending.get(message.id);
    if (request) {
      pending.delete(message.id);
      message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);
  await send("Page.navigate", { url: pathToFileURL(input).href }, sessionId);
  let status = "RUNNING";
  while (!status.startsWith("PASS:") && !status.startsWith("FAIL:")) {
    assert(Date.now() < deadline, "Timed out waiting for Canvas tests: " + status);
    await pause();
    const response = await send("Runtime.evaluate", { expression: "document.getElementById('result')?.textContent || 'LOADING'", returnByValue: true }, sessionId);
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    status = response.result.value || "LOADING";
  }
  assert(status.startsWith("PASS:"), status);
  console.log(status);
  } finally {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ id: 999999, method: "Browser.close" }));
    socket.close();
  }
  if (child && child.exitCode === null) {
    await Promise.race([new Promise(resolve => child.once("exit", resolve)), new Promise(resolve => setTimeout(resolve, 3000))]);
    if (child.exitCode === null) child.kill();
  }
  assert.equal(path.dirname(path.resolve(temp)), path.resolve(os.tmpdir()));
  assert(path.basename(temp).startsWith("mediakit-resize-test-"));
  fs.rmSync(temp, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  }
}
runBrowserTests().catch((error) => { console.error(error); process.exitCode = 1; });
