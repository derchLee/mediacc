/**
 * Español (ES) – URLs: /es/image, /es/video
 */

import type { CommonT, ImagePageT, VideoPageT, ImageLayoutMetaT, VideoLayoutMetaT, UiT } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mediacc.it.com";

export const common: CommonT = {
  tabImage: "Imagen",
  tabVideo: "Vídeo",
  followUs: "Síguenos:",
  privacyPolicy: "Política de privacidad",
  termsOfService: "Términos de uso",
  cookiePolicy: "Política de cookies",
  disclaimer: "Aviso legal",
  allRightsReserved: "Todos los derechos reservados.",
};

export const ui: UiT = {
  dragDropImages: "Arrastra y suelta imágenes aquí",
  dragDropVideos: "Arrastra y suelta vídeos aquí",
  releaseToUpload: "Suelta aquí para subir",
  orClickToSelect: "O haz clic en el botón para seleccionar archivos",
  selectFiles: "Seleccionar archivos",
  localProcessingNotice: "100% procesamiento local, los archivos no se suben al servidor",
  fileValidationFailed: "Error de validación de archivos",
  selectOperation: "Seleccionar operación",
  formatConversion: "Conversión de formato",
  convertToOtherFormats: "Convertir a otros formatos",
  compression: "Compresión",
  reduceFileSize: "Reducir tamaño de archivo",
  selectTargetFormat: "Seleccionar formato de salida",
  converting: "Convirtiendo...",
  startConversion: "Iniciar conversión",
  selectCompressionMode: "Seleccionar modo de compresión",
  losslessCompression: "Compresión sin pérdida",
  losslessDesc: "Mantiene la calidad, reducción de tamaño limitada",
  lossyCompression: "Compresión con pérdida",
  lossyDesc: "Reduce el tamaño con cierta pérdida de calidad",
  compressing: "Comprimiendo...",
  startCompression: "Iniciar compresión",
  processingComplete: "Procesamiento completado",
  download: "Descargar",
  remove: "Eliminar",
  removeFile: "Eliminar archivo",
  uploadedFiles: "Archivos subidos",
  supportedImageFormats: "Formatos de imagen soportados",
  supportedVideoFormats: "Formatos de vídeo soportados",
  size: "Tamaño",
  type: "Tipo",
  mode: "Modo",
  lossless: "Sin pérdida",
  lossy: "Con pérdida",
  targetFormat: "Formato destino",
};

export const imagePage: ImagePageT = {
  h1: "Convertidor y compresor de imágenes gratis online",
  intro:
    "MediaCC es una herramienta que te permite convertir y comprimir imágenes directamente en tu navegador. Sin subida de archivos, sin servidor y sin riesgo para tu privacidad. Tus archivos no salen de tu dispositivo.",
  whyChoose: "¿Por qué MediaCC?",
  whyList: [
    "100% procesamiento local – los archivos no salen de tu dispositivo",
    "Gratis, sin registro",
    "Conversión y compresión de imágenes rápida",
    "Soporta JPG, PNG, WebP, AVIF y más",
  ],
  howItWorks: "Cómo funciona",
  howSteps: [
    "Selecciona una imagen de tu dispositivo (arrastra y suelta o haz clic para subir)",
    "Elige el formato de salida o el nivel de compresión",
    "Descarga la imagen procesada al instante – todo se procesa localmente en tu navegador",
  ],
  detailedGuide: "Guía de uso detallada",
  howToUse: "Cómo usar",
  formatConversion: "1. Conversión de formato",
  formatConversionList: [
    "Formatos soportados: JPG/JPEG, PNG, GIF, WebP, AVIF, HEIC, BMP, TIFF",
    'Selecciona la operación "Convertir" y el formato destino (ej.: JPG a PNG)',
    'Haz clic en "Iniciar procesamiento"; la conversión se realiza localmente en tu navegador',
    "Tras la conversión puedes descargar la imagen en el nuevo formato",
  ],
  imageCompression: "2. Compresión de imágenes",
  imageCompressionList: [
    'Selecciona la operación "Comprimir" y el modo de compresión',
    "Compresión sin pérdida: mantiene la calidad y optimiza el tamaño (aprox. 10% de reducción)",
    "Compresión con pérdida: equilibra calidad y tamaño (aprox. 50% de reducción)",
    "Soporta procesamiento por lotes de varias imágenes",
  ],
  batchProcessing: "3. Procesamiento por lotes",
  batchList: [
    "Puedes subir varias imágenes a la vez",
    "Los archivos se procesan en cola",
    "Cada archivo se puede descargar por separado al terminar",
  ],
  fileLimits: "4. Límites y notas de tamaño",
  fileLimitsList: [
    "Límite por archivo: máximo 150 MB por imagen",
    "Límite total: máximo 1000 MB por sesión",
    "Máximo 15 archivos a la vez",
    "Avisos para archivos grandes:",
  ],
  largeFileWarnings: [
    "Archivos más grandes tardan más; recomendamos menos de 50 MB por archivo",
    "Archivos de más de 100 MB pueden provocar tiempo de espera o problemas de memoria",
    "Si falla por tamaño, comprime antes con otra herramienta",
    "Mantén la pestaña abierta al procesar archivos grandes",
  ],
  implementationPrinciples: "Principios de implementación",
  formatConversionPrinciple: "Conversión de formato",
  formatConversionPrincipleList: [
    "HEIC/HEIF: decodificado en cliente con heic2any (WebAssembly), salida JPG/PNG/WebP",
    "Otros: Canvas API carga, dibuja y exporta con toBlob()",
    "JPEG y WebP: calidad ajustable (por defecto 92%)",
    "AVIF y otros no soportados: conversión a PNG o aviso al usuario",
  ],
  compressionPrinciple: "Compresión",
  compressionPrincipleList: [
    "Origen HEIC: primero se convierte a JPG/PNG con heic2any, luego se comprime",
    "Usa la librería browser-image-compression:",
    "Sin pérdida: mantiene formato y calidad y reduce tamaño con parámetros optimizados",
    "Con pérdida: calidad 75 % y algoritmos para maximizar compresión",
    "Usa Web Worker para no bloquear la interfaz",
    "Mantiene la resolución original",
  ],
  privacySecurity: "Privacidad y seguridad",
  privacyText:
    "Todo el procesamiento se hace localmente en tu navegador. MediaCC no sube, guarda ni analiza tus archivos. Tus imágenes permanecen en tu dispositivo de principio a fin: sin servidor, sin nube, sin acceso de terceros.",
  processingFailed: "Error de procesamiento",
};

