"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTriggerState {
  isActive: boolean;
  progress: number;
  direction: number;
  isInView: boolean;
}

/**
 * Hook to track ScrollTrigger state for an element
 */
export function useScrollTrigger<T extends HTMLElement>(
  options: {
    start?: string;
    end?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<ScrollTriggerState>({
    isActive: false,
    progress: 0,
    direction: 1,
    isInView: false,
  });

  const {
    start = "top 80%",
    end = "bottom 20%",
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      onUpdate: (self) => {
        setState({
          isActive: self.isActive,
          progress: self.progress,
          direction: self.direction,
          isInView: self.isActive,
        });
      },
      onEnter: () => {
        setState((prev) => ({ ...prev, isInView: true }));
        onEnter?.();
      },
      onLeave: () => {
        setState((prev) => ({ ...prev, isInView: false }));
        onLeave?.();
      },
      onEnterBack: () => {
        setState((prev) => ({ ...prev, isInView: true }));
        onEnterBack?.();
      },
      onLeaveBack: () => {
        setState((prev) => ({ ...prev, isInView: false }));
        onLeaveBack?.();
      },
    });

    return () => {
      trigger.kill();
    };
  }, [start, end, onEnter, onLeave, onEnterBack, onLeaveBack]);

  return { ref, ...state };
}

/**
 * Hook for scroll-based animation timeline
 */
export function useScrollTimeline<T extends HTMLElement>(
  createAnimation: (element: T, timeline: gsap.core.Timeline) => void,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) {
  const ref = useRef<T>(null);
  const { start = "top center", end = "bottom center", scrub = 1 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    });

    createAnimation(element, timeline);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [createAnimation, start, end, scrub]);

  return ref;
}

/**
 * Hook for batch scroll animations
 */
export function useScrollBatch(
  selector: string,
  animation: gsap.TweenVars,
  options: {
    start?: string;
    stagger?: number;
    once?: boolean;
  } = {}
) {
  const { start = "top 85%", stagger = 0.1, once = true } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const batch = ScrollTrigger.batch(selector, {
      start,
      once,
      onEnter: (elements) => {
        gsap.to(elements, {
          ...animation,
          stagger,
        });
      },
    });

    return () => {
      batch.forEach((trigger) => trigger.kill());
    };
  }, [selector, animation, start, stagger, once]);
}

/**
 * Hook for scroll progress tracking
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return progress;
}

/**
 * Hook for section-based scroll tracking
 */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return { ref, progress };
}

/**
 * Hook to initialize global ScrollTrigger settings
 */
export function useScrollTriggerInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Configure ScrollTrigger
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Handle route changes (for Next.js)
    const handleRouteChange = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleRouteChange);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
