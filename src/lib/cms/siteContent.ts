import { aboutContent as fallbackAboutContent } from "../../content/about";
import { classesContent as fallbackClassesContent } from "../../content/classes";
import { contactContent as fallbackContactContent } from "../../content/contact";
import { homeContent as fallbackHomeContent } from "../../content/home";
import { jobsContent as fallbackJobsContent } from "../../content/jobs";
import { localProducts, productsContent as fallbackProductsContent, type LocalProduct } from "../../content/products";
import { resourcesContent as fallbackResourcesContent } from "../../content/resources";
import { fallbackUpcomingTraining, upcomingTrainingDate } from "../../content/upcomingTraining";
import { servicesContent as fallbackServicesContent } from "../../content/services";
import { siteContent as fallbackSiteContent } from "../../content/site";
import { teamMembers as fallbackTeamMembers } from "../../content/team";
import { sanityImageSrc } from "../sanity/image";
import type {
  CmsBundle,
  ClassDocument,
  FaqDocument,
  JobDocument,
  ProductLinkDocument,
  ResourcePostDocument,
  ServiceDocument,
  SiteSettingsDocument,
  TeamMemberDocument,
  TestimonialDocument,
} from "../sanity/types";
import type { ServiceCard } from "../../content/services";
import type { TeamMember } from "../../content/team";

