import { ContactSection } from "@/components/blocks/contact-me";
import { HeroSection } from "@/components/blocks/hero-section";
import { PortfolioSection } from "@/components/blocks/portfolio-section";
import { SkillSection } from "@/components/blocks/skills-section";

export default function IndexPage() {
  return (
    <main className="container mx-auto flex flex-col items-center space-y-8 px-4">
      <div id="home" className="h-40" />
      <HeroSection className="lg w-full" />
      <SkillSection />
      <PortfolioSection />
      <div className="h-20" />
      <ContactSection />
    </main>
  );
}
