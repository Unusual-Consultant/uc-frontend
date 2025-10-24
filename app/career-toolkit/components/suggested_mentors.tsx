"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { QuickBook } from "@/components/dashboard/quickbook"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Image from "next/image"

export const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior PM at Google",
    location: "San Francisco, CA",
    company: "Google",
    rating: 4.9,
    reviews: 127,
    price: 1500,
    tags: ["Product Strategy", "Career Growth", "Interview Prep"],
    image: "/placeholder.svg?height=60&width=60&text=SJ",
    expertise: "Ex-Google PM with 8+ years experience",
    matchScore: 95
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Ex-Amazon PM",
    location: "San Francisco, CA",
    company: "Amazon",
    rating: 4.8,
    reviews: 89,
    price: 1200,
    tags: ["System Design", "Leadership", "Product Management"],
    image: "/placeholder.svg?height=60&width=60&text=MC",
    expertise: "Led 5+ product launches at Amazon",
    matchScore: 92
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Data Science Manager",
    location: "Bangalore, India",
    company: "Microsoft",
    rating: 4.9,
    reviews: 156,
    price: 1800,
    tags: ["Data Science", "ML Engineering", "Career Transition"],
    image: "/placeholder.svg?height=60&width=60&text=PS",
    expertise: "Transitioned from SDE to DS Manager",
    matchScore: 88
  }
]

const itemsPerView = 2

export function SuggestedMentorsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)

  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev + itemsPerView >= mentors.length ? 0 : prev + itemsPerView
    )

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0
        ? Math.max(0, mentors.length - itemsPerView)
        : prev - itemsPerView
    )

  const visibleMentors = mentors.slice(
    currentIndex,
    currentIndex + itemsPerView
  )

  return (
    <section className="w-full py-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex">
          <Image
          src="/bi_stars.png"
          alt="sparkle"
          width={12}
          height={12}
          className="w-7 h-7"
        />
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
            AI Recommended Mentors
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition-all z-20"
          >
            <ChevronLeft className="h-3 w-3 text-black" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition-all z-20"
          >
            <ChevronRight className="h-3 w-3 text-black" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleMentors.map((mentor) => (
              <Card
                key={mentor.id}
                className="bg-white shadow-md hover:shadow-xl rounded-2xl transition-all transform hover:-translate-y-1 relative mx-2 my-3"
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  border: "3px solid transparent",
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(to right, #B8015A, #0171CD) border-box",
                  padding: "1rem",
                }}
              >


                {/* Match Pill */}
                <div className="absolute top-6 right-4 text-[12px]">
                  <div
                    className="relative inline-block rounded-full"
                    style={{
                      background: "linear-gradient(to right, #B8015A, #0171CD)", 
                      padding: "1.5px", 
                      borderRadius: "9999px", 
                      display: "inline-block",
                    }}
                  >
                    <div
                      className="rounded-full flex items-center justify-center gap-1 px-3 py-[4px]  font-semibold text-center"
                      style={{
                        background: "linear-gradient(to right, #FDF1F7, #EDF6FE)", 
                        borderRadius: "9999px", 
                      }}
                    >
                      <Image
                        src="/bi_stars.png"
                        alt="sparkle"
                        width={14}
                        height={14}
                        className="w-[14px] h-[14px]"
                      />
                      {mentor.matchScore}% Match
                    </div>
                  </div>
                </div>


                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 text-xs md:text-sm">
                      <h3 className="font-bold text-sm md:text-base text-black">{mentor.name}</h3>
                      <p className="text-balck">{mentor.role}</p>
                      <p className=" text-[#0073CF] font-semibold ">{mentor.company}</p>
                      <div className="flex flex-wrap items-center gap-1 mb-1 font-medium">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className=" text-black text-xs">{mentor.rating}</span>
                        <span className=" text-black">({mentor.reviews})</span>
                        <MapPin className="h-3 w-3 text-black " />
                        <span className=" text-black">{mentor.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {mentor.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 bg-[#EDF7FF] text-black text-[10px] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span className="text-black font-bold text-sm md:text-base">
                          ₹{mentor.price}/hr
                        </span>
                        <div className="flex gap-2 text-[14px]">
                          <Button
                            variant="outline"
                            className="bg-white border border-black hover:bg-gray-100 rounded-full px-4 py-[2px]  h-auto min-h-0"
                          >
                            View Profile
                          </Button>

                          <Button
                            onClick={() => setSelectedMentor(mentor)}
                            className="bg-[#0070E0] text-white rounded-full px-4 py-[6px]  h-auto min-h-0 flex items-center gap-1 hover:bg-blue-700"
                          >
                            Quick Book
                          </Button>
                        </div>

                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Book */}
        <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
          <DialogContent className="max-w-3xl w-full rounded-2xl overflow-hidden p-0">
            <VisuallyHidden>
              Book {selectedMentor?.name}
            </VisuallyHidden>
            {selectedMentor && (
              <QuickBook
                mentor={selectedMentor}
                sessions={[]}
                timezones={[]}
                onClose={() => setSelectedMentor(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
