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
  const dogRef = useRef<SVGSVGElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const earLeftRef = useRef<SVGPathElement>(null);
  const earRightRef = useRef<SVGPathElement>(null);
  const eyeLeftRef = useRef<SVGEllipseElement>(null);
  const eyeRightRef = useRef<SVGEllipseElement>(null);
  const tongueRef = useRef<SVGPathElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPose, setCurrentPose] = useState(pose);

  // Update pose when prop changes
  useEffect(() => {
    setCurrentPose(pose);
  }, [pose]);

  // Tail wagging animation
  useEffect(() => {
    if (!tailRef.current) return;

    const tailAnim = gsap.to(tailRef.current, {
      rotation: currentPose === "excited" ? 25 : currentPose === "playful" ? 18 : 10,
      transformOrigin: "0% 100%",
      duration: currentPose === "excited" ? 0.12 : 0.35,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: currentPose === "sleeping",
    });

    if (currentPose === "sleeping") {
      gsap.set(tailRef.current, { rotation: -5 });
    }

    return () => {
      tailAnim.kill();
    };
  }, [currentPose]);

  // Ear wiggle animation on hover
  useEffect(() => {
    if (!earLeftRef.current || !earRightRef.current) return;

    if (isHovered || currentPose === "curious" || currentPose === "excited") {
      gsap.to(earLeftRef.current, {
        rotation: -5,
        y: -2,
        duration: 0.3,
        ease: "back.out(2)",
      });
      gsap.to(earRightRef.current, {
        rotation: 5,
        y: -2,
        duration: 0.3,
        ease: "back.out(2)",
      });
    } else {
      gsap.to([earLeftRef.current, earRightRef.current], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered, currentPose]);

  // Blinking animation
  useEffect(() => {
    if (!eyeLeftRef.current || !eyeRightRef.current) return;
    if (currentPose === "sleeping") return;

    const blink = () => {
      gsap.to([eyeLeftRef.current, eyeRightRef.current], {
        scaleY: 0.1,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        transformOrigin: "center center",
      });
    };

    const blinkInterval = setInterval(blink, Math.random() * 3000 + 2500);

    return () => clearInterval(blinkInterval);
  }, [currentPose]);

  // Tongue animation for excited/playful
  useEffect(() => {
    if (!tongueRef.current) return;

    if (currentPose === "excited" || currentPose === "playful") {
      gsap.to(tongueRef.current, {
        y: 2,
        scaleY: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    } else {
      gsap.killTweensOf(tongueRef.current);
      gsap.set(tongueRef.current, { y: 0, scaleY: 1 });
    }
  }, [currentPose]);

  // Cursor following
  useEffect(() => {
    if (!followCursor || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;
      
      gsap.to(containerRef.current, {
        x: deltaX * 15,
        y: deltaY * 8,
        rotation: deltaX * 3,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followCursor]);

  // Breathing animation for body
  useEffect(() => {
    if (!dogRef.current) return;

    const breathe = gsap.to(dogRef.current, {
      scaleY: currentPose === "sleeping" ? 1.015 : 1.008,
      scaleX: currentPose === "sleeping" ? 0.992 : 1,
      duration: currentPose === "sleeping" ? 2.5 : 1.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      transformOrigin: "center bottom",
    });

    return () => {
      breathe.kill();
    };
  }, [currentPose]);

  const handleClick = () => {
    // Bounce animation
    gsap.to(containerRef.current, {
      y: -15,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
    onInteract?.();
  };

  const showTongue = currentPose === "excited" || currentPose === "playful";
  const isSleeping = currentPose === "sleeping";

  return (
    <div
      ref={containerRef}
      className={`labrador-container inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ width: size, height: size }}
    >
      <svg
        ref={dogRef}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          transform: isSleeping ? "rotate(-10deg)" : "none",
          transformOrigin: "center center",
        }}
      >
        <defs>
          {/* Labrador cream/yellow fur color */}
          <linearGradient id="furGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5E6C8" />
            <stop offset="100%" stopColor="#E8D4A8" />
          </linearGradient>
          {/* Darker muzzle area */}
          <linearGradient id="muzzleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4C4A0" />
            <stop offset="100%" stopColor="#C4B490" />
          </linearGradient>
          {/* Inner ear */}
          <linearGradient id="earInnerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8D8B8" />
            <stop offset="100%" stopColor="#D8C8A0" />
          </linearGradient>
        </defs>

        {/* === SITTING/STANDING DOG === */}
        {!isSleeping && (
          <>
            {/* Back leg (behind) */}
            <ellipse cx="35" cy="82" rx="10" ry="7" fill="#E8D4A8" />
            <ellipse cx="65" cy="82" rx="10" ry="7" fill="#E8D4A8" />

            {/* Body */}
            <ellipse cx="50" cy="62" rx="28" ry="22" fill="url(#furGradient)" />
            
            {/* Chest highlight */}
            <ellipse cx="50" cy="70" rx="15" ry="12" fill="#F8F0D8" opacity="0.6" />

            {/* Front legs */}
            <rect x="36" y="68" width="10" height="22" rx="5" fill="url(#furGradient)" />
            <rect x="54" y="68" width="10" height="22" rx="5" fill="url(#furGradient)" />
            
            {/* Paws */}
            <ellipse cx="41" cy="90" rx="6" ry="4" fill="#E8D4A8" />
            <ellipse cx="59" cy="90" rx="6" ry="4" fill="#E8D4A8" />
            {/* Paw details */}
            <ellipse cx="39" cy="90" rx="1.5" ry="2" fill="#D8C498" />
            <ellipse cx="41" cy="89" rx="1.5" ry="2" fill="#D8C498" />
            <ellipse cx="43" cy="90" rx="1.5" ry="2" fill="#D8C498" />
            <ellipse cx="57" cy="90" rx="1.5" ry="2" fill="#D8C498" />
            <ellipse cx="59" cy="89" rx="1.5" ry="2" fill="#D8C498" />
            <ellipse cx="61" cy="90" rx="1.5" ry="2" fill="#D8C498" />

            {/* Tail */}
            <path
              ref={tailRef}
              d={currentPose === "excited" 
                ? "M75 55 Q88 42 85 30" 
                : "M75 55 Q85 48 82 38"}
              stroke="url(#furGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />

            {/* Neck */}
            <ellipse cx="50" cy="45" rx="18" ry="12" fill="url(#furGradient)" />

            {/* Head */}
            <ellipse cx="50" cy="32" rx="20" ry="18" fill="url(#furGradient)" />

            {/* Ears - floppy Labrador style */}
            <path
              ref={earLeftRef}
              d="M28 28 Q18 32 20 45 Q22 52 30 48 Q34 44 32 32 Z"
              fill="url(#earInnerGradient)"
              style={{ transformOrigin: "30px 35px" }}
            />
            <path
              ref={earRightRef}
              d="M72 28 Q82 32 80 45 Q78 52 70 48 Q66 44 68 32 Z"
              fill="url(#earInnerGradient)"
              style={{ transformOrigin: "70px 35px" }}
            />

            {/* Forehead fur detail */}
            <ellipse cx="50" cy="24" rx="12" ry="6" fill="#F0E0C0" opacity="0.5" />

            {/* Snout/Muzzle */}
            <ellipse cx="50" cy="42" rx="12" ry="10" fill="url(#muzzleGradient)" />
            
            {/* Snout highlight */}
            <ellipse cx="50" cy="40" rx="8" ry="6" fill="#E8D8B8" opacity="0.4" />

            {/* Nose */}
            <ellipse cx="50" cy="46" rx="5" ry="4" fill="#3D3228" />
            {/* Nose highlight */}
            <ellipse cx="48" cy="44.5" rx="2" ry="1.5" fill="#5D4D40" />
            {/* Nostrils */}
            <ellipse cx="48" cy="46.5" rx="1" ry="0.8" fill="#2D2218" />
            <ellipse cx="52" cy="46.5" rx="1" ry="0.8" fill="#2D2218" />

            {/* Eyes */}
            <ellipse
              ref={eyeLeftRef}
              cx="42"
              cy="30"
              rx="4"
              ry="4.5"
              fill="#3D2815"
              className="labrador-eye"
            />
            <ellipse
              ref={eyeRightRef}
              cx="58"
              cy="30"
              rx="4"
              ry="4.5"
              fill="#3D2815"
              className="labrador-eye"
            />
            {/* Eye whites/reflections */}
            <circle cx="43.5" cy="28.5" r="1.5" fill="white" opacity="0.9" />
            <circle cx="59.5" cy="28.5" r="1.5" fill="white" opacity="0.9" />
            {/* Eye lower reflection */}
            <circle cx="41" cy="31" r="0.8" fill="white" opacity="0.4" />
            <circle cx="57" cy="31" r="0.8" fill="white" opacity="0.4" />
            
            {/* Eyebrows (fur above eyes) */}
            <path d="M38 25 Q42 23 46 25" stroke="#C8B898" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M54 25 Q58 23 62 25" stroke="#C8B898" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Mouth */}
            <path
              d={showTongue 
                ? "M44 50 Q50 54 56 50" 
                : "M46 50 Q50 52 54 50"}
              stroke="#3D3228"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Tongue (when excited/playful) */}
            {showTongue && (
              <path
                ref={tongueRef}
                d="M47 51 Q50 60 53 51"
                fill="#E87A90"
                stroke="#D86A80"
                strokeWidth="0.5"
              />
            )}

            {/* Collar */}
            <path
              d="M32 48 Q50 54 68 48"
              stroke="#FF6B4A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Collar tag */}
            <circle cx="50" cy="54" r="4" fill="#FFB347" stroke="#E09A3D" strokeWidth="1" />
            <circle cx="50" cy="54" r="2" fill="#E09A3D" />

            {/* Whisker dots */}
            <circle cx="38" cy="44" r="0.8" fill="#C8B898" />
            <circle cx="36" cy="46" r="0.8" fill="#C8B898" />
            <circle cx="38" cy="48" r="0.8" fill="#C8B898" />
            <circle cx="62" cy="44" r="0.8" fill="#C8B898" />
            <circle cx="64" cy="46" r="0.8" fill="#C8B898" />
            <circle cx="62" cy="48" r="0.8" fill="#C8B898" />
          </>
        )}

        {/* === SLEEPING DOG === */}
        {isSleeping && (
          <>
            {/* Body - lying down */}
            <ellipse cx="50" cy="60" rx="35" ry="18" fill="url(#furGradient)" />
            
            {/* Chest */}
            <ellipse cx="35" cy="62" rx="12" ry="10" fill="#F8F0D8" opacity="0.5" />

            {/* Back legs tucked */}
            <ellipse cx="72" cy="68" rx="8" ry="6" fill="#E8D4A8" />
            
            {/* Front paws */}
            <ellipse cx="25" cy="70" rx="7" ry="5" fill="#E8D4A8" />
            <ellipse cx="35" cy="72" rx="6" ry="4" fill="#E8D4A8" />

            {/* Tail - resting */}
            <path
              ref={tailRef}
              d="M82 58 Q92 55 95 50"
              stroke="url(#furGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Head - resting on paws */}
            <ellipse cx="30" cy="52" rx="18" ry="15" fill="url(#furGradient)" />

            {/* Ear - floppy, resting */}
            <path
              ref={earLeftRef}
              d="M15 45 Q8 50 12 60 Q16 65 22 58 Q24 52 20 48 Z"
              fill="url(#earInnerGradient)"
            />
            <path
              ref={earRightRef}
              d="M42 42 Q48 38 52 45 Q50 52 44 52 Q40 50 42 45 Z"
              fill="url(#earInnerGradient)"
            />

            {/* Muzzle */}
            <ellipse cx="22" cy="58" rx="10" ry="8" fill="url(#muzzleGradient)" />

            {/* Nose */}
            <ellipse cx="15" cy="58" rx="4" ry="3" fill="#3D3228" />
            <ellipse cx="13.5" cy="57" rx="1.5" ry="1" fill="#5D4D40" />

            {/* Closed eyes - peaceful sleeping */}
            <path
              d="M28 48 Q32 51 36 48"
              stroke="#3D2815"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M38 46 Q42 49 46 46"
              stroke="#3D2815"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Slight smile while sleeping */}
            <path
              d="M18 62 Q22 64 26 62"
              stroke="#3D3228"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />

            {/* Collar */}
            <path
              d="M20 50 Q30 55 42 48"
              stroke="#FF6B4A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="32" cy="52" r="3" fill="#FFB347" stroke="#E09A3D" strokeWidth="0.8" />

            {/* Zzz */}
            <text x="50" y="35" fontSize="8" fill="#888" fontFamily="sans-serif" opacity="0.6">
              z
            </text>
            <text x="56" y="30" fontSize="10" fill="#888" fontFamily="sans-serif" opacity="0.5">
              z
            </text>
            <text x="64" y="24" fontSize="12" fill="#888" fontFamily="sans-serif" opacity="0.4">
              z
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

// Running labrador for transitions
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
  const legsRef = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Leg animation for running
    legsRef.current.forEach((leg, i) => {
      if (!leg) return;
      gsap.to(leg, {
        rotation: i % 2 === 0 ? 35 : -35,
        transformOrigin: "top center",
        duration: 0.08,
        yoyo: true,
        repeat: -1,
        ease: "linear",
      });
    });

    // Body bounce
    gsap.to(containerRef.current, {
      y: -4,
      duration: 0.08,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size * 0.6,
        transform: direction === "left" ? "scaleX(-1)" : "none",
      }}
    >
      <svg
        viewBox="0 0 150 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="runFurGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5E6C8" />
            <stop offset="100%" stopColor="#E8D4A8" />
          </linearGradient>
        </defs>

        {/* Stretched body for running */}
        <ellipse cx="75" cy="40" rx="42" ry="20" fill="url(#runFurGradient)" />
        
        {/* Chest */}
        <ellipse cx="100" cy="42" rx="12" ry="10" fill="#F8F0D8" opacity="0.5" />

        {/* Back legs */}
        <rect
          ref={(el) => { legsRef.current[0] = el; }}
          x="30" y="50" width="8" height="28" rx="4"
          fill="#E8D4A8"
        />
        <rect
          ref={(el) => { legsRef.current[1] = el; }}
          x="42" y="50" width="8" height="28" rx="4"
          fill="url(#runFurGradient)"
        />

        {/* Front legs */}
        <rect
          ref={(el) => { legsRef.current[2] = el; }}
          x="95" y="50" width="8" height="28" rx="4"
          fill="#E8D4A8"
        />
        <rect
          ref={(el) => { legsRef.current[3] = el; }}
          x="107" y="50" width="8" height="28" rx="4"
          fill="url(#runFurGradient)"
        />

        {/* Tail - streaming behind */}
        <path d="M25 35 Q10 30 5 22" stroke="url(#runFurGradient)" strokeWidth="10" strokeLinecap="round" fill="none" />

        {/* Head */}
        <ellipse cx="125" cy="32" rx="18" ry="16" fill="url(#runFurGradient)" />

        {/* Ear flying back */}
        <path d="M115 22 Q100 18 105 32 Q110 38 118 32" fill="#E8D8B8" />

        {/* Muzzle */}
        <ellipse cx="138" cy="38" rx="10" ry="8" fill="#D4C4A0" />

        {/* Nose */}
        <ellipse cx="145" cy="38" rx="4" ry="3" fill="#3D3228" />

        {/* Eye - focused */}
        <ellipse cx="130" cy="28" rx="3.5" ry="4" fill="#3D2815" />
        <circle cx="131" cy="27" r="1.2" fill="white" opacity="0.9" />

        {/* Mouth open, tongue out */}
        <path d="M138 42 Q142 44 145 42" stroke="#3D3228" strokeWidth="1" fill="none" />
        <path d="M140 43 Q143 52 146 43" fill="#E87A90" />

        {/* Collar */}
        <path d="M112 38 Q125 44 135 38" stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Motion lines */}
        <line x1="0" y1="30" x2="18" y2="30" stroke="#D8C8A0" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="5" y1="40" x2="22" y2="40" stroke="#D8C8A0" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="0" y1="50" x2="15" y2="50" stroke="#D8C8A0" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </svg>
    </div>
  );
}
