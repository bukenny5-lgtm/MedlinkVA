import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set(["siteSettings", "homepageContent", "aboutContent"]);

function singletonItem(S: Parameters<StructureResolver>[0], type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Medlink VA Content")
    .items([
      singletonItem(S, "homepageContent", "Homepage"),
      singletonItem(S, "aboutContent", "About"),
      singletonItem(S, "siteSettings", "Site Settings"),
      S.divider(),
      S.listItem()
        .title("Services")
        .child(S.documentTypeList("service").title("Services")),
      S.listItem()
        .title("Team")
        .child(S.documentTypeList("teamMember").title("Team")),
      S.listItem()
        .title("Jobs")
        .child(S.documentTypeList("job").title("Jobs")),
      S.listItem()
        .title("Classes")
        .child(S.documentTypeList("class").title("Classes")),
      S.listItem()
        .title("Certificates")
        .child(S.documentTypeList("certificate").title("Certificates")),
      S.listItem()
        .title("Products")
        .child(S.documentTypeList("productLink").title("Products")),
      S.listItem()
        .title("Resources")
        .child(S.documentTypeList("resourcePost").title("Resources")),
      S.listItem()
        .title("FAQs")
        .child(S.documentTypeList("faq").title("FAQs")),
      S.listItem()
        .title("Testimonials")
        .child(S.documentTypeList("testimonial").title("Testimonials")),
    ]);
