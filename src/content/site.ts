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
  brandTagline: "Virtual medical assistant support for growing practices",
  primaryCtaLabel: "Book a Free Consultation",
  secondaryCtaLabel: "Explore Our Services",
  contactEmail: "hello@medlinkva.com", // Provisional placeholder until the client confirms the final public inbox.
  navigation: [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Resources", path: "/resources" },
    { label: "Jobs", path: "/jobs" },
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
      description: "A placeholder foundation for the approved service library and SEO pages.",
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


