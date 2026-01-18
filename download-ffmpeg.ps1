# FFmpeg 核心文件下载脚本 (PowerShell)
# 使用方法：在项目根目录运行 .\download-ffmpeg.ps1

$ffmpegDir = "public\ffmpeg"
$coreJsUrl = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js"
$coreWasmUrl = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm"

# 创建目录
Write-Host "创建目录: $ffmpegDir" -ForegroundColor Green
New-Item -ItemType Directory -Force -Path $ffmpegDir | Out-Null

# 下载文件
Write-Host "正在下载 FFmpeg 核心文件..." -ForegroundColor Yellow
Write-Host "这可能需要几分钟时间，请耐心等待..." -ForegroundColor Yellow

try {
    Write-Host "下载 ffmpeg-core.js..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $coreJsUrl -OutFile "$ffmpegDir\ffmpeg-core.js" -UseBasicParsing
    
    Write-Host "下载 ffmpeg-core.wasm..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $coreWasmUrl -OutFile "$ffmpegDir\ffmpeg-core.wasm" -UseBasicParsing
    
    Write-Host "`n下载完成！" -ForegroundColor Green
    Write-Host "文件位置: $ffmpegDir\" -ForegroundColor Green
    
    # 检查文件大小
    $jsSize = (Get-Item "$ffmpegDir\ffmpeg-core.js").Length / 1MB
    $wasmSize = (Get-Item "$ffmpegDir\ffmpeg-core.wasm").Length / 1MB
    Write-Host "ffmpeg-core.js: $([math]::Round($jsSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "ffmpeg-core.wasm: $([math]::Round($wasmSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "`n现在可以重启开发服务器并测试视频转换功能了！" -ForegroundColor Green
} catch {
    Write-Host "下载失败: $_" -ForegroundColor Red
    Write-Host "请检查网络连接或手动下载文件" -ForegroundColor Yellow
    exit 1
}

