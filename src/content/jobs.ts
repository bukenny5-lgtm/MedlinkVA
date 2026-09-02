export const jobsContent = {
  hero: {
    eyebrow: "Jobs",
    title: "Careers and opportunities will appear here when real openings are ready",
    description:
      "This page is deliberately empty until an approved job record exists. It remains polished, CMS-ready, and honest about the current status.",
    actions: [
      { label: "Contact Medlink VA", to: "/contact", variant: "primary" as const },
      { label: "About the Team", to: "/about", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No current opportunities are published at the moment.",
    description:
      "Check back for future openings. When listings are added, this page can display job-specific details without changing the layout.",
  },
  whyWorkWithUs: [
    {
      title: "A structure that can scale",
      description:
        "The jobs area is designed so future listings can be added as structured content instead of one-off page edits.",
    },
    {
      title: "Professional presentation",
      description:
        "Openings can be shown in a calm, readable format that matches the rest of the site.",
    },
    {
      title: "Honest placeholder behavior",
      description:
        "The page does not invent vacancies or create the impression that a role is currently open when it is not.",
    },
  ],
  futureFields: [
    "title",
    "location",
    "employment type",
    "short description",
    "closing date",
    "application link",
    "status",
  ],
  interestCta: {
    title: "Want to be notified when opportunities are published?",
    description:
      "A future email-interest workflow can be added later. For now, the contact page is the safest way to express interest.",
    primaryAction: { label: "Contact Medlink VA", to: "/contact" },
    secondaryAction: { label: "Book a Consultation", to: "/book-consultation" },
  },
} as const;

