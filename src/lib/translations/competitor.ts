/**
 * Competitor sidebar & comparison table translations (per locale).
 */

import type { Locale } from "./types";

export interface ComparisonRowT {
  feature: string;
  mediaCC: string;
  cloudTools: string;
  recommendation: string;
}

export interface CompetitorT {
  sidebarTitle: string;
  sidebarNote: string;
  categoryImageCompress: string;
  categoryImageConvert: string;
  categoryVideoCompress: string;
  categoryVideoConvert: string;
  externalLink: string;
  comparisonTitle: string;
  comparisonSubtitle: string;
  tableFeature: string;
  tableMediaCC: string;
  tableCloudTools: string;
  tableRecommendation: string;
  imageComparisonRows: ComparisonRowT[];
  videoComparisonRows: ComparisonRowT[];
  useMediaCCTitle: string;
  useMediaCCList: string[];
  useOthersTitle: string;
  useOthersList: string[];
}

const en: CompetitorT = {
  sidebarTitle: "Popular Online Tools",
  sidebarNote: "Third-party sites for reference. MediaCC processes files locally in your browser.",
  categoryImageCompress: "Image Compression",
  categoryImageConvert: "Image Format Conversion",
  categoryVideoCompress: "Video Compression",
  categoryVideoConvert: "Video Format Conversion",
  externalLink: "Opens external site",
  comparisonTitle: "MediaCC vs Other Online Tools",
  comparisonSubtitle:
    "See how MediaCC compares with typical cloud-based converters and compressors, and when each option makes sense.",
  tableFeature: "Dimension",
  tableMediaCC: "MediaCC",
  tableCloudTools: "Typical Cloud Tools",
  tableRecommendation: "Who Should Use",
  imageComparisonRows: [
    {
      feature: "Privacy & data flow",
      mediaCC: "100% local — files never uploaded",
      cloudTools: "Files uploaded to remote servers",
      recommendation: "Use MediaCC for sensitive or confidential images",
    },
    {
      feature: "Account / signup",
      mediaCC: "No account required",
      cloudTools: "Often free tier with limits; paid plans for volume",
      recommendation: "MediaCC for quick, anonymous one-off tasks",
    },
    {
      feature: "Batch processing",
      mediaCC: "Up to 15 files per session",
      cloudTools: "Varies; many limit free batch size",
      recommendation: "MediaCC when processing multiple files at once locally",
    },
    {
      feature: "HEIC / iPhone photos",
      mediaCC: "Native HEIC support in-browser",
      cloudTools: "Supported on some sites (e.g. CloudConvert, Convertio)",
      recommendation: "MediaCC if you want HEIC handled without uploading",
    },
    {
      feature: "Compression quality",
      mediaCC: "Lossless & lossy modes; good for everyday use",
      cloudTools: "Often stronger algorithms & tuning (e.g. TinyPNG, Squoosh)",
      recommendation: "Try TinyPNG or Squoosh when maximum compression ratio matters",
    },
    {
      feature: "Format coverage",
      mediaCC: "JPG, PNG, WebP, AVIF, HEIC, GIF, BMP, TIFF",
      cloudTools: "Broader exotic formats (RAW, PSD, etc.) on CloudConvert",
      recommendation: "CloudConvert / Convertio for rare or professional formats",
    },
    {
      feature: "Speed (large files)",
      mediaCC: "Limited by device CPU/RAM",
      cloudTools: "Server-grade hardware; often faster for huge files",
      recommendation: "Cloud tools when local browser runs out of memory",
    },
    {
      feature: "Watermarks / fees",
      mediaCC: "Free, no watermarks",
      cloudTools: "Free tiers may have limits, ads, or watermarks",
      recommendation: "MediaCC for clean, unlimited-feeling free use",
    },
  ],
  videoComparisonRows: [
    {
      feature: "Privacy & data flow",
      mediaCC: "100% local — videos never uploaded",
      cloudTools: "Videos uploaded and processed on servers",
      recommendation: "Use MediaCC for private, unreleased, or client footage",
    },
    {
      feature: "Account / signup",
      mediaCC: "No account required",
      cloudTools: "Free tier with file size/duration caps",
      recommendation: "MediaCC for anonymous, registration-free workflows",
    },
    {
      feature: "Engine",
      mediaCC: "FFmpeg.wasm in browser",
      cloudTools: "Server-side FFmpeg or proprietary encoders",
      recommendation: "Cloud tools when you need fastest encode on huge files",
    },
    {
      feature: "Batch processing",
      mediaCC: "Queue up to 15 files locally",
      cloudTools: "Batch limits on free plans",
      recommendation: "MediaCC for multiple clips without sending to cloud",
    },
    {
      feature: "Format coverage",
      mediaCC: "MP4, WebM, MOV, MKV, AVI",
      cloudTools: "Wider codec support (ProRes, AV1 presets, etc.)",
      recommendation: "CloudConvert / Convertio for niche professional codecs",
    },
    {
      feature: "Compression presets",
      mediaCC: "Lossless & lossy modes built-in",
      cloudTools: "More sliders (resolution, bitrate, CRF) on VEED, Clideo",
      recommendation: "VEED / Clideo when you need fine-grained bitrate control",
    },
    {
      feature: "Large file handling",
      mediaCC: "Best under ~50MB per file in browser",
      cloudTools: "Often accept 500MB–2GB+ on paid tiers",
      recommendation: "FreeConvert / Media.io when files exceed local browser limits",
    },
    {
      feature: "Watermarks / fees",
      mediaCC: "Free, no watermarks",
      cloudTools: "Free exports may be capped or watermarked",
      recommendation: "MediaCC for simple, watermark-free local conversion",
    },
  ],
  useMediaCCTitle: "When MediaCC is the better choice",
  useMediaCCList: [
    "Confidential photos or videos that must not leave your device",
    "Quick convert/compress without creating an account",
    "Batch processing several files with zero upload wait",
    "HEIC photos from iPhone handled entirely on your phone or PC browser",
    "You want a free tool with no watermarks and no hidden upload",
  ],
  useOthersTitle: "When a sidebar tool may be worth trying",
  useOthersList: [
    "You need maximum compression quality (TinyPNG, Squoosh for images)",
    "Rare formats like RAW, PSD, or professional codecs (CloudConvert, Convertio)",
    "Very large videos (500MB+) that exceed browser memory (FreeConvert, Media.io)",
    "Advanced bitrate/resolution sliders (VEED, Clideo for video)",
    "Desktop batch workflows with CLI (HandBrake for video)",
  ],
};

