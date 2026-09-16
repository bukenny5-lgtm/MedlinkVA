import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsletterSection } from "../components/home/NewsletterSection";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { Seo } from "../components/Seo";
import { resolveVideosContent } from "../lib/cms/siteContent";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { sanityImageSrc } from "../lib/sanity/image";
import type { VideoCategory, VideoContentDocument } from "../lib/sanity/types";
import { resolveVideoPlayback, type VideoPlayback } from "../lib/videoUrl";
import { trackEvent } from "../lib/analytics";

const categoryLabels: Record<VideoCategory, string> = {
  "training-tutorials": "Training & Tutorials",
  "vma-skills": "VMA Skills",
  "clinical-support-skills": "Clinical Support Skills",
  "healthcare-administration": "Healthcare Administration",
  "career-guidance": "Career Guidance",
  "ai-workflow-automation": "AI & Workflow Automation",
  "webinars-events": "Webinars & Events",
  "certificate-programme-guidance": "Certificate & Programme Guidance",
  "service-explainers": "Service Explainers",
  other: "Other",
};

const trainingCategories: VideoCategory[] = ["training-tutorials", "vma-skills", "clinical-support-skills", "career-guidance", "certificate-programme-guidance"];
const practiceCategories: VideoCategory[] = ["healthcare-administration", "ai-workflow-automation", "service-explainers"];

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

function videoThumbnail(video: VideoContentDocument, playback: VideoPlayback) {
  return sanityImageSrc(video.thumbnail, { width: 1280, height: 720 }) ?? playback.thumbnailUrl;
}

export function VideosPage() {
  const videos = resolveVideosContent(useCmsBundle()).flatMap((video) => {
    const playback = resolveVideoPlayback(video);
    return playback ? [{ video, playback }] : [];
  });
  const videoRecords = videos.map(({ video }) => video);
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | "all">("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoContentDocument | null>(null);
  const availableCategories = (Object.keys(categoryLabels) as VideoCategory[]).filter((category) => videoRecords.some((video) => video.category === category));
  const filteredVideos = selectedCategory === "all" ? videos : videos.filter(({ video }) => video.category === selectedCategory);
  const featuredVideo = videos.find(({ video }) => video.featured);
  const trainingVideos = videos.filter(({ video }) => trainingCategories.includes(video.category));
  const practiceVideos = videos.filter(({ video }) => practiceCategories.includes(video.category));

  useEffect(() => {
    if (!selectedVideo) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedVideo(null); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [selectedVideo]);

  return (
    <article>
      <Seo title="Video Hub | MedLink VA" description="Watch MedLink VA training, Virtual Medical Assistant skills, healthcare administration, career guidance, workflow automation, and service videos." />
      <PageHero
        eyebrow="MedLink VA Video Hub"
        title="Learn, Explore, and Grow with MedLink VA"
        description="Watch practical training, career, healthcare administration, and workflow videos designed for aspiring Virtual Medical Assistants, healthcare professionals, and practice teams."
        actions={[{ label: "Explore Training", to: "/classes", variant: "primary" }, { label: "View Services", to: "/services", variant: "secondary" }]}
      />

      {!videos.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><EmptyState title="Videos are coming soon" description="Explore our training programmes and resources while new video content is being prepared." action={{ label: "Explore Training", to: "/classes" }} footer={<Link to="/resources" className="btn-secondary">Browse Resources</Link>} /></HomeSection> : (
        <>
          {featuredVideo ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Featured Video" title={featuredVideo.video.title} description={featuredVideo.video.shortDescription || "Explore a practical MedLink VA video."} /><div className="mt-8 grid gap-8 overflow-hidden rounded-3xl border border-brand-border bg-white p-4 shadow-soft sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><VideoThumbnail video={featuredVideo.video} playback={featuredVideo.playback} onWatch={() => setSelectedVideo(featuredVideo.video)} featured /><div className="space-y-4"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><span>{categoryLabels[featuredVideo.video.category]}</span>{featuredVideo.video.duration ? <span>{featuredVideo.video.duration}</span> : null}{featuredVideo.video.publishedAt ? <span>{formatDate(featuredVideo.video.publishedAt)}</span> : null}</div><p className="text-base leading-7 text-brand-charcoal/80">{featuredVideo.video.shortDescription || "Watch this featured video from MedLink VA."}</p><button type="button" className="btn-primary" onClick={() => setSelectedVideo(featuredVideo.video)}>Watch Video</button></div></div></HomeSection> : null}

          <HomeSection className="bg-white py-16 sm:py-20"><SectionHeading eyebrow="Browse the video hub" title="Find videos for your next step" description="Filter practical videos by topic, then watch on the page when you find a useful starting point." /><div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="Video categories"><button type="button" aria-pressed={selectedCategory === "all"} className={filterClass(selectedCategory === "all")} onClick={() => setSelectedCategory("all")}>All</button>{availableCategories.map((category) => <button key={category} type="button" aria-pressed={selectedCategory === category} className={filterClass(selectedCategory === category)} onClick={() => setSelectedCategory(category)}>{categoryLabels[category]}</button>)}</div><div className="mt-10"><SectionHeading eyebrow={selectedCategory === "all" ? "Latest videos" : categoryLabels[selectedCategory]} title="Practical ideas you can watch and use" description="Explore the latest published videos from MedLink VA." /><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filteredVideos.slice(0, 9).map(({ video, playback }) => <VideoCard key={video._id} video={video} playback={playback} onWatch={() => setSelectedVideo(video)} />)}</div></div></HomeSection>

          {trainingVideos.length ? <VideoCollectionSection eyebrow="Training & Career Videos" title="Training & Career Videos" description="Practical videos to help aspiring and developing Virtual Medical Assistants build confidence, understand healthcare workflows, and prepare for professional opportunities." videos={trainingVideos} action={{ label: "Explore Training", to: "/classes" }} onWatch={setSelectedVideo} /> : null}
          {practiceVideos.length ? <VideoCollectionSection eyebrow="For Healthcare Practices" title="For Healthcare Practices" description="Explore videos on administrative workflows, virtual support, patient coordination, and ways remote assistance can strengthen day-to-day practice operations." videos={practiceVideos} action={{ label: "Book a Consultation", to: "/book-consultation" }} onWatch={setSelectedVideo} /> : null}
          <NewsletterSection />
          <PageCta title="Ready to take the next step?" description="Explore MedLink VA training or speak with our team about healthcare administrative support." primaryAction={{ label: "Explore Training", to: "/classes" }} secondaryAction={{ label: "Book a Consultation", to: "/book-consultation" }} />
        </>
      )}

      {selectedVideo ? <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} /> : null}
    </article>
  );
}

