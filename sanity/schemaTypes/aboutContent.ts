import { defineField, defineType } from "sanity";
import { altTextField, richTextField, urlField } from "./shared";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "About Content",
  type: "document",
  fields: [
    defineField({
      name: "aboutIntro",
      title: "About intro",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "founderMessageHeading", title: "Founder message heading", type: "string" }),
    defineField({ name: "founderName", title: "Founder name", type: "string" }),
    defineField({ name: "founderRole", title: "Founder role", type: "string" }),
    richTextField("founderMessageBody", "Founder message"),
    defineField({ name: "founderImage", title: "Founder image", type: "image", options: { hotspot: true } }),
    altTextField("founderImage", "Founder image alt text"),
    defineField({
      name: "mission",
      title: "Mission",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuesIntro",
      title: "Values intro",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partners",
      title: "Partners and collaborations",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Organisation name", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "logo", title: "Logo", type: "image" }),
          altTextField("logo", "Logo alt text"),
          urlField("websiteUrl", "Website URL"),
          defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
          defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
        ],
        preview: { select: { title: "name", media: "logo" } },
      }],
    }),
    defineField({
      name: "metrics",
      title: "Verified metrics",
      description: "Only enter figures that have been verified by MedLink VA.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Metric label", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "value", title: "Verified value", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "suffix", title: "Suffix", type: "string" }),
          defineField({ name: "description", title: "Description", type: "string" }),
          defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
          defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
        ],
        preview: { select: { title: "label", subtitle: "value" } },
      }],
    }),
  ],
  preview: {
    select: {
      title: "aboutIntro",
    },
  },
});
