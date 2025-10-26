"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified, MapPin, Clock, Users, Check, Heart, Star, Languages } from "lucide-react"
import Link from "next/link"

interface Mentor {
  id: string
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

export function FeaturedMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const mentorsPerView = 3

  useEffect(() => {
    fetchMentors()
  }, [])

  const fetchMentors = async () => {
    try {
      console.log("Fetching mentors from backend...")
      const response = await fetch("http://127.0.0.1:8000/api/v1/featured-mentors/all/mentors?per_page=9")
      console.log("Response status:", response.status)
      if (!response.ok) throw new Error(`Failed to fetch mentors: ${response.status}`)
      const data = await response.json()
      console.log("Mentors data:", data)
      
      // Transform backend data to frontend format
      const transformedMentors = data.mentors.map((mentor: any) => ({
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
      
      setMentors(transformedMentors)
    } catch (error) {
      console.error("Error fetching mentors:", error)
      // Fallback to empty array
      setMentors([])
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + mentorsPerView) % mentors.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - mentorsPerView + mentors.length) % mentors.length)

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

  if (mentors.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">No mentors available at the moment.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Mentors</h2>
            <p className="text-gray-600">Connect with top industry professionals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prevSlide} className="w-10 h-10 p-0 rounded-full">
              &lt;
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} className="w-10 h-10 p-0 rounded-full">
              &gt;
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="relative hover:shadow-lg transition-shadow duration-300 border overflow-hidden rounded-xl flex flex-col items-center"
            >
              {/* Sky-blue top layer */}
              <div className="h-24 bg-sky-100 w-full flex justify-center items-end">
                {/* Avatar overlaps */}
                <Avatar className="w-24 h-24 -mb-12 ring-4 ring-sky-100">
                  <AvatarImage src={mentor.image} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Online badge */}
              {mentor.available && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
                  Online
                </div>
              )}

              {/* Favorite button */}
              <button className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              {/* Rating badge */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                <Star className="w-3 h-3 fill-current" />
                {mentor.rating.toFixed(1)}
              </div>

              <CardContent className="pt-16 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  <Verified className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600">{mentor.title}</p>
                <p className="text-sm font-medium text-blue-600 mb-2">{mentor.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 justify-center">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mentor.location}</span>
                  </div>
                  {mentor.yearsExperience && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{mentor.yearsExperience} yrs experience</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-3">{mentor.description}</p>

                <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{mentor.mentees}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>{mentor.successRate}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.languages && mentor.languages.length > 0 && (
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Languages className="w-3 h-3 text-blue-600" />
                      {mentor.languages.length} Languages
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="font-bold text-lg text-gray-900">₹{mentor.price}</span>
                    <span className="text-sm text-gray-600">/Session</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      Quick Book
                    </Button>
                  </div>
                </div>
              </CardContent>
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