function filterClass(active: boolean) { return `rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${active ? "border-brand-accent bg-brand-accent text-white" : "border-brand-border bg-white text-brand-navy hover:bg-brand-muted"}`; }

function VideoThumbnail({ video, playback, onWatch, featured = false }: { video: VideoContentDocument; playback: VideoPlayback; onWatch: () => void; featured?: boolean }) {
  const thumbnail = videoThumbnail(video, playback);
  return <button type="button" className={`group relative block w-full overflow-hidden rounded-2xl bg-brand-navy text-left ${featured ? "aspect-video" : "aspect-video"}`} onClick={() => { trackEvent("video_open", { video_title: video.title, video_category: categoryLabels[video.category], video_provider: playback.provider }); onWatch(); }} aria-label={`Watch ${video.title}`}><>{thumbnail ? <img src={thumbnail} alt={video.thumbnailAltText || video.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" width="1280" height="720" loading={featured ? "eager" : "lazy"} decoding="async" /> : <span className="flex h-full items-center justify-center px-6 text-center text-sm text-white/80">Watch video</span>}<span className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 transition-colors group-hover:bg-brand-navy/35"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-accent shadow-soft" aria-hidden="true">▶</span></span></></button>;
}

function VideoCard({ video, playback, onWatch }: { video: VideoContentDocument; playback: VideoPlayback; onWatch: () => void }) { return <article className="surface-card flex h-full flex-col overflow-hidden"><VideoThumbnail video={video} playback={playback} onWatch={onWatch} /><div className="flex flex-1 flex-col gap-3 p-5"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent"><span>{categoryLabels[video.category]}</span>{video.duration ? <span>{video.duration}</span> : null}</div><h3 className="text-xl font-semibold text-brand-navy">{video.title}</h3><p className="text-sm leading-6 text-brand-charcoal/80">{video.shortDescription || "Watch a practical video from MedLink VA."}</p>{video.publishedAt ? <p className="text-xs text-brand-charcoal/60">{formatDate(video.publishedAt)}</p> : null}<button type="button" className="btn-secondary mt-auto w-fit" onClick={() => { trackEvent("video_open", { video_title: video.title, video_category: categoryLabels[video.category], video_provider: playback.provider }); onWatch(); }}>Watch Video</button></div></article>; }

function VideoCollectionSection({ eyebrow, title, description, videos, action, onWatch }: { eyebrow: string; title: string; description: string; videos: Array<{ video: VideoContentDocument; playback: VideoPlayback }>; action: { label: string; to: string }; onWatch: (video: VideoContentDocument) => void }) { return <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow={eyebrow} title={title} description={description} /><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{videos.slice(0, 3).map(({ video, playback }) => <VideoCard key={video._id} video={video} playback={playback} onWatch={() => onWatch(video)} />)}</div><Link to={action.to} className="btn-primary mt-8">{action.label}</Link></HomeSection>; }

function VideoModal({ video, onClose }: { video: VideoContentDocument; onClose: () => void }) { const playback = resolveVideoPlayback(video); if (!playback) return null; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/80 p-4" role="dialog" aria-modal="true" aria-label={video.title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="w-full max-w-4xl rounded-3xl bg-white p-4 shadow-2xl sm:p-6"><div className="mb-4 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">{categoryLabels[video.category]}</p><h2 className="mt-2 text-xl font-semibold text-brand-navy">{video.title}</h2></div><button type="button" className="btn-secondary shrink-0 px-4" onClick={onClose} aria-label="Close video">Close</button></div><div className="aspect-video overflow-hidden rounded-2xl bg-black"><iframe className="h-full w-full" src={playback.embedUrl} title={`Video player: ${video.title}`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div></div></div>; }
