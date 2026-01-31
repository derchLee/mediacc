/**
 * 日本語 (JA) – URLs: /ja/image, /ja/video
 */

import type { CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT, UiT } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";

export const common: CommonT = {
  tabImage: "画像処理",
  tabVideo: "動画処理",
  followUs: "フォローはこちら：",
  privacyPolicy: "プライバシーポリシー",
  termsOfService: "利用規約",
  cookiePolicy: "Cookieポリシー",
  disclaimer: "免責事項",
  allRightsReserved: "無断転載を禁じます。",
};

export const ui: UiT = {
  dragDropImages: "画像ファイルをここにドラッグ＆ドロップ",
  dragDropVideos: "動画ファイルをここにドラッグ＆ドロップ",
  releaseToUpload: "ここで離してアップロード",
  orClickToSelect: "または下のボタンからファイルを選択",
  selectFiles: "ファイルを選択",
  localProcessingNotice: "100%ローカル処理、ファイルはサーバーに送信されません",
  fileValidationFailed: "ファイルの検証に失敗しました",
  selectOperation: "操作を選択",
  formatConversion: "形式変換",
  convertToOtherFormats: "別の形式に変換",
  compression: "圧縮",
  reduceFileSize: "ファイルサイズを削減",
  selectTargetFormat: "出力形式を選択",
  converting: "変換中...",
  startConversion: "変換を開始",
  selectCompressionMode: "圧縮モードを選択",
  losslessCompression: "可逆圧縮",
  losslessDesc: "画質を維持しつつファイルサイズを若干削減",
  lossyCompression: "非可逆圧縮",
  lossyDesc: "画質を犠牲にしてファイルサイズを削減",
  compressing: "圧縮中...",
  startCompression: "圧縮を開始",
  processingComplete: "処理完了",
  download: "ダウンロード",
  remove: "削除",
  removeFile: "ファイルを削除",
  uploadedFiles: "アップロードしたファイル",
  supportedImageFormats: "対応画像形式",
  supportedVideoFormats: "対応動画形式",
  size: "サイズ",
  type: "タイプ",
  mode: "モード",
  lossless: "可逆",
  lossy: "非可逆",
  targetFormat: "出力形式",
};

export const imagePage: ImagePageT = {
  h1: "無料オンライン画像変換・圧縮ツール",
  intro:
    "MediaCC 画像変換は、ブラウザ内で画像の変換と圧縮ができるツールです。アップロード不要・サーバー処理なし・プライバシーリスクなし。ファイルは端末から一切送信されません。",
  whyChoose: "MediaCCを選ぶ理由",
  whyList: [
    "100%ローカル処理 – ファイルは端末から送信されません",
    "無料・会員登録不要",
    "高速な画像変換・圧縮",
    "JPG、PNG、WebP、AVIFなどに対応",
  ],
  howItWorks: "使い方",
  howSteps: [
    "デバイスから画像を選択（ドラッグ＆ドロップまたはクリックでアップロード）",
    "出力形式または圧縮レベルを選択",
    "処理済み画像を即時ダウンロード – すべてブラウザ内でローカル処理",
  ],
  detailedGuide: "詳細な使い方ガイド",
  howToUse: "使い方",
  formatConversion: "1. 形式変換",
  formatConversionList: [
    "対応形式：JPG/JPEG、PNG、GIF、WebP、AVIF、HEIC、BMP、TIFF",
    "「変換」を選択し、変換先形式を選択（例：JPGからPNG）",
    "「処理開始」をクリックすると、ブラウザ内でローカルに変換が完了します",
    "変換後、新しい形式で画像をダウンロードできます",
  ],
  imageCompression: "2. 画像圧縮",
  imageCompressionList: [
    "「圧縮」を選択し、圧縮モードを選択",
    "可逆圧縮：画質を維持しながらファイルサイズを最適化（約10%削減）",
    "非可逆圧縮：画質とファイルサイズのバランスを取り、大幅に圧縮（約50%削減）",
    "複数画像の一括処理に対応",
  ],
  batchProcessing: "3. 一括処理",
  batchList: [
    "複数の画像を同時にアップロードできます",
    "ファイルはキュー順に処理されます",
    "処理完了後、各ファイルを個別にダウンロードできます",
  ],
  fileLimits: "4. ファイルサイズ制限と注意事項",
  fileLimitsList: [
    "1ファイルあたり最大150MB",
    "1セッション合計最大500MB",
    "同時処理は最大5ファイル",
    "大容量ファイルの注意：",
  ],
  largeFileWarnings: [
    "大きいファイルは処理に時間がかかります。快適に利用するには1ファイル50MB以下を推奨します",
    "100MBを超えるファイルはタイムアウトやメモリ不足の原因になる場合があります",
    "処理に失敗した場合は、別のツールで事前に圧縮してからお試しください",
    "大容量ファイルの処理中はブラウザタブを閉じないでください",
  ],
  implementationPrinciples: "実装の仕組み",
  formatConversionPrinciple: "形式変換の仕組み",
  formatConversionPrincipleList: [
    "ブラウザのCanvas APIを使用した画像形式変換：",
    "元画像をメモリ内のImageオブジェクトに読み込み",
    "Canvasに描画",
    "Canvasの toBlob() で対象形式にエクスポート",
    "JPEG・WebPでは画質パラメータを設定可能（デフォルト92%）",
    "HEIC・AVIFなど非対応形式はPNGにフォールバックまたはユーザーに通知",
  ],
  compressionPrinciple: "圧縮の仕組み",
  compressionPrincipleList: [
    "browser-image-compression ライブラリによる圧縮：",
    "可逆圧縮：形式と画質を維持しつつエンコードパラメータでファイルサイズを削減",
    "非可逆圧縮：画質75%などで圧縮率を最大化",
    "Web Workerでバックグラウンド処理、メインスレッドをブロックしません",
    "解像度は変更せずそのまま維持",
  ],
  privacySecurity: "プライバシーとセキュリティ",
  privacyText:
    "すべての処理はブラウザ内でローカルに実行されます。MediaCCはファイルをアップロード・保存・解析しません。画像は最初から最後まで端末内のみで処理され、サーバー・クラウド・第三者への送信は一切ありません。",
  processingFailed: "処理に失敗しました",
};

