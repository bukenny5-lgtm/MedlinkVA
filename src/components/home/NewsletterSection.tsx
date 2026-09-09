import { FormEvent, useState } from "react";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";
import { submitLeadForm } from "../../lib/leads/api";
import { readTrimmedOptionalField } from "../../lib/leads/formData";

export function NewsletterSection() {
  const { newsletter } = resolveHomeContent(useCmsBundle());
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string>(newsletter.notice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tone, setTone] = useState<"idle" | "success" | "error" | "loading">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setTone("error");
      setNotice("Enter an email address to join the newsletter.");
      return;
    }

    setIsSubmitting(true);
    setTone("loading");
    setNotice("Sending your signup...");

    const result = await submitLeadForm("/api/newsletter", {
      email: trimmedEmail,
      website: readTrimmedOptionalField(formData, "website"),
    });

    if (result.ok) {
      setTone("success");
      setNotice(result.message);
      setEmail("");
      form.reset();
    } else {
      setTone("error");
      setNotice(
        result.configuration
          ? "We couldn’t complete your signup right now. Please try again later."
          : result.message,
      );
    }

    setIsSubmitting(false);
  };

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <SectionHeading
          eyebrow={newsletter.eyebrow}
          title={newsletter.title}
          description={newsletter.description}
        />

        <div className="surface-card p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-brand-navy">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={newsletter.placeholder}
                className="h-11 w-full rounded-full border border-brand-border bg-white px-4 text-sm text-brand-charcoal outline-none transition-colors placeholder:text-brand-charcoal/45 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </label>

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="newsletter-website">Website</label>
              <input id="newsletter-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <p className="text-xs leading-6 text-brand-charcoal/70">{newsletter.consent}</p>

            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : newsletter.cta}
            </button>

            <p
              className={[
                "text-xs font-medium",
                tone === "error" ? "text-red-600" : tone === "success" ? "text-brand-accent" : "text-brand-charcoal/70",
              ].join(" ")}
              aria-live="polite"
            >
              {notice}
            </p>
          </form>
        </div>
      </div>
    </HomeSection>
  );
}
