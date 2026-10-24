# MediaKit

Production URL: **https://mediakit.upupdays.com**. Set `NEXT_PUBLIC_BASE_URL` to this URL at build time. Legacy `mediacc.it.com` and `www.mediacc.it.com` hosts redirect to the same paths on MediaKit when served by this app; keep their DNS and TLS active for migration.

Search Console: verify `upupdays.com` via DNS or add the URL-prefix property `https://mediakit.upupdays.com/`, then submit `https://mediakit.upupdays.com/sitemap.xml`. For HTML-tag verification, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the value Google provides and rebuild. For a previously indexed old site, verify both properties and use Change of Address after the redirects are live. Hosting/CDN redirects must also point directly to the new domain.

SEO focus: image converter/compressor and video converter/compressor hubs, plus dedicated HEIC to JPG, WebP to JPG, WebP to PNG, PNG to JPG, MOV to MP4 and WebM to MP4 pages. Social previews are generated at `/og` with the current brand. Keywords are reflected in page titles and useful content; meta keywords do not affect Google ranking.

## Multilingual docs (tabs)

### Resize images

On `/image`, select your images, choose **Resize Image**, enter width and height in pixels, then start resizing and download the results. For example, a 1920×1080 image can be exported at exactly 1000×500; this stretches the aspect ratio. Enable **Keep aspect ratio** to fit inside those bounds without cropping (889×500 for this example). Settings apply to every selected image. Results show the actual dimensions and use filenames such as `photo_1000x500.jpg`.

JPG, PNG and WebP retain their format where supported; HEIC and other decodable inputs export as PNG. Animated inputs become still images. Target dimensions must be whole numbers from 1 to 8192 pixels per side, with no more than 32 megapixels total. Processing remains local to the browser.

Run `npm run test:resize` to test the actual Canvas output using a local headless Chrome/Chromium/Edge browser. Set `CHROME_PATH` if it is not installed in a standard location.

