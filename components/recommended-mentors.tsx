"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

const recommendedMentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 127,
    expertise: ["Product Management", "Strategy"],
    price: 150,
    reason: "Based on your interest in Product Management",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Software Engineer",
    company: "Meta",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 89,
    expertise: ["React", "System Design"],
    price: 120,
    reason: "Popular in Software Engineering",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Apple",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 156,
    expertise: ["UX Design", "Design Systems"],
    price: 180,
    reason: "Trending in Design",
  },
]

export function RecommendedMentors() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Recommended for You</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover mentors that match your interests and career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recommendedMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="font-bold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
                  <p className="text-sm font-medium text-blue-600 mb-3">{mentor.company}</p>

                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-gray-500">({mentor.reviews})</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-center mb-4">
                    <div className="font-bold text-xl text-gray-900">${mentor.price}/hr</div>
                    <div className="text-xs text-blue-600">{mentor.reason}</div>
                  </div>

                  <Button asChild className="w-full" size="sm">
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/mentors">
              View All Mentors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
