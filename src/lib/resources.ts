export const resourceCategories = [
  { name: "VMA Training", slug: "vma-training", image: new URL("../assets/resources/vma-training.png", import.meta.url).href, description: "Guides on Virtual Medical Assistant skills, training, preparation, and professional readiness." },
  { name: "Healthcare Administration", slug: "healthcare-administration", image: new URL("../assets/resources/healthcare-administration.png", import.meta.url).href, description: "Learn how scheduling, documentation, patient coordination, and front-desk workflows support healthcare practices." },
  { name: "Career Development", slug: "career-development", image: new URL("../assets/resources/career-development.png", import.meta.url).href, description: "Practical guidance for CV preparation, interviews, remote work readiness, and professional growth." },
  { name: "Practice Workflows", slug: "practice-workflows", image: new URL("../assets/resources/practice-workflows.png", import.meta.url).href, description: "Understand how tasks, referrals, follow-up, communication, and coordination fit together in healthcare operations." },
  { name: "Insurance & Billing", slug: "insurance-billing", image: new URL("../assets/resources/insurance-billing.png", import.meta.url).href, description: "Learn the basics of insurance verification, claims workflows, billing support, and administrative responsibilities." },
  { name: "AI & Automation", slug: "ai-automation", image: new URL("../assets/resources/ai-automation.png", import.meta.url).href, description: "Explore how automation can support healthcare administration while keeping people, privacy, and professional judgment central." },
  { name: "Remote Patient Monitoring", slug: "remote-patient-monitoring", image: new URL("../assets/resources/remote-patient-monitoring.png", import.meta.url).href, description: "Understand the support workflows behind remote monitoring, follow-up, patient communication, and role boundaries." },
] as const;

export function categorySlug(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function categoryImage(category: string) {
  return resourceCategories.find((item) => item.name.toLowerCase() === category.toLowerCase())?.image;
}

export function defaultReviewIntervalDays(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("ai")) return 30;
  if (normalized.includes("privacy") || normalized.includes("hipaa")) return 30;
  if (normalized.includes("monitoring")) return 45;
  if (normalized.includes("insurance")) return 60;
  if (normalized.includes("administration")) return 75;
  return 90;
}
