import { homeContent } from "./home";

export type ServiceCard = {
  title: string;
  description: string;
  examples: readonly string[];
  ctaLabel: string;
  ctaTo: string;
};

export const servicesContent = {
  hero: {
    eyebrow: "Services",
    title: "Practical virtual support for the moving parts of your practice",
    description:
      "Medlink VA can help organize the administrative work that supports patient-facing care, without implying clinical treatment or licensed medical services.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "How It Works", to: "/how-it-works", variant: "secondary" as const },
    ],
    chips: ["Healthcare-focused", "CMS-ready", "Conversion-oriented"],
  },
  services: [
    {
      title: "Appointment Scheduling",
      description:
        "Support calendar coordination, appointment reminders, and routine rescheduling requests so the schedule feels easier to manage.",
      examples: [
        "Coordinate incoming appointment requests",
        "Share reminders and basic scheduling updates",
        "Help reduce back-and-forth around time slots",
      ],
      ctaLabel: "Discuss scheduling support",
      ctaTo: "/book-consultation",
    },
    {
      title: "Virtual Medical Reception",
      description:
        "Create a polished front-desk experience for routine inquiries, message routing, and general practice coordination.",
      examples: [
        "Route basic questions to the right contact",
        "Help keep inquiries organized and answered",
        "Support a professional remote reception presence",
      ],
      ctaLabel: "Review reception support",
      ctaTo: "/contact",
    },
    {
      title: "Patient Communication Support",
      description:
        "Assist with non-clinical communication tasks that help keep updates, follow-ups, and routine contact moving smoothly.",
      examples: [
        "Help manage general follow-up messages",
        "Organize communication queues",
        "Support clear, timely coordination",
      ],
      ctaLabel: "Talk through communication needs",
      ctaTo: "/book-consultation",
    },
    {
      title: "Administrative Support",
      description:
        "Take on everyday administrative work that can consume a practice team’s time and attention.",
      examples: [
        "Support document organization",
        "Help with routine task tracking",
        "Coordinate day-to-day admin workflows",
      ],
      ctaLabel: "Explore admin support",
      ctaTo: "/services",
    },
    {
      title: "Insurance & Billing Support",
      description:
        "Assist with billing-related administration and claims follow-up coordination without presenting as a payer or clinical service.",
      examples: [
        "Organize billing-related follow-up tasks",
        "Support claims-related admin coordination",
        "Help maintain clearer back-office flow",
      ],
      ctaLabel: "Review billing support",
      ctaTo: "/book-consultation",
    },
    {
      title: "EHR / Practice Workflow Support",
      description:
        "Help keep routine practice processes, workflow handoffs, and system-related admin work better organized.",
      examples: [
        "Support workflow handoffs",
        "Assist with routine EHR-related admin tasks",
        "Improve process consistency across the day",
      ],
      ctaLabel: "Discuss workflow support",
      ctaTo: "/how-it-works",
    },
  ] satisfies ServiceCard[],
  benefits: [
    {
      title: "Less administrative friction",
      description: "Reduce the feeling that every routine task is competing for the same limited time and attention.",
    },
    {
      title: "Clearer communication",
      description: "Keep day-to-day communication organized so the next step is easier to understand.",
    },
    {
      title: "Flexible support structure",
      description: "Use a support model that can grow with your needs instead of forcing a rigid setup.",
    },
  ],
  whoWeServe: homeContent.whoWeServe.audiences,
  finalCta: {
    title: "Need help with the administrative side of care delivery?",
    description: "Tell us what the practice needs to make better, and we’ll help you map the right support conversation.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Contact Medlink VA", to: "/contact" },
  },
} as const;

