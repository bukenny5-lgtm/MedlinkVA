const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"]);
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const STREAM_UID = /^[A-Za-z0-9_-]{8,64}$/;

export type VideoPlayback = {
  provider: "youtube" | "cloudflare-stream";
  embedUrl: string;
  thumbnailUrl?: string;
};

export function getYouTubeVideoId(value: string | undefined | null) {
  if (!value?.trim()) return null;

  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }

  if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase()) || url.protocol !== "https:") return null;

  const parts = url.pathname.split("/").filter(Boolean);
  const id = url.hostname === "youtu.be"
    ? parts[0]
    : url.pathname === "/watch"
      ? url.searchParams.get("v")
      : ["embed", "shorts"].includes(parts[0] ?? "")
        ? parts[1]
        : null;

  return id && YOUTUBE_ID.test(id) ? id : null;
}

export function getYouTubeEmbedUrl(value: string | undefined | null) {
  const id = getYouTubeVideoId(value);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function getYouTubeThumbnailUrl(value: string | undefined | null) {
  const id = getYouTubeVideoId(value);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function getCloudflareStreamEmbedUrl(value: string | undefined | null) {
  const uid = value?.trim();
  return uid && STREAM_UID.test(uid) ? `https://iframe.videodelivery.net/${uid}` : null;
}

export function getCloudflareStreamThumbnailUrl(value: string | undefined | null) {
  const uid = value?.trim();
  return uid && STREAM_UID.test(uid) ? `https://videodelivery.net/${uid}/thumbnails/thumbnail.jpg` : null;
}

export function resolveVideoPlayback(video: {
  videoProvider?: "youtube" | "cloudflare-stream";
  videoUrl?: string;
  streamVideoId?: string;
}): VideoPlayback | null {
  const provider = video.videoProvider ?? (getYouTubeVideoId(video.videoUrl) ? "youtube" : undefined);
  if (provider === "youtube") {
    const embedUrl = getYouTubeEmbedUrl(video.videoUrl);
    return embedUrl ? { provider, embedUrl, thumbnailUrl: getYouTubeThumbnailUrl(video.videoUrl) ?? undefined } : null;
  }

  const embedUrl = getCloudflareStreamEmbedUrl(video.streamVideoId);
  return embedUrl ? { provider: "cloudflare-stream", embedUrl, thumbnailUrl: getCloudflareStreamThumbnailUrl(video.streamVideoId) ?? undefined } : null;
}
