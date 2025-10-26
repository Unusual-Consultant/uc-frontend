"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Engineer",
    company: "Stripe",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The mentorship I received through Unusual Consultant was game-changing. My mentor helped me navigate a career transition from frontend to full-stack development.",
    rating: 5,
    industry: "Technology",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Marketing Manager",
    company: "HubSpot",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I was able to increase my salary by 40% after working with my mentor on negotiation strategies and leadership skills. Highly recommend!",
    rating: 5,
    industry: "Marketing",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Product Designer",
    company: "Figma",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The design mentorship program helped me build a portfolio that landed me my dream job. The feedback was invaluable.",
    rating: 5,
    industry: "Design",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Data Scientist",
    company: "Airbnb",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "My mentor guided me through complex machine learning projects and helped me develop the confidence to lead data initiatives.",
    rating: 5,
    industry: "Data Science",
  },
  {
    id: 5,
    name: "Robert Chen",
    role: "Finance Director",
    company: "Goldman Sachs",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The financial modeling expertise I gained through mentorship was crucial for my promotion to director level.",
    rating: 5,
    industry: "Finance",
  },
  {
    id: 6,
    name: "Lisa Johnson",
    role: "HR Manager",
    company: "Microsoft",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Learning about organizational psychology and change management from my mentor transformed how I approach HR challenges.",
    rating: 5,
    industry: "Human Resources",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who transformed their careers with our mentorship platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {getVisibleTestimonials().map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-500 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm font-medium text-blue-600">{testimonial.company}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {testimonial.industry}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  )
}
