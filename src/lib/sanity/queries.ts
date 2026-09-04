import { sanityClient, isSanityConfigured } from "./client";
import type { CmsBundle } from "./types";

const cmsQuery = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    businessName,
    tagline,
    contactEmail,
    phone,
    primaryCTA,
    secondaryCTA,
    socialLinks[]{
      label,
      platform,
      url
    },
    externalProductStoreUrl,
    newsletterHeading,
    newsletterText
  },
  "homepageContent": *[_type == "homepageContent"][0]{
    heroHeading,
    heroSubheading,
    trustItems,
    whyHeading,
    whyBody,
    finalCtaHeading,
    finalCtaText,
    newsletterHeading,
    newsletterText
  },
  "aboutContent": *[_type == "aboutContent"][0]{
    aboutIntro,
    mission,
    vision,
    valuesIntro
  },
  "teamMembers": *[_type == "teamMember" && active == true] | order(displayOrder asc, name asc) {
    _id,
    active,
    displayOrder,
    featured,
    fullBio,
    name,
    photo,
    role,
    shortBio,
    slug,
    altText
  },
  "services": *[_type == "service" && active == true] | order(displayOrder asc, title asc) {
    _id,
    active,
    displayOrder,
    examples,
    featured,
    fullDescription,
    image,
    shortDescription,
    slug,
    seoDescription,
    seoTitle,
    title,
    altText
  },
  "jobs": *[_type == "job" && status == "open"] | order(displayOrder asc, title asc) {
    _id,
    applicationUrl,
    closingDate,
    displayOrder,
    employmentType,
    featured,
    fullDescription,
    location,
    requirements,
    shortDescription,
    slug,
    status,
    title
  },
  "classes": *[_type == "class" && (status == "upcoming" || status == "ongoing")] | order(displayOrder asc, date asc, title asc) {
    _id,
    date,
    displayOrder,
    duration,
    featured,
    fullDescription,
    image,
    instructor,
    price,
    registrationUrl,
    shortDescription,
    slug,
    status,
    title,
    altText
  },
  "productLinks": *[_type == "productLink" && active == true] | order(displayOrder asc, name asc) {
    _id,
    active,
    ctaLabel,
    displayOrder,
    externalUrl,
    featured,
    image,
    name,
    price,
    shortDescription,
    slug,
    altText
  },
  "resourcePosts": *[_type == "resourcePost" && active == true] | order(publishedAt desc, title asc) {
    _id,
    active,
    author,
    body,
    category,
    coverImage,
    coverImageAlt,
    excerpt,
    featured,
    publishedAt,
    seoDescription,
    seoTitle,
    slug,
    title
  },
  "faqs": *[_type == "faq" && active == true] | order(displayOrder asc, question asc) {
    _id,
    active,
    answer,
    category,
    displayOrder,
    question
  },
  "testimonials": *[_type == "testimonial" && active == true] | order(displayOrder asc, clientName asc) {
    _id,
    active,
    clientName,
    clientRole,
    displayOrder,
    organization,
    photo,
    quote,
    altText
  }
}`;

export async function fetchCmsBundle(): Promise<CmsBundle | null> {
  if (!isSanityConfigured() || !sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<CmsBundle>(cmsQuery);
  } catch {
    return null;
  }
}
