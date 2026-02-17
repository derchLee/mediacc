/**
 * Português (PT-BR) – URLs: /pt/image, /pt/video
 */

import type { CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT, UiT } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";

export const common: CommonT = {
  tabImage: "Imagem",
  tabVideo: "Vídeo",
  followUs: "Siga-nos:",
  privacyPolicy: "Política de privacidade",
  termsOfService: "Termos de uso",
  cookiePolicy: "Política de cookies",
  disclaimer: "Aviso legal",
  allRightsReserved: "Todos os direitos reservados.",
};

export const ui: UiT = {
  dragDropImages: "Arraste e solte imagens aqui",
  dragDropVideos: "Arraste e solte vídeos aqui",
  releaseToUpload: "Solte aqui para enviar",
  orClickToSelect: "Ou clique no botão para selecionar arquivos",
  selectFiles: "Selecionar arquivos",
  localProcessingNotice: "100% processamento local, os arquivos não são enviados ao servidor",
  fileValidationFailed: "Falha na validação do arquivo",
  selectOperation: "Selecionar operação",
  formatConversion: "Conversão de formato",
  convertToOtherFormats: "Converter para outros formatos",
  compression: "Compressão",
  reduceFileSize: "Reduzir tamanho do arquivo",
  selectTargetFormat: "Selecionar formato de saída",
  converting: "Convertendo...",
  startConversion: "Iniciar conversão",
  selectCompressionMode: "Selecionar modo de compressão",
  losslessCompression: "Compressão sem perda",
  losslessDesc: "Mantém a qualidade, redução de tamanho limitada",
  lossyCompression: "Compressão com perda",
  lossyDesc: "Reduz o tamanho com alguma perda de qualidade",
  compressing: "Comprimindo...",
  startCompression: "Iniciar compressão",
  processingComplete: "Processamento concluído",
  download: "Baixar",
  remove: "Remover",
  removeFile: "Remover arquivo",
  uploadedFiles: "Arquivos enviados",
  supportedImageFormats: "Formatos de imagem suportados",
  supportedVideoFormats: "Formatos de vídeo suportados",
  size: "Tamanho",
  type: "Tipo",
  mode: "Modo",
  lossless: "Sem perda",
  lossy: "Com perda",
  targetFormat: "Formato de destino",
};

export const imagePage: ImagePageT = {
  h1: "Conversor e compressor de imagens grátis online",
  intro:
    "O MediaCC é uma ferramenta que permite converter e comprimir imagens diretamente no seu navegador. Sem envio de arquivos, sem servidor e sem risco à sua privacidade. Seus arquivos não saem do seu dispositivo.",
  whyChoose: "Por que o MediaCC?",
  whyList: [
    "100% processamento local – os arquivos não saem do seu dispositivo",
    "Grátis, sem cadastro",
    "Conversão e compressão de imagens rápida",
    "Suporta JPG, PNG, WebP, AVIF e mais",
  ],
  howItWorks: "Como funciona",
  howSteps: [
    "Selecione uma imagem do seu dispositivo (arraste e solte ou clique para enviar)",
    "Escolha o formato de saída ou o nível de compressão",
    "Baixe a imagem processada na hora – tudo é processado localmente no seu navegador",
  ],
  detailedGuide: "Guia de uso detalhado",
  howToUse: "Como usar",
  formatConversion: "1. Conversão de formato",
  formatConversionList: [
    "Formatos suportados: JPG/JPEG, PNG, GIF, WebP, AVIF, HEIC, BMP, TIFF",
    'Selecione a operação "Converter" e o formato de destino (ex.: JPG para PNG)',
    'Clique em "Iniciar processamento"; a conversão é feita localmente no seu navegador',
    "Após a conversão você pode baixar a imagem no novo formato",
  ],
  imageCompression: "2. Compressão de imagens",
  imageCompressionList: [
    'Selecione a operação "Comprimir" e o modo de compressão',
    "Compressão sem perda: mantém a qualidade e otimiza o tamanho (cerca de 10% de redução)",
    "Compressão com perda: equilibra qualidade e tamanho (cerca de 50% de redução)",
    "Suporta processamento em lote de várias imagens",
  ],
  batchProcessing: "3. Processamento em lote",
  batchList: [
    "Você pode enviar várias imagens de uma vez",
    "Os arquivos são processados em fila",
    "Cada arquivo pode ser baixado separadamente ao terminar",
  ],
  fileLimits: "4. Limites e notas de tamanho",
  fileLimitsList: [
    "Limite por arquivo: máximo 150 MB por imagem",
    "Limite total: máximo 1000 MB por sessão",
    "Máximo 15 arquivos por vez",
    "Avisos para arquivos grandes:",
  ],
  largeFileWarnings: [
    "Arquivos maiores demoram mais; recomendamos menos de 50 MB por arquivo",
    "Arquivos com mais de 100 MB podem causar tempo limite ou problemas de memória",
    "Se falhar por tamanho, comprima antes com outra ferramenta",
    "Mantenha a aba aberta ao processar arquivos grandes",
  ],
  implementationPrinciples: "Princípios de implementação",
  formatConversionPrinciple: "Conversão de formato",
  formatConversionPrincipleList: [
    "HEIC/HEIF: decodificado no cliente via heic2any (WebAssembly), saída JPG/PNG/WebP",
    "Outros: Canvas API carrega, desenha e exporta com toBlob()",
    "JPEG e WebP: qualidade ajustável (padrão 92%)",
    "AVIF e outros não suportados: conversão para PNG ou aviso ao usuário",
  ],
  compressionPrinciple: "Compressão",
  compressionPrincipleList: [
    "Origem HEIC: primeiro convertido para JPG/PNG via heic2any, depois comprimido",
    "Usa a biblioteca browser-image-compression:",
    "Sem perda: mantém formato e qualidade e reduz tamanho com parâmetros otimizados",
    "Com perda: qualidade 75% e algoritmos para maximizar compressão",
    "Usa Web Worker para não bloquear a interface",
    "Mantém a resolução original",
  ],
  privacySecurity: "Privacidade e segurança",
  privacyText:
    "Todo o processamento é feito localmente no seu navegador. O MediaCC não envia, armazena nem analisa seus arquivos. Suas imagens ficam no seu dispositivo do início ao fim – sem servidor, sem nuvem, sem acesso de terceiros.",
  processingFailed: "Falha no processamento",
};

