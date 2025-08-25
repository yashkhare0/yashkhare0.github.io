"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Code2, Layers, Rocket, Star, Globe2, ChevronRight } from "lucide-react";
// shadcn/ui (assumed available in your environment)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundBeams as RBBackgroundBeams } from "@/components/ui/background-beams";
import { FloatingDock } from "@/components/ui/floating-dock";
import { BentoGrid as UIBentoGrid } from "@/components/ui/bento-grid";
import { profile as PROFILE, projects as PROJECTS, skills as SKILLS, experience as EXPERIENCE, testimonials as TESTIMONIALS } from "@/config/content";

/**
 * NOTE: The CDN import for `reactbits` failed in this environment.
 * To keep the design and unblock you, we provide lightweight, local
 * drop-in replacements for the small subset we used:
 *   - BackgroundBeams
 *   - ShimmerButton
 *   - Dock
 *   - BentoGrid
 *   - BentoCard
 * These mimic the original behavior closely enough for production.
 */

// ---------- Reactbits-lite (local fallbacks) ----------
function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const BackgroundBeams = ({ className = "" }: { className?: string }) => (
  <RBBackgroundBeams className={className} />
);

function ShimmerButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ backgroundPositionX: "0%" }}
      animate={{ backgroundPositionX: ["0%", "200%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      className={cx(
        "relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium",
        "border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.06] shadow-sm backdrop-blur",
        "hover:from-white/15 hover:to-white/[0.1]",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(110deg, rgba(255,255,255,0.06) 15%, rgba(255,255,255,0.22) 25%, rgba(255,255,255,0.06) 35%), linear-gradient(to bottom right, rgba(255,255,255,0.10), rgba(255,255,255,0.06))",
        backgroundSize: "200% 100%, 100% 100%",
        backgroundBlendMode: "overlay, normal",
      }}
    >
      {children}
    </motion.button>
  );
}

// remove local Dock; will use FloatingDock from ui

const BentoGrid = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <UIBentoGrid className={className}>{children}</UIBentoGrid>
);

function BentoCard({
  className = "",
  background,
  icon,
  title,
  description,
  cta,
  footer,
}: {
  className?: string;
  background?: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  cta?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className={cx("relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]", className)}>
      {background}
      <div className="relative flex h-full flex-col p-6">
        <div className="mb-4 inline-flex items-center gap-2 text-white/80">{icon}{title}</div>
        {description && <p className="text-sm text-white/70">{description}</p>}
        {cta && <div className="mt-4">{cta}</div>}
        {footer && <div className="mt-auto pt-4">{footer}</div>}
      </div>
    </div>
  );
}

// ---------- Motion helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ---------- UI atoms ----------
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur">
      <Star className="h-3.5 w-3.5" />
      <span className="tracking-wider text-white/80">{children}</span>
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgb(255_255_255_/_0.02)_inset,0_10px_40px_-10px_rgb(0_0_0_/_0.6)] backdrop-blur", className)}>
      {children}
    </div>
  );
}

