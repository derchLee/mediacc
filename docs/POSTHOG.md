# MediaKit product analytics

Project: 717477 (US). The SDK uses its public write-only project token; override with NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST at build time. Docker build arguments are wired through Compose. No personal API token is included.

Analytics starts only with the existing mediacc_cookie_consent.analytics preference. Recording, automatic clicks, feature flags, surveys and automatic page views are disabled. The route observer sends one page view per path after consent. Rejected consent drops business events; withdrawal also opts out the SDK. No events are queued before consent.

Events: $pageview, files_selected, file_rejected, processing_started, file_processing_succeeded, file_processing_failed, processing_finished, download_clicked, video_engine_load_finished.

Batch events include batch_id, media_type, operation, file_count; per-file outcomes include task_id, input/output formats, size buckets and duration_ms. Results preserve batch/task IDs for download attribution. Batch completion reports success_count/failure_count and success/partial_failure/failure. Download clicks do not prove that the browser saved a file. Engine timing measures preload requests, including cached loads.

All dashboard charts must filter environment=production and $host=mediakit.upupdays.com, since the project also contains another product. Local builds are development even when NODE_ENV is production. Core measure: weekly unique file_processing_succeeded users. Success rate: successes/(successes+failures), excluding unfinished/abandoned tasks. Duration percentiles must use file_processing_succeeded.duration_ms, never processing_started. Entry breakdown uses entry_path; source uses source_host. Anonymous user counts represent browsers, not verified individuals. Consent-only traffic is a subset of total visits.

Do not transmit filenames, file contents, preview URLs or raw exception text. URLs are reduced to origin/path and referrer to origin. No sample production events should be generated.

Validation: node scripts/test-product-analytics.cjs; npx tsc --noEmit; npm run build. Deployment of this checkout is required before production events appear.
