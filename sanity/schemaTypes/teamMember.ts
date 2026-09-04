import { defineField, defineType } from "sanity";
import { activeField, altTextField, displayOrderField, featuredField, richTextField, slugField } from "./shared";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
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
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    altTextField("photo"),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 3,
    }),
    richTextField("fullBio", "Full bio"),
    featuredField(),
    displayOrderField(),
    activeField(),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
