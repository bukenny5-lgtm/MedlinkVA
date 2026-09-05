import {
  createLeadResponse,
  readOptionalStringField,
  readStringArrayField,
  readStringField,
  sendBrevoTransactionalEmail,
  type LeadEnv,
} from "../_shared/leadCapture";
import { readOptionalNormalizedPhoneField } from "../_shared/phone";

type ConsultationSubmission = {
  availability: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  practiceType: string;
  preferredContactMethod: string;
  servicesOfInterest: string[];
  supportNeeds: string;
  website: string;
};

function buildConsultationNotificationText(payload: ConsultationSubmission) {
  return [
    "New Consultation Request - MedLink VA Website",
    "",
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    `Practice / organization: ${payload.organization}`,
    `Practice type: ${payload.practiceType}`,
    `Services of interest: ${payload.servicesOfInterest.join(", ")}`,
    `Preferred contact method: ${payload.preferredContactMethod}`,
    "",
    `Support needs:\n${payload.supportNeeds}`,
    payload.availability ? `\nAvailability note:\n${payload.availability}` : "",
    "",
    "Submitted through medlinkva.com consultation form",
  ]
    .filter((line) => line.length > 0)
    .join("\n");
}

function parseConsultationSubmission(body: Record<string, unknown>): ConsultationSubmission {
  return {
    firstName: readStringField(body, "consult-first-name", { minLength: 1, maxLength: 120 }),
    lastName: readStringField(body, "consult-last-name", { minLength: 1, maxLength: 120 }),
    email: readStringField(body, "consult-email", { minLength: 5, maxLength: 254 }),
    phone: readOptionalNormalizedPhoneField(body, "consult-phone", "consult-phone-country"),
    organization: readStringField(body, "consult-organization", { minLength: 1, maxLength: 150 }),
    practiceType: readStringField(body, "consult-practice-type", { minLength: 1, maxLength: 150 }),
    servicesOfInterest: readStringArrayField(body, "services-of-interest", 12),
    preferredContactMethod: readStringField(body, "preferred-contact-method", { minLength: 1, maxLength: 120 }),
    supportNeeds: readStringField(body, "consult-support-needs", { minLength: 1, maxLength: 4_000 }),
    availability: readOptionalStringField(body, "consult-availability", 500),
    website: readOptionalStringField(body, "website", 200),
  };
}

export async function onRequest(context: { request: Request; env: LeadEnv }) {
  return createLeadResponse(context.request, context.env, {
    routeKey: "consultation",
    listIdKey: "BREVO_CONSULTATION_LIST_ID",
    successMessage: "Your consultation request has been sent.",
    parseBody: (body) => parseConsultationSubmission(body),
    buildBrevoPayload: (payload, listId) => ({
      email: payload.email,
      listIds: [listId],
      updateEnabled: true,
      emailBlacklisted: false,
      attributes: {
        FIRSTNAME: payload.firstName,
        LASTNAME: payload.lastName,
        COMPANY: payload.organization,
        MEDLINK_PRACTICE_TYPE: payload.practiceType,
        MEDLINK_SERVICES_OF_INTEREST: payload.servicesOfInterest.join(", "),
        MEDLINK_PREFERRED_CONTACT_METHOD: payload.preferredContactMethod,
        MEDLINK_SUPPORT_NEEDS: payload.supportNeeds,
        MEDLINK_AVAILABILITY_NOTE: payload.availability,
        MEDLINK_LEAD_SOURCE: "Consultation request",
        ...(payload.phone ? { SMS: payload.phone } : {}),
      },
    }),
    onSuccess: async (payload, env) => {
      const fromEmail = env.BREVO_NOTIFICATION_FROM_EMAIL?.trim();
      const fromName = env.BREVO_NOTIFICATION_FROM_NAME?.trim() || "MedLink VA Website";
      const toEmail = env.BREVO_NOTIFICATION_TO_EMAIL?.trim() || "info@medlinkva.com";

      if (!fromEmail) {
        return;
      }

      await sendBrevoTransactionalEmail(env.BREVO_API_KEY?.trim() ?? "", {
        sender: {
          email: fromEmail,
          name: fromName,
        },
        subject: "New Consultation Request - MedLink VA Website",
        textContent: buildConsultationNotificationText(payload),
        to: [{ email: toEmail }],
        replyTo: {
          email: payload.email,
        },
      });
    },
  });
}
