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
    title: "Services foundation",
    description:
      "This route will later hold the approved service library, service detail pages, and SEO-focused content.",
    bullets: [
      "Each future service page can be edited through Sanity.",
      "Internal links will help visitors move from services to contact.",
      "The page is intentionally neutral until final business copy is approved.",
    ],
    actions: [
      { label: "Book a Free Consultation", to: "/book-consultation", variant: "primary" },
      { label: "How It Works", to: "/how-it-works", variant: "secondary" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "About foundation",
    description:
      "This page will eventually hold the approved story, team context, and brand positioning for Medlink VA.",
    bullets: [
      "No unsupported claims are included at this stage.",
      "Client-approved background content can be added later through CMS fields.",
      "The page remains concise so the structure can be reused safely.",
    ],
    actions: [
      { label: "Contact Us", to: "/contact", variant: "primary" },
      { label: "View Resources", to: "/resources", variant: "secondary" },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "How it works foundation",
    description:
      "This page will later explain the consultation, onboarding, and engagement process in approved language.",
    bullets: [
      "The structure is ready for a clear step-by-step flow.",
      "Process content can be added without changing the route design.",
      "It will support conversion without introducing unnecessary complexity.",
    ],
    actions: [
      { label: "Book a Free Consultation", to: "/book-consultation", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  jobs: {
    eyebrow: "Jobs",
    title: "Jobs foundation",
    description:
      "This section will later list open roles and hiring updates when the client is ready to publish them.",
    bullets: [
      "Job listings can be added as structured entries later.",
      "The foundation keeps the route ready without exposing draft content.",
      "Future SEO and structured data support can be layered in later.",
    ],
    actions: [
      { label: "Contact Us", to: "/contact", variant: "primary" },
      { label: "About", to: "/about", variant: "secondary" },
    ],
  },
  classes: {
    eyebrow: "Classes",
    title: "Classes foundation",
    description:
      "This page will later support class announcements, educational content, and registration links.",
    bullets: [
      "Classes can be structured for future editing in Sanity.",
      "The page is ready for class detail pages and promotional copy later.",
      "No program details are invented during this phase.",
    ],
    actions: [
      { label: "Resources", to: "/resources", variant: "primary" },
      { label: "Book a Free Consultation", to: "/book-consultation", variant: "secondary" },
    ],
  },
  resources: {
    eyebrow: "Resources",
    title: "Resources foundation",
    description:
      "This route will become the blog and resources library for SEO, education, and helpful updates.",
    bullets: [
      "Each article can later be modeled as structured CMS content.",
      "The route is ready for topic clusters and internal linking.",
      "The page currently serves as a stable placeholder only.",
    ],
    actions: [
      { label: "Services", to: "/services", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  products: {
    eyebrow: "Products",
    title: "Products foundation",
    description:
      "This route will later point to approved external product links without turning the site into a store.",
    bullets: [
      "Product links can be edited through Sanity later.",
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
    title: "Contact foundation",
    description:
      "This page will later handle consultation requests and business inquiries through a secure form flow.",
    bullets: [
      "Public forms should stay minimal and avoid sensitive health details.",
      "Brevo and edge-based handling will be added in a later phase.",
      "The current route confirms navigation and layout behavior only.",
    ],
    actions: [
      { label: "Book a Free Consultation", to: "/book-consultation", variant: "primary" },
      { label: "Privacy", to: "/privacy", variant: "secondary" },
    ],
  },
  bookConsultation: {
    eyebrow: "Consultation",
    title: "Consultation foundation",
    description:
      "This route will later host the consultation entry point and form experience.",
    bullets: [
      "The route exists so the primary CTA can resolve cleanly.",
      "A secure submission workflow will be added in a later phase.",
      "No form fields are introduced before the business rules are finalized.",
    ],
    actions: [
      { label: "Contact Us", to: "/contact", variant: "primary" },
      { label: "Services", to: "/services", variant: "secondary" },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy foundation",
    description:
      "This page will later hold the approved privacy policy copy and form guidance.",
    bullets: [
      "The policy text will be finalized with the client before launch.",
      "Sensitive intake language should remain out of public forms.",
      "This placeholder keeps the legal route in place for the site shell.",
    ],
    actions: [
      { label: "Terms", to: "/terms", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms foundation",
    description:
      "This page will later hold the approved terms of use copy for the public website.",
    bullets: [
      "The current route is intentionally minimal and neutral.",
      "Final terms should be reviewed before launch.",
      "The layout is ready for text-heavy legal content when needed.",
    ],
    actions: [
      { label: "Privacy", to: "/privacy", variant: "primary" },
      { label: "Home", to: "/", variant: "secondary" },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Page not found",
    description:
      "The page you requested does not exist yet or the route has changed during the foundation phase.",
    bullets: [
      "Use the navigation to return to a live page.",
      "The site shell is working and this route is intentionally safe.",
      "Future content can be added without changing the navigation structure.",
    ],
    actions: [
      { label: "Home", to: "/", variant: "primary" },
      { label: "Contact Us", to: "/contact", variant: "secondary" },
    ],
  },
} as const;

