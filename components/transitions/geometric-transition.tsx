"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { RunningLabrador } from "@/components/labrador/labrador";

export type TransitionShape = "triangle" | "diagonal" | "circle" | "hexagon";
export type TransitionDirection = "left" | "right" | "top" | "bottom";

interface GeometricTransitionProps {
  shape?: TransitionShape;
  direction?: TransitionDirection;
  color?: string;
  onComplete?: () => void;
}

export interface TransitionHandle {
  play: (targetColor: string) => Promise<void>;
  reverse: () => Promise<void>;
}

export const GeometricTransition = forwardRef<TransitionHandle, GeometricTransitionProps>(
  function GeometricTransition(
    { shape = "diagonal", direction = "right", color = "#FF7356", onComplete },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const shapeRef = useRef<HTMLDivElement>(null);
    const dogContainerRef = useRef<HTMLDivElement>(null);
    const speedLinesRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      play: async (targetColor: string) => {
        if (!containerRef.current || !shapeRef.current || !dogContainerRef.current) return;

        const tl = gsap.timeline();

        // Set the color
        gsap.set(shapeRef.current, { backgroundColor: targetColor });

        // Show container
        gsap.set(containerRef.current, { visibility: "visible" });

        // Get clip paths based on shape and direction
        const { start, end } = getClipPaths(shape, direction);

        // Phase 1: Shape wipes across
        tl.fromTo(
          shapeRef.current,
          { clipPath: start },
          {
            clipPath: end,
            duration: 0.6,
            ease: "power3.inOut",
          }
        );

        // Phase 2: Dog runs across (starts slightly before shape completes)
        tl.fromTo(
          dogContainerRef.current,
          {
            x: direction === "right" ? "-150%" : "150%",
            opacity: 1,
          },
          {
            x: direction === "right" ? "150vw" : "-150vw",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.5"
        );

        // Speed lines
        if (speedLinesRef.current) {
          const lines = speedLinesRef.current.children;
          tl.fromTo(
            lines,
            {
              scaleX: 0,
              opacity: 0,
              x: direction === "right" ? "-100%" : "100%",
            },
            {
              scaleX: 1,
              opacity: 0.6,
              x: direction === "right" ? "100%" : "-100%",
              duration: 0.4,
              stagger: 0.02,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }

        await tl.then();
        onComplete?.();
      },

      reverse: async () => {
        if (!containerRef.current || !shapeRef.current) return;

        const tl = gsap.timeline();

        const { start, end } = getClipPaths(shape, direction);

        // Reverse the shape
        tl.to(shapeRef.current, {
          clipPath: start,
          duration: 0.5,
          ease: "power3.inOut",
        });

        tl.set(containerRef.current, { visibility: "hidden" });

        await tl.then();
      },
    }));

    // Generate speed lines
    const speedLines = Array.from({ length: 15 }, (_, i) => ({
      top: `${5 + i * 6}%`,
      width: `${Math.random() * 30 + 20}%`,
      height: "2px",
      delay: i * 0.02,
    }));

    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {/* Main transition shape */}
        <div
          ref={shapeRef}
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            clipPath: getClipPaths(shape, direction).start,
          }}
        />

        {/* Speed lines */}
        <div ref={speedLinesRef} className="absolute inset-0 overflow-hidden">
          {speedLines.map((line, i) => (
            <div
              key={i}
              className="absolute bg-white/30"
              style={{
                top: line.top,
                left: direction === "right" ? "0" : "auto",
                right: direction === "left" ? "0" : "auto",
                width: line.width,
                height: line.height,
                transformOrigin: direction === "right" ? "left" : "right",
              }}
            />
          ))}
        </div>

        {/* Running dog */}
        <div
          ref={dogContainerRef}
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: direction === "right" ? "0" : "auto",
            right: direction === "left" ? "0" : "auto",
          }}
        >
          <RunningLabrador
            direction={direction === "right" ? "right" : "left"}
            size={180}
          />
        </div>
      </div>
    );
  }
);

function getClipPaths(shape: TransitionShape, direction: TransitionDirection) {
  switch (shape) {
    case "triangle":
      if (direction === "right") {
        return {
          start: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          end: "polygon(100% 0, 0% 0, 0% 100%, 100% 100%)",
        };
      }
      return {
        start: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        end: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      };

    case "diagonal":
      if (direction === "right") {
        return {
          start: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          end: "polygon(-20% 0, 120% 0, 100% 100%, 0% 100%)",
        };
      }
      return {
        start: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        end: "polygon(0 0, 120% 0, 100% 100%, -20% 100%)",
      };

    case "circle":
      return {
        start: "circle(0% at 50% 50%)",
        end: "circle(150% at 50% 50%)",
      };

    case "hexagon":
      return {
        start: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        end: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      };

    default:
      return {
        start: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        end: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      };
  }
}

// Simpler diagonal wipe without dog for quick transitions
export function DiagonalWipe({
  isActive,
  color = "#FF7356",
  direction = "right",
}: {
  isActive: boolean;
  color?: string;
  direction?: "left" | "right";
}) {
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wipeRef.current) return;

    if (isActive) {
      gsap.fromTo(
        wipeRef.current,
        {
          clipPath:
            direction === "right"
              ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
              : "polygon(0 0, 0 0, 0 100%, 0 100%)",
        },
        {
          clipPath: "polygon(-20% 0, 120% 0, 100% 100%, 0% 100%)",
          duration: 0.5,
          ease: "power3.inOut",
        }
      );
    } else {
      gsap.to(wipeRef.current, {
        clipPath:
          direction === "right"
            ? "polygon(-20% 0, -20% 0, 0% 100%, 0% 100%)"
            : "polygon(120% 0, 120% 0, 100% 100%, 100% 100%)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isActive, direction]);

  return (
    <div
      ref={wipeRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        backgroundColor: color,
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      }}
    />
  );
}

// Triangle accent that sits in corner
export function TriangleAccent({
  position = "top-right",
  color = "#FF7356",
  size = 300,
  onClick,
  interactive = true,
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  color?: string;
  size?: number;
  onClick?: () => void;
  interactive?: boolean;
}) {
  const triangleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triangleRef.current || !interactive) return;

    // Breathing animation
    gsap.to(triangleRef.current, {
      scale: 1.02,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, [interactive]);

  const handleMouseEnter = () => {
    if (!triangleRef.current || !interactive) return;
    gsap.to(triangleRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    if (!triangleRef.current || !interactive) return;
    gsap.to(triangleRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top-right":
        return { top: 0, right: 0, clipPath: "polygon(100% 0, 0 0, 100% 100%)" };
      case "top-left":
        return { top: 0, left: 0, clipPath: "polygon(0 0, 100% 0, 0 100%)" };
      case "bottom-right":
        return { bottom: 0, right: 0, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" };
      case "bottom-left":
        return { bottom: 0, left: 0, clipPath: "polygon(0 0, 0 100%, 100% 100%)" };
    }
  };

  const positionStyles = getPositionStyles();

  return (
    <div
      ref={triangleRef}
      className={`absolute ${interactive ? "cursor-pointer" : ""}`}
      style={{
        ...positionStyles,
        width: size,
        height: size,
        backgroundColor: color,
        transformOrigin:
          position === "top-right"
            ? "top right"
            : position === "top-left"
            ? "top left"
            : position === "bottom-right"
            ? "bottom right"
            : "bottom left",
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
