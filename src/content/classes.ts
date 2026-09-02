export const classesContent = {
  hero: {
    eyebrow: "Classes",
    title: "Training and classes will be added here when approved content is ready",
    description:
      "This landing page is structured for future class promotions without inventing dates, prices, instructors, or enrollment details.",
    actions: [
      { label: "Stay in Touch", to: "/contact", variant: "primary" as const },
      { label: "View Resources", to: "/resources", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No classes are scheduled right now.",
    description:
      "The page will stay polished until a real class record exists. That keeps the site accurate while still preserving the layout for later use.",
  },
  introduction: [
    {
      title: "Built for future workshops",
      description:
        "The layout can support educational posts, live classes, or repeatable training announcements later.",
    },
    {
      title: "CMS-ready by design",
      description:
        "Future class content can be entered as structured records rather than copied into the page by hand.",
    },
    {
      title: "No unsupported class details",
      description:
        "The page avoids inventing schedules, pricing, or instructors until the client provides approved data.",
    },
  ],
  futureFields: [
    "class title",
    "short description",
    "instructor",
    "date",
    "duration",
    "price",
    "registration link",
    "status",
  ],
  stayInTouch: {
    title: "Want classes to be added later?",
    description:
      "Use the contact page for now if you want to keep the conversation open for future educational offerings.",
    primaryAction: { label: "Contact Medlink VA", to: "/contact" },
    secondaryAction: { label: "Book a Consultation", to: "/book-consultation" },
  },
} as const;

