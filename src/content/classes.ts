export const classesContent = {
  hero: {
    eyebrow: "Virtual Medical Assistant Training",
    title: "Build practical skills for healthcare administrative work",
    description:
      "Explore Virtual Medical Assistant training focused on everyday healthcare administration, clear communication, and responsible information handling.",
    actions: [
      { label: "Stay in Touch", to: "/contact", variant: "primary" as const },
      { label: "View Resources", to: "/resources", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No classes are scheduled right now.",
    description:
      "Contact us to ask about upcoming training and the right next step for your learning goals.",
  },
  introduction: [
    {
      title: "Practical learning",
      description:
        "Develop an understanding of the administrative tasks and communication habits that support healthcare teams.",
    },
    {
      title: "Structured healthcare workflows",
      description:
        "Connect your learning to organized scheduling, clear handoffs, and everyday practice coordination.",
    },
    {
      title: "Responsible working habits",
      description:
        "Build awareness of confidentiality and thoughtful information handling in healthcare administration.",
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
    title: "Find your next learning step",
    description:
      "Email or message us about your training interests and questions.",
    primaryAction: { label: "Contact Medlink VA", to: "/contact" },
    secondaryAction: { label: "Book a Consultation", to: "/book-consultation" },
  },
} as const;

