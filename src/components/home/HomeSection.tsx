import type { ReactNode } from "react";

type HomeSectionProps = {
  className?: string;
  children: ReactNode;
  id?: string;
};

export function HomeSection({ className = "bg-white py-16 sm:py-20", children, id }: HomeSectionProps) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

