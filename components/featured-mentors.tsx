"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Star,
  Languages,
  Zap,
  Verified,
} from "lucide-react"
import Link from "next/link"

interface Mentor {
  id: number
  name: string
  title: string
  company: string
  image: string
  rating: number
  reviews: number
  location: string
  expertise: string[]
  price: number
  mentees: number
  available: boolean
  responseTime: string
  successRate: number
  description: string
  yearsExperience?: number
  languages?: string[]
}

// Mock data as default
const defaultMentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    expertise: ["Product Management", "Strategy", "Leadership"],
    price: 150,
    mentees: 45,
    available: true,
    responseTime: "<4 hrs",
    successRate: 95,
    description:
      "Experienced product manager with a passion for building user-centric products and mentoring teams.",
    languages: ["English", "Spanish"],
    yearsExperience: 10,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Software Engineer",
    company: "Meta",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 89,
    location: "Seattle, WA",
    expertise: ["React", "Node.js", "System Design"],
    price: 120,
    mentees: 32,
    available: false,
    responseTime: "<6 hrs",
    successRate: 90,
    description:
      "Full-stack engineer specializing in scalable applications and mentoring junior developers.",
    languages: ["English", "Mandarin"],
    yearsExperience: 8,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Apple",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 156,
    location: "Cupertino, CA",
    expertise: ["UX Design", "Design Systems", "Research"],
    price: 180,
    mentees: 67,
    available: true,
    responseTime: "<3 hrs",
    successRate: 97,
    description: "UX leader guiding product teams to create intuitive and engaging experiences.",
    languages: ["English", "French"],
    yearsExperience: 12,
  },
]

export function FeaturedMentors() {
  const [mentors, setMentors] = useState<Mentor[]>(defaultMentors)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredLanguages, setHoveredLanguages] = useState<number | null>(null)
  const mentorsPerView = 3

  useEffect(() => {
    fetchMentors()
  }, [])

  const fetchMentors = async () => {
    try {
      console.log("Fetching mentors from API...")
      const response = await fetch("http://127.0.0.1:8000/api/v1/featured-mentors/all/mentors?per_page=9")
      console.log("Response status:", response.status)
      if (response.ok) {
        const data = await response.json()
        console.log("Mentors data from API:", data)
        if (data.mentors && data.mentors.length > 0) {
          // Transform backend data to frontend format
          const transformed = data.mentors.map((mentor: any) => ({
            id: mentor.id,
            name: mentor.full_name || "Mentor",
            title: mentor.headline || mentor.bio?.split(' at ')[0] || "Expert",
            company: mentor.company || "",
            image: mentor.profile_picture_url || "/placeholder.svg?height=80&width=80",
            rating: mentor.rating || 0,
            reviews: mentor.total_sessions || 0,
            location: mentor.location || "Remote",
            expertise: mentor.skills || [],
            price: mentor.hourly_rate || 1000,
            mentees: 0,
            available: true,
            responseTime: "<4 hrs",
            successRate: 95,
            description: mentor.bio || "",
            yearsExperience: mentor.years_experience,
            languages: mentor.languages || [],
          }))
          console.log("Transformed mentors:", transformed)
          setMentors(transformed)
        } else {
          console.log("No mentors in API response")
        }
      } else {
        console.error("API response not OK:", response.status)
      }
    } catch (error) {
      console.error("Error fetching mentors:", error)
      // Keep using default mentors as fallback
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + mentorsPerView) % mentors.length)
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - mentorsPerView + mentors.length) % mentors.length)

  const visibleMentors = []
  for (let i = 0; i < mentorsPerView; i++) {
    visibleMentors.push(mentors[(currentIndex + i) % mentors.length])
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading mentors...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Meet Our <span className="text-[#0073CF]">Mentors</span>
            </h2>
            <p className="text-gray-600">Connect with top industry professionals</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 p-0 rounded-full"
            >
              &lt;
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 p-0 rounded-full"
            >
              &gt;
            </Button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="relative hover:shadow-lg transition-shadow duration-300 border rounded-xl overflow-hidden p-4 flex flex-col"
            >
              {/* Top blue banner */}
              <div className="bg-[#C4E1FF] h-16 w-full absolute top-0 left-0 z-0 rounded-t-xl" />
  
              {/* Online badge */}
              {mentor.available && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                  <Zap className="w-3 h-3" /> Online
                </div>
              )}
  
              {/* Top section: Avatar + rating */}
              <div className="flex gap-4 items-start mt-6 relative z-10">
                {/* Avatar + rating */}
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                  </Avatar>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-2 py-0.5 rounded-full text-sm flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 text-yellow-400" /> {mentor.rating.toFixed(1)}
                  </div>
                </div>
  
                {/* Name/Title/Company */}
                <div className="flex-1 flex flex-col justify-start text-black">
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-bold">{mentor.name}</h3>
                    <Verified className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                  <p className="text-sm font-medium text-blue-600">{mentor.company}</p>
                </div>
              </div>
  
              {/* Location + Experience + Like */}
              <div className="mt-4 flex gap-6 text-sm text-gray-700 items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {mentor.location}
                </div>
                {mentor.yearsExperience && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {mentor.yearsExperience} yrs
                  </div>
                )}
                <button className="ml-auto -mt-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
  
              {/* Description */}
              <p className="mt-4 text-sm text-gray-700">{mentor.description}</p>
  
              {/* Stats in vertical columns */}
              <div className="mt-6 flex gap-6 justify-start">
                <div className="flex flex-col items-center text-sm text-gray-700">
                  <span className="font-semibold">Response</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>{mentor.responseTime}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                  <span className="font-semibold">Mentees</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{mentor.mentees}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                  <span className="font-semibold">Success</span>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{mentor.successRate}%</span>
                  </div>
                </div>
              </div>
  
              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#D1EAFF] text-[10px] rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
  
              {/* Languages pill */}
              {mentor.languages && mentor.languages.length > 0 && (
                <div className="mt-4 relative group cursor-pointer">
                  <span className="px-2 py-1 bg-gray-300 text-xs rounded-full transition-all group-hover:px-4 group-hover:py-2">
                    Languages
                    <span className="absolute left-0 top-0 hidden group-hover:flex bg-white border shadow-md p-1 rounded-md text-xs ml-1 z-10">
                      {mentor.languages.join(", ")}
                    </span>
                  </span>
                </div>
              )}
  
              {/* Rate + Buttons */}
              <div className="mt-6 flex items-start gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Starting from</span>
                  <span className="text-lg font-bold text-[#0073CF]">₹{mentor.price}/hr</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Button variant="outline" size="sm" className="w-full border-black rounded-full">
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full"
                  >
                    Quick Book
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
  
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/mentors">View All Mentors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
  
}
