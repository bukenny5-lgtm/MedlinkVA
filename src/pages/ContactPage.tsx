import { FormEvent, useState } from "react";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { FormField } from "../components/shared/FormField";
import { clientAssets } from "../lib/assets";
import { contactContent } from "../content/contact";

const controlClass =
  "min-h-11 w-full rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-charcoal outline-none transition-colors placeholder:text-brand-charcoal/45 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";

function renderContactField(id: string) {
  const field = contactContent.form.fields.find((item) => item.id === id);

  if (!field) {
    return null;
  }

  if (field.type === "select") {
    return (
      <FormField id={field.id} label={field.label} required={field.required} hint={field.helpText}>
        <select id={field.id} name={field.id} className={controlClass} defaultValue="">
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }

  if (field.type === "textarea") {
    return (
      <FormField id={field.id} label={field.label} required={field.required} hint={field.helpText}>
        <textarea
          id={field.id}
          name={field.id}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          className={controlClass}
        />
      </FormField>
    );
  }

  return (
    <FormField id={field.id} label={field.label} required={field.required} hint={field.helpText}>
      <input id={field.id} name={field.id} type={field.type} placeholder={field.placeholder} className={controlClass} />
    </FormField>
  );
}

export function ContactPage() {
  const [statusMessage, setStatusMessage] = useState(contactContent.form.notice);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(contactContent.form.notice);
  };

  return (
    <article className="space-y-12">
      <Seo
        title="Contact Medlink VA"
        description="Send Medlink VA a business inquiry or support question through a polished, UI-only contact form that keeps sensitive patient details out of the public page."
        image={clientAssets.supportPhoto}
      />

      <PageHero
        eyebrow={contactContent.hero.eyebrow}
        title={contactContent.hero.title}
        description={contactContent.hero.description}
        actions={contactContent.hero.actions}
        image={{
          src: clientAssets.supportPhoto,
          alt: "Medlink VA team member providing virtual support on a laptop",
        }}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Contact details"
          title="A simple way to get in touch"
          description={contactContent.introduction}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {contactContent.contactDetails.map((detail) => (
            <InfoCard
              key={detail.label}
              eyebrow={detail.label}
              title={detail.value}
              description="Centralized site content"
              footer={
                "href" in detail ? (
                  <a
                    href={detail.href}
                    className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                  >
                    {contactContent.contactLabel}
                  </a>
                ) : null
              }
            />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={contactContent.form.title}
              title="Public form preview"
              description={contactContent.form.privacyNote}
            />

            <div className="space-y-4">
              {contactContent.alternativeMethods.map((method) => (
                <InfoCard key={method.title} title={method.title} description={method.description} />
              ))}
            </div>

            <InfoCard
              eyebrow="What to expect"
              title="A measured first reply"
              description="The current version of the form is not wired to a backend yet, so this page stays transparent about its preview state."
              bullets={contactContent.faqTeaser}
            />
          </div>

          <div className="surface-card p-6 sm:p-8">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {renderContactField("contact-first-name")}
                {renderContactField("contact-last-name")}
              </div>

              {renderContactField("contact-email")}
              {renderContactField("contact-phone")}
              {renderContactField("contact-organization")}
              {renderContactField("contact-service")}
              {renderContactField("contact-message")}

              <p className="rounded-2xl border border-brand-border bg-brand-muted/40 px-4 py-3 text-sm leading-7 text-brand-charcoal/75">
                {contactContent.form.privacyNote}
              </p>

              <button type="submit" className="btn-primary w-full">
                {contactContent.form.submitLabel}
              </button>

              <p className="text-sm leading-6 text-brand-accent" aria-live="polite">
                {statusMessage}
              </p>
            </form>
          </div>
        </div>
      </HomeSection>

      <PageCta
        title="Prefer a deeper conversation before filling out the form?"
        description={contactContent.consultationPrompt}
        primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }}
        secondaryAction={{ label: "View Services", to: "/services" }}
      />
    </article>
  );
}
