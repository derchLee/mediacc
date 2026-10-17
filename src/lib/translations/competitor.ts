/**
 * Competitor sidebar & comparison table translations (per locale).
 */

import type { Locale } from "./types";

export interface ComparisonRowT {
  feature: string;
  mediaKit: string;
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
  tableMediaKit: string;
  tableCloudTools: string;
  tableRecommendation: string;
  imageComparisonRows: ComparisonRowT[];
  videoComparisonRows: ComparisonRowT[];
  useMediaKitTitle: string;
  useMediaKitList: string[];
  useOthersTitle: string;
  useOthersList: string[];
}

const en: CompetitorT = {
  sidebarTitle: "Popular Online Tools",
  sidebarNote: "Third-party sites for reference. MediaKit processes files locally in your browser.",
  categoryImageCompress: "Image Compression",
  categoryImageConvert: "Image Format Conversion",
  categoryVideoCompress: "Video Compression",
  categoryVideoConvert: "Video Format Conversion",
  externalLink: "Opens external site",
  comparisonTitle: "MediaKit vs Other Online Tools",
  comparisonSubtitle:
    "See how MediaKit compares with typical cloud-based converters and compressors, and when each option makes sense.",
  tableFeature: "Dimension",
  tableMediaKit: "MediaKit",
  tableCloudTools: "Typical Cloud Tools",
  tableRecommendation: "Who Should Use",
  imageComparisonRows: [
    {
      feature: "Privacy & data flow",
      mediaKit: "100% local — files never uploaded",
      cloudTools: "Files uploaded to remote servers",
      recommendation: "Use MediaKit for sensitive or confidential images",
    },
    {
      feature: "Account / signup",
      mediaKit: "No account required",
      cloudTools: "Often free tier with limits; paid plans for volume",
      recommendation: "MediaKit for quick, anonymous one-off tasks",
    },
    {
      feature: "Batch processing",
      mediaKit: "Up to 15 files per session",
      cloudTools: "Varies; many limit free batch size",
      recommendation: "MediaKit when processing multiple files at once locally",
    },
    {
      feature: "HEIC / iPhone photos",
      mediaKit: "Native HEIC support in-browser",
      cloudTools: "Supported on some sites (e.g. CloudConvert, Convertio)",
      recommendation: "MediaKit if you want HEIC handled without uploading",
    },
    {
      feature: "Compression quality",
      mediaKit: "Lossless & lossy modes; good for everyday use",
      cloudTools: "Often stronger algorithms & tuning (e.g. TinyPNG, Squoosh)",
      recommendation: "Try TinyPNG or Squoosh when maximum compression ratio matters",
    },
    {
      feature: "Format coverage",
      mediaKit: "JPG, PNG, WebP, plus HEIC/HEIF input in supported browsers",
      cloudTools: "Broader exotic formats (RAW, PSD, etc.) on CloudConvert",
      recommendation: "CloudConvert / Convertio for rare or professional formats",
    },
    {
      feature: "Speed (large files)",
      mediaKit: "Limited by device CPU/RAM",
      cloudTools: "Server-grade hardware; often faster for huge files",
      recommendation: "Cloud tools when local browser runs out of memory",
    },
    {
      feature: "Watermarks / fees",
      mediaKit: "Free, no watermarks",
      cloudTools: "Free tiers may have limits, ads, or watermarks",
      recommendation: "MediaKit for clean, unlimited-feeling free use",
    },
  ],
  videoComparisonRows: [
    {
      feature: "Privacy & data flow",
      mediaKit: "100% local — videos never uploaded",
      cloudTools: "Videos uploaded and processed on servers",
      recommendation: "Use MediaKit for private, unreleased, or client footage",
    },
    {
      feature: "Account / signup",
      mediaKit: "No account required",
      cloudTools: "Free tier with file size/duration caps",
      recommendation: "MediaKit for anonymous, registration-free workflows",
    },
    {
      feature: "Engine",
      mediaKit: "FFmpeg.wasm in browser",
      cloudTools: "Server-side FFmpeg or proprietary encoders",
      recommendation: "Cloud tools when you need fastest encode on huge files",
    },
    {
      feature: "Batch processing",
      mediaKit: "Queue up to 15 files locally",
      cloudTools: "Batch limits on free plans",
      recommendation: "MediaKit for multiple clips without sending to cloud",
    },
    {
      feature: "Format coverage",
      mediaKit: "MP4, WebM, MOV, MKV, AVI",
      cloudTools: "Wider codec support (ProRes, AV1 presets, etc.)",
      recommendation: "CloudConvert / Convertio for niche professional codecs",
    },
    {
      feature: "Compression presets",
      mediaKit: "Lossless & lossy modes built-in",
      cloudTools: "More manual encoding controls on VEED, Clideo",
      recommendation: "VEED / Clideo when you need fine-grained encoding control",
    },
    {
      feature: "Large file handling",
      mediaKit: "Best under ~50MB per file in browser",
      cloudTools: "Often accept 500MB–2GB+ on paid tiers",
      recommendation: "FreeConvert / Media.io when files exceed local browser limits",
    },
    {
      feature: "Watermarks / fees",
      mediaKit: "Free, no watermarks",
      cloudTools: "Free exports may be capped or watermarked",
      recommendation: "MediaKit for simple, watermark-free local conversion",
    },
  ],
  useMediaKitTitle: "When MediaKit is the better choice",
  useMediaKitList: [
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
    "Advanced manual video encoding controls (VEED, Clideo for video)",
    "Desktop batch workflows with CLI (HandBrake for video)",
  ],
};

