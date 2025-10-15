"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {QuickBook } from "@/components/dashboard/quickbook"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"


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
    experience: "8 yrs Experience",
    responseTime: "2 hrs",
    totalMentees: 340,
    successRate: "92%",
    availability: {
      sessions: ["career", "resume", "mock"],
      days_of_week: [1, 2, 3], // Mon, Tue, Wed
      times: ["4:00 PM", "6:00 PM", "3:00 PM"]
    }
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
    experience: "6 yrs Experience",
    responseTime: "4 hrs",
    totalMentees: 220,
    successRate: "88%",
    availability: {
      sessions: ["career", "mock", "quick"],
      days: [1, 2, 5], // Mon, Tue, Fri
      times: ["5:00 PM", "7:30 PM", "11:00 AM"]
    }
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
    experience: "9 yrs Experience",
    responseTime: "3 hrs",
    totalMentees: 400,
    successRate: "95%",
    availability: {
      sessions: ["resume", "mock", "quick"],
      days: [2, 4, 5], // Tue, Thu, Fri
      times: ["10:00 AM", "2:00 PM", "6:30 PM"]
    }
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    location: "Seoul, South Korea",
    company: "TechCorp",
    rating: 4.7,
    reviews: 73,
    price: 2000,
    tags: ["Entrepreneurship", "Fundraising", "Product-Market Fit"],
    image: "/placeholder.svg?height=60&width=60&text=DK",
    expertise: "Built and sold 2 startups",
    experience: "7 yrs Experience",
    responseTime: "6 hrs",
    totalMentees: 150,
    successRate: "85%",
    availability: {
      sessions: ["career", "quick"],
      days: [5, 5, 1], // Fri, Fri, Next Tue
      times: ["9:00 AM", "5:00 PM", "11:00 AM"]
    }
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "UX Lead at Spotify",
    location: "New York, USA",
    company: "Spotify",
    rating: 4.8,
    reviews: 142,
    price: 1600,
    tags: ["UX Design", "User Research", "Prototyping"],
    image: "/placeholder.svg?height=60&width=60&text=ER",
    expertise: "10+ years in user-centered design",
    experience: "10 yrs Experience",
    responseTime: "5 hrs",
    totalMentees: 280,
    successRate: "90%",
    availability: {
      sessions: ["resume", "mock"],
      days: [1, 2, 3], // Today, Tomorrow, Next Wed
      times: ["8:00 PM", "11:00 AM", "4:30 PM"]
    }
  },
  {
    id: 6,
    name: "Ravi Patel",
    role: "AI Researcher",
    location: "London, UK",
    company: "DeepMind",
    rating: 4.95,
    reviews: 201,
    price: 2500,
    tags: ["AI Research", "Deep Learning", "Generative Models"],
    image: "/placeholder.svg?height=60&width=60&text=RP",
    expertise: "Published 15+ AI papers",
    experience: "12 yrs Experience",
    responseTime: "1 hr",
    totalMentees: 500,
    successRate: "97%",
    availability: {
      sessions: ["career", "mock"],
      days: [2, 4, 5], // Tomorrow, Sat, Next Thu
      times: ["9:00 AM", "6:00 PM", "2:00 PM"]
    }
  }
]


const sessions = [
  { id: "career", title: "Career Strategy Call", desc: "1-on-1 career guidance and strategic planning session", price: "₹2500", duration: "45 mins" },
  { id: "resume", title: "Resume Review", desc: "Comprehensive resume analysis with improvement suggestions", price: "₹1200", duration: "30 mins" },
  { id: "mock", title: "Mock Interview", desc: "Practice interviews with detailed feedback and tips", price: "₹3000", duration: "60 mins" },
  { id: "quick", title: "Quick Consultation", desc: "Brief consultation for specific questions", price: "₹500", duration: "20 mins" },
]

const timezones = ["IST", "GMT", "EST", "PST"]


export function SuggestedMentorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const itemsPerView = 2

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
    <section className="w-full py-8 px-4 md:px-8 relative bg-transparent">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-9 h-9 flex items-center justify-center mt-1 overflow-hidden">
          <Image
            src="/healthicons_ui-user-profile-outline.png"
            alt="User"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>

        <div className="mt-1">
          <h2 className="text-2xl md:text-[28px] font-bold leading-tight text-text-primary">
            <span className="text-text-primary">Top </span>
            <span className="text-[#003b6b]">Mentors</span>
            <span className="text-text-primary"> for you</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Based on your Goal: Product Manager
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all z-20"
        >
          <ChevronLeft className="h-4 w-4 text-black" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all z-20"
        >
          <ChevronRight className="h-4 w-4 text-black" />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="bg-white/90 shadow-md hover:shadow-2xl rounded-2xl transition-all transform hover:-translate-y-1"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <h3 className="font-bold text-base text-black">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-500">{mentor.role}</p>
                    <p className="text-gray-500 mb-1">{mentor.expertise}</p>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-black">
                        {mentor.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({mentor.reviews} reviews)
                      </span>
                      <MapPin className="h-4 w-4 text-black" />
                      <span className="text-xs text-gray-500">
                        {mentor.location}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-black font-bold text-base">
                        ₹{mentor.price}/hr
                      </span>
                      <div className="flex gap-2">
                        <Button
                          className="bg-white text-green-600 border border-green-600 rounded-full px-3 py-1 text-sm hover:bg-green-50"
                        >
                          View Profile
                        </Button>
                        <Button
                          onClick={() => setSelectedMentor(mentor)}
                          className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm flex items-center gap-1 hover:bg-blue-700"
                        >
                          Quick Book <ArrowRight className="h-3 w-3" />
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

      {/* Quick Book Modal */}
      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
  <DialogContent className="max-w-3xl w-full rounded-2xl overflow-hidden p-0">
    <VisuallyHidden>
      <DialogTitle>Book {selectedMentor?.name}</DialogTitle>
    </VisuallyHidden>
    {selectedMentor && (
      <QuickBook
      mentor={selectedMentor}
      sessions={sessions}
      timezones={timezones}
      onClose={() => setSelectedMentor(null)}
    />
    )}
  </DialogContent>
</Dialog>

    </section>
  )
}
