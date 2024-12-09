import { ContactSection } from "@/components/blocks/contact-me"
import { HeroSection } from "@/components/blocks/hero-section"
import { PortfolioSection } from "@/components/blocks/portfolio-section"
import { SkillSection } from "@/components/blocks/skills-section"

export default function IndexPage() {
  return (
    <main className="container mx-auto px-4 space-y-[2rem] flex flex-col items-center">
      <div id="home" className="h-[10rem]" />
      <HeroSection className="lg w-full" />
      <SkillSection />
      <PortfolioSection />
      <div className="h-[5rem]" />
      <ContactSection />
    </main>
  )
}