import { defineArrayMember, defineField, defineType } from "sanity";
import { emailField, stringArrayField, urlField } from "./shared";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    emailField("contactEmail", "Contact email"),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "primaryCTA",
      title: "Primary CTA",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCTA",
      title: "Secondary CTA",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
            }),
            urlField("url", "URL"),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "platform",
            },
          },
        }),
      ],
    }),
    urlField("externalProductStoreUrl", "External product store URL"),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsletterText",
      title: "Newsletter text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "businessName",
      subtitle: "tagline",
    },
  },
});