export const videoPage: VideoPageT = {
  h1: "Convertidor y compresor de vídeo gratis online",
  intro:
    "MediaCC es una herramienta que te permite convertir y comprimir vídeos directamente en tu navegador. Sin subida de archivos, sin servidor y sin riesgo para tu privacidad. Tus archivos no salen de tu dispositivo.",
  whyChoose: "¿Por qué MediaCC?",
  whyList: [
    "100% procesamiento local – los archivos no salen de tu dispositivo",
    "Gratis, sin registro",
    "Conversión y compresión de vídeo con FFmpeg.wasm",
    "Soporta MP4, WebM, MOV, MKV, AVI y más",
  ],
  howItWorks: "Cómo funciona",
  howSteps: [
    "Selecciona un vídeo de tu dispositivo (arrastra y suelta o haz clic para subir)",
    "Elige el formato de salida o el nivel de compresión",
    "Descarga el vídeo procesado – todo se procesa localmente en tu navegador",
  ],
  detailedGuide: "Guía de uso detallada",
  howToUse: "Cómo usar",
  formatConversion: "1. Conversión de formato",
  formatConversionList: [
    "Formatos soportados: MP4, WebM, MOV, AVI, MKV, WMV, FLV",
    'Selecciona "Convertir" y el formato destino (ej.: MOV a MP4)',
    'Haz clic en "Iniciar procesamiento"; la conversión se realiza localmente',
    "Se muestra el progreso; al terminar puedes descargar el vídeo en el nuevo formato",
  ],
  videoCompression: "2. Compresión de vídeo",
  videoCompressionList: [
    'Selecciona "Comprimir" y el modo de compresión',
    "Sin pérdida: CRF 18 y preset rápido para optimizar tamaño",
    "Con pérdida: CRF 28, preset medio, límites de bitrate (vídeo 1 Mbps, audio 128 kbps)",
    "La compresión puede tardar varios minutos",
  ],
  batchProcessing: "3. Procesamiento por lotes",
  batchList: [
    "Puedes subir varios vídeos a la vez",
    "Se procesan en cola para evitar sobrecarga del navegador",
    "Cada archivo se puede descargar por separado al terminar",
  ],
  fileLimits: "4. Límites y notas de tamaño",
  fileLimitsList: [
    "Límite por archivo: máximo 150 MB por vídeo",
    "Límite total: máximo 1000 MB por sesión",
    "Máximo 15 archivos a la vez",
    "Avisos para archivos grandes:",
  ],
  largeFileWarnings: [
    "El vídeo tarda más que la imagen; recomendamos menos de 50 MB por archivo",
    "Vídeos de más de 100 MB pueden provocar tiempo de espera (hasta 45 min) o problemas de memoria",
    "20–50 MB pueden tardar 20–30 min; 50–100 MB, 30–45 min",
    "Si falla por tiempo, comprime antes con otra herramienta",
    "Mantén la pestaña abierta al procesar archivos grandes",
    "Recomendamos una conexión estable",
  ],
  implementationPrinciples: "Principios de implementación",
  videoEngine: "Motor de vídeo",
  videoEngineList: [
    "Usa FFmpeg.wasm (WebAssembly) para procesar vídeos en el navegador:",
    "FFmpeg.wasm es el port de FFmpeg a WebAssembly con codificación y decodificación completa",
    "Todo el procesamiento se hace en un sistema de archivos virtual en memoria",
    "Entorno aislado con iframe para carga y ejecución estable",
    "Soporta multihilo (requiere SharedArrayBuffer)",
  ],
  conversionProcess: "Proceso de conversión",
  conversionProcessList: [
    "Lee el vídeo como ArrayBuffer y lo escribe en el sistema de archivos virtual de FFmpeg",
    "Usa comandos FFmpeg: -c:v libx264 (vídeo), -c:a aac (audio)",
    "Preset controla velocidad; CRF (18–28) controla calidad",
    "Lee el vídeo procesado del sistema virtual y lo convierte a Blob",
    "Limpia archivos temporales y libera memoria",
  ],
  compressionPrinciple: "Compresión",
  compressionPrincipleList: [
    "Sin pérdida: CRF 18 y preset rápido para mantener calidad",
    "Con pérdida: CRF 28, preset medio, bitrate vídeo 1 Mbps y audio 128 kbps",
    "Todo el procesamiento es local en el navegador",
  ],
  privacySecurity: "Privacidad y seguridad",
  privacyText:
    "Todo el procesamiento se hace localmente en tu navegador. MediaCC no sube, guarda ni analiza tus archivos. Tus vídeos permanecen en tu dispositivo de principio a fin: sin servidor, sin nube, sin acceso de terceros.",
  processingFailed: "Error de procesamiento",
};

