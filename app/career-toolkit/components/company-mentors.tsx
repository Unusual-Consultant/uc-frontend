"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, ChevronLeft, ChevronRight, MapPin, Building2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { QuickBook } from "@/components/dashboard/quickbook"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Image from "next/image"

interface Mentor {
  id: string;
  name: string;
  role: string;
  location: string;
  company: string;
  rating: number;
  reviews: number;
  price: number;
  tags: string[];
  image: string;
  expertise: string;
  matchScore: number;
}

// Fallback mentors data (only used if API fails)
export const mentors: Mentor[] = []

const itemsPerView = 2

interface CompanyAlignedMentorsProps {
  company?: string;
  role?: string;
}

export function CompanyAlignedMentors({ company, role }: CompanyAlignedMentorsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [mentorList, setMentorList] = useState<Mentor[]>(mentors)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch mentors from backend if company is provided
  useEffect(() => {
    const fetchMentors = async () => {
      if (!company) return;

      setIsLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/mentors/company-aligned?company=${encodeURIComponent(company)}&limit=4`;
        if (role) {
          url += `&role=${encodeURIComponent(role)}`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMentorList(data.mentors || mentors);
        } else {
          console.error("Failed to fetch mentors");
          setMentorList(mentors);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setMentorList(mentors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, [company, role]);

  // Use dynamic mentor list
  const currentMentors = company ? mentorList : mentors;

  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev + itemsPerView >= currentMentors.length ? 0 : prev + itemsPerView
    )

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0
        ? Math.max(0, currentMentors.length - itemsPerView)
        : prev - itemsPerView
    )

  const visibleMentors = currentMentors.slice(
    currentIndex,
    currentIndex + itemsPerView
  )

  // Only skip rendering if no company provided
  if (!company || !company.trim()) {
    return null;
  }

  return (
    <section className="w-full py-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex">
          <Building2 width={32}
            height={32} />
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 px-2">
            Company Aligned Mentors
          </h2>
        </div>

        {/* Carousel or empty state */}
        {isLoading ? (
          <div className="text-sm text-gray-600 px-2 py-4">Loading mentors for {company}...</div>
        ) : currentMentors.length === 0 ? (
          <div className="text-sm text-gray-600 px-2 py-4">No mentors found for {company}. Try a different company or adjust your role.</div>
        ) : (
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
                      "linear-gradient(white, white) padding-box,  border-box",
                    padding: "1rem",
                  }}
                >


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
        )}

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
