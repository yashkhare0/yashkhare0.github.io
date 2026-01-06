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
      rotation: currentPose === "excited" ? 20 : currentPose === "playful" ? 15 : 8,
      transformOrigin: "left center",
      duration: currentPose === "excited" ? 0.15 : 0.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: currentPose === "sleeping",
    });

    if (currentPose === "sleeping") {
      gsap.set(tailRef.current, { rotation: 0 });
    }

    return () => {
      tailAnim.kill();
    };
  }, [currentPose]);

  // Ear perking animation on hover
  useEffect(() => {
    if (!earLeftRef.current || !earRightRef.current) return;

    if (isHovered || currentPose === "curious") {
      gsap.to([earLeftRef.current, earRightRef.current], {
        y: -3,
        duration: 0.3,
        ease: "back.out(2)",
      });
    } else {
      gsap.to([earLeftRef.current, earRightRef.current], {
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
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        transformOrigin: "center center",
      });
    };

    const blinkInterval = setInterval(blink, Math.random() * 3000 + 2000);

    return () => clearInterval(blinkInterval);
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
        x: deltaX * 20,
        y: deltaY * 10,
        rotation: deltaX * 5,
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
      scaleY: currentPose === "sleeping" ? 1.02 : 1.01,
      scaleX: currentPose === "sleeping" ? 0.99 : 1,
      duration: currentPose === "sleeping" ? 2 : 1.5,
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
      y: -20,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
    onInteract?.();
  };

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
          transform: currentPose === "sleeping" ? "rotate(-90deg) scaleX(-1)" : "none",
          transformOrigin: "center center",
        }}
      >
        {/* Body */}
        <ellipse
          cx="50"
          cy="65"
          rx={currentPose === "sleeping" ? "30" : "25"}
          ry={currentPose === "sleeping" ? "18" : "20"}
          fill="#F5F5F5"
          stroke="#E0E0E0"
          strokeWidth="2"
        />

        {/* Back legs (when sitting/standing) */}
        {currentPose !== "sleeping" && (
          <>
            <ellipse cx="35" cy="80" rx="8" ry="6" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
            <ellipse cx="65" cy="80" rx="8" ry="6" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
          </>
        )}

        {/* Front legs */}
        {currentPose !== "sleeping" && (
          <>
            <rect x="38" y="72" width="8" height="18" rx="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
            <rect x="54" y="72" width="8" height="18" rx="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
            {/* Paws */}
            <ellipse cx="42" cy="90" rx="5" ry="3" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
            <ellipse cx="58" cy="90" rx="5" ry="3" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
          </>
        )}

        {/* Tail */}
        <path
          ref={tailRef}
          d={
            currentPose === "sleeping"
              ? "M75 65 Q85 60 88 55"
              : currentPose === "excited"
              ? "M75 55 Q90 45 92 35"
              : "M75 55 Q88 50 90 42"
          }
          stroke="#F5F5F5"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={
            currentPose === "sleeping"
              ? "M75 65 Q85 60 88 55"
              : currentPose === "excited"
              ? "M75 55 Q90 45 92 35"
              : "M75 55 Q88 50 90 42"
          }
          stroke="#E0E0E0"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{ transform: "translate(0, 2px)" }}
          opacity="0.3"
        />

        {/* Head */}
        <ellipse
          cx="50"
          cy={currentPose === "sleeping" ? "50" : "38"}
          rx="18"
          ry="16"
          fill="#F5F5F5"
          stroke="#E0E0E0"
          strokeWidth="2"
        />

        {/* Snout */}
        <ellipse
          cx="50"
          cy={currentPose === "sleeping" ? "58" : "48"}
          rx="10"
          ry="8"
          fill="#FAFAFA"
          stroke="#E0E0E0"
          strokeWidth="1.5"
        />

        {/* Nose */}
        <ellipse
          cx="50"
          cy={currentPose === "sleeping" ? "62" : "52"}
          rx="5"
          ry="3.5"
          fill="#2D2D2D"
        />
        {/* Nose highlight */}
        <ellipse
          cx="48"
          cy={currentPose === "sleeping" ? "60" : "50"}
          rx="1.5"
          ry="1"
          fill="#4A4A4A"
        />

        {/* Ears */}
        <path
          ref={earLeftRef}
          d={
            currentPose === "sleeping"
              ? "M32 42 Q25 35 28 48 Q30 52 35 48"
              : "M32 28 Q22 22 25 38 Q27 44 35 40"
          }
          fill="#E8E8E8"
          stroke="#D0D0D0"
          strokeWidth="1.5"
          className="labrador-ear"
        />
        <path
          ref={earRightRef}
          d={
            currentPose === "sleeping"
              ? "M68 42 Q75 35 72 48 Q70 52 65 48"
              : "M68 28 Q78 22 75 38 Q73 44 65 40"
          }
          fill="#E8E8E8"
          stroke="#D0D0D0"
          strokeWidth="1.5"
          className="labrador-ear"
        />

        {/* Eyes */}
        {currentPose === "sleeping" ? (
          <>
            {/* Closed eyes - curved lines */}
            <path
              d="M40 45 Q43 48 46 45"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 45 Q57 48 60 45"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            {/* Open eyes */}
            <ellipse
              ref={eyeLeftRef}
              cx="42"
              cy="35"
              rx="4"
              ry="4.5"
              fill="#2D2D2D"
              className="labrador-eye"
            />
            <ellipse
              ref={eyeRightRef}
              cx="58"
              cy="35"
              rx="4"
              ry="4.5"
              fill="#2D2D2D"
              className="labrador-eye"
            />
            {/* Eye highlights */}
            <circle cx="43.5" cy="33.5" r="1.5" fill="white" />
            <circle cx="59.5" cy="33.5" r="1.5" fill="white" />
            {/* Eye whites */}
            <ellipse cx="42" cy="35" rx="5" ry="5.5" fill="white" style={{ zIndex: -1 }} />
            <ellipse cx="58" cy="35" rx="5" ry="5.5" fill="white" style={{ zIndex: -1 }} />
            {/* Actual pupils on top */}
            <ellipse cx="42" cy="35" rx="3.5" ry="4" fill="#3D2314" />
            <ellipse cx="58" cy="35" rx="3.5" ry="4" fill="#3D2314" />
            <circle cx="43" cy="33.5" r="1.2" fill="white" />
            <circle cx="59" cy="33.5" r="1.2" fill="white" />
          </>
        )}

        {/* Mouth - happy expression */}
        {currentPose !== "sleeping" && (
          <path
            d={
              currentPose === "excited" || currentPose === "playful"
                ? "M44 54 Q50 58 56 54"
                : "M46 53 Q50 55 54 53"
            }
            stroke="#2D2D2D"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Tongue when excited */}
        {(currentPose === "excited" || currentPose === "playful") && (
          <path
            d="M48 55 Q50 62 52 55"
            fill="#FF8FA3"
            stroke="#E07A8D"
            strokeWidth="1"
          />
        )}

        {/* Chest fluff */}
        <ellipse
          cx="50"
          cy={currentPose === "sleeping" ? "55" : "58"}
          rx="12"
          ry="8"
          fill="#FEFEFE"
          opacity="0.6"
        />

        {/* Collar */}
        <path
          d={
            currentPose === "sleeping"
              ? "M35 52 Q50 56 65 52"
              : "M35 45 Q50 50 65 45"
          }
          stroke="#FF7356"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Collar tag */}
        <circle
          cx="50"
          cy={currentPose === "sleeping" ? "56" : "50"}
          r="4"
          fill="#FFB347"
          stroke="#E09A3D"
          strokeWidth="1"
        />
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

  useEffect(() => {
    if (!containerRef.current) return;

    // Leg animation for running
    const legs = containerRef.current.querySelectorAll(".running-leg");
    legs.forEach((leg, i) => {
      gsap.to(leg, {
        rotation: i % 2 === 0 ? 30 : -30,
        transformOrigin: "top center",
        duration: 0.1,
        yoyo: true,
        repeat: -1,
        ease: "linear",
      });
    });

    // Body bounce
    gsap.to(containerRef.current, {
      y: -5,
      duration: 0.1,
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
        {/* Stretched body for running motion blur effect */}
        <ellipse cx="75" cy="45" rx="45" ry="22" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="2" />

        {/* Back legs */}
        <rect className="running-leg" x="25" y="55" width="8" height="25" rx="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
        <rect className="running-leg" x="40" y="55" width="8" height="25" rx="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />

        {/* Front legs */}
        <rect className="running-leg" x="100" y="55" width="8" height="25" rx="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
        <rect className="running-leg" x="115" y="55" width="8" height="25" rx="4" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />

        {/* Tail - streaming behind */}
        <path d="M20 40 Q5 35 0 30" stroke="#F5F5F5" strokeWidth="8" strokeLinecap="round" fill="none" />

        {/* Head */}
        <ellipse cx="125" cy="35" rx="18" ry="16" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="2" />

        {/* Snout */}
        <ellipse cx="138" cy="40" rx="10" ry="7" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1.5" />

        {/* Nose */}
        <ellipse cx="145" cy="40" rx="4" ry="3" fill="#2D2D2D" />

        {/* Ears - flying back */}
        <path d="M115 22 Q100 15 105 30" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1.5" />
        <path d="M120 20 Q108 12 112 28" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1.5" />

        {/* Eyes - focused */}
        <ellipse cx="130" cy="32" rx="3" ry="3.5" fill="#3D2314" />
        <circle cx="131" cy="31" r="1" fill="white" />

        {/* Tongue flapping */}
        <path d="M140 45 Q145 55 142 50" fill="#FF8FA3" stroke="#E07A8D" strokeWidth="1" />

        {/* Collar */}
        <path d="M110 38 Q125 45 135 38" stroke="#FF7356" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Motion lines */}
        <line x1="0" y1="35" x2="15" y2="35" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="5" y1="45" x2="20" y2="45" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="0" y1="55" x2="12" y2="55" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </svg>
    </div>
  );
}
