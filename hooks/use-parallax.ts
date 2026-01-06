"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Hook to apply parallax effect to an element
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.5, start = "top bottom", end = "bottom top", scrub = true } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animation = gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [speed, start, end, scrub]);

  return ref;
}

interface MultiLayerParallaxConfig {
  selector: string;
  speed: number;
}

/**
 * Hook for multi-layer parallax setup
 */
export function useMultiLayerParallax(layers: MultiLayerParallaxConfig[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const animations: gsap.core.Tween[] = [];

    layers.forEach((layer) => {
      const elements = document.querySelectorAll(layer.selector);
      
      elements.forEach((element) => {
        const animation = gsap.to(element, {
          yPercent: -30 * layer.speed,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        animations.push(animation);
      });
    });

    return () => {
      animations.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, [layers]);
}

/**
 * Hook for fade-in on scroll
 */
export function useFadeInOnScroll<T extends HTMLElement>(
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const { y = 50, duration = 1, delay = 0, start = "top 80%" } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.set(element, { y, opacity: 0 });

    const animation = gsap.to(element, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [y, duration, delay, start]);

  return ref;
}

/**
 * Hook for horizontal scroll reveal
 */
export function useSlideInOnScroll<T extends HTMLElement>(
  direction: "left" | "right" = "left",
  options: {
    distance?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const { distance = 100, duration = 0.8, start = "top 80%" } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const x = direction === "left" ? -distance : distance;

    gsap.set(element, { x, opacity: 0 });

    const animation = gsap.to(element, {
      x: 0,
      opacity: 1,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [direction, distance, duration, start]);

  return ref;
}

/**
 * Hook for pinned sections
 */
export function usePinOnScroll<T extends HTMLElement>(
  options: {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
  } = {}
) {
  const ref = useRef<T>(null);
  const { start = "top top", end = "+=100%", pinSpacing = true } = options;

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      pin: true,
      pinSpacing,
    });

    return () => {
      trigger.kill();
    };
  }, [start, end, pinSpacing]);

  return ref;
}
