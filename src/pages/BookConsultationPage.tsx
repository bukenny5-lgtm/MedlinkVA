import { FormEvent, useState } from "react";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { InfoCard } from "../components/shared/InfoCard";
import { FormField } from "../components/shared/FormField";
import { PhoneFieldGroup } from "../components/shared/PhoneFieldGroup";
import { clientAssets } from "../lib/assets";
import { consultationContent } from "../content/contact";
import { submitLeadForm } from "../lib/leads/api";
import { readMultiValueField, readTrimmedField, readTrimmedOptionalField } from "../lib/leads/formData";
import { normalizePhoneNumber } from "../../functions/_shared/phone";

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
  const [statusMessage, setStatusMessage] = useState<string>(consultationContent.form.notice);
  const [statusTone, setStatusTone] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatusTone("loading");
    setStatusMessage("Sending your consultation request...");
    setPhoneError("");

    const phone = readTrimmedOptionalField(formData, "consult-phone");
    const phoneCountry = readTrimmedField(formData, "consult-phone-country");
    const normalizedPhone = normalizePhoneNumber(phone, phoneCountry);

    if (normalizedPhone.error) {
      setStatusTone("error");
      setStatusMessage(normalizedPhone.error);
      setPhoneError(normalizedPhone.error);
      setIsSubmitting(false);
      return;
    }

    const result = await submitLeadForm("/api/consultation", {
      "consult-first-name": readTrimmedField(formData, "consult-first-name"),
      "consult-last-name": readTrimmedField(formData, "consult-last-name"),
      "consult-email": readTrimmedField(formData, "consult-email"),
      "consult-phone": normalizedPhone.normalized ?? "",
      "consult-phone-country": phoneCountry,
      "consult-organization": readTrimmedField(formData, "consult-organization"),
      "consult-practice-type": readTrimmedField(formData, "consult-practice-type"),
      "services-of-interest": readMultiValueField(formData, "services-of-interest"),
      "preferred-contact-method": readTrimmedField(formData, "preferred-contact-method"),
      "consult-support-needs": readTrimmedField(formData, "consult-support-needs"),
      "consult-availability": readTrimmedOptionalField(formData, "consult-availability"),
      website: readTrimmedOptionalField(formData, "website"),
    });

    if (result.ok) {
      setStatusTone("success");
      setStatusMessage(result.message);
      form.reset();
    } else {
      setStatusTone("error");
      setStatusMessage(
        result.configuration
          ? "We couldn’t send your request right now. Please use the Contact page to reach us directly."
          : result.message,
      );
    }

    setIsSubmitting(false);
  };

  return (
    <article className="space-y-12">
      <Seo
        title="Book a Consultation | MedLink VA"
        description="Book a consultation with Medlink VA through a secure request form that captures business context, preferred contact details, and support needs."
        image={clientAssets.supportPhoto}
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
          title="Let’s understand your practice priorities"
          description={consultationContent.introduction}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {consultationContent.trustPoints.map((point) => (
            <InfoCard key={point} title={point} />
          ))}
        </div>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="What happens next"
              title="From your request to a useful conversation"
              description="Share your priorities below. We’ll review your request and get in touch to discuss next steps."
            />

            <div className="space-y-4">
              {consultationContent.whatHappensNext.map((item, index) => (
                <InfoCard key={item} eyebrow={`Step ${index + 1}`} title={item} />
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

              <div className="space-y-5">
                {renderConsultationField("consult-email")}
                <PhoneFieldGroup
                  phoneFieldId="consult-phone"
                  countryFieldId="consult-phone-country"
                  phoneLabel="Phone"
                  hint="Optional, but helpful if you prefer a phone follow-up. Choose a country if you enter a local number."
                  error={phoneError}
                  onChange={() => setPhoneError("")}
                />
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

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="consult-website">Website</label>
                <input id="consult-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <p className="rounded-2xl border border-brand-border bg-brand-muted/40 px-4 py-3 text-sm leading-7 text-brand-charcoal/75">
                {consultationContent.form.privacyNote}
              </p>

              <p className="text-sm leading-6 text-brand-charcoal/70">
                {consultationContent.schedulePrompt}
              </p>

              <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : consultationContent.form.submitLabel}
              </button>

              <p
                className={[
                  "text-sm leading-6",
                  statusTone === "error" ? "text-red-600" : statusTone === "success" ? "text-brand-accent" : "text-brand-charcoal/70",
                ].join(" ")}
                aria-live="polite"
              >
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
