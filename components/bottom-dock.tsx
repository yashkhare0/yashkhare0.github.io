"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { ContactIcon, DownloadCloudIcon, LibraryIcon } from "lucide-react";
 
export function BottomNavBar() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },
 
    {
      title: "Skills",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#skills",
    },
    {
      title: "Projects",
      icon: (
        <LibraryIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Contact",
      icon: (
        <ContactIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
    {
      title: "My Resume",
      icon: (
        <DownloadCloudIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://drive.google.com/file/d/1NqG2voaHqT19_4HF9jxM2tnDPVv7_Iut/view?usp=drive_link",
    },
  ];
  return (
    <div className="fixed bottom-2 inset-x-0 w-fit mx-auto z-50">
      <FloatingDock items={links} />
    </div>
  );
}