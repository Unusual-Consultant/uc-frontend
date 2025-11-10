import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { OfferingsSection } from "@/components/offerings-section"
import { IndustriesSection } from "@/components/industries-section"
import { FeaturedMentors } from "@/components/featured-mentors"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <OfferingsSection />
      <IndustriesSection />
      <FeaturedMentors />
      <TestimonialsSection />
    </div>
  )
}
