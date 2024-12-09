import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function PortfolioSection() {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
  );

  // Front-End Projects
  const fs_items = [
    {
      title: "Echo",
      description:
        "Retrieval-Augmented Generation (RAG) tool built using Python Django and ReactJS (ShadCN), enabling seamless document-based Q&A with scalable deployment on Azure, generating €125K in licensing revenue within the first month.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Bench",
      description:
        "Scalable robotic process automation engine developed with FastAPI microservices and ReactJS (TypeScript), designed to streamline HR, legal, and project management workflows, successfully licensed for €25K.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Prescart",
      description:
        "Full-stack e-commerce solution for online medicine delivery, using React, Node.js, and MongoDB, optimized for performance with CI/CD pipelines and deployed on Docker.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Relationship Concierge",
      description:
        "Dating application built with Flutter and Python Django, matching users based on survey responses to enhance compatibility and engagement.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "CRM for Pyrajees",
      description:
        "CRM automation engine developed for a bakery chain with revenues exceeding ₹100 Cr, using ReactJS and Python Django to streamline customer relationship management and improve engagement.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Colco",
      description:
        "Hybrid social network application for the gig economy, developed using Flutter with Lottie animations, focusing on enhancing user interactions and networking among freelancers.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Constituency Engagement App",
      description:
        "Full-stack application enabling citizens to directly communicate with a Member of Legislative Assembly, built with React Native and Python Django, facilitating issue reporting and updates.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Captain Serve",
      description:
        "Facility management platform for corporates, developed using React frontend and Django REST API backend, integrated with Flutter for mobile access and automated with CI/CD pipelines.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Elio",
      description:
        "AI-powered voice-first smart tutor platform using React Native, Django, and FastAPI, integrated with Neo4j and PGVector for adaptive learning paths and deployed using Azure Kubernetes Services.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
  ];

  // Gen-AI Projects
  const gen_ai_items = [
    {
      title: "Elio",
      description:
        "AI-powered voice-first smart tutor platform using React Native, Django, and FastAPI, integrated with Neo4j and PGVector for adaptive learning paths and deployed using Azure Kubernetes Services.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Prism",
      description:
        "AI-driven content automation using Stable Diffusion through ComfyUI integrated with FastAPI to generate brand-aligned marketing content for FMCG clients, optimizing content creation workflows.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Echo",
      description:
        "Retrieval-Augmented Generation (RAG) tool built using Python Django and ReactJS (ShadCN), enabling seamless document-based Q&A with scalable deployment on Azure, generating €125K in licensing revenue within the first month.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Bench",
      description:
        "Scalable robotic process automation engine developed with FastAPI microservices and ReactJS (TypeScript), designed to streamline HR, legal, and project management workflows, successfully licensed for €25K.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Punch Anime",
      description:
        "Anime recommendation engine leveraging Flask, TensorFlow, and NLP models to provide personalized anime suggestions based on user preferences and viewing history.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },

  ];

  // Back-End Projects
  const back_end_items = [
    {
      title: "Elio",
      description:
        "AI-powered voice-first smart tutor platform using React Native, Django, and FastAPI, integrated with Neo4j and PGVector for adaptive learning paths and deployed using Azure Kubernetes Services.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Prism",
      description:
        "AI-driven content automation using Stable Diffusion through ComfyUI integrated with FastAPI to generate brand-aligned marketing content for FMCG clients, optimizing content creation workflows.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Echo",
      description:
        "Retrieval-Augmented Generation (RAG) tool built using Python Django and ReactJS (ShadCN), enabling seamless document-based Q&A with scalable deployment on Azure, generating €125K in licensing revenue within the first month.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Bench",
      description:
        "Scalable robotic process automation engine developed with FastAPI microservices and ReactJS (TypeScript), designed to streamline HR, legal, and project management workflows, successfully licensed for €25K.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "CRM for Pyrajees",
      description:
        "CRM automation engine developed for a bakery chain with revenues exceeding ₹100 Cr, using ReactJS and Python Django to streamline customer relationship management and improve engagement.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Prism",
      description:
        "AI-driven content automation using Stable Diffusion through ComfyUI integrated with FastAPI to generate brand-aligned marketing content for FMCG clients, optimizing content creation workflows.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Punch Anime",
      description:
        "Anime recommendation engine leveraging Flask, TensorFlow, and NLP models to provide personalized anime suggestions based on user preferences and viewing history.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <Tabs
      id="projects"
      defaultValue="gen-ai"
      className="w-6xl rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4"
    >
      <TabsList className="justify-start bg-transparent">
        <TabsTrigger value="full-stack">Full-Stack</TabsTrigger>
        <TabsTrigger value="gen-ai">Gen-AI</TabsTrigger>
        <TabsTrigger value="back-end">Back-End</TabsTrigger>
      </TabsList>
      <TabsContent value="full-stack">
        <BentoGrid className="mx-auto">
          {fs_items.map((item, i) => (
            <BentoGridItem
              key={`${item.title}-${i}`}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </TabsContent>
      <TabsContent value="gen-ai">
        <BentoGrid className="mx-auto">
          {gen_ai_items.map((item, i) => (
            <BentoGridItem
              key={`${item.title}-${i}`}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </TabsContent>
      <TabsContent value="back-end">
        <BentoGrid className="mx-auto">
          {back_end_items.map((item, i) => (
            <BentoGridItem
              key={`${item.title}-${i}`}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </TabsContent>
    </Tabs>
  );
}
