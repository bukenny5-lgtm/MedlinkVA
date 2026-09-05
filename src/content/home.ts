import { clientAssets } from "../lib/assets";
import { teamMembers } from "./team";

export type HomeSectionLink = {
  label: string;
  to: string;
};

export type ValueCard = {
  title: string;
  description: string;
};

export type ServiceCard = {
  title: string;
  description: string;
};

export type StepCard = {
  number: string;
  title: string;
  description: string;
};

export type AudienceCard = {
  title: string;
  description: string;
};

export const homeContent = {
  hero: {
    eyebrow: "Healthcare support, made more manageable",
    title: "Reliable Virtual Support for Modern Healthcare",
    description:
      "Medlink VA helps healthcare professionals reduce administrative workload, improve day-to-day coordination, and create more time to focus on patient care.",
    primaryCta: { label: "Book a Free Consultation", to: "/book-consultation" },
    secondaryCta: { label: "Explore Our Services", to: "/services" },
    image: clientAssets.hero,
    imageAlt: "Virtual medical professional wearing a headset and working on a laptop",
    supportLine: [
      "Healthcare-focused support",
      "Flexible assistance",
      "Professional service",
    ],
  },
  trustStrip: [
    {
      title: "Healthcare-focused support",
      description: "Clear positioning for practices that want organized administrative help.",
    },
    {
      title: "Flexible virtual assistance",
      description: "Support that can adapt to evolving practice needs and daily workloads.",
    },
    {
      title: "Professional communication",
      description: "A polished presence that helps keep routine coordination moving smoothly.",
    },
    {
      title: "Administrative efficiency",
      description: "A practical foundation for saving time and reducing avoidable friction.",
    },
  ] satisfies ValueCard[],
  services: [
    {
      title: "Appointment Scheduling",
      description: "Coordinate calendars, reminders, and routine updates so scheduling stays organized.",
    },
    {
      title: "Virtual Medical Reception",
      description: "Create a polished remote front-desk experience for calls and basic inquiries.",
    },
    {
      title: "Patient Communication Support",
      description: "Help route messages, follow up on non-clinical communication, and keep updates moving.",
    },
    {
      title: "Administrative Support",
      description: "Support everyday administrative workflows, documentation handoff, and internal organization.",
    },
    {
      title: "Insurance & Billing Support",
      description: "Assist with billing-related administration, claims follow-up coordination, and account support.",
    },
    {
      title: "EHR / Practice Workflow Support",
      description: "Help keep routine practice processes organized and easier to manage.",
    },
  ] satisfies ServiceCard[],
  whyMedlink: {
    eyebrow: "Why Medlink VA",
    title: "Support that helps practices stay organized",
    description:
      "The right virtual support can reduce administrative friction, improve responsiveness, and make day-to-day workflows easier to manage.",
    image: clientAssets.supportPhoto,
    imageAlt: "Medlink VA team member providing virtual medical support on a laptop",
    bullets: [
      "Reduce administrative burden",
      "Improve responsiveness",
      "Support everyday workflows",
      "Stay flexible with remote assistance",
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "A straightforward process that keeps communication clear",
    description:
      "The flow is designed to stay simple, professional, and easy to understand for new visitors.",
    steps: [
      {
        number: "01",
        title: "Tell Us What You Need",
        description: "Share the general support areas you would like to improve.",
      },
      {
        number: "02",
        title: "Define Your Support Needs",
        description: "Outline the tasks, priorities, and level of assistance you are seeking.",
      },
      {
        number: "03",
        title: "Begin Your Workflow",
        description: "Start with a support plan that fits the current stage of your practice.",
      },
      {
        number: "04",
        title: "Grow With Ongoing Support",
        description: "Adjust the support as your operational needs evolve over time.",
      },
    ] satisfies StepCard[],
  },
  whoWeServe: {
    eyebrow: "Who We Serve",
    title: "Built for a wide range of healthcare teams",
    description:
      "The site should speak to a broad audience of healthcare professionals and support organizations.",
    audiences: [
      {
        title: "Medical Practices",
        description: "Support for busy practice environments that need administrative structure.",
      },
      {
        title: "Dental Practices",
        description: "Helpful virtual support for scheduling, coordination, and routine tasks.",
      },
      {
        title: "Mental Health Providers",
        description: "Professional assistance for organized communication and administrative flow.",
      },
      {
        title: "Specialists",
        description: "A flexible support layer for practices with focused operational needs.",
      },
      {
        title: "Telehealth Providers",
        description: "Support designed for remote-first or hybrid healthcare delivery models.",
      },
      {
        title: "Healthcare Organizations",
        description: "A practical option for teams looking to streamline everyday work.",
      },
    ] satisfies AudienceCard[],
  },
  teamSupport: {
    eyebrow: "Healthcare Support Team",
    title: "A healthcare support team built to help you work smarter",
    description:
      "Medlink VA is structured to present a professional team model without overpromising or inventing details that have not been supplied.",
    image: clientAssets.teamPhoto,
    imageAlt: "Medlink VA team collaborating on laptops in a healthcare support setting",
    bullets: [
      "General support model for growing practices",
      "Professional communication and coordination",
      "Flexible remote support approach",
    ],
  },
  teamPreview: {
    eyebrow: "Meet the Team",
    title: "Meet some of the people helping shape Medlink VA",
    description:
      "The team preview should feel polished, factual, and ready for future CMS management.",
    cta: { label: "Learn More About Us", to: "/about" },
  },
  classesPreview: {
    eyebrow: "Classes",
    title: "Upcoming learning opportunities will appear here",
    description:
      "This area is reserved for future classes, workshops, and educational content.",
    concepts: [
      "Healthcare Operations",
      "Virtual Assistance",
      "Practice Efficiency",
    ] satisfies string[],
    cta: { label: "Explore Classes", to: "/classes" },
  },
  jobsPreview: {
    eyebrow: "Jobs",
    title: "Current opportunities will appear here",
    description:
      "This section is ready for future role listings and hiring updates.",
    cta: { label: "View Opportunities", to: "/jobs" },
  },
  productsPreview: {
    eyebrow: "Products",
    title: "External product links can be introduced here later",
    description:
      "This section is ready to point to approved external product pages without turning the site into a store.",
    concepts: ["Product showcase", "Helpful tools", "External links"] satisfies string[],
    cta: { label: "View Products", to: "/products" },
  },
  resourcesPreview: {
    eyebrow: "Resources",
    title: "Resources and blog content can grow from here",
    description:
      "A future editorial library can support SEO and answer common questions from visitors.",
    concepts: ["Healthcare Operations", "Virtual Assistance", "Practice Efficiency"] satisfies string[],
    cta: { label: "Explore Resources", to: "/resources" },
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Stay in touch for updates and resources",
    description:
      "Join the newsletter to receive updates and resources through the secure Brevo-backed signup flow.",
    consent:
      "By sharing your email, you agree to receive occasional updates from Medlink VA. This preview form is not connected to email delivery yet.",
    placeholder: "Email address",
    cta: "Join the List",
    notice: "Your signup will be sent securely.",
  },
  finalCta: {
    title: "Spend Less Time on Administration. More Time on Care.",
    description: "Discover how Medlink VA can support your healthcare workflow.",
    cta: { label: "Book a Free Consultation", to: "/book-consultation" },
  },
  teamMembers,
} as const;
