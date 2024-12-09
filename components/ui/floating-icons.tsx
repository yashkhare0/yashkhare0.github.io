import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const FloatingIcons = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const icons = [
    {
      id: 1,
      name: "JavaScript",
      designation: "Programming Language",
      image:
        "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
    },
    {
      id: 2,
      name: "Python",
      designation: "Programming Language",
      image:
        "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png",
    },
    {
      id: 3,
      name: "TypeScript",
      designation: "Programming Language",
      image:
        "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png",
    },
    {
      id: 4,
      name: "Swift",
      designation: "Programming Language",
      image:
        "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/swift/swift.png",
    },
  ];

  const generateVariants = (id: any) => {
    const seed = id * 1000;
    const xBase = 100 * Math.sin(seed);
    const yBase = 100 * Math.cos(seed);

    return {
      initial: {
        x: 0,
        y: 0,
      },
      animate: {
        x: [0, xBase, -xBase, 0],
        y: [0, yBase, -yBase, 0],
        transition: {
          duration: 15 + id * 2,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut",
        },
      },
    };
  };

  if (!isClient) {
    return (
      <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden border">
        {icons.map((icon) => (
          <div key={icon.id} className="absolute">
            <AnimatedTooltip items={[icon]} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          variants={generateVariants(icon.id)}
          initial="initial"
          animate="animate"
          className="absolute"
        >
          <AnimatedTooltip items={[icon]} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
