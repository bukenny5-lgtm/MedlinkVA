import { clientAssets } from "../lib/assets";
import { teamMembers } from "./team";

export type AboutPartner = {
  name: string;
  logo?: import("../lib/sanity/types").SanityImageSource;
  altText?: string;
  websiteUrl?: string;
  active?: boolean;
  displayOrder?: number;
};

export type AboutMetric = {
  label: string;
  value: string;
  suffix?: string;
  description?: string;
  active?: boolean;
  displayOrder?: number;
};

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
  founder: {
    heading: "A Message from Our Founder",
    name: "Racheal O Mulinde",
    role: "Founder & CEO",
    message: "I founded MedLink VA to bring together practical Virtual Medical Assistant training and thoughtful healthcare administrative support. With training as a Clinical Officer, I understand the importance of clear, responsible workflows around healthcare teams. A fuller founder message can be added through the MedLink VA content system.",
    image: clientAssets.ceoPhoto,
    imageAlt: "Racheal O Mulinde, Founder and CEO of MedLink VA",
  },
  partners: [
    { name: "Chetacare", displayOrder: 1 },
    { name: "HiJob", displayOrder: 2 },
      { name: "Converse to Clarity", displayOrder: 3 },
      { name: "We Make Change", displayOrder: 4 },
  ] satisfies AboutPartner[],
  metrics: [] satisfies AboutMetric[],
  vision: {
    title: "Vision",
    description:
      "To create stronger connections between capable Virtual Medical Assistants and healthcare teams through purposeful learning and dependable support.",
  },
  values: [
    {
      title: "Clarity",
      description: "We communicate expectations, next steps, and responsibilities in a way that is straightforward and easy to understand.",
    },
    {
      title: "Professionalism",
      description: "We encourage respectful communication, accountability, reliability, and the professional habits needed in healthcare-focused work.",
    },
    {
      title: "Flexibility",
      description: "People and practices have different needs. We aim to provide learning and support that can adapt while keeping responsibilities clearly defined.",
    },
    {
      title: "Privacy & Confidentiality",
      description:
        "Training and administrative support are approached with respect for privacy, responsible information handling, and appropriate boundaries.",
    },
  ],
  why: {
    eyebrow: "Why MedLink VA",
    title: "Why people choose to work with MedLink VA",
    description:
      "MedLink VA brings training and healthcare administrative support together around one practical idea: people perform better when they understand the work, communicate clearly, and know what is expected of them. For learners, that means preparation grounded in real administrative workflows and professional habits. For healthcare practices, it means access to remote support professionals who have been introduced to the responsibilities, communication, and boundaries involved in healthcare-focused work.",
    bullets: [
      "Practical preparation for healthcare administrative work",
      "Clear expectations and professional communication",
      "Support that respects privacy and defined responsibilities",
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
    title: "Where would you like to go next?",
    description:
      "If you are exploring a Virtual Medical Assistant career, we can help you understand the training paths available. If you are looking for administrative support for a healthcare practice, we can talk through your workflow and help you identify where a trained MVA may fit.",
    primaryAction: { label: "Explore Training", to: "/classes" },
    secondaryAction: { label: "Book a Consultation", to: "/book-consultation" },
  },
} as const;

