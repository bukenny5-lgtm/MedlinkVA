import { officialLaunchEvent } from "../content/officialLaunch";
import { clientAssets } from "./assets";
import { sanityImageSrc } from "./sanity/image";
import type { EventDocument, SanityImageSource } from "./sanity/types";

export type EventStatus = "upcoming" | "live" | "past";

export type ResolvedEvent = {
  id: string;
  slug: string;
  path: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage?: SanityImageSource;
  localCoverImage?: string;
  startDateTime: string;
  endDateTime: string;
  timezone?: string;
  format?: string;
  registrationUrl?: string;
  ctaLabel?: string;
  active: boolean;
  featured: boolean;
  showOnHomepage: boolean;
  showInResources: boolean;
  registrationClosesAt?: string;
  displayOrder: number;
  eventType?: string;
  status: EventStatus;
};

export function eventStatus(event: Pick<ResolvedEvent, "startDateTime" | "endDateTime">, now = new Date()) {
  const start = new Date(event.startDateTime).getTime();
  const end = new Date(event.endDateTime).getTime();
  const current = now.getTime();
  if (current < start) return "upcoming" as const;
  if (current <= end) return "live" as const;
  return "past" as const;
}

function fallbackEvent(): ResolvedEvent {
  return {
    id: officialLaunchEvent.id,
    slug: officialLaunchEvent.slug,
    path: officialLaunchEvent.path,
    title: officialLaunchEvent.title,
    shortDescription: officialLaunchEvent.description,
    description: officialLaunchEvent.detailDescription,
    localCoverImage: clientAssets.officialLaunchCover,
    startDateTime: officialLaunchEvent.startTime,
    endDateTime: officialLaunchEvent.endTime,
    timezone: "Africa/Kampala",
    format: officialLaunchEvent.format,
    registrationUrl: officialLaunchEvent.registrationUrl,
    ctaLabel: officialLaunchEvent.ctaLabel,
    active: true,
    featured: true,
    showOnHomepage: true,
    showInResources: true,
    displayOrder: 0,
    eventType: "launch",
    status: eventStatus({ startDateTime: officialLaunchEvent.startTime, endDateTime: officialLaunchEvent.endTime }),
  };
}

function fromSanity(record: EventDocument): ResolvedEvent {
  const event = {
    id: record._id,
    slug: record.slug.current,
    path: `/events/${record.slug.current}`,
    title: record.title,
    shortDescription: record.shortDescription,
    description: record.description || record.shortDescription,
    coverImage: record.coverImage,
    startDateTime: record.startDateTime,
    endDateTime: record.endDateTime,
    timezone: record.timezone,
    format: record.format,
    registrationUrl: record.registrationUrl,
    ctaLabel: record.ctaLabel,
    active: record.active !== false,
    featured: record.featured === true,
    showOnHomepage: record.showOnHomepage === true,
    showInResources: record.showInResources !== false,
    registrationClosesAt: record.registrationClosesAt,
    displayOrder: record.displayOrder ?? 0,
    eventType: record.eventType,
  } satisfies Omit<ResolvedEvent, "status" | "localCoverImage">;
  return { ...event, status: eventStatus(event) };
}

export function resolveEvents(records: EventDocument[] | undefined): ResolvedEvent[] {
  const sanityEvents = (records ?? []).filter((record) => record.active !== false).map(fromSanity);
  const fallback = fallbackEvent();
  if (!sanityEvents.some((event) => event.slug === fallback.slug)) sanityEvents.push(fallback);
  return sanityEvents.sort((left, right) => left.displayOrder - right.displayOrder || new Date(left.startDateTime).getTime() - new Date(right.startDateTime).getTime());
}

export function resolveEvent(slug: string, records: EventDocument[] | undefined) {
  return resolveEvents(records).find((event) => event.slug === slug);
}

export function eventImage(event: ResolvedEvent, width = 1000) {
  return (event.coverImage ? sanityImageSrc(event.coverImage, { width }) : null) ?? event.localCoverImage;
}

export function registrationIsOpen(event: ResolvedEvent, now = new Date()) {
  const cutoff = event.registrationClosesAt || event.endDateTime;
  return Boolean(event.registrationUrl) && now.getTime() <= new Date(cutoff).getTime();
}

export function eligibleForHomepage(event: ResolvedEvent, now = new Date()) {
  return event.active && event.showOnHomepage && event.status !== "past" && now.getTime() <= new Date(event.endDateTime).getTime();
}

export function eligibleForResources(event: ResolvedEvent) {
  return event.active && event.showInResources && event.status !== "past";
}
