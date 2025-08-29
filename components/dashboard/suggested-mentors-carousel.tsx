"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior PM at Google",
    company: "Google",
    rating: 4.9,
    reviews: 127,
    price: 1500,
    tags: ["Product Strategy", "Career Growth", "Interview Prep"],
    image: "/placeholder.svg?height=60&width=60&text=SJ",
    expertise: "Ex-Google PM with 8+ years experience",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Ex-Amazon PM",
    company: "Amazon",
    rating: 4.8,
    reviews: 89,
    price: 1200,
    tags: ["System Design", "Leadership", "Product Management"],
    image: "/placeholder.svg?height=60&width=60&text=MC",
    expertise: "Led 5+ product launches at Amazon",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Data Science Manager",
    company: "Microsoft",
    rating: 4.9,
    reviews: 156,
    price: 1800,
    tags: ["Data Science", "ML Engineering", "Career Transition"],
    image: "/placeholder.svg?height=60&width=60&text=PS",
    expertise: "Transitioned from SDE to DS Manager",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    company: "TechCorp",
    rating: 4.7,
    reviews: 73,
    price: 2000,
    tags: ["Entrepreneurship", "Fundraising", "Product-Market Fit"],
    image: "/placeholder.svg?height=60&width=60&text=DK",
    expertise: "Built and sold 2 startups",
  },
]

export function SuggestedMentorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 2

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= mentors.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0 ? Math.max(0, mentors.length - itemsPerView) : prev - itemsPerView,
    )
  }

  const visibleMentors = mentors.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Top Mentors for You</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Based on your goal: Product Manager</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleMentors.map((mentor) => (
            <Card key={mentor.id} className="border-2 hover:border-blue-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={mentor.image || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{mentor.name}</h3>
                    <p className="text-blue-600 font-medium">{mentor.role}</p>
                    <p className="text-sm text-gray-600 mb-2">{mentor.expertise}</p>

                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{mentor.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({mentor.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">₹{mentor.price}</div>
                      <Button size="sm" className="bg-green-700 hover:bg-green-800">
                        Book Now
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
