"use client";

import { motion } from "framer-motion";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Highlight } from "@/components/ui/hero-highlight";
import { Cover } from "@/components/ui/cover";

export const HeroSection: React.FC<{ className?: string }> = ({ className: containerClassName }) => {
  return (
    <div className={containerClassName}>
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Hi, I'm{" "}
        <Highlight className="text-black dark:text-white">
          Yash Khare,
        </Highlight>
          <br />
        <Cover className="text-black dark:text-white text-2xl px-4 md:text-4xl lg:text-5xl">
          let's build together!
        </Cover>
      </motion.h1>
    </HeroHighlight>
    </div>
  );
}