import { servicesContent } from "./services";

export const howItWorksContent = {
  hero: {
    eyebrow: "How It Works",
    title: "A simple process for starting the support conversation",
    description:
      "Tell us what your practice needs, explore suitable support, and agree on a practical way to work together.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "View Services", to: "/services", variant: "secondary" as const },
    ],
    chips: ["Clear next steps", "Personalized support", "Open communication"],
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
      title: "Administrative focus",
      description:
        "Explore help with scheduling, communication, and the daily administration that supports your team.",
    },
    {
      title: "Support shaped around your priorities",
      description:
        "Discuss the tasks that need attention and the level of support that would fit your practice.",
    },
  ],
  serviceCategories: servicesContent.services.map((service) => service.title),
  faqTeaser: [
    {
      question: "How quickly can support begin?",
      answer:
        "Timing depends on your needs and the support arrangement. We can discuss availability and next steps during your consultation.",
    },
    {
      question: "Can support be tailored?",
      answer:
        "Yes. Tell us about your tasks, workflows, and communication preferences so we can discuss a suitable approach.",
    },
    {
      question: "What happens next?",
      answer:
        "Send a consultation request with your practice details and support priorities. We’ll review your request and follow up.",
    },
  ],
  finalCta: {
    title: "Ready to map out the next step?",
    description: "Tell us about your practice priorities so we can start a useful conversation.",
    primaryAction: { label: "Book a Consultation", to: "/book-consultation" },
    secondaryAction: { label: "Contact Medlink VA", to: "/contact" },
  },
} as const;