export const videoPage: VideoPageT = {
  h1: "Conversor e compressor de vídeo grátis online",
  intro:
    "O MediaCC é uma ferramenta que permite converter e comprimir vídeos diretamente no seu navegador. Sem envio de arquivos, sem servidor e sem risco à sua privacidade. Seus arquivos não saem do seu dispositivo.",
  whyChoose: "Por que o MediaCC?",
  whyList: [
    "100% processamento local – os arquivos não saem do seu dispositivo",
    "Grátis, sem cadastro",
    "Conversão e compressão de vídeo com FFmpeg.wasm",
    "Suporta MP4, WebM, MOV, MKV, AVI e mais",
  ],
  howItWorks: "Como funciona",
  howSteps: [
    "Selecione um vídeo do seu dispositivo (arraste e solte ou clique para enviar)",
    "Escolha o formato de saída ou o nível de compressão",
    "Baixe o vídeo processado – tudo é processado localmente no seu navegador",
  ],
  detailedGuide: "Guia de uso detalhado",
  howToUse: "Como usar",
  formatConversion: "1. Conversão de formato",
  formatConversionList: [
    "Formatos suportados: MP4, WebM, MOV, AVI, MKV, WMV, FLV",
    'Selecione "Converter" e o formato de destino (ex.: MOV para MP4)',
    'Clique em "Iniciar processamento"; a conversão é feita localmente',
    "O progresso é exibido; ao terminar você pode baixar o vídeo no novo formato",
  ],
  videoCompression: "2. Compressão de vídeo",
  videoCompressionList: [
    'Selecione "Comprimir" e o modo de compressão',
    "Sem perda: CRF 18 e preset rápido para otimizar tamanho",
    "Com perda: CRF 28, preset médio, limites de bitrate (vídeo 1 Mbps, áudio 128 kbps)",
    "A compressão pode levar vários minutos",
  ],
  batchProcessing: "3. Processamento em lote",
  batchList: [
    "Você pode enviar vários vídeos de uma vez",
    "São processados em fila para evitar sobrecarga do navegador",
    "Cada arquivo pode ser baixado separadamente ao terminar",
  ],
  fileLimits: "4. Limites e notas de tamanho",
  fileLimitsList: [
    "Limite por arquivo: máximo 150 MB por vídeo",
    "Limite total: máximo 1000 MB por sessão",
    "Máximo 15 arquivos por vez",
    "Avisos para arquivos grandes:",
  ],
  largeFileWarnings: [
    "Vídeo demora mais que imagem; recomendamos menos de 50 MB por arquivo",
    "Vídeos com mais de 100 MB podem causar tempo limite (até 45 min) ou problemas de memória",
    "20–50 MB podem levar 20–30 min; 50–100 MB, 30–45 min",
    "Se falhar por tempo, comprima antes com outra ferramenta",
    "Mantenha a aba aberta ao processar arquivos grandes",
    "Recomendamos conexão estável",
  ],
  implementationPrinciples: "Princípios de implementação",
  videoEngine: "Motor de vídeo",
  videoEngineList: [
    "Usa FFmpeg.wasm (WebAssembly) para processar vídeos no navegador:",
    "FFmpeg.wasm é a versão FFmpeg em WebAssembly com codificação e decodificação completas",
    "Todo o processamento ocorre em um sistema de arquivos virtual na memória",
    "Ambiente isolado com iframe para carregamento e execução estáveis",
    "Suporta multithread (requer SharedArrayBuffer)",
  ],
  conversionProcess: "Processo de conversão",
  conversionProcessList: [
    "Lê o vídeo como ArrayBuffer e grava no sistema de arquivos virtual do FFmpeg",
    "Usa comandos FFmpeg: -c:v libx264 (vídeo), -c:a aac (áudio)",
    "Preset controla velocidade; CRF (18–28) controla qualidade",
    "Lê o vídeo processado do sistema virtual e converte para Blob",
    "Remove arquivos temporários e libera memória",
  ],
  compressionPrinciple: "Compressão",
  compressionPrincipleList: [
    "Sem perda: CRF 18 e preset rápido para manter qualidade",
    "Com perda: CRF 28, preset médio, bitrate vídeo 1 Mbps e áudio 128 kbps",
    "Todo o processamento é local no navegador",
  ],
  privacySecurity: "Privacidade e segurança",
  privacyText:
    "Todo o processamento é feito localmente no seu navegador. O MediaCC não envia, armazena nem analisa seus arquivos. Seus vídeos ficam no seu dispositivo do início ao fim – sem servidor, sem nuvem, sem acesso de terceiros.",
  processingFailed: "Falha no processamento",
};

