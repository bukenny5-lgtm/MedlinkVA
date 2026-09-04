import { defineField, defineType } from "sanity";
import { activeField, altTextField, displayOrderField, featuredField, slugField } from "./shared";

export const productLink = defineType({
  name: "productLink",
  title: "Product Link",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugField("name"),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    altTextField("image"),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    featuredField(),
    displayOrderField(),
    activeField(),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortDescription",
      media: "image",
    },
  },
});
