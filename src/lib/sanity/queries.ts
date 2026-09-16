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
    founderImage,
    founderImageAlt,
    founderMessageBody,
    founderMessageHeading,
    founderName,
    founderRole,
    mission,
    metrics[]{
      _key,
      active,
      description,
      displayOrder,
      label,
      suffix,
      value
    },
    partners[]{
      _key,
      active,
      altText,
      displayOrder,
      logo,
      name,
      websiteUrl
    },
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
  "classes": *[_type == "class" && (status == "upcoming" || status == "enrolling" || status == "ongoing" || status == "on-demand")] | order(displayOrder asc, coalesce(startDate, date) asc, title asc) {
    _id,
    callToActionLabel,
    certificateIncluded,
    date,
    displayOrder,
    duration,
    deliveryFormat,
    endDate,
    externalRegistration,
    features,
    featured,
    fullDescription,
    image,
    instructor,
    instructorNames,
    price,
    priceLabel,
    programmeType,
    registrationDeadline,
    registrationUrl,
    shortDescription,
    slug,
    startDate,
    status,
    topics,
    title,
    currency,
    altText
  },
  "productLinks": *[_type == "productLink" && active == true] | order(displayOrder asc, name asc) {
    _id,
    active,
    category,
    ctaLabel,
    displayOrder,
    externalUrl,
    featured,
    image,
    name,
    price,
    priceLabel,
    externalPlatform,
    features,
    fullDescription,
    seoTitle,
    seoDescription,
    shortDescription,
    slug,
    altText
  },
  "resourcePosts": *[_type == "resourcePost" && active == true] | order(publishedAt desc, title asc) {
    _id,
    active,
    author,
    authorName,
    body,
    callToActionLabel,
    category,
    coverImage,
    coverImageAlt,
    downloadFile{asset->{url}},
    displayOrder,
    excerpt,
    externalUrl,
    featured,
    lastReviewedAt,
    reviewIntervalDays,
    reviewStatus,
    sourceLinks,
    publishedAt,
    resourceType,
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
    audience,
    clientName,
    clientRole,
    displayOrder,
    organization,
    photo,
    quote,
    altText
  },
  "videos": *[_type == "videoContent" && active == true]
    | order(featured desc, publishedAt desc, displayOrder asc, title asc) {
    _id,
    active,
    category,
    displayOrder,
    duration,
    eventName,
    featured,
    publishedAt,
    relatedService->{_id, title},
    relatedTraining->{_id, title},
    shortDescription,
    slug,
    speaker,
    thumbnail,
    thumbnailAltText,
    title,
    videoProvider,
    streamVideoId,
    videoUrl
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
