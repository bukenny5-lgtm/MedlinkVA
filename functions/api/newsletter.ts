import { createLeadResponse, readOptionalStringField, readStringField, type LeadEnv } from "../_shared/leadCapture";

type NewsletterSubmission = {
  email: string;
  website: string;
};

function parseNewsletterSubmission(body: Record<string, unknown>): NewsletterSubmission {
  const email = readStringField(body, "email", {
    minLength: 5,
    maxLength: 254,
  });

  return {
    email,
    website: readOptionalStringField(body, "website", 200),
  };
}

export async function onRequest(context: { request: Request; env: LeadEnv }) {
  return createLeadResponse(context.request, context.env, {
    routeKey: "newsletter",
    listIdKey: "BREVO_NEWSLETTER_LIST_ID",
    successMessage: "You have been added to the newsletter list.",
    parseBody: (body) => parseNewsletterSubmission(body),
    buildBrevoPayload: (payload, listId) => ({
      email: payload.email,
      listIds: [listId],
      updateEnabled: true,
      emailBlacklisted: false,
      attributes: {
        MEDLINK_LEAD_SOURCE: "Newsletter signup",
      },
    }),
  });
}
