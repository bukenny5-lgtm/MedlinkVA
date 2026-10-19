import { aboutContent as fallbackAboutContent, type AboutMetric, type AboutPartner } from "../../content/about";
import { siteContent as fallbackSiteContent } from "../../content/site";
import { sanityImageSrc } from "../sanity/image";
import type { CmsBundle } from "../sanity/types";
import { resolveTeamMembers } from "./homeContent";
import { resolveResolvedSiteSettings } from "./siteSettings";

function toPlainText(blocks?: Array<{ children?: Array<{ text?: string }> }>) {
  return blocks?.flatMap((block) => block.children?.map((child) => child.text ?? "") ?? []).join(" ").replace(/\s+/g, " ").trim() ?? "";
}

export function resolveAboutContent(bundle: CmsBundle | null) {
  const site = resolveResolvedSiteSettings(bundle);
  const cmsAbout = bundle?.aboutContent;
  const team = resolveTeamMembers(bundle);
  const applyCta = (actions: typeof fallbackAboutContent.hero.actions) => actions.map((action) => action.to === "/book-consultation" ? { ...action, label: site.primaryCtaLabel } : action.to === "/services" ? { ...action, label: fallbackSiteContent.secondaryCtaLabel } : action);
  return {
    ...fallbackAboutContent,
    hero: { ...fallbackAboutContent.hero, description: cmsAbout?.aboutIntro?.trim() || fallbackAboutContent.hero.description, actions: applyCta(fallbackAboutContent.hero.actions) },
    mission: { ...fallbackAboutContent.mission, description: cmsAbout?.mission?.trim() || fallbackAboutContent.mission.description },
    founder: { ...fallbackAboutContent.founder, heading: cmsAbout?.founderMessageHeading?.trim() || fallbackAboutContent.founder.heading, name: cmsAbout?.founderName?.trim() || fallbackAboutContent.founder.name, role: cmsAbout?.founderRole?.trim() || fallbackAboutContent.founder.role, message: toPlainText(cmsAbout?.founderMessageBody) || fallbackAboutContent.founder.message, image: sanityImageSrc(cmsAbout?.founderImage, { width: 700, height: 875 }) ?? fallbackAboutContent.founder.image, imageAlt: cmsAbout?.founderImageAlt?.trim() || fallbackAboutContent.founder.imageAlt },
    partners: ((cmsAbout?.partners?.length ? cmsAbout.partners : fallbackAboutContent.partners) as AboutPartner[]).filter((partner) => partner.active !== false && partner.name.trim()).slice().sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0)),
    metrics: ((cmsAbout?.metrics ?? []) as AboutMetric[]).filter((metric) => metric.active !== false && metric.label.trim() && metric.value.trim()).slice().sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0)),
    vision: { ...fallbackAboutContent.vision, description: cmsAbout?.vision?.trim() || fallbackAboutContent.vision.description },
    why: { ...fallbackAboutContent.why, description: cmsAbout?.valuesIntro?.trim() || fallbackAboutContent.why.description },
    team: { ...fallbackAboutContent.team, members: team },
    finalCta: { ...fallbackAboutContent.finalCta, primaryAction: { ...fallbackAboutContent.finalCta.primaryAction, label: site.primaryCtaLabel }, secondaryAction: { ...fallbackAboutContent.finalCta.secondaryAction } },
  } as unknown as typeof fallbackAboutContent;
}

