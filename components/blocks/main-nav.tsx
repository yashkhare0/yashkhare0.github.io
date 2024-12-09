"use client";

import React, { useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/components/ui/link-preview";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopNavBar() {
  return (
    <div className="">
      <Navbar className="top-2" />
    </div>
  );
}

// TODO: OPEN LINK IN A NEW TAB
function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-sm", className)}
    >
      <Menu setActive={setActive}>
        <LinkPreview url={siteConfig.links.linkedin} className="font-bold">
          LinkedIn
        </LinkPreview>
        <LinkPreview url={siteConfig.links.github} className="font-bold">
          Github
        </LinkPreview>
        <ThemeToggle />
      </Menu>
    </div>
  );
}
