import { FormEvent, useState } from "react";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { FormField } from "../components/shared/FormField";
import { clientAssets } from "../lib/assets";
import { consultationContent } from "../content/contact";

const controlClass =
  "min-h-11 w-full rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-charcoal outline-none transition-colors placeholder:text-brand-charcoal/45 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";

function renderConsultationField(id: string) {
  const field = consultationContent.form.fields.find((item) => item.id === id);

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

export function BookConsultationPage() {
  const [statusMessage, setStatusMessage] = useState(consultationContent.form.notice);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(consultationContent.form.notice);
  };

  return (
    <article className="space-y-12">
      <Seo
        title="Book a Consultation | Medlink VA"
        description="Book a consultation with Medlink VA through a polished, UI-only form that captures business context, preferred contact details, and support needs."
      />

      <PageHero
        eyebrow={consultationContent.hero.eyebrow}
        title={consultationContent.hero.title}
        description={consultationContent.hero.description}
        actions={consultationContent.hero.actions}
        image={{
          src: clientAssets.supportPhoto,
          alt: "Medlink VA team member supporting a virtual healthcare workflow on a laptop",
        }}
      />

      <HomeSection className="bg-brand-background py-16 sm:py-20">
        <SectionHeading
          eyebrow="Trust & reassurance"
          title="A consultation page that stays focused on business context"
          description={consultationContent.introduction}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {consultationContent.trustPoints.map((point) => (
            <InfoCard key={point} title={point} description="Consultation page guidance" />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="What happens next"
              title="A calm handoff from form to follow-up"
              description="The form is intentionally simple and does not promise a booking system or instant confirmation."
            />

            <div className="space-y-4">
              {consultationContent.whatHappensNext.map((item, index) => (
                <InfoCard key={item} eyebrow={`Step ${index + 1}`} title={item} description="Preview guidance" />
              ))}
            </div>

            <InfoCard
              eyebrow="Service themes"
              title="The consultation can cover the current support categories"
              description="Use the form to point us toward the areas that need the most help."
              bullets={consultationContent.serviceOptions.map((option) => option.label)}
            />
          </div>

          <div className="surface-card p-6 sm:p-8">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {renderConsultationField("consult-first-name")}
                {renderConsultationField("consult-last-name")}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {renderConsultationField("consult-email")}
                {renderConsultationField("consult-phone")}
              </div>

              {renderConsultationField("consult-organization")}
              {renderConsultationField("consult-practice-type")}

              <fieldset className="rounded-3xl border border-brand-border bg-brand-muted/30 p-4 sm:p-5">
                <legend className="px-1 text-sm font-medium text-brand-navy">Services of interest *</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {consultationContent.serviceOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-charcoal shadow-soft transition-colors hover:border-brand-accent/50"
                    >
                      <input
                        type="checkbox"
                        name="services-of-interest"
                        value={option.value}
                        className="mt-1 h-4 w-4 rounded border-brand-border text-brand-accent focus:ring-brand-accent"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <FormField
                id="consult-preferred-contact"
                label="Preferred contact method"
                hint="Select the method that works best for a follow-up."
                required
              >
                <select id="consult-preferred-contact" name="preferred-contact-method" className={controlClass} defaultValue="">
                  <option value="" disabled>
                    Select a contact method
                  </option>
                  {consultationContent.contactMethodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              {renderConsultationField("consult-support-needs")}
              {renderConsultationField("consult-availability")}

              <p className="rounded-2xl border border-brand-border bg-brand-muted/40 px-4 py-3 text-sm leading-7 text-brand-charcoal/75">
                {consultationContent.form.privacyNote}
              </p>

              <p className="text-sm leading-6 text-brand-charcoal/70">
                {consultationContent.schedulePrompt}
              </p>

              <button type="submit" className="btn-primary w-full">
                {consultationContent.form.submitLabel}
              </button>

              <p className="text-sm leading-6 text-brand-accent" aria-live="polite">
                {statusMessage}
              </p>
            </form>
          </div>
        </div>
      </HomeSection>

      <PageCta
        title="Need a lighter first touch?"
        description="If you are not ready for a consultation yet, the contact page can be used for a simpler inquiry."
        primaryAction={{ label: "Contact Medlink VA", to: "/contact" }}
        secondaryAction={{ label: "View Services", to: "/services" }}
      />
    </article>
  );
}