export const videoPage: VideoPageT = {
  h1: "無料オンライン動画変換・圧縮ツール",
  intro:
    "MediaCC 動画変換は、ブラウザ内で動画の変換と圧縮ができるツールです。アップロード不要・サーバー処理なし・プライバシーリスクなし。ファイルは端末から一切送信されません。",
  whyChoose: "MediaCCを選ぶ理由",
  whyList: [
    "100%ローカル処理 – ファイルは端末から送信されません",
    "無料・会員登録不要",
    "FFmpeg.wasmによる高速な動画変換・圧縮",
    "MP4、WebM、MOV、MKV、AVIなどに対応",
  ],
  howItWorks: "使い方",
  howSteps: [
    "デバイスから動画を選択（ドラッグ＆ドロップまたはクリックでアップロード）",
    "出力形式または圧縮レベルを選択",
    "処理済み動画をダウンロード – すべてブラウザ内でローカル処理",
  ],
  detailedGuide: "詳細な使い方ガイド",
  howToUse: "使い方",
  formatConversion: "1. 形式変換",
  formatConversionList: [
    "対応形式：MP4、WebM、MOV、AVI、MKV、WMV、FLV",
    "「変換」を選択し、変換先形式を選択（例：MOVからMP4）",
    "「処理開始」をクリックすると、ブラウザ内でローカルに変換が完了します",
    "変換中は進捗が表示され、完了後に新しい形式でダウンロードできます",
  ],
  videoCompression: "2. 動画圧縮",
  videoCompressionList: [
    "「圧縮」を選択し、圧縮モードを選択",
    "可逆圧縮：CRF 18の高画質でファイルサイズを最適化",
    "非可逆圧縮：CRF 28で画質とファイルサイズのバランス、ビットレート制限（動画1Mbps、音声128kbps）",
    "圧縮には時間がかかる場合があります",
  ],
  batchProcessing: "3. 一括処理",
  batchList: [
    "複数の動画を同時にアップロードできます",
    "ファイルはキュー順に処理され、同時処理による負荷を避けます",
    "処理完了後、各ファイルを個別にダウンロードできます",
  ],
  fileLimits: "4. ファイルサイズ制限と注意事項",
  fileLimitsList: [
    "1ファイルあたり最大150MB",
    "1セッション合計最大500MB",
    "同時処理は最大5ファイル",
    "大容量ファイルの注意：",
  ],
  largeFileWarnings: [
    "動画処理は画像より時間がかかります。快適に利用するには1ファイル50MB以下を推奨します",
    "100MBを超える動画は最大45分でタイムアウトやメモリ不足の原因になる場合があります",
    "20–50MBは20–30分、50–100MBは30–45分程度かかることがあります",
    "タイムアウトで失敗した場合は、別のツールで事前に圧縮してからお試しください",
    "処理中はブラウザタブを閉じないでください",
    "ネットワークが安定した環境での利用を推奨します",
  ],
  implementationPrinciples: "実装の仕組み",
  videoEngine: "動画処理エンジン",
  videoEngineList: [
    "FFmpeg.wasm（WebAssembly版FFmpeg）でブラウザ内で動画を処理：",
    "FFmpeg.wasmはFFmpegのWebAssembly版で、エンコード・デコードを完全に実行可能",
    "処理はすべてブラウザメモリ内の仮想ファイルシステムで完了",
    "iframeによる隔離環境でモジュールの安定した読み込み・実行を確保",
    "マルチスレッド処理に対応（SharedArrayBufferが必要）",
  ],
  conversionProcess: "形式変換の流れ",
  conversionProcessList: [
    "動画をArrayBufferとして読み込み、FFmpeg仮想ファイルシステムに書き込み",
    "FFmpegコマンドでトランスコード：-c:v libx264（動画）、-c:a aac（音声）",
    "presetでエンコード速度、CRFで画質（18–28）を設定",
    "仮想ファイルシステムから処理済みデータを読み込みBlobに変換",
    "一時ファイルを削除しメモリを解放",
  ],
  compressionPrinciple: "圧縮の仕組み",
  compressionPrincipleList: [
    "可逆圧縮：CRF 18の高画質とfast presetで画質を維持しつつ効率化",
    "非可逆圧縮：CRF 28とmedium preset、動画1Mbps・音声128kbps制限でファイルサイズを大幅削減",
    "すべての処理はサーバーに依存せずブラウザ内でローカルに完了",
  ],
  privacySecurity: "プライバシーとセキュリティ",
  privacyText:
    "すべての処理はブラウザ内でローカルに実行されます。MediaCCはファイルをアップロード・保存・解析しません。動画は最初から最後まで端末内のみで処理され、サーバー・クラウド・第三者への送信は一切ありません。",
  processingFailed: "処理に失敗しました",
};

