import { defineField, defineType } from "sanity";
import type { ReactNode } from "react";
import { activeField, displayOrderField, featuredField, slugField } from "./shared";

export const videoContent = defineType({
  name: "videoContent",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    slugField("title"),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3 }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Training & Tutorials", value: "training-tutorials" },
          { title: "VMA Skills", value: "vma-skills" },
          { title: "Clinical Support Skills", value: "clinical-support-skills" },
          { title: "Healthcare Administration", value: "healthcare-administration" },
          { title: "Career Guidance", value: "career-guidance" },
          { title: "AI & Workflow Automation", value: "ai-workflow-automation" },
          { title: "Webinars & Events", value: "webinars-events" },
          { title: "Certificate & Programme Guidance", value: "certificate-programme-guidance" },
          { title: "Service Explainers", value: "service-explainers" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoProvider",
      title: "Video provider",
      type: "string",
      options: { list: [{ title: "YouTube", value: "youtube" }, { title: "Cloudflare Stream", value: "cloudflare-stream" }], layout: "radio" },
      initialValue: "youtube",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube URL",
      type: "url",
      hidden: ({ parent }) => parent?.videoProvider === "cloudflare-stream",
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { videoProvider?: string } | undefined;
        if (parent?.videoProvider !== "youtube") return true;
        if (typeof value !== "string" || !value.trim()) return "A YouTube URL is required for YouTube videos.";
        try {
          const url = new URL(value);
          const parts = url.pathname.split("/").filter(Boolean);
          const id = url.hostname === "youtu.be" ? parts[0] : url.pathname === "/watch" ? url.searchParams.get("v") : ["embed", "shorts"].includes(parts[0] ?? "") ? parts[1] : null;
          return url.protocol === "https:" && ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname.toLowerCase()) && Boolean(id && /^[A-Za-z0-9_-]{11}$/.test(id)) ? true : "Enter a valid supported YouTube URL.";
        } catch { return "Enter a valid supported YouTube URL."; }
      }),
    }),
    defineField({
      name: "streamVideoId",
      title: "Cloudflare Stream video UID",
      type: "string",
      hidden: ({ parent }) => parent?.videoProvider !== "cloudflare-stream",
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { videoProvider?: string } | undefined;
        if (parent?.videoProvider !== "cloudflare-stream") return true;
        return typeof value === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(value.trim()) ? true : "A valid Cloudflare Stream video UID is required.";
      }),
    }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({
      name: "thumbnailAltText",
      title: "Thumbnail alt text",
      type: "string",
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { thumbnail?: unknown } | undefined;
        return parent?.thumbnail && !value?.trim() ? "Alt text is required when a thumbnail is present." : true;
      }),
    }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "speaker", title: "Speaker", type: "string" }),
    defineField({ name: "eventName", title: "Event name", type: "string" }),
    defineField({ name: "relatedTraining", title: "Related training", type: "reference", to: [{ type: "class" }] }),
    defineField({ name: "relatedService", title: "Related service", type: "reference", to: [{ type: "service" }] }),
    featuredField(),
    displayOrderField(),
    activeField(),
  ],
  preview: {
    select: { title: "title", category: "category", publishedAt: "publishedAt", videoProvider: "videoProvider", media: "thumbnail" },
    prepare({ title, category, publishedAt, videoProvider, media }: { title?: string; category?: string; publishedAt?: string; videoProvider?: string; media?: ReactNode }) {
      return { title, subtitle: [videoProvider === "cloudflare-stream" ? "Cloudflare Stream" : "YouTube", category, publishedAt ? new Date(publishedAt).toLocaleDateString("en-GB") : ""].filter(Boolean).join(" · "), media };
    },
  },
});
