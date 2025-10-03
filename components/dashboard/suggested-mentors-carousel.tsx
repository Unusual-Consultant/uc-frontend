"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior PM at Google",
    location: "San Fransico, CA",
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
    location: "San Fransico, CA",
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
    location: "San Fransico, CA",
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
    location: "San Fransico, CA",
    role: "Startup Founder",
    company: "TechCorp",
    rating: 4.7,
    reviews: 73,
    price: 2000,
    tags: ["Entrepreneurship", "Fundraising", "Product-Market Fit"],
    image: "/placeholder.svg?height=60&width=60&text=DK",
    expertise: "Built and sold 2 startups",
  },
];

export function SuggestedMentorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;

  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev + itemsPerView >= mentors.length ? 0 : prev + itemsPerView
    );

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0 ? Math.max(0, mentors.length - itemsPerView) : prev - itemsPerView
    );

  const visibleMentors = mentors.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="w-full py-8 px-4 md:px-8 relative bg-transparent">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        {/* User icon */}
        <div className="w-9 h-9  flex items-center justify-center mt-1 overflow-hidden">
          <Image
            src="\healthicons_ui-user-profile-outline.png" // replace with your image
            alt="User"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>

        <div className="mt-1">
          <h2 className="text-2xl md:text-[28px] font-bold leading-tight md:leading-[32px] text-text-primary">
            <span className="text-text-primary">Top </span>
            <span className="text-[#003b6b]">Mentors</span>
            <span className="text-text-primary"> for you</span>
          </h2>
          <p className="text-sm text-gray-500 font-normal leading-relaxed mt-2">
            Based on your Goal: Product Manager
          </p>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Left arrow */}
<button
  onClick={prevSlide}
  className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all z-20"
>
  <ChevronLeft className="h-4 w-4 text-black" />
</button>

{/* Right arrow */}
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
              className="bg-white/90 shadow-md hover:shadow-2xl rounded-2xl border border-transparent transition-all transform hover:-translate-y-1"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Mentor image */}
                  <img
                    src={mentor.image || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div className="flex-1 text-sm">
                    <h3 className="font-bold text-base text-black">{mentor.name}</h3>
                    <div className="flex items-center gap-1 text-gray-600">
                      <span>{mentor.role}</span>
                      
                    </div>
                    <p className="text-gray-500 mb-1">{mentor.expertise}</p>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-black">{mentor.rating}</span>
                      <span className="text-xs text-gray-500">({mentor.reviews} reviews)</span>
                      <MapPin className="h-4 w-4 text-black" />
                      <span className="text-xs text-gray-500">{mentor.location}</span>
                    </div>

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

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-black font-bold text-base">₹{mentor.price}/hr</span>
                      <div className="flex gap-2">
                        <Button className="bg-white text-green-600 border border-green-600 rounded-full px-3 py-1 text-sm hover:bg-green-50">
                          View Profile
                        </Button>
                        <Button className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm flex items-center gap-1 hover:bg-blue-700">
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
    </section>
  );
}