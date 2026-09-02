export const productsContent = {
  hero: {
    eyebrow: "Products",
    title: "External products can be featured here without turning the site into a storefront",
    description:
      "The client’s external sales link is not yet configured in the codebase, so this page stays ready for content without inventing products or prices.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "Contact Medlink VA", to: "/contact", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No products are configured yet.",
    description:
      "Once an approved product or external store link is provided, the page can display cards that link out securely with clear disclosure.",
  },
  futureFields: [
    "product name",
    "short description",
    "image",
    "optional price",
    "external URL",
    "CTA label",
  ],
  disclosure:
    "External product links should use clear labeling, open in a new tab when appropriate, and keep rel security attributes in place.",
  cta: {
    title: "Need to feature a product later?",
    description:
      "The layout is already prepared for future product cards and external destinations once the client confirms the final sales link.",
    primaryAction: { label: "Contact Medlink VA", to: "/contact" },
    secondaryAction: { label: "View Resources", to: "/resources" },
  },
} as const;

