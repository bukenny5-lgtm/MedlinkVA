type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  centeredMaxWidthClass?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  centeredMaxWidthClass = "mx-auto max-w-3xl",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const maxWidthClass = align === "center" ? centeredMaxWidthClass : "max-w-3xl";

  return (
    <div className={`${alignClass} space-y-3`}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-sky">{eyebrow}</p>
      <h2 className={`text-2xl font-semibold tracking-tight text-brand-navy sm:text-3xl ${maxWidthClass}`}>
        {title}
      </h2>
      <p className={`${maxWidthClass} text-base leading-7 text-brand-charcoal/80`}>{description}</p>
    </div>
  );
}

