import { defineField, defineType } from "sanity";
import { activeField, displayOrderField, featuredField, richTextField, seoDescriptionField, seoTitleField, slugField } from "./shared";

export const resourcePost = defineType({
  name: "resourcePost",
  title: "Resource Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImageAlt",
      title: "Cover image alt text",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resourceType",
      title: "Resource type",
      type: "string",
      options: { list: ["Article", "Guide", "Checklist", "Template", "Webinar Recap", "Newsletter", "Career Resource", "Healthcare Administration Tip", "Training Resource"] },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({ name: "authorName", title: "Author name", type: "string" }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    richTextField("body", "Body"),
    defineField({ name: "externalUrl", title: "External resource URL", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "downloadFile", title: "Downloadable file", type: "file" }),
    defineField({ name: "callToActionLabel", title: "Call to action label", type: "string" }),
    displayOrderField(),
    featuredField(),
    seoTitleField(),
    seoDescriptionField(),
    activeField(),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
