import { defineField, defineType } from "sanity";
import { activeField, displayOrderField, richTextField } from "./shared";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    richTextField("answer", "Answer"),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    displayOrderField(),
    activeField(),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
  },
});
