# MediaCC - Local Media Conversion & Compression Tool

A privacy-secure, zero-server-cost multimedia processing tool. All processing logic is completed in the client browser, ensuring user data is processed entirely locally and never sent to backend servers.

## 🎯 Core Features

### Image Processing
- **Format Conversion**: Supports JPG, PNG, WebP, AVIF inter-conversion
- **Quality Compression**: Adjustable compression quality
- **Proportional Scaling**: Maintains original aspect ratio when scaling
- **Real-time Comparison Preview**: Before/After comparison feature

### Video Processing
- **Format Conversion**: Supports MP4, WebM, MOV inter-conversion
- **Bitrate/Frame Rate Adjustment**: Customizable video parameters
- **Frame Extraction**: Extract static images from videos
- **Audio Extraction**: Extract video audio and convert to MP3
- **One-Click Mute**: Quickly remove video audio track

### User Experience
- **Batch Processing**: Supports file queue batch processing
- **Offline Available**: PWA support, works offline
- **Progress Indication**: Shows progress bar when processing large files
- **100% Local Processing**: All data is processed only in the browser, not uploaded to servers

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Video Processing**: ffmpeg.wasm
- **Image Processing**: Canvas API / Photon (WASM)
- **Icons**: Lucide React
- **State Management**: Zustand

## 📦 Installation & Running

### Requirements
- Node.js 18+
- npm or yarn or pnpm

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Mode
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [https://mediacc.it.com/image](https://mediacc.it.com/image) to view the deployed application.

### Build Production Version
```bash
npm run build
npm start
```

## 🔧 WebAssembly Configuration

This project uses `ffmpeg.wasm` for video processing and requires `SharedArrayBuffer` to be enabled for multi-threading support. Configuration has been completed in `next.config.js`:

- **Cross-Origin-Opener-Policy**: `same-origin`
- **Cross-Origin-Embedder-Policy**: `require-corp`

These configurations ensure the normal operation of WebAssembly multi-threading functionality.

### FFmpeg Core Files Configuration

**Important:** The code defaults to using local file paths (`/ffmpeg/ffmpeg-core.js`), so files need to be downloaded first.

#### Download FFmpeg Core Files

**Windows (PowerShell):**
```powershell
.\download-ffmpeg.ps1
```

**Linux/Mac (Bash):**
```bash
chmod +x download-ffmpeg.sh
./download-ffmpeg.sh
```

**Manual Download:**
1. Create directory: `mkdir -p public/ffmpeg`
2. Download files to `public/ffmpeg/` directory:
   - https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js
   - https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm

#### Using CDN (Optional)

If you want to use CDN, create a `.env.local` file:
```
NEXT_PUBLIC_FFMPEG_CORE_URL=https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js
NEXT_PUBLIC_FFMPEG_WASM_URL=https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm
```

**Note:** Using local files is recommended for better stability and reliability.

## 📁 Project Structure

```
mediacc/
├── .cursor/              # Cursor IDE rule configuration
│   └── rules/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── upload/       # Upload page
│   │   ├── settings/     # Settings page
│   │   ├── progress/     # Progress page
│   │   ├── result/       # Result page
│   │   ├── error.tsx     # Error boundary
│   │   ├── not-found.tsx # 404 page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── FileUploader.tsx
│   │   ├── FilePreviewList.tsx
│   │   ├── ConversionSettings.tsx
│   │   └── DownloadCard.tsx
│   ├── lib/              # Utility functions and core logic
│   │   ├── utils.ts      # Common utility functions
│   │   ├── ffmpeg-direct.ts  # FFmpeg direct loader
│   │   ├── ffmpeg-iframe-manager.ts  # FFmpeg iframe manager
│   │   ├── video-processor.ts  # Video processing
│   │   └── image-processor.ts  # Image processing
│   └── store/            # Zustand state management
│       └── index.ts
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🔒 Privacy & Security

- ✅ **Fully Local Processing**: All file processing is completed in the browser
- ✅ **No Data Upload**: No files are uploaded to servers
- ✅ **No User Tracking**: No login required, no user information collected
- ✅ **Open Source & Transparent**: Code is fully visible and can be reviewed independently

## 📝 Development Guidelines

### Code Style
- Use TypeScript strict mode
- All components must define clear Props types
- Use Function Components for writing components
- Comments should be in English or Chinese, keeping them concise and clear

### Error Handling
- All exceptions must display user-friendly prompts in the UI
- Use Error Boundary to catch component errors
- Media processing errors require detailed error message prompts

### Performance Optimization
- Release objects created by `URL.createObjectURL` in a timely manner
- Use queue mechanism for batch processing to avoid starting multiple WASM instances simultaneously
- Clean up FFmpeg instances when components unmount to prevent memory leaks

## 🚀 Feature Development Roadmap

- [x] Project initialization and basic configuration
- [ ] File upload component implementation
- [ ] Image processing functionality implementation
- [ ] Video processing functionality implementation
- [ ] Batch processing queue mechanism
- [ ] PWA offline support
- [ ] User interface optimization

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

**Note**: This project is still under development, and some features have not been implemented yet. The current version only includes basic project structure and configuration.
