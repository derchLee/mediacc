"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { syncAnalyticsConsent, trackProductEvent } from "@/lib/product-analytics";

export function ProductAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    let captured = false;
    const update = () => {
      try {
        syncAnalyticsConsent();
        if (!captured) {
          trackProductEvent("$pageview");
          captured = JSON.parse(localStorage.getItem("mediacc_cookie_consent") || "null")?.analytics === true;
        }
      } catch { /* Storage may be unavailable. */ }
    };
    update();
    window.addEventListener("cookieConsentUpdate", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cookieConsentUpdate", update);
      window.removeEventListener("storage", update);
    };
  }, [pathname]);
  return null;
}
