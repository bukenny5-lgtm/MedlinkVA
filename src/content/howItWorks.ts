import { servicesContent } from "./services";

export const howItWorksContent = {
  hero: {
    eyebrow: "How It Works",
    title: "A simple process for starting the support conversation",
    description:
      "The process below is intentionally clear and cautious. It explains the next step without promising specific timelines, results, or cost savings.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "View Services", to: "/services", variant: "secondary" as const },
    ],
    chips: ["Clear next steps", "No hidden backend", "Built for conversion"],
  },
  steps: [
    {
      number: "01",
      title: "Tell Us What You Need",
      description:
        "Share the general support areas you want to improve so the conversation starts with the right context.",
    },
    {
      number: "02",
      title: "Define Your Support Needs",
      description:
        "We can talk through the tasks, communication patterns, and level of assistance that would make the most sense.",
    },
    {
      number: "03",
      title: "Begin Your Workflow",
      description:
        "Move into a support structure that fits the current stage of your practice and the work you want to organize.",
    },
    {
      number: "04",
      title: "Grow With Ongoing Support",
      description:
        "As needs evolve, the support conversation can evolve too so the setup stays practical instead of rigid.",
    },
  ],
  expectations: [
    {
      title: "A straightforward first conversation",
      description:
        "We want the first contact to feel easy and informative rather than overloaded with unnecessary detail.",
    },
    {
      title: "No clinical claims",
      description:
        "The page stays focused on administrative and operational support, not diagnosis or treatment.",
    },
    {
      title: "A clear handoff to the right page",
      description:
        "The consultation page is the main conversion point, while the services page can help visitors narrow the fit.",
    },
  ],
  serviceCategories: servicesContent.services.map((service) => service.title),
  faqTeaser: [
    {
      question: "How quickly can support begin?",
      answer:
        "That depends on the final support arrangement, which is why the page avoids promising a fixed onboarding time.",
    },
    {
      question: "Can support be tailored?",
      answer:
        "Yes. The structure is designed to be flexible so the conversation can focus on the support the visitor actually needs.",
    },
    {
      question: "What happens next?",
      answer:
        "Visitors can move from the overview pages to the consultation form, where business context can be shared safely.",
    },
  ],
  finalCta: {
    title: "Ready to map out the next step?",
    description: "The consultation page is set up to capture enough business context for a useful follow-up conversation.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Contact Medlink VA", to: "/contact" },
  },
} as const;

