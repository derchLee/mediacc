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
      { name: "Can I convert HEIC to JPG on Windows without installing a converter?", text: "MediaKit decodes supported HEIC files in the browser. Open the image converter, select your photo, choose format conversion and JPG/JPEG, then download the result. If a particular file fails, try a smaller batch or export it from the original photo app." },
      { name: "Does renaming .heic to .jpg convert the photo?", text: "No. Renaming changes the filename, not the encoded image. Use a converter or an export command to create a real JPG file." },
      { name: "Why is my JPG larger than the HEIC original?", text: "Different formats use different compression methods. A converted JPG can be larger than the source HEIC; format conversion does not guarantee a smaller file. If size is the priority, check the image compression tool and compare the result visually." },
    ],
  },
  "webp-to-jpg": {
    title: "WebP to JPG Converter — Free, No Upload",
    description: "Convert WebP to JPG free in your browser without uploading files. Make downloaded images easier to use in photo apps, documents and email with MediaKit.",
    heading: "Convert WebP images to JPG for documents and sharing",
    paragraphs: [
      "If a downloaded WebP image is not accepted by your photo app or document editor, select it in MediaKit, choose format conversion and JPG/JPEG, then download the converted image. Your selected files are processed locally without uploading them.",
      "JPG is useful for photographs and broad compatibility, but it uses lossy compression and does not support transparency. If your source has transparent areas or crisp text, consider WebP to PNG instead. Keep the original and inspect the downloaded result.",
      "You can select up to 15 files, with a 150MB per-file limit and 1000MB total. Start with a smaller batch on devices with limited memory. Converting to JPG does not guarantee a smaller file; use image compression when reducing file size is the goal.",
    ],
    faq: [
      { name: "Can I convert WebP to JPG without uploading?", text: "Yes. MediaKit converts supported WebP images locally in your browser. Select your files, choose JPG/JPEG as the output format, and download the results without sending the images to a conversion server." },
      { name: "Does WebP to JPG preserve transparency?", text: "No. JPG cannot store transparency. Choose PNG output if you need to keep transparent areas, and check the downloaded image before using it." },
    ],
  },
  "webp-to-png": {
    title: "WebP to PNG Converter — Free, No Upload",
    description: "Convert WebP to PNG free in your browser with no file uploads. Preserve transparency in supported images and batch-convert up to 15 files with MediaKit.",
    heading: "Convert WebP to PNG for transparent images and graphics",
    paragraphs: [
      "Choose WebP to PNG when you need an image for an editor that does not accept WebP, or when your graphic needs transparency. Open MediaKit, select the WebP image, choose format conversion and PNG, then process and download it locally.",
      "PNG supports transparency and lossless storage of the decoded image. Conversion cannot restore detail already lost in a compressed WebP source, and PNG output may be larger. Check the result in your target app before replacing the original.",
      "Batch conversion accepts up to 15 files, 150MB per file and 1000MB total. Available browser memory may impose lower practical limits. Animated images may not preserve animation in this browser-based image workflow.",
    ],
    faq: [
      { name: "Will WebP to PNG keep a transparent background?", text: "PNG supports transparency. MediaKit can preserve transparent areas when the browser decodes them correctly; inspect the downloaded PNG in your target editor." },
      { name: "Why is my PNG larger than the WebP file?", text: "WebP and PNG use different compression methods. PNG can need more space for the decoded image, so converting WebP to PNG does not guarantee a smaller file or improved visual detail." },
    ],
  },
  "png-to-jpg": {
    title: "PNG to JPG Converter — Free, No Upload",
    description: "Convert PNG to JPG free with MediaKit. Process images locally without uploading, improve compatibility and compare file sizes before sharing.",
    heading: "Convert PNG to JPG for photos, email and everyday sharing",
    paragraphs: [
      "Select your PNG image in MediaKit, choose format conversion, set JPG/JPEG as the output, then process and download the result. The conversion runs in your browser without uploading your selected images.",
      "JPG can be useful for photographs and everyday sharing, but file size depends on the source and encoding settings. Text and sharp graphics may show compression artifacts. Compare the downloaded file with your original before choosing which to use.",
      "JPG does not support transparency. Keep PNG for transparent logos and graphics, or check how transparent areas appear in the JPG output. For smaller files, use the image compression option and inspect the resulting quality.",
    ],
    faq: [
      { name: "Does PNG to JPG remove transparency?", text: "Yes. JPG cannot store transparent pixels. Keep a PNG copy if transparency is required, and inspect the background of the downloaded JPG." },
      { name: "Will converting PNG to JPG always make it smaller?", text: "No. JPG may reduce the size of photographic images, but results depend on the source and encoding settings. Compare file sizes and visual quality after conversion." },
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
