"use client";

import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Vortex } from "@/components/ui/vortex";

export function ContactSection() {
  const openEmail = () => {
    const subject = encodeURIComponent("Let's get in touch!");
    const body = encodeURIComponent(
      `Hey Yash,

I came across your portfolio. I am particularly interested in [mention specific project or aspect of my portfolio] and would love to discuss potential collaboration opportunities.

About My Project:

[Provide a brief description of your project here. Include any relevant details that might help me understand the scope and nature of the project.]

Next Steps:

I would love to schedule a call or meeting to discuss this further. Please let me know your availability, and we can set something up.

Contact Information:

- Name: [Your Full Name]
- Email: [Your Email Address]
- Phone: [Your Phone Number]
- LinkedIn: [Your LinkedIn Profile URL]
- Website/Portfolio: [Your Website or Portfolio URL, if applicable]

Looking forward to the possibility of working together!

Best regards,

[Your Full Name]
    `,
    );

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=yash.khare.work@gmail.com&su=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  const latestProject = () => {
    window.open("https://meetelio.com", "_blank");
  };

  return (
    <div className="h-screen w-[99vw] overflow-hidden" id="contact">
      <Vortex
        backgroundColor="black"
        className="flex size-full flex-col items-center justify-center px-2 py-4 md:px-10"
      >
        <h2 className="text-center text-2xl font-bold text-white md:text-6xl">
          Let&apos;s build something great together
        </h2>
        <p className="mt-6 max-w-xl text-center text-sm text-white md:text-2xl">
          I love working on groundbreaking concepts and I bet you are working on
          one.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] transition duration-200 hover:bg-blue-700"
            onClick={openEmail}
          >
            Mail me
          </button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="px-4 py-2" onClick={latestProject}>
                Check out my latest project
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Vortex>
    </div>
  );
}
