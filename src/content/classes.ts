export const classesContent = {
  hero: {
    eyebrow: "Virtual Medical Assistant Training",
    title: "Build practical skills for healthcare administrative work",
    description:
      "MedLink VA trains aspiring and developing Virtual Medical Assistants in practical healthcare administrative workflows for remote healthcare support roles.",
    actions: [
      { label: "Explore Programmes", to: "#programmes", variant: "primary" as const },
      { label: "Book a Consultation", to: "/book-consultation", variant: "secondary" as const },
    ],
  },
  emptyState: {
    title: "No classes are scheduled right now.",
    description:
      "Contact us to ask about upcoming training and the right next step for your learning goals.",
  },
  whyTrain: [
    {
      title: "Practical healthcare workflows",
      description:
        "Learn through the administrative tasks, communication habits, and workflow context that support healthcare teams.",
    },
    {
      title: "Guided learning pathways",
      description:
      "Choose a structured path with flexible formats, personalised guidance, and support as you learn.",
    },
    {
      title: "Responsible working habits",
      description:
        "Build privacy-conscious habits and clear expectations for remote healthcare administrative work.",
    },
  ],
  introduction: [],
  tiers: [
    {
      name: "Foundations",
      price: "$15",
      duration: "4 weeks",
      description: "A practical starting point for aspiring Virtual Medical Assistants.",
      delivery: ["On-demand video tutorials", "1-hour live session every week", "4 weeks total access", "Community Q&A support", "Certificate of completion"],
      badge: undefined,
      ctaLabel: "Enquire About This Programme",
    },
    {
      name: "Guided Path",
      price: "$25",
      duration: "6 weeks",
      description: "Individual guidance for learners who want structured feedback and support.",
      delivery: ["Individual 1-on-1 sessions", "2 hours per week for 6 weeks", "Free scheduling template included", "Personalised feedback", "Certificate of completion"],
      badge: undefined,
      ctaLabel: "Enquire About This Programme",
    },
    {
      name: "Full VMA Bootcamp",
      price: "$50",
      duration: "8 weeks",
      description: "An intensive path covering core VMA workflows and career preparation.",
      delivery: ["1-on-1 sessions", "4 hours per week for 8 weeks"],
      badge: "Most Popular",
      ctaLabel: "Enquire About This Programme",
    },
    {
      name: "Career Launchpad",
      price: "$100",
      duration: "Includes Full VMA Bootcamp",
      description: "Extended career preparation for learners pursuing remote healthcare roles.",
      delivery: ["How to land remote US healthcare roles", "LinkedIn optimisation for VMAs", "All 6 VMA template bundle included", "Job search strategy & portfolio review"],
      badge: undefined,
      ctaLabel: "Enquire About This Programme",
    },
    {
      name: "Team Training",
      price: "$300 – $500",
      duration: "Scope & duration by agreement",
      description: "Custom training for clinic VMAs or staff, shaped around team needs.",
      delivery: ["Price varies by team size & needs", "Skills audit & gap analysis included", "Flexible virtual or hybrid delivery", "Tailored curriculum to workflows", "HIPAA team compliance training", "Ongoing support & reporting"],
      badge: "Clinic & Enterprise",
      ctaLabel: "Book a Consultation",
    },
  ],
  topics: [
    { title: "Healthcare Administration", items: ["HIPAA training & compliance", "Appointment scheduling", "Patient communication & cold calling", "Medical documentation", "Prior authorisation & referral management"] },
    { title: "Insurance & Revenue Cycle", items: ["Insurance verification", "Medical billing & RPM", "Prior authorisation workflows"] },
    { title: "Digital Tools", items: ["Google Workspace for VMAs", "Workflow organisation", "EHR-adjacent administrative processes"] },
    { title: "Career Development", items: ["Resume writing", "LinkedIn optimisation for VMAs", "Job-search preparation"] },
  ],
  journey: [
    { number: "01", title: "Choose your path", description: "Select the programme that fits your goals and preferred level of guidance." },
    { number: "02", title: "Enrol or register", description: "Ask about a programme or use an available registration link." },
    { number: "03", title: "Learn through practical sessions", description: "Work through healthcare administrative topics and guided practice." },
    { number: "04", title: "Receive guidance and feedback", description: "Use live sessions, individual support, or community Q&A as included." },
    { number: "05", title: "Complete your programme", description: "Receive a certificate of completion where the programme includes one." },
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
    title: "Ready to build your VMA skills?",
    description:
      "Tell us what you want to learn or ask about training for your healthcare team.",
    primaryAction: { label: "Explore Training", to: "#programmes" },
    secondaryAction: { label: "Book a Consultation", to: "/book-consultation" },
  },
} as const;

