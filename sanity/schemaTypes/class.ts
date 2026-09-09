import { defineField, defineType } from "sanity";
import { altTextField, displayOrderField, featuredField, richTextField, slugField } from "./shared";

export const classSchema = defineType({
  name: "class",
  title: "Class",
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
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "string",
    }),
    defineField({
      name: "instructorNames",
      title: "Instructors",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "programmeType",
      title: "Programme type",
      type: "string",
      options: {
        list: [
          { title: "Programme", value: "programme" },
          { title: "Webinar", value: "webinar" },
          { title: "Workshop", value: "workshop" },
          { title: "Bootcamp", value: "bootcamp" },
          { title: "Team training", value: "team-training" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "startDate",
      title: "Start date and time",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End date and time",
      type: "datetime",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({ name: "currency", title: "Currency", type: "string", initialValue: "USD" }),
    defineField({ name: "priceLabel", title: "Price label", type: "string" }),
    defineField({
      name: "deliveryFormat",
      title: "Delivery format",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "certificateIncluded", title: "Certificate included", type: "boolean" }),
    defineField({ name: "externalRegistration", title: "External registration", type: "boolean" }),
    defineField({ name: "callToActionLabel", title: "Call to action label", type: "string" }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "registrationDeadline",
      title: "Registration deadline",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Enrolling", value: "enrolling" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
          { title: "On-demand", value: "on-demand" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    altTextField("image"),
    featuredField(),
    displayOrderField(),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "instructor",
      media: "image",
    },
  },
});
