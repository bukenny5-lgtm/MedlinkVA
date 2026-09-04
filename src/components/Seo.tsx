import { useEffect } from "react";
import { clientAssets } from "../lib/assets";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveResolvedSiteSettings } from "../lib/cms/siteContent";

type SeoProps = {
  title: string;
  description?: string;
  robots?: string;
  image?: string;
  structuredData?: Record<string, unknown> | readonly Record<string, unknown>[];
};

const defaultDescription =
  "Medlink VA is a professional virtual medical assistant website foundation for lead generation, services, resources, jobs, classes, and products.";
const productionBaseUrl = "https://medlinkva.com";

function setOrCreateMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (existing) {
    existing.setAttribute("content", value);
    return;
  }

  const meta = document.createElement("meta");
  meta.setAttribute(attribute, key);
  meta.setAttribute("content", value);
  document.head.append(meta);
}

function setCanonical(pathname: string) {
  const canonicalHref = new URL(pathname, productionBaseUrl).href;
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (existing) {
    existing.href = canonicalHref;
    return;
  }

  const link = document.createElement("link");
  link.rel = "canonical";
  link.href = canonicalHref;
  document.head.append(link);
}

function upsertJsonLd(id: string, data?: Record<string, unknown> | readonly Record<string, unknown>[]) {
  const existing = document.head.querySelector<HTMLScriptElement>(`script[data-jsonld-id="${id}"]`);

  if (!data) {
    existing?.remove();
    return;
  }

  const json = JSON.stringify(data);

  if (existing) {
    existing.textContent = json;
    return;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-jsonld-id", id);
  script.textContent = json;
  document.head.append(script);
}

export function Seo({
  title,
  description = defaultDescription,
  robots = "index,follow",
  image,
  structuredData,
}: SeoProps) {
  const cmsBundle = useCmsBundle();
  const site = resolveResolvedSiteSettings(cmsBundle);

  useEffect(() => {
    const fullTitle = title.includes(site.brandName) ? title : `${title} | ${site.brandName}`;
    const origin = productionBaseUrl;
    const currentUrl = new URL(window.location.pathname, origin).href;
    const absoluteImage = new URL(image ?? clientAssets.hero, origin).href;
    const pageLabelMap: Record<string, string> = {
      "/": "Home",
      "/services": "Services",
      "/about": "About",
      "/how-it-works": "How It Works",
      "/jobs": "Jobs",
      "/classes": "Classes",
      "/resources": "Resources",
      "/products": "Products",
      "/contact": "Contact",
      "/book-consultation": "Book a Consultation",
      "/privacy": "Privacy Policy",
      "/terms": "Terms of Use",
    };

    document.title = fullTitle;
    setOrCreateMeta('meta[name="description"]', "name", "description", description);
    setOrCreateMeta('meta[name="robots"]', "name", "robots", robots);
    setOrCreateMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setOrCreateMeta('meta[property="og:description"]', "property", "og:description", description);
    setOrCreateMeta('meta[property="og:type"]', "property", "og:type", "website");
    setOrCreateMeta('meta[property="og:url"]', "property", "og:url", currentUrl);
    setOrCreateMeta('meta[property="og:image"]', "property", "og:image", absoluteImage);
    setOrCreateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setOrCreateMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setOrCreateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setOrCreateMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteImage);
    setCanonical(window.location.pathname);

    upsertJsonLd("medlink-va-global", [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.brandName,
        url: origin,
        logo: new URL(clientAssets.logo, origin).href,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.brandName,
        url: origin,
      },
    ]);

    const pathname = window.location.pathname;

    if (pathname !== "/") {
      const breadcrumbLabel = pageLabelMap[pathname] ?? fullTitle.replace(` | ${site.brandName}`, "");

      upsertJsonLd("medlink-va-breadcrumbs", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbLabel,
            item: currentUrl,
          },
        ],
      });
    } else {
      upsertJsonLd("medlink-va-breadcrumbs", undefined);
    }

    upsertJsonLd("medlink-va-page", structuredData);
  }, [description, image, robots, site.brandName, structuredData, title]);

  return null;
}