function buildImageLayoutMeta(): ImageLayoutMetaT {
  const url = `${baseUrl}/pt/image`;
  return {
    title: "Conversor e compressor de imagens grátis – 100% local | MediaCC",
    description:
      "Conversor e compressor de imagens grátis online. Converta JPG, PNG, WebP, AVIF e reduza o tamanho no seu navegador. Sem envio, sem servidor, 100% local.",
    keywords: [
      "conversor de imagens grátis",
      "comprimir imagens online",
      "jpg para png",
      "png para webp",
      "comprimir imagem online",
      "processamento local",
      "privacidade",
    ],
    openGraphTitle: "Conversor e compressor de imagens grátis – MediaCC",
    openGraphDescription: "Converta e comprima imagens no seu navegador. Seus arquivos não saem do seu dispositivo. JPG, PNG, WebP, AVIF.",
    twitterTitle: "Conversor e compressor de imagens grátis",
    twitterDescription: "Ferramenta de imagens com 100% processamento local. Converta JPG, PNG, WebP, AVIF sem enviar arquivos.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Conversor de imagens",
      alternateName: "Conversor e compressor de imagens online",
      description: "Converta e comprima imagens localmente no seu navegador.",
      softwareVersion: "1.0",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Image Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "pt",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "Minhas imagens são enviadas a um servidor?",
        text: "Não. Toda a conversão e compressão é feita localmente no seu navegador. Seus arquivos não saem do seu dispositivo.",
      },
      {
        name: "O MediaCC é grátis?",
        text: "Sim. É totalmente grátis e não requer cadastro. Sem custos ocultos nem marcas d'água.",
      },
      {
        name: "Quais formatos de imagem são suportados?",
        text: "JPG/JPEG, PNG, WebP e AVIF. Você pode converter entre eles e comprimir para reduzir o tamanho.",
      },
      {
        name: "Tamanho máximo de arquivo?",
        text: "Até 150 MB por arquivo. Recomendamos menos de 50 MB. Máximo 15 arquivos e 1000 MB no total por sessão.",
      },
      {
        name: "Como funciona o processamento no navegador?",
        text: "O MediaCC usa a API Canvas e a biblioteca browser-image-compression. Tudo roda em JavaScript no seu navegador, sem comunicação com servidores.",
      },
      {
        name: "Posso converter várias imagens de uma vez?",
        text: "Sim. Você pode selecionar até 5 imagens e processá-las em um único lote. São processadas em sequência.",
      },
      {
        name: "A qualidade é afetada na conversão?",
        text: "Você tem controle sobre a qualidade com o controle deslizante. Em conversões sem perda (ex.: PNG) não há perda de qualidade.",
      },
    ],
    howTo: {
      name: "Como converter e comprimir imagens online",
      description: "Guia passo a passo para converter formatos e reduzir tamanho com o MediaCC no navegador.",
      step: [
        { name: "Enviar imagens", text: "Arraste e solte ou clique para selecionar. JPG, PNG, WebP, AVIF até 150 MB por arquivo." },
        { name: "Escolher formato de saída", text: "Selecione no menu: JPG, PNG, WebP ou AVIF." },
        { name: "Ajustar qualidade", text: "Use o controle deslizante para equilibrar tamanho e qualidade." },
        { name: "Processar e baixar", text: "Clique em Converter/Comprimir e baixe o resultado." },
      ],
    },
  };
}

