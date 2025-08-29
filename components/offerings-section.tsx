import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const offerings = [
  {
    title: "Expert Mentors",
    description: "Connect with industry leaders and experienced professionals for personalized guidance.",
    href: "/mentors",
    backgroundImage: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Templates",
    description: "Access professional templates for resumes, cover letters, and project documentation.",
    href: "/templates",
    backgroundImage: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Courses",
    description: "Enroll in comprehensive courses designed by industry experts to boost your skills.",
    href: "/courses",
    backgroundImage: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with our AI-powered builder and get feedback from experts.",
    href: "/resume-builder",
    backgroundImage: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Blogs",
    description: "Read insightful articles and industry trends from our community of experts.",
    href: "/blogs",
    backgroundImage: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Roadmaps",
    description: "Follow structured learning paths and career roadmaps tailored to your goals.",
    href: "/roadmaps",
    backgroundImage: "/placeholder.svg?height=300&width=400",
  },
]

export function OfferingsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Offerings</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools and resources to accelerate your professional growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering) => (
            <Card
              key={offering.title}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offering.backgroundImage || "/placeholder.svg"}
                  alt={offering.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{offering.title}</h3>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed flex-1">
                  {offering.description}
                </CardDescription>
                <Button asChild className="w-full bg-green-700 hover:bg-green-800 transition-colors duration-300">
                  <Link href={offering.href}>
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/all-services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
