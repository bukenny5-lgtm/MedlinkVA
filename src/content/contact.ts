import { siteContent } from "./site";
import { servicesContent } from "./services";

export type FieldOption = {
  label: string;
  value: string;
};

export type FormFieldConfig = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  helpText?: string;
  options?: readonly FieldOption[];
  rows?: number;
};

const serviceOptions = servicesContent.services.map((service) => ({
  label: service.title,
  value: service.title,
}));

const practiceTypeOptions = [
  { label: "Medical practice", value: "Medical practice" },
  { label: "Dental practice", value: "Dental practice" },
  { label: "Mental health provider", value: "Mental health provider" },
  { label: "Specialist practice", value: "Specialist practice" },
  { label: "Telehealth provider", value: "Telehealth provider" },
  { label: "Healthcare organization", value: "Healthcare organization" },
  { label: "Other", value: "Other" },
];

const contactMethodOptions = [
  { label: "Email", value: "Email" },
  { label: "Phone", value: "Phone" },
  { label: "Either email or phone", value: "Either email or phone" },
];

export const contactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Reach out with a business inquiry or support question",
    description:
      "This contact page is designed for straightforward communication and keeps sensitive health information out of the form.",
    actions: [
      { label: "Book a Consultation", to: "/book-consultation", variant: "primary" as const },
      { label: "View Services", to: "/services", variant: "secondary" as const },
    ],
  },
  contactDetails: [
    {
      label: "Email",
      value: siteContent.contactEmail,
      href: `mailto:${siteContent.contactEmail}`,
    },
    {
      label: "Support focus",
      value: "Virtual medical assistant support",
    },
    {
      label: "Availability note",
      value: "Please allow a little time for a reply.",
    },
  ],
  introduction:
    "Use this page for general questions, partnership conversations, and practical support inquiries. The form is UI-only in this phase and will be connected before launch.",
  form: {
    title: "Send a message",
    submitLabel: "Prepare message",
    notice: "This form will be connected before launch.",
    privacyNote: "Please do not submit confidential patient or medical information through this form.",
    fields: [
      {
        id: "contact-first-name",
        label: "First name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        id: "contact-last-name",
        label: "Last name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        id: "contact-email",
        label: "Email",
        type: "email",
        placeholder: "name@practice.com",
        required: true,
      },
      {
        id: "contact-phone",
        label: "Phone",
        type: "tel",
        placeholder: "Optional phone number",
        helpText: "Optional.",
      },
      {
        id: "contact-organization",
        label: "Practice / organization name",
        type: "text",
        placeholder: "Practice or organization name",
        required: true,
      },
      {
        id: "contact-service",
        label: "Service of interest",
        type: "select",
        placeholder: "Select a service",
        required: true,
        options: serviceOptions,
      },
      {
        id: "contact-message",
        label: "Message",
        type: "textarea",
        placeholder: "Tell us what you need help with",
        required: true,
        rows: 5,
        helpText: "Keep this focused on business support needs rather than patient information.",
      },
    ] satisfies readonly FormFieldConfig[],
  },
  alternativeMethods: [
    {
      title: "Book a consultation",
      description: "Use the dedicated consultation page when you want to share more context up front.",
      to: "/book-consultation",
    },
    {
      title: "Review services",
      description: "See the current service categories if you are still comparing options.",
      to: "/services",
    },
  ],
  faqTeaser: [
    "The form is a preview and does not submit to a live backend yet.",
    "Sensitive patient data should never be entered into a public contact form.",
    "A secure integration can be added later when the final stack is approved.",
  ],
  consultationPrompt:
    "If your inquiry is about a potential engagement, the consultation page will ask for a little more context in a separate form.",
  contactLabel: "Email Medlink VA",
  contactHref: `mailto:${siteContent.contactEmail}`,
  practiceTypeOptions,
  contactMethodOptions,
} as const;

export const consultationContent = {
  hero: {
    eyebrow: "Consultation",
    title: "Book a consultation to talk through your support needs",
    description:
      "The consultation page captures practical business context without asking for unnecessary sensitive information.",
    actions: [
      { label: "Contact Medlink VA", to: "/contact", variant: "secondary" as const },
      { label: "View Services", to: "/services", variant: "secondary" as const },
    ],
  },
  introduction:
    "Use this form when you want to describe the support you need before a follow-up conversation. The current version is UI-only and will be connected later.",
  trustPoints: [
    "Built for qualified prospects who want to talk through operational support",
    "Focused on business context instead of patient details",
    "Designed to stay clear, calm, and easy to complete",
  ],
  whatHappensNext: [
    "Share the basics of your practice and the support you want to discuss.",
    "Review the information you entered and keep the next conversation business-focused.",
    "Expect a follow-up once the form is connected before launch.",
  ],
  form: {
    title: "Consultation details",
    submitLabel: "Prepare consultation request",
    notice: "This form will be connected before launch.",
    privacyNote:
      "Please do not submit confidential patient or medical information through this form.",
    fields: [
      {
        id: "consult-first-name",
        label: "First name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        id: "consult-last-name",
        label: "Last name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        id: "consult-email",
        label: "Work email",
        type: "email",
        placeholder: "name@practice.com",
        required: true,
      },
      {
        id: "consult-phone",
        label: "Phone",
        type: "tel",
        placeholder: "Best contact number",
        helpText: "Optional, but helpful if you prefer a phone follow-up.",
      },
      {
        id: "consult-organization",
        label: "Practice / organization",
        type: "text",
        placeholder: "Practice or organization name",
        required: true,
      },
      {
        id: "consult-practice-type",
        label: "Practice type",
        type: "select",
        placeholder: "Select a practice type",
        required: true,
        options: practiceTypeOptions,
      },
      {
        id: "consult-support-needs",
        label: "General support needs",
        type: "textarea",
        placeholder: "Tell us what support you want to explore",
        required: true,
        rows: 5,
      },
      {
        id: "consult-availability",
        label: "Preferred consultation time / availability note",
        type: "textarea",
        placeholder: "Share a time window or availability note",
        rows: 3,
        helpText: "Optional. This is only a note for later follow-up.",
      },
    ] satisfies readonly FormFieldConfig[],
  },
  serviceOptions,
  contactMethodOptions,
  schedulePrompt:
    "If you need the form connected to a scheduling flow later, that should be added after the launch stack is confirmed.",
} as const;