export function toPlainText(blocks?: Array<{ children?: Array<{ text?: string }>; _type?: string }>) {
  if (!blocks?.length) {
    return "";
  }

  return blocks
    .flatMap((block) => block.children?.map((child) => child.text ?? "") ?? [])
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickFallbackMember(doc: TeamMemberDocument, fallbackMembers: readonly TeamMember[], index: number): TeamMember {
  const fallback =
    fallbackMembers.find((member) => member.name.toLowerCase() === doc.name.toLowerCase()) ??
    fallbackMembers[index] ??
    fallbackMembers[0];

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

function fallbackServiceCard(doc: ServiceDocument, index: number): ServiceCard {
  const titleMap: Record<string, string> = {
    "appointment scheduling": "Administrative & Front Desk Support",
    "administrative support": "Administrative & Front Desk Support",
    "patient communication support": "Patient Care & Coordination Support",
    "ehr / practice workflow support": "EHR / Practice Workflow Support Through AI Automation",
  };
  const title = titleMap[doc.title.trim().toLowerCase()] ?? doc.title;
  const fallback =
    fallbackServicesContent.services.find((service) => service.title.toLowerCase() === title.toLowerCase()) ??
    fallbackServicesContent.services[index] ??
    fallbackServicesContent.services[0];

  return {
    id: fallback.id,
    title: fallback.title,
    description: doc.shortDescription,
    examples: doc.examples?.length ? doc.examples : fallback.examples,
    ctaLabel: fallback.ctaLabel,
    ctaTo: fallback.ctaTo,
  };
}

function resolveServiceCards(cmsServices: ServiceDocument[]) {
  const mapped = cmsServices.map((service, index) => fallbackServiceCard(service, index));
  const merged = new Map<string, ServiceCard>();

  for (const service of mapped) {
    const existing = merged.get(service.id);
    merged.set(service.id, existing ? { ...existing, examples: Array.from(new Set([...existing.examples, ...service.examples])) } : service);
  }

  for (const fallback of fallbackServicesContent.services) {
    if (!merged.has(fallback.id)) merged.set(fallback.id, fallback);
  }

  return Array.from(merged.values());
}

function applyHeroCtaLabels(actions: ReadonlyArray<{ label: string; to: string; variant?: "primary" | "secondary" }>, site: ResolvedSiteSettings) {
  return actions.map((action) => {
    if (action.to === "/book-consultation") {
      return { ...action, label: site.primaryCtaLabel };
    }

    if (action.to === "/services") {
      return { ...action, label: site.secondaryCtaLabel };
    }

    return action;
  });
}

function normalizeCtaLabel(label?: string) {
  return label?.trim().replace(/book a free consultation/gi, fallbackSiteContent.primaryCtaLabel);
}

function mapSiteSettings(bundle: CmsBundle | null): ResolvedSiteSettings {
  const settings = bundle?.siteSettings;

  return {
    brandName: settings?.businessName?.trim() || fallbackSiteContent.brandName,
    brandTagline: settings?.tagline?.trim() || fallbackSiteContent.brandTagline,
    primaryCtaLabel: normalizeCtaLabel(settings?.primaryCTA) || fallbackSiteContent.primaryCtaLabel,
    secondaryCtaLabel: normalizeCtaLabel(settings?.secondaryCTA) || fallbackSiteContent.secondaryCtaLabel,
    contactEmail: settings?.contactEmail?.trim().replace(/^hello@medlinkva\.com$/i, fallbackSiteContent.contactEmail) || fallbackSiteContent.contactEmail,
    phone: settings?.phone?.trim() || fallbackSiteContent.phone,
    socialLinks: settings?.socialLinks ?? [],
    externalProductStoreUrl: settings?.externalProductStoreUrl?.trim() || undefined,
    newsletterHeading:
      settings?.newsletterHeading?.trim() || fallbackHomeContent.newsletter.title || fallbackSiteContent.brandTagline,
    newsletterText: settings?.newsletterText?.trim() || fallbackHomeContent.newsletter.description || "",
    navigation: fallbackSiteContent.navigation,
    footerNavigation: fallbackSiteContent.footerNavigation,
  };
}

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

export function resolveResolvedSiteSettings(bundle: CmsBundle | null) {
  return mapSiteSettings(bundle);
}

export function resolveTeamMembers(bundle: CmsBundle | null) {
  const cmsMembers = bundle?.teamMembers ?? [];

  if (!cmsMembers.length) {
    return [...fallbackTeamMembers].sort((left, right) => left.displayOrder - right.displayOrder);
  }

  return cmsMembers
    .filter((member) => member.active !== false)
    .slice()
    .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map((member, index) => pickFallbackMember(member, fallbackTeamMembers, index));
}

export function resolveHomeContent(bundle: CmsBundle | null) {
  const site = mapSiteSettings(bundle);
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
      consultationCta: {
        ...fallbackHomeContent.hero.consultationCta,
        label: site.primaryCtaLabel,
      },
      secondaryCta: {
        ...fallbackHomeContent.hero.secondaryCta,
        label: site.secondaryCtaLabel,
      },
      supportLine: cmsHome?.trustItems?.length ? cmsHome.trustItems : fallbackHomeContent.hero.supportLine,
    },
    trustStrip: cmsHome?.trustItems?.length
      ? cmsHome.trustItems.map((title, index) => ({
          title,
          description: fallbackHomeContent.trustStrip[index]?.description ?? fallbackHomeContent.trustStrip[0].description,
        }))
      : fallbackHomeContent.trustStrip,
    services: cmsServices.length
      ? resolveServiceCards(cmsServices)
      : fallbackHomeContent.services,
    whyMedlink: {
      ...fallbackHomeContent.whyMedlink,
      title: cmsHome?.whyHeading?.trim() || fallbackHomeContent.whyMedlink.title,
      description: toPlainText(cmsHome?.whyBody) || fallbackHomeContent.whyMedlink.description,
    },
    teamPreview: {
      ...fallbackHomeContent.teamPreview,
      cta: {
        ...fallbackHomeContent.teamPreview.cta,
        label: fallbackHomeContent.teamPreview.cta.label,
      },
    },
    newsletter: {
      ...fallbackHomeContent.newsletter,
      title: site.newsletterHeading,
      description: site.newsletterText,
      consent: fallbackHomeContent.newsletter.consent,
    },
    finalCta: {
      ...fallbackHomeContent.finalCta,
      title: cmsHome?.finalCtaHeading?.trim() || fallbackHomeContent.finalCta.title,
      description: cmsHome?.finalCtaText?.trim() || fallbackHomeContent.finalCta.description,
      cta: {
        ...fallbackHomeContent.finalCta.cta,
        label: site.primaryCtaLabel,
      },
    },
    teamMembers: cmsTeamMembers,
  } as unknown as typeof fallbackHomeContent;
}

