export type LegalSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export const privacyContent = {
  hero: {
    eyebrow: "Privacy Policy",
    title: "A provisional privacy policy structure for review before launch",
    description:
      "This page is intentionally drafted as editable website copy rather than legal advice. Final legal review is recommended before publication.",
  },
  sections: [
    {
      title: "Information collected through forms",
      paragraphs: [
        "Forms on this site may collect contact details and business context that a visitor chooses to share.",
        "Public forms should remain focused on inquiries and consultation requests rather than sensitive patient information.",
      ],
    },
    {
      title: "Email and newsletter signup",
      paragraphs: [
        "If newsletter or lead-capture features are added later, email addresses and related preferences may be processed by the selected email service provider.",
      ],
    },
    {
      title: "Analytics and cookies",
      paragraphs: [
        "Analytics or cookie-based tools may be introduced later to understand site usage and improve the experience.",
      ],
    },
    {
      title: "Third-party service providers",
      paragraphs: [
        "The site may rely on third-party providers for hosting, email, analytics, content management, or other business functions in the future.",
      ],
    },
    {
      title: "External links",
      paragraphs: [
        "This website may include links to third-party pages. Those pages are governed by their own terms and privacy practices.",
      ],
    },
    {
      title: "Data retention",
      paragraphs: [
        "Retention periods should be defined with the client before launch and may depend on the final systems used to process submissions.",
      ],
    },
    {
      title: "Contact information",
      paragraphs: [
        "Questions about this provisional policy can be directed through the site’s contact page.",
      ],
    },
    {
      title: "Policy updates",
      paragraphs: [
        "This policy may be updated as the site’s forms, analytics, or third-party services change.",
      ],
    },
  ] satisfies readonly LegalSection[],
  note: "Final legal review is recommended before launch.",
} as const;

export const termsContent = {
  hero: {
    eyebrow: "Terms of Use",
    title: "A provisional terms page that stays editable until legal review is complete",
    description:
      "This page is a website-terms structure, not legal advice. It should be reviewed and finalized before launch.",
  },
  sections: [
    {
      title: "Website use",
      paragraphs: [
        "By using this website, visitors agree to use it for lawful and respectful purposes.",
      ],
    },
    {
      title: "Informational content",
      paragraphs: [
        "Content on this website is provided for general informational purposes and should not be treated as professional, legal, or clinical advice.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "Site content, branding, layout, and other materials may be protected by applicable intellectual property rights.",
      ],
    },
    {
      title: "External links",
      paragraphs: [
        "The website may reference external destinations that are controlled by third parties and may change without notice.",
      ],
    },
    {
      title: "Acceptable use",
      paragraphs: [
        "Visitors should avoid using the site in ways that could damage, disrupt, or misuse the experience for others.",
      ],
    },
    {
      title: "Service availability",
      paragraphs: [
        "The website and its future services may be updated, paused, or changed as the business evolves.",
      ],
    },
    {
      title: "Limitation language",
      paragraphs: [
        "Any limitation-of-liability or warranty language should be reviewed carefully before being finalized for publication.",
      ],
    },
    {
      title: "Changes to these terms",
      paragraphs: [
        "These terms may be revised as the website, content model, or client-approved policies change.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "Questions about these terms can be sent through the contact page.",
      ],
    },
  ] satisfies readonly LegalSection[],
  note: "Final legal review is required before launch.",
} as const;

