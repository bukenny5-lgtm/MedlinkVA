import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImageSource } from "./types";

let builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getBuilder() {
  if (!sanityClient) {
    return null;
  }

  if (!builder) {
    builder = imageUrlBuilder(sanityClient);
  }

  return builder;
}

export function sanityImageUrl(source?: SanityImageSource | null) {
  if (!source) {
    return null;
  }

  const imageBuilder = getBuilder();

  if (!imageBuilder) {
    return null;
  }

  return imageBuilder.image(source);
}

export function sanityImageSrc(
  source?: SanityImageSource | null,
  options?: {
    height?: number;
    width?: number;
  },
) {
  const image = sanityImageUrl(source);

  if (!image) {
    return null;
  }

  let transformed = image;

  if (options?.width) {
    transformed = transformed.width(options.width);
  }

  if (options?.height) {
    transformed = transformed.height(options.height);
  }

  return transformed.fit("crop").auto("format").url();
}
