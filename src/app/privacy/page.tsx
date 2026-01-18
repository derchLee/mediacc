import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for MediaCC - Learn how we protect your data and privacy",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MediaCC (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our web application.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Important:</strong> MediaCC processes all files locally in your browser. We do not upload, store, or transmit any of your files to our servers or any third-party servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.1 Local Processing</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All file processing happens entirely in your browser using WebAssembly and client-side technologies. Your files never leave your device.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.2 Cookies and Analytics</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">We may use cookies and similar technologies for:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Remembering your preferences (e.g., language settings)</li>
              <li>Website analytics (e.g., Google Analytics) to understand how users interact with our service</li>
              <li>Improving user experience</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You can manage cookie preferences through your browser settings or our cookie consent banner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. How We Use Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">We use collected information to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Provide and improve our services</li>
              <li>Analyze usage patterns and website performance</li>
              <li>Ensure website security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may use third-party services for analytics and advertising:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Google Analytics:</strong> To understand website usage and performance</li>
              <li><strong>Google Ads:</strong> For advertising purposes (if applicable)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              These services may collect information according to their own privacy policies. We do not control how third parties use this information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Your Rights (GDPR/CCPA)</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">If you are located in the EU or California, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Access your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of data collection for analytics or advertising</li>
              <li>Withdraw consent for cookie usage</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us using the information provided in the Contact section.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Since all file processing happens locally in your browser, your files are never transmitted over the internet to our servers. This ensures maximum privacy and security.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We implement industry-standard security measures to protect any metadata or analytics data we collect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Children&apos;s Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">9. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              If you have any questions about this Privacy Policy, please contact us:
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
