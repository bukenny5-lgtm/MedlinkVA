export const resourcesContent = {
  hero: {
    eyebrow: "Resources",
    title: "Ideas for healthcare administration and virtual support",
    description:
      "Find resource updates for Virtual Medical Assistants and healthcare teams interested in organized, thoughtful administrative work.",
    actions: [
      { label: "Explore Services", to: "/services", variant: "primary" as const },
      { label: "Book a Consultation", to: "/book-consultation", variant: "secondary" as const },
    ],
  },
  categories: [
    "Healthcare Operations",
    "Virtual Assistance",
    "Practice Efficiency",
    "Administrative Workflows",
    "Career & Training Resources",
  ],
  editorialNote:
    "Have a topic in mind? Contact us with your questions.",
  emptyState: {
    title: "Resources are coming soon.",
    description:
      "Check back for articles on healthcare administration, virtual support, and practical learning.",
  },
  futurePostFields: [
    "title",
    "slug",
    "excerpt",
    "cover image",
    "category",
    "author",
    "publish date",
    "body",
    "SEO metadata",
  ],
  routeNote:
    "If future article detail routes are added, they should be documented in the architecture plan before implementation.",
} as const;

