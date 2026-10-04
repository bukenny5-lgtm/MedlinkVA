import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { EmptyState } from "../components/shared/EmptyState";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { ResponsiveDisclosure } from "../components/shared/ResponsiveDisclosure";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import {
  resolveClassesContent,
  toPlainText,
} from "../lib/cms/siteContent";
import { sanityImageSrc } from "../lib/sanity/image";
import { TestimonialSection } from "../components/shared/TestimonialSection";
import { trackTrainingCheckoutClick, trackTrainingCtaClick, trackTrainingOpen } from "../lib/analytics";
import practicalLearningImage from "../assets/training/training-hero-learning.webp";
import skillsWorkflowImage from "../assets/training/training-skills-workflow.webp";
import trainingJourneyImage from "../assets/training/training-how-it-works.webp";

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: value.includes("T") ? "short" : undefined,
  }).format(date);
}

export function ClassesPage() {
  const classesContent = resolveClassesContent(useCmsBundle());

  const upcoming = classesContent.records.filter(
    (item) => item.status === "upcoming" || item.status === "enrolling",
  );

  return (
    <article className="space-y-12">
      <Seo
        title="Virtual Medical Assistant Training | MedLink VA"
        description="Explore practical Virtual Medical Assistant training for healthcare administrative workflows, remote support roles, and developing VMA skills."
      />

      <PageHero
        eyebrow={classesContent.hero.eyebrow}
        title={classesContent.hero.title}
        description={classesContent.hero.description}
        actions={classesContent.hero.actions}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Why train with MedLink VA"
          title="Learn the work behind confident healthcare support"
          description="Training is designed for aspiring VMAs, developing assistants, healthcare professionals moving into remote work, and teams building practical administrative capability."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <img src={practicalLearningImage} alt="Learner building practical remote healthcare support skills" width="1400" height="788" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-soft" loading="lazy" decoding="async" />
          <div className="grid gap-5">
          {classesContent.whyTrain.map((item) => (
            <a key={item.title} href="#skills" className="surface-card group p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
              <h3 className="text-xl font-semibold text-brand-navy">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">
                {item.description}
              </p>
              <span className="mt-4 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">Explore this focus →</span>
            </a>
          ))}
          </div>
        </div>
      </HomeSection>

      <HomeSection id="programmes" className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="Training programmes"
          title="Choose a learning path that fits your goals"
          description="MedLink VA offers different training pathways depending on where you are starting and how much support you need. Compare the programmes below, see what each one covers, and choose the option that best matches your experience, learning goals, and preferred level of guidance."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {classesContent.tiers.map((tier) => (
            <article
              key={tier.name}
              className={`surface-card flex h-full flex-col p-6 ${
                tier.badge === "Most Popular"
                  ? "border-brand-accent shadow-[0_0_0_2px_rgb(20_105_160_/_0.12)]"
                  : ""
              }`}
            >
              {tier.badge ? (
                <p className="mb-3 inline-flex w-fit rounded-full bg-brand-sky/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
                  {tier.badge}
                </p>
              ) : null}

              <h3 className="text-2xl font-semibold text-brand-navy">
                {tier.name}
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">
                {tier.description}
              </p>

              <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1 border-y border-brand-border py-4">
                <p className="text-3xl font-bold text-brand-navy">
                  {tier.price}
                </p>
                <p className="text-sm text-brand-charcoal/70">
                  {tier.duration}
                </p>
              </div>

              <ul className="mt-5 flex-1 space-y-3 text-sm leading-6 text-brand-charcoal/80">
                {tier.delivery.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {tier.trainingMode === "group" && tier.paymentUrl ? (
                <a
                  href={tier.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 w-full"
                  onClick={() => trackTrainingCheckoutClick(tier.name, tier.paymentUrl!)}
                >
                  {tier.paymentCtaLabel ?? "Enrol & Pay"}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ) : tier.trainingMode === "one-on-one" ? (
                <>
                  <Link
                    to="/book-consultation"
                    className="btn-primary mt-6 w-full"
                    onClick={() => trackTrainingCtaClick(tier.name, "Book a Training Consultation", "/book-consultation", { trainingMode: "one-on-one", destinationType: "consultation" })}
                  >
                    Book a Training Consultation
                  </Link>
                  <p className="mt-3 text-xs leading-5 text-brand-charcoal/70">One-on-one training is scheduled individually. Book a consultation to discuss suitable training dates, availability, and the next steps before payment.</p>
                </>
              ) : tier.trainingMode === "other" ? (
                <Link
                  to={tier.ctaLabel === "Book a Consultation" ? "/book-consultation" : "/contact"}
                  className="btn-primary mt-6 w-full"
                  onClick={() => trackTrainingCtaClick(tier.name, tier.ctaLabel, tier.ctaLabel === "Book a Consultation" ? "/book-consultation" : "/contact")}
                >
                  {tier.ctaLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Upcoming training & webinars"
          title={
            upcoming.length
              ? "Join a published learning opportunity"
              : "No upcoming live sessions are currently published"
          }
          description={
            upcoming.length
              ? "Explore the current learning opportunities below and choose the next step that fits you."
              : "Explore our training programmes or contact MedLink VA to ask about the next intake."
          }
        />

        <div className="mt-8">
          {upcoming.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {upcoming.map((item) => (
                <UpcomingCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No upcoming live sessions"
              description="Training programme information is available above, and our team can answer questions about future sessions."
              action={{
                label: "Contact MedLink VA",
                to: "/contact",
              }}
            />
          )}
        </div>
      </HomeSection>

      <HomeSection id="skills" className="bg-white py-16 sm:py-20">
        <SectionHeading
          eyebrow="What you can learn"
          title="Skills you can use in real healthcare support work"
          description="Training covers the practical areas Virtual Medical Assistants are likely to encounter in real administrative roles. The exact topics vary by programme, but the focus remains on organized workflows, professional communication, responsible information handling, and career preparation."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <img src={skillsWorkflowImage} alt="Healthcare administrative workflow used to support practical training" width="1400" height="788" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-soft" loading="lazy" decoding="async" />
          <div className="grid gap-5 md:grid-cols-2">
          {classesContent.topics.map((topic) => (
            <article key={topic.title} className="surface-card p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg">
              <h3 className="text-xl font-semibold text-brand-navy">{topic.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">{topic.description}</p>
            </article>
          ))}
          </div>
        </div>
      </HomeSection>

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="How training works"
          title="A clear path from choosing a programme to completing it"
          description="Each programme has its own format, but the overall learning journey is designed to help you move from choosing a pathway to building practical skills, receiving guidance, and completing the programme with a clearer understanding of remote healthcare support work."
        />

        <img src={trainingJourneyImage} alt="Illustration of a learner's journey through a training programme" width="1400" height="788" className="mx-auto mt-8 aspect-[16/6] w-full max-w-5xl rounded-[1.5rem] object-cover shadow-soft" loading="lazy" decoding="async" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {classesContent.journey.map((step) => (
            <a key={step.number} href="#programmes" className="surface-card group p-5 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent" onClick={() => trackTrainingOpen("training_path_open", "#programmes")}>
              <p className="text-sm font-bold tracking-[0.2em] text-brand-accent">
                {step.number}
              </p>

              <h3 className="mt-3 text-lg font-semibold text-brand-navy">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-brand-charcoal/75">
                {step.description}
              </p>
              <span className="mt-4 inline-flex font-semibold text-brand-accent transition-transform group-hover:translate-x-1">View programmes →</span>
            </a>
          ))}
        </div>
      </HomeSection>

      <TestimonialSection audiences={["trainee"]} />

      {classesContent.trainingFaqs.length ? (
        <HomeSection id="faqs" className="scroll-mt-24 bg-brand-background py-16 sm:py-20">
          <SectionHeading
            eyebrow="Training FAQs"
            title="Questions about learning with MedLink VA"
            description="Find answers to common questions about MedLink VA training, enrolment, and learning support."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {classesContent.trainingFaqs.map((faq) => (
              <ResponsiveDisclosure key={faq._id} title={faq.question}>
                <p>{toPlainText(faq.answer)}</p>
              </ResponsiveDisclosure>
            ))}
          </div>
          <Link to="/faqs" className="mt-6 inline-flex font-semibold text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">View all FAQs →</Link>
        </HomeSection>
      ) : null}

      <PageCta
        title={classesContent.stayInTouch.title}
        description={classesContent.stayInTouch.description}
        primaryAction={classesContent.stayInTouch.primaryAction}
        secondaryAction={classesContent.stayInTouch.secondaryAction}
      />
    </article>
  );
}

function UpcomingCard({
  item,
}: {
  item: ReturnType<typeof resolveClassesContent>["records"][number];
}) {
  const date = formatDate(item.startDate ?? item.date);
  const groupPaymentUrl = item.trainingMode === "group" && item.paymentUrl?.startsWith("https://") ? item.paymentUrl : null;

  const instructors = item.instructorNames?.length
    ? item.instructorNames.join(", ")
    : item.instructor;

  return (
    <article className="surface-card overflow-hidden">
      {item.image ? (
        <img
          src={
            sanityImageSrc(item.image, {
              width: 1200,
              height: 900,
            }) ?? ""
          }
          alt={item.altText || item.title}
          className="aspect-[4/3] w-full object-cover"
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
      ) : null}

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
          <span>
            {item.status === "enrolling" ? "Enrolling" : "Upcoming"}
          </span>

          {date ? <span>{date}</span> : null}

          {item.duration ? <span>{item.duration}</span> : null}
        </div>

        <h3 className="text-2xl font-semibold text-brand-navy">
          {item.title}
        </h3>

        <p className="text-sm leading-7 text-brand-charcoal/80">
          {item.shortDescription}
        </p>

        {instructors ? (
          <p className="text-sm text-brand-charcoal/70">
            Instructor: {instructors}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          {groupPaymentUrl ? (
            <a href={groupPaymentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => trackTrainingCheckoutClick(item.title, groupPaymentUrl)}>
              {item.paymentCtaLabel ?? "Enrol & Pay"} <span aria-hidden="true">↗</span>
            </a>
          ) : item.trainingMode === "one-on-one" ? (
            <Link to="/book-consultation" className="btn-primary" onClick={() => trackTrainingCtaClick(item.title, "Book a Training Consultation", "/book-consultation", { trainingMode: "one-on-one", destinationType: "consultation" })}>
              Book a Training Consultation
            </Link>
          ) : item.registrationUrl ? (
            <a href={item.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => trackTrainingCtaClick(item.title, item.callToActionLabel ?? "Register", item.registrationUrl ?? "")}>
              {item.callToActionLabel ?? "Register"}
            </a>
          ) : (
            <Link to="/contact" className="btn-secondary">Ask About This Session</Link>
          )}
        </div>
      </div>
    </article>
  );
}