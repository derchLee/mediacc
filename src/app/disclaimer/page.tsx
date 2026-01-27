import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for MediaCC - Important legal information about our service",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Disclaimer</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 font-semibold">
              <strong>Important Notice:</strong> Please read the following disclaimer carefully before using this service. By using this service, you agree to and accept the following terms.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Nature of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MediaCC is a multimedia conversion and compression tool based on browser local processing technology. All processing is completed on your device using the following technologies:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Image Processing:</strong> Canvas API and browser-image-compression library</li>
              <li><strong>Video Processing:</strong> FFmpeg.wasm (WebAssembly version of FFmpeg)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This service is provided &quot;as is&quot; without any express or implied warranties. We do not guarantee that the service will meet all your needs or expectations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Processing Results</h2>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.1 Image Processing</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>We do not guarantee the quality, file size, or format compatibility of converted or compressed images</li>
              <li>Certain image formats (such as HEIC, AVIF, TIFF, BMP) may not be fully supported due to browser limitations and may attempt downgrade processing or display errors</li>
              <li>Processing results may vary depending on browser version, device performance, or file characteristics</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.2 Video Processing</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>We do not guarantee the quality, file size, bitrate, or format compatibility of converted or compressed videos</li>
              <li>Certain video formats may not be fully supported due to encoder limitations or browser compatibility issues</li>
              <li>Processing results may vary depending on browser version, device performance, or video encoding characteristics</li>
              <li>Video processing is a computationally intensive operation that may take considerable time; large files may require tens of minutes or even longer</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. Data Security & Backup</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Although all processing is completed locally, there is a risk of data loss, corruption, or processing failure during the process.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>We strongly recommend backing up your original files before processing</strong></li>
              <li>We are not responsible for any data loss, corruption, processing failure, or inability to recover resulting from the use of this service</li>
              <li>Video processing timeout (maximum 45 minutes) may cause processing failure; please ensure file sizes are within reasonable limits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Technical Limitations</h2>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4.1 File Size Limitations</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Maximum single file size: 150MB</li>
              <li>Total file size limit per session: 500MB</li>
              <li>Maximum number of files that can be processed simultaneously: 5 files</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4.2 Performance Limitations</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Large files (over 50MB) may cause processing timeout, browser memory issues, browser crashes, or processing failures</li>
              <li>Video processing requires significant memory and CPU resources, which may affect device performance and other application operations</li>
              <li>Processing performance is limited by your device performance, browser version, available memory, and CPU capabilities</li>
              <li>Some browsers may not fully support all features; we recommend using the latest version of modern browsers</li>
              <li>Closing browser tabs, switching tabs, device sleep, or network interruptions during processing may cause processing interruption and data loss</li>
              <li>Video processing requires SharedArrayBuffer support to enable multi-threaded processing; some browser configurations may not support this</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4.3 Processing Time</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Video processing time depends on file size, encoding complexity, device performance, and compression mode</li>
              <li>20-50MB videos may take 20-30 minutes, while 50-100MB videos may take 30-45 minutes</li>
              <li>Files over 100MB may cause processing timeout (maximum 45 minutes) or failure</li>
              <li>Please keep the browser tab open during processing to avoid switching tabs or closing the browser</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use this service, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Data loss, corruption, or inability to recover</li>
              <li>Business interruption, loss of profits, or damage to reputation</li>
              <li>Service interruption or processing failure</li>
              <li>Device performance degradation or device damage</li>
              <li>Processing timeout or processing results not meeting expectations</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We do not guarantee the continuity, timeliness, security, or accuracy of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You own all rights to the files you upload and their processing results. We do not store, copy, or distribute any of your file content.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Please ensure you have the right to process uploaded files; do not upload copyrighted or illegal content</li>
              <li>We are not responsible for any legal liability arising from your uploading of infringing content</li>
              <li>You are fully responsible for the content of uploaded files</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Service Modifications & Termination</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify, suspend, or terminate any service features at any time without prior notice. We are not responsible for any losses resulting from service modifications, suspension, or termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Applicable Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This disclaimer is governed by applicable law. If any provision of this disclaimer is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">9. Disclaimer Updates</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to update this disclaimer at any time. Updated disclaimers will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of this service indicates your acceptance of the updated disclaimer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">10. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              If you have any questions about this disclaimer, please contact us through the following:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:elber19960712@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">elber19960712@gmail.com</a>
            </p>
          </section>

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 font-semibold">
              By using this service, you acknowledge that you fully understand and agree to bear all risks that may arise from using this service. Video processing is a resource-intensive operation; please ensure your device has sufficient performance and memory. If you have any questions, please consult a professional before use or contact our support team.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link 
            href="/" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
