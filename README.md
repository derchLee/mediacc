# MediaCC

## Multilingual docs (tabs)

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
| **[https://mediacc.it.com](https://mediacc.it.com)** | Production entry; apex redirects to canonical **`www`**. |
| **[https://www.mediacc.it.com/image](https://www.mediacc.it.com/image)** | Image tool (default). |
| **[https://www.mediacc.it.com/video](https://www.mediacc.it.com/video)** | Video tool. |

Localized UI: `/ja/image`, `/es/image`, `/pt/image` (and matching `/video` paths).

### How it works

1. **Images** — Canvas (`drawImage` + `toBlob`); **HEIC/HEIF** via **heic2any** (WASM); compression via **browser-image-compression** (optional Web Workers; lossless / lossy).
2. **Videos** — **FFmpeg.wasm** (`@ffmpeg/ffmpeg` + `@ffmpeg/core`) in-browser (demux, encode, bitrate, frames, audio extract). **SharedArrayBuffer** needs strict COOP/COEP headers.
3. **App** — **Next.js 15** (App Router), React 18, TypeScript, Tailwind CSS, **Zustand**. Routes: `src/app/` (`/image`, `/video`, locales, legal pages).
4. **Headers** (`next.config.js`) — `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: require-corp` (required for ffmpeg.wasm threading); keep behind CDN/reverse proxy too.

### Deployment

**Docker Compose (recommended)**

```bash
git clone <your-repo-url> mediacc && cd mediacc
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh   # Linux/macOS — or .\download-ffmpeg.ps1 on Windows

docker compose build
docker compose up -d
```

- Host **80** → container **3000**.  
- Set **`NEXT_PUBLIC_BASE_URL=https://www.mediacc.it.com`** (must match public canonical URL). Dockerfile injects it at **build** time.

**Docker CLI**

```bash
docker build -t mediacc:latest --build-arg NEXT_PUBLIC_BASE_URL=https://www.mediacc.it.com .
docker run -d --name mediacc-app -p 80:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BASE_URL=https://www.mediacc.it.com \
  mediacc:latest
```

**Bare metal**

```bash
npm ci
./download-ffmpeg.sh
npm run build
npm start
```

TLS, Cloudflare **Full (strict)**, DNS **`www`** + apex, COOP/COEP at edge — see **`DEPLOYMENT.md`**.

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
| **[https://mediacc.it.com](https://mediacc.it.com)** | Entrada producción; apex redirige a **`www`**. |
| **[https://www.mediacc.it.com/image](https://www.mediacc.it.com/image)** | Herramienta de imagen. |
| **[https://www.mediacc.it.com/video](https://www.mediacc.it.com/video)** | Herramienta de vídeo. |

Interfaz localizada: **`/es/image`**, **`/es/video`** (también `/ja`, `/pt`).

### Cómo funciona

1. **Imágenes:** **Canvas**; **HEIC** con **heic2any**; compresión con **browser-image-compression** (Workers opcionales).  
2. **Vídeo:** **FFmpeg.wasm** en el cliente; hace falta **COOP/COEP** para multihilo.  
3. **Aplicación:** **Next.js 15**, React 18, TypeScript, Tailwind, **Zustand**.  
4. **Cabeceras** en `next.config.js`: igual que en la versión inglesa; mantener tras proxy/CDN.

### Despliegue

```bash
git clone <your-repo-url> mediacc && cd mediacc
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh
docker compose build
docker compose up -d
```

Variables: **`NEXT_PUBLIC_BASE_URL`** = URL pública (ej. `https://www.mediacc.it.com`). Alternativa: `docker build` / `docker run` como en la sección English. Desarrollo local: `npm install`, `./download-ffmpeg.sh`, `npm run dev`.

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
| **[https://mediacc.it.com](https://mediacc.it.com)** | 本番入口（apex は **`www`** にリダイレクト） |
| **[https://www.mediacc.it.com/image](https://www.mediacc.it.com/image)** | 画像ツール |
| **[https://www.mediacc.it.com/video](https://www.mediacc.it.com/video)** | 動画ツール |

日本語 UI: **`/ja/image`**、**`/ja/video`**（`/es`、`/pt` も同様）。

### 実装の仕組み

1. **画像:** **Canvas** 描画・出力、HEIC は **heic2any**、圧縮は **browser-image-compression**（Web Worker 可）。  
2. **動画:** ブラウザ内 **FFmpeg.wasm**。マルチスレッド用に **COOP/COEP** が必要。  
3. **アプリ:** **Next.js 15** App Router、React 18、TypeScript、Tailwind、**Zustand**。  
4. **`next.config.js`** の分離ヘッダは CDN 背後でも維持。

### デプロイ

```bash
git clone <your-repo-url> mediacc && cd mediacc
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh
docker compose build
docker compose up -d
```

**`NEXT_PUBLIC_BASE_URL`** に本番 URL（例: `https://www.mediacc.it.com`）を設定。詳細は英語版と **`DEPLOYMENT.md`**。開発: `npm install` → `./download-ffmpeg.sh` → `npm run dev`。

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
| **[https://mediacc.it.com](https://mediacc.it.com)** | Entrada; apex redireciona para **`www`**. |
| **[https://www.mediacc.it.com/image](https://www.mediacc.it.com/image)** | Ferramenta de imagem. |
| **[https://www.mediacc.it.com/video](https://www.mediacc.it.com/video)** | Ferramenta de vídeo. |

UI em português: **`/pt/image`**, **`/pt/video`** (também `/ja`, `/es`).

### Como funciona

1. **Imagens:** **Canvas**; **HEIC** com **heic2any**; compressão com **browser-image-compression**.  
2. **Vídeo:** **FFmpeg.wasm** no cliente; **COOP/COEP** para multithreading.  
3. **App:** **Next.js 15**, React 18, TypeScript, Tailwind, **Zustand**.  
4. Cabeçalhos em `next.config.js` — manter atrás de CDN/proxy.

### Implantação

```bash
git clone <your-repo-url> mediacc && cd mediacc
chmod +x download-ffmpeg.sh && ./download-ffmpeg.sh
docker compose build
docker compose up -d
```

Defina **`NEXT_PUBLIC_BASE_URL`** com o URL público (ex.: `https://www.mediacc.it.com`). Docker manual e desenvolvimento local: ver secção **English**. Mais detalhes: **`DEPLOYMENT.md`**.

### Privacidade e SEO

Sem envio de ficheiros para servidores MediaCC para a lógica de conversão. Políticas: **`/privacy`**, **`/cookies`**, **`/terms`**. SEO/GEO: metadados, hreflang, `robots.txt`, sitemap, JSON-LD.

### Stack

Next.js 15 · TypeScript · Tailwind · Canvas · heic2any · browser-image-compression · FFmpeg.wasm · Zustand · Lucide.

</details>

---

## Project structure (reference)

```
mediacc/
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