const ja: CompetitorT = {
  sidebarTitle: "人気のオンラインツール",
  sidebarNote: "参考用の第三者サイトです。MediaKit はブラウザ内でローカル処理します。",
  categoryImageCompress: "画像圧縮",
  categoryImageConvert: "画像形式変換",
  categoryVideoCompress: "動画圧縮",
  categoryVideoConvert: "動画形式変換",
  externalLink: "外部サイトを開く",
  comparisonTitle: "MediaKit と他社オンラインツールの比較",
  comparisonSubtitle:
    "クラウド型の変換・圧縮サービスと MediaKit の違い、それぞれ向いている場面をまとめました。",
  tableFeature: "比較項目",
  tableMediaKit: "MediaKit",
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
    const mediaKit = [
      "100%ローカル — アップロードなし",
      "登録不要",
      "1セッション最大15ファイル",
      "ブラウザ内で HEIC 対応",
      "可逆・非可逆モード",
      "JPG, PNG, WebP、対応ブラウザで HEIC/HEIF 入力",
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
      "機密画像は MediaKit",
      "匿名で手軽に使うなら MediaKit",
      "複数ファイルをローカル一括なら MediaKit",
      "HEIC をアップロードせず処理なら MediaKit",
      "最大圧縮率なら TinyPNG / Squoosh",
      "特殊形式は CloudConvert 等",
      "ブラウザが重い場合はクラウド",
      "透かしなし無料なら MediaKit",
    ];
    return { feature: features[i], mediaKit: mediaKit[i], cloudTools: cloud[i], recommendation: rec[i] };
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
    const mediaKit = [
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
      "未公開・クライアント素材は MediaKit",
      "登録なしで使うなら MediaKit",
      "超大容量の高速変換はクラウド",
      "複数クリップをクラウドに送らないなら MediaKit",
      "ニッチなコーデックは CloudConvert",
      "細かなエンコード制御は VEED / Clideo",
      "500MB超は FreeConvert 等",
      "透かしなし無料なら MediaKit",
    ];
    return { feature: features[i], mediaKit: mediaKit[i], cloudTools: cloud[i], recommendation: rec[i] };
  }),
  useMediaKitTitle: "MediaKit が向いている場面",
  useMediaKitList: [
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
    "細かな動画エンコード制御（VEED, Clideo）",
    "デスクトップでの一括処理（HandBrake など）",
  ],
};

