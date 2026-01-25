import logo from "../assets/Changli.jpg";

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React, Vite, and Tailwind CSS.",
    image: logo,
    tags: ["React", "Frontend"],
  },
  {
    title: "Admin Dashboard",
    description:
      "CRUD-based admin panel using React, Express, MongoDB, and JWT.",
    image: logo,
    tags: ["React", "Full Stack", "MongoDB"],
  },
  {
    title: "Photo Booth App",
    description:
      "A web-based photo booth with camera capture and image filters.",
    image: logo,
    tags: ["React", "Frontend"],
  },
  {
    title: "Event Registration System",
    description:
      "Online registration system with form validation and database storage.",
    image: logo,
    tags: ["React", "Full Stack"],
  },
  {
    title: "Blog CMS",
    description: "Content management system with Cloudinary image uploads.",
    image: logo,
    tags: ["React", "Full Stack", "MongoDB"],
  },
  {
    title: "POS System",
    description:
      "Coffee shop POS system with cart, receipt, and transaction history.",
    image: logo,
    tags: ["React", "Frontend"],
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
