"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified, MapPin, Clock, Users, Check } from "lucide-react"
import Link from "next/link"

const mentors = [
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
  },
]

export function FeaturedMentors() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const mentorsPerView = 3

  const nextSlide = () => setCurrentIndex((prev) => (prev + mentorsPerView) % mentors.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - mentorsPerView + mentors.length) % mentors.length)

  const visibleMentors = []
  for (let i = 0; i < mentorsPerView; i++) {
    visibleMentors.push(mentors[(currentIndex + i) % mentors.length])
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Mentors</h2>
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

              <CardContent className="pt-16 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  <Verified className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600">{mentor.title}</p>
                <p className="text-sm font-medium text-blue-600 mb-2">{mentor.company}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 justify-center">
                  <MapPin className="w-4 h-4" />
                  <span>{mentor.location}</span>
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
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 w-full">
                  <div className="font-bold text-lg text-gray-900">₹{mentor.price}/Session</div>
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
