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
    title: "Remote support that helps your practice stay organized",
    description:
      "Running a healthcare practice means keeping up with appointments, patient communication, follow-up, documentation, and many small administrative tasks throughout the day. MedLink VA provides trained remote support professionals who can take on clearly defined administrative responsibilities and help your team keep routine work moving.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "How It Works", to: "/how-it-works", variant: "secondary" as const },
    ],
    chips: [
      { label: "Administrative Support", to: "/services/administrative-front-desk" },
      { label: "Patient Communication", to: "/services/virtual-medical-reception" },
      { label: "Workflow Support", to: "/services/ehr-workflow-ai-automation" },
    ],
  },
  services: [
    {
      id: "administrative-front-desk",
      title: "Administrative & Front Desk Support",
      description: "A busy front desk has appointments to coordinate, messages to respond to, reminders to send, and routine follow-up that needs attention throughout the day. A MedLink VA Virtual Medical Assistant can help keep these administrative tasks organized while working within the systems your team already uses.",
      examples: ["Scheduling", "Patient reminders", "Administrative follow-up"],
      ctaLabel: "Explore front-desk support →",
      ctaTo: "/services/administrative-front-desk",
    },
    {
      id: "virtual-medical-reception",
      title: "Virtual Medical Reception",
      description: "Patient communication often begins before someone ever arrives at the practice. Our Virtual Medical Assistants can help manage routine calls, messages, appointment requests, and front-line communication so enquiries are handled more consistently.",
      examples: ["Routine enquiries", "Appointment coordination", "Message routing"],
      ctaLabel: "Explore reception support →",
      ctaTo: "/services/virtual-medical-reception",
    },
    {
      id: "patient-care-coordination",
      title: "Patient Care & Coordination Support",
      description: "Keeping patients informed often involves reminders, referrals, follow-up, and communication between different parts of the practice. A Virtual Medical Assistant can help organize these non-clinical coordination tasks so fewer routine steps are left behind.",
      examples: ["Patient follow-up", "Referral coordination", "Administrative care coordination"],
      ctaLabel: "Explore coordination support →",
      ctaTo: "/services/patient-care-coordination",
    },
    {
      id: "insurance-billing",
      title: "Insurance & Billing Support",
      description: "Insurance administration can involve repeated verification, documentation, authorization follow-up, and communication. MedLink VA can help with clearly defined administrative parts of these workflows while your practice retains control of billing and clinical decisions.",
      examples: ["Insurance verification", "Authorization follow-up", "Billing administration"],
      ctaLabel: "Explore insurance & billing support →",
      ctaTo: "/services/insurance-billing",
    },
    {
      id: "ehr-ai-automation",
      title: "EHR / Practice Workflow Support Through AI Automation",
      description: "Repetitive administrative work can take up a surprising amount of time. MedLink VA can help organize digital workflows, reminders, documentation routing, routine data tasks, and carefully selected automation while keeping human review and privacy at the centre of the process.",
      examples: ["Workflow organization", "Task automation", "Documentation routing"],
      ctaLabel: "Explore workflow support →",
      ctaTo: "/services/ehr-workflow-ai-automation",
    },
    {
      id: "remote-patient-monitoring",
      title: "Remote Patient Monitoring Support",
      description: "Remote Patient Monitoring also creates administrative work behind the scenes. Virtual Medical Assistants can help organize reminders, records, follow-up tasks, documentation, and information routing while clinical interpretation remains with the healthcare team.",
      examples: ["Record organization", "Follow-up reminders", "Administrative RPM coordination"],
      ctaLabel: "Explore monitoring support →",
      ctaTo: "/services/remote-patient-monitoring",
    },
  ] satisfies ServiceCard[],
  benefits: [
    { title: "Take some pressure off the administrative workload", description: "Routine scheduling, follow-up, messages, documentation and coordination can quickly compete for the same limited time. Clearly delegated remote support can help keep those responsibilities moving without leaving everything with the in-practice team." },
    { title: "Keep communication easier to follow", description: "When routine messages, appointments, follow-up and hand-offs are organized consistently, it becomes easier for the team to understand what has been handled and what still needs attention." },
    { title: "Support that can grow with your needs", description: "You do not have to delegate everything at once. A practice can start with a clearly defined group of responsibilities and adjust the support as workflows, priorities and team needs change." },
  ],
  whoWeServe: [
    { title: "Family Medicine Practices", slug: "family-medicine", description: "Support for busy family medicine teams managing appointments, patient communication, referrals, follow-up, documentation and everyday administrative coordination." },
    { title: "Dental Practices", slug: "dental-practices", description: "Remote administrative support for scheduling, patient reminders, recall follow-up, insurance-related tasks and the routine work that keeps a dental front desk organized." },
    { title: "Mental Health Providers", slug: "mental-health", description: "Privacy-conscious administrative help with scheduling, intake, reminders, routine communication and follow-up, while clinical responsibilities remain with the provider." },
    { title: "Specialists", slug: "specialists", description: "Support for specialist practices managing referrals, records, scheduling, follow-up and the administrative communication that keeps patient journeys organized." },
    { title: "Telehealth Providers", slug: "telehealth", description: "Remote support for virtual-care teams managing scheduling, intake, reminders, preparation and follow-up around telehealth appointments." },
    { title: "Healthcare Organizations", slug: "healthcare-organizations", description: "Flexible administrative support for healthcare organizations coordinating work across teams, locations, systems, schedules and communication channels." },
  ],
  finalCta: {
    title: "Not sure where a Virtual Medical Assistant would fit into your practice?",
    description: "You do not need to have every responsibility worked out before speaking with us. Tell us which parts of the day are taking the most time, creating backlogs, or putting pressure on your team. We can talk through your current workflow and help you identify where trained remote administrative support may be useful.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Talk to MedLink VA", to: "/contact" },
  },
} as const;
