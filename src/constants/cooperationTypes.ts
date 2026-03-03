import researchImg from "@/assets/img/research.png";
import ideaImg from "@/assets/img/ideas.png";
import techImg from "@/assets/img/technology.png";
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
  image: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const cooperationTypes: CooperationType[] = [
  {
    image: researchImg,
    title: "Research Projects",
    description:
      "Collaborative research projects across universities to generate new innovations.",
    icon: FlaskConical,
  },
  {
    image: techImg,
    title: "Technology Development",
    description:
      "Joint efforts in developing new technologies for shared benefit.",
    icon: Cpu,
  },
  {
    image: ideaImg,
    title: "Idea Exchange",
    description:
      "Discussions and idea sharing among students from diverse academic backgrounds.",
    icon: Lightbulb,
  },
  {
    image: techImg,
    title: "Social Projects",
    description:
      "Social initiatives involving students from various backgrounds to create a positive impact.",
    icon: Users,
  },
  {
    image: ideaImg,
    title: "Cultural Activities",
    description:
      "Cultural exchange through art, music, and traditions between universities.",
    icon: Globe,
  },
  {
    image: researchImg,
    title: "Joint Internship Programs",
    description:
      "Internship opportunities involving students from different universities for broader work experience.",
    icon: Briefcase,
  },
];
