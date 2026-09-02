import { clientAssets } from "../lib/assets";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
  shortBio?: string;
  featured: boolean;
  displayOrder: number;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Racheal O Mulinde",
    role: "CEO",
    image: clientAssets.ceoPhoto,
    alt: "Racheal O Mulinde, CEO of Medlink VA",
    featured: true,
    displayOrder: 1,
  },
  {
    name: "Deborah Kayode Ibukunoluwa",
    role: "Training Assistant",
    image: clientAssets.trainingAssistantOnePhoto,
    alt: "Deborah Kayode Ibukunoluwa, Training Assistant at Medlink VA",
    featured: false,
    displayOrder: 2,
  },
  {
    name: "Teniola Sonibare",
    role: "Training Assistant",
    image: clientAssets.trainingAssistantTwoPhoto,
    alt: "Teniola Sonibare, Training Assistant at Medlink VA",
    featured: false,
    displayOrder: 3,
  },
  {
    name: "Toluwase Temidayo",
    role: "Virtual Administrative Assistant",
    image: clientAssets.virtualAdministrativeAssistantPhoto,
    alt: "Toluwase Temidayo, Virtual Administrative Assistant at Medlink VA",
    featured: false,
    displayOrder: 4,
  },
];

