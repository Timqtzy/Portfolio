import "./App.css";
import { useEffect, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import logo from "./assets/Changli.webp";
import { FaRegEnvelope } from "react-icons/fa";
import { RiDiscordLine } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { FileDown, MapPin, Menu, X } from "lucide-react";
import {
  projects,
  projectTags,
  socialLinks,
  technologies,
} from "./data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const [active, setActive] = useState("Home");
  const [activeFilter, setActiveFilter] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "rate_limited"
  >("idle");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const COOLDOWN_SECONDS = 60;

  const scrollToSection = (sectionId: string, label: string) => {
    setActive(label);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setSubmitStatus("success");
      return;
    }

    const lastSubmit = localStorage.getItem("lastContactSubmit");
    if (lastSubmit) {
      const timeSince = (Date.now() - parseInt(lastSubmit)) / 1000;
      if (timeSince < COOLDOWN_SECONDS) {
        const remaining = Math.ceil(COOLDOWN_SECONDS - timeSince);
        setCooldownRemaining(remaining);
        setSubmitStatus("rate_limited");
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_PUBLIC_KEY,
      );
      setSubmitStatus("success");
      setFormData({ from_name: "", reply_to: "", message: "" });
      localStorage.setItem("lastContactSubmit", Date.now().toString());
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    const sections = [
      { id: "header", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActive(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.set(
        [
          ".hero-greeting",
          ".hero-description",
          ".hero-socials > *",
          ".hero-image",
          ".nav-item",
          ".project-card",
          ".section-title",
          ".about-text",
          ".tech-item",
          ".experience-item",
          ".contact-content",
        ],
        { autoAlpha: 1 },
      );

      const heroTl = gsap.timeline();
      heroTl
        .fromTo(
          ".hero-greeting",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          ".hero-description",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-socials > *",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-image",
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6",
        );

      gsap.fromTo(
        ".nav-item",
        { autoAlpha: 0, y: -20 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".project-card",
        { autoAlpha: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.fromTo(
          title,
          { autoAlpha: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: title,
              start: "top 90%",
            },
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
        );
      });

      gsap.fromTo(
        ".about-text",
        { autoAlpha: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
          },
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".tech-item",
        { autoAlpha: 0, x: -20 },
        {
          scrollTrigger: {
            trigger: ".tech-list",
            start: "top 85%",
          },
          autoAlpha: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".experience-item",
        { autoAlpha: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".experience-section",
            start: "top 80%",
          },
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".contact-content",
        { autoAlpha: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 85%",
          },
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col justify-between font-mono bg-white bg-[radial-gradient(#00000022_1px,transparent_1px)] bg-size-[16px_16px]"
    >
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="flex justify-between max-w-5xl w-full h-full mx-auto py-4 px-4">
          <div className="flex flex-col nav-item">
            <h1 className="font-medium text-2xl">Timothy</h1>
            <p className="text-gray-500 text-[0.80rem]">Frontend Developer</p>
          </div>

          <div className="hidden md:flex items-center">
            <div className="bg-white border border-gray-300 flex gap-2 lg:gap-4 p-1 rounded-md nav-item">
              {[
                { label: "Home", section: "header" },
                { label: "Projects", section: "projects" },
                { label: "About", section: "about" },
                { label: "Contact", section: "contact" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section, item.label)}
                  className={`px-3 lg:px-4 py-1 rounded-md transition cursor-pointer font-medium text-sm lg:text-base ${
                    active === item.label
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className="md:hidden p-2 nav-item"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", section: "header" },
                { label: "Projects", section: "projects" },
                { label: "About", section: "about" },
                { label: "Contact", section: "contact" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section, item.label)}
                  className={`px-4 py-3 rounded-md transition cursor-pointer font-medium text-left ${
                    active === item.label
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section
        ref={heroRef}
        id="header"
        className="flex justify-between max-w-5xl w-full mx-auto py-16 md:py-32 lg:py-48 px-4"
      >
        <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-8 py-4">
          <div className="max-w-xl text-center md:text-left">
            <div className="hero-greeting">
              <span className="text-3xl md:text-4xl font-medium">I'm</span>
              <span className="text-3xl md:text-4xl text-red-400 font-medium">
                {" "}
                Tim
              </span>
              ,
            </div>
            <p className="text-lg md:text-xl text-gray-700 hero-description">
              a college student passionate about web development with a growing
              interest in Unity and game dev.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 py-4 items-center justify-center md:justify-start hero-socials">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 transition flex items-center justify-center"
              >
                <FiGithub className="w-full h-full" />
              </a>
              <a
                href={socialLinks.email}
                aria-label="Send me an email"
                className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 transition flex items-center justify-center"
              >
                <FaRegEnvelope className="w-full h-full" />
              </a>
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on Discord"
                className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 transition flex items-center justify-center"
              >
                <RiDiscordLine className="w-full h-full" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-black font-semibold cursor-pointer hover:bg-gray-50 transition text-sm md:text-base"
              >
                Download CV
                <FileDown className="w-4 h-4" />
              </a>
            </div>
          </div>
          <img
            src={logo}
            alt="Timothy - Frontend Developer"
            className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover hero-image"
          />
        </div>
      </section>

      <section
        ref={projectsRef}
        id="projects"
        className="flex flex-col items-center max-w-5xl w-full min-h-screen mx-auto py-16 md:py-24 px-4"
      >
        <h2 className="font-medium text-2xl text-center py-4 section-title">
          Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {projectTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeFilter === tag
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects
            .filter(
              (project) =>
                activeFilter === "All" || project.tags.includes(activeFilter),
            )
            .map((project) => (
              <article
                key={project.title}
                className="p-4 rounded-md h-fit transition-all duration-300 hover:-translate-y-1 project-card"
              >
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="rounded-md mb-3"
                  loading="lazy"
                  
                />
                <a
                  href={project.links || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="font-semibold text-2xl hover:text-red-500">{project.title}</h3>
                </a>

                <p className="text-gray-500 text-sm font-medium mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
        </div>
      </section>

      <section
        ref={aboutRef}
        id="about"
        className="max-w-5xl w-full min-h-screen mx-auto py-24 px-4"
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-medium text-2xl text-center section-title">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-6 about-text">
                <div className="relative">
                  <img
                    src={logo}
                    alt="Timothy - Frontend Developer"
                    className="w-full max-w-xs mx-auto rounded-2xl object-cover shadow-lg"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-3 -right-3 md:right-auto md:-left-3 bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                    Open to Work
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-gray-500">
                  <p className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <MapPin
                      className="w-4 h-4 text-red-400"
                      aria-hidden="true"
                    />
                    Pampanga, Philippines
                  </p>
                  <a
                    href={socialLinks.email}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <FaRegEnvelope
                      className="w-4 h-4 text-red-400"
                      aria-hidden="true"
                    />
                    Email Me
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <article className="about-text">
                  <h3 className="font-semibold text-xl mb-2">Who I Am</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    I'm{" "}
                    <span className="font-semibold text-red-400">Timothy</span>,
                    a college student and frontend developer who enjoys crafting
                    clean, responsive, and user-focused web experiences. I focus
                    on intuitive interfaces, accessibility, and performance.
                  </p>
                </article>

                <article className="about-text">
                  <h3 className="font-semibold text-xl mb-2">What I Do</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Beyond frontend development, I explore automation and
                    workflow optimization using tools like n8n. I build
                    automated processes that connect APIs, manage data, and
                    reduce repetitive tasks.
                  </p>
                </article>

                <div className="about-text">
                  <h3 className="font-semibold text-xl mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 tech-list">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="tech-item bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200 w-full" />

          <div className="flex flex-col gap-8 experience-section">
            <h2 className="font-medium text-2xl text-center section-title">
              Experience
            </h2>

            <div className="flex flex-col gap-8 mx-auto">
              <article className="experience-item">
                <h3 className="font-semibold text-xl">Frontend Developer</h3>
                <p className="text-gray-400 text-sm">
                  Academic & Personal Projects
                </p>
                <p className="text-gray-500 text-xl text-justify mt-2">
                  Developed responsive and interactive web applications using
                  React, Vite, and Tailwind CSS. Built reusable components,
                  implemented dynamic data rendering, and focused on clean UI,
                  accessibility, and performance across devices.
                </p>
              </article>

              <article className="experience-item">
                <h3 className="font-semibold text-xl">
                  Full-Stack & Admin Dashboard Projects
                </h3>
                <p className="text-gray-400 text-sm">
                  React • Express • MongoDB • Cloudinary
                </p>
                <p className="text-gray-500 text-xl text-justify mt-2">
                  Built admin dashboards with full CRUD functionality,
                  authentication, and image uploads. Integrated REST APIs and
                  managed media storage using Cloudinary.
                </p>
              </article>

              <article className="experience-item">
                <h3 className="font-semibold text-xl">
                  Automation & Workflow Optimization
                </h3>
                <p className="text-gray-400 text-sm">n8n • API Integrations</p>
                <p className="text-gray-500 text-xl text-justify mt-2">
                  Designed automation workflows using n8n to connect APIs,
                  process data, and eliminate repetitive manual tasks with a
                  focus on reliability and maintainability.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        id="contact"
        className="max-w-5xl w-full min-h-screen mx-auto py-24 px-4"
      >
        <div className="flex flex-col gap-8 contact-content">
          <h2 className="font-medium text-2xl text-center section-title">
            Contact Me
          </h2>
          <p className="text-gray-500 text-center max-w-lg mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach
            out. I'll get back to you as soon as possible.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mt-4">
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold text-xl">Get in Touch</h3>

              <div className="flex flex-col gap-4">
                <a
                  href={socialLinks.email}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <div className="w-12 h-12 bg-red-400 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                    <FaRegEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-500 text-sm">
                      timothytenido@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                    <FiGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-gray-500 text-sm">
                      Check out my projects
                    </p>
                  </div>
                </a>

                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                    <RiDiscordLine className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Discord</p>
                    <p className="text-gray-500 text-sm">Let's connect</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-xl">Send a Message</h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-2499.75 opacity-0 pointer-events-none"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="from_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    value={formData.from_name}
                    onChange={(e) =>
                      setFormData({ ...formData, from_name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reply_to"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="reply_to"
                    name="reply_to"
                    required
                    value={formData.reply_to}
                    onChange={(e) =>
                      setFormData({ ...formData, reply_to: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <p className="text-green-600 text-center font-medium">
                    Message sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 text-center font-medium">
                    Failed to send. Please try again.
                  </p>
                )}
                {submitStatus === "rate_limited" && (
                  <p className="text-amber-600 text-center font-medium">
                    Please wait {cooldownRemaining}s before sending another
                    message.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col md:flex-row justify-between max-w-5xl w-full mx-auto items-center gap-4 py-8 md:py-14 px-4 border-t border-gray-200">
        <p className="text-gray-500 text-center md:text-left text-sm md:text-base">
          © 2026 Timothy Tenido. All rights reserved.
        </p>
        <div className="flex gap-4 items-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 transition flex items-center justify-center"
          >
            <FiGithub className="w-full h-full" />
          </a>
          <a
            href={socialLinks.email}
            aria-label="Send me an email"
            className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 transition flex items-center justify-center"
          >
            <FaRegEnvelope className="w-full h-full" />
          </a>
          <a
            href={socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on Discord"
            className="w-8 h-8 bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-800 transition flex items-center justify-center"
          >
            <RiDiscordLine className="w-full h-full" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
