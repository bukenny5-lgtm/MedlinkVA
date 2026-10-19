import { resourcesContent as fallbackResourcesContent } from "../../content/resources";
import { starterResources } from "../../content/starterResources";
import { defaultReviewIntervalDays } from "../resources";
import type { CmsBundle, ResourcePostDocument } from "../sanity/types";
import { resolveResolvedSiteSettings } from "./siteSettings";

export type ResourcesPageContent = Omit<typeof fallbackResourcesContent, "categories"> & { categories: string[]; records: ResourcePostDocument[] };

export function resolveResourcesContent(bundle: CmsBundle | null): ResourcesPageContent {
  const site = resolveResolvedSiteSettings(bundle);
  const records = (bundle?.resourcePosts?.length ? bundle.resourcePosts : starterResources).map((record) => ({ ...record, reviewIntervalDays: record.reviewIntervalDays ?? defaultReviewIntervalDays(record.category) }));
  const categories: string[] = records.length ? Array.from(new Set(records.map((record) => record.category).filter(Boolean))) : [...fallbackResourcesContent.categories];
  return { ...fallbackResourcesContent, hero: { ...fallbackResourcesContent.hero, actions: fallbackResourcesContent.hero.actions.map((action) => String(action.to) === "/book-consultation" ? { ...action, label: site.primaryCtaLabel } : { ...action }) }, categories, records } as unknown as ResourcesPageContent;
}
