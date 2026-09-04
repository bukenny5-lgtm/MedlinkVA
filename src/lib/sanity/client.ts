import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() ?? "";
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() ?? "";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION?.trim() || "2026-03-30";

export const sanityConfig = projectId && dataset ? { projectId, dataset, apiVersion } : null;

export const sanityClient = sanityConfig
  ? createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: true,
    })
  : null;

export function isSanityConfigured() {
  return sanityClient !== null;
}
