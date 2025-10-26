"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const industries = [
  {
    name: "Technology",
    image: "/industries/technology.jpg",
    description: "Software engineering, product management, data science, and AI/ML roles.",
    mentors: 450,
    avgSalary: "$145k",
    growth: "+23%",
    roles: ["Software Engineer", "Product Manager", "Data Scientist", "DevOps Engineer"],
  },
  {
    name: "Finance",
    image: "/industries/finance.jpg",
    description: "Investment banking, financial analysis, fintech, and wealth management.",
    mentors: 280,
    avgSalary: "$135k",
    growth: "+18%",
    roles: ["Investment Banker", "Financial Analyst", "Risk Manager", "Fintech PM"],
  },
  {
    name: "Marketing",
    image: "/industries/marketing.jpg",
    description: "Digital marketing, brand management, growth hacking, and content strategy.",
    mentors: 320,
    avgSalary: "$95k",
    growth: "+31%",
    roles: ["Growth Marketer", "Brand Manager", "Content Strategist", "SEO Specialist"],
  },
  {
    name: "Design",
    image: "/industries/design.jpg",
    description: "UX/UI design, product design, graphic design, and design systems.",
    mentors: 190,
    avgSalary: "$110k",
    growth: "+27%",
    roles: ["UX Designer", "Product Designer", "Design Lead", "Researcher"],
  },
  {
    name: "Consulting",
    image: "/industries/consulting.jpg",
    description: "Strategy, management, and operations consulting with top firms and advisors.",
    mentors: 260,
    avgSalary: "$130k",
    growth: "+22%",
    roles: ["Strategy Consultant", "Management Consultant", "Operations Analyst", "Business Advisor"],
  },
  {
    name: "Healthcare",
    image: "/industries/healthcare.jpg",
    description: "Healthcare management, biotech innovation, and medical technology sectors.",
    mentors: 310,
    avgSalary: "$125k",
    growth: "+19%",
    roles: ["Healthcare Consultant", "Medical Researcher", "HealthTech PM", "Policy Advisor"],
  },
]

interface StatsData {
  platform: {
    active_mentors: number
  }
}

export function IndustriesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [statsData, setStatsData] = useState<StatsData | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/statistics/overview")
      if (!response.ok) throw new Error("Failed to fetch statistics")
      const data = await response.json()
      setStatsData(data)
    } catch (error) {
      console.error("Error fetching statistics:", error)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-black">Explore </span>
              <span className="text-[#0073CF]">Industries</span>
            </h2>
            <p className="text-lg text-black">
              Discover mentors and insights across every professional domain.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ y: 0 }}
              animate={{
                y: hoveredCard === index ? -15 : 0,
                scale: hoveredCard === index ? 1.02 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              <Card className="group border-0 shadow-[0_20px_40px_#9F9D9D40] overflow-hidden flex flex-col transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">{industry.name}</h3>
                    <p className="text-gray-800 text-base leading-relaxed">{industry.description}</p>

                    {/* Hover Reveal Section */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: hoveredCard === index ? "auto" : 0,
                        opacity: hoveredCard === index ? 1 : 0,
                        marginTop: hoveredCard === index ? 24 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular Roles:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {industry.roles.map((role, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>

                      {/* Stats Boxes */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] rounded-bl-[48px] p-3 text-center">
                          <div className="text-lg font-bold text-blue-600">{industry.mentors}</div>
                          <div className="text-xs text-black">Mentors</div>
                        </div>
                        <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-3 text-center">
                          <div className="text-lg font-bold text-green-600">{industry.avgSalary}</div>
                          <div className="text-xs text-black">Avg Salary</div>
                        </div>
                        <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] rounded-br-[48px] p-3 text-center">
                          <div className="text-lg font-bold text-yellow-600">{industry.growth}</div>
                          <div className="text-xs text-black">Growth</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Button */}
                  <Button
                    asChild
                    className="mt-6 relative w-full bg-[#0073CF] text-white rounded-full overflow-hidden h-11 flex items-center justify-center group px-5"
                  >
                    <Link
                      href={`/mentors?industry=${industry.name.toLowerCase()}`}
                      className="relative w-full flex items-center justify-center transition-all duration-300"
                    >
                      <span className="z-10 relative text-center font-medium transition-all duration-300 group-hover:translate-x-[-20px]">
                        Find {industry.name} Mentors
                      </span>
                      <span className="absolute right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:right-0 group-hover:rounded-none">
                        <ArrowRight className="text-[#0073CF] h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Services */}
        <div className="flex justify-end mt-12 items-center gap-3">
          <Button
            size="sm"
            asChild
            className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-[#f2f2f2] transition-colors duration-300"
          >
            <Link href="/all-services">View All Services</Link>
          </Button>
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ArrowRight className="text-black h-5 w-5" />
          </span>
        </div>

       {/* Industry Stats Section */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
  {/* Industries Covered */}
  <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-bl-[48px]">
    <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
    <div className="text-black">Industries Covered</div>
  </div>

  {/* Expert Mentors */}
  <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-tr-[48px]">
    <div className="text-4xl font-bold text-green-600 mb-2">
      {statsData ? `${statsData.platform.active_mentors}+` : "5+"}
    </div>
    <div className="text-black">Expert Mentors</div>
  </div>

  {/* Avg Salary */}
  <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-tl-[48px] ">
    <div className="text-4xl font-bold text-blue-600 mb-2">125K</div>
    <div className="text-black">Avg Salary</div>
  </div>

  {/* Avg Growth */}
  <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-br-[48px]">
    <div className="text-4xl font-bold text-yellow-600 mb-2">+23%</div>
    <div className="text-black">Avg Growth</div>
  </div>
</div>

      </div>
    </section>
  )
}
