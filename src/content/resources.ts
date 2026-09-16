export const resourcesContent = {
  hero: {
    eyebrow: "Resources",
    title: "Resources for Virtual Medical Assistants & Healthcare Teams",
    description:
      "Browse practical guides on Virtual Medical Assistant work, healthcare administration, career preparation, privacy, and remote support.",
    actions: [
      { label: "Explore Services", to: "/services", variant: "primary" as const },
      { label: "Book a Consultation", to: "/book-consultation", variant: "secondary" as const },
    ],
  },
  categories: [
    "VMA Training",
    "Healthcare Administration",
    "Career Development",
    "Practice Workflows",
    "Insurance & Billing",
    "AI & Automation",
    "Remote Patient Monitoring",
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