function buildImageLayoutMeta(): ImageLayoutMetaT {
  const url = `${baseUrl}/es/image`;
  return {
    title: "Convertidor y compresor de imágenes gratis – 100% local | MediaCC",
    description:
      "Convertidor y compresor de imágenes gratis online. Convierte JPG, PNG, WebP, AVIF y reduce el tamaño en tu navegador. Sin subida, sin servidor, 100% local.",
    keywords: [
      "convertidor de imágenes gratis",
      "comprimir imágenes online",
      "jpg a png",
      "png a webp",
      "comprimir imagen online",
      "procesamiento local",
      "privacidad",
    ],
    openGraphTitle: "Convertidor y compresor de imágenes gratis – MediaCC",
    openGraphDescription: "Convierte y comprime imágenes en tu navegador. Tus archivos no salen de tu dispositivo. JPG, PNG, WebP, AVIF.",
    twitterTitle: "Convertidor y compresor de imágenes gratis",
    twitterDescription: "Herramienta de imágenes con 100% procesamiento local. Convierte JPG, PNG, WebP, AVIF sin subir archivos.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Convertidor de imágenes",
      alternateName: "Convertidor y compresor de imágenes online",
      description: "Convierte y comprime imágenes localmente en tu navegador.",
      softwareVersion: "1.0",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Image Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "es",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "¿Se suben mis imágenes a un servidor?",
        text: "No. Toda la conversión y compresión se hace localmente en tu navegador. Tus archivos no salen de tu dispositivo.",
      },
      {
        name: "¿MediaCC es gratis?",
        text: "Sí. Es completamente gratis y no requiere registro. Sin costes ocultos ni marcas de agua.",
      },
      {
        name: "¿Qué formatos de imagen soporta?",
        text: "JPG/JPEG, PNG, WebP y AVIF. Puedes convertir entre ellos y comprimir para reducir el tamaño.",
      },
      {
        name: "¿Tamaño máximo de archivo?",
        text: "Hasta 150 MB por archivo. Recomendamos menos de 50 MB. Máximo 15 archivos y 1000 MB en total por sesión.",
      },
      {
        name: "¿Cómo funciona el procesamiento en el navegador?",
        text: "MediaCC usa la API Canvas y la librería browser-image-compression. Todo se ejecuta en JavaScript en tu navegador, sin comunicación con servidores.",
      },
      {
        name: "¿Puedo convertir varias imágenes a la vez?",
        text: "Sí. Puedes seleccionar hasta 5 imágenes y procesarlas en un solo lote. Se procesan de forma secuencial.",
      },
      {
        name: "¿Se pierde calidad al convertir?",
        text: "Tienes control sobre la calidad con el deslizador. En conversiones sin pérdida (p. ej. PNG) no hay pérdida de calidad.",
      },
    ],
    howTo: {
      name: "Cómo convertir y comprimir imágenes online",
      description: "Guía paso a paso para convertir formatos y reducir tamaño con MediaCC en el navegador.",
      step: [
        { name: "Subir imágenes", text: "Arrastra y suelta o haz clic para seleccionar. JPG, PNG, WebP, AVIF hasta 150 MB por archivo." },
        { name: "Elegir formato de salida", text: "Selecciona en el menú: JPG, PNG, WebP o AVIF." },
        { name: "Ajustar calidad", text: "Usa el deslizador para equilibrar tamaño y calidad." },
        { name: "Procesar y descargar", text: "Haz clic en Convertir/Comprimir y descarga el resultado." },
      ],
    },
  };
}

