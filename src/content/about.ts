import { clientAssets } from "../lib/assets";
import { teamMembers } from "./team";

export const aboutContent = {
  hero: {
    eyebrow: "About Medlink VA",
    title: "Practical training. Thoughtful healthcare support.",
    description:
      "MedLink VA brings together Virtual Medical Assistant training and remote administrative support for healthcare practices. Our approach puts people, clear communication, and responsible working habits first.",
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
      "To equip Virtual Medical Assistants with practical skills and help healthcare teams manage everyday administrative work with clarity and care.",
  },
  vision: {
    title: "Vision",
    description:
      "To create stronger connections between capable Virtual Medical Assistants and healthcare teams through purposeful learning and dependable support.",
  },
  values: [
    {
      title: "Clarity",
      description: "Communicate in a way that is easy to understand, easy to act on, and easy to trust.",
    },
    {
      title: "Professionalism",
      description: "Bring care, respect, and accountability to learning and everyday healthcare administration.",
    },
    {
      title: "Flexibility",
      description: "Offer support that can adapt as a practice’s needs change over time.",
    },
    {
      title: "Privacy & Confidentiality",
      description:
        "Training and administrative workflows are designed with confidentiality and responsible information handling in mind.",
    },
  ],
  why: {
    eyebrow: "Why Medlink VA",
    title: "A practical support partner for healthcare-focused work",
    description:
      "Whether you are developing your skills or organizing a busy practice, start with a conversation about what you need.",
    bullets: [
      "Practical healthcare administrative learning",
      "Integrity and transparent expectations",
      "Personalized support and clear communication",
      "Privacy and confidentiality-minded workflows",
    ],
  },
  team: {
    eyebrow: "Leadership & Team",
    title: "Meet the people behind MedLink VA",
    description:
      "Our team connects training, administrative support, and the people we work with.",
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

