type AnalyticsPrimitive = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsPrimitive | undefined>;

const measurementIdPattern = /^G-[A-Z0-9]+$/i;
let lastTrackedPath: string | null = null;

function getMeasurementId() {
  const value = import.meta.env.VITE_GA_MEASUREMENT_ID;
  return typeof value === "string" && measurementIdPattern.test(value.trim()) ? value.trim() : null;
}

function canUseAnalytics() {
  return import.meta.env.PROD && typeof window !== 'undefined' && Boolean(getMeasurementId()) && typeof window.gtag === 'function';
}

function isDebugMode() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.has("gtm_debug") || params.has("tagassistant") || params.has("gtm_auth") || params.has("gtm_preview");
}

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (!canUseAnalytics() || !window.gtag) return;
  const cleanParams = Object.fromEntries(Object.entries(params ?? {}).filter(([, value]) => value !== undefined));
  window.gtag("event", name, {
    ...cleanParams,
    ...(isDebugMode() ? { debug_mode: true } : {}),
  });
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

export function trackTrainingCtaClick(programName: string, label: string, destination: string, options?: { trainingMode?: "one-on-one" | "group" | "other"; destinationType?: "consultation" | "external_checkout" | "internal" }) {
  trackEvent("training_cta_click", {
    programme: programName,
    program_name: programName,
    cta_label: label,
    destination,
    ...(options?.trainingMode ? { training_mode: options.trainingMode } : {}),
    ...(options?.destinationType ? { destination_type: options.destinationType } : {}),
  });
}

export function trackTrainingCheckoutClick(programName: string, destination: string) {
  trackEvent("training_checkout_click", {
    programme: programName,
    training_mode: "group",
    destination_type: "external_checkout",
    destination,
  });
}
export function trackTrainingOpen(name: "training_path_open", destination: string) {
  trackEvent(name, { destination });
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

export function trackResourceCategoryOpen(category: string) {
  trackEvent("resource_category_open", { category });
}

export function trackHealthcareTeamCtaClick(teamType: string, destination: string) {
  trackEvent("healthcare_team_cta_click", { team_type: teamType, destination });
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}