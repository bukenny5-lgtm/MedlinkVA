import type { ClassDocument } from "../lib/sanity/types";

export const upcomingTrainingDate = "2026-10-10";

export const fallbackUpcomingTraining: ClassDocument = {
  _id: "fallback-upcoming-training-2026-10-10",
  title: "Virtual Medical Assistant Training",
  shortDescription: "A practical MedLink VA training opportunity for learners building healthcare administrative workflow skills.",
  startDate: upcomingTrainingDate,
  status: "upcoming",
  programmeType: "programme",
  featured: true,
  callToActionLabel: "View Training",
};
