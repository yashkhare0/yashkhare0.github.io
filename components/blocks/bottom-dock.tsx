"use client";

import React from "react";
import { IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import { ContactIcon, DownloadCloudIcon, LibraryIcon } from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

export function BottomNavBar() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="size-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
      rel: undefined,
      target: undefined,
    },

    {
      title: "Skills",
      icon: (
        <IconTerminal2 className="size-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#skills",
      rel: undefined,
      target: undefined,
    },
    {
      title: "Projects",
      icon: (
        <LibraryIcon className="size-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
      rel: undefined,
      target: undefined,
    },
    {
      title: "Contact",
      icon: (
        <ContactIcon className="size-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
      rel: undefined,
      target: undefined,
    },
    {
      title: "My Resume",
      icon: (
        <DownloadCloudIcon className="size-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://drive.google.com/file/d/1NqG2voaHqT19_4HF9jxM2tnDPVv7_Iut/view?usp=drive_link",
      rel: "noopener noreferrer",
      target: "_blank",
    },

  ];
  return (
    <div className="fixed inset-x-0 bottom-2 z-50 mx-auto w-fit">
      <FloatingDock items={links} />
    </div>
  );
}