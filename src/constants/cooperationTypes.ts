import type { LucideIcon } from "lucide-react";
import {
  FlaskConical,
  Lightbulb,
  Cpu,
  Users,
  Globe,
  Briefcase,
} from "lucide-react";

export interface CooperationType {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const cooperationTypes: CooperationType[] = [
  {
    title: "Research Projects",
    description:
      "Collaborative research projects across universities to generate new innovations.",
    icon: FlaskConical,
  },
  {
    title: "Idea Exchange",
    description:
      "Discussions and idea sharing among students from diverse academic backgrounds.",
    icon: Lightbulb,
  },
  {
    title: "Technology Development",
    description:
      "Joint efforts in developing new technologies for shared benefit.",
    icon: Cpu,
  },
  {
    title: "Social Projects",
    description:
      "Social initiatives involving students from various backgrounds to create a positive impact.",
    icon: Users,
  },
  {
    title: "Cultural Activities",
    description:
      "Cultural exchange through art, music, and traditions between universities.",
    icon: Globe,
  },
  {
    title: "Joint Internship Programs",
    description:
      "Internship opportunities involving students from different universities for broader work experience.",
    icon: Briefcase,
  },
];