function buildImageLayoutMeta(): ImageLayoutMetaT {
  const url = `${baseUrl}/ja/image`;
  return {
    title: "無料オンライン画像変換・圧縮 – 100%ローカル処理 | MediaCC",
    description:
      "無料のオンライン画像変換・圧縮ツール。JPG、PNG、WebP、AVIFをブラウザ内で変換・圧縮。アップロード不要、サーバー不要、100%ローカル処理。",
    keywords: [
      "無料 画像変換",
      "オンライン 画像圧縮",
      "jpg png 変換",
      "png webp 変換",
      "画像 圧縮 オンライン",
      "ローカル処理",
      "プライバシー",
    ],
    openGraphTitle: "無料オンライン画像変換・圧縮 – MediaCC",
    openGraphDescription: "ブラウザ内で画像を変換・圧縮。ファイルは端末から送信されません。JPG、PNG、WebP、AVIF対応。",
    twitterTitle: "無料オンライン画像変換・圧縮",
    twitterDescription: "100%ローカル処理のプライバシー重視画像ツール。アップロードなしでJPG、PNG、WebP、AVIFを変換。",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC 画像変換",
      alternateName: "オンライン画像変換・圧縮ツール",
      description: "ブラウザ内で画像を変換・圧縮。",
      softwareVersion: "1.0",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Image Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "ja",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "画像はサーバーにアップロードされますか？",
        text: "いいえ。すべての変換・圧縮はブラウザ内でローカルに実行されます。ファイルは端末から送信されず、100%プライバシーが守られます。",
      },
      {
        name: "MediaCC画像変換は無料で使えますか？",
        text: "はい。完全無料で、登録やアカウントは不要です。隠れた料金、ウォーターマーク、利用制限はありません。",
      },
      {
        name: "対応している画像形式は？",
        text: "JPG/JPEG、PNG、WebP、AVIFに対応しています。これらの形式間で変換し、圧縮してファイルサイズを削減できます。",
      },
      {
        name: "画像変換の最大ファイルサイズは？",
        text: "1ファイル最大150MBまで処理できます。快適に利用するには50MB以下を推奨します。最大5ファイル、合計500MBまで同時に処理可能です。",
      },
      {
        name: "ブラウザ内での画像処理の仕組みは？",
        text: "MediaCCはブラウザのCanvas APIとbrowser-image-compressionライブラリを使用します。すべてJavaScriptでブラウザ内で実行され、サーバー通信は不要です。",
      },
      {
        name: "複数画像を一括変換できますか？",
        text: "はい。最大5枚まで選択して一括で変換・圧縮できます。各ファイルは順番に処理され、ブラウザの安定性を保ちます。",
      },
      {
        name: "変換で画質は落ちますか？",
        text: "出力画質はスライダーで調整できます。PNGなどの可逆変換では画質劣化はありません。",
      },
    ],
    howTo: {
      name: "オンラインで画像を変換・圧縮する方法",
      description: "MediaCCのブラウザ内ツールで画像形式を変換し、ファイルサイズを削減する手順。",
      step: [
        { name: "画像をアップロード", text: "画像をドラッグ＆ドロップするか、クリックして選択。JPG、PNG、WebP、AVIF、1ファイル150MBまで対応。" },
        { name: "出力形式を選択", text: "ドロップダウンから形式を選択：JPG、PNG、WebP、AVIF。" },
        { name: "画質を調整", text: "スライダーでファイルサイズと画質のバランスを調整。値を下げるとファイルが小さくなります。" },
        { name: "処理してダウンロード", text: "変換/圧縮をクリックしてローカルで処理。完了したら結果をダウンロード。" },
      ],
    },
  };
}

