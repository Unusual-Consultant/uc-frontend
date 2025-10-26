"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, ChevronLeft, ChevronRight, Verified } from "lucide-react"
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
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Science Manager",
    company: "Netflix",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviews: 73,
    location: "Los Angeles, CA",
    expertise: ["Data Science", "Machine Learning", "Python"],
    price: 140,
    mentees: 28,
    available: true,
  },
]

export function FeaturedMentors() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const mentorsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + mentorsPerView) % mentors.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - mentorsPerView + mentors.length) % mentors.length)
  }

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
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 p-0 rounded-full bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 p-0 rounded-full bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {mentor.available && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                      <Verified className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
                    <p className="text-sm font-medium text-blue-600 mb-3">{mentor.company}</p>

                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mentor.rating}</span>
                        <span>({mentor.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{mentor.mentees}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.expertise.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-bold text-lg">${mentor.price}/hr</div>
                      <Button asChild size="sm">
                        <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                      </Button>
                    </div>
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
