export const officialLaunchEvent = {
  id: "medlink-va-official-launch",
  slug: "official-launch",
  path: "/events/official-launch",
  title: "MedLink VA Official Launch",
  eyebrow: "Online Launch Event",
  description: "Join us online for the official launch of MedLink VA and discover how we are bringing practical Virtual Medical Assistant training together with remote administrative support for healthcare practices.",
  detailDescription: "This event introduces the MedLink VA approach, the opportunities available for aspiring Virtual Medical Assistants, and how healthcare teams can work with trained remote support professionals.",
  purpose: "MedLink VA was created around two connected goals: helping people develop practical skills for Virtual Medical Assistant work and helping healthcare practices access organized remote administrative support.",
  purposeDetail: "During the launch, we will introduce the MedLink VA platform, explain how our training and support services work, and show how learners and healthcare practices can take their next step with us.",
  dateLabel: "Saturday, 28 November 2026",
  dateShortLabel: "28 November 2026",
  startTime: "2026-11-28T17:00:00+03:00",
  endTime: "2026-11-28T20:00:00+03:00",
  timeLabel: "5:00 PM – 8:00 PM EAT",
  format: "Online Launch Event",
  ticketLabel: "Free Event",
  registrationUrl: "https://www.eventbrite.com/e/medlink-va-launch-tickets-2002271528040?aff=oddtdtcreator",
  ctaLabel: "Book Your Free Ticket",
  attendeeGroups: [
    { title: "Aspiring Virtual Medical Assistants", description: "People interested in building practical healthcare administrative and remote support skills." },
    { title: "Healthcare practices", description: "Teams looking for ways to reduce administrative pressure and understand how a trained Virtual Medical Assistant may fit into existing workflows." },
    { title: "Partners and collaborators", description: "Organizations interested in training, healthcare support, professional development, and creating opportunities." },
  ],
  coverage: [
    { title: "MedLink VA training", description: "How aspiring Virtual Medical Assistants can build practical healthcare administrative skills." },
    { title: "Healthcare practice support", description: "How trained remote support professionals can assist with clearly defined administrative responsibilities." },
    { title: "Opportunities and next steps", description: "How learners, practices, and partners can continue engaging with MedLink VA after the launch." },
    { title: "The MedLink VA platform", description: "How Training, Services, Resources, Impact, Products, and other parts of the website connect." },
  ],
} as const;

export type Promotion = {
  id: string; title: string; description: string; image?: string; ctaLabel: string; ctaUrl: string;
  advertiser?: string; startDate?: string; endDate?: string; active: boolean; priority: number;
  placement: "homepage"; destinationType: "internal" | "external";
};

export const officialLaunchPromotion: Promotion = {
  id: officialLaunchEvent.id,
  title: officialLaunchEvent.title,
  description: "Join us for the official MedLink VA launch and discover how our training, healthcare support services, and opportunities connect.",
  ctaLabel: "View Launch Event",
  ctaUrl: officialLaunchEvent.path,
  advertiser: "MedLink VA",
  startDate: "2026-10-01",
  active: true,
  priority: 1,
  placement: "homepage",
  destinationType: "internal",
};
