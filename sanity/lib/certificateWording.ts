export const activityTypes = ["Training", "Course", "Workshop", "Webinar", "Seminar", "Conference", "Bootcamp", "Masterclass", "Practicum", "Internship", "Other"] as const;
export const certificateTypes = ["Completion", "Participation", "Attendance", "Achievement", "Appreciation", "Recognition"] as const;
export type ActivityType = (typeof activityTypes)[number];
export type CertificateType = (typeof certificateTypes)[number];

const cleanTitle = (value: string) => value.trim().replace(/^training\s+in\s+/i, "").replace(/\s+/g, " ");
const formatDuration = (value?: string) => value?.trim().replace(/^(\d+)\s+(day|week|month|year)s?$/i, "$1-$2");

export function resolveCertificateWording(input: { certificateType: CertificateType; activityType: ActivityType; programmeTitle: string; duration?: string; recognitionLine?: string; activityLabel?: string; context?: string }) {
  const programmeTitle = cleanTitle(input.programmeTitle);
  const duration = formatDuration(input.duration);
  const activity = (input.activityLabel?.trim() || input.activityType).toLowerCase();
  const heading = `CERTIFICATE OF ${input.certificateType.toUpperCase()}`;
  const completionDuration = duration ? `the ${duration} ` : "the ";
  const wordingByType: Record<CertificateType, string> = {
    Completion: input.activityType === "Training" ? `for successfully completing ${completionDuration}practical training programme in` : input.activityType === "Course" ? `for successfully completing ${completionDuration}course` : `for successfully completing ${completionDuration}${activity}`,
    Participation: `for actively participating in the ${activity}`,
    Attendance: `for attending the ${activity}`,
    Achievement: "in recognition of successfully meeting the requirements of",
    Appreciation: "in appreciation of valuable contribution to",
    Recognition: "in recognition of valuable contribution to",
  };
  const recognitionLine = input.recognitionLine?.trim() || (input.certificateType === "Completion" ? "Awarded in recognition of successful completion, active participation, and commitment to professional development." : undefined);
  return { heading, wording: wordingByType[input.certificateType], programmeTitle, recognitionLine };
}
