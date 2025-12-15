"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Star,
  Languages,
  Zap,
  Verified,
  Globe
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
            <p className="text-gray-600">Connect with industry experts who have been in your shoes and can guide you to success</p>
          </div>
          <div className="flex gap-3 text-xl font-bold text-white">
            <Button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-[#0073CF] flex items-center justify-center hover:bg-[#005fa3] transition-colors"
            >
              &lt;
            </Button>
            <Button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full bg-[#0073CF] flex items-center justify-center hover:bg-[#005fa3] transition-colors"
            >
              &gt;
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-[50px] w-full md:w-[720px] lg:w-[1240px] mx-auto">

          {visibleMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className={`relative w-[340px] lg:w-[380px] h-[662px] transition-shadow duration-300 
                    rounded-xl overflow-hidden p-4 flex flex-col justify-between ${mentor.available ? 'border-[3px] border-[#28A745]' : 'border'
                }`}
              style={{ boxShadow: "0px 4px 20px #9F9D9D40" }}
            >

              {/* Top blue banner */}
              <div className="bg-[#C4E1FF] h-[80px] w-full absolute top-0 left-0 z-0 rounded-t-xl" />

              {/* Online badge */}
              {mentor.available && (
                <div className="absolute top-2 left-2 bg-[#28A745] text-white text-xs px-3 py-1 rounded-full flex items-center gap-2 z-10 h-[25px]">

                  {/* White Circle */}
                  <div className="w-[17px] h-[17px] rounded-full bg-white flex items-center justify-center">
                    {/* Zap Icon SVG in #28A745 */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#28A745"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-[700]"></span>
                  Online
                </div>
              )}


              {/* Top section: Avatar + rating */}
              <div className="flex gap-4 items-start relative z-11 mt-16">
                {/* Avatar + rating */}
                <div className="relative -mt-6">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                  </Avatar>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-2 py-0.5 rounded-full text-sm flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 text-yellow-400" /> {mentor.rating.toFixed(1)}
                  </div>
                </div>

                {/* Name/Title/Company */}
                <div className="flex-1 flex flex-col justify-start text-black mt-1">
                  <div className="flex items-center gap-1">
                    <h3 className=" font-[700] text-[20px]">{mentor.name}</h3>
                    <Verified className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="font-[500] text-[14px] text-black">{mentor.title}</p>
                  <p className="font-[500] text-[14px] text-blue-600">{mentor.company}</p>
                </div>
              </div>

              <button className="ml-auto text-black hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              {/* Location + Experience + Like */}
              <div className="mt-1 flex items-center font-semibold text-sm text-black text-[14px]">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {mentor.location}
                </div>

                {mentor.yearsExperience && (
                  <div className="flex items-center gap-1 ml-3">
                    <Users className="w-4 h-4" /> {mentor.yearsExperience} yrs experience
                  </div>
                )}
              </div>


              {/* Description */}
              <p className="mt-4 text-[14px] font-[500] text-black py-1">{mentor.description}</p>

              {/* Stats in vertical columns */}
              {/* Stats Section */}
              <div className="mt-6 flex justify-between px-2 text-black">
                <div className="flex flex-col items-center text-[12px]">
                  <span className="font-[600] whitespace-nowrap">Response Time</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="font-[700]">{mentor.responseTime}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-[12px]">
                  <span className="font-[600] whitespace-nowrap">Total Mentees</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-[700]">{mentor.mentees}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-[12px]">
                  <span className="font-[600] whitespace-nowrap">Success Rate</span>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-[700]">{mentor.successRate}%</span>
                  </div>
                </div>
              </div>


              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2 text-black py-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center justify-center px-3 py-1 bg-[#D1EAFF] text-[12px] rounded-full font-medium"
                  >
                    <span className="px-2">{skill}</span>
                  </span>
                ))}
              </div>


              {/* Languages pill */}
              {mentor.languages && mentor.languages.length > 0 && (
                <div className="mt-4 group cursor-pointer inline-block ">
                  <div className="relative inline-flex items-center justify-center gap-1 px-2 py-1 bg-gray-300 text-[13px] font-[600] rounded-full transition-all duration-300 ease-in-out w-[154px] h-[30px]">

                    {/* Default (before hover) */}
                    <span className="flex items-center gap-1 transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 whitespace-nowrap">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>{mentor.languages.length} Languages</span>
                    </span>

                    {/* Hover (show languages, let pill expand naturally) */}
                    <span className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {mentor.languages.join(", ")}
                    </span>
                  </div>
                </div>
              )}



              {/* Rate + Buttons */}
              <div className="mt-8 flex items-end gap-4 w-full">
                {/* Price Section */}
                <div className="flex flex-col">
                  <span className="text-[14px] font-[600] leading-none">Starting from</span>
                  <span className="text-[20px] font-[700] text-[#0073CF] leading-none mt-1">
                    ₹{mentor.price}/hr
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-black rounded-full"
                  >
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>

                  <Button
                    size="sm"
                    className="w-full bg-[#0073CF] text-white hover:bg-blue-700 rounded-full"
                  >
                    Quick Book
                  </Button>
                </div>
              </div>


            </Card>
          ))}
        </div>

        <div className="flex justify-end mt-12 items-center gap-3">
          {/* White pill */}
          <Button
            size="sm"
            asChild
            className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-[#f2f2f2] transition-colors duration-300"
          >
            <Link href="/mentors">View All Mentors</Link>
          </Button>

          {/* Arrow in circle */}
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex items-center gap-2 group cursor-pointer">
            <ArrowRight className="text-black h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
          </span>
        </div>
      </div>
    </section>
  )

}
