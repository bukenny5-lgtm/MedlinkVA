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
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { resolveContactCardData } from "../lib/cms/siteContent";
import { submitLeadForm } from "../lib/leads/api";
import { readTrimmedField, readTrimmedOptionalField } from "../lib/leads/formData";
import { siteContent } from "../content/site";
import { contactContent } from "../content/contact";
import { normalizePhoneNumber } from "../../functions/_shared/phone";

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
  const [statusMessage, setStatusMessage] = useState<string>(contactContent.form.notice);
  const [statusTone, setStatusTone] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const cmsContact = resolveContactCardData(useCmsBundle());

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatusTone("loading");
    setStatusMessage("Sending your message...");
    setPhoneError("");

    const phone = readTrimmedOptionalField(formData, "contact-phone");
    const phoneCountry = readTrimmedField(formData, "contact-phone-country");
    const normalizedPhone = normalizePhoneNumber(phone, phoneCountry);

    if (normalizedPhone.error) {
      setStatusTone("error");
      setStatusMessage(normalizedPhone.error);
      setPhoneError(normalizedPhone.error);
      setIsSubmitting(false);
      return;
    }

    const result = await submitLeadForm("/api/contact", {
      "contact-first-name": readTrimmedField(formData, "contact-first-name"),
      "contact-last-name": readTrimmedField(formData, "contact-last-name"),
      "contact-email": readTrimmedField(formData, "contact-email"),
      "contact-phone": normalizedPhone.normalized ?? "",
      "contact-phone-country": phoneCountry,
      "contact-organization": readTrimmedOptionalField(formData, "contact-organization"),
      "contact-service": readTrimmedField(formData, "contact-service"),
      "contact-message": readTrimmedField(formData, "contact-message"),
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
          ? "We couldn’t send your message right now. Please contact us by email, phone, or WhatsApp."
          : result.message,
      );
    }

    setIsSubmitting(false);
  };

  return (
    <article className="space-y-12">
      <Seo
        title="Contact MedLink VA"
        description="Send Medlink VA a business inquiry or support question through a secure contact form that keeps sensitive patient details out of the public page."
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
          {cmsContact.contactDetails.map((detail) => (
            <InfoCard
              key={detail.label}
              eyebrow={detail.label}
              title={detail.value}
              footer={
                "href" in detail ? (
                  <a
                    href={detail.href}
                    className="inline-flex text-sm font-semibold text-brand-accent transition-colors hover:text-brand-navy"
                  >
                    {detail.label === "Phone" ? "Call MedLink VA" : "Email MedLink VA"}
                  </a>
                ) : null
              }
            />
          ))}
        </div>
        <a href={siteContent.whatsappUrl} className="btn-primary mt-6 w-full sm:w-auto" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span className="sr-only">(opens in a new tab)</span></a>
      </HomeSection>

      <HomeSection className="bg-white py-16 sm:py-20">
        <div className="grid min-w-0 items-start gap-8 pb-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={contactContent.form.title}
              title="Send us a message"
              description={contactContent.form.privacyNote}
            />

            <div className="space-y-4">
              {contactContent.alternativeMethods.map((method) => (
                <InfoCard key={method.title} title={method.title} description={method.description} />
              ))}
            </div>

            <InfoCard
              eyebrow="What to expect"
              title="Start a useful conversation"
              description="Tell us what you need help with so we can respond with relevant next steps."
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
              <PhoneFieldGroup
                phoneFieldId="contact-phone"
                countryFieldId="contact-phone-country"
                phoneLabel="Phone"
                hint="Optional. Choose a country if you enter a local number without a +country code."
                error={phoneError}
                onChange={() => setPhoneError("")}
              />
              {renderContactField("contact-organization")}
              {renderContactField("contact-service")}
              {renderContactField("contact-message")}

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <p className="rounded-2xl border border-brand-border bg-brand-muted/40 px-4 py-3 text-sm leading-7 text-brand-charcoal/75">
                {contactContent.form.privacyNote}
              </p>

              <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : contactContent.form.submitLabel}
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
        title="Prefer a deeper conversation before filling out the form?"
        description={contactContent.consultationPrompt}
        primaryAction={{ label: "Book a Consultation", to: "/book-consultation" }}
        secondaryAction={{ label: "View Services", to: "/services" }}
      />
    </article>
  );
}
