"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-NR6F75G20E";
const COOKIE_CONSENT_KEY = "mediacc_cookie_consent";

/**
 * Google Analytics 4 组件
 * 根据 Cookie 同意状态加载 GA4
 */
export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 检查 Cookie 同意状态
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (consent) {
          const prefs = JSON.parse(consent);
          // 如果用户同意分析 Cookie，则加载 GA4
          if (prefs.analytics) {
            setShouldLoad(true);
            return;
          }
        }
        // 如果没有 Cookie 同意记录，默认不加载（等待用户同意）
        setShouldLoad(false);
      } catch (e) {
        setShouldLoad(false);
      }
    };

    checkConsent();

    // 监听 Cookie 同意变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        checkConsent();
      }
    };

    // 监听自定义事件（当用户更新 Cookie 偏好时触发）
    const handleCookieConsentUpdate = () => {
      checkConsent();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookieConsentUpdate", handleCookieConsentUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookieConsentUpdate", handleCookieConsentUpdate);
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