function buildVideoLayoutMeta(): VideoLayoutMetaT {
  const url = `${baseUrl}/es/video`;
  return {
    title: "Convertidor y compresor de vídeo gratis – 100% local | MediaCC",
    description:
      "Convertidor y compresor de vídeo gratis online. Convierte MP4, WebM, MOV, MKV, AVI y reduce el tamaño en tu navegador. Sin subida, sin servidor, 100% local.",
    keywords: [
      "convertidor de vídeo gratis",
      "comprimir vídeo online",
      "mp4 converter",
      "webm a mp4",
      "comprimir vídeo online",
      "procesamiento local",
      "ffmpeg online",
    ],
    openGraphTitle: "Convertidor y compresor de vídeo gratis – MediaCC",
    openGraphDescription: "Convierte y comprime vídeos en tu navegador. Tus archivos no salen de tu dispositivo. MP4, WebM, MOV, MKV, AVI.",
    twitterTitle: "Convertidor y compresor de vídeo gratis",
    twitterDescription: "Herramienta de vídeo con 100% procesamiento local. Convierte MP4, WebM, MOV, MKV, AVI sin subir archivos.",
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MediaCC Convertidor de vídeo",
      alternateName: "Convertidor y compresor de vídeo online",
      description: "Convierte y comprime vídeos localmente en tu navegador.",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Video Converter",
      operatingSystem: "Web",
      url,
      downloadUrl: url,
      inLanguage: "es",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      author: { "@type": "Organization", name: "MediaCC", url: baseUrl },
      publisher: { "@type": "Organization", name: "MediaCC", url: baseUrl },
    },
    faq: [
      {
        name: "¿Se suben mis vídeos a un servidor?",
        text: "No. Toda la conversión y compresión se hace localmente con FFmpeg.wasm (WebAssembly). Tus archivos no salen de tu dispositivo.",
      },
      {
        name: "¿MediaCC vídeo es gratis?",
        text: "Sí. Completamente gratis y sin registro. Sin costes ocultos ni marcas de agua.",
      },
      {
        name: "¿Qué formatos de vídeo soporta?",
        text: "MP4, WebM, MOV, MKV y AVI. Puedes convertir entre ellos y comprimir para reducir el tamaño.",
      },
      {
        name: "¿Tamaño máximo de archivo?",
        text: "Hasta 150 MB por archivo. Recomendamos menos de 100 MB. Máximo 15 archivos y 1000 MB en total por sesión. Los vídeos grandes pueden tardar varios minutos.",
      },
      {
        name: "¿Cómo funciona el procesamiento en el navegador?",
        text: "MediaCC usa FFmpeg.wasm, el port de FFmpeg a WebAssembly. La codificación y decodificación se ejecutan por completo en tu navegador.",
      },
      {
        name: "¿Puedo extraer el audio de un vídeo?",
        text: "Sí. MediaCC puede extraer la pista de audio y guardarla como MP3.",
      },
      {
        name: "¿Por qué el vídeo tarda más que la imagen?",
        text: "El vídeo tiene muchos fotogramas y requiere codificación/decodificación compleja. Al procesarse en el navegador con WebAssembly, puede tardar más que herramientas en servidor.",
      },
      {
        name: "¿Puedo convertir varios vídeos a la vez?",
        text: "Sí. Puedes seleccionar hasta 5 vídeos. Se procesan uno tras otro para evitar problemas de memoria.",
      },
    ],
    howTo: {
      name: "Cómo convertir y comprimir vídeos online",
      description: "Guía paso a paso para convertir formatos y reducir tamaño con MediaCC y FFmpeg.wasm.",
      step: [
        { name: "Subir vídeos", text: "Arrastra y suelta o haz clic para seleccionar. MP4, WebM, MOV, MKV, AVI hasta 150 MB por archivo." },
        { name: "Elegir formato de salida", text: "Selecciona en el menú: MP4, WebM, MOV, MKV o AVI." },
        { name: "Ajustar compresión", text: "Configura bitrate, resolución y calidad." },
        { name: "Procesar y descargar", text: "Haz clic en Convertir/Comprimir y descarga el resultado." },
      ],
    },
  };
}

export const imageLayoutMeta = buildImageLayoutMeta();
export const videoLayoutMeta = buildVideoLayoutMeta();