**Real tabs (one language visible at a time):** open **[`docs/readme-tabs.html`](docs/readme-tabs.html)** in your browser (double‑click the file locally, or publish **`/docs`** with [GitHub Pages](https://pages.github.com/) so it loads as a normal web page). That page uses HTML + CSS only (no JavaScript).

GitHub’s **`README.md` preview cannot show interactive tabs** (styles/scripts are limited), so the repository uses **collapsible sections** below as the in-repo fallback.

---

**Fallback — choose a language:** click the bar to expand or collapse. *(Several sections can be open at once.)*

---

<details>
<summary><strong>English</strong></summary>

### About

**Privacy-first image & video conversion and compression in the browser.**  
All heavy work runs **locally** on the user’s device (Canvas, WebAssembly, FFmpeg.wasm)—files are **not** uploaded to your servers.

### Live site

Use the deployed app (no install):

| URL | Notes |
|-----|--------|
| **[https://mediakit.upupdays.com](https://mediakit.upupdays.com)** | Production entry; redirects to `/image`. |
| **[https://mediakit.upupdays.com/image](https://mediakit.upupdays.com/image)** | Image tool (default). |
| **[https://mediakit.upupdays.com/video](https://mediakit.upupdays.com/video)** | Video tool. |

Localized UI: `/ja/image`, `/es/image`, `/pt/image` (and matching `/video` paths).

### How it works

1. **Images** — Canvas (`drawImage` + `toBlob`); **HEIC/HEIF** via **heic2any** (WASM); compression via **browser-image-compression** (optional Web Workers; lossless / lossy).
2. **Videos** — **FFmpeg.wasm** (`@ffmpeg/ffmpeg` + `@ffmpeg/core`) in-browser (demux, encode, bitrate, frames, audio extract). **SharedArrayBuffer** needs strict COOP/COEP headers.
3. **App** — **Next.js 15** (App Router), React 18, TypeScript, Tailwind CSS, **Zustand**. Routes: `src/app/` (`/image`, `/video`, locales, legal pages).
4. **Headers** (`next.config.js`) — `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: require-corp` (required for ffmpeg.wasm threading); keep behind CDN/reverse proxy too.

### Deployment

**Docker Compose (recommended)**

```bash
git clone <your-repo-url> mediakit && cd mediakit
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh   # Linux/macOS — or .\download-ffmpeg.ps1 on Windows

docker compose build
docker compose up -d
```

- Host **80** → container **3000**.  
- Set **`NEXT_PUBLIC_BASE_URL=https://mediakit.upupdays.com`** (must match public canonical URL). Dockerfile injects it at **build** time.

**Docker CLI**

```bash
docker build -t mediakit:latest --build-arg NEXT_PUBLIC_BASE_URL=https://mediakit.upupdays.com .
docker run -d --name mediakit-app -p 80:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BASE_URL=https://mediakit.upupdays.com \
  mediakit:latest
```

**Bare metal**

```bash
npm ci
./download-ffmpeg.sh
npm run build
npm start
```

TLS, Cloudflare **Full (strict)**, DNS **`mediakit`**, COOP/COEP at edge — see **`DEPLOYMENT.md`**.

### Local development

```bash
npm install
./download-ffmpeg.sh
npm run dev
```

Open `http://localhost:3000` (redirects to `/image`). Optional `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_FFMPEG_CORE_URL=...
NEXT_PUBLIC_FFMPEG_WASM_URL=...
```

### Tech stack (this locale)

| Area | Technology |
|------|------------|
| Framework | Next.js 15 (App Router), React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Images | Canvas, heic2any, browser-image-compression |
| Video | @ffmpeg/ffmpeg, @ffmpeg/core (WASM) |
| State / Icons | Zustand / Lucide React |

### Privacy

Processing stays in the **browser**; no account required for core features. Full policies on the live site: **`/privacy`**, **`/cookies`**, **`/terms`**.

### SEO & GEO

Metadata, hreflang, `robots.txt`, `sitemap.xml`, JSON-LD (FAQ, SoftwareApplication, WebSite, …). Optional: `docs/SEO-GEO-REPORT.md`.

</details>

<details>
<summary><strong>Español</strong></summary>

### Acerca de

Herramienta gratuita para **convertir y comprimir imágenes y vídeo en el navegador**. Los archivos **no se suben** al servidor: procesamiento **100 % local** (Canvas, WebAssembly, FFmpeg.wasm).

### Sitio en línea

| URL | Notas |
|-----|--------|
| **[https://mediakit.upupdays.com](https://mediakit.upupdays.com)** | Entrada de producción; redirige a `/image`. |
| **[https://mediakit.upupdays.com/image](https://mediakit.upupdays.com/image)** | Herramienta de imagen. |
| **[https://mediakit.upupdays.com/video](https://mediakit.upupdays.com/video)** | Herramienta de vídeo. |

Interfaz localizada: **`/es/image`**, **`/es/video`** (también `/ja`, `/pt`).

### Cómo funciona

1. **Imágenes:** **Canvas**; **HEIC** con **heic2any**; compresión con **browser-image-compression** (Workers opcionales).  
2. **Vídeo:** **FFmpeg.wasm** en el cliente; hace falta **COOP/COEP** para multihilo.  
3. **Aplicación:** **Next.js 15**, React 18, TypeScript, Tailwind, **Zustand**.  
4. **Cabeceras** en `next.config.js`: igual que en la versión inglesa; mantener tras proxy/CDN.

### Despliegue

```bash
git clone <your-repo-url> mediakit && cd mediakit
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh
docker compose build
docker compose up -d
```

Variables: **`NEXT_PUBLIC_BASE_URL`** = URL pública (ej. `https://mediakit.upupdays.com`). Alternativa: `docker build` / `docker run` como en la sección English. Desarrollo local: `npm install`, `./download-ffmpeg.sh`, `npm run dev`.

### Privacidad y SEO

Sin subida de archivos para la lógica de conversión. Políticas en **`/privacy`**, **`/cookies`**, **`/terms`**. SEO/GEO: metadatos, `robots.txt`, sitemap, JSON-LD.

### Pila tecnológica

Next.js 15 · TypeScript · Tailwind · Canvas · heic2any · browser-image-compression · FFmpeg.wasm · Zustand · Lucide.

</details>

<details>
<summary><strong>日本語</strong></summary>

### 概要

ブラウザ内で**画像・動画の変換・圧縮**を行う無料ツール。**ファイルはサーバーにアップロードされず**、端末上で Canvas・WebAssembly・**FFmpeg.wasm** により処理します。

### 本番サイト

| URL | 説明 |
|-----|------|
| **[https://mediakit.upupdays.com](https://mediakit.upupdays.com)** | 本番入口（`/image` にリダイレクト） |
| **[https://mediakit.upupdays.com/image](https://mediakit.upupdays.com/image)** | 画像ツール |
| **[https://mediakit.upupdays.com/video](https://mediakit.upupdays.com/video)** | 動画ツール |

日本語 UI: **`/ja/image`**、**`/ja/video`**（`/es`、`/pt` も同様）。

### 実装の仕組み

1. **画像:** **Canvas** 描画・出力、HEIC は **heic2any**、圧縮は **browser-image-compression**（Web Worker 可）。  
2. **動画:** ブラウザ内 **FFmpeg.wasm**。マルチスレッド用に **COOP/COEP** が必要。  
3. **アプリ:** **Next.js 15** App Router、React 18、TypeScript、Tailwind、**Zustand**。  
4. **`next.config.js`** の分離ヘッダは CDN 背後でも維持。

### デプロイ

```bash
git clone <your-repo-url> mediakit && cd mediakit
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh
docker compose build
docker compose up -d
```

**`NEXT_PUBLIC_BASE_URL`** に本番 URL（例: `https://mediakit.upupdays.com`）を設定。詳細は英語版と **`DEPLOYMENT.md`**。開発: `npm install` → `./download-ffmpeg.sh` → `npm run dev`。

### プライバシー・SEO

変換処理はブラウザ内。詳細は本番の **`/privacy`** など。SEO/GEO: メタデータ、hreflang、`robots.txt`、サイトマップ、JSON-LD。

### 技術スタック

Next.js 15 · TypeScript · Tailwind · Canvas · heic2any · browser-image-compression · FFmpeg.wasm · Zustand · Lucide。

</details>

<details>
<summary><strong>Português</strong></summary>

### Sobre

Ferramenta gratuita para **converter e comprimir imagens e vídeo no navegador**. Os ficheiros **não são enviados** para o servidor: processamento **100 % local** (Canvas, WebAssembly, FFmpeg.wasm).

### Site em produção

| URL | Notas |
|-----|--------|
| **[https://mediakit.upupdays.com](https://mediakit.upupdays.com)** | Entrada; redireciona para `/image`. |
| **[https://mediakit.upupdays.com/image](https://mediakit.upupdays.com/image)** | Ferramenta de imagem. |
| **[https://mediakit.upupdays.com/video](https://mediakit.upupdays.com/video)** | Ferramenta de vídeo. |

UI em português: **`/pt/image`**, **`/pt/video`** (também `/ja`, `/es`).

### Como funciona

1. **Imagens:** **Canvas**; **HEIC** com **heic2any**; compressão com **browser-image-compression**.  
2. **Vídeo:** **FFmpeg.wasm** no cliente; **COOP/COEP** para multithreading.  
3. **App:** **Next.js 15**, React 18, TypeScript, Tailwind, **Zustand**.  
4. Cabeçalhos em `next.config.js` — manter atrás de CDN/proxy.

### Implantação

```bash
git clone <your-repo-url> mediakit && cd mediakit
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh
docker compose build
docker compose up -d
```

Defina **`NEXT_PUBLIC_BASE_URL`** com o URL público (ex.: `https://mediakit.upupdays.com`). Docker manual e desenvolvimento local: ver secção **English**. Mais detalhes: **`DEPLOYMENT.md`**.

### Privacidade e SEO

Sem envio de ficheiros para servidores MediaKit para a lógica de conversão. Políticas: **`/privacy`**, **`/cookies`**, **`/terms`**. SEO/GEO: metadados, hreflang, `robots.txt`, sitemap, JSON-LD.

### Stack

Next.js 15 · TypeScript · Tailwind · Canvas · heic2any · browser-image-compression · FFmpeg.wasm · Zustand · Lucide.

</details>

---

## Project structure (reference)

```
mediakit/
├── src/app/              # /image, /video, locales, legal, sitemap, robots
├── src/components/
├── src/lib/              # image-processor, video-processor, ffmpeg-*, …
├── src/store/
├── public/ffmpeg/        # ffmpeg-core (download-ffmpeg.*)
├── Dockerfile
├── docker-compose.yml
├── next.config.js
└── DEPLOYMENT.md
```

---

## License

MIT License.

## Contributing

Issues and pull requests are welcome.
