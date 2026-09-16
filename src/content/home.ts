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
    eyebrow: "Learn with purpose. Support better care.",
    title: "Training Virtual Medical Assistants. Supporting Healthcare Practices. Creating Opportunities.",
    description:
      "MedLink VA equips aspiring Virtual Medical Assistants with practical healthcare administrative and clinical support skills, while helping healthcare practices connect with trained remote support professionals.",
    primaryCta: { label: "Explore Training", to: "/classes" },
    consultationCta: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryCta: { label: "Hire an MVA", to: "/hire-an-mva" },
    image: clientAssets.hero,
    imageAlt: "Virtual medical professional wearing a headset and working on a laptop",
    supportLine: [
      "Practical training",
      "Healthcare administration",
      "Personalized support",
    ],
  },
  trustStrip: [
    {
      title: "Integrity & Transparency",
      description: "Clear communication, responsible handling of work, and honest expectations from the beginning of every training or support engagement.",
    },
    {
      title: "Practical Healthcare Expertise",
      description: "Training and support stay connected to real healthcare administrative workflows and day-to-day practice needs.",
    },
    {
      title: "Personalized Support",
      description: "Guidance can align with a learner’s stage or a practice’s actual administrative priorities.",
    },
    {
      title: "Privacy & Confidentiality",
      description: "Training and administrative workflows are designed with confidentiality, responsible information handling, and privacy-conscious practices in mind.",
    },
  ] satisfies ValueCard[],
  services: [
    {
      title: "Administrative & Front Desk Support",
      description: "Keep scheduling, calendars, front-desk workflows, and administrative follow-through organized.",
    },
    {
      title: "Virtual Medical Reception",
      description: "Create a polished remote front-desk experience for calls and basic inquiries.",
    },
    {
      title: "Patient Care & Coordination Support",
      description: "Support non-clinical follow-up, reminders, routine communication, and practice coordination.",
    },
    {
      title: "Insurance & Billing Support",
      description: "Assist with insurance, billing-related administration, referrals, and organized workflow follow-up.",
    },
    {
      title: "EHR / Practice Workflow Support Through AI Automation",
      description: "Use AI-assisted administrative workflows to organize repetitive practice processes and reminders.",
    },
    {
      title: "Remote Patient Monitoring Support",
      description: "Keep monitoring records, scheduled observations, reminders, and workflow alerts organized for practice teams.",
    },
  ] satisfies ServiceCard[],
  whyMedlink: {
    eyebrow: "For learners & healthcare practices",
    title: "Why Choose MedLink VA",
    description:
      "Build practical skills or strengthen your practice with a human approach to healthcare administration. We put clear communication, responsible working habits, and your priorities at the center.",
    image: clientAssets.supportPhoto,
    imageAlt: "Medlink VA team member providing virtual medical support on a laptop",
    bullets: [
      "Practical, hands-on learning",
      "Structured healthcare administrative training",
      "Real-world workflow relevance",
      "Personalized support & continued guidance",
      "Integrity, transparency & reliable communication",
      "Privacy & confidentiality-minded working habits",
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "From First Conversation to Ongoing Support",
    description:
      "Share your practice priorities, discuss the right support, and agree on clear next steps together.",
    steps: [
      {
        number: "01",
        title: "Discover",
        description: "Explore the support areas that could help your practice move forward.",
      },
      {
        number: "02",
        title: "Understand Your Needs",
        description: "Clarify the workflows, priorities, and level of assistance you are seeking.",
      },
      {
        number: "03",
        title: "Match the Right Support",
        description: "Identify the service areas that best fit your practice priorities.",
      },
      {
        number: "04",
        title: "Onboard",
        description: "Agree communication and workflow setup before support begins.",
      },
      {
        number: "05",
        title: "Deliver",
        description: "Begin practical administrative support shaped around the agreed priorities.",
      },
      {
        number: "06",
        title: "Review & Improve",
        description: "Review how the arrangement is working and refine processes where useful.",
      },
    ] satisfies StepCard[],
  },
  whoWeServe: {
    eyebrow: "Who We Serve",
    title: "Built for a wide range of healthcare teams",
    description:
      "Explore administrative support for the way your healthcare team works, from daily scheduling to remote coordination.",
    audiences: [
      {
        title: "Family Medicine Practices",
        description: "Flexible administrative and workflow support for family medicine practices managing busy schedules, patient communication, coordination, and day-to-day operations.",
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
      "Keep the people behind your practice connected through thoughtful coordination, clear handoffs, and practical remote support.",
    image: clientAssets.teamPhoto,
    imageAlt: "Medlink VA team collaborating on laptops in a healthcare support setting",
    bullets: [
      "Support shaped around your practice priorities",
      "Professional communication and coordination",
      "Flexible remote support approach",
    ],
  },
  teamPreview: {
    eyebrow: "Meet the Team",
    title: "Meet some of the people helping shape Medlink VA",
    description:
      "Get to know the people behind our training and administrative support.",
    cta: { label: "Learn More About Us", to: "/about" },
  },
  classesPreview: {
    eyebrow: "Virtual Medical Assistant Training",
    title: "Build skills for healthcare administrative work",
    description:
      "Explore practical learning for aspiring and developing Virtual Medical Assistants, with an emphasis on organized workflows, communication, and responsible information handling.",
    concepts: [
      "Healthcare Operations",
      "Virtual Assistance",
      "Practice Efficiency",
    ] satisfies string[],
    cta: { label: "Explore Training", to: "/classes" },
  },
  jobsPreview: {
    eyebrow: "Jobs",
    title: "No current openings",
    description:
      "Check back for future opportunities with MedLink VA.",
    cta: { label: "Careers Updates", to: "/jobs" },
  },
  productsPreview: {
    eyebrow: "Products",
    title: "Tools for learning and everyday work",
    description:
      "Check our products page for available tools and product updates.",
    concepts: ["Product showcase", "Helpful tools", "External links"] satisfies string[],
    cta: { label: "View Products", to: "/products" },
  },
  resourcesPreview: {
    eyebrow: "Resources",
    title: "Keep learning about healthcare administration",
    description:
      "Explore resource updates for learners and healthcare teams, from communication to everyday administrative workflows.",
    concepts: ["Healthcare Operations", "Virtual Assistance", "Practice Efficiency"] satisfies string[],
    cta: { label: "Explore Resources", to: "/resources" },
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Stay in touch for updates and resources",
    description:
      "Join the newsletter for training news, practical resources, and updates from MedLink VA.",
    consent:
      "By sharing your email, you agree to receive occasional updates from MedLink VA.",
    placeholder: "Email address",
    cta: "Join the List",
    notice: "Your signup will be sent securely.",
  },
  finalCta: {
    title: "Your next step in healthcare training or support starts here.",
    description: "Tell us about your learning goals or the administrative support your practice needs.",
    cta: { label: "Book a Consultation", to: "/book-consultation" },
  },
  teamMembers,
} as const;
