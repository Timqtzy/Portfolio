import spamsite from "../assets/spamsite.png";
import spamadmin from "../assets/spamadminsite.png";
import fonzo from "../assets/fonzosite.png";
import newjeans from "../assets/newjeanssite.png";
import photobooth from "../assets/photoboothsite.png";
import airbnb from "../assets/airbnbsite.png";

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "School Press Advisers' Movement, Inc. Website",
    description:
      "Advocating Responsible Campus Journalism",
    image: spamsite,
    tags: ["React", "Frontend", "MongoDB"],
    links: "https://spamorganizations-main.vercel.app",
  },{
    title: "School Press Advisers' Movement, Inc. Website Admin",
    description:
      "Advocating Responsible Campus Journalism - Admin Panel",
    image: spamadmin,
    tags: ["React", "Frontend", "MongoDB"],
    links: "https://spamorganizations-main.vercel.app",
  },
  {
    title: "Fonzo Calibration",
    description:
      "Frontend and CRUD-based admin panel using React, Postgres, and JWT.",
    image: fonzo,
    tags: ["React", "Full Stack", "PostgreSQL"],
    links: "https://fonzo-clibrations.vercel.app",
  },
  {
    title: "Photo Booth App",
    description:
      "A web-based photo booth with camera capture and image filters.",
    image: photobooth,
    tags: ["React", "Frontend"],
    links: "https://tim-booth.vercel.app",
  },
  {
    title: "Newjeans UI Design",
    description:
      "Newjeans UI frontend design with responsive layout and animations.",
    image: newjeans,
    tags: ["React", "Frontend"],
    links: "https://newjeans-web.vercel.app"
  },
  {
    title: "Airbnb Studio",
    description:
      "Interactive price and availability prediction tool for Airbnb hosts using XGBoost and Random Forest with monthly trend analysis.",
    image: airbnb,
    tags: ["Python", "Streamlit"],
    links: "https://airbnb-studio-y8v2u46evbu79rmkufjdw3.streamlit.app/",                                                                                                                                                                                    
  },
];

// Extract unique tags from all projects
export const projectTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

export const socialLinks = {
  github: "https://github.com/Timqtzy",
  email: "mailto:timothytenido@gmail.com",
  discord: "https://discord.com/users/844586000163536906",
};

export const technologies = [
  "React (Vite)",
  "Tailwind CSS",
  "JavaScript (ES6+)",
  "TypeScript",
  "MongoDB",
  "n8n Automation",
  "Supabase",
  "Node.js",
  "RESTful APIs",
  "Git & GitHub",
];
