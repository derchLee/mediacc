/** Task-specific English copy; keep localized pages in their own language. */
export const conversionGuides: Record<string, {
  title: string;
  description: string;
  heading: string;
  paragraphs: string[];
  faq: { name: string; text: string }[];
}> = {
  "heic-to-jpg": {
    title: "HEIC to JPG Converter — Free, No Upload",
    description: "Convert iPhone HEIC photos to JPG in your browser without uploading them. Batch-convert up to 15 photos, with practical steps for Windows and Mac.",
    heading: "Convert iPhone HEIC photos to JPG on Windows or Mac",
    paragraphs: [
      "If a website or app rejects your iPhone photo, converting HEIC to JPG can make it easier to share. Copy the original photo to your computer, open the image converter, and select the HEIC file. Choose format conversion, select JPG/JPEG, then start conversion and download the result.",
      "For a batch, select up to 15 photos together. The picker accepts up to 150MB per file and 1000MB in total; these are input limits, not a guarantee that every batch will fit in browser memory. Try one photo first, then use smaller batches if your browser struggles.",
      "Keep your HEIC originals. JPG uses lossy compression, and conversion can change metadata and appearance. Open the downloaded image and check orientation, color, and detail before using it for printing or deleting any source files.",
      "If you only need to convert a photo on a Mac, Apple also documents exporting from Photos or Preview to JPEG. For future photos on supported iPhones, Camera > Formats > Most Compatible saves new photos as JPEG; it does not convert existing HEIC files.",
    ],
    faq: [
      { name: "Can I convert HEIC to JPG on Windows without installing a converter?", text: "MediaCC decodes supported HEIC files in the browser. Open the image converter, select your photo, choose format conversion and JPG/JPEG, then download the result. If a particular file fails, try a smaller batch or export it from the original photo app." },
      { name: "Does renaming .heic to .jpg convert the photo?", text: "No. Renaming changes the filename, not the encoded image. Use a converter or an export command to create a real JPG file." },
      { name: "Why is my JPG larger than the HEIC original?", text: "Different formats use different compression methods. A converted JPG can be larger than the source HEIC; format conversion does not guarantee a smaller file. If size is the priority, check the image compression tool and compare the result visually." },
    ],
  },
  "mov-to-mp4": {
    title: "MOV to MP4 Converter — Free, No Upload",
    description: "Convert MOV to MP4 locally in your browser. Follow practical steps for iPhone videos, understand codec compatibility, and troubleshoot slow conversions.",
    heading: "Convert an iPhone MOV video to MP4 for sharing",
    paragraphs: [
      "Open the video converter and select a MOV file saved on your device. Choose format conversion, select MP4, and start. Keep the page open while processing, then download the MP4 and play it in the app where you plan to use it. Check both the picture and the audio.",
      "MOV and MP4 are containers: playback also depends on the video and audio codecs inside. Changing the extension from .mov to .mp4 does not change those codecs. Conversion may re-encode the video, so it can take time and change quality or file size.",
      "Start with one short clip. The single-file input limit is 150MB, with up to 15 files and 1000MB total. A file under those limits can still exceed available browser memory, particularly on a phone. For long or high-resolution recordings, a desktop video application may be more suitable.",
      "If processing appears stuck, allow time for the video engine to load and try one smaller clip with other busy tabs closed. If the output has missing audio or fails to play, keep the original and try an export from the source app. Apple documents a Greater Compatibility (H.264) export option for HEVC video in QuickTime Player on Mac.",
    ],
    faq: [
      { name: "Will converting MOV to MP4 always reduce file size?", text: "No. File size depends on duration, codecs, bitrate, and encoding settings. MP4 describes a container, not a fixed compression level. Use video compression when reducing size is the main goal, and compare the output quality." },
      { name: "Why does a small MOV file take a long time to convert?", text: "Compressed file size does not measure all the work needed to decode and encode video. Duration, resolution, codecs, and your device resources affect processing time. Try a short clip first and keep the browser page open." },
      { name: "Will every iPhone MOV video work?", text: "No universal compatibility is guaranteed. MOV files can contain different codecs and recording features, and browser resources vary. Test a short sample, check playback and audio, and retain your original recording." },
    ],
  },
};
