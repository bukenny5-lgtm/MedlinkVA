import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { LeadRequestError, readOptionalStringField } from "./leadCapture";

export type PhoneCountryOption = {
  code: CountryCode;
  label: string;
};

export const defaultPhoneCountryCode: CountryCode = "UG";

export const phoneCountryOptions = [
  { code: "UG", label: "Uganda" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "KE", label: "Kenya" },
  { code: "TZ", label: "Tanzania" },
  { code: "RW", label: "Rwanda" },
  { code: "ZA", label: "South Africa" },
  { code: "NG", label: "Nigeria" },
  { code: "GH", label: "Ghana" },
  { code: "ET", label: "Ethiopia" },
  { code: "EG", label: "Egypt" },
  { code: "IN", label: "India" },
  { code: "PK", label: "Pakistan" },
  { code: "BD", label: "Bangladesh" },
  { code: "AE", label: "United Arab Emirates" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "TR", label: "Turkey" },
  { code: "AU", label: "Australia" },
  { code: "NZ", label: "New Zealand" },
  { code: "IE", label: "Ireland" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "ES", label: "Spain" },
  { code: "IT", label: "Italy" },
  { code: "NL", label: "Netherlands" },
  { code: "BE", label: "Belgium" },
  { code: "CH", label: "Switzerland" },
  { code: "AT", label: "Austria" },
  { code: "SE", label: "Sweden" },
  { code: "NO", label: "Norway" },
  { code: "DK", label: "Denmark" },
  { code: "FI", label: "Finland" },
  { code: "BR", label: "Brazil" },
  { code: "MX", label: "Mexico" },
  { code: "AR", label: "Argentina" },
  { code: "CL", label: "Chile" },
  { code: "CO", label: "Colombia" },
  { code: "PH", label: "Philippines" },
  { code: "SG", label: "Singapore" },
  { code: "MY", label: "Malaysia" },
  { code: "JP", label: "Japan" },
  { code: "KR", label: "South Korea" },
] as const satisfies readonly Readonly<PhoneCountryOption>[];

export type PhoneCountryCode = CountryCode;

export function normalizePhoneNumber(phone: string, countryCode: string) {
  const trimmed = phone.trim();

  if (!trimmed) {
    return { normalized: null };
  }

  const upperCountryCode = countryCode.trim().toUpperCase();

  if (!upperCountryCode) {
    return {
      error: "Select a country for local phone numbers.",
      normalized: null,
    };
  }

  const normalizedCountryCode = upperCountryCode as CountryCode;
  const parsedPhoneNumber = trimmed.startsWith("+")
    ? parsePhoneNumberFromString(trimmed)
    : parsePhoneNumberFromString(trimmed, normalizedCountryCode);

  if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
    return {
      error: "Enter a valid phone number or leave the field blank.",
      normalized: null,
    };
  }

  return { normalized: parsedPhoneNumber.format("E.164") };
}

export function readOptionalNormalizedPhoneField(
  body: Record<string, unknown>,
  phoneField: string,
  countryField: string,
) {
  const phone = readOptionalStringField(body, phoneField, 50);

  if (!phone) {
    return "";
  }

  const country = readOptionalStringField(body, countryField, 8);

  if (!country) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", `${countryField} is required when a phone number is provided.`);
  }

  const normalized = normalizePhoneNumber(phone, country);

  if (!normalized.normalized) {
    throw new LeadRequestError(400, "INVALID_SUBMISSION", normalized.error ?? "Enter a valid phone number or leave it blank.");
  }

  return normalized.normalized;
}