function buildVideoLayoutMeta(): VideoLayoutMetaT {
  const url = `${baseUrl}/pt/video`;
  return {
    title: "Conversor e compressor de vídeo grátis – 100% local | MediaCC",
    description:
      "Conversor e compressor de vídeo grátis online. Converta MP4, WebM, MOV, MKV, AVI e reduza o tamanho no seu navegador. Sem envio, sem servidor, 100% local.",
    keywords: [
      "conversor de vídeo grátis",
      "comprimir vídeo online",
      "mp4 converter",
      "webm para mp4",
      "comprimir vídeo online",
      "processamento local",
      "ffmpeg online",
    ],
    openGraphTitle: "Conversor e compressor de vídeo grátis – MediaCC",
    openGraphDescription: "Converta e comprima vídeos no seu navegador. Seus arquivos não saem do seu dispositivo. MP4, WebM, MOV, MKV, AVI.",
    twitterTitle: "Conversor e compressor de vídeo grátis",
    twitterDescription: "Ferramenta de vídeo com 100% processamento local. Converta MP4, WebM, MOV, MKV, AVI sem enviar arquivos.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Conversor de vídeo",
      alternateName: "Conversor e compressor de vídeo online",
      description: "Converta e comprima vídeos localmente no seu navegador.",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Video Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "pt",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "Meus vídeos são enviados a um servidor?",
        text: "Não. Toda a conversão e compressão é feita localmente com FFmpeg.wasm (WebAssembly). Seus arquivos não saem do seu dispositivo.",
      },
      {
        name: "O MediaCC vídeo é grátis?",
        text: "Sim. Totalmente grátis e sem cadastro. Sem custos ocultos nem marcas d'água.",
      },
      {
        name: "Quais formatos de vídeo são suportados?",
        text: "MP4, WebM, MOV, MKV e AVI. Você pode converter entre eles e comprimir para reduzir o tamanho.",
      },
      {
        name: "Tamanho máximo de arquivo?",
        text: "Até 150 MB por arquivo. Recomendamos menos de 100 MB. Máximo 15 arquivos e 1000 MB no total por sessão. Vídeos grandes podem levar vários minutos.",
      },
      {
        name: "Como funciona o processamento no navegador?",
        text: "O MediaCC usa FFmpeg.wasm, a versão FFmpeg em WebAssembly. A codificação e decodificação rodam inteiramente no seu navegador.",
      },
      {
        name: "Posso extrair o áudio de um vídeo?",
        text: "Sim. O MediaCC pode extrair a trilha de áudio e salvar como MP3.",
      },
      {
        name: "Por que o vídeo demora mais que a imagem?",
        text: "O vídeo tem muitos quadros e exige codificação/decodificação complexa. Como tudo é processado no navegador com WebAssembly, pode demorar mais que ferramentas em servidor.",
      },
      {
        name: "Posso converter vários vídeos de uma vez?",
        text: "Sim. Você pode selecionar até 5 vídeos. Eles são processados um após o outro para evitar problemas de memória.",
      },
    ],
    howTo: {
      name: "Como converter e comprimir vídeos online",
      description: "Guia passo a passo para converter formatos e reduzir tamanho com o MediaCC e FFmpeg.wasm.",
      step: [
        { name: "Enviar vídeos", text: "Arraste e solte ou clique para selecionar. MP4, WebM, MOV, MKV, AVI até 150 MB por arquivo." },
        { name: "Escolher formato de saída", text: "Selecione no menu: MP4, WebM, MOV, MKV ou AVI." },
        { name: "Ajustar compressão", text: "Configure bitrate, resolução e qualidade." },
        { name: "Processar e baixar", text: "Clique em Converter/Comprimir e baixe o resultado." },
      ],
    },
  };
}

export const imageLayoutMeta = buildImageLayoutMeta();
export const videoLayoutMeta = buildVideoLayoutMeta();
