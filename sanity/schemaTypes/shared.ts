import { defineArrayMember, defineField } from "sanity";

type ParentRecord = Record<string, unknown>;

export function slugField(source: string, title = "Slug") {
  return defineField({
    name: "slug",
    title,
    type: "slug",
    options: { source },
    validation: (Rule) => Rule.required(),
  });
}

export function displayOrderField() {
  return defineField({
    name: "displayOrder",
    title: "Display order",
    type: "number",
    validation: (Rule) => Rule.required().integer().min(0),
  });
}

export function featuredField() {
  return defineField({
    name: "featured",
    title: "Featured",
    type: "boolean",
    initialValue: false,
  });
}

export function activeField() {
  return defineField({
    name: "active",
    title: "Active",
    type: "boolean",
    initialValue: true,
  });
}

export function booleanField(name: string, title: string, initialValue = false) {
  return defineField({
    name,
    title,
    type: "boolean",
    initialValue,
  });
}

export function seoTitleField() {
  return defineField({
    name: "seoTitle",
    title: "SEO title",
    type: "string",
    validation: (Rule) => Rule.max(70),
  });
}

export function seoDescriptionField() {
  return defineField({
    name: "seoDescription",
    title: "SEO description",
    type: "text",
    rows: 3,
    validation: (Rule) => Rule.max(160),
  });
}

export function urlField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "url",
    validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
  });
}

export function emailField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => Rule.email(),
  });
}

export function altTextField(imageFieldName: string, title = "Alt text") {
  return defineField({
    name: "altText",
    title,
    type: "string",
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const parent = context.parent as ParentRecord | undefined;
        const hasImage = Boolean(parent?.[imageFieldName]);

        if (!hasImage) {
          return true;
        }

        return typeof value === "string" && value.trim().length > 0
          ? true
          : "Alt text is required when an image is present.";
      }),
  });
}

export function stringArrayField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });
}

export function richTextField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "block" })],
  });
}
