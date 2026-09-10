import { defineField, defineType } from "sanity";

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({
      name: "certificateNumber",
      title: "Certificate number",
      description: "System-generated after the program code and issue date are entered. Read-only for normal Studio editing.",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({ name: "programCode", title: "Program / course code", description: "Choose the controlled code used in the generated certificate number.", type: "string", options: { list: [{ title: "RCM — Revenue Cycle Management", value: "RCM" }, { title: "VMA — Virtual Medical Assistant", value: "VMA" }, { title: "MBC — Medical Billing & Coding", value: "MBC" }, { title: "OTHER — Other approved programme", value: "OTHER" }] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "legacyCertificateNumber", title: "Legacy certificate number (optional)", description: "Optional. Enter the certificate number printed on an older certificate issued before the digital verification system. Leave blank for new certificates or historical certificates that never had a certificate number.", type: "string", validation: (Rule) => Rule.max(100) }),
    defineField({ name: "recipientName", title: "Recipient name", type: "string", validation: (Rule) => Rule.required().max(200) }),
    defineField({ name: "trainingTitle", title: "Training title", type: "string", validation: (Rule) => Rule.required().max(250) }),
    defineField({ name: "trainingDuration", title: "Training duration", type: "string", validation: (Rule) => Rule.max(100) }),
    defineField({ name: "issueDate", title: "Original issue date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "trainerNames", title: "Trainer names", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "signatories",
      title: "Certificate signatories",
      description: "Optional approved signatories whose stored signature images will be rendered on generated certificates.",
      type: "array",
      validation: (Rule) => Rule.unique().max(3),
      of: [{ type: "reference", to: [{ type: "certificateSignatory" }], options: { disableNew: true } }],
    }),
    defineField({ name: "cohort", title: "Cohort / Training Batch", description: "Optional. Enter the training group or intake this learner belonged to, for example 'October 2026 VMA Training Cohort'. Leave blank if the training did not use a named cohort.", type: "string" }),
    defineField({
      name: "status",
      title: "Certificate status",
      type: "string",
      options: { list: [{ title: "Valid", value: "valid" }, { title: "Revoked", value: "revoked" }], layout: "radio" },
      initialValue: "valid",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verificationToken",
      title: "Verification token",
      description: "Generated automatically for new certificates. Do not use the certificate number as the token.",
      type: "string",
      readOnly: true,
      initialValue: () => globalThis.crypto?.randomUUID?.() ?? "",
      validation: (Rule) => Rule.required().min(16).max(128).regex(/^[A-Za-z0-9_-]+$/, { name: "URL-safe token" }),
    }),
    defineField({ name: "originallyIssuedBeforeVerificationSystem", title: "Issued before verification system", type: "boolean", initialValue: false }),
    defineField({ name: "verificationRecordCreatedAt", title: "Verification record created at", type: "datetime", readOnly: true, initialValue: () => new Date().toISOString() }),
    defineField({ name: "revocationReason", title: "Internal revocation reason", type: "text", rows: 3 }),
    defineField({ name: "internalNotes", title: "Internal notes", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "recipientName", certificateNumber: "certificateNumber", trainingTitle: "trainingTitle", status: "status" },
    prepare({ title, certificateNumber, trainingTitle, status }) {
      return { title: `${title} · ${certificateNumber}`, subtitle: `${trainingTitle} · ${status}` };
    },
  },
});
