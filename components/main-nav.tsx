"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { LinkPreview } from "@/components/ui/link-preview";
import { siteConfig } from "@/config/site"
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
      className={cn("fixed top-10 inset-x-0 max-w-sm mx-auto z-50", className)}
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