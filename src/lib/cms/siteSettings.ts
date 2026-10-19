import { homeContent as fallbackHomeContent } from "../../content/home";
import { siteContent as fallbackSiteContent } from "../../content/site";
import type { CmsBundle, SiteSettingsDocument } from "../sanity/types";

export type ResolvedSiteSettings = {
  brandName: string;
  brandTagline: string;
  contactEmail: string;
  externalProductStoreUrl?: string;
  footerNavigation: typeof fallbackSiteContent.footerNavigation;
  navigation: typeof fallbackSiteContent.navigation;
  newsletterHeading: string;
  newsletterText: string;
  phone?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  socialLinks: SiteSettingsDocument["socialLinks"];
};

function normalizeCtaLabel(label?: string) {
  return label?.trim().replace(/book a free consultation/gi, fallbackSiteContent.primaryCtaLabel);
}

function safeSocialLinks(settings?: SiteSettingsDocument | null) {
  return (settings?.socialLinks ?? []).filter((link) => {
    if (!link.label?.trim() || !link.url?.trim()) return false;
    try {
      const url = new URL(link.url);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  });
}

export function resolveResolvedSiteSettings(bundle: CmsBundle | null): ResolvedSiteSettings {
  const settings = bundle?.siteSettings;

  return {
    brandName: settings?.businessName?.trim() || fallbackSiteContent.brandName,
    brandTagline: settings?.tagline?.trim() || fallbackSiteContent.brandTagline,
    primaryCtaLabel: normalizeCtaLabel(settings?.primaryCTA) || fallbackSiteContent.primaryCtaLabel,
    secondaryCtaLabel: normalizeCtaLabel(settings?.secondaryCTA) || fallbackSiteContent.secondaryCtaLabel,
    contactEmail: settings?.contactEmail?.trim().replace(/^hello@medlinkva\.com$/i, fallbackSiteContent.contactEmail) || fallbackSiteContent.contactEmail,
    phone: settings?.phone?.trim() || fallbackSiteContent.phone,
    socialLinks: safeSocialLinks(settings),
    externalProductStoreUrl: settings?.externalProductStoreUrl?.trim() || undefined,
    newsletterHeading: settings?.newsletterHeading?.trim() || fallbackHomeContent.newsletter.title || fallbackSiteContent.brandTagline,
    newsletterText: settings?.newsletterText?.trim() || fallbackHomeContent.newsletter.description || "",
    navigation: fallbackSiteContent.navigation,
    footerNavigation: fallbackSiteContent.footerNavigation,
  };
}

