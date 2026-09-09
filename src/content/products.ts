export const productsContent = {
  hero: {
    eyebrow: "Products",
    title: "Products for learning and everyday work",
    description:
      "Browse available product links and updates from MedLink VA.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "Contact Medlink VA", to: "/contact", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No products are listed at the moment.",
    description:
      "Check back for product updates or contact us with a question.",
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
    "Product links take you to an external website where you can review details and purchase terms.",
  cta: {
    title: "Have a product question?",
    description:
      "Get in touch to ask about available products and learning resources.",
    primaryAction: { label: "Contact Medlink VA", to: "/contact" },
    secondaryAction: { label: "View Resources", to: "/resources" },
  },
} as const;

