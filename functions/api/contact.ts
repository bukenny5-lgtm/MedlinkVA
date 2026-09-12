import {
  createLeadResponse,
  readOptionalStringField,
  sendBrevoTransactionalEmail,
  readStringField,
  type LeadEnv,
} from "../_shared/leadCapture";
import { readOptionalNormalizedPhoneField } from "../_shared/phone";

type ContactSubmission = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  organization: string;
  phone: string;
  service: string;
  website: string;
};

function buildContactNotificationText(payload: ContactSubmission) {
  return [
    "New Contact Lead - MedLink VA Website",
    "",
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    payload.organization ? `Practice / organization: ${payload.organization}` : "",
    `Service of interest: ${payload.service}`,
    "",
    "Message:",
    payload.message,
    "",
    "Submitted through medlinkva.com contact form",
  ]
    .filter((line) => line.length > 0)
    .join("\n");
}

function buildVisitorConfirmationText(payload: ContactSubmission) {
  return [
    `Hello ${payload.firstName},`,
    "",
    "Thank you for contacting MedLink VA.",
    "",
    `We have received your inquiry about: ${payload.service}`,
    "",
    "A member of our team will review your request and contact you using the details you provided.",
    "",
    "If you need to reach us sooner:",
    "info@medlinkva.com",
    "+256 785 724 420",
    "",
    "MedLink VA",
  ].join("\n");
}

function parseContactSubmission(body: Record<string, unknown>): ContactSubmission {
  return {
    firstName: readStringField(body, "contact-first-name", { minLength: 1, maxLength: 120 }),
    lastName: readStringField(body, "contact-last-name", { minLength: 1, maxLength: 120 }),
    email: readStringField(body, "contact-email", { minLength: 5, maxLength: 254 }),
    phone: readOptionalNormalizedPhoneField(body, "contact-phone", "contact-phone-country"),
    organization: readOptionalStringField(body, "contact-organization", 150),
    service: readStringField(body, "contact-service", { minLength: 1, maxLength: 150 }),
    message: readStringField(body, "contact-message", { minLength: 1, maxLength: 4_000 }),
    website: readOptionalStringField(body, "website", 200),
  };
}

export async function onRequest(context: { request: Request; env: LeadEnv }) {
  return createLeadResponse(context.request, context.env, {
    routeKey: "contact",
    listIdKey: "BREVO_CONTACT_LIST_ID",
    successMessage: "Your message has been sent.",
    parseBody: (body) => parseContactSubmission(body),
    buildBrevoPayload: (payload, listId) => ({
      email: payload.email,
      listIds: [listId],
      updateEnabled: true,
      emailBlacklisted: false,
      attributes: {
        FIRSTNAME: payload.firstName,
        LASTNAME: payload.lastName,
        MEDLINK_SERVICE: payload.service,
        MEDLINK_MESSAGE: payload.message,
        MEDLINK_LEAD_SOURCE: "Contact form",
        ...(payload.phone ? { SMS: payload.phone } : {}),
        ...(payload.organization ? { COMPANY: payload.organization } : {}),
      },
    }),
    onSuccess: async (payload, env) => {
      const fromEmail = env.BREVO_NOTIFICATION_FROM_EMAIL?.trim();
      const fromName = env.BREVO_NOTIFICATION_FROM_NAME?.trim() || "MedLink VA Website";
      const toEmail = env.BREVO_NOTIFICATION_TO_EMAIL?.trim() || "info@medlinkva.com";

      if (fromEmail) {
        await sendBrevoTransactionalEmail(env.BREVO_API_KEY?.trim() ?? "", {
          sender: { email: fromEmail, name: fromName },
          subject: "New Contact Lead - MedLink VA Website",
          textContent: buildContactNotificationText(payload),
          to: [{ email: toEmail }],
          replyTo: { email: payload.email },
        });
      }

      const confirmationSent = await sendBrevoTransactionalEmail(env.BREVO_API_KEY?.trim() ?? "", {
        sender: { email: fromEmail || "info@medlinkva.com", name: "MedLink VA" },
        subject: `MedLink VA — We received your ${payload.service} inquiry`,
        textContent: buildVisitorConfirmationText(payload),
        to: [{ email: payload.email }],
      });

      return { confirmationSent };
    },
  });
}