export function resolveServicesContent(bundle: CmsBundle | null) {
  const site = mapSiteSettings(bundle);
  const cmsServices = bundle?.services?.filter((service) => service.active !== false) ?? [];

  return {
    ...fallbackServicesContent,
    hero: {
      ...fallbackServicesContent.hero,
      actions: applyHeroCtaLabels(fallbackServicesContent.hero.actions, site),
    },
    services: cmsServices.length
      ? resolveServiceCards(cmsServices)
      : fallbackServicesContent.services,
    finalCta: {
      ...fallbackServicesContent.finalCta,
      primaryAction: {
        ...fallbackServicesContent.finalCta.primaryAction,
        label: site.primaryCtaLabel,
      },
      secondaryAction: {
        ...fallbackServicesContent.finalCta.secondaryAction,
      },
    },
  } as unknown as typeof fallbackServicesContent;
}

export function resolveAboutContent(bundle: CmsBundle | null) {
  const site = mapSiteSettings(bundle);
  const cmsAbout = bundle?.aboutContent;
  const team = resolveTeamMembers(bundle);

  return {
    ...fallbackAboutContent,
    hero: {
      ...fallbackAboutContent.hero,
      description: cmsAbout?.aboutIntro?.trim() || fallbackAboutContent.hero.description,
      actions: applyHeroCtaLabels(fallbackAboutContent.hero.actions, site),
    },
    mission: {
      ...fallbackAboutContent.mission,
      description: cmsAbout?.mission?.trim() || fallbackAboutContent.mission.description,
    },
    vision: {
      ...fallbackAboutContent.vision,
      description: cmsAbout?.vision?.trim() || fallbackAboutContent.vision.description,
    },
    why: {
      ...fallbackAboutContent.why,
      description: cmsAbout?.valuesIntro?.trim() || fallbackAboutContent.why.description,
    },
    team: {
      ...fallbackAboutContent.team,
      members: team,
    },
    finalCta: {
      ...fallbackAboutContent.finalCta,
      primaryAction: {
        ...fallbackAboutContent.finalCta.primaryAction,
        label: site.primaryCtaLabel,
      },
      secondaryAction: {
        ...fallbackAboutContent.finalCta.secondaryAction,
      },
    },
  } as unknown as typeof fallbackAboutContent;
}

export type JobsPageContent = typeof fallbackJobsContent & {
  records: JobDocument[];
};

export type ClassesPageContent = typeof fallbackClassesContent & {
  records: ClassDocument[];
  trainingFaqs: FaqDocument[];
  traineeTestimonials: TestimonialDocument[];
};

export type ResourcesPageContent = Omit<typeof fallbackResourcesContent, "categories"> & {
  categories: string[];
  records: ResourcePostDocument[];
};

export type ProductsPageContent = typeof fallbackProductsContent & {
  records: Array<ProductLinkDocument | LocalProduct>;
};

export function resolveJobsContent(bundle: CmsBundle | null): JobsPageContent {
  const site = mapSiteSettings(bundle);
  const records = bundle?.jobs ?? [];

  return {
    ...fallbackJobsContent,
    hero: {
      ...fallbackJobsContent.hero,
      actions: applyHeroCtaLabels(fallbackJobsContent.hero.actions, site),
    },
    interestCta: {
      ...fallbackJobsContent.interestCta,
      primaryAction: {
        ...fallbackJobsContent.interestCta.primaryAction,
      },
      secondaryAction: {
        ...fallbackJobsContent.interestCta.secondaryAction,
      },
    },
    records,
  } as unknown as JobsPageContent;
}

