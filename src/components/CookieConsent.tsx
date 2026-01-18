"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Settings } from "lucide-react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "mediacc_cookie_consent";

interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  advertising: boolean;
}

/**
 * Cookie Consent Banner Component
 * GDPR/CCPA compliant cookie consent management
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner if no consent has been given
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        // Apply cookie preferences (e.g., load GA4 if analytics is enabled)
        applyCookiePreferences(saved);
      } catch (e) {
        // Invalid consent data, show banner again
        setShowBanner(true);
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // TODO: Apply cookie preferences based on user choices
    // This will be implemented when Google Analytics/Ads are added
    if (prefs.analytics) {
      // Load Google Analytics
      // gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
    if (prefs.advertising) {
      // Load Google Ads
      // gtag('consent', 'update', { 'ad_storage': 'granted' });
    }
  };

  const handleAcceptAll = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
    };
    savePreferences(newPreferences);
  };

  const handleRejectAll = () => {
    const newPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
    };
    savePreferences(newPreferences);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    applyCookiePreferences(prefs);
    
    // 触发自定义事件，通知 GoogleAnalytics 组件更新
    window.dispatchEvent(new Event("cookieConsentUpdate"));
  };

  if (!showBanner && !showSettings) {
    // Show small cookie settings button if consent has been given
    return (
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        aria-label="Cookie Settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full pointer-events-auto">
        {!showSettings ? (
          // Cookie Banner
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  We Use Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                  <Link href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Customize
              </button>
            </div>
          </div>
        ) : (
          // Cookie Settings
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Cookie Settings
              </h3>
              <button
                onClick={() => {
                  setShowSettings(false);
                  if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
                    setShowBanner(true);
                  }
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Necessary Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Required for the website to function properly
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help us understand how visitors interact with our website (e.g., Google Analytics)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Advertising Cookies</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Used to deliver relevant advertisements (e.g., Google Ads)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) =>
                      setPreferences({ ...preferences, advertising: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Preferences
              </button>
              <Link
                href="/cookies"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
