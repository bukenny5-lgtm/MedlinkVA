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
    defineField({ name: "fullDescription", title: "Full description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Templates & Tools", "Training & Learning"] } }),
    defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({ name: "priceLabel", title: "Price label", type: "string" }),
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
    defineField({ name: "externalPlatform", title: "External platform", type: "string", initialValue: "Selar" }),
    featuredField(),
    displayOrderField(),
    activeField(),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortDescription",
      media: "image",
    },
  },
});
