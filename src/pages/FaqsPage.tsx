import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { HomeSection } from "../components/home/HomeSection";
import { SectionHeading } from "../components/home/SectionHeading";
import { PageCta } from "../components/shared/PageCta";
import { PageHero } from "../components/shared/PageHero";
import { ResponsiveDisclosure } from "../components/shared/ResponsiveDisclosure";
import { useCmsBundle } from "../lib/cms/SiteContentProvider";
import { toPlainText } from "../lib/cms/siteContent";
import type { FaqDocument } from "../lib/sanity/types";

function categoryLabel(value?: string) {
  const normalized = value?.trim();
  if (!normalized) return "General";
  return normalized
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryKey(value?: string) {
  return value?.trim().toLowerCase() || "general";
}

function answerText(faq: FaqDocument) {
  return faq.answer?.length ? toPlainText(faq.answer) : "Contact MedLink VA to discuss this question.";
}

export function FaqsPage() {
  const bundle = useCmsBundle();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const selectedCategory = searchParams.get("category") ?? "all";
  const activeFaqs = useMemo(() => (bundle?.faqs ?? []).filter((faq) => faq.active !== false), [bundle?.faqs]);
  const categories = useMemo(() => Array.from(new Map(activeFaqs.map((faq) => [categoryKey(faq.category), categoryLabel(faq.category)])).entries()), [activeFaqs]);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredFaqs = activeFaqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || categoryKey(faq.category) === selectedCategory;
    const searchableText = `${faq.question} ${answerText(faq)} ${categoryLabel(faq.category)}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
  const groupedFaqs = useMemo(() => {
    const groups = new Map<string, { label: string; faqs: FaqDocument[] }>();
    filteredFaqs.forEach((faq) => {
      const key = categoryKey(faq.category);
      const group = groups.get(key) ?? { label: categoryLabel(faq.category), faqs: [] };
      group.faqs.push(faq);
      groups.set(key, group);
    });
    return Array.from(groups.values());
  }, [filteredFaqs]);
  const structuredFaqs = filteredFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: answerText(faq) },
  }));

  function selectCategory(category: string) {
    const next = new URLSearchParams(searchParams);
    if (category === "all") next.delete("category");
    else next.set("category", category);
    setSearchParams(next, { replace: true });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return <article>
    <Seo title="FAQs | MedLink VA" description="Find answers to common questions about MedLink VA training, Virtual Medical Assistant support, hiring, certificates, privacy, consultations, and services." structuredData={structuredFaqs.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: structuredFaqs } : undefined} />
    <PageHero eyebrow="Frequently Asked Questions" title="Answers to common questions about MedLink VA" description="Find answers to common questions about training, Virtual Medical Assistant support, hiring, certificates, privacy, consultations, and how MedLink VA works." />

    <HomeSection className="bg-brand-background py-12 sm:py-16"><div className="mx-auto max-w-4xl"><SectionHeading eyebrow="Find an answer" title="Browse or search the FAQs" description="Choose a topic or search across the questions and answers published by MedLink VA." /><form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={submitSearch}><label htmlFor="faq-search" className="sr-only">Search FAQs</label><input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search FAQs" className="min-h-12 flex-1 rounded-full border border-brand-navy/15 bg-white px-5 text-base text-brand-navy outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20" /><button type="submit" className="btn-primary justify-center">Search</button>{query ? <button type="button" className="btn-secondary justify-center" onClick={() => setQuery("")}>Clear search</button> : null}</form><div className="mt-6 flex flex-wrap gap-3" aria-label="FAQ categories"><button type="button" className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${selectedCategory === "all" ? "border-brand-accent bg-brand-accent text-white" : "border-brand-border bg-white text-brand-navy hover:border-brand-accent"}`} aria-pressed={selectedCategory === "all"} onClick={() => selectCategory("all")}>All</button>{categories.map(([key, label]) => <button key={key} type="button" className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${selectedCategory === key ? "border-brand-accent bg-brand-accent text-white" : "border-brand-border bg-white text-brand-navy hover:border-brand-accent"}`} aria-pressed={selectedCategory === key} onClick={() => selectCategory(key)}>{label}</button>)}</div></div></HomeSection>

    <HomeSection className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-4xl">{groupedFaqs.length ? groupedFaqs.map((group) => <section key={group.label} className="mb-12 last:mb-0"><h2 className="heading-section">{group.label}</h2><div className="mt-6 space-y-4">{group.faqs.map((faq) => <ResponsiveDisclosure key={faq._id} title={faq.question}><p>{answerText(faq)}</p></ResponsiveDisclosure>)}</div></section>) : <div className="surface-card p-6 text-center"><h2 className="text-xl font-semibold text-brand-navy">No matching FAQs found.</h2><p className="mt-2 text-sm leading-7 text-brand-charcoal/75">Try another topic or clear your search.</p><button type="button" className="btn-secondary mt-5" onClick={() => { setQuery(""); selectCategory("all"); }}>Clear filters</button></div>}</div></HomeSection>

    <PageCta eyebrow="Still have a question?" title="Need help with something not covered here?" description="If you cannot find the answer you need, contact MedLink VA or book a consultation and we can point you in the right direction." primaryAction={{ label: "Contact MedLink VA", to: "/contact" }} secondaryAction={{ label: "Book a Consultation", to: "/book-consultation" }} />
  </article>;
}
