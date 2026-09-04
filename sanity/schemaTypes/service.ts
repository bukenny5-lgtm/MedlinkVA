import { defineField, defineType } from "sanity";
import {
  activeField,
  altTextField,
  displayOrderField,
  featuredField,
  richTextField,
  seoDescriptionField,
  seoTitleField,
  slugField,
  stringArrayField,
} from "./shared";

export const service = defineType({
  name: "service",
  title: "Service",
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
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    richTextField("fullDescription", "Full description"),
    stringArrayField("examples", "Examples / support items"),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    altTextField("image"),
    seoTitleField(),
    seoDescriptionField(),
    featuredField(),
    displayOrderField(),
    activeField(),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "image",
    },
  },
});