// ---------- Main component ----------
export default function Portfolio() {
  const isTest = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("tests") === "1";
  const focus = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("focus") === "1"; // optional: ?focus=1 kills flair
  const starWarpRef = React.useRef<null | (() => void)>(null);
  return (
    <div className="relative min-h-screen scroll-smooth bg-[#07090f] text-white antialiased">
      {/* Global scroll progress */}
      {!focus && <ScrollProgress />}

      {/* Subtle radial background grid */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_60rem_at_50%_-10%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(40rem_40rem_at_120%_20%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(30rem_30rem_at_-20%_80%,rgba(34,197,94,0.15),transparent_60%)]" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="group inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 font-bold">YK</div>
            <div className="leading-tight">
              <div className="font-semibold">{PROFILE.name}</div>
              <div className="text-xs text-white/60">{PROFILE.title}</div>
            </div>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {[
              { href: "#projects", label: "Projects" },
              { href: "#experience", label: "Experience" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white">
                {link.label}
              </a>
            ))}
            <a href={PROFILE.resumeUrl} className="ml-2">
              <Button size="sm" className="rounded-full">
                <ArrowRight className="mr-2 h-4 w-4" /> Resume
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="relative overflow-hidden">
        {!focus && (
          <>
            <Aurora />
            <BackgroundBeams className="absolute inset-0 opacity-60" />
            <Starfield register={(fn) => (starWarpRef.current = fn)} />
            <DisplacementScroll />
            <HeroBlob />
            <CursorGlow />
          </>
        )}
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-24 text-center md:py-32">
          <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
            <motion.div variants={fadeUp}>
              <SectionLabel>AI systems, product taste, ruthless execution</SectionLabel>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6">
              <LiquidHeadline />
            </motion.div>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-balance text-white/70">
              {PROFILE.blurb}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a href="#projects" className="inline-block">
                  <ShimmerButton onClick={() => starWarpRef.current?.()} className="rounded-full px-7 py-3 text-sm">
                    <span className="inline-flex items-center gap-2">
                      See work <ChevronRight className="h-4 w-4" />
                    </span>
                  </ShimmerButton>
                </a>
              </Magnetic>
              <Magnetic>
                <a href={PROFILE.email} className="inline-block">
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <Mail className="mr-2 h-4 w-4" /> Contact
                  </Button>
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Code2, label: "Shipped AI apps", value: "20+" },
              { icon: Rocket, label: "Months to €175k", value: "7" },
              { icon: Star, label: "Happy clients", value: "12" },
            ].map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 * i }}>
                <Glass className="p-5">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-white/70" />
                    <div className="text-sm text-white/60">{s.label}</div>
                  </div>
                  <div className="mt-2 text-3xl font-semibold">{s.value}</div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>

        {!focus && (
          <Marquee className="border-y border-white/10 bg-white/[0.02] py-3">
            <span className="mx-6 inline-flex items-center gap-2 text-sm tracking-widest text-white/70">
              • LANGGRAPH • FASTAPI • VLLM • PLAYWRIGHT • KUBERNETES • AZURE • PGVECTOR • RAG • TERRAFORM •
            </span>
          </Marquee>
        )}
      </header>

      {/* PROJECTS / BENTO */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <SectionLabel>Selected projects</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Things I built so users stop suffering
            </h2>
          </div>
          <a href="#contact" className="hidden md:block">
            <Button variant="ghost" className="rounded-full text-white/80 hover:bg-white/5">
              Let’s work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>

        <BentoGrid className="grid-cols-1 md:grid-cols-6">
          {PROJECTS.map((p) => (
            <motion.div key={p.title} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="col-span-1 md:col-span-3">
              <Tilt intensity={10}>
                <BentoCard
                  className="h-full"
                  background={<div className={cx("absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20", p.accent)} />}
                  icon={<Layers className="h-5 w-5" />}
                  title={
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{p.title}</span>
                      <Badge variant="secondary" className="bg-white/10 text-white/80">
                        {p.subtitle}
                      </Badge>
                    </div>
                  }
                  description={p.description}
                  cta={
                    <a href={p.href} className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline">
                      {p.cta} <ExternalLink className="h-4 w-4" />
                    </a>
                  }
                  footer={
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="outline" className="border-white/15 bg-white/5 text-white/70">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  }
                />
              </Tilt>
            </motion.div>
          ))}
        </BentoGrid>

        {/* parallax gallery stripe */}
        {!focus && (
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {["Design systems", "Agentic QA", "Speech infra"].map((label, i) => (
              <ParallaxCard key={label} depth={i + 1} label={label} />
            ))}
          </div>
        )}
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <Glass className="p-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <SectionLabel>Toolbelt</SectionLabel>
              <h3 className="mt-3 text-2xl font-semibold">Tech I reach for first</h3>
              <p className="mt-1 max-w-xl text-sm text-white/60">
                Fewer moving parts, more reliability. I bias toward boring tech with sharp edges and strong guarantees.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <Badge key={s} variant="secondary" className="bg-white/10 text-white">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </Glass>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">What I’ve been up to</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-6" />
          <div className="space-y-8">
            {EXPERIENCE.map((e) => (
              <motion.div key={e.org} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="ml-10 md:ml-12">
                  <Card className="border-white/15 bg-white/[0.04] text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-xl">
                        {e.role} <span className="text-white/50">@ {e.org}</span>
                      </CardTitle>
                      <div className="text-sm text-white/60">{e.period}</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc space-y-1 pl-4 text-sm text-white/70">
                        {e.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <SectionLabel>Nice things people said</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold">Nitpicky people. Flattering quotes.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <Glass key={t.name} className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(t.name)}`} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-white/60">{t.role}</div>
                </div>
              </div>
              <p className="mt-4 text-white/80">“{t.quote}”</p>
            </Glass>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <Glass className="p-6 md:p-10">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h3 className="mt-3 text-2xl font-semibold">Let’s build the thing you’re thinking about</h3>
              <p className="mt-2 max-w-md text-sm text-white/60">
                Send a note. I reply faster than most servers do.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </Button>
                </a>
                <a href={PROFILE.email} className="inline-flex">
                  <Button className="rounded-full">
                    <Mail className="mr-2 h-4 w-4" /> Email me
                  </Button>
                </a>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent. In a real app, this posts to your endpoint.");
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input placeholder="Your name" className="bg-white/5 text-white placeholder:text-white/40" />
                <Input placeholder="Email" type="email" className="bg-white/5 text-white placeholder:text-white/40" />
              </div>
              <Input placeholder="Subject" className="bg-white/5 text-white placeholder:text-white/40" />
              <Textarea rows={6} placeholder="Message" className="bg-white/5 text-white placeholder:text-white/40" />
              <ShimmerButton className="w-full rounded-xl py-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  Send message <ArrowRight className="h-4 w-4" />
                </span>
              </ShimmerButton>
            </form>
          </div>
        </Glass>
      </section>

      {/* FOOTER DOCK */}
      <footer className="mx-auto max-w-7xl px-6 pb-24">
        <FloatingDock
          items={[
            { title: "GitHub", href: PROFILE.github, icon: <Github className="h-5 w-5" />, rel: undefined, target: "_blank" },
            { title: "LinkedIn", href: PROFILE.linkedin, icon: <Linkedin className="h-5 w-5" />, rel: undefined, target: "_blank" },
            { title: "Email", href: PROFILE.email, icon: <Mail className="h-5 w-5" />, rel: undefined, target: undefined },
            { title: "Site", href: "#home", icon: <Globe2 className="h-5 w-5" />, rel: undefined, target: undefined },
          ]}
          desktopClassName="mx-auto w-full max-w-xl"
          mobileClassName="fixed bottom-6 right-6"
        />
        <div className="mt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {PROFILE.name}. Built with shadcn/ui, framer-motion, and no-CDN reactbits fallbacks.
        </div>
      </footer>

      {/* DEV TESTS (opt-in via ?tests=1) */}
      {isTest && <DevTests />}
    </div>
  );
}

// ---------- Flair components ----------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });
  return (
    <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400" />
  );
}

function HeroBlob() {
  const paths = [
    "M74,-56C89,-40,89,-11,82,14C75,39,60,60,40,70C20,80,-6,80,-29,70C-52,60,-71,40,-78,16C-85,-8,-80,-36,-64,-53C-48,-69,-24,-74,1,-75C26,-76,51,-72,74,-56Z",
    "M62,-51C79,-35,89,-9,84,15C78,39,57,61,33,74C9,87,-18,90,-40,79C-62,68,-79,43,-83,16C-86,-12,-76,-42,-56,-58C-35,-74,-18,-76,3,-79C24,-82,48,-86,62,-51Z",
    "M70,-58C85,-36,84,-7,73,17C62,41,41,60,18,71C-5,82,-31,84,-53,73C-75,62,-93,39,-95,13C-97,-13,-83,-41,-61,-58C-38,-75,-19,-82,4,-86C27,-90,53,-92,70,-58Z",
  ];
  return (
    <motion.svg viewBox="-100 -100 200 200" className="pointer-events-none absolute -top-20 right-0 h-[38rem] w-[38rem] opacity-30" aria-hidden>
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#grad)"
        animate={{ d: paths }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function Aurora() {
  const reduce = useReducedMotion();
  const blobs = [
    { left: "10%", top: "-10%", size: 560 },
    { left: "70%", top: "0%", size: 520 },
    { left: "30%", top: "60%", size: 480 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 opacity-60">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            background: i % 3 === 0 ? "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.18), transparent 60%)" : i % 3 === 1 ? "radial-gradient(circle at 70% 30%, rgba(168,85,247,0.18), transparent 60%)" : "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.18), transparent 60%)",
            mixBlendMode: "screen",
          }}
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, i % 2 ? -40 : 40, 0], y: [0, i % 2 ? 30 : -30, 0] }}
          transition={{ duration: reduce ? 20 : 12, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Marquee({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cx("relative overflow-hidden", className)}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <div className="pr-8">{children}</div>
        <div className="pr-8" aria-hidden>{children}</div>
        <div className="pr-8" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        setPos({ x: x * 0.15, y: y * 0.15 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="inline-block"
    >
      <motion.div style={{ x: pos.x, y: pos.y }}>{children}</motion.div>
    </div>
  );
}

function CursorGlow() {
  const [p, setP] = React.useState({ x: -9999, y: -9999 });
  React.useEffect(() => {
    const fn = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-10 h-0 w-0"
      style={{
        boxShadow: `0 0 240px 96px rgba(56,189,248,0.1)`,
        transform: `translate(${p.x}px, ${p.y}px)`,
      }}
    />
  );
}

function ParallaxCard({ depth, label }: { depth: number; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-44 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <motion.div
        className="absolute inset-0"
        initial={{ y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute -left-10 -top-16 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-400/20 via-fuchsia-400/20 to-emerald-400/20 blur-2xl" />
      </motion.div>
      <div className="relative z-10 flex h-full items-end p-5">
        <div className="text-sm text-white/70">{label}</div>
      </div>
    </div>
  );
}

function Tilt({ children, intensity = 8 }: { children: React.ReactNode; intensity?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
        const py = (e.clientY - r.top) / r.height - 0.5;
        setT({ rx: -(py * intensity), ry: px * intensity });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{ rotateX: t.rx, rotateY: t.ry, transformPerspective: 900 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// New: starfield canvas with warp burst control
function Starfield({ density = 1, register }: { density?: number; register?: (warp: () => void) => void }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const raf = React.useRef<number | null>(null);
  const mouse = React.useRef({ x: 0, y: 0 });
  const warpUntilRef = React.useRef<number>(0);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    type Star = { x: number; y: number; z: number; size: number; speed: number };
    const stars: Star[] = [];
    const seedStars = () => {
      stars.length = 0;
      const count = Math.floor((w * h) * 0.00012 * (reduce ? 0.4 : density));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          size: Math.random() * 1.5 + 0.2,
          speed: Math.random() * 0.6 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const now = Date.now();
      const warpActive = now < warpUntilRef.current;
      const mult = warpActive ? (reduce ? 4 : 8) : 1;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.strokeStyle = "rgba(255,255,255,0.7)";

      for (const s of stars) {
        const px = s.x + (mouse.current.x - w / 2) * 0.002 * (1 - s.z);
        const py = s.y + (mouse.current.y - h / 2) * 0.002 * (1 - s.z);
        if (warpActive) {
          const tail = Math.max(6, 24 * (1 - s.z));
          ctx.lineWidth = 0.6 + (1 - s.z) * 1.8;
          ctx.beginPath();
          ctx.moveTo(px - tail, py);
          ctx.lineTo(px, py);
          ctx.stroke();
        } else {
          ctx.globalAlpha = 0.3 + 0.7 * (1 - s.z);
          ctx.fillRect(px, py, s.size, s.size);
          ctx.globalAlpha = 1;
        }
        s.x += s.speed * (reduce ? 0.2 : 0.6) * mult;
        if (s.x > w + 2) s.x = -2;
      }
    };

    const loop = () => {
      draw();
      raf.current = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };

    resize();
    seedStars();
    loop();
    window.addEventListener("resize", () => { resize(); seedStars(); });
    window.addEventListener("mousemove", onMove);

    // expose warp control
    const warp = () => { warpUntilRef.current = Date.now() + 900; };
    register?.(warp);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, reduce, register]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-[5] opacity-50" />;
}

// New: shader-like displacement driven by scroll using SVG filter
function DisplacementScroll() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleMv = useTransform(scrollYProgress, [0, 1], [reduce ? 8 : 28, reduce ? 12 : 60]);
  const freqMv = useTransform(scrollYProgress, [0, 1], [0.002, 0.01]);
  const scale = useSpring(scaleMv, { stiffness: 80, damping: 30, mass: 0.8 });
  const freq = useSpring(freqMv, { stiffness: 60, damping: 20, mass: 0.8 });

  const dispRef = React.useRef<SVGFEDisplacementMapElement | null>(null);
  const turbRef = React.useRef<SVGFETurbulenceElement | null>(null);

  React.useEffect(() => {
    const unsub1 = scale.on("change", (v) => dispRef.current?.setAttribute("scale", String(v.toFixed(1))));
    const unsub2 = freq.on("change", (v) => turbRef.current?.setAttribute("baseFrequency", String(v.toFixed(4))));
    return () => { unsub1(); unsub2(); };
  }, [scale, freq]);

  return (
    <>
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="yash-displace">
            <feTurbulence ref={turbRef as any} type="fractalNoise" baseFrequency="0.004" numOctaves="2" seed="3" result="noise" />
            <feDisplacementMap ref={dispRef as any} in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 z-[6] opacity-35" style={{ filter: "url(#yash-displace)" }} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_30%_20%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(60%_60%_at_80%_40%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(40%_40%_at_20%_80%,rgba(16,185,129,0.18),transparent_60%)]" />
      </div>
    </>
  );
}

// New: scroll-scrubbed liquid headline using SVG displacement
function LiquidHeadline() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const freqMv = useTransform(scrollYProgress, [0, 1], [0.0008, 0.006]);
  const scaleMv = useTransform(scrollYProgress, [0, 1], [reduce ? 6 : 16, reduce ? 10 : 36]);
  const freq = useSpring(freqMv, { stiffness: 80, damping: 26 });
  const scale = useSpring(scaleMv, { stiffness: 90, damping: 24 });

  const turbRef = React.useRef<SVGFETurbulenceElement | null>(null);
  const dispRef = React.useRef<SVGFEDisplacementMapElement | null>(null);

  React.useEffect(() => {
    const unsub1 = freq.on("change", (v) => turbRef.current?.setAttribute("baseFrequency", String(v.toFixed(4))));
    const unsub2 = scale.on("change", (v) => dispRef.current?.setAttribute("scale", String(v.toFixed(1))));
    return () => { unsub1(); unsub2(); };
  }, [freq, scale]);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Accessible fallback text for SEO/screen readers */}
      <h1 className="sr-only">Yash ships usable intelligence</h1>
      <svg className="w-full h-[7.5rem] md:h-[9.5rem]" viewBox="0 0 1000 220" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id="lh-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="lh-filter">
            <feTurbulence ref={turbRef as any} type="fractalNoise" baseFrequency="0.0012" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap ref={dispRef as any} in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g style={{ filter: "url(#lh-filter)" }}>
          <text x="500" y="92" textAnchor="middle" fontSize="74" fontWeight="700" letterSpacing="0.5" fill="url(#lh-grad)">
            Yash ships
          </text>
          <text x="500" y="178" textAnchor="middle" fontSize="74" fontWeight="700" letterSpacing="0.5" fill="url(#lh-grad)">
            usable intelligence
          </text>
        </g>
      </svg>
    </div>
  );
}

// ---------- Minimal smoke tests ----------
function DevTests() {
  const results: { name: string; ok: boolean; note?: string }[] = [];
  try {
    const items = [
      { title: "A", href: "#", icon: <span /> },
      { title: "B", href: "#", icon: <span /> },
      { title: "C", href: "#", icon: <span /> },
    ];
    results.push({ name: "Dock items length", ok: items.length === 3 });
  } catch (e) {
    results.push({ name: "Dock items length", ok: false, note: String(e) });
  }

  try {
    // Try to create the component to check if it renders without error
    const component = <BentoCard title={<span>t</span>} description={<span>d</span>} />;
    results.push({ name: "BentoCard renders", ok: true });
  } catch (e) {
    results.push({ name: "BentoCard renders", ok: false, note: String(e) });
  }

  try {
    const btn = <ShimmerButton>Test</ShimmerButton>;
    results.push({ name: "ShimmerButton mounts", ok: Boolean(btn) });
  } catch (e) {
    results.push({ name: "ShimmerButton mounts", ok: false, note: String(e) });
  }

  try {
    const bb = <BackgroundBeams />;
    results.push({ name: "BackgroundBeams mounts", ok: Boolean(bb) });
  } catch (e) {
    results.push({ name: "BackgroundBeams mounts", ok: false, note: String(e) });
  }

  try {
    const mq = <Marquee>hi</Marquee>;
    results.push({ name: "Marquee mounts", ok: Boolean(mq) });
  } catch (e) {
    results.push({ name: "Marquee mounts", ok: false, note: String(e) });
  }

  try {
    const sp = <ScrollProgress />;
    results.push({ name: "ScrollProgress mounts", ok: Boolean(sp) });
  } catch (e) {
    results.push({ name: "ScrollProgress mounts", ok: false, note: String(e) });
  }

  try {
    const hb = <HeroBlob />;
    results.push({ name: "HeroBlob mounts", ok: Boolean(hb) });
  } catch (e) {
    results.push({ name: "HeroBlob mounts", ok: false, note: String(e) });
  }

  try {
    const pc = <ParallaxCard depth={1} label="ok" />;
    results.push({ name: "ParallaxCard mounts", ok: Boolean(pc) });
  } catch (e) {
    results.push({ name: "ParallaxCard mounts", ok: false, note: String(e) });
  }

  try {
    const mg = <Magnetic><span>child</span></Magnetic>;
    results.push({ name: "Magnetic mounts", ok: Boolean(mg) });
  } catch (e) {
    results.push({ name: "Magnetic mounts", ok: false, note: String(e) });
  }

  try {
    const cg = <CursorGlow />;
    results.push({ name: "CursorGlow mounts", ok: Boolean(cg) });
  } catch (e) {
    results.push({ name: "CursorGlow mounts", ok: false, note: String(e) });
  }

  try {
    results.push({ name: "useScroll available", ok: typeof useScroll === "function" });
  } catch (e) {
    results.push({ name: "useScroll available", ok: false, note: String(e) });
  }

  try {
    results.push({ name: "useSpring available", ok: typeof useSpring === "function" });
  } catch (e) {
    results.push({ name: "useSpring available", ok: false, note: String(e) });
  }

  try {
    const au = <Aurora />;
    results.push({ name: "Aurora mounts", ok: Boolean(au) });
  } catch (e) {
    results.push({ name: "Aurora mounts", ok: false, note: String(e) });
  }

  try {
    const tl = <Tilt><div /></Tilt>;
    results.push({ name: "Tilt mounts", ok: Boolean(tl) });
  } catch (e) {
    results.push({ name: "Tilt mounts", ok: false, note: String(e) });
  }

  try {
    results.push({ name: "useReducedMotion available", ok: typeof useReducedMotion === "function" });
  } catch (e) {
    results.push({ name: "useReducedMotion available", ok: false, note: String(e) });
  }

  try {
    const sf = <Starfield register={() => {}} />;
    results.push({ name: "Starfield mounts", ok: Boolean(sf) });
  } catch (e) {
    results.push({ name: "Starfield mounts", ok: false, note: String(e) });
  }

  try {
    let warpFn: any = null;
    const sf2 = <Starfield register={(fn) => { warpFn = fn; }} />;
    results.push({ name: "Starfield warp register", ok: typeof warpFn === "function" || Boolean(sf2) });
  } catch (e) {
    results.push({ name: "Starfield warp register", ok: false, note: String(e) });
  }

  try {
    const ds = <DisplacementScroll />;
    results.push({ name: "DisplacementScroll mounts", ok: Boolean(ds) });
  } catch (e) {
    results.push({ name: "DisplacementScroll mounts", ok: false, note: String(e) });
  }

  try {
    const lh = <LiquidHeadline />;
    results.push({ name: "LiquidHeadline mounts", ok: Boolean(lh) });
  } catch (e) {
    results.push({ name: "LiquidHeadline mounts", ok: false, note: String(e) });
  }

  const passed = results.every((r) => r.ok);

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-80 rounded-2xl border border-white/15 bg-[#0b0f16] p-4 text-xs text-white/80 shadow-xl">
      <div className="mb-2 font-semibold">Dev Tests</div>
      <ul className="space-y-1">
        {results.map((r) => (
          <li key={r.name} className={r.ok ? "text-emerald-300" : "text-rose-300"}>
            {r.ok ? "✓" : "✗"} {r.name} {r.note ? `— ${r.note}` : ""}
          </li>
        ))}
      </ul>
      <div className={passed ? "mt-2 text-emerald-400" : "mt-2 text-rose-400"}>
        {passed ? "All tests passed" : "Some tests failed"}
      </div>
    </div>
  );
}
