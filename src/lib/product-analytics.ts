import posthog from "posthog-js";

let initialized = false;
export function hasAnalyticsConsent(): boolean {
  try { return JSON.parse(localStorage.getItem("mediacc_cookie_consent") || "null")?.analytics === true; }
  catch { return false; }
}
export function syncAnalyticsConsent(): void {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_yFH4krzHpkugmcWWgyBcxFQELD2qeep9vx2gEV6UkJr6";
  if (!key || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) {
    if (initialized) posthog.opt_out_capturing();
    return;
  }
  if (!initialized) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      autocapture: false, capture_pageview: false, capture_pageleave: false,
      disable_session_recording: true, disable_surveys: true,
      disable_external_dependency_loading: true,
      advanced_disable_flags: true,
      save_campaign_params: false,
      save_referrer: false,
      person_profiles: "identified_only",
      before_send: (event) => {
        if (!hasAnalyticsConsent()) return null;
        if (event) {
          event.properties.$current_url = location.origin + location.pathname;
          event.properties.$pathname = location.pathname;
          const referrer = document.referrer;
          event.properties.$referrer = referrer ? new URL(referrer).origin : "";
        }
        return event;
      },
    });
    initialized = true;
  }
  posthog.opt_in_capturing({ captureEventName: false });
}
export function trackProductEvent(event: string, properties: Record<string, string | number | boolean | undefined> = {}): void {
  try {
    if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
    syncAnalyticsConsent();
    if (!initialized) return;
    let entryPath = location.pathname;
    try {
      entryPath = sessionStorage.getItem("mediakit_analytics_entry") || location.pathname;
      sessionStorage.setItem("mediakit_analytics_entry", entryPath);
    } catch { /* Session storage may be unavailable. */ }
    posthog.capture(event, {
      entry_path: entryPath,
      source_host: document.referrer ? new URL(document.referrer).hostname : "direct",
      ...properties,
      environment: process.env.NODE_ENV === "production" && location.hostname === "mediakit.upupdays.com" ? "production" : "development",
      locale: location.pathname.match(/^\/(ja|es|pt)(?:\/|$)/)?.[1] || "en",
    });
  } catch { /* Analytics must never interrupt file processing. */ }
}
export function sizeBucket(bytes: number): string {
  return bytes < 1024 * 1024 ? "under_1mb" : bytes < 10 * 1024 * 1024 ? "1_10mb" : bytes < 50 * 1024 * 1024 ? "10_50mb" : "50mb_plus";
}

export function createAnalyticsId(): string {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
