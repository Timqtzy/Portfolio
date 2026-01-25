import "./App.css";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import logo from "./assets/Changli.jpg";
import { FaRegEnvelope } from "react-icons/fa";
import { RiDiscordLine } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { FileDown } from "lucide-react";

function App() {
  const [active, setActive] = useState("Home");

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    console.log("GSAP is ready to use!");
  }, []);

  const works = [
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio built with React, Vite, and Tailwind CSS.",
      image: logo,
    },
    {
      title: "Admin Dashboard",
      description:
        "CRUD-based admin panel using React, Express, MongoDB, and JWT.",
      image: logo,
    },
    {
      title: "Photo Booth App",
      description:
        "A web-based photo booth with camera capture and image filters.",
      image: logo,
    },
    {
      title: "Event Registration System",
      description:
        "Online registration system with form validation and database storage.",
      image: logo,
    },
    {
      title: "Blog CMS",
      description: "Content management system with Cloudinary image uploads.",
      image: logo,
    },
    {
      title: "POS System",
      description:
        "Coffee shop POS system with cart, receipt, and transaction history.",
      image: logo,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between font-mono bg-white ">
      {" "}
      {/*bg-[radial-gradient(rgb(209,213,219)_1px,transparent_1px)] bg-size-[20px_20px]*/}
      <section
        id="nav"
        className="flex justify-between max-w-5xl w-full h-full mx-auto border-b border-gray-300 py-4"
      >
        <div className="flex flex-col">
          <p className="font-medium text-2xl">Timothy</p>
          <p className="text-gray-500 text-[0.80rem]">Frontend Developer</p>
        </div>
        <div>
          <div className="flex gap-8 ml-16 items-center">
            <div className="bg-white border border-gray-300 flex gap-4 p-1 rounded-md">
              {["Home", "Projects", "About"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`px-4 py-1 rounded-md transition cursor-pointer font-medium
                    ${active === item ? "bg-black text-white" : "text-black"}
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
            <div>
              <button className="bg-red-400 border border-gray-300 px-4 py-2 rounded-md text-white font-medium cursor-pointer">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="header"
        className="flex justify-between max-w-5xl w-full mx-auto py-48"
      >
        <div className="flex justify-between items-center w-full h-1/2 py-4">
          <div className="max-w-xl">
            <span className="text-4xl font-medium">Hi there! I'm</span>
            <span className="text-4xl text-red-400 font-medium"> Tim</span>,
            <br />
            <span className="text-xl text-gray-700">
              a college student passionate about web development with a growing
              interest in Unity and game dev.
            </span>
            <div className="flex gap-4 py-4 items-center">
              <FiGithub className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer" />{" "}
              <FaRegEnvelope className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer" />
              <RiDiscordLine className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer" />
              <div className="">
                <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-black font-semibold cursor-pointer">Download CV <span className="text-black"><FileDown className="w-4 h-4"/></span></button>
              </div>
            </div>
            
          </div>
          <img
            src={logo}
            alt=""
            className="w-64 h-64 rounded-full object-cover ml-4"
          />
        </div>
      </section>
      <section
        id="projects"
        className="flex flex-col items-center max-w-5xl w-full min-h-screen mx-auto py-14"
      >
        <p className="font-medium text-2xl text-center py-4">Projects</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work, index) => (
            <div
              key={index}
              className="p-4 rounded-md h-fit hover:shadow-md transition"
            >
              <img
                src={work.image}
                alt={work.title}
                className="rounded-md mb-3"
              />
              <h3 className="font-semibold text-2xl">{work.title}</h3>
              <p className="text-gray-500 text-sm font-medium">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="about"
        className="flex justify-between max-w-5xl w-full min-h-screen mx-auto py-14"
      >
        <div className="flex flex-col text-center w-full gap-4">
          <p className="font-medium text-2xl text-center">About Me</p>
          <div>
            
            <p className="text-gray-500 text-[0.80rem] text-justify max-w-2xl mx-auto">
            I’m Timothy, a college student and frontend developer
            who enjoys building clean, responsive, and efficient web
            experiences. I primarily work with React, Vite, and Tailwind CSS. Beyond frontend work, I also
            explore automation and workflow optimization using tools like n8n,
            creating automated processes that connect APIs, manage data, and
            reduce repetitive tasks. I’m continuously learning new technologies
            and improving my skills—whether it’s refining UI/UX, building admin
            dashboards, or integrating automation into real-world projects.
          </p>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="flex justify-between max-w-5xl w-full h-96 mx-auto py-14"
      >
        <div className="flex flex-col items-center text-center w-full gap-4">
          <p className="font-medium text-2xl text-center">Contact Me</p>
          <button className="flex items-center gap-4 border border-gray-300 rounded-md w-fit py-2 px-4 cursor-pointer"><FaRegEnvelope/>Send me an Email</button>
        </div>
      </section>
    </div>
  );
}

export default App;
