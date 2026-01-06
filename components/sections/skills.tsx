"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiNeo4J,
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiOpencv,
  SiFlutter,
  SiDjango,
  SiFastapi,
  SiMicrosoftazure,
  SiGithubactions,
  SiLangchain,
} from "react-icons/si";
import { Labrador } from "@/components/labrador/labrador";
import { skills as skillsData, skillCategories } from "@/config/content";

interface SkillsProps {
  onNavigate?: (section: string) => void;
  isActive?: boolean;
}

// Map skill names to their icons
const skillIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "Django": SiDjango,
  "FastAPI": SiFastapi,
  "Node.js": SiNodedotjs,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  "Neo4j": SiNeo4J,
  "MongoDB": SiMongodb,
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "Tailwind": SiTailwindcss,
  "React Native": SiReact,
  "Flutter": SiFlutter,
  "TensorFlow": SiTensorflow,
  "PyTorch": SiPytorch,
  "scikit-learn": SiScikitlearn,
  "NumPy": SiNumpy,
  "Pandas": SiPandas,
  "OpenCV": SiOpencv,
  "Docker": SiDocker,
  "Kubernetes": SiKubernetes,
  "Azure": SiMicrosoftazure,
  "GitHub Actions": SiGithubactions,
  "LangChain": SiLangchain,
  "Python": SiPython,
};

// Default icon for skills without a specific icon
const DefaultIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={className} style={style}>
    <span className="text-2xl">◇</span>
  </div>
);

const skills = skillsData.map(skill => ({
  name: skill.name,
  icon: skillIconMap[skill.name] || DefaultIcon,
  category: skill.category,
}));

const categories = skillCategories;

export function Skills({ onNavigate, isActive = false }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = filter === "all" ? skills : skills.filter((s) => s.category === filter);

  useEffect(() => {
    if (!isActive || !gridRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Skill cards stagger reveal
    const cards = gridRef.current.querySelectorAll(".skill-item");
    tl.fromTo(
      cards,
      { scale: 0, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(2)",
      }
    );
  }, [isActive, filter]);

  return (
    <section
      ref={sectionRef}
      data-section="skills"
      className="section-viewport"
      style={{
        backgroundColor: "var(--cream-white)",
        color: "var(--warm-black)",
      }}
    >
      {/* Geometric decorations */}
      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-10"
        style={{
          backgroundColor: "var(--electric-cyan)",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-48 opacity-10"
        style={{
          backgroundColor: "var(--electric-cyan)",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            {/* Section label */}
            <div className="flex items-center gap-4 mb-4">
              <span
                className="text-sm uppercase tracking-[0.3em] font-body"
                style={{ color: "var(--electric-cyan)" }}
              >
                Skills
              </span>
              <div
                className="w-12 h-[2px]"
                style={{ backgroundColor: "var(--electric-cyan)" }}
              />
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-display">
              Tech
              <br />
              <span style={{ color: "var(--electric-cyan)" }}>Arsenal</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-2 text-sm font-body uppercase tracking-wider transition-all ${
                  filter === cat.key
                    ? "text-white"
                    : "hover:opacity-70"
                }`}
                style={{
                  backgroundColor: filter === cat.key ? "var(--warm-black)" : "transparent",
                  border: `2px solid ${filter === cat.key ? "var(--warm-black)" : "var(--border)"}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="skill-item group relative p-6 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: "white",
                  border: `2px solid ${hoveredSkill === skill.name ? "var(--electric-cyan)" : "var(--border)"}`,
                  transform: hoveredSkill === skill.name ? "translateY(-8px)" : "none",
                  boxShadow: hoveredSkill === skill.name ? "0 10px 30px rgba(0, 212, 255, 0.2)" : "none",
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Diagonal corner accent on hover */}
                <div
                  className="absolute top-0 right-0 w-0 h-0 transition-all duration-300"
                  style={{
                    borderStyle: "solid",
                    borderWidth: hoveredSkill === skill.name ? "0 30px 30px 0" : "0 0 0 0",
                    borderColor: "transparent var(--electric-cyan) transparent transparent",
                  }}
                />

                {/* Icon */}
                <Icon
                  className="w-10 h-10 transition-transform group-hover:scale-110"
                  style={{
                    color: hoveredSkill === skill.name ? "var(--electric-cyan)" : "var(--warm-black)",
                  }}
                />

                {/* Name */}
                <span className="text-sm font-body font-medium">{skill.name}</span>
              </div>
            );
          })}
        </div>

        {/* Dog following hovered skill */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <Labrador
              pose={hoveredSkill ? "playful" : "sitting"}
              size={100}
              followCursor
            />
            {hoveredSkill && (
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-mono whitespace-nowrap animate-overshoot-in"
                style={{
                  backgroundColor: "var(--electric-cyan)",
                  color: "white",
                }}
              >
                {hoveredSkill}!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {["hero", "about", "skills", "projects", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => onNavigate?.(section)}
            className={`nav-dot ${section === "skills" ? "active" : ""}`}
            style={{
              borderColor: "var(--warm-black)",
              backgroundColor: section === "skills" ? "var(--electric-cyan)" : "transparent",
            }}
            aria-label={`Go to ${section}`}
          />
        ))}
      </div>
    </section>
  );
}