const ja: CompetitorT = {
  sidebarTitle: "人気のオンラインツール",
  sidebarNote: "参考用の第三者サイトです。MediaCC はブラウザ内でローカル処理します。",
  categoryImageCompress: "画像圧縮",
  categoryImageConvert: "画像形式変換",
  categoryVideoCompress: "動画圧縮",
  categoryVideoConvert: "動画形式変換",
  externalLink: "外部サイトを開く",
  comparisonTitle: "MediaCC と他社オンラインツールの比較",
  comparisonSubtitle:
    "クラウド型の変換・圧縮サービスと MediaCC の違い、それぞれ向いている場面をまとめました。",
  tableFeature: "比較項目",
  tableMediaCC: "MediaCC",
  tableCloudTools: "一般的なクラウドツール",
  tableRecommendation: "おすすめの使い分け",
  imageComparisonRows: en.imageComparisonRows.map((r, i) => {
    const features = [
      "プライバシー・データの流れ",
      "アカウント・登録",
      "一括処理",
      "HEIC / iPhone 写真",
      "圧縮品質",
      "対応形式",
      "速度（大容量）",
      "透かし・料金",
    ];
    const mediaCC = [
      "100%ローカル — アップロードなし",
      "登録不要",
      "1セッション最大15ファイル",
      "ブラウザ内で HEIC 対応",
      "可逆・非可逆モード",
      "JPG, PNG, WebP, AVIF, HEIC など",
      "端末の CPU/RAM に依存",
      "無料・透かしなし",
    ];
    const cloud = [
      "サーバーへアップロード",
      "無料枠あり・有料プランあり",
      "無料は件数制限あり",
      "一部サイトで対応",
      "TinyPNG 等は高圧縮率",
      "RAW, PSD など幅広い",
      "サーバー処理で大容量向き",
      "無料枠に制限・広告あり",
    ];
    const rec = [
      "機密画像は MediaCC",
      "匿名で手軽に使うなら MediaCC",
      "複数ファイルをローカル一括なら MediaCC",
      "HEIC をアップロードせず処理なら MediaCC",
      "最大圧縮率なら TinyPNG / Squoosh",
      "特殊形式は CloudConvert 等",
      "ブラウザが重い場合はクラウド",
      "透かしなし無料なら MediaCC",
    ];
    return { feature: features[i], mediaCC: mediaCC[i], cloudTools: cloud[i], recommendation: rec[i] };
  }),
  videoComparisonRows: en.videoComparisonRows.map((r, i) => {
    const features = [
      "プライバシー・データの流れ",
      "アカウント・登録",
      "エンジン",
      "一括処理",
      "対応形式",
      "圧縮プリセット",
      "大容量ファイル",
      "透かし・料金",
    ];
    const mediaCC = [
      "100%ローカル — 動画はアップロードされない",
      "登録不要",
      "ブラウザ内 FFmpeg.wasm",
      "最大15ファイルをキュー処理",
      "MP4, WebM, MOV, MKV, AVI",
      "可逆・非可逆モード内蔵",
      "1ファイル約50MB以下が快適",
      "無料・透かしなし",
    ];
    const cloud = [
      "サーバーへアップロード",
      "無料枠にサイズ制限",
      "サーバー側 FFmpeg",
      "無料は件数制限",
      "ProRes 等のプロ向けコーデック",
      "VEED 等で細かい調整可能",
      "有料で 500MB〜2GB+",
      "無料出力に制限あり",
    ];
    const rec = [
      "未公開・クライアント素材は MediaCC",
      "登録なしで使うなら MediaCC",
      "超大容量の高速変換はクラウド",
      "複数クリップをクラウドに送らないなら MediaCC",
      "ニッチなコーデックは CloudConvert",
      "ビットレート細調整は VEED / Clideo",
      "500MB超は FreeConvert 等",
      "透かしなし無料なら MediaCC",
    ];
    return { feature: features[i], mediaCC: mediaCC[i], cloudTools: cloud[i], recommendation: rec[i] };
  }),
  useMediaCCTitle: "MediaCC が向いている場面",
  useMediaCCList: [
    "端末から出してはいけない機密の写真・動画",
    "アカウント登録なしで素早く変換・圧縮したい",
    "アップロード待ちなしで複数ファイルを一括処理",
    "iPhone の HEIC をブラウザだけで処理したい",
    "透かしなし・完全無料で使いたい",
  ],
  useOthersTitle: "サイドバーのツールを試す価値がある場面",
  useOthersList: [
    "最高の圧縮率が必要（画像: TinyPNG, Squoosh）",
    "RAW, PSD やプロ向けコーデック（CloudConvert, Convertio）",
    "ブラウザ上限を超える超大容量動画（FreeConvert, Media.io）",
    "ビットレート・解像度の細かい調整（VEED, Clideo）",
    "デスクトップでの一括処理（HandBrake など）",
  ],
};

