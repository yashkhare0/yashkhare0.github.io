"use client";

import React from "react";
import Image from "next/image";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FloatingIcons from "@/components/ui/floating-icons";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function SkillSection() {
  return (
    <BentoGrid
      className="mx-auto max-w-6xl py-20 md:auto-rows-[20rem]"
      id="skills"
    >
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Databases = () => {
  const databases = [
    {
      id: 1,
      name: "Redis",
      designation: "In-Memory Database",
      image: "https://www.vectorlogo.zone/logos/redis/redis-icon.svg",
    },
    {
      id: 2,
      name: "MongoDB",
      designation: "NoSQL Database",
      image: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
    },
    {
      id: 3,
      name: "PostgreSQL",
      designation: "Relational Database",
      image: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg",
    },
    {
      id: 4,
      name: "SQLite",
      designation: "Embedded Database",
      image: "https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg",
    },
    {
      id: 5,
      name: "ChromaDB",
      designation: "Vector Database",
      image: "https://www.trychroma.com/img/chroma.png",
    },
    {
      id: 6,
      name: "Neo4j",
      designation: "Graph Database",
      image: "https://www.vectorlogo.zone/logos/neo4j/neo4j-icon.svg",
    },
    {
      id: 7,
      name: "pgvector",
      designation: "Vector Database",
      image: "/pg-vector.svg",
    },
  ];

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-col p-8"
    >
      <motion.div className="grid grid-cols-3 gap-6 md:grid-cols-4">
        <AnimatedTooltip items={databases} />
      </motion.div>
    </motion.div>
  );
};

function getRandomColorClass() {
  const classes = [
    "text-red-500",
    "text-green-500",
    "text-blue-500",
    "text-pink-500",
    "text-purple-500",
    "text-teal-500",
    "text-yellow-500",
  ];
  return classes[Math.floor(Math.random() * classes.length)];
}

const Scalability = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-col space-y-2 rounded-lg"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="size-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const Skillset = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  const providers = [
    {
      id: 1,
      name: "OpenAI",
      designation: "AI Model Provider",
      image: "https://avatars.githubusercontent.com/u/14957082?s=200&v=4",
    },
    {
      id: 2,
      name: "Anthropic",
      designation: "AI Model Provider",
      image: "https://avatars.githubusercontent.com/u/76263028?s=200&v=4",
    },
    {
      id: 3,
      name: "Mistral",
      designation: "AI Model Provider",
      image: "https://avatars.githubusercontent.com/u/132372032?s=200&v=4",
    },
    {
      id: 4,
      name: "Ollama",
      designation: "Local Model Runner",
      image: "https://avatars.githubusercontent.com/u/151674099?s=200&v=4",
    },
    {
      id: 5,
      name: "Stable Diffusion",
      designation: "Image Generation",
      image: "https://avatars.githubusercontent.com/u/100950301?s=200&v=4",
    },
  ];

  const frameworks = [
    {
      id: 1,
      name: "Langchain",
      image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
    },
    {
      id: 2,
      name: "LlamaIndex",
      image: "https://avatars.githubusercontent.com/u/130722866?s=200&v=4",
    },
    {
      id: 3,
      name: "ComfyUI",
      image: "https://avatars.githubusercontent.com/u/121283862?v=4",
    },
  ];

  const useCases = [
    {
      id: 1,
      name: "Text Summarization",
      image:
        "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
    },
    {
      id: 2,
      name: "Sentiment Analysis",
      image:
        "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
    },
    {
      id: 3,
      name: "Chatbots",
      image:
        "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
    },
    {
      id: 4,
      name: "Retrieval Augmented Generation",
      image:
        "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
    },
    {
      id: 5,
      name: "Image Generation",
      image:
        "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
    },
    {
      id: 7,
      name: "Fine-tuning and LoRA Training",
      image:
        "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"
    >
      <motion.div
        variants={first}
        className="flex size-full flex-col items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black md:w-1/3"
      >
        <motion.div
          initial="initial"
          whileHover="animate"
          className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-col space-y-4 rounded-lg p-4"
        >
          <div className="grid grid-cols-3 items-center justify-center gap-2">
            {providers.map((provider, index) => (
              <Image
                key={index}
                src={provider.image}
                alt={`Provider ${index}`}
                height={40}
                width={40}
                className="rounded-full object-cover"
              />
            ))}
          </div>
        </motion.div>
        <p className="rounded-full border border-red-500 bg-red-100 px-3 py-1 text-xs font-medium text-red-600 dark:bg-red-900/20 sm:text-sm md:text-base lg:text-lg">
          Providers
        </p>
      </motion.div>

      <div className="relative z-20 flex size-full flex-col items-center justify-between rounded-2xl bg-white p-4 dark:border-white/[0.1] dark:bg-black md:w-1/3">
        {/* Carousel */}

        <Carousel
          className="size-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay()]}
        >
          <CarouselContent>
            {useCases.map((useCase, index) => (
              <CarouselItem key={index}>
                <Card className="flex size-full justify-center border-transparent bg-inherit align-middle">
                  <CardContent className="flex items-center justify-center p-6">
                    <p className="text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
                      {useCase.name}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <motion.div
        variants={second}
        className="flex size-full flex-col items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black md:w-1/3"
      >
        <motion.div
          initial="initial"
          whileHover="animate"
          className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-col space-y-4 rounded-lg p-4"
        >
          <div className="grid grid-cols-3 items-center justify-center gap-2">
            {frameworks.map((framework, index) => (
              <Image
                key={index}
                src={framework.image}
                alt={`Framework ${index}`}
                height={40}
                width={40}
                className="rounded-full object-cover"
              />
            ))}
          </div>
        </motion.div>
        <p className="rounded-full border border-green-500 bg-red-100 px-3 py-1 text-xs font-medium text-green-600 dark:bg-red-900/20 sm:text-sm md:text-base lg:text-lg">
          Frameworks
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-start space-x-2 rounded-2xl border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <Image
          src="https://fortune.com/img-assets/wp-content/uploads/2024/09/GettyImages-2165070986-e1725638639482.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="size-10 rounded-full object-cover"
        />
        <p className="text-xs text-neutral-500">
          Can you build a highly scalable GEN-AI Ops platform?
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center justify-end space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <p className="text-xs text-neutral-500">
          Sure! I&#39;ve done that before.
        </p>
        <Image
          src="/logo.png"
          alt="avatar"
          height="40"
          width="40"
          className="size-10 rounded-full border"
        />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Programming Languages",
    description: (
      <div className="flex flex-wrap gap-2">
        <span className="text-sm">
          Proven experience with JavaScript, Python, TypeScript, and Swift.
        </span>
      </div>
    ),
    header: <FloatingIcons />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="size-4 text-neutral-500" />,
  },
  {
    title: "Data and Datebases",
    description: (
      <span className="text-sm">
        Designing and optimizing relational, non-relational, graph and vector
        datasets & Databases.
      </span>
    ),
    header: <Databases />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="size-4 text-neutral-500" />,
  },
  {
    title: "Testing and Debugging",
    description: (
      <span className="text-sm">
        Experience with unit, integration, and end-to-end testing using Pytest,
        Jest, and Postman.
      </span>
    ),
    header: <Scalability />,
    className: "md:col-span-1",
    icon: <IconSignature className="size-4 text-neutral-500" />,
  },
  {
    title: "Sentiment Analysis",
    description: (
      <span className="text-sm">
        Hands-on experience with OpenAI, Hugging Face, and TensorFlow for
        building intelligent systems and NLP pipelines.
      </span>
    ),
    header: <Skillset />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="size-4 text-neutral-500" />,
  },

  {
    title: "Scalable Systems",
    description: (
      <span className="text-sm">
        Proven experience in building scalable systems and APIs.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="size-4 text-neutral-500" />,
  },
];
