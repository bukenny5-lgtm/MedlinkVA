import { defineField, defineType } from "sanity";

export const certificateCohort = defineType({
  name: "certificateCohort",
  title: "Certificate Cohort",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Cohort name", type: "string", validation: (Rule) => Rule.required().max(250) }),
    defineField({ name: "programCode", title: "Programme / course code", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "trainingTitle", title: "Training title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "trainingDuration", title: "Training duration", type: "string" }),
    defineField({ name: "issueDate", title: "Original issue date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "status", title: "Cohort status", type: "string", options: { list: [{ title: "Issued", value: "issued" }] }, initialValue: "issued", validation: (Rule) => Rule.required() }),
    defineField({ name: "signatories", title: "Signatories", type: "array", validation: (Rule) => Rule.unique().max(3), of: [{ type: "reference", to: [{ type: "certificateSignatory" }], options: { disableNew: true } }] }),
    defineField({ name: "certificates", title: "Certificates", type: "array", validation: (Rule) => Rule.unique().min(1), of: [{ type: "reference", to: [{ type: "certificate" }], options: { disableNew: true } }] }),
    defineField({ name: "recipientCount", title: "Recipient count", type: "number", readOnly: true, validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "createdAt", title: "Created at", type: "datetime", readOnly: true, initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 3 }),
    defineField({ name: "historical", title: "Historical cohort", type: "boolean", initialValue: false, description: "Reserved for future historical grouping; no migration is performed by this workflow." }),
  ],
  preview: {
    select: { title: "title", trainingTitle: "trainingTitle", issueDate: "issueDate", recipientCount: "recipientCount" },
    prepare({ title, trainingTitle, issueDate, recipientCount }) {
      return { title, subtitle: `${trainingTitle} · ${issueDate} · ${recipientCount} recipient${recipientCount === 1 ? "" : "s"}` };
    },
  },
});
