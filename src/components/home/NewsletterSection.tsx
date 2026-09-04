import { FormEvent, useState } from "react";
import { HomeSection } from "./HomeSection";
import { SectionHeading } from "./SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { resolveHomeContent } from "../../lib/cms/siteContent";

export function NewsletterSection() {
  const { newsletter } = resolveHomeContent(useCmsBundle());
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState(newsletter.notice);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(newsletter.notice);
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
              />
            </label>

            <p className="text-xs leading-6 text-brand-charcoal/70">{newsletter.consent}</p>

            <button type="submit" className="btn-primary w-full">
              {newsletter.cta}
            </button>

            <p className="text-xs font-medium text-brand-accent" aria-live="polite">
              {notice}
            </p>
          </form>
        </div>
      </div>
    </HomeSection>
  );
}
