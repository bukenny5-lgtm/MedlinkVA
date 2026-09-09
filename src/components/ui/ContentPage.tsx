import { Link } from "react-router-dom";
import { Seo } from "../Seo";
import type { PageContent } from "../../content/pages";
import type { ReactNode } from "react";

type ContentPageProps = {
  page: PageContent;
  seoTitle?: string;
  robots?: string;
  children?: ReactNode;
};

const actionClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
} as const;

export function ContentPage({ page, seoTitle, robots, children }: ContentPageProps) {
  return (
    <article className="space-y-8">
      <Seo title={seoTitle ?? page.title} description={page.description} robots={robots} />

      <section className="surface-card space-y-6 p-6 sm:p-8 lg:p-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">{page.eyebrow}</p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
            {page.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-brand-charcoal/80 sm:text-lg">
            {page.description}
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {page.bullets.map((bullet) => (
            <li
              key={bullet}
              className="rounded-2xl border border-brand-border bg-brand-muted/40 px-4 py-3 text-sm leading-6 text-brand-charcoal"
            >
              {bullet}
            </li>
          ))}
        </ul>

        {page.actions ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {page.actions.map((action) => (
              <Link key={action.to} to={action.to} className={actionClass[action.variant ?? "secondary"]}>
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      {children}
    </article>
  );
}

