import {
  createLeadResponse,
  readOptionalStringField,
  readStringArrayField,
  readStringField,
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
  });
}
