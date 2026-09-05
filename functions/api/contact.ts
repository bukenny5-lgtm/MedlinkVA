import { createLeadResponse, readOptionalStringField, readStringField, type LeadEnv } from "../_shared/leadCapture";

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

function parseContactSubmission(body: Record<string, unknown>): ContactSubmission {
  return {
    firstName: readStringField(body, "contact-first-name", { minLength: 1, maxLength: 120 }),
    lastName: readStringField(body, "contact-last-name", { minLength: 1, maxLength: 120 }),
    email: readStringField(body, "contact-email", { minLength: 5, maxLength: 254 }),
    phone: readOptionalStringField(body, "contact-phone", 50),
    organization: readStringField(body, "contact-organization", { minLength: 1, maxLength: 150 }),
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
        SMS: payload.phone,
        COMPANY: payload.organization,
        MEDLINK_SERVICE: payload.service,
        MEDLINK_MESSAGE: payload.message,
        MEDLINK_LEAD_SOURCE: "Contact form",
      },
    }),
  });
}
