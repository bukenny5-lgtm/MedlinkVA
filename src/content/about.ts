import { clientAssets } from "../lib/assets";
import { teamMembers } from "./team";

export const aboutContent = {
  hero: {
    eyebrow: "About Medlink VA",
    title: "Professional virtual support designed to stay human and practical",
    description:
      "Medlink VA is presented as a healthcare support brand that values clarity, responsiveness, and thoughtful coordination. The copy below is provisional and ready to be refined with client-approved language later.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "View Services", to: "/services", variant: "secondary" as const },
    ],
    image: {
      src: clientAssets.teamPhoto,
      alt: "Medlink VA team collaborating on laptops in a healthcare support setting",
    },
  },
  mission: {
    title: "Mission",
    description:
      "To provide dependable virtual support that helps healthcare teams stay organized, responsive, and better prepared for daily work. This statement remains intentionally editable until the client approves the final wording.",
  },
  vision: {
    title: "Vision",
    description:
      "To become a trusted virtual support partner for practices that want a calm, professional, and scalable way to handle administrative work. The vision language can be refined once the business story is finalized.",
  },
  values: [
    {
      title: "Clarity",
      description: "Communicate in a way that is easy to understand, easy to act on, and easy to trust.",
    },
    {
      title: "Professionalism",
      description: "Keep the experience polished, respectful, and suitable for healthcare audiences.",
    },
    {
      title: "Flexibility",
      description: "Offer support that can adapt as a practice’s needs change over time.",
    },
    {
      title: "Privacy-minded process",
      description:
        "Keep public forms and public copy focused on business communication rather than sensitive patient details.",
    },
  ],
  why: {
    eyebrow: "Why Medlink VA",
    title: "A practical support partner for healthcare-focused work",
    description:
      "The page should reassure visitors that Medlink VA is built around organization, communication, and a modern remote-support mindset.",
    bullets: [
      "Professional tone without overpromising",
      "Content structure that can move into Sanity later",
      "Healthcare-focused copy that remains editable",
      "Team presentation that uses the confirmed names and roles only",
    ],
  },
  team: {
    eyebrow: "Leadership & Team",
    title: "The confirmed team members already in the project",
    description:
      "These records are reused from centralized team content so the About page stays consistent with the homepage and future CMS models.",
    members: teamMembers,
  },
  finalCta: {
    title: "Let’s talk through what support would be most helpful",
    description:
      "If you’re comparing virtual support options, the consultation page is the best next step for a practical conversation.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Contact Medlink VA", to: "/contact" },
  },
} as const;

