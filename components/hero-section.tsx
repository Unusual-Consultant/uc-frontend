"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ArrowRight, Star, MapPin, ChevronLeft, ChevronRight, Award, Verified } from "lucide-react"
import Link from "next/link"

const featuredMentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    sessions: 127,
    location: "San Francisco, CA",
    skills: ["Product Strategy", "Leadership", "Analytics"],
    price: 150,
    available: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Software Engineer",
    company: "Meta",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    sessions: 89,
    location: "Seattle, WA",
    skills: ["React", "System Design", "Architecture"],
    price: 120,
    available: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Apple",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    sessions: 156,
    location: "Cupertino, CA",
    skills: ["UX Design", "Design Systems", "Research"],
    price: 180,
    available: true,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Science Manager",
    company: "Netflix",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    sessions: 73,
    location: "Los Angeles, CA",
    skills: ["Data Science", "Machine Learning", "Python"],
    price: 140,
    available: true,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Engineer",
    company: "Stripe",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "The mentorship I received helped me transition from junior to senior engineer in just 8 months. The guidance was invaluable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Product Manager",
    company: "Airbnb",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "My mentor helped me navigate complex product decisions and develop leadership skills. Highly recommend this platform!",
    rating: 5,
  },
  {
    id: 3,
    name: "James Wilson",
    role: "UX Designer",
    company: "Figma",
    image: "/placeholder.svg?height=60&width=60",
    content: "The design mentorship program transformed my approach to user research and helped me land my dream job.",
    rating: 5,
  },
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentMentor, setCurrentMentor] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/mentors?search=${encodeURIComponent(searchQuery)}`
    } else {
      window.location.href = "/mentors"
    }
  }

  const nextMentor = () => {
    setCurrentMentor((prev) => (prev + 1) % featuredMentors.length)
  }

  const prevMentor = () => {
    setCurrentMentor((prev) => (prev - 1 + featuredMentors.length) % featuredMentors.length)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Accelerate Your Career Growth
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find the Right
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Mentor{" "}
                </span>
                for Your Growth
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with industry experts who can guide your career journey. Get personalized mentorship, practical
                advice, and accelerate your professional growth.
              </p>
            </div>

            {/* Search Bar */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by skill, role, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="px-8 py-4 text-lg rounded-xl">
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Popular:</span>
                {["Product Management", "Software Engineering", "Data Science", "UX Design"].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      setSearchQuery(skill)
                      handleSearch()
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8 py-4 text-lg rounded-xl">
                <Link href="/mentors">
                  Find Mentors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg rounded-xl bg-transparent">
                <Link href="/onboarding/mentor">Become a Mentor</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Mentor & Testimonial Cards */}
          <div className="space-y-8">
            {/* Featured Mentors */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Featured Mentors</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevMentor}
                    className="w-8 h-8 p-0 rounded-full bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextMentor}
                    className="w-8 h-8 p-0 rounded-full bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={featuredMentors[currentMentor].image || "/placeholder.svg"}
                          alt={featuredMentors[currentMentor].name}
                        />
                        <AvatarFallback>
                          {featuredMentors[currentMentor].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {featuredMentors[currentMentor].available && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-gray-900">{featuredMentors[currentMentor].name}</h4>
                        <Verified className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{featuredMentors[currentMentor].title}</p>
                      <p className="text-sm font-medium text-blue-600 mb-3">{featuredMentors[currentMentor].company}</p>

                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{featuredMentors[currentMentor].rating}</span>
                          <span>({featuredMentors[currentMentor].sessions})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{featuredMentors[currentMentor].location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {featuredMentors[currentMentor].skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xl">${featuredMentors[currentMentor].price}/hr</div>
                        <Button
                          size="sm"
                          disabled={!featuredMentors[currentMentor].available}
                          className="disabled:opacity-50"
                        >
                          {featuredMentors[currentMentor].available ? "Book Now" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Stories */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Success Stories</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="w-8 h-8 p-0 rounded-full bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="w-8 h-8 p-0 rounded-full bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                      />
                      <AvatarFallback>
                        {testimonials[currentTestimonial].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-gray-700 mb-3 italic">"{testimonials[currentTestimonial].content}"</p>

                      <div>
                        <p className="font-medium text-gray-900">{testimonials[currentTestimonial].name}</p>
                        <p className="text-sm text-gray-600">
                          {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
