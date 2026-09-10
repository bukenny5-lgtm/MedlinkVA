import { defineField, defineType } from "sanity";

export const certificateSignatory = defineType({
  name: "certificateSignatory",
  title: "Certificate Signatory",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required().max(200) }),
    defineField({ name: "role", title: "Role / title", type: "string", validation: (Rule) => Rule.required().max(120) }),
    defineField({
      name: "signatureImage",
      title: "Signature image",
      description: "Upload an approved signature image. PNG with a transparent background is recommended.",
      type: "image",
      options: { accept: "image/png,image/jpeg,image/webp" },
    }),
    defineField({ name: "signatureAltText", title: "Signature alt text", type: "string", validation: (Rule) => Rule.max(200) }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", validation: (Rule) => Rule.integer().min(0) }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "signatureImage" },
  },
});
