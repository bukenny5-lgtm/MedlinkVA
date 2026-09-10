import type { SchemaTypeDefinition } from "sanity";
import { aboutContent } from "./aboutContent";
import { classSchema } from "./class";
import { certificate } from "./certificate";
import { faq } from "./faq";
import { homepageContent } from "./homepageContent";
import { job } from "./job";
import { productLink } from "./productLink";
import { resourcePost } from "./resourcePost";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homepageContent,
  aboutContent,
  teamMember,
  service,
  job,
  classSchema,
  certificate,
  productLink,
  resourcePost,
  faq,
  testimonial,
] as const;
