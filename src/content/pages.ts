export type PageAction = {
  label: string;
  to: string;
  variant?: "primary" | "secondary";
};

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: readonly string[];
  actions?: readonly PageAction[];
};

export const pageContent = {
  services: {
    eyebrow: "Services",
    title: "Virtual healthcare administrative support",
    description:
      "Explore practical remote support for the administrative work that keeps healthcare teams organized and responsive.",
    bullets: [
      "Support can be shaped around your practice priorities.",
      "Clear communication helps keep day-to-day coordination moving.",
      "Start with a conversation about the work you want to strengthen.",
    ],
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" },
      { label: "How It Works", to: "/how-it-works", variant: "secondary" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Practical support for modern healthcare work",
    description:
      "MedLink VA brings together Virtual Medical Assistant training and thoughtful remote administrative support.",
    bullets: [
      "Training emphasizes practical skills and responsible working habits.",
      "Support is grounded in clear expectations and professional communication.",
      "Our approach keeps learning and day-to-day work connected to real priorities.",
    ],
    actions: [
      { label: "Contact Us", to: "/contact", variant: "primary" },
      { label: "View Resources", to: "/resources", variant: "secondary" },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "A clear path to training or support",
    description:
      "Share your goals, discuss the right next step, and move forward with clear communication.",
    bullets: [
      "Start with your learning goals or practice priorities.",
      "Discuss the workflows, support, or training focus that matters most.",
      "Agree on clear next steps that fit the conversation.",
    ],
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  jobs: {
    eyebrow: "Jobs",
    title: "No current openings",
    description:
      "There are no current job opportunities at MedLink VA. Please check back for future openings.",
    bullets: [
      "Please check back for future opportunities.",
      "In the meantime, explore Virtual Medical Assistant training.",
      "Contact us with a general question about MedLink VA.",
    ],
    actions: [
      { label: "Contact Us", to: "/contact", variant: "primary" },
      { label: "About", to: "/about", variant: "secondary" },
    ],
  },
  classes: {
    eyebrow: "Classes",
    title: "Virtual Medical Assistant training",
    description:
      "Build practical skills for healthcare administrative work through focused learning opportunities.",
    bullets: [
      "Explore healthcare operations and virtual assistance.",
      "Strengthen communication and organized workflow habits.",
      "Review available learning opportunities and updates.",
    ],
    actions: [
      { label: "Resources", to: "/resources", variant: "primary" },
      { label: "Book a Consultation", to: "/book-consultation", variant: "secondary" },
    ],
  },
  resources: {
    eyebrow: "Resources",
    title: "Healthcare administration resources",
    description:
      "Find helpful updates for Virtual Medical Assistants and healthcare teams.",
    bullets: [
      "Explore practical topics in healthcare administration.",
      "Keep learning about communication and virtual support.",
      "Return for new articles and useful updates.",
    ],
    actions: [
      { label: "Services", to: "/services", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  products: {
    eyebrow: "Products",
    title: "Tools for learning and everyday work",
    description:
      "Explore selected external tools and product information relevant to learning and everyday work.",
    bullets: [
      "External destinations are labeled clearly before you leave the site.",
      "External destinations should open with clear labeling.",
      "The route stays lightweight so the site remains focused on lead generation.",
    ],
    actions: [
      { label: "View Resources", to: "/resources", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s start a conversation",
    description:
      "Tell us about your learning goals or the administrative support your practice needs.",
    bullets: [
      "Public forms should stay minimal and avoid sensitive health details.",
      "Share business contact details rather than sensitive patient information.",
      "We will use your message to understand the right next step.",
    ],
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" },
      { label: "Privacy Policy", to: "/privacy", variant: "secondary" },
    ],
  },
  bookConsultation: {
    eyebrow: "Consultation",
    title: "Book a Consultation",
    description:
      "Book time to discuss Virtual Medical Assistant training or remote healthcare administrative support.",
    bullets: [
      "Share your goals and the type of support you want to explore.",
      "Keep your message focused on business and learning needs.",
      "We will follow up with clear next steps.",
    ],
    actions: [
      { label: "Contact Us", to: "/contact", variant: "primary" },
      { label: "Services", to: "/services", variant: "secondary" },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy at MedLink VA",
    description:
      "Review information about website use, contact forms, and newsletter signups.",
    bullets: [
      "Sensitive intake language should remain out of public forms.",
      "Contact us if you have a question about how information is handled.",
    ],
    actions: [
      { label: "Terms", to: "/terms", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms of Use",
    description:
      "Review the terms that apply when using the MedLink VA website.",
    bullets: [
      "These terms may be updated as the website and services change.",
      "Contact us if you have a question about these terms.",
    ],
    actions: [
      { label: "Privacy Policy", to: "/privacy", variant: "primary" },
      { label: "Home", to: "/", variant: "secondary" },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    description:
      "The page you requested could not be found. Use the links below to continue exploring MedLink VA.",
    bullets: [
      "Use the navigation to return to a live page.",
      "Use the navigation to continue exploring MedLink VA.",
      "Contact us if you need help finding a page.",
    ],
    actions: [
      { label: "Home", to: "/", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
} as const;

