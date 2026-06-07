/**
 * Curated list of popular online media tools by category.
 * Brand names kept as-is; category labels come from i18n.
 */

export interface CompetitorTool {
  name: string;
  url: string;
  note?: string;
}

export interface CompetitorCategory {
  id: "imageCompress" | "imageConvert" | "videoCompress" | "videoConvert";
  tools: CompetitorTool[];
}

/** Image compression tools */
export const imageCompressTools: CompetitorTool[] = [
  { name: "TinyPNG", url: "https://tinypng.com/" },
  { name: "Squoosh", url: "https://squoosh.app/" },
  { name: "Compressor.io", url: "https://compressor.io/" },
  { name: "iLoveIMG", url: "https://www.iloveimg.com/compress-image" },
  { name: "Kraken.io", url: "https://kraken.io/web-interface" },
  { name: "ShortPixel", url: "https://shortpixel.com/online-image-compression" },
];

/** Image format conversion tools */
export const imageConvertTools: CompetitorTool[] = [
  { name: "CloudConvert", url: "https://cloudconvert.com/image-converter" },
  { name: "Convertio", url: "https://convertio.co/image-converter/" },
  { name: "Zamzar", url: "https://www.zamzar.com/convert/images/" },
  { name: "FreeConvert", url: "https://www.freeconvert.com/image-converter" },
  { name: "Online-Convert", url: "https://image.online-convert.com/" },
  { name: "Aconvert", url: "https://www.aconvert.com/image/" },
];

/** Video compression tools */
export const videoCompressTools: CompetitorTool[] = [
  { name: "FreeConvert", url: "https://www.freeconvert.com/video-compressor" },
  { name: "Clideo", url: "https://clideo.com/compress-video" },
  { name: "VEED.io", url: "https://www.veed.io/tools/compress-video" },
  { name: "Kapwing", url: "https://www.kapwing.com/tools/compress" },
  { name: "Media.io", url: "https://www.media.io/video-compressor.html" },
  { name: "YouCompress", url: "https://www.youcompress.com/" },
];

/** Video format conversion tools */
export const videoConvertTools: CompetitorTool[] = [
  { name: "CloudConvert", url: "https://cloudconvert.com/video-converter" },
  { name: "Convertio", url: "https://convertio.co/video-converter/" },
  { name: "FreeConvert", url: "https://www.freeconvert.com/video-converter" },
  { name: "Zamzar", url: "https://www.zamzar.com/convert/video/" },
  { name: "Online-Convert", url: "https://video.online-convert.com/" },
  { name: "HandBrake (desktop)", url: "https://handbrake.fr/" },
];

export function getImagePageCategories(): CompetitorCategory[] {
  return [
    { id: "imageCompress", tools: imageCompressTools },
    { id: "imageConvert", tools: imageConvertTools },
  ];
}

export function getVideoPageCategories(): CompetitorCategory[] {
  return [
    { id: "videoCompress", tools: videoCompressTools },
    { id: "videoConvert", tools: videoConvertTools },
  ];
}
