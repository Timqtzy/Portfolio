import fonzo from "../assets/fonzosite.webp";
import newjeans from "../assets/newjeanssite.webp";
import spamadmin from "../assets/spamadminsite.webp";
import spamsite from "../assets/spamsite.webp";

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: string;
  github?: string;
  live?: string;
  private?: boolean;
}

export const projects: Project[] = [
  {
    title: "School Press Advisers' Movement, Inc. Website",
    description:
      "Advocating Responsible Campus Journalism",
    image: spamsite,
    tags: ["React", "Frontend", "MongoDB"],
    links: "https://spamorganizations-main.vercel.app",
    private: false,
  },{
    title: "School Press Advisers' Movement, Inc. Website Admin",
    description:
      "Advocating Responsible Campus Journalism - Admin Panel",
    image: spamadmin,
    tags: ["React", "Frontend", "MongoDB"],
    links: "https://spamorganizations-main.vercel.app",
    private: true,
  },
  {
    title: "Fonzo Calibration",
    description:
      "Frontend and CRUD-based admin panel using React, Postgres, and JWT.",
    image: fonzo,
    tags: ["React", "Full Stack", "PostgreSQL"],
    links: "https://fonzo-clibrations.vercel.app",
    private: true,
  },
  {
    title: "Newjeans UI Design",
    description:
      "Newjeans UI frontend design with responsive layout and animations.",
    image: newjeans,
    tags: ["React", "Frontend"],
    links: "https://newjeans-web.vercel.app",
    private: false,
  },
];

// Extract unique tags from all projects
export const projectTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

export const socialLinks = {
  github: "https://github.com/Timqtzy",
  behance: "https://www.behance.net/timothytenido",
  email: "mailto:timothytenido@gmail.com",
  discord: "https://discord.com/users/844586000163536906",
};

export const technologies = [
  "Nextjs",
  "Tailwind CSS",
  "TypeScript",
  "Make",
  "Zapier",
  "GHL",
  "RESTful APIs",
  "Git & GitHub",
];