const es: CompetitorT = {
  sidebarTitle: "Herramientas en línea populares",
  sidebarNote: "Sitios de terceros como referencia. MediaCC procesa archivos localmente en tu navegador.",
  categoryImageCompress: "Compresión de imágenes",
  categoryImageConvert: "Conversión de formato de imagen",
  categoryVideoCompress: "Compresión de video",
  categoryVideoConvert: "Conversión de formato de video",
  externalLink: "Abre sitio externo",
  comparisonTitle: "MediaCC vs otras herramientas en línea",
  comparisonSubtitle:
    "Compara MediaCC con convertidores y compresores en la nube típicos, y cuándo conviene cada opción.",
  tableFeature: "Dimensión",
  tableMediaCC: "MediaCC",
  tableCloudTools: "Herramientas en la nube",
  tableRecommendation: "Quién debería usar",
  imageComparisonRows: [
    { feature: "Privacidad y datos", mediaCC: "100% local — sin subida", cloudTools: "Archivos subidos a servidores", recommendation: "MediaCC para imágenes confidenciales" },
    { feature: "Cuenta / registro", mediaCC: "Sin cuenta", cloudTools: "Plan gratuito con límites", recommendation: "MediaCC para tareas rápidas y anónimas" },
    { feature: "Procesamiento por lotes", mediaCC: "Hasta 15 archivos por sesión", cloudTools: "Lotes limitados en plan gratis", recommendation: "MediaCC para varios archivos a la vez" },
    { feature: "HEIC / fotos iPhone", mediaCC: "Soporte HEIC en el navegador", cloudTools: "Algunos sitios lo soportan", recommendation: "MediaCC sin subir HEIC" },
    { feature: "Calidad de compresión", mediaCC: "Modos sin pérdida y con pérdida", cloudTools: "Algoritmos más potentes (TinyPNG, Squoosh)", recommendation: "TinyPNG/Squoosh para máxima compresión" },
    { feature: "Formatos", mediaCC: "JPG, PNG, WebP, AVIF, HEIC, GIF", cloudTools: "Más formatos raros (RAW, PSD)", recommendation: "CloudConvert para formatos profesionales" },
    { feature: "Velocidad (archivos grandes)", mediaCC: "Limitado por CPU/RAM local", cloudTools: "Servidores potentes", recommendation: "Nube si el navegador se queda sin memoria" },
    { feature: "Marcas de agua / coste", mediaCC: "Gratis, sin marcas", cloudTools: "Límites o marcas en plan gratis", recommendation: "MediaCC para uso gratuito limpio" },
  ],
  videoComparisonRows: [
    { feature: "Privacidad y datos", mediaCC: "100% local — sin subida", cloudTools: "Videos subidos a servidores", recommendation: "MediaCC para material privado o de clientes" },
    { feature: "Cuenta / registro", mediaCC: "Sin cuenta", cloudTools: "Límites de tamaño en plan gratis", recommendation: "MediaCC sin registro" },
    { feature: "Motor", mediaCC: "FFmpeg.wasm en navegador", cloudTools: "FFmpeg en servidor", recommendation: "Nube para archivos enormes y codificación rápida" },
    { feature: "Procesamiento por lotes", mediaCC: "Cola de hasta 15 archivos", cloudTools: "Lotes limitados gratis", recommendation: "MediaCC para varios clips sin subir" },
    { feature: "Formatos", mediaCC: "MP4, WebM, MOV, MKV, AVI", cloudTools: "Más códecs (ProRes, AV1)", recommendation: "CloudConvert para códecs profesionales" },
    { feature: "Presets de compresión", mediaCC: "Modos sin/con pérdida", cloudTools: "Más controles en VEED, Clideo", recommendation: "VEED/Clideo para ajuste fino de bitrate" },
    { feature: "Archivos grandes", mediaCC: "Mejor bajo ~50MB por archivo", cloudTools: "500MB–2GB+ en planes de pago", recommendation: "FreeConvert/Media.io si supera límites locales" },
    { feature: "Marcas de agua / coste", mediaCC: "Gratis, sin marcas", cloudTools: "Exportaciones limitadas gratis", recommendation: "MediaCC para conversión local sin marcas" },
  ],
  useMediaCCTitle: "Cuándo MediaCC es la mejor opción",
  useMediaCCList: [
    "Fotos o videos confidenciales que no deben salir del dispositivo",
    "Convertir/comprimir rápido sin crear cuenta",
    "Procesar varios archivos sin esperar subidas",
    "Fotos HEIC de iPhone solo en el navegador",
    "Herramienta gratuita sin marcas de agua ni subida oculta",
  ],
  useOthersTitle: "Cuándo probar una herramienta del panel lateral",
  useOthersList: [
    "Máxima compresión (TinyPNG, Squoosh para imágenes)",
    "Formatos raros RAW, PSD o códecs pro (CloudConvert, Convertio)",
    "Videos muy grandes (500MB+) que exceden la memoria del navegador",
    "Control avanzado de bitrate/resolución (VEED, Clideo)",
    "Flujos de escritorio por lotes (HandBrake para video)",
  ],
};

