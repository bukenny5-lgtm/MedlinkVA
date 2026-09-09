export type NavigationItem = {
  label: string;
  path: string;
};

export type RouteSummary = {
  label: string;
  path: string;
  description: string;
};

export const siteContent = {
  brandName: "Medlink VA",
  brandTagline: "Virtual Medical Assistant Training & Support",
  primaryCtaLabel: "Book a Consultation",
  secondaryCtaLabel: "Explore Services",
  contactEmail: "info@medlinkva.com",
  phone: "+256 785 724 420",
  whatsappUrl: "https://wa.me/256785724420?text=Hello%20MedLink%20VA%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20training%20and%20services.",
  // Keep the Jobs route and CMS records while recruitment is paused.
  jobsPaused: true,
  navigation: [
    { label: "Home", path: "/" },
    { label: "Training", path: "/classes" },
    { label: "Services", path: "/services" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Resources", path: "/resources" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ] satisfies NavigationItem[],
  footerNavigation: [
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
  ] satisfies NavigationItem[],
  routeSummaries: [
    {
      label: "Services",
      path: "/services",
      description: "Practical remote administrative support for healthcare practices and teams.",
    },
    {
      label: "About",
      path: "/about",
      description: "A neutral company overview page that will hold approved business story content later.",
    },
    {
      label: "How It Works",
      path: "/how-it-works",
      description: "A simple process page to explain the consultation and onboarding flow.",
    },
    {
      label: "Jobs",
      path: "/jobs",
      description: "A future jobs section for open roles and hiring updates.",
    },
    {
      label: "Classes",
      path: "/classes",
      description: "A future classes section for educational offerings and registrations.",
    },
    {
      label: "Resources",
      path: "/resources",
      description: "A future blog and resources area for SEO-supporting content.",
    },
    {
      label: "Products",
      path: "/products",
      description: "A future product-links section for external offerings.",
    },
    {
      label: "Contact",
      path: "/contact",
      description: "A dedicated contact page for consultation and business inquiries.",
    },
  ] satisfies RouteSummary[],
} as const;


