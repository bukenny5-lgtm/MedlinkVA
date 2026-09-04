import { defineField, defineType } from "sanity";
import { displayOrderField, featuredField, richTextField, slugField, stringArrayField } from "./shared";

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugField("title"),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Temporary", value: "temporary" },
          { title: "Internship", value: "internship" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    richTextField("fullDescription", "Full description"),
    stringArrayField("requirements", "Requirements"),
    defineField({
      name: "closingDate",
      title: "Closing date",
      type: "date",
    }),
    defineField({
      name: "applicationUrl",
      title: "Application URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Paused", value: "paused" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    featuredField(),
    displayOrderField(),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
    },
  },
});
