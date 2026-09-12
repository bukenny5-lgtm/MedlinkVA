import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { ResponsiveDisclosure } from "../components/shared/ResponsiveDisclosure";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveClassesContent, toPlainText } from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";
import { TestimonialSection } from "../components/shared/TestimonialSection";

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: value.includes("T") ? "short" : undefined }).format(date);
}

export function ClassesPage() {
  const classesContent = resolveClassesContent(useCmsBundle());
  const upcoming = classesContent.records.filter((item) => item.status === "upcoming" || item.status === "enrolling");

  return (
    <article className="space-y-12">
      <Seo title="Virtual Medical Assistant Training | MedLink VA" description="Explore practical Virtual Medical Assistant training for healthcare administrative workflows, remote support roles, and developing VMA skills." />
      <PageHero eyebrow={classesContent.hero.eyebrow} title={classesContent.hero.title} description={classesContent.hero.description} actions={classesContent.hero.actions} />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading eyebrow="Why train with MedLink VA" title="Learn the work behind confident healthcare support" description="Training is designed for aspiring VMAs, developing assistants, healthcare professionals moving into remote work, and teams building practical administrative capability." />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">{classesContent.whyTrain.map((item) => <article key={item.title} className="surface-card p-6"><h3 className="text-xl font-semibold text-brand-navy">{item.title}</h3><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{item.description}</p></article>)}</div>
      </HomeSection>

      <HomeSection id="programmes" className="bg-white py-16 sm:py-20">
        <SectionHeading eyebrow="Training programmes" title="Choose a learning path that fits your goals" description="Review the available pathways below, then contact MedLink VA to ask about registration and the right next step." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{classesContent.tiers.map((tier) => <article key={tier.name} className={`surface-card flex h-full flex-col p-6 ${tier.badge === "Most Popular" ? "border-brand-accent shadow-[0_0_0_2px_rgb(20_105_160_/_0.12)]" : ""}`}>
          {tier.badge ? <p className="mb-3 inline-flex w-fit rounded-full bg-brand-sky/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">{tier.badge}</p> : null}
          <h3 className="text-2xl font-semibold text-brand-navy">{tier.name}</h3><p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{tier.description}</p>
          <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1 border-y border-brand-border py-4"><p className="text-3xl font-bold text-brand-navy">{tier.price}</p><p className="text-sm text-brand-charcoal/70">{tier.duration}</p></div>
          <ul className="mt-5 flex-1 space-y-3 text-sm leading-6 text-brand-charcoal/80">{tier.delivery.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" /><span>{item}</span></li>)}</ul>
          <Link to={tier.ctaLabel === "Book a Consultation" ? "/book-consultation" : "/contact"} className="btn-primary mt-6 w-full">{tier.ctaLabel}</Link>
        </article>)}</div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading eyebrow="Upcoming training & webinars" title={upcoming.length ? "Join a published learning opportunity" : "No upcoming live sessions are currently published"} description={upcoming.length ? "Explore the current learning opportunities below and choose the next step that fits you." : "Explore our training programmes or contact MedLink VA to ask about the next intake."} />
        <div className="mt-8">{upcoming.length ? <div className="grid gap-5 lg:grid-cols-2">{upcoming.map((item) => <UpcomingCard key={item._id} item={item} />)}</div> : <EmptyState title="No upcoming live sessions" description="Training programme information is available above, and our team can answer questions about future sessions." action={{ label: "Contact MedLink VA", to: "/contact" }} />}</div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <SectionHeading eyebrow="What you can learn" title="Skills for practical healthcare administration" description="Topics vary by programme. Training focuses on administrative workflows and career preparation, not clinical licensure or clinical decision-making." />
        <div className="mt-8 grid gap-5 md:grid-cols-2">{classesContent.topics.map((topic) => <ResponsiveDisclosure key={topic.title} title={topic.title}><ul className="space-y-2">{topic.items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />{item}</li>)}</ul></ResponsiveDisclosure>)}</div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading eyebrow="How training works" title="A clear path from interest to completion" description="Each programme has its own format and support model. The journey below shows the common shape without promising identical delivery for every tier." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{classesContent.journey.map((step) => <article key={step.number} className="surface-card p-5"><p className="text-sm font-bold tracking-[0.2em] text-brand-accent">{step.number}</p><h3 className="mt-3 text-lg font-semibold text-brand-navy">{step.title}</h3><p className="mt-2 text-sm leading-6 text-brand-charcoal/75">{step.description}</p></article>)}</div>
      </HomeSection>

      <TestimonialSection audiences={["trainee"]} />

      {classesContent.trainingFaqs.length ? <HomeSection className="bg-brand-background py-16 sm:py-20"><SectionHeading eyebrow="Training FAQs" title="Questions about learning with MedLink VA" description="Answers are managed through the Training FAQ category in Sanity." /><div className="mt-8 grid gap-5 md:grid-cols-2">{classesContent.trainingFaqs.map((faq) => <ResponsiveDisclosure key={faq._id} title={faq.question}><p>{toPlainText(faq.answer)}</p></ResponsiveDisclosure>)}</div></HomeSection> : null}

      <PageCta title={classesContent.stayInTouch.title} description={classesContent.stayInTouch.description} primaryAction={classesContent.stayInTouch.primaryAction} secondaryAction={classesContent.stayInTouch.secondaryAction} />
    </article>
  );
}

function UpcomingCard({ item }: { item: ReturnType<typeof resolveClassesContent>["records"][number] }) {
  const date = formatDate(item.startDate ?? item.date);
  const instructors = item.instructorNames?.length ? item.instructorNames.join(", ") : item.instructor;
  return <article className="surface-card overflow-hidden">{item.image ? <img src={sanityImageSrc(item.image, { width: 1200, height: 900 }) ?? ""} alt={item.altText || item.title} className="aspect-[4/3] w-full object-cover" width="1200" height="900" loading="lazy" decoding="async" /> : null}<div className="space-y-4 p-6"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent"><span>{item.status === "enrolling" ? "Enrolling" : "Upcoming"}</span>{date ? <span>{date}</span> : null}{item.duration ? <span>{item.duration}</span> : null}</div><h3 className="text-2xl font-semibold text-brand-navy">{item.title}</h3><p className="text-sm leading-7 text-brand-charcoal/80">{item.shortDescription}</p>{instructors ? <p className="text-sm text-brand-charcoal/70">Instructor: {instructors}</p> : null}<div className="flex flex-wrap items-center gap-3">{item.registrationUrl ? <a href={item.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">{item.callToActionLabel ?? "Register"}</a> : <Link to="/contact" className="btn-secondary">Ask About This Session</Link>}</div></div></article>;
}
