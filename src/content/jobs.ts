export const jobsContent = {
  hero: {
    eyebrow: "Jobs",
    title: "No current openings",
    description:
      "There are no current job opportunities at MedLink VA. Please check back for future openings.",
    actions: [
      { label: "Contact Medlink VA", to: "/contact", variant: "primary" as const },
      { label: "Explore Training", to: "/classes", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No current opportunities are published at the moment.",
    description:
      "In the meantime, explore our training or get in touch with a general question.",
  },
  whyWorkWithUs: [
    {
      title: "A structure that can scale",
      description:
        "When opportunities become available, they will be shared clearly on this page.",
    },
    {
      title: "Professional presentation",
      description:
        "Openings can be shown in a calm, readable format that matches the rest of the site.",
    },
    {
      title: "Clear opportunity updates",
      description:
        "We will not suggest that a role is open unless a current opportunity has been published.",
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
    title: "Keep developing your skills",
    description:
      "Explore Virtual Medical Assistant training and contact us about your learning goals.",
    primaryAction: { label: "Contact Medlink VA", to: "/contact" },
    secondaryAction: { label: "Explore Training", to: "/classes" },
  },
} as const;

