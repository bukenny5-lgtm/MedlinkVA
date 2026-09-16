type AnalyticsPrimitive = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsPrimitive | undefined>;

const measurementIdPattern = /^G-[A-Z0-9]+$/i;
let analyticsInitialized = false;
let lastTrackedPath: string | null = null;

function getMeasurementId() {
  const value = import.meta.env.VITE_GA_MEASUREMENT_ID;
  return typeof value === "string" && measurementIdPattern.test(value.trim()) ? value.trim() : null;
}

function canUseAnalytics() {
  return import.meta.env.PROD && typeof window !== "undefined" && Boolean(getMeasurementId());
}

export function initializeAnalytics() {
  const measurementId = getMeasurementId();
  if (!canUseAnalytics() || !measurementId) return false;
  if (analyticsInitialized) return true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  if (!document.querySelector(`script[data-medlink-ga4="${measurementId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.medlinkGa4 = measurementId;
    document.head.append(script);
  }

  analyticsInitialized = true;
  return true;
}

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (!initializeAnalytics() || !window.gtag) return;
  const cleanParams = Object.fromEntries(Object.entries(params ?? {}).filter(([, value]) => value !== undefined));
  window.gtag("event", name, cleanParams);
}

export function trackPageView(pathname: string) {
  const normalizedPath = pathname.startsWith("/verify/") ? "/verify/:token" : pathname || "/";
  if (lastTrackedPath === normalizedPath) return;
  lastTrackedPath = normalizedPath;
  trackEvent("page_view", {
    page_path: normalizedPath,
    page_title: document.title,
    page_location: new URL(normalizedPath, window.location.origin).href,
  });
}

export function trackCtaClick(label: string, destination: string, location: string) {
  trackEvent("cta_click", { cta_label: label, cta_location: location, destination });
}

export function trackTrainingCtaClick(programName: string, label: string, destination: string) {
  trackEvent("training_cta_click", { program_name: programName, cta_label: label, destination });
}

export function trackServiceCtaClick(serviceName: string, label: string) {
  trackEvent("service_cta_click", { service_name: serviceName, cta_label: label });
}

export function trackHireMvaCtaClick(label: string, destination: string, location: string) {
  trackEvent("hire_mva_cta_click", { cta_label: label, destination, cta_location: location });
}

export function trackImpactCtaClick(label: string, destination: string, location: string) {
  trackEvent("impact_cta_click", { cta_label: label, destination, cta_location: location });
}

export function trackResourceOpen(slug: string, title: string) {
  trackEvent("resource_open", { resource_slug: slug, resource_title: title });
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}
