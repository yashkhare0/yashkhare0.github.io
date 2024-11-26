import { HeroSection } from "@/components/blocks/hero-section"
import { BentoGridThirdDemo } from "@/components/blocks/skills-section"

export default function IndexPage() {
  return (
    <section className="flex flex-col min-h-screen justify-center overflow-auto">
      <HeroSection className="max-w-6xl mt-[10rem] p-[5rem] border" />
      <BentoGridThirdDemo />
    </section>
  )
}
