"use client";

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ArrowRight, Star, MapPin, ChevronLeft, ChevronRight, Award, Verified } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { featuredMentors, testimonials } from "@/lib/data"


export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentMentor, setCurrentMentor] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isClient, setIsClient] = useState(false) // SSG optimization
  const [autoRotateInterval, setAutoRotateInterval] = useState<NodeJS.Timeout | null>(null)
  const [testimonialAutoRotateInterval, setTestimonialAutoRotateInterval] = useState<NodeJS.Timeout | null>(null)

  const handleSearch = useCallback(() => {
    try {
      if (searchQuery.trim()) {
        router.push(`/mentors?search=${encodeURIComponent(searchQuery)}`)
      } else {
        router.push("/mentors")
      }
    } catch (error) {
      console.error('Error during search navigation:', error)
    }
  }, [searchQuery, router])

  const nextMentor = useCallback(() => {
    console.log('nextMentor called', { isClient })
    if (!isClient) {
      console.log('nextMentor blocked - not client side')
      return
    }
    try {
      setCurrentMentor((prev) => {
        const newIndex = (prev + 1) % featuredMentors.length
        console.log('nextMentor: changing from', prev, 'to', newIndex)
        return newIndex
      })
      // Reset auto-rotation timer
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval)
      }
      // Restart auto-rotation
      const newInterval = setInterval(() => {
        setCurrentMentor((prev) => (prev + 1) % featuredMentors.length)
      }, 6000)
      setAutoRotateInterval(newInterval)
    } catch (error) {
      console.error('Error in nextMentor:', error)
    }
  }, [autoRotateInterval, isClient])

  const prevMentor = useCallback(() => {
    console.log('prevMentor called', { isClient })
    if (!isClient) {
      console.log('prevMentor blocked - not client side')
      return
    }
    try {
      setCurrentMentor((prev) => {
        const newIndex = (prev - 1 + featuredMentors.length) % featuredMentors.length
        console.log('prevMentor: changing from', prev, 'to', newIndex)
        return newIndex
      })
      // Reset auto-rotation timer
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval)
      }
      // Restart auto-rotation
      const newInterval = setInterval(() => {
        setCurrentMentor((prev) => (prev + 1) % featuredMentors.length)
      }, 6000)
      setAutoRotateInterval(newInterval)
    } catch (error) {
      console.error('Error in prevMentor:', error)
    }
  }, [autoRotateInterval, isClient])

  const nextTestimonial = useCallback(() => {
    console.log('nextTestimonial called', { isClient })
    if (!isClient) {
      console.log('nextTestimonial blocked - not client side')
      return
    }
    try {
      setCurrentTestimonial((prev) => {
        const newIndex = (prev + 1) % testimonials.length
        console.log('nextTestimonial: changing from', prev, 'to', newIndex)
        return newIndex
      })
      // Reset auto-rotation timer
      if (testimonialAutoRotateInterval) {
        clearInterval(testimonialAutoRotateInterval)
      }
      // Restart auto-rotation
      const newInterval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      setTestimonialAutoRotateInterval(newInterval)
    } catch (error) {
      console.error('Error in nextTestimonial:', error)
    }
  }, [testimonialAutoRotateInterval, isClient])

  const prevTestimonial = useCallback(() => {
    console.log('prevTestimonial called', { isClient })
    if (!isClient) {
      console.log('prevTestimonial blocked - not client side')
      return
    }
    try {
      setCurrentTestimonial((prev) => {
        const newIndex = (prev - 1 + testimonials.length) % testimonials.length
        console.log('prevTestimonial: changing from', prev, 'to', newIndex)
        return newIndex
      })
      // Reset auto-rotation timer
      if (testimonialAutoRotateInterval) {
        clearInterval(testimonialAutoRotateInterval)
      }
      // Restart auto-rotation
      const newInterval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      setTestimonialAutoRotateInterval(newInterval)
    } catch (error) {
      console.error('Error in prevTestimonial:', error)
    }
  }, [testimonialAutoRotateInterval, isClient])


  // Client-side hydration check for SSG optimization
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-rotate mentors and testimonials every 6 seconds (client-side only)
  useEffect(() => {
    if (!isClient) return // Don't run on server
    if (featuredMentors.length <= 1) return // No need for interval with single item
    
    // Start auto-rotation for mentors
    const mentorInterval = setInterval(() => {
      setCurrentMentor((prev) => (prev + 1) % featuredMentors.length)
    }, 6000)
    
    // Start auto-rotation for testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    
    // Store intervals for cleanup
    setAutoRotateInterval(mentorInterval)
    setTestimonialAutoRotateInterval(testimonialInterval)
    
    return () => {
      clearInterval(mentorInterval)
      clearInterval(testimonialInterval)
    }
  }, [isClient]) // Only run when client-side

  return (
    <section className="relative min-h-screen overflow-hidden" style={{background: 'linear-gradient(165deg, #FFFFFF 0%, #FFFFFF 40%, #D1EAFF 55%, #B7DFFF 70%)'}}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-50 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Unusual growth
                <span> through </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0073CF] to-[#003C6C]">
                  Guidance
                </span>
              </h1>

              <p className="text-xl text-black-600 leading-relaxed">
                AI as your frontline mentor, with human experts ready to step in
                for deeper guidance on demand
              </p>
            </div>

            {/* Search Bar */}
            <div className="space-y-4">
              <div className="flex items-center rounded-full shadow-md border border-gray-200 mt-6 p-1 gap-2">
                {/* Search Icon + Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-7" />
                  <Input
                    type="text"
                    placeholder="Search by skill, role, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 pr-4 py-4 text-lg border-none focus:ring-0 focus:outline-none"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="px-7 py-4 text-lg bg-[#0073CF] text-white hover:bg-[#005fa3] rounded-3xl"
                >
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Popular:</span>
                {[
                  "Product Management",
                  "Software Engineering",
                  "Data Science",
                  "UX Design",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      setSearchQuery(skill);
                      handleSearch();
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="px-8 py-4 text-lg rounded-3xl bg-[#0073CF] text-white hover:bg-[#005fa3]"
              >
                <Link href="/mentors">Find Mentors</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg rounded-3xl bg-transparent"
              >
                <Link href="/onboarding/mentor">Become a Mentor</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Mentor & Testimonial Cards */}
          <div className="space-y-6">
            {/* Featured Mentors*/}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Meet our Mentors
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevMentor}
                    disabled={!isClient}
                    className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-blue-50 transition-colors"
                    aria-label="Previous mentor"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextMentor}
                    disabled={!isClient}
                    className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-blue-50 transition-colors"
                    aria-label="Next mentor"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden" role="region" aria-label="Featured Mentors Carousel">
                <div 
                  className="flex transition-transform duration-1500 ease-out"
                  style={{ 
                    transform: isClient ? `translateX(-${currentMentor * 100}%)` : 'translateX(0%)' 
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {featuredMentors.map((mentor, index) => (
                    <div key={mentor.id} className="w-full flex-shrink-0">
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                                  src={mentor.image || "/placeholder.svg"}
                                  alt={mentor.name}
                        />
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
                                <h4 className="font-bold text-lg text-gray-900">{mentor.name}</h4>
                        <Verified className="h-4 w-4 text-blue-500" />
                      </div>
                              <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
                              <p className="text-sm font-medium text-blue-600 mb-3">{mentor.company}</p>

                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{mentor.rating}</span>
                                  <span>({mentor.sessions})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                                  <span>{mentor.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                                {mentor.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                                <div className="font-bold text-xl">${mentor.price}/hr</div>
                        <Button
                          size="sm"
                                  disabled={!mentor.available}
                          className="disabled:opacity-50"
                        >
                                  {mentor.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                    </div>
                  ))}
                </div>
              </div>

                {/* Carousel Indicators - Only render on client */}
                {isClient && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {featuredMentors.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          try {
                            setCurrentMentor(index)
                            // Reset auto-rotation timer
                            if (autoRotateInterval) {
                              clearInterval(autoRotateInterval)
                            }
                            // Restart auto-rotation
                            const newInterval = setInterval(() => {
                              setCurrentMentor((prev) => (prev + 1) % featuredMentors.length)
                            }, 6000)
                            setAutoRotateInterval(newInterval)
                          } catch (error) {
                            console.error('Error in mentor indicator click:', error)
                          }
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentMentor
                            ? 'bg-blue-500 w-6'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to mentor ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
            </div>

            {/* Success Stories */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Success Stories
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    disabled={!isClient}
                    className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-blue-50 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    disabled={!isClient}
                    className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-blue-50 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden" role="region" aria-label="Success Stories Carousel">
                <div 
                  className="flex transition-transform duration-1500 ease-out"
                  style={{ 
                    transform: isClient ? `translateX(-${currentTestimonial * 100}%)` : 'translateX(0%)' 
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                      />
                      <AvatarFallback>
                                {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                              <p className="text-gray-700 mb-3 italic">"{testimonial.content}"</p>

                      <div>
                                <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">
                                  {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Indicators - Only render on client */}
              {isClient && (
                <div className="flex justify-center mt-4 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        try {
                          setCurrentTestimonial(index)
                          // Reset auto-rotation timer
                          if (testimonialAutoRotateInterval) {
                            clearInterval(testimonialAutoRotateInterval)
                          }
                          // Restart auto-rotation
                          const newInterval = setInterval(() => {
                            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
                          }, 6000)
                          setTestimonialAutoRotateInterval(newInterval)
                        } catch (error) {
                          console.error('Error in testimonial indicator click:', error)
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-blue-500 w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