const es: CompetitorT = {
  sidebarTitle: "Herramientas en línea populares",
  sidebarNote: "Sitios de terceros como referencia. MediaKit procesa archivos localmente en tu navegador.",
  categoryImageCompress: "Compresión de imágenes",
  categoryImageConvert: "Conversión de formato de imagen",
  categoryVideoCompress: "Compresión de video",
  categoryVideoConvert: "Conversión de formato de video",
  externalLink: "Abre sitio externo",
  comparisonTitle: "MediaKit vs otras herramientas en línea",
  comparisonSubtitle:
    "Compara MediaKit con convertidores y compresores en la nube típicos, y cuándo conviene cada opción.",
  tableFeature: "Dimensión",
  tableMediaKit: "MediaKit",
  tableCloudTools: "Herramientas en la nube",
  tableRecommendation: "Quién debería usar",
  imageComparisonRows: [
    { feature: "Privacidad y datos", mediaKit: "100% local — sin subida", cloudTools: "Archivos subidos a servidores", recommendation: "MediaKit para imágenes confidenciales" },
    { feature: "Cuenta / registro", mediaKit: "Sin cuenta", cloudTools: "Plan gratuito con límites", recommendation: "MediaKit para tareas rápidas y anónimas" },
    { feature: "Procesamiento por lotes", mediaKit: "Hasta 15 archivos por sesión", cloudTools: "Lotes limitados en plan gratis", recommendation: "MediaKit para varios archivos a la vez" },
    { feature: "HEIC / fotos iPhone", mediaKit: "Soporte HEIC en el navegador", cloudTools: "Algunos sitios lo soportan", recommendation: "MediaKit sin subir HEIC" },
    { feature: "Calidad de compresión", mediaKit: "Modos sin pérdida y con pérdida", cloudTools: "Algoritmos más potentes (TinyPNG, Squoosh)", recommendation: "TinyPNG/Squoosh para máxima compresión" },
    { feature: "Formatos", mediaKit: "JPG, PNG, WebP y entrada HEIC/HEIF en navegadores compatibles", cloudTools: "Más formatos raros (RAW, PSD)", recommendation: "CloudConvert para formatos profesionales" },
    { feature: "Velocidad (archivos grandes)", mediaKit: "Limitado por CPU/RAM local", cloudTools: "Servidores potentes", recommendation: "Nube si el navegador se queda sin memoria" },
    { feature: "Marcas de agua / coste", mediaKit: "Gratis, sin marcas", cloudTools: "Límites o marcas en plan gratis", recommendation: "MediaKit para uso gratuito limpio" },
  ],
  videoComparisonRows: [
    { feature: "Privacidad y datos", mediaKit: "100% local — sin subida", cloudTools: "Videos subidos a servidores", recommendation: "MediaKit para material privado o de clientes" },
    { feature: "Cuenta / registro", mediaKit: "Sin cuenta", cloudTools: "Límites de tamaño en plan gratis", recommendation: "MediaKit sin registro" },
    { feature: "Motor", mediaKit: "FFmpeg.wasm en navegador", cloudTools: "FFmpeg en servidor", recommendation: "Nube para archivos enormes y codificación rápida" },
    { feature: "Procesamiento por lotes", mediaKit: "Cola de hasta 15 archivos", cloudTools: "Lotes limitados gratis", recommendation: "MediaKit para varios clips sin subir" },
    { feature: "Formatos", mediaKit: "MP4, WebM, MOV, MKV, AVI", cloudTools: "Más códecs (ProRes, AV1)", recommendation: "CloudConvert para códecs profesionales" },
    { feature: "Presets de compresión", mediaKit: "Modos de mayor calidad/menor tamaño", cloudTools: "Más controles en VEED, Clideo", recommendation: "VEED/Clideo para control de codificación fino" },
    { feature: "Archivos grandes", mediaKit: "Mejor bajo ~50MB por archivo", cloudTools: "500MB–2GB+ en planes de pago", recommendation: "FreeConvert/Media.io si supera límites locales" },
    { feature: "Marcas de agua / coste", mediaKit: "Gratis, sin marcas", cloudTools: "Exportaciones limitadas gratis", recommendation: "MediaKit para conversión local sin marcas" },
  ],
  useMediaKitTitle: "Cuándo MediaKit es la mejor opción",
  useMediaKitList: [
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
    "Control avanzado de codificación de video (VEED, Clideo)",
    "Flujos de escritorio por lotes (HandBrake para video)",
  ],
};

