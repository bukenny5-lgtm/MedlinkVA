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
    eyebrow: "Learn with purpose. Support better healthcare.",
    title: "Learn practical skills. Support better healthcare. Build meaningful opportunities.",
    description:
      "MedLink VA helps aspiring Virtual Medical Assistants build practical healthcare administrative skills and prepares them for the realities of remote support work. At the same time, we help healthcare practices connect with trained professionals who can support everyday administrative workflows and help keep routine work moving.",
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
      "Whether you are preparing for a Virtual Medical Assistant career or looking for reliable support for your healthcare practice, MedLink VA focuses on practical skills, clear communication, and responsible ways of working. Our training is grounded in real administrative workflows, while our support services are shaped around the way healthcare teams already work. We place value on professionalism, privacy-conscious working habits, continued learning, and support that feels practical rather than complicated.",
    image: clientAssets.supportPhoto,
    imageAlt: "Medlink VA team member providing virtual medical support on a laptop",
    bullets: [
      "Practical, hands-on preparation",
      "Support shaped around real healthcare workflows",
      "Clear communication and continued guidance",
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "From First Conversation to Ongoing Support",
    description:
      "We take time to understand your needs, agree on a practical starting point, and keep the conversation clear as support develops.",
    steps: [
      {
        number: "01",
        title: "Discover",
        description: "We start by understanding where your team is feeling pressure and which areas of the workflow may need additional support.",
      },
      {
        number: "02",
        title: "Understand Your Needs",
        description: "We talk through your priorities, systems, communication style, and the responsibilities you want help with.",
      },
      {
        number: "03",
        title: "Match the Right Support",
        description: "Together, we identify the kind of Virtual Medical Assistant support that best fits your practice and the work you want to delegate.",
      },
      {
        number: "04",
        title: "Onboard",
        description: "Clear responsibilities, communication channels, and workflow expectations are agreed before support begins.",
      },
      {
        number: "05",
        title: "Deliver",
        description: "The Virtual Medical Assistant begins supporting the agreed administrative tasks while working within your existing systems and processes.",
      },
      {
        number: "06",
        title: "Review & Improve",
        description: "Regular feedback helps responsibilities and workflows develop as the practice’s needs change.",
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
        description: "Helpful virtual support for scheduling, patient coordination, and routine follow-up.",
      },
      {
        title: "Mental Health Providers",
        description: "Professional help with scheduling, intake, communication, and routine follow-up.",
      },
      {
        title: "Specialists",
        description: "Support for referrals, records, scheduling, and follow-up in specialist practices.",
      },
      {
        title: "Telehealth Providers",
        description: "Help with the scheduling, preparation, and follow-up behind virtual visits.",
      },
      {
        title: "Healthcare Organizations",
        description: "Remote help for teams coordinating work across locations, systems, and schedules.",
      },
    ] satisfies AudienceCard[],
  },
  teamSupport: {
    eyebrow: "Healthcare Support Team",
    title: "A healthcare support team built to help you work smarter",
    description:
      "Behind every well-organized practice is a team that communicates clearly, follows through on responsibilities, and keeps routine work moving. MedLink VA provides trained remote support professionals who can work around your practice priorities, communicate professionally with your team, and provide flexible administrative support where it is needed most. The goal is not to replace the people already doing the work, but to give them additional support so the practice can stay organized and focused on what matters.",
    image: clientAssets.teamPhoto,
    imageAlt: "Medlink VA team collaborating on laptops in a healthcare support setting",
    bullets: [],
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
      "Our Virtual Medical Assistant training focuses on the practical side of remote healthcare support. Learners build familiarity with healthcare administrative workflows, professional communication, organized task handling, privacy-conscious working habits, and the day-to-day responsibilities that help practices run more smoothly. The aim is to help learners understand not only what tasks to complete, but how to work responsibly and confidently within a healthcare team.",
    concepts: [] satisfies string[],
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
    title: "Practical resources for learners and healthcare teams",
    description:
      "Explore clear, practical guides designed to help aspiring Virtual Medical Assistants understand the work, prepare for opportunities, and build stronger professional habits. Healthcare practices can also find useful information on administrative workflows, hiring, privacy awareness, patient coordination, and remote support.",
    concepts: [] satisfies string[],
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
