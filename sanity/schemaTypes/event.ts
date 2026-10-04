import { defineField, defineType } from "sanity";
import { activeField, booleanField, displayOrderField, featuredField, slugField } from "./shared";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    slugField("title"),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "startDateTime", title: "Start date and time", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "endDateTime", title: "End date and time", type: "datetime", validation: (Rule) => Rule.required().custom((value, context) => { const start = (context.parent as { startDateTime?: string } | undefined)?.startDateTime; return !start || !value || new Date(value).getTime() >= new Date(start).getTime() || "End date and time must be after the start."; }) }),
    defineField({ name: "timezone", title: "Timezone", type: "string", initialValue: "Africa/Kampala" }),
    defineField({ name: "format", title: "Format", type: "string" }),
    defineField({ name: "registrationUrl", title: "Registration URL", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "string" }),
    activeField(),
    featuredField(),
    booleanField("showOnHomepage", "Show on homepage", false),
    defineField({ name: "showInResources", title: "Show in Resources", type: "boolean", initialValue: true }),
    defineField({ name: "registrationClosesAt", title: "Registration closes at", type: "datetime" }),
    displayOrderField(),
    defineField({ name: "eventType", title: "Event type", type: "string", options: { list: ["training", "webinar", "launch", "workshop", "other"] } }),
  ],
  preview: { select: { title: "title", subtitle: "startDateTime", media: "coverImage" } },
});
