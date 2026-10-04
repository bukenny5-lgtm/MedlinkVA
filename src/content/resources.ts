export const resourcesContent = {
  hero: {
    eyebrow: "Resources",
    title: "Practical resources for Virtual Medical Assistants and healthcare teams",
    description:
      "Whether you are preparing for a career as a Virtual Medical Assistant, building confidence in healthcare administration, or looking for clearer ways to support a practice, these resources are designed to help you move forward. Explore practical guidance on training, career development, practice workflows, insurance and billing, AI and automation, and remote patient monitoring. Start with the topic that matches your next question, then use the guides to build a stronger understanding of the work, the expectations, and the people involved.",
    actions: [
      { label: "Browse Resources", to: "#resource-library", variant: "primary" as const },
      { label: "Explore Training", to: "/classes", variant: "secondary" as const },
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

