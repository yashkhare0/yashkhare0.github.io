"use client";

import { motion } from "framer-motion";

import { Cover } from "@/components/ui/cover";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export const HeroSection: React.FC<{ className?: string }> = ({
  className: containerClassName,
}) => {
  const tags = ["Full-Stack", "Back-End", "Front-End", "Gen-AI", "DevOps"];

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
          className="mx-auto max-w-4xl text-center text-4xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-8xl lg:leading-snug"
        >
          Hi, I&apos;m{" "}
          <Highlight className="text-black dark:text-white">
            Yash Khare.
          </Highlight>
          <br />
          <div className="mt-8 flex flex-row justify-evenly text-sm md:text-base lg:text-xl">
            {tags.map((tag) => (
              <Cover className="text-black dark:text-white" key={tag}>
                {tag}
              </Cover>
            ))}
          </div>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
};