const pt: CompetitorT = {
  sidebarTitle: "Ferramentas online populares",
  sidebarNote: "Sites de terceiros para referência. O MediaCC processa arquivos localmente no navegador.",
  categoryImageCompress: "Compressão de imagens",
  categoryImageConvert: "Conversão de formato de imagem",
  categoryVideoCompress: "Compressão de vídeo",
  categoryVideoConvert: "Conversão de formato de vídeo",
  externalLink: "Abre site externo",
  comparisonTitle: "MediaCC vs outras ferramentas online",
  comparisonSubtitle:
    "Veja como o MediaCC se compara com conversores e compressores em nuvem típicos e quando cada opção faz sentido.",
  tableFeature: "Dimensão",
  tableMediaCC: "MediaCC",
  tableCloudTools: "Ferramentas em nuvem",
  tableRecommendation: "Quem deve usar",
  imageComparisonRows: [
    { feature: "Privacidade e dados", mediaCC: "100% local — sem upload", cloudTools: "Arquivos enviados a servidores", recommendation: "MediaCC para imagens confidenciais" },
    { feature: "Conta / cadastro", mediaCC: "Sem conta", cloudTools: "Plano grátis com limites", recommendation: "MediaCC para tarefas rápidas e anônimas" },
    { feature: "Processamento em lote", mediaCC: "Até 15 arquivos por sessão", cloudTools: "Lotes limitados no plano grátis", recommendation: "MediaCC para vários arquivos de uma vez" },
    { feature: "HEIC / fotos iPhone", mediaCC: "Suporte HEIC no navegador", cloudTools: "Alguns sites suportam", recommendation: "MediaCC sem enviar HEIC" },
    { feature: "Qualidade de compressão", mediaCC: "Modos sem perda e com perda", cloudTools: "Algoritmos mais fortes (TinyPNG, Squoosh)", recommendation: "TinyPNG/Squoosh para máxima compressão" },
    { feature: "Formatos", mediaCC: "JPG, PNG, WebP, AVIF, HEIC, GIF", cloudTools: "Mais formatos raros (RAW, PSD)", recommendation: "CloudConvert para formatos profissionais" },
    { feature: "Velocidade (arquivos grandes)", mediaCC: "Limitado por CPU/RAM local", cloudTools: "Servidores potentes", recommendation: "Nuvem se o navegador ficar sem memória" },
    { feature: "Marcas d'água / custo", mediaCC: "Grátis, sem marcas", cloudTools: "Limites ou marcas no plano grátis", recommendation: "MediaCC para uso gratuito limpo" },
  ],
  videoComparisonRows: [
    { feature: "Privacidade e dados", mediaCC: "100% local — sem upload", cloudTools: "Vídeos enviados a servidores", recommendation: "MediaCC para material privado ou de clientes" },
    { feature: "Conta / cadastro", mediaCC: "Sem conta", cloudTools: "Limites de tamanho no plano grátis", recommendation: "MediaCC sem cadastro" },
    { feature: "Motor", mediaCC: "FFmpeg.wasm no navegador", cloudTools: "FFmpeg no servidor", recommendation: "Nuvem para arquivos enormes e codificação rápida" },
    { feature: "Processamento em lote", mediaCC: "Fila de até 15 arquivos", cloudTools: "Lotes limitados grátis", recommendation: "MediaCC para vários clipes sem enviar" },
    { feature: "Formatos", mediaCC: "MP4, WebM, MOV, MKV, AVI", cloudTools: "Mais codecs (ProRes, AV1)", recommendation: "CloudConvert para codecs profissionais" },
    { feature: "Presets de compressão", mediaCC: "Modos sem/com perda", cloudTools: "Mais controles no VEED, Clideo", recommendation: "VEED/Clideo para ajuste fino de bitrate" },
    { feature: "Arquivos grandes", mediaCC: "Melhor abaixo de ~50MB por arquivo", cloudTools: "500MB–2GB+ em planos pagos", recommendation: "FreeConvert/Media.io se exceder limites locais" },
    { feature: "Marcas d'água / custo", mediaCC: "Grátis, sem marcas", cloudTools: "Exportações limitadas grátis", recommendation: "MediaCC para conversão local sem marcas" },
  ],
  useMediaCCTitle: "Quando o MediaCC é a melhor escolha",
  useMediaCCList: [
    "Fotos ou vídeos confidenciais que não podem sair do dispositivo",
    "Converter/comprimir rápido sem criar conta",
    "Processar vários arquivos sem esperar upload",
    "Fotos HEIC do iPhone só no navegador",
    "Ferramenta gratuita sem marcas d'água nem upload oculto",
  ],
  useOthersTitle: "Quando vale testar uma ferramenta da barra lateral",
  useOthersList: [
    "Máxima compressão (TinyPNG, Squoosh para imagens)",
    "Formatos raros RAW, PSD ou codecs pro (CloudConvert, Convertio)",
    "Vídeos muito grandes (500MB+) que excedem a memória do navegador",
    "Controle avançado de bitrate/resolução (VEED, Clideo)",
    "Fluxos desktop em lote (HandBrake para vídeo)",
  ],
};

const map: Record<Locale, CompetitorT> = { en, ja, es, pt };

export function getCompetitorT(locale: Locale): CompetitorT {
  return map[locale];
}

export function getCategoryLabel(
  t: CompetitorT,
  id: "imageCompress" | "imageConvert" | "videoCompress" | "videoConvert"
): string {
  const labels: Record<typeof id, string> = {
    imageCompress: t.categoryImageCompress,
    imageConvert: t.categoryImageConvert,
    videoCompress: t.categoryVideoCompress,
    videoConvert: t.categoryVideoConvert,
  };
  return labels[id];
}
