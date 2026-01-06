"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type LabradorPose = "sleeping" | "sitting" | "curious" | "playful" | "excited" | "running";

interface LabradorProps {
  pose?: LabradorPose;
  size?: number;
  className?: string;
  followCursor?: boolean;
  onInteract?: () => void;
}

export function Labrador({
  pose = "sitting",
  size = 120,
  className = "",
  followCursor = false,
  onInteract,
}: LabradorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<SVGGElement>(null);
  const earLeftRef = useRef<SVGGElement>(null);
  const earRightRef = useRef<SVGGElement>(null);
  const eyeLeftRef = useRef<SVGCircleElement>(null);
  const eyeRightRef = useRef<SVGCircleElement>(null);
  const tongueRef = useRef<SVGEllipseElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPose, setCurrentPose] = useState(pose);

  useEffect(() => {
    setCurrentPose(pose);
  }, [pose]);

  // Tail wag
  useEffect(() => {
    if (!tailRef.current || currentPose === "sleeping") return;
    const speed = currentPose === "excited" ? 0.12 : currentPose === "playful" ? 0.2 : 0.4;
    const anim = gsap.to(tailRef.current, {
      rotation: 25,
      transformOrigin: "50% 100%",
      duration: speed,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => { anim.kill(); };
  }, [currentPose]);

  // Ear perk
  useEffect(() => {
    if (!earLeftRef.current || !earRightRef.current) return;
    const active = isHovered || currentPose === "curious" || currentPose === "excited";
    gsap.to(earLeftRef.current, { rotation: active ? -6 : 0, y: active ? -2 : 0, duration: 0.25, ease: "back.out(1.5)", transformOrigin: "100% 30%" });
    gsap.to(earRightRef.current, { rotation: active ? 6 : 0, y: active ? -2 : 0, duration: 0.25, ease: "back.out(1.5)", transformOrigin: "0% 30%" });
  }, [isHovered, currentPose]);

  // Blink
  useEffect(() => {
    if (!eyeLeftRef.current || !eyeRightRef.current || currentPose === "sleeping") return;
    const blink = () => {
      gsap.to([eyeLeftRef.current, eyeRightRef.current], { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1, transformOrigin: "50% 50%" });
    };
    const id = setInterval(blink, 2500 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [currentPose]);

  // Tongue bounce
  useEffect(() => {
    if (!tongueRef.current) return;
    if (currentPose === "excited" || currentPose === "playful") {
      gsap.to(tongueRef.current, { scaleY: 1.2, duration: 0.25, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 0%" });
    } else {
      gsap.killTweensOf(tongueRef.current);
      gsap.set(tongueRef.current, { scaleY: 1 });
    }
  }, [currentPose]);

  // Breathing
  useEffect(() => {
    if (!bodyRef.current) return;
    const anim = gsap.to(bodyRef.current, {
      scaleY: 1.015,
      scaleX: 0.995,
      duration: currentPose === "sleeping" ? 2.5 : 1.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      transformOrigin: "50% 100%",
    });
    return () => { anim.kill(); };
  }, [currentPose]);

  // Cursor follow
  useEffect(() => {
    if (!followCursor || !containerRef.current) return;
    const move = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / window.innerWidth;
      const dy = (e.clientY - rect.top - rect.height / 2) / window.innerHeight;
      gsap.to(containerRef.current, { x: dx * 12, y: dy * 6, rotation: dx * 4, duration: 0.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [followCursor]);

  const handleClick = () => {
    gsap.to(containerRef.current, { y: -12, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" });
    onInteract?.();
  };

  const isSleeping = currentPose === "sleeping";
  const showTongue = currentPose === "excited" || currentPose === "playful";

  return (
    <div
      ref={containerRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="labFur" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F0E6" />
          </linearGradient>
          <linearGradient id="labShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE8DC" />
            <stop offset="100%" stopColor="#E0D9C8" />
          </linearGradient>
          <linearGradient id="labNose" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A4A4A" />
            <stop offset="100%" stopColor="#2A2A2A" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        <g ref={bodyRef}>
          {/* === TAIL === */}
          {!isSleeping && (
            <g ref={tailRef} transform="translate(155, 95)">
              <path d="M0 0 Q25 -15 30 -40 Q32 -55 28 -60" stroke="url(#labShade)" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M0 0 Q25 -15 30 -40 Q32 -55 28 -60" stroke="url(#labFur)" strokeWidth="12" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* === BACK LEGS === */}
          {!isSleeping && (
            <>
              <ellipse cx="60" cy="175" rx="18" ry="12" fill="url(#labShade)" />
              <ellipse cx="140" cy="175" rx="18" ry="12" fill="url(#labShade)" />
            </>
          )}

          {/* === BODY === */}
          <ellipse cx="100" cy="130" rx="55" ry="45" fill="url(#labFur)" filter="url(#softShadow)" />
          {/* Body shading */}
          <ellipse cx="120" cy="140" rx="35" ry="30" fill="url(#labShade)" opacity="0.4" />

          {/* === CHEST === */}
          <ellipse cx="100" cy="115" rx="35" ry="28" fill="#FFFFFF" />

          {/* === FRONT LEGS === */}
          {!isSleeping && (
            <>
              <rect x="72" y="145" width="20" height="40" rx="10" fill="url(#labFur)" />
              <rect x="108" y="145" width="20" height="40" rx="10" fill="url(#labFur)" />
              {/* Paws */}
              <ellipse cx="82" cy="186" rx="12" ry="8" fill="url(#labShade)" />
              <ellipse cx="118" cy="186" rx="12" ry="8" fill="url(#labShade)" />
            </>
          )}

          {/* === SLEEPING BODY === */}
          {isSleeping && (
            <>
              <ellipse cx="100" cy="165" rx="60" ry="22" fill="url(#labFur)" />
              <ellipse cx="50" cy="175" rx="14" ry="10" fill="url(#labShade)" />
              <ellipse cx="150" cy="175" rx="14" ry="10" fill="url(#labShade)" />
            </>
          )}
        </g>

        {/* === HEAD === */}
        <g transform={isSleeping ? "translate(-10, 25) rotate(-20, 100, 70)" : ""}>
          {/* Left Ear */}
          <g ref={earLeftRef}>
            <ellipse cx="52" cy="55" rx="22" ry="32" fill="url(#labFur)" transform="rotate(-15, 52, 55)" />
            <ellipse cx="52" cy="58" rx="14" ry="22" fill="#F5E6DC" transform="rotate(-15, 52, 58)" opacity="0.6" />
          </g>
          
          {/* Right Ear */}
          <g ref={earRightRef}>
            <ellipse cx="148" cy="55" rx="22" ry="32" fill="url(#labFur)" transform="rotate(15, 148, 55)" />
            <ellipse cx="148" cy="58" rx="14" ry="22" fill="#F5E6DC" transform="rotate(15, 148, 58)" opacity="0.6" />
          </g>

          {/* Head */}
          <ellipse cx="100" cy="62" rx="48" ry="42" fill="url(#labFur)" filter="url(#softShadow)" />

          {/* Forehead highlight */}
          <ellipse cx="100" cy="45" rx="25" ry="15" fill="#FFFFFF" opacity="0.5" />

          {/* Muzzle */}
          <ellipse cx="100" cy="82" rx="28" ry="20" fill="#FFFFFF" />

          {/* === FACE === */}
          {!isSleeping ? (
            <>
              {/* Eyes */}
              <circle ref={eyeLeftRef} cx="78" cy="55" r="10" fill="#2D2D2D" />
              <circle ref={eyeRightRef} cx="122" cy="55" r="10" fill="#2D2D2D" />
              {/* Eye shine */}
              <circle cx="82" cy="51" r="4" fill="#FFFFFF" />
              <circle cx="126" cy="51" r="4" fill="#FFFFFF" />
              <circle cx="76" cy="58" r="2" fill="#FFFFFF" opacity="0.5" />
              <circle cx="120" cy="58" r="2" fill="#FFFFFF" opacity="0.5" />

              {/* Eyebrows */}
              <path d="M65 42 Q78 38 88 44" stroke="#C5B8A5" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M112 44 Q122 38 135 42" stroke="#C5B8A5" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Sleeping eyes */}
              <path d="M68 58 Q78 64 88 58" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M112 58 Q122 64 132 58" stroke="#2D2D2D" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="78" rx="12" ry="9" fill="url(#labNose)" />
          <ellipse cx="96" cy="75" rx="4" ry="3" fill="#6A6A6A" opacity="0.5" />

          {/* Mouth */}
          <path d="M100 87 L100 93" stroke="#4A4A4A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M88 94 Q100 102 112 94" stroke="#4A4A4A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Tongue */}
          {showTongue && (
            <ellipse ref={tongueRef} cx="100" cy="100" rx="8" ry="12" fill="#FF9999" />
          )}

          {/* Cheek blush */}
          <ellipse cx="62" cy="72" rx="8" ry="5" fill="#FFCCCC" opacity="0.4" />
          <ellipse cx="138" cy="72" rx="8" ry="5" fill="#FFCCCC" opacity="0.4" />
        </g>

        {/* Zzz */}
        {isSleeping && (
          <g opacity="0.6">
            <text x="140" y="35" fontSize="16" fill="#888" fontFamily="Comic Sans MS, cursive">z</text>
            <text x="155" y="22" fontSize="22" fill="#888" fontFamily="Comic Sans MS, cursive">z</text>
            <text x="172" y="8" fontSize="28" fill="#888" fontFamily="Comic Sans MS, cursive">z</text>
          </g>
        )}
      </svg>
    </div>
  );
}

// Running Labrador - Side Profile
export function RunningLabrador({
  direction = "right",
  size = 150,
  className = "",
}: {
  direction?: "left" | "right";
  size?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const legsRef = useRef<(SVGGElement | null)[]>([]);
  const tailRef = useRef<SVGGElement>(null);
  const earRef = useRef<SVGEllipseElement>(null);
  const tongueRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    // Galloping legs
    legsRef.current.forEach((leg, i) => {
      if (!leg) return;
      gsap.to(leg, {
        rotation: i % 2 === 0 ? 35 : -35,
        transformOrigin: "50% 0%",
        duration: 0.1,
        yoyo: true,
        repeat: -1,
        ease: "linear",
      });
    });

    // Tail wag
    if (tailRef.current) {
      gsap.to(tailRef.current, { rotation: 20, transformOrigin: "0% 100%", duration: 0.12, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    // Ear flop
    if (earRef.current) {
      gsap.to(earRef.current, { rotation: 8, y: 3, transformOrigin: "100% 0%", duration: 0.1, yoyo: true, repeat: -1 });
    }

    // Tongue bounce
    if (tongueRef.current) {
      gsap.to(tongueRef.current, { scaleY: 1.3, duration: 0.15, yoyo: true, repeat: -1, transformOrigin: "50% 0%" });
    }

    // Body bob
    if (containerRef.current) {
      gsap.to(containerRef.current, { y: -4, duration: 0.1, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size * 0.7,
        transform: direction === "left" ? "scaleX(-1)" : "none",
      }}
    >
      <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="runFur" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F0E6" />
          </linearGradient>
          <linearGradient id="runShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDE8DC" />
            <stop offset="100%" stopColor="#E0D9C8" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <g ref={tailRef} transform="translate(25, 55)">
          <path d="M0 0 Q-15 -20 -10 -40 Q-8 -50 -12 -55" stroke="url(#runShade)" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M0 0 Q-15 -20 -10 -40 Q-8 -50 -12 -55" stroke="url(#runFur)" strokeWidth="10" strokeLinecap="round" fill="none" />
        </g>

        {/* Back legs */}
        <g ref={el => { legsRef.current[0] = el; }} transform="translate(45, 75)">
          <rect x="-8" y="0" width="16" height="45" rx="8" fill="url(#runShade)" />
          <ellipse cx="0" cy="48" rx="10" ry="7" fill="url(#runShade)" />
        </g>
        <g ref={el => { legsRef.current[1] = el; }} transform="translate(65, 75)">
          <rect x="-8" y="0" width="16" height="45" rx="8" fill="url(#runFur)" />
          <ellipse cx="0" cy="48" rx="10" ry="7" fill="url(#runShade)" />
        </g>

        {/* Body */}
        <ellipse cx="100" cy="60" rx="60" ry="32" fill="url(#runFur)" />
        <ellipse cx="75" cy="65" rx="30" ry="20" fill="url(#runShade)" opacity="0.4" />

        {/* Chest */}
        <ellipse cx="140" cy="65" rx="25" ry="20" fill="#FFFFFF" />

        {/* Front legs */}
        <g ref={el => { legsRef.current[2] = el; }} transform="translate(135, 75)">
          <rect x="-8" y="0" width="16" height="45" rx="8" fill="url(#runShade)" />
          <ellipse cx="0" cy="48" rx="10" ry="7" fill="url(#runShade)" />
        </g>
        <g ref={el => { legsRef.current[3] = el; }} transform="translate(155, 75)">
          <rect x="-8" y="0" width="16" height="45" rx="8" fill="url(#runFur)" />
          <ellipse cx="0" cy="48" rx="10" ry="7" fill="url(#runShade)" />
        </g>

        {/* Head */}
        <g transform="translate(170, 35)">
          {/* Ear */}
          <ellipse ref={earRef} cx="-15" cy="8" rx="14" ry="22" fill="url(#runFur)" transform="rotate(-30, -15, 8)" />
          <ellipse cx="-15" cy="10" rx="8" ry="14" fill="#F5E6DC" opacity="0.5" transform="rotate(-30, -15, 10)" />

          {/* Head shape */}
          <ellipse cx="15" cy="18" rx="32" ry="28" fill="url(#runFur)" />

          {/* Forehead */}
          <ellipse cx="15" cy="8" rx="18" ry="10" fill="#FFFFFF" opacity="0.4" />

          {/* Muzzle */}
          <ellipse cx="38" cy="25" rx="18" ry="14" fill="#FFFFFF" />

          {/* Eye */}
          <circle cx="22" cy="12" r="7" fill="#2D2D2D" />
          <circle cx="25" cy="9" r="3" fill="#FFFFFF" />

          {/* Eyebrow */}
          <path d="M12 2 Q22 -2 32 4" stroke="#C5B8A5" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Nose */}
          <ellipse cx="52" cy="22" rx="8" ry="6" fill="#3A3A3A" />
          <ellipse cx="50" cy="20" rx="3" ry="2" fill="#5A5A5A" opacity="0.5" />

          {/* Mouth */}
          <path d="M42 30 Q48 35 54 30" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Tongue */}
          <ellipse ref={tongueRef} cx="48" cy="38" rx="6" ry="10" fill="#FF9999" />

          {/* Blush */}
          <ellipse cx="8" cy="28" rx="6" ry="4" fill="#FFCCCC" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
