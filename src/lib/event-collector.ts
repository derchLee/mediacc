export type ProductProperties = Record<string, string | number | boolean | undefined>;

/** Match the collector's strict event dictionary; never send filenames or raw errors. */
export function collectorEvent(event: string, properties: ProductProperties) {
  const media = properties.media_type === 'video' ? 'video' : 'image';
  const operation = properties.operation === 'compress' ? 'compress' : 'convert';
  if (event === 'page_view' || event === '$pageview') return { event_name: 'page_view', properties: { page_key: String(properties.page_key || properties.page_type || (typeof location !== 'undefined' ? location.pathname : 'home')) } };
  if (event === 'processing_started') return { event_name: 'feature_click', properties: { page_key: media, feature_key: `${media}_${operation}`, button_key: 'start_processing' } };
  if (event === 'file_processing_succeeded' || event === 'file_processing_failed' || event === 'download_clicked') {
    const outcome = event === 'download_clicked' ? 'download' : event === 'file_processing_failed' ? 'failed' : 'succeeded';
    return { event_name: 'feature_used', properties: { feature_key: `${media}_${operation}_${outcome}`, operation_id: String(properties.task_id || properties.batch_id || crypto.randomUUID()) } };
  }
  return null;
}

function base64url(value: ArrayBuffer | Uint8Array): string {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  return btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function sendCollectorEvent(event: string, properties: ProductProperties, consent: () => boolean): Promise<void> {
  const source = process.env.NEXT_PUBLIC_ANALYTICS_SOURCE_KEY;
  const mapped = collectorEvent(event, properties);
  if (!source || !mapped || !consent()) return;
  const endpoint = 'https://data.upupdays.com';
  const config = await fetch(endpoint + '/api/v1/ingest/public-key', { headers: { 'X-Project-Key': source }, signal: AbortSignal.timeout(5000) });
  if (!config.ok) throw new Error('Collector public key unavailable');
  const { kid, jwk } = await config.json();
  let device = localStorage.getItem('mediakit_collector_device');
  if (!device) { device = crypto.randomUUID(); localStorage.setItem('mediakit_collector_device', device); }
  const encoder = new TextEncoder();
  const header = base64url(encoder.encode(JSON.stringify({ alg: 'RSA-OAEP-256', enc: 'A256GCM', kid, source })));
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const publicKey = await crypto.subtle.importKey('jwk', jwk, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']);
  const wrapped = await crypto.subtle.encrypt('RSA-OAEP', publicKey, await crypto.subtle.exportKey('raw', key));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const payload = { events: [{ ...mapped, event_id: crypto.randomUUID(), schema_version: 1, occurred_at: new Date().toISOString(), device_id: device }] };
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: encoder.encode(header), tagLength: 128 }, key, encoder.encode(JSON.stringify(payload))));
  if (!consent()) return;
  const body = [header, base64url(wrapped), base64url(iv), base64url(encrypted.slice(0, -16)), base64url(encrypted.slice(-16))].join('.');
  const response = await fetch(endpoint + '/api/v1/events', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/jose', 'X-Project-Key': source }, body, signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error('Collector rejected request');
  const result = await response.json();
  if (!result.results?.length || result.results.some((item: { status: string }) => !['accepted', 'duplicate'].includes(item.status))) throw new Error('Collector rejected event');
}