const pt: CompetitorT = {
  sidebarTitle: "Ferramentas online populares",
  sidebarNote: "Sites de terceiros para referência. O MediaKit processa arquivos localmente no navegador.",
  categoryImageCompress: "Compressão de imagens",
  categoryImageConvert: "Conversão de formato de imagem",
  categoryVideoCompress: "Compressão de vídeo",
  categoryVideoConvert: "Conversão de formato de vídeo",
  externalLink: "Abre site externo",
  comparisonTitle: "MediaKit vs outras ferramentas online",
  comparisonSubtitle:
    "Veja como o MediaKit se compara com conversores e compressores em nuvem típicos e quando cada opção faz sentido.",
  tableFeature: "Dimensão",
  tableMediaKit: "MediaKit",
  tableCloudTools: "Ferramentas em nuvem",
  tableRecommendation: "Quem deve usar",
  imageComparisonRows: [
    { feature: "Privacidade e dados", mediaKit: "100% local — sem upload", cloudTools: "Arquivos enviados a servidores", recommendation: "MediaKit para imagens confidenciais" },
    { feature: "Conta / cadastro", mediaKit: "Sem conta", cloudTools: "Plano grátis com limites", recommendation: "MediaKit para tarefas rápidas e anônimas" },
    { feature: "Processamento em lote", mediaKit: "Até 15 arquivos por sessão", cloudTools: "Lotes limitados no plano grátis", recommendation: "MediaKit para vários arquivos de uma vez" },
    { feature: "HEIC / fotos iPhone", mediaKit: "Suporte HEIC no navegador", cloudTools: "Alguns sites suportam", recommendation: "MediaKit sem enviar HEIC" },
    { feature: "Qualidade de compressão", mediaKit: "Modos sem perda e com perda", cloudTools: "Algoritmos mais fortes (TinyPNG, Squoosh)", recommendation: "TinyPNG/Squoosh para máxima compressão" },
    { feature: "Formatos", mediaKit: "JPG, PNG, WebP e entrada HEIC/HEIF em navegadores compatíveis", cloudTools: "Mais formatos raros (RAW, PSD)", recommendation: "CloudConvert para formatos profissionais" },
    { feature: "Velocidade (arquivos grandes)", mediaKit: "Limitado por CPU/RAM local", cloudTools: "Servidores potentes", recommendation: "Nuvem se o navegador ficar sem memória" },
    { feature: "Marcas d'água / custo", mediaKit: "Grátis, sem marcas", cloudTools: "Limites ou marcas no plano grátis", recommendation: "MediaKit para uso gratuito limpo" },
  ],
  videoComparisonRows: [
    { feature: "Privacidade e dados", mediaKit: "100% local — sem upload", cloudTools: "Vídeos enviados a servidores", recommendation: "MediaKit para material privado ou de clientes" },
    { feature: "Conta / cadastro", mediaKit: "Sem conta", cloudTools: "Limites de tamanho no plano grátis", recommendation: "MediaKit sem cadastro" },
    { feature: "Motor", mediaKit: "FFmpeg.wasm no navegador", cloudTools: "FFmpeg no servidor", recommendation: "Nuvem para arquivos enormes e codificação rápida" },
    { feature: "Processamento em lote", mediaKit: "Fila de até 15 arquivos", cloudTools: "Lotes limitados grátis", recommendation: "MediaKit para vários clipes sem enviar" },
    { feature: "Formatos", mediaKit: "MP4, WebM, MOV, MKV, AVI", cloudTools: "Mais codecs (ProRes, AV1)", recommendation: "CloudConvert para codecs profissionais" },
    { feature: "Presets de compressão", mediaKit: "Modos de maior qualidade/menor tamanho", cloudTools: "Mais controles no VEED, Clideo", recommendation: "VEED/Clideo para controle fino de codificação" },
    { feature: "Arquivos grandes", mediaKit: "Melhor abaixo de ~50MB por arquivo", cloudTools: "500MB–2GB+ em planos pagos", recommendation: "FreeConvert/Media.io se exceder limites locais" },
    { feature: "Marcas d'água / custo", mediaKit: "Grátis, sem marcas", cloudTools: "Exportações limitadas grátis", recommendation: "MediaKit para conversão local sem marcas" },
  ],
  useMediaKitTitle: "Quando o MediaKit é a melhor escolha",
  useMediaKitList: [
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
    "Controle avançado de codificação de vídeo (VEED, Clideo)",
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