function buildVideoLayoutMeta(): VideoLayoutMetaT {
  const url = `${baseUrl}/ja/video`;
  return {
    title: "無料オンライン動画変換・圧縮 – 100%ローカル処理 | MediaCC",
    description:
      "無料のオンライン動画変換・圧縮ツール。MP4、WebM、MOV、MKV、AVIをブラウザ内で変換・圧縮。アップロード不要、サーバー不要、100%ローカル処理。",
    keywords: [
      "無料 動画変換",
      "オンライン 動画圧縮",
      "mp4 変換",
      "webm mp4 変換",
      "動画 圧縮 オンライン",
      "ローカル処理",
      "FFmpeg オンライン",
    ],
    openGraphTitle: "無料オンライン動画変換・圧縮 – MediaCC",
    openGraphDescription: "ブラウザ内で動画を変換・圧縮。ファイルは端末から送信されません。MP4、WebM、MOV、MKV、AVI対応。",
    twitterTitle: "無料オンライン動画変換・圧縮",
    twitterDescription: "100%ローカル処理のプライバシー重視動画ツール。アップロードなしでMP4、WebM、MOV、MKV、AVIを変換。",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC 動画変換",
      alternateName: "オンライン動画変換・圧縮ツール",
      description: "ブラウザ内で動画を変換・圧縮。",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Video Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "ja",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "動画はサーバーにアップロードされますか？",
        text: "いいえ。すべての変換・圧縮はブラウザ内でFFmpeg.wasm（WebAssembly）によりローカルに実行されます。ファイルは端末から送信されません。",
      },
      {
        name: "MediaCC動画変換は無料で使えますか？",
        text: "はい。完全無料で登録不要です。隠れた料金、ウォーターマーク、利用制限はありません。",
      },
      {
        name: "対応している動画形式は？",
        text: "MP4、WebM、MOV、MKV、AVIに対応しています。これらの形式間で変換し、圧縮してファイルサイズを削減できます。",
      },
      {
        name: "動画変換の最大ファイルサイズは？",
        text: "1ファイル最大150MBまで処理できます。快適に利用するには100MB以下を推奨します。大容量動画は数分かかることがあります。",
      },
      {
        name: "ブラウザ内での動画処理の仕組みは？",
        text: "MediaCCはFFmpeg.wasm（FFmpegのWebAssembly版）を使用します。エンコード・デコードがすべてブラウザ内で実行され、サーバー通信は不要です。",
      },
      {
        name: "動画から音声を抽出できますか？",
        text: "はい。動画から音声トラックを抽出し、MP3として保存できます。",
      },
      {
        name: "動画処理が画像より遅い理由は？",
        text: "動画はフレーム数が多くエンコード/デコードが重いため、ブラウザ内のWebAssembly処理ではサーバー型ツールより時間がかかることがあります。",
      },
      {
        name: "複数動画を一括変換できますか？",
        text: "はい。最大5本まで選択できます。メモリ負荷を避けるため、動画は1本ずつ順番に処理されます。",
      },
    ],
    howTo: {
      name: "オンラインで動画を変換・圧縮する方法",
      description: "MediaCCのFFmpeg.wasmで動画形式を変換し、ファイルサイズを削減する手順。",
      step: [
        { name: "動画をアップロード", text: "動画をドラッグ＆ドロップするか、クリックして選択。MP4、WebM、MOV、MKV、AVI、1ファイル150MBまで対応。" },
        { name: "出力形式を選択", text: "ドロップダウンから形式を選択：MP4、WebM、MOV、MKV、AVI。" },
        { name: "圧縮設定を調整", text: "ビットレート、解像度、画質を設定してファイルサイズと画質のバランスを調整。" },
        { name: "処理してダウンロード", text: "変換/圧縮をクリックしてFFmpeg.wasmでローカル処理。完了したら結果をダウンロード。" },
      ],
    },
  };
}

export const imageLayoutMeta = buildImageLayoutMeta();
export const videoLayoutMeta = buildVideoLayoutMeta();
