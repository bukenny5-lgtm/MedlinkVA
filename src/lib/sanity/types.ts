export type SanitySlug = {
  current: string;
};

export type SanityImageAsset = {
  _ref: string;
  _type: "reference";
};

export type SanityImageSource = {
  _type?: "image";
  asset?: SanityImageAsset;
  crop?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

export type PortableTextSpan = {
  _key: string;
  _type: "span";
  marks?: string[];
  text: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children: PortableTextSpan[];
  markDefs?: ReadonlyArray<Record<string, unknown>>;
  style?: string;
  listItem?: string;
  level?: number;
};

export type TeamMemberDocument = {
  _id: string;
  active?: boolean;
  displayOrder?: number;
  featured?: boolean;
  fullBio?: PortableTextBlock[];
  name: string;
  photo?: SanityImageSource;
  role: string;
  shortBio?: string;
  slug?: SanitySlug;
  altText?: string;
};

export type ServiceDocument = {
  _id: string;
  active?: boolean;
  displayOrder?: number;
  examples?: string[];
  featured?: boolean;
  fullDescription?: PortableTextBlock[];
  image?: SanityImageSource;
  shortDescription: string;
  slug?: SanitySlug;
  seoDescription?: string;
  seoTitle?: string;
  title: string;
  altText?: string;
};

export type JobDocument = {
  _id: string;
  applicationUrl?: string;
  closingDate?: string;
  displayOrder?: number;
  employmentType: string;
  featured?: boolean;
  fullDescription?: PortableTextBlock[];
  location: string;
  requirements?: string[];
  shortDescription: string;
  slug?: SanitySlug;
  status: "open" | "paused" | "closed";
  title: string;
};

export type ClassDocument = {
  _id: string;
  callToActionLabel?: string;
  certificateIncluded?: boolean;
  date?: string;
  displayOrder?: number;
  duration?: string;
  deliveryFormat?: string[];
  endDate?: string;
  externalRegistration?: boolean;
  features?: string[];
  featured?: boolean;
  fullDescription?: PortableTextBlock[];
  image?: SanityImageSource;
  instructor?: string;
  instructorNames?: string[];
  price?: number;
  priceLabel?: string;
  programmeType?: "programme" | "webinar" | "workshop" | "bootcamp" | "team-training";
  registrationDeadline?: string;
  registrationUrl?: string;
  shortDescription: string;
  slug?: SanitySlug;
  startDate?: string;
  status: "upcoming" | "enrolling" | "ongoing" | "completed" | "on-demand";
  topics?: string[];
  title: string;
  currency?: string;
  altText?: string;
};

export type ProductLinkDocument = {
  _id: string;
  active?: boolean;
  ctaLabel: string;
  displayOrder?: number;
  externalUrl: string;
  featured?: boolean;
  image?: SanityImageSource;
  name: string;
  price?: number;
  shortDescription: string;
  slug?: SanitySlug;
  altText?: string;
};

export type ResourcePostDocument = {
  _id: string;
  active?: boolean;
  author?: string;
  body?: PortableTextBlock[];
  category: string;
  coverImage?: SanityImageSource;
  coverImageAlt?: string;
  excerpt: string;
  featured?: boolean;
  publishedAt: string;
  seoDescription?: string;
  seoTitle?: string;
  slug?: SanitySlug;
  title: string;
};

export type FaqDocument = {
  _id: string;
  active?: boolean;
  answer?: PortableTextBlock[];
  category?: string;
  displayOrder?: number;
  question: string;
};

export type TestimonialDocument = {
  _id: string;
  active?: boolean;
  clientName: string;
  clientRole?: string;
  displayOrder?: number;
  organization?: string;
  photo?: SanityImageSource;
  quote: string;
  altText?: string;
  audience?: "trainee" | "client" | "practice";
};

export type SiteSettingsDocument = {
  businessName: string;
  contactEmail: string;
  externalProductStoreUrl?: string;
  newsletterHeading: string;
  newsletterText: string;
  phone?: string;
  primaryCTA: string;
  secondaryCTA: string;
  socialLinks?: Array<{
    label: string;
    platform?: string;
    url: string;
  }>;
  tagline: string;
};

export type HomepageContentDocument = {
  finalCtaHeading: string;
  finalCtaText: string;
  heroHeading: string;
  heroSubheading: string;
  newsletterHeading?: string;
  newsletterText?: string;
  trustItems?: string[];
  whyBody?: PortableTextBlock[];
  whyHeading: string;
};

export type AboutContentDocument = {
  aboutIntro: string;
  mission: string;
  valuesIntro: string;
  vision: string;
};

export type CmsBundle = {
  aboutContent: AboutContentDocument | null;
  classes: ClassDocument[];
  faqs: FaqDocument[];
  homepageContent: HomepageContentDocument | null;
  jobs: JobDocument[];
  productLinks: ProductLinkDocument[];
  resourcePosts: ResourcePostDocument[];
  services: ServiceDocument[];
  siteSettings: SiteSettingsDocument | null;
  teamMembers: TeamMemberDocument[];
  testimonials: TestimonialDocument[];
};
