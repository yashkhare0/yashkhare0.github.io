"use client";
import React from "react";
import { Vortex } from "../ui/vortex";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

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
    `);

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=yash.khare.work@gmail.com&su=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  const latestProject = () => {
    window.open('https://meetelio.com', '_blank');
  };

  return (
    <div className="w-[99vw] h-screen overflow-hidden" id="contact">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Let's build something great together
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          I love working on groundbreaking concepts and I bet you are working on one.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
            onClick={openEmail}
          >
            Mail me
          </button>


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className="px-4 py-2"  onClick={latestProject}>
                  Check out my latest project
                </button>
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
