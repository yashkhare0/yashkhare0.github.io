"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Github } from "lucide-react";
import { Labrador } from "@/components/labrador/labrador";

interface ProjectsProps {
  onNavigate?: (section: string) => void;
  isActive?: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Weather Visualizer",
    description: "Atmospheric data meets stunning visuals inspired by anime art styles. Real-time weather with beautiful design.",
    tags: ["Next.js", "Tailwind", "Weather API"],
    liveUrl: "#",
    githubUrl: "#",
    year: "2025",
    featured: true,
  },
  {
    id: "2",
    title: "Design System",
    description: "A comprehensive component library built for consistency. 50+ components with full documentation.",
    tags: ["React", "TypeScript", "Storybook"],
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
  },
  {
    id: "3",
    title: "AI Art Generator",
    description: "Machine learning meets creativity — an interface for generating AI-powered artwork.",
    tags: ["Python", "TensorFlow", "React"],
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
  },
  {
    id: "4",
    title: "E-Commerce Platform",
    description: "Complete shopping experience with elegant product displays and smooth checkout flow.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
  },
];

export function Projects({ onNavigate, isActive = false }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [dogPosition, setDogPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive || !cardsRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Cards reveal with diagonal stagger
    const cards = cardsRef.current.querySelectorAll(".project-card");
    tl.fromTo(
      cards,
      {
        y: 60,
        opacity: 0,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [isActive]);

  // Update dog position based on hovered card
  useEffect(() => {
    if (!hoveredProject || !cardsRef.current) return;

    const card = cardsRef.current.querySelector(`[data-project="${hoveredProject}"]`);
    if (card) {
      const rect = card.getBoundingClientRect();
      const containerRect = cardsRef.current.getBoundingClientRect();
      setDogPosition({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.bottom - containerRect.top,
      });
    }
  }, [hoveredProject]);

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      className="section-viewport"
      style={{
        backgroundColor: "var(--charcoal)",
        color: "var(--cream-white)",
      }}
    >
      {/* Sakura accent shapes */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-5"
        style={{
          backgroundColor: "var(--sakura-pink)",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-32">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--sakura-pink)" }}
            />
            <span
              className="text-sm uppercase tracking-[0.3em] font-body"
              style={{ color: "var(--sakura-pink)" }}
            >
              Selected Work
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display">
            Projects that
            <br />
            <span style={{ color: "var(--sakura-pink)" }}>spark joy</span>
          </h2>
        </div>

        {/* Featured project */}
        {featuredProject && (
          <div
            className="project-card group relative mb-12 p-8 md:p-12 transition-all duration-300"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "2px solid rgba(255, 143, 163, 0.2)",
            }}
            onMouseEnter={() => setHoveredProject(featuredProject.id)}
            onMouseLeave={() => setHoveredProject(null)}
            data-project={featuredProject.id}
          >
            {/* Featured badge */}
            <div
              className="absolute top-0 right-0 px-4 py-2 text-xs uppercase tracking-wider font-body"
              style={{
                backgroundColor: "var(--sakura-pink)",
                color: "var(--charcoal)",
              }}
            >
              ★ Featured
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-sm font-mono opacity-50">{featuredProject.year}</span>
                <h3 className="text-3xl md:text-4xl font-display mt-2 mb-4 group-hover:translate-x-2 transition-transform">
                  {featuredProject.title}
                </h3>
                <p className="text-lg font-body opacity-70 leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono"
                      style={{
                        border: "1px solid rgba(255, 143, 163, 0.3)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      className="btn-geometric flex items-center gap-2"
                      style={{
                        backgroundColor: "var(--sakura-pink)",
                        color: "var(--charcoal)",
                      }}
                    >
                      View Project
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      className="btn-outline flex items-center gap-2"
                      style={{
                        borderColor: "var(--cream-white)",
                        color: "var(--cream-white)",
                      }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* Placeholder visual */}
              <div
                className="aspect-video md:aspect-square flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 143, 163, 0.1)",
                  border: "2px dashed rgba(255, 143, 163, 0.3)",
                }}
              >
                <span className="text-4xl opacity-20">◇</span>
              </div>
            </div>
          </div>
        )}

        {/* Other projects grid */}
        <div ref={cardsRef} className="relative grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group relative p-6 transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: hoveredProject === project.id ? "rgba(255, 143, 163, 0.05)" : "rgba(255, 255, 255, 0.02)",
                border: `2px solid ${hoveredProject === project.id ? "var(--sakura-pink)" : "rgba(255, 255, 255, 0.05)"}`,
                transform: hoveredProject === project.id ? "translateY(-4px)" : "none",
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-project={project.id}
            >
              {/* Diagonal corner */}
              <div
                className="absolute top-0 right-0 w-0 h-0 transition-all duration-300"
                style={{
                  borderStyle: "solid",
                  borderWidth: hoveredProject === project.id ? "0 40px 40px 0" : "0 0 0 0",
                  borderColor: "transparent var(--sakura-pink) transparent transparent",
                }}
              />

              {/* Year */}
              <span className="text-xs font-mono opacity-50">{project.year}</span>

              {/* Title */}
              <h3 className="text-2xl font-display mt-2 mb-3 group-hover:translate-x-1 transition-transform">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm opacity-60 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono opacity-50"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <ArrowUpRight
                className="absolute top-6 right-6 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: "var(--sakura-pink)" }}
              />
            </div>
          ))}

          {/* Dog that follows hovered card */}
          {hoveredProject && (
            <div
              className="absolute pointer-events-none transition-all duration-300 ease-out"
              style={{
                left: dogPosition.x - 40,
                top: dogPosition.y + 10,
                zIndex: 10,
              }}
            >
              <Labrador pose="curious" size={80} />
            </div>
          )}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {["hero", "about", "skills", "projects", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => onNavigate?.(section)}
            className={`nav-dot ${section === "projects" ? "active" : ""}`}
            style={{
              borderColor: "var(--cream-white)",
              backgroundColor: section === "projects" ? "var(--sakura-pink)" : "transparent",
            }}
            aria-label={`Go to ${section}`}
          />
        ))}
      </div>
    </section>
  );
}
