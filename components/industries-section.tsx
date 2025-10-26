import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

const industries = [
  {
    name: "Technology",
    description: "Software engineering, product management, data science, and AI/ML roles",
    mentors: 450,
    avgSalary: "$145k",
    growth: "+23%",
    image: "/placeholder.svg?height=200&width=300&text=Technology",
    color: "from-blue-500 to-blue-600",
    roles: ["Software Engineer", "Product Manager", "Data Scientist", "DevOps Engineer"],
  },
  {
    name: "Finance",
    description: "Investment banking, financial analysis, fintech, and wealth management",
    mentors: 280,
    avgSalary: "$135k",
    growth: "+18%",
    image: "/placeholder.svg?height=200&width=300&text=Finance",
    color: "from-green-500 to-green-600",
    roles: ["Investment Banker", "Financial Analyst", "Risk Manager", "Fintech PM"],
  },
  {
    name: "Marketing",
    description: "Digital marketing, brand management, growth hacking, and content strategy",
    mentors: 320,
    avgSalary: "$95k",
    growth: "+31%",
    image: "/placeholder.svg?height=200&width=300&text=Marketing",
    color: "from-purple-500 to-purple-600",
    roles: ["Growth Marketer", "Brand Manager", "Content Strategist", "SEO Specialist"],
  },
  {
    name: "Design",
    description: "UX/UI design, product design, graphic design, and design systems",
    mentors: 190,
    avgSalary: "$110k",
    growth: "+27%",
    image: "/placeholder.svg?height=200&width=300&text=Design",
    color: "from-pink-500 to-pink-600",
    roles: ["UX Designer", "Product Designer", "Design Lead", "Researcher"],
  },
  {
    name: "Healthcare",
    description: "Healthcare technology, medical devices, biotech, and health informatics",
    mentors: 150,
    avgSalary: "$125k",
    growth: "+22%",
    image: "/placeholder.svg?height=200&width=300&text=Healthcare",
    color: "from-red-500 to-red-600",
    roles: ["Health Tech PM", "Medical Device Engineer", "Biotech Researcher", "Health Data Analyst"],
  },
  {
    name: "Consulting",
    description: "Management consulting, strategy consulting, and specialized advisory services",
    mentors: 220,
    avgSalary: "$140k",
    growth: "+15%",
    image: "/placeholder.svg?height=200&width=300&text=Consulting",
    color: "from-indigo-500 to-indigo-600",
    roles: ["Strategy Consultant", "Management Consultant", "Business Analyst", "Operations Lead"],
  },
]

export function IndustriesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Industries</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find mentors across diverse industries and accelerate your career in your field of choice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Card
              key={industry.name}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden h-full transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={industry.image || "/placeholder.svg"}
                  alt={industry.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">{industry.growth}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{industry.name}</h3>
                  <div className="flex items-center space-x-4 text-white/90 text-sm">
                    <span>{industry.mentors} mentors</span>
                    <span>Avg: {industry.avgSalary}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 mb-4 leading-relaxed flex-1">{industry.description}</p>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Popular Roles:</h4>
                  <div className="flex flex-wrap gap-1">
                    {industry.roles.slice(0, 3).map((role, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {role}
                      </span>
                    ))}
                    {industry.roles.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        +{industry.roles.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{industry.mentors}</div>
                    <div className="text-xs text-gray-600">Expert Mentors</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{industry.avgSalary}</div>
                    <div className="text-xs text-gray-600">Avg Salary</div>
                  </div>
                </div>

                <Button asChild className="w-full bg-green-700 hover:bg-green-800 mt-auto">
                  <Link href={`/mentors?industry=${industry.name.toLowerCase()}`}>
                    Find {industry.name} Mentors
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/mentors">
              View All Industries
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Industry Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Industries Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1,610+</div>
            <div className="text-gray-600">Expert Mentors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">$125k</div>
            <div className="text-gray-600">Average Salary</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">+23%</div>
            <div className="text-gray-600">Average Growth</div>
          </div>
        </div>
      </div>
    </section>
  )
}
