/**
 * Analytics helper — GA4 / GTM dataLayer events.
 *
 * All events are pushed to `window.dataLayer`, which GTM picks up and
 * forwards to GA4 via Custom Event triggers + GA4 Event tags.
 *
 * Rules:
 *  - Browser-only: every function is a no-op on the server.
 *  - No PII: never pass email, name, phone, message content, or IP.
 *  - No AdSense click tracking: ad revenue comes from the GA4–AdSense integration.
 */

export type DataLayerValue = string | number | boolean | undefined;

export type DataLayerParams = Record<string, DataLayerValue>;

declare global {
  interface Window {
    /** GTM / gtag push a mix of event objects and legacy argument shapes */
    dataLayer?: object[];
  }
}

/**
 * Push a custom event to `window.dataLayer`.
 * Safe to import from Server Components — no-ops on the server.
 */
export function trackEvent(eventName: string, params: DataLayerParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

/** Current path for analytics context (pathname only, no query string). */
export function getPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname;
}

/**
 * tool_view — fired when a user opens/views a tool page.
 */
export function trackToolView(params: {
  tool_slug: string;
  tool_name?: string;
  tool_category?: string;
  page_path?: string;
}): void {
  trackEvent("tool_view", {
    tool_slug: params.tool_slug,
    tool_name: params.tool_name,
    tool_category: params.tool_category,
    page_path: params.page_path ?? getPagePath(),
  });
}

/**
 * tool_complete — fired when a user successfully receives a result.
 * Primary key event for GA4 (tool engagement).
 */
export function trackToolComplete(params: {
  tool_slug: string;
  tool_name?: string;
  tool_category?: string;
  output_type?: string;
}): void {
  trackEvent("tool_complete", params);
}

/** copy_result — user copied a generated result. */
export function trackCopyResult(params: { tool_slug: string; result_type: string }): void {
  trackEvent("copy_result", params);
}

/** download_result — user downloaded an output file. */
export function trackDownloadResult(params: {
  tool_slug: string;
  result_type: string;
  file_type?: string;
}): void {
  trackEvent("download_result", params);
}

/** search — site or tool search (e.g. homepage hero, /tools directory). */
export function trackSearch(params: { search_term: string; result_count: number }): void {
  trackEvent("search", params);
}

/** select_content — user chose a tool from search or filtered listing. */
export function trackSelectContent(params: {
  content_type: "tool";
  item_id: string;
  search_term?: string;
}): void {
  trackEvent("select_content", params);
}

/**
 * share — user initiated a share flow (blog engagement, tool share UI, etc.).
 */
export function trackShare(params: {
  content_type: "tool" | "blog";
  item_id: string;
  method?: string;
  page_path?: string;
}): void {
  trackEvent("share", {
    content_type: params.content_type,
    item_id: params.item_id,
    method: params.method,
    page_path: params.page_path ?? getPagePath(),
  });
}

/**
 * generate_lead — successful contact form submission (secondary KPI only).
 */
export function trackGenerateLead(params: {
  form_name: string;
  lead_topic?: string;
  page_path?: string;
}): void {
  trackEvent("generate_lead", {
    form_name: params.form_name,
    lead_topic: params.lead_topic,
    page_path: params.page_path ?? getPagePath(),
  });
}
