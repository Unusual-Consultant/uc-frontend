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
    backgroundImage: "/offerings/expert-mentors.png",
  },
  {
    title: "Templates",
    description: "Access professional templates for resumes, cover letters, and project documentation.",
    href: "/templates",
    backgroundImage: "/offerings/templates.png",
  },
  {
    title: "Courses",
    description: "Enroll in comprehensive courses designed by industry experts to boost your skills.",
    href: "/courses",
    backgroundImage: "/offerings/courses.png",
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with our AI-powered builder and get feedback from experts.",
    href: "/resume-builder",
    backgroundImage: "/offerings/resume-builder.png",
  },
  {
    title: "Blogs",
    description: "Read insightful articles and industry trends from our community of experts.",
    href: "/blogs",
    backgroundImage: "/offerings/blogs.png",
  },
  {
    title: "Roadmaps",
    description: "Follow structured learning paths and career roadmaps tailored to your goals.",
    href: "/roadmaps",
    backgroundImage: "/offerings/roadmaps.png",
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
              className="border-0 shadow-[0_20px_40px_#9F9D9D40] overflow-hidden flex flex-col h-full rounded-2xl"
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
                <Link href={offering.href} className="mt-6">
                  <Button
                    className="relative w-full bg-[#0073CF] hover:bg-[#0073CF] text-white rounded-full overflow-hidden h-11 flex items-center justify-center group px-2"
                  >
                    {/* Button text */}
                    <span className="z-10 relative text-center font-medium transition-all duration-300 group-hover:opacity-0">
                      Explore
                    </span>

                    {/* Arrow circle */}
                    <span className="absolute right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-16px)] group-hover:right-2 group-hover:rounded-full">
                      <ArrowRight className="text-[#0073CF] h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Services */}
        <div className="flex justify-end mt-12 items-center group">
          {/* White pill */}
          <Button
            size="lg"
            asChild
            className="bg-white border border-2 text-lg text-black px-10 py-6 rounded-full hover:bg-[#fffffff] transition-colors duration-300"
          >
            <Link href="/all-services" className="text-black font-semibold">View all Services</Link>
          </Button>

          {/* Arrow in circle */}
          <span className="w-12 h-12 bg-white border border-2 text-xl rounded-full flex items-center justify-center cursor-pointer">
          <ArrowRight className="text-black h-8 w-8 text-xl transition-transform -rotate-45 duration-300 group-hover:rotate-0" />
          </span>
        </div>
      </div>
    </section>
  )
}
