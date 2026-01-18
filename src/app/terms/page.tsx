import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for MediaCC - Usage terms and conditions",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing and using MediaCC (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MediaCC is a web-based application that allows users to convert and compress images and videos. All processing is performed locally in your browser using WebAssembly technology.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>100% local file processing - no server uploads</li>
              <li>Image and video format conversion</li>
              <li>File compression capabilities</li>
              <li>Free to use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">You agree to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Use the Service only for lawful purposes</li>
              <li>Not upload files that contain malware, viruses, or harmful code</li>
              <li>Not use the Service to process copyrighted material without authorization</li>
              <li>Not attempt to reverse engineer or interfere with the Service</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. File Size and Format Limitations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service has the following limitations:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Maximum single file size: 150MB</li>
              <li>Maximum total file size per session: 500MB</li>
              <li>Maximum number of files per session: 5 files</li>
              <li>Supported formats are listed on the respective pages</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these limitations at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Disclaimer of Warranties</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or reliability of results</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We do not guarantee that the Service will be error-free, uninterrupted, or free of viruses or other harmful components.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Loss of data or files</li>
              <li>Loss of profits or business opportunities</li>
              <li>Service interruptions or failures</li>
              <li>Any damages arising from the use or inability to use the Service</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Since all processing is done locally in your browser, we are not responsible for any data loss or corruption that may occur during processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service and its original content, features, and functionality are owned by MediaCC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Your files remain your property. We do not claim ownership of any files you process through the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Service Modifications</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">9. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to terminate or suspend access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">10. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">11. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes are posted constitutes your acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">12. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: <a href="mailto:elber19960712@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">elber19960712@gmail.com</a>
            </p>
          </section>
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
