"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  menteeName: string
  menteeImage: string
  menteeRole: string
  menteeCompany: string
  rating: number
  review: string
  date: string
  sessionType: string
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  autoRotate?: boolean
  showControls?: boolean
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    menteeName: "Cion Reyes",
    menteeImage: "/placeholder.svg?height=60&width=60",
    menteeRole: "Software Engineer",
    menteeCompany: "Tech Corp",
    rating: 5,
    review: "Great session overall. He helped me understand system design concepts better.",
    date: "2 days ago",
    sessionType: "System Design Review"
  },
  {
    id: "2",
    menteeName: "Shreyas",
    menteeImage: "/placeholder.svg?height=60&width=60", 
    menteeRole: "Product Manager",
    menteeCompany: "Startup Inc",
    rating: 4.5,
    review: "Excellent communication and guidance throughout the session. I appreciated how structured and thoughtful the approach was.",
    date: "1 week ago",
    sessionType: "Career Strategy Call"
  },
  {
    id: "3",
    menteeName: "Smith Moron",
    menteeImage: "/placeholder.svg?height=60&width=60",
    menteeRole: "Engineering Manager", 
    menteeCompany: "Big Tech",
    rating: 4.5,
    review: "Felt heard and encouraged. The advice was actionable, and I now have a clear roadmap to follow.",
    date: "2 weeks ago",
    sessionType: "Leadership Coaching"
  },
  {
    id: "4",
    menteeName: "Sarah Johnson",
    menteeImage: "/placeholder.svg?height=60&width=60",
    menteeRole: "UX Designer",
    menteeCompany: "Design Studio",
    rating: 5,
    review: "Amazing mentor! The session was incredibly valuable and I learned so much about product strategy.",
    date: "3 days ago",
    sessionType: "Product Strategy"
  },
  {
    id: "5",
    menteeName: "Alex Chen",
    menteeImage: "/placeholder.svg?height=60&width=60",
    menteeRole: "Data Scientist",
    menteeCompany: "Analytics Co",
    rating: 4.8,
    review: "Very knowledgeable and patient. Helped me understand complex technical concepts with real-world examples.",
    date: "1 week ago",
    sessionType: "Technical Interview Prep"
  }
]

export function TestimonialsSection({ 
  testimonials = defaultTestimonials, 
  autoRotate = true,
  showControls = true 
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !autoRotate || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isClient, autoRotate, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  if (!isClient) {
    return (
      <div className="w-full">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={currentTestimonial.menteeImage} alt={currentTestimonial.menteeName} />
              <AvatarFallback>
                {currentTestimonial.menteeName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{currentTestimonial.menteeName}</h4>
                  <p className="text-sm text-gray-600">
                    {currentTestimonial.menteeRole} at {currentTestimonial.menteeCompany}
          </p>
        </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(currentTestimonial.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{currentTestimonial.rating}</span>
                  </div>
                </div>

              {/* Review */}
              <blockquote className="text-gray-700 mb-3 italic">
                "{currentTestimonial.review}"
              </blockquote>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{currentTestimonial.sessionType}</span>
                <span>{currentTestimonial.date}</span>
              </div>
                  </div>
                </div>

          {/* Controls */}
          {showControls && testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              {/* Navigation Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
        </div>

              {/* Dots Indicator */}
              <div className="flex items-center space-x-1">
                {testimonials.map((_, index) => (
            <button
              key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-500 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

              {/* Testimonial Counter */}
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {testimonials.length}
          </div>
        </div>
          )}
        </CardContent>
      </Card>
      </div>
  )
}

// Compact version for sidebars
export function TestimonialsCompact({ 
  testimonials = defaultTestimonials.slice(0, 3)
}: { testimonials?: Testimonial[] }) {
  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="flex items-start space-x-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={testimonial.menteeImage} alt={testimonial.menteeName} />
            <AvatarFallback className="text-xs">
              {testimonial.menteeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 mb-1">
              <span className="font-medium text-sm text-gray-900">{testimonial.menteeName}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(testimonial.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">"{testimonial.review}"</p>
          </div>
        </div>
      ))}
    </div>
  )
}