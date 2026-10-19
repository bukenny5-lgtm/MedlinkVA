import { homeContent as fallbackHomeContent } from "../../content/home";
import { servicesContent as fallbackServicesContent, type ServiceCard } from "../../content/services";
import { siteContent as fallbackSiteContent } from "../../content/site";
import { teamMembers as fallbackTeamMembers, type TeamMember } from "../../content/team";
import { sanityImageSrc } from "../sanity/image";
import type { CmsBundle, ServiceDocument, TeamMemberDocument } from "../sanity/types";
import { resolveResolvedSiteSettings } from "./siteSettings";

function toPlainText(blocks?: Array<{ children?: Array<{ text?: string }> }>) {
  return blocks?.flatMap((block) => block.children?.map((child) => child.text ?? "") ?? []).join(" ").replace(/\s+/g, " ").trim() ?? "";
}

function pickFallbackMember(doc: TeamMemberDocument, index: number): TeamMember {
  const fallback = fallbackTeamMembers.find((member) => member.name.toLowerCase() === doc.name.toLowerCase()) ?? fallbackTeamMembers[index] ?? fallbackTeamMembers[0];
  return {
    name: doc.name,
    role: doc.role,
    image: sanityImageSrc(doc.photo, { width: 700, height: 875 }) ?? fallback.image,
    alt: doc.altText?.trim() || `${doc.name}, ${doc.role} at MedLink VA`,
    shortBio: doc.shortBio ?? fallback.shortBio,
    featured: doc.featured ?? fallback.featured,
    displayOrder: doc.displayOrder ?? fallback.displayOrder,
  };
}

export function resolveTeamMembers(bundle: CmsBundle | null) {
  const cmsMembers = bundle?.teamMembers ?? [];
  if (!cmsMembers.length) return [...fallbackTeamMembers].sort((left, right) => left.displayOrder - right.displayOrder);
  return cmsMembers.filter((member) => member.active !== false).slice().sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0)).map((member, index) => pickFallbackMember(member, index));
}

function fallbackServiceCard(doc: ServiceDocument, index: number): ServiceCard {
  const titleMap: Record<string, string> = {
    "appointment scheduling": "Administrative & Front Desk Support",
    "administrative support": "Administrative & Front Desk Support",
    "patient communication support": "Patient Care & Coordination Support",
    "ehr / practice workflow support": "EHR / Practice Workflow Support Through AI Automation",
  };
  const title = titleMap[doc.title.trim().toLowerCase()] ?? doc.title;
  const fallback = fallbackServicesContent.services.find((service) => service.title.toLowerCase() === title.toLowerCase()) ?? fallbackServicesContent.services[index] ?? fallbackServicesContent.services[0];
  return { id: fallback.id, title: fallback.title, description: doc.shortDescription, examples: doc.examples?.length ? doc.examples : fallback.examples, ctaLabel: fallback.ctaLabel, ctaTo: fallback.ctaTo };
}

function resolveServiceCards(cmsServices: ServiceDocument[]) {
  const mapped = cmsServices.map((service, index) => fallbackServiceCard(service, index));
  const merged = new Map<string, ServiceCard>();
  for (const service of mapped) {
    const existing = merged.get(service.id);
    merged.set(service.id, existing ? { ...existing, examples: Array.from(new Set([...existing.examples, ...service.examples])) } : service);
  }
  for (const fallback of fallbackServicesContent.services) if (!merged.has(fallback.id)) merged.set(fallback.id, fallback);
  return Array.from(merged.values());
}

export function resolveHomeContent(bundle: CmsBundle | null) {
  const site = resolveResolvedSiteSettings(bundle);
  const cmsHome = bundle?.homepageContent;
  const cmsServices = bundle?.services ?? [];
  const cmsTeamMembers = resolveTeamMembers(bundle);
  return {
    ...fallbackHomeContent,
    hero: {
      ...fallbackHomeContent.hero,
      title: cmsHome?.heroHeading?.trim() || fallbackHomeContent.hero.title,
      description: cmsHome?.heroSubheading?.trim() || fallbackHomeContent.hero.description,
      primaryCta: fallbackHomeContent.hero.primaryCta,
      consultationCta: { ...fallbackHomeContent.hero.consultationCta, label: site.primaryCtaLabel },
      secondaryCta: { ...fallbackHomeContent.hero.secondaryCta, label: fallbackSiteContent.secondaryCtaLabel },
      supportLine: cmsHome?.trustItems?.length ? cmsHome.trustItems : fallbackHomeContent.hero.supportLine,
    },
    trustStrip: cmsHome?.trustItems?.length ? cmsHome.trustItems.map((title, index) => ({ title, description: fallbackHomeContent.trustStrip[index]?.description ?? fallbackHomeContent.trustStrip[0].description })) : fallbackHomeContent.trustStrip,
    services: cmsServices.length ? resolveServiceCards(cmsServices) : fallbackHomeContent.services,
    whyMedlink: { ...fallbackHomeContent.whyMedlink, title: cmsHome?.whyHeading?.trim() || fallbackHomeContent.whyMedlink.title, description: toPlainText(cmsHome?.whyBody) || fallbackHomeContent.whyMedlink.description },
    teamPreview: { ...fallbackHomeContent.teamPreview, cta: { ...fallbackHomeContent.teamPreview.cta, label: fallbackHomeContent.teamPreview.cta.label } },
    newsletter: { ...fallbackHomeContent.newsletter, title: site.newsletterHeading, description: site.newsletterText, consent: fallbackHomeContent.newsletter.consent },
    finalCta: { ...fallbackHomeContent.finalCta, title: cmsHome?.finalCtaHeading?.trim() || fallbackHomeContent.finalCta.title, description: cmsHome?.finalCtaText?.trim() || fallbackHomeContent.finalCta.description, cta: { ...fallbackHomeContent.finalCta.cta, label: site.primaryCtaLabel } },
    teamMembers: cmsTeamMembers,
  } as unknown as typeof fallbackHomeContent;
}
