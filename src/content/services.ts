import { homeContent } from "./home";

export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  examples: readonly string[];
  ctaLabel: string;
  ctaTo: string;
};

export const servicesContent = {
  hero: {
    eyebrow: "Healthcare administrative support",
    title: "Remote support that keeps your practice moving",
    description:
      "From first patient contact through follow-up, MedLink VA helps healthcare practices keep everyday administrative work organized and moving.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "How It Works", to: "/how-it-works", variant: "secondary" as const },
    ],
    chips: ["Healthcare administration", "Clear communication", "Process support"],
  },
  services: [
    {
      id: "administrative-front-desk",
      title: "Administrative & Front Desk Support",
      description: "Help keep the front desk running smoothly with support for scheduling, calendar coordination, routine patient communication, and the day-to-day work that keeps the practice organized.",
      examples: ["Appointment scheduling and calendar coordination", "Routine administrative and front-desk workflows", "Patient-facing administrative coordination", "Follow-up scheduling where appropriate"],
      ctaLabel: "Discuss front-desk support",
      ctaTo: "/book-consultation",
    },
    {
      id: "virtual-medical-reception",
      title: "Virtual Medical Reception",
      description: "Give patients a clear, professional first point of contact with help for routine enquiries, message routing, appointment coordination, and remote reception tasks.",
      examples: ["Handle routine patient enquiries", "Route messages to the right practice contact", "Coordinate appointments and basic updates", "Support a professional remote reception presence"],
      ctaLabel: "Review reception support",
      ctaTo: "/contact",
    },
    {
      id: "patient-care-coordination",
      title: "Patient Care & Coordination Support",
      description: "Help keep patient follow-up, reminders, routine communication, and coordination between patients and practice teams organized.",
      examples: ["Patient follow-up coordination", "Reminder and routine communication workflows", "Administrative care coordination", "Document non-clinical follow-up where appropriate"],
      ctaLabel: "Discuss coordination needs",
      ctaTo: "/book-consultation",
    },
    {
      id: "insurance-billing",
      title: "Insurance & Billing Support",
      description: "Help organize insurance and billing administration, including verification, documentation, referral coordination, and routine follow-up.",
      examples: ["Insurance verification support", "Billing-related administrative tasks", "Prior authorization follow-up", "Referral and claims workflow coordination"],
      ctaLabel: "Review billing support",
      ctaTo: "/book-consultation",
    },
    {
      id: "ehr-ai-automation",
      title: "EHR / Practice Workflow Support Through AI Automation",
      description: "Use responsible automation to help with repetitive administrative steps, document organization, reminders, and task routing while people remain in control.",
      examples: ["Administrative workflow organization", "Repetitive task reduction", "Documentation routing and workflow reminders", "AI-assisted process support without clinical decision-making"],
      ctaLabel: "Discuss workflow support",
      ctaTo: "/how-it-works",
    },
    {
      id: "remote-patient-monitoring",
      title: "Remote Patient Monitoring Support",
      description: "Help keep remote monitoring records, scheduled observations, follow-up reminders, and administrative alerts organized around the clinical team.",
      examples: ["Organize remote monitoring records", "Track scheduled observations", "Maintain follow-up reminders", "Support administrative workflow alerts for practice teams"],
      ctaLabel: "Discuss monitoring support",
      ctaTo: "/book-consultation",
    },
  ] satisfies ServiceCard[],
  benefits: [
    { title: "Less administrative friction", description: "Reduce the feeling that every routine task is competing for the same limited time and attention." },
    { title: "Clearer communication", description: "Keep day-to-day communication organized so the next step is easier to understand." },
    { title: "Flexible support", description: "Start with the responsibilities your team needs help with and adjust as those needs change." },
  ],
  whoWeServe: homeContent.whoWeServe.audiences,
  finalCta: {
    title: "Ready to find the right support category?",
    description: "Tell us what is creating bottlenecks in your practice and we’ll help you map the right support conversation.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Contact Medlink VA", to: "/contact" },
  },
} as const;
