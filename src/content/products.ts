export type LocalProduct = {
  _id: string;
  name: string;
  slug: { current: string };
  shortDescription: string;
  image: string;
  altText: string;
  externalUrl: string;
  ctaLabel: string;
  priceLabel?: string;
  category: "Templates & Tools" | "Training & Learning";
  features: string[];
  featured: boolean;
  displayOrder: number;
};

const productImages: Record<string, string> = {
  "patient-follow-up-template.jpg": new URL("../assets/products/patient-follow-up-template.jpg", import.meta.url).href,
  "insurance-verification-worksheet.jpg": new URL("../assets/products/insurance-verification-worksheet.jpg", import.meta.url).href,
  "telehealth-preparation-checklist.jpg": new URL("../assets/products/telehealth-preparation-checklist.jpg", import.meta.url).href,
  "remote-patient-monitoring-log.jpg": new URL("../assets/products/remote-patient-monitoring-log.jpg", import.meta.url).href,
  "ai-automation-class.jpg": new URL("../assets/products/ai-automation-class.jpg", import.meta.url).href,
  "medical-documentation-template.jpg": new URL("../assets/products/medical-documentation-template.jpg", import.meta.url).href,
  "patient-scheduling-template.jpg": new URL("../assets/products/patient-scheduling-template.jpg", import.meta.url).href,
  "medical-virtual-assistance-group-class.webp": new URL("../assets/products/medical-virtual-assistance-group-class.webp", import.meta.url).href,
  "health-staff-training-guide.jpg": new URL("../assets/products/health-staff-training-guide.jpg", import.meta.url).href,
};
const productImage = (filename: string) => productImages[filename] ?? "";
const selarUrls = ["https://selar.com/55x5n6k7st", "https://selar.com/76s764w262", "https://selar.com/zl477y7997", "https://selar.com/7kf971wq97", "https://selar.com/48o8172pl1", "https://selar.com/4c442a5992", "https://selar.com/27581n657t", "https://selar.com/8772p6865p", "https://selar.com/f571o1441z"];

const sourceProducts = [
  ["Patient Follow-Up Template", "patient-follow-up-template", "patient-follow-up-template.jpg", "Organize routine patient follow-up activities, communication notes, and administrative next steps.", ["Follow-up activities", "Communication notes", "Administrative next steps"], true],
  ["Insurance Verification Worksheet", "insurance-verification-worksheet", "insurance-verification-worksheet.jpg", "Support organized insurance verification workflows, coverage checks, prior authorization follow-up, and related documentation.", ["Coverage checks", "Prior authorization follow-up", "Related documentation"], true],
  ["Telehealth Preparation Checklist", "telehealth-preparation-checklist", "telehealth-preparation-checklist.jpg", "Help prepare administrative and workflow requirements before telehealth appointments.", ["Pre-visit preparation", "Workflow checks", "Administrative readiness"], true],
  ["Remote Patient Monitoring Log", "remote-patient-monitoring-log", "remote-patient-monitoring-log.jpg", "Organize remote monitoring records, follow-up observations, and routine administrative tracking.", ["Monitoring records", "Follow-up observations", "Routine tracking"], false],
  ["AI Automation Class", "ai-automation-class", "ai-automation-class.jpg", "Learn practical ways AI-assisted automation can support repetitive Virtual Medical Assistant and healthcare administrative workflows.", ["Practical AI use", "Workflow automation", "Administrative applications"], true],
  ["Medical Documentation Template", "medical-documentation-template", "medical-documentation-template.jpg", "Support consistent organization of routine medical administrative documentation.", ["Documentation structure", "Consistent organization", "Administrative support"], false],
  ["Patient Scheduling Template", "patient-scheduling-template", "patient-scheduling-template.jpg", "Organize appointments, scheduling workflows, and administrative follow-up.", ["Appointment planning", "Scheduling workflows", "Follow-up"], false],
  ["Medical Virtual Assistance Class (Group Session)", "medical-virtual-assistance-group-class", "medical-virtual-assistance-group-class.webp", "Group-based Virtual Medical Assistant training focused on practical healthcare administrative workflows.", ["Group learning", "Healthcare workflows", "Practical training"], true],
  ["Health Staff Training Guide", "health-staff-training-guide", "health-staff-training-guide.jpg", "A practical guide for structured training and development among healthcare support staff.", ["Structured training", "Staff development", "Practical guidance"], false],
] as const;

export const localProducts: LocalProduct[] = sourceProducts.map(([name, slug, filename, shortDescription, features, featured], index) => ({
  _id: `local-${slug}`, name, slug: { current: slug }, shortDescription, image: productImage(filename), altText: `MedLink VA ${name} cover`, externalUrl: selarUrls[index], ctaLabel: name.includes("Class") ? "View Class" : "View Product", category: name.includes("Class") || name.includes("Guide") ? "Training & Learning" : "Templates & Tools", features: [...features], featured, displayOrder: index,
}));

export const productsContent = {
  hero: { eyebrow: "Products & Resources", title: "Practical tools to help you learn, work, and stay organized", description: "Explore MedLink VA resources created for Virtual Medical Assistants, aspiring healthcare support professionals, and teams looking for practical ways to organize administrative work. From templates and checklists to learning materials and workflow tools, each product is designed to make everyday tasks easier to understand and manage.", actions: [{ label: "Explore Products", to: "#products", variant: "primary" as const }, { label: "Browse Training", to: "/classes", variant: "secondary" as const }] },
  disclosure: "Product details are provided on this website, with checkout completed through the linked external purchase destination.",
  cta: { title: "Not sure which resource is right for you?", description: "Tell us what you are trying to learn, organize, or improve and we can point you toward the most relevant MedLink VA resource.", primaryAction: { label: "Contact MedLink VA", to: "/contact" }, secondaryAction: { label: "Browse Products", to: "#products" } },
} as const;