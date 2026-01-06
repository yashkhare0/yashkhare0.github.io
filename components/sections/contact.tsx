"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { Labrador } from "@/components/labrador/labrador";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface ContactProps {
  onNavigate?: (section: string) => void;
  isActive?: boolean;
}

const socialLinks = [
  { name: "Email", href: "mailto:hello@yashkhare.dev", icon: Mail, label: "hello@yashkhare.dev" },
  { name: "GitHub", href: "https://github.com/yashkhare0", icon: Github, label: "@yashkhare0" },
  { name: "LinkedIn", href: "https://linkedin.com/in/yashkhare0", icon: Linkedin, label: "yashkhare0" },
  { name: "Twitter", href: "https://twitter.com/yashkhare0", icon: Twitter, label: "@yashkhare0" },
];

export function Contact({ onNavigate, isActive = false }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dogMood, setDogMood] = useState<"excited" | "playful">("excited");

  useEffect(() => {
    if (!isActive || !contentRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Title with bounce
    const title = contentRef.current.querySelector("h2");
    if (title) {
      tl.fromTo(
        title,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
      );
    }

    // Subtitle
    const subtitle = contentRef.current.querySelector("p");
    if (subtitle) {
      tl.fromTo(
        subtitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      );
    }

    // Social links stagger
    const links = contentRef.current.querySelectorAll(".social-link");
    tl.fromTo(
      links,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.5)" },
      "-=0.2"
    );

    // Alternate dog mood
    const moodInterval = setInterval(() => {
      setDogMood((prev) => (prev === "excited" ? "playful" : "excited"));
    }, 3000);

    return () => clearInterval(moodInterval);
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      data-section="contact"
      className="section-viewport"
      style={{
        backgroundColor: "var(--sunset-coral)",
        color: "var(--pure-white)",
      }}
    >
      {/* Geometric decorations */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-20"
        style={{
          backgroundColor: "var(--warm-black)",
          clipPath: "polygon(0 100%, 0 0, 100% 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-48 h-48 opacity-20"
        style={{
          backgroundColor: "var(--warm-black)",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      />

      {/* Diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 29px,
            var(--warm-black) 29px,
            var(--warm-black) 30px
          )`,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-32 text-center"
      >
        {/* Happy dog */}
        <div className="mb-8">
          <Labrador pose={dogMood} size={140} />
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display mb-6">
          Let's create
          <br />
          something{" "}
          <span
            className="relative inline-block"
            style={{ color: "var(--warm-black)" }}
          >
            amazing
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C50 2 150 2 198 6"
                stroke="var(--warm-black)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-body opacity-90 max-w-xl mx-auto mb-12">
          Have a project in mind? Or just want to say hello?
          <br />
          I'd love to hear from you!
        </p>

        {/* Main CTA */}
        <a
          href="mailto:hello@yashkhare.dev"
          className="inline-flex items-center gap-3 px-10 py-5 text-lg font-display uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:-rotate-1"
          style={{
            backgroundColor: "var(--warm-black)",
            color: "var(--cream-white)",
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
          }}
        >
          <Mail className="w-5 h-5" />
          Get in Touch
          <ArrowUpRight className="w-5 h-5" />
        </a>

        {/* Social links */}
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="social-link group flex items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-xs opacity-70 font-body">{social.name}</div>
                  <div className="text-sm font-mono">{social.label}</div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-body opacity-70">
            © {new Date().getFullYear()} Yash Khare. Built with{" "}
            <span style={{ color: "var(--warm-black)" }}>♥</span> and lots of ☕
          </p>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => onNavigate?.("hero")}
              className="text-sm font-body opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              Back to top
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {["hero", "about", "skills", "projects", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => onNavigate?.(section)}
            className={`nav-dot ${section === "contact" ? "active" : ""}`}
            style={{
              borderColor: "var(--pure-white)",
              backgroundColor: section === "contact" ? "var(--warm-black)" : "transparent",
            }}
            aria-label={`Go to ${section}`}
          />
        ))}
      </div>
    </section>
  );
}
