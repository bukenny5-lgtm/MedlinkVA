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
      "From first patient contact to ongoing administrative coordination, MedLink VA provides remote support designed to reduce bottlenecks, improve responsiveness, and help your practice operate more efficiently.",
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
      description: "Keep everyday front-office operations organized with remote support for scheduling, calendar coordination, administrative follow-through, and routine practice workflows.",
      examples: ["Appointment scheduling and calendar coordination", "Routine administrative and front-desk workflows", "Patient-facing administrative coordination", "Follow-up scheduling where appropriate"],
      ctaLabel: "Discuss front-desk support",
      ctaTo: "/book-consultation",
    },
    {
      id: "virtual-medical-reception",
      title: "Virtual Medical Reception",
      description: "Create a professional first point of contact for routine patient enquiries, message routing, appointment coordination, and remote reception support.",
      examples: ["Handle routine patient enquiries", "Route messages to the right practice contact", "Coordinate appointments and basic updates", "Support a professional remote reception presence"],
      ctaLabel: "Review reception support",
      ctaTo: "/contact",
    },
    {
      id: "patient-care-coordination",
      title: "Patient Care & Coordination Support",
      description: "Support the administrative side of patient follow-up, reminders, routine communication, and coordination between patients and practice teams.",
      examples: ["Patient follow-up coordination", "Reminder and routine communication workflows", "Administrative care coordination", "Document non-clinical follow-up where appropriate"],
      ctaLabel: "Discuss coordination needs",
      ctaTo: "/book-consultation",
    },
    {
      id: "insurance-billing",
      title: "Insurance & Billing Support",
      description: "Support insurance and billing-related administration with organized follow-up, referral coordination, and clearer back-office workflows.",
      examples: ["Insurance verification support", "Billing-related administrative tasks", "Prior authorization follow-up", "Referral and claims workflow coordination"],
      ctaLabel: "Review billing support",
      ctaTo: "/book-consultation",
    },
    {
      id: "ehr-ai-automation",
      title: "EHR / Practice Workflow Support Through AI Automation",
      description: "Use AI-assisted administrative workflows to organize repetitive practice processes, route documentation, manage reminders, and support data-entry workflows.",
      examples: ["Administrative workflow organization", "Repetitive task reduction", "Documentation routing and workflow reminders", "AI-assisted process support without clinical decision-making"],
      ctaLabel: "Discuss workflow support",
      ctaTo: "/how-it-works",
    },
    {
      id: "remote-patient-monitoring",
      title: "Remote Patient Monitoring Support",
      description: "Support ongoing care coordination by keeping monitoring records organized, tracking scheduled observations, maintaining follow-up reminders, and helping practice teams manage workflow alerts for patients living with chronic conditions such as diabetes and hypertension.",
      examples: ["Organize remote monitoring records", "Track scheduled observations", "Maintain follow-up reminders", "Support administrative workflow alerts for practice teams"],
      ctaLabel: "Discuss monitoring support",
      ctaTo: "/book-consultation",
    },
  ] satisfies ServiceCard[],
  benefits: [
    { title: "Less administrative friction", description: "Reduce the feeling that every routine task is competing for the same limited time and attention." },
    { title: "Clearer communication", description: "Keep day-to-day communication organized so the next step is easier to understand." },
    { title: "Flexible support structure", description: "Use a support model that can grow with your needs instead of forcing a rigid setup." },
  ],
  whoWeServe: homeContent.whoWeServe.audiences,
  finalCta: {
    title: "Ready to find the right support category?",
    description: "Tell us what is creating bottlenecks in your practice and we’ll help you map the right support conversation.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Contact Medlink VA", to: "/contact" },
  },
} as const;
