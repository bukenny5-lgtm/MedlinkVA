import { defineField, defineType } from "sanity";
import { activeField, displayOrderField } from "./shared";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientRole",
      title: "Client role",
      type: "string",
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      options: {
        list: [
          { title: "Trainee", value: "trainee" },
          { title: "Client", value: "client" },
          { title: "Practice", value: "practice" },
        ],
      },
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "altText",
      title: "Alt text",
      type: "string",
    }),
    displayOrderField(),
    activeField(),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "organization",
      media: "photo",
    },
  },
});