export function resolveClassesContent(bundle: CmsBundle | null): ClassesPageContent {
  const site = mapSiteSettings(bundle);
  const cmsRecords = bundle?.classes ?? [];
  const hasVerifiedUpcoming = cmsRecords.some((item) => (item.startDate ?? item.date)?.startsWith(upcomingTrainingDate));
  const records = hasVerifiedUpcoming ? cmsRecords : [...cmsRecords, fallbackUpcomingTraining];

  return {
    ...fallbackClassesContent,
    hero: {
      ...fallbackClassesContent.hero,
      actions: applyHeroCtaLabels(fallbackClassesContent.hero.actions, site),
    },
    stayInTouch: {
      ...fallbackClassesContent.stayInTouch,
      primaryAction: {
        ...fallbackClassesContent.stayInTouch.primaryAction,
      },
      secondaryAction: {
        ...fallbackClassesContent.stayInTouch.secondaryAction,
        label: site.primaryCtaLabel,
      },
    },
    records,
    trainingFaqs: (bundle?.faqs ?? []).filter((faq) => faq.category?.toLowerCase() === "training"),
    traineeTestimonials: (bundle?.testimonials ?? []).filter((testimonial) => testimonial.audience === "trainee"),
  } as unknown as ClassesPageContent;
}

export function resolveResourcesContent(bundle: CmsBundle | null): ResourcesPageContent {
  const site = mapSiteSettings(bundle);
  const records = bundle?.resourcePosts ?? [];
  const categories: string[] = records.length
    ? Array.from(new Set(records.map((record) => record.category).filter(Boolean)))
    : [...fallbackResourcesContent.categories];

  return {
    ...fallbackResourcesContent,
    hero: {
      ...fallbackResourcesContent.hero,
      actions: applyHeroCtaLabels(fallbackResourcesContent.hero.actions, site),
    },
    categories,
    records,
  } as unknown as ResourcesPageContent;
}

export function resolveProductsContent(bundle: CmsBundle | null): ProductsPageContent {
  const site = mapSiteSettings(bundle);
  const cmsProducts = bundle?.productLinks ?? [];
  const fallbackBySlug = new Map(localProducts.map((product) => [product.slug.current, product]));
  const records = cmsProducts.length
    ? cmsProducts.map((product) => {
        const slug = product.slug?.current ?? product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const fallback = fallbackBySlug.get(slug);
        return {
          ...product,
          category: product.category ?? fallback?.category,
          features: product.features?.length ? product.features : fallback?.features,
          image: product.image ?? fallback?.image,
          altText: product.altText?.trim() || fallback?.altText || `${product.name} cover`,
        };
      })
    : localProducts;

  return {
    ...fallbackProductsContent,
    hero: {
      ...fallbackProductsContent.hero,
      actions: applyHeroCtaLabels(fallbackProductsContent.hero.actions, site),
    },
    cta: {
      ...fallbackProductsContent.cta,
      primaryAction: {
        ...fallbackProductsContent.cta.primaryAction,
      },
      secondaryAction: {
        ...fallbackProductsContent.cta.secondaryAction,
      },
    },
    records,
  } as unknown as ProductsPageContent;
}

export function resolveContactEmail(bundle: CmsBundle | null) {
  return mapSiteSettings(bundle).contactEmail;
}

export function resolveContactCardData(bundle: CmsBundle | null) {
  const site = mapSiteSettings(bundle);

  return {
    ...fallbackContactContent,
    contactDetails: fallbackContactContent.contactDetails.map((detail) =>
      detail.label === "Email"
        ? {
            ...detail,
            value: site.contactEmail,
            href: `mailto:${site.contactEmail}`,
          }
        : detail.label === "Phone"
          ? { ...detail, value: site.phone, href: `tel:${site.phone?.replace(/[^+\d]/g, "")}` }
          : detail,
    ),
    contactHref: `mailto:${site.contactEmail}`,
  } as unknown as typeof fallbackContactContent;
}
