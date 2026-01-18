/**
 * FFmpeg 直接加载器
 * 不使用 iframe，直接在页面中加载 FFmpeg
 * 用于独立的视频处理页面
 */

"use client";

import type { VideoFormat, CompressionMode } from "@/types";

// 声明全局类型
declare global {
  interface Window {
    FFmpegWASM?: {
      FFmpeg: any;
    };
  }
}

// FFmpeg 实例（单例模式）
let ffmpegInstance: any = null;
let isFFmpegLoaded = false;
let FFmpegClass: any = null;
let loadingPromise: Promise<any> | null = null;

/**
 * 自己实现 toBlobURL 函数
 */
async function toBlobURL(url: string, mimeType: string): Promise<string> {
  console.log(`[FFmpeg 加载] 开始获取文件: ${url}`);
  const startTime = Date.now();
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: mimeType });
    const blobURL = URL.createObjectURL(blob);
    const duration = Date.now() - startTime;
    console.log(`[FFmpeg 加载] ✅ 文件加载成功: ${url}, 耗时: ${duration}ms, Blob URL: ${blobURL.substring(0, 50)}...`);
    return blobURL;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[FFmpeg 加载] ❌ 文件加载失败: ${url}, 耗时: ${duration}ms`, error);
    throw error;
  }
}

/**
 * 获取 FFmpeg 实例
 */
async function getFFmpegInstance(): Promise<any> {
  console.log("[FFmpeg 加载] ========== 开始加载 FFmpeg ==========");
  const loadStartTime = Date.now();

  // 如果已经加载，直接返回
  if (ffmpegInstance && isFFmpegLoaded) {
    console.log("[FFmpeg 加载] ✅ FFmpeg 已加载，直接返回实例");
    return ffmpegInstance;
  }

  // 如果正在加载，等待加载完成
  if (loadingPromise) {
    console.log("[FFmpeg 加载] ⏳ FFmpeg 正在加载中，等待加载完成...");
    return loadingPromise;
  }

  // 开始加载
  loadingPromise = (async () => {
    try {
      // 1. 加载 FFmpeg UMD 脚本
      console.log("[FFmpeg 加载] 📦 步骤 1/5: 加载 FFmpeg UMD 脚本...");
      const importStartTime = Date.now();
      
      if (!FFmpegClass) {
        // 检查是否已经加载了 UMD 脚本
        if (window.FFmpegWASM && window.FFmpegWASM.FFmpeg) {
          console.log("[FFmpeg 加载]   FFmpeg UMD 脚本已存在");
          FFmpegClass = window.FFmpegWASM.FFmpeg;
        } else {
          // 使用 script 标签加载 UMD 版本，避免 Webpack 拦截
          console.log("[FFmpeg 加载]   通过 script 标签加载 FFmpeg UMD 脚本...");
          
          await new Promise<void>((resolve, reject) => {
            // 检查是否已经有脚本标签
            const existingScript = document.querySelector('script[src="/ffmpeg/ffmpeg.js"]');
            if (existingScript) {
              // 如果脚本已存在，等待它加载完成
              if (window.FFmpegWASM && window.FFmpegWASM.FFmpeg) {
                FFmpegClass = window.FFmpegWASM.FFmpeg;
                resolve();
                return;
              }
              // 否则等待加载事件
              existingScript.addEventListener('load', () => {
                if (window.FFmpegWASM && window.FFmpegWASM.FFmpeg) {
                  FFmpegClass = window.FFmpegWASM.FFmpeg;
                  resolve();
                } else {
                  reject(new Error("FFmpeg UMD 脚本加载后未找到 FFmpegWASM"));
                }
              });
              existingScript.addEventListener('error', () => {
                reject(new Error("FFmpeg UMD 脚本加载失败"));
              });
              return;
            }
            
            const script = document.createElement("script");
            script.src = "/ffmpeg/ffmpeg.js";
            script.type = "text/javascript";
            
            script.onload = () => {
              console.log("[FFmpeg 加载]   ✅ FFmpeg UMD 脚本加载成功");
              const FFmpegWASM = window.FFmpegWASM;
              if (!FFmpegWASM || !FFmpegWASM.FFmpeg) {
                reject(new Error("FFmpegWASM 未正确加载"));
                return;
              }
              FFmpegClass = FFmpegWASM.FFmpeg;
              resolve();
            };
            
            script.onerror = () => {
              console.error("[FFmpeg 加载]   ❌ FFmpeg UMD 脚本加载失败");
              reject(new Error("FFmpeg UMD 脚本加载失败"));
            };
            
            document.head.appendChild(script);
          });
        }
      } else {
        console.log("[FFmpeg 加载]   FFmpeg 类已存在，跳过加载");
      }
      
      const importDuration = Date.now() - importStartTime;
      console.log(`[FFmpeg 加载] ✅ 步骤 1/5 完成: FFmpeg 模块加载成功，耗时: ${importDuration}ms`);

      // 2. 创建 FFmpeg 实例
      console.log("[FFmpeg 加载] 📦 步骤 2/4: 创建 FFmpeg 实例...");
      const instanceStartTime = Date.now();
      
      if (!ffmpegInstance) {
        ffmpegInstance = new FFmpegClass({ log: false });
        console.log("[FFmpeg 加载] ✅ FFmpeg 实例创建成功");
      }
      
      const instanceDuration = Date.now() - instanceStartTime;
      console.log(`[FFmpeg 加载] ✅ 步骤 2/4 完成: FFmpeg 实例创建成功，耗时: ${instanceDuration}ms`);

      // 3. 准备核心文件 URL
      console.log("[FFmpeg 加载] 📦 步骤 3/4: 准备核心文件 URL...");
      const urlStartTime = Date.now();
      
      const baseURL = window.location.origin;
      const coreURL = `${baseURL}/ffmpeg/ffmpeg-core.js`;
      const wasmURL = `${baseURL}/ffmpeg/ffmpeg-core.wasm`;
      
      console.log(`[FFmpeg 加载]   核心文件 URL: ${coreURL}`);
      console.log(`[FFmpeg 加载]   WASM 文件 URL: ${wasmURL}`);
      
      // 验证文件可访问性
      try {
        const coreCheckStart = Date.now();
        const coreResponse = await fetch(coreURL, { method: "HEAD" });
        const coreCheckDuration = Date.now() - coreCheckStart;
        console.log(`[FFmpeg 加载]   ✅ 核心文件可访问 (${coreResponse.status}), 耗时: ${coreCheckDuration}ms`);
        
        const wasmCheckStart = Date.now();
        const wasmResponse = await fetch(wasmURL, { method: "HEAD" });
        const wasmCheckDuration = Date.now() - wasmCheckStart;
        console.log(`[FFmpeg 加载]   ✅ WASM 文件可访问 (${wasmResponse.status}), 耗时: ${wasmCheckDuration}ms`);
      } catch (error) {
        console.error("[FFmpeg 加载]   ❌ 文件可访问性检查失败:", error);
        throw new Error(`无法访问 FFmpeg 核心文件: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      const urlDuration = Date.now() - urlStartTime;
      console.log(`[FFmpeg 加载] ✅ 步骤 3/4 完成: 核心文件 URL 准备完成，耗时: ${urlDuration}ms`);

      // 4. 尝试直接使用 HTTP URL（不使用 Blob URL，避免某些环境下的问题）
      console.log("[FFmpeg 加载] 📦 步骤 4/5: 准备加载参数...");
      const paramStartTime = Date.now();
      
      // 尝试两种方式：先尝试直接使用 HTTP URL
      // 如果不行，再尝试 Blob URL
      console.log("[FFmpeg 加载]   尝试直接使用 HTTP URL（不转换为 Blob URL）...");
      console.log(`[FFmpeg 加载]   核心文件 URL: ${coreURL}`);
      console.log(`[FFmpeg 加载]   WASM 文件 URL: ${wasmURL}`);
      
      const paramDuration = Date.now() - paramStartTime;
      console.log(`[FFmpeg 加载] ✅ 步骤 4/5 完成: 参数准备完成，耗时: ${paramDuration}ms`);

      // 5. 调用 ffmpeg.load()（添加超时保护和详细日志）
      console.log("[FFmpeg 加载] 📦 步骤 5/5: 调用 ffmpeg.load()...");
      console.log(`[FFmpeg 加载]   使用 HTTP URL 直接加载（不转换为 Blob URL）`);
      const loadCallStartTime = Date.now();
      
      // 方案1：尝试直接使用 HTTP URL（不转换为 Blob URL）
      // 原因：Blob URL 可能导致 Next.js 的模块解析系统尝试处理这些 URL
      console.log("[FFmpeg 加载]   方案1: 尝试直接使用 HTTP URL...");
      
      let loadPromise: Promise<any>;
      let loadMethod = "HTTP_URL";
      
      try {
        loadPromise = ffmpegInstance.load({
          coreURL: coreURL,  // 直接使用 HTTP URL
          wasmURL: wasmURL,  // 直接使用 HTTP URL
          // 不传递 workerURL，使用单线程模式
        });
      } catch (initError) {
        console.error("[FFmpeg 加载]   ❌ 方案1 初始化失败，尝试方案2 (Blob URL)...");
        // 如果直接使用 HTTP URL 初始化失败，尝试 Blob URL
        loadMethod = "BLOB_URL";
        const coreBlobURL = await toBlobURL(coreURL, "text/javascript");
        const wasmBlobURL = await toBlobURL(wasmURL, "application/wasm");
        console.log("[FFmpeg 加载]   方案2: 使用 Blob URL...");
        loadPromise = ffmpegInstance.load({
          coreURL: coreBlobURL,
          wasmURL: wasmBlobURL,
        });
      }
      
      // 添加进度检测（每10秒输出一次警告）
      let progressCheckInterval: NodeJS.Timeout | null = null;
      progressCheckInterval = setInterval(() => {
        const elapsed = Date.now() - loadCallStartTime;
        if (elapsed > 10000 && elapsed < 60000) {
          console.warn(`[FFmpeg 加载]   ⚠️ ffmpeg.load() 已运行 ${(elapsed / 1000).toFixed(1)} 秒，可能卡住...`);
        }
      }, 10000);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          if (progressCheckInterval) {
            clearInterval(progressCheckInterval);
          }
          reject(new Error(`ffmpeg.load() 超时（60秒）- 使用${loadMethod}方式 - 可能原因：Next.js 环境干扰或 Worker 加载失败`));
        }, 60000);
      });
      
      try {
        await Promise.race([loadPromise, timeoutPromise]);
        if (progressCheckInterval) {
          clearInterval(progressCheckInterval);
        }
        const loadCallDuration = Date.now() - loadCallStartTime;
        console.log(`[FFmpeg 加载] ✅ 步骤 5/5 完成: ffmpeg.load() 成功（使用${loadMethod}方式），耗时: ${loadCallDuration}ms`);
      } catch (loadError) {
        if (progressCheckInterval) {
          clearInterval(progressCheckInterval);
        }
        const loadCallDuration = Date.now() - loadCallStartTime;
        console.error(`[FFmpeg 加载] ❌ 步骤 5/5 失败: ffmpeg.load() 失败（使用${loadMethod}方式），耗时: ${loadCallDuration}ms`);
        console.error(`[FFmpeg 加载]   错误详情:`, loadError);
        
        // 如果使用 HTTP URL 失败，且还没有尝试 Blob URL，则尝试 Blob URL
        if (loadMethod === "HTTP_URL" && loadError instanceof Error && loadError.message.includes("超时")) {
          console.log("[FFmpeg 加载]   💡 尝试备用方案：使用 Blob URL...");
          try {
            const coreBlobURL = await toBlobURL(coreURL, "text/javascript");
            const wasmBlobURL = await toBlobURL(wasmURL, "application/wasm");
            const retryStartTime = Date.now();
            await Promise.race([
              ffmpegInstance.load({ coreURL: coreBlobURL, wasmURL: wasmBlobURL }),
              new Promise((_, reject) => setTimeout(() => reject(new Error("重试超时")), 60000))
            ]);
            const retryDuration = Date.now() - retryStartTime;
            console.log(`[FFmpeg 加载] ✅ 备用方案成功（Blob URL），耗时: ${retryDuration}ms`);
            const loadCallDuration = Date.now() - loadCallStartTime;
            console.log(`[FFmpeg 加载] ✅ 步骤 5/5 完成: ffmpeg.load() 成功，总耗时: ${loadCallDuration}ms`);
          } catch (retryError) {
            console.error("[FFmpeg 加载]   ❌ 备用方案也失败:", retryError);
            throw new Error(`FFmpeg 加载失败：直接加载和 Blob URL 方式都失败。建议使用 iframe 方式，它可以在隔离环境中正常工作。`);
          }
        } else {
          throw loadError;
        }
      }

      isFFmpegLoaded = true;
      const totalDuration = Date.now() - loadStartTime;
      console.log(`[FFmpeg 加载] ========== FFmpeg 加载完成，总耗时: ${totalDuration}ms ==========`);

      loadingPromise = null;
      return ffmpegInstance;
    } catch (error) {
      loadingPromise = null;
      ffmpegInstance = null;
      isFFmpegLoaded = false;
      const totalDuration = Date.now() - loadStartTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[FFmpeg 加载] ========== FFmpeg 加载失败，总耗时: ${totalDuration}ms ==========`);
      console.error(`[FFmpeg 加载] ❌ 错误详情:`, error);
      throw new Error(`FFmpeg 加载失败: ${errorMessage}`);
    }
  })();

  return loadingPromise;
}

/**
 * 转换视频格式
 */
export async function convertVideoFormatDirect(
  file: File,
  targetFormat: VideoFormat,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  console.log("[视频转换] 🎬 ========== 开始视频格式转换 ==========");
  console.log(`[视频转换]   文件名: ${file.name}`);
  console.log(`[视频转换]   文件大小: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`[视频转换]   目标格式: ${targetFormat}`);
  
  const conversionStartTime = Date.now();

  try {
    // 1. 获取 FFmpeg 实例
    console.log("[视频转换] 📦 步骤 1/5: 获取 FFmpeg 实例...");
    const instanceStartTime = Date.now();
    const ffmpeg = await getFFmpegInstance();
    const instanceDuration = Date.now() - instanceStartTime;
    console.log(`[视频转换] ✅ 步骤 1/5 完成: FFmpeg 实例获取成功，耗时: ${instanceDuration}ms`);

    // 2. 设置进度监听
    if (onProgress) {
      console.log("[视频转换] 📦 设置进度监听器...");
      ffmpeg.on("progress", ({ progress }: { progress: number }) => {
        const progressPercent = progress * 100;
        console.log(`[视频转换] 📊 进度更新: ${progressPercent.toFixed(2)}%`);
        onProgress(progressPercent);
      });
    }

    // 3. 准备文件
    console.log("[视频转换] 📦 步骤 2/5: 准备输入文件...");
    const filePrepStartTime = Date.now();
    const inputFileName = "input." + file.name.split(".").pop();
    const outputFileName = `output.${targetFormat}`;
    console.log(`[视频转换]   输入文件名: ${inputFileName}`);
    console.log(`[视频转换]   输出文件名: ${outputFileName}`);
    
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    console.log(`[视频转换]   文件数据大小: ${(fileData.length / 1024 / 1024).toFixed(2)} MB`);
    
    const filePrepDuration = Date.now() - filePrepStartTime;
    console.log(`[视频转换] ✅ 步骤 2/5 完成: 输入文件准备完成，耗时: ${filePrepDuration}ms`);

    // 4. 写入文件
    console.log("[视频转换] 📦 步骤 3/5: 写入文件到 FFmpeg 虚拟文件系统...");
    const writeStartTime = Date.now();
    await ffmpeg.writeFile(inputFileName, fileData);
    const writeDuration = Date.now() - writeStartTime;
    console.log(`[视频转换] ✅ 步骤 3/5 完成: 文件写入成功，耗时: ${writeDuration}ms`);

    // 5. 执行转换
    console.log("[视频转换] 📦 步骤 4/5: 执行视频格式转换...");
    const execStartTime = Date.now();
    const command = [
      "-i", inputFileName,
      "-c:v", "libx264",
      "-c:a", "aac",
      "-preset", "medium",
      "-crf", "23",
      "-f", targetFormat === "mov" ? "mov" : targetFormat,
      outputFileName,
    ];
    console.log(`[视频转换]   FFmpeg 命令: ${command.join(" ")}`);
    
    await ffmpeg.exec(command);
    const execDuration = Date.now() - execStartTime;
    console.log(`[视频转换] ✅ 步骤 4/5 完成: 视频转换成功，耗时: ${execDuration}ms`);

    // 6. 读取输出文件
    console.log("[视频转换] 📦 步骤 5/5: 读取输出文件...");
    const readStartTime = Date.now();
    const data = await ffmpeg.readFile(outputFileName);
    const readDuration = Date.now() - readStartTime;
    const outputSize = (data.length / 1024 / 1024).toFixed(2);
    console.log(`[视频转换] ✅ 步骤 5/5 完成: 输出文件读取成功，大小: ${outputSize} MB，耗时: ${readDuration}ms`);

    // 7. 清理文件
    console.log("[视频转换] 🧹 清理临时文件...");
    try {
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      console.log("[视频转换] ✅ 临时文件清理完成");
    } catch (cleanupError) {
      console.warn("[视频转换] ⚠️ 临时文件清理失败:", cleanupError);
    }

    // 8. 移除进度监听
    if (onProgress) {
      ffmpeg.off("progress", onProgress as any);
    }

    // 9. 转换为 Blob
    const uint8Array = new Uint8Array(data);
    const mimeType = `video/${targetFormat === "mov" ? "quicktime" : targetFormat}`;
    const resultBlob = new Blob([uint8Array], { type: mimeType });
    
    const totalDuration = Date.now() - conversionStartTime;
    console.log(`[视频转换] ✅ ========== 视频格式转换完成，总耗时: ${totalDuration}ms ==========`);
    console.log(`[视频转换]   输出大小: ${(resultBlob.size / 1024 / 1024).toFixed(2)} MB`);
    
    return resultBlob;
  } catch (error) {
    const totalDuration = Date.now() - conversionStartTime;
    console.error(`[视频转换] ❌ ========== 视频格式转换失败，总耗时: ${totalDuration}ms ==========`);
    console.error("[视频转换] ❌ 错误详情:", error);
    throw new Error(`视频格式转换失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 压缩视频
 */
export async function compressVideoDirect(
  file: File,
  mode: CompressionMode,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  console.log("[视频压缩] 🗜️  ========== 开始视频压缩 ==========");
  console.log(`[视频压缩]   文件名: ${file.name}`);
  console.log(`[视频压缩]   文件大小: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`[视频压缩]   压缩模式: ${mode}`);
  
  const compressionStartTime = Date.now();

  try {
    // 获取 FFmpeg 实例
    const ffmpeg = await getFFmpegInstance();

    // 设置进度监听
    if (onProgress) {
      ffmpeg.on("progress", ({ progress }: { progress: number }) => {
        const progressPercent = progress * 100;
        console.log(`[视频压缩] 📊 进度更新: ${progressPercent.toFixed(2)}%`);
        onProgress(progressPercent);
      });
    }

    // 准备文件
    const inputFileName = "input." + file.name.split(".").pop();
    const originalFormat = file.name.split(".").pop() || "mp4";
    const outputFileName = `output.${originalFormat}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    
    // 写入文件
    await ffmpeg.writeFile(inputFileName, fileData);
    
    // 执行压缩
    const command = mode === "lossless"
      ? ["-i", inputFileName, "-c:v", "libx264", "-c:a", "aac", "-preset", "fast", "-crf", "18", outputFileName]
      : ["-i", inputFileName, "-c:v", "libx264", "-c:a", "aac", "-preset", "medium", "-crf", "28", "-b:v", "1M", "-b:a", "128k", outputFileName];
    
    await ffmpeg.exec(command);
    
    // 读取输出文件
    const data = await ffmpeg.readFile(outputFileName);
    
    // 清理文件
    try {
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (cleanupError) {
      console.warn("[视频压缩] ⚠️ 临时文件清理失败:", cleanupError);
    }

    // 移除进度监听
    if (onProgress) {
      ffmpeg.off("progress", onProgress as any);
    }

    // 转换为 Blob
    const uint8Array = new Uint8Array(data);
    const originalExt = file.name.split(".").pop() || "mp4";
    const mimeType = originalExt === "mov" ? "video/quicktime" : `video/${originalExt}`;
    const resultBlob = new Blob([uint8Array], { type: mimeType });
    
    const totalDuration = Date.now() - compressionStartTime;
    console.log(`[视频压缩] ✅ ========== 视频压缩完成，总耗时: ${totalDuration}ms ==========`);
    
    return resultBlob;
  } catch (error) {
    const totalDuration = Date.now() - compressionStartTime;
    console.error(`[视频压缩] ❌ ========== 视频压缩失败，总耗时: ${totalDuration}ms ==========`);
    console.error("[视频压缩] ❌ 错误详情:", error);
    throw new Error(`视频压缩失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}
