import { localProducts, productsContent as fallbackProductsContent, type LocalProduct } from "../../content/products";
import type { CmsBundle, ProductLinkDocument } from "../sanity/types";
import { resolveResolvedSiteSettings } from "./siteSettings";

export type ProductsPageContent = typeof fallbackProductsContent & { records: Array<ProductLinkDocument | LocalProduct> };

export function resolveProductsContent(bundle: CmsBundle | null): ProductsPageContent {
  const site = resolveResolvedSiteSettings(bundle);
  const cmsProducts = bundle?.productLinks ?? [];
  const fallbackBySlug = new Map(localProducts.map((product) => [product.slug.current, product]));
  const records = cmsProducts.length ? cmsProducts.map((product) => { const slug = product.slug?.current ?? product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); const fallback = fallbackBySlug.get(slug); return { ...product, category: product.category ?? fallback?.category, features: product.features?.length ? product.features : fallback?.features, image: product.image ?? fallback?.image, altText: product.altText?.trim() || fallback?.altText || `${product.name} cover` }; }) : localProducts;
  return { ...fallbackProductsContent, hero: { ...fallbackProductsContent.hero, actions: fallbackProductsContent.hero.actions.map((action) => String(action.to) === "/book-consultation" ? { ...action, label: site.primaryCtaLabel } : { ...action }) }, cta: { ...fallbackProductsContent.cta, primaryAction: { ...fallbackProductsContent.cta.primaryAction }, secondaryAction: { ...fallbackProductsContent.cta.secondaryAction } }, records } as unknown as ProductsPageContent;
}
