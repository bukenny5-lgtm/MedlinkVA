import { defineField, defineType } from "sanity";
import { richTextField, stringArrayField } from "./shared";

export const homepageContent = defineType({
  name: "homepageContent",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero subheading",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    stringArrayField("trustItems", "Trust items"),
    defineField({
      name: "whyHeading",
      title: "Why heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    richTextField("whyBody", "Why body"),
    defineField({
      name: "finalCtaHeading",
      title: "Final CTA heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "finalCtaText",
      title: "Final CTA text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
    }),
    defineField({
      name: "newsletterText",
      title: "Newsletter text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "heroHeading",
    },
  },
});
