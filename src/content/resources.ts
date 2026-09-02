export const resourcesContent = {
  hero: {
    eyebrow: "Resources",
    title: "A future knowledge hub for healthcare operations and virtual support",
    description:
      "This page is structured for SEO growth and education, while remaining honest that no editorial articles are being published yet.",
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
    "Future Sanity posts can populate this page later without redesigning the layout or changing the route structure.",
  emptyState: {
    title: "Resources are coming soon.",
    description:
      "The page remains intentionally empty until approved articles or posts are available. That keeps the site trustworthy and CMS-ready at the same time.",
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

