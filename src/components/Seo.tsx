import { useEffect } from "react";
import { siteContent } from "../content/site";

type SeoProps = {
  title: string;
  description?: string;
  robots?: string;
  image?: string;
};

const defaultDescription =
  "Medlink VA is a professional virtual medical assistant website foundation for lead generation, services, resources, jobs, classes, and products.";

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
  const canonicalHref = new URL(pathname, window.location.origin).href;
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

function setOrRemoveImageMeta(selector: string, attribute: "name" | "property", key: string, value?: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!value) {
    existing?.remove();
    return;
  }

  if (existing) {
    existing.setAttribute("content", value);
    return;
  }

  const meta = document.createElement("meta");
  meta.setAttribute(attribute, key);
  meta.setAttribute("content", value);
  document.head.append(meta);
}

export function Seo({
  title,
  description = defaultDescription,
  robots = "index,follow",
  image,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(siteContent.brandName)
      ? title
      : `${title} | ${siteContent.brandName}`;

    document.title = fullTitle;
    setOrCreateMeta('meta[name="description"]', "name", "description", description);
    setOrCreateMeta('meta[name="robots"]', "name", "robots", robots);
    setOrCreateMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setOrCreateMeta('meta[property="og:description"]', "property", "og:description", description);
    setOrCreateMeta('meta[property="og:type"]', "property", "og:type", "website");
    setOrCreateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setOrCreateMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setOrCreateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setOrRemoveImageMeta('meta[property="og:image"]', "property", "og:image", image);
    setOrRemoveImageMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    setCanonical(window.location.pathname);
  }, [description, image, robots, title]);

  return null;
}

