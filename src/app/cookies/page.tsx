import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for MediaCC - Learn about our use of cookies and similar technologies",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Cookie Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. What Are Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We use cookies and similar technologies to enhance your experience, analyze usage, and support our marketing efforts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.1 Strictly Necessary Cookies</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Examples:</strong> Session cookies, security cookies, cookie consent preferences
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.2 Analytics Cookies</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics to track website usage and performance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Examples:</strong> Google Analytics cookies (_ga, _gid, _gat)
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2.3 Advertising Cookies (Optional)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Examples:</strong> Google Ads cookies (if Google Ads is enabled)
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> Advertising cookies are only used if you consent to them. You can withdraw your consent at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. Third-Party Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Google Analytics:</strong> Used for website analytics and performance monitoring</li>
              <li><strong>Google Ads:</strong> Used for advertising purposes (if enabled and consented)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              These third parties may use cookies and similar technologies to collect information about your online activities across different websites and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Managing Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent banner or through your browser settings.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4.1 Browser Settings</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Most web browsers allow some control of cookies through browser settings. You can:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Block all cookies</li>
              <li>Block third-party cookies</li>
              <li>Delete cookies when you close your browser</li>
              <li>View and delete cookies stored on your device</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please note that blocking some types of cookies may impact your experience on our website and limit the services we can provide.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4.2 Cookie Consent Banner</h3>
            <p className="text-gray-700 dark:text-gray-300">
              When you first visit our website, you will see a cookie consent banner. You can accept or reject different categories of cookies. Your preferences will be saved and can be changed at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Duration of Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">We use both session cookies and persistent cookies:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li><strong>Session cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Cookies that remain on your device for a set period or until you delete them</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Your Rights (GDPR/CCPA)</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">If you are located in the EU or California, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Be informed about the use of cookies</li>
              <li>Give or withdraw consent for non-essential cookies</li>
              <li>Access information about cookies we use</li>
              <li>Request deletion of cookie data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Updates to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please review this page periodically for the latest information on our use of cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              If you have any questions about our use of cookies, please contact us:
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
