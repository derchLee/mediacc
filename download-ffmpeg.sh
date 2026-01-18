#!/bin/bash
# FFmpeg 核心文件下载脚本 (Bash)
# 使用方法：在项目根目录运行 chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh

FFMPEG_DIR="public/ffmpeg"
CORE_JS_URL="https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js"
CORE_WASM_URL="https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm"

# 创建目录
echo "创建目录: $FFMPEG_DIR"
mkdir -p "$FFMPEG_DIR"

# 下载文件
echo "正在下载 FFmpeg 核心文件..."
echo "这可能需要几分钟时间，请耐心等待..."

echo "下载 ffmpeg-core.js..."
curl -L -o "$FFMPEG_DIR/ffmpeg-core.js" "$CORE_JS_URL"

echo "下载 ffmpeg-core.wasm..."
curl -L -o "$FFMPEG_DIR/ffmpeg-core.wasm" "$CORE_WASM_URL"

echo ""
echo "下载完成！"
echo "文件位置: $FFMPEG_DIR/"

# 检查文件大小
if command -v stat >/dev/null 2>&1; then
    JS_SIZE=$(stat -f%z "$FFMPEG_DIR/ffmpeg-core.js" 2>/dev/null || stat -c%s "$FFMPEG_DIR/ffmpeg-core.js" 2>/dev/null)
    WASM_SIZE=$(stat -f%z "$FFMPEG_DIR/ffmpeg-core.wasm" 2>/dev/null || stat -c%s "$FFMPEG_DIR/ffmpeg-core.wasm" 2>/dev/null)
    JS_SIZE_MB=$(echo "scale=2; $JS_SIZE / 1024 / 1024" | bc)
    WASM_SIZE_MB=$(echo "scale=2; $WASM_SIZE / 1024 / 1024" | bc)
    echo "ffmpeg-core.js: ${JS_SIZE_MB} MB"
    echo "ffmpeg-core.wasm: ${WASM_SIZE_MB} MB"
fi

echo ""
echo "现在可以重启开发服务器并测试视频转换功能了！"

