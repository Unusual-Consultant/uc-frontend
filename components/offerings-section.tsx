"use client"

import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

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
  const [tiltArrow, setTiltArrow] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setTiltArrow((prev) => !prev), 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-black">Our </span>
              <span className="text-[#0073CF]">Offerings</span>
            </h2>
            <p className="text-lg text-black whitespace-nowrap">
              Comprehensive tools and resources to accelerate your professional growth
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering) => (
            <Card
              key={offering.title}
              className="group border-0 shadow-[0_20px_40px_#9F9D9D40] overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offering.backgroundImage || "/placeholder.svg"}
                  alt={offering.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">{offering.title}</h3>
                  <CardDescription className="text-gray-800 text-base leading-relaxed">
                    {offering.description}
                  </CardDescription>
                </div>

                {/* Explore Button */}
                <Button
                  asChild
                  className="mt-6 relative w-full bg-[#0073CF] text-white rounded-full overflow-hidden h-11 flex items-center justify-center group px-5"
                >
                  <Link
                    href={offering.href}
                    className="relative w-full flex items-center justify-center transition-all duration-300"
                  >
                    {/* Explore text */}
                    <span className="z-10 relative text-center font-medium transition-all duration-300 group-hover:translate-x-[-80px]">
                      Explore
                    </span>

                    {/* Arrow circle */}
                    <span className="absolute right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:right-0 group-hover:rounded-none">
                      <ArrowRight className="text-[#0073CF] h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Services */}
        <div className="flex justify-end mt-12 items-center gap-3">
          {/* White pill */}
          <Button
            size="sm"
            asChild
            className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-[#f2f2f2] transition-colors duration-300"
          >
            <Link href="/all-services">View All Services</Link>
          </Button>

          {/* Arrow in circle */}
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ArrowRight
              className={`text-black h-5 w-5 transition-transform duration-300 ${
                tiltArrow ? "rotate-0" : "-rotate-45"
              }`}
            />
          </span>
        </div>
      </div>
    </section>
  )
}
