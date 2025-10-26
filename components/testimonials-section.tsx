"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useState } from "react"

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
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1
    )
  }

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* === Heading + Arrows === */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black"><span className="text-[#0073CF]">Success</span> Stories</h2>
            <p className="text-lg text-black mt-2">
              Hear from professionals who transformed their careers with our mentorship platform
            </p>
          </div>

          {/* Arrows */}
          <div className="flex gap-3 text-xl font-bold text-white">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-[#0073CF] flex items-center justify-center hover:bg-[#005fa3] transition-colors"
            >
              &lt;
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full bg-[#0073CF] flex items-center justify-center hover:bg-[#005fa3] transition-colors"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* === Testimonials Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getVisibleTestimonials().map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-0 bg-white shadow-[0_8px_24px_#9F9D9D20] hover:shadow-[0_8px_32px_#9F9D9D30] transition-all duration-300 rounded-[32px]"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
               

                {/* Quote */}
                <Quote className="h-8 w-8 text-gray-400 rotate-180 mb-2" />
                   {/* Stars above testimonial */}
                   <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-black mb-6 leading-relaxed">“{testimonial.content}”</p>

                {/* Author */}
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-black">{testimonial.role}</p>
                    <p className="text-sm font-medium text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* === Stats Section === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-bl-[48px]">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-black">Average Rating</div>
          </div>
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-black">Success Stories</div>
          </div>
          <div className="bg-white shadow-[0_8px_24px_#9F9D9D20] p-6 text-center rounded-br-[48px]">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-black">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  )
}
