import { defineField, defineType } from "sanity";

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
  ],
  preview: {
    select: {
      title: "aboutIntro",
    },
  },
});
