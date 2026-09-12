import { HomeSection } from "../home/HomeSection";
import { SectionHeading } from "../home/SectionHeading";
import { useCmsBundle } from "../../lib/cms/SiteContentProvider";
import { sanityImageSrc } from "../../lib/sanity/image";

type TestimonialAudience = "trainee" | "client" | "practice";

export function TestimonialSection({
  audiences,
  limit = 4,
}: {
  audiences?: readonly TestimonialAudience[];
  limit?: number;
}) {
  const testimonials = (useCmsBundle()?.testimonials ?? [])
    .filter(
      (testimonial) =>
        !audiences?.length ||
        (testimonial.audience
          ? audiences.includes(testimonial.audience)
          : false),
    )
    .slice(0, limit);

  if (!testimonials.length) return null;

  return (
    <HomeSection className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people have shared about MedLink VA"
        description="Feedback from trainees, clients, and healthcare professionals who have engaged with MedLink VA."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {testimonials.map((testimonial) => {
          const photo = sanityImageSrc(testimonial.photo, {
            width: 160,
            height: 160,
          });

          return (
            <blockquote key={testimonial._id} className="surface-card p-6">
              <p className="text-lg leading-8 text-brand-navy">
                “{testimonial.quote}”
              </p>

              <footer className="mt-5 flex items-center gap-3 text-sm text-brand-charcoal/70">
                {photo ? (
                  <img
                    src={photo}
                    alt={
                      testimonial.altText ||
                      `${testimonial.clientName} photo`
                    }
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}

                <span>
                  <strong className="text-brand-navy">
                    {testimonial.clientName}
                  </strong>
                  {testimonial.clientRole
                    ? `, ${testimonial.clientRole}`
                    : ""}
                  {testimonial.organization
                    ? ` · ${testimonial.organization}`
                    : ""}
                </span>
              </footer>
            </blockquote>
          );
        })}
      </div>
    </HomeSection>
  );
}