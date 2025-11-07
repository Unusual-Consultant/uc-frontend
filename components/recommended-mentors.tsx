"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ArrowRight, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { QuickBook } from "@/components/dashboard/quickbook"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogTitle } from "@/components/ui/dialog"
import { fetchRecommendedMentors, RecommendedMentor } from "@/lib/api"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

export function RecommendedMentors() {
  const { user } = useAuthenticatedUser()
  const [mentors, setMentors] = useState<RecommendedMentor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<RecommendedMentor | null>(null)

  useEffect(() => {
    const loadMentors = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null
        const data = await fetchRecommendedMentors(authToken, 6)
        
        if (data.length === 0 && !authToken) {
          setError("Please sign in to see recommended mentors")
        } else {
          setMentors(data)
        }
      } catch (err) {
        console.error("Error loading recommended mentors:", err)
        setError(err instanceof Error ? err.message : "Failed to load recommended mentors")
      } finally {
        setIsLoading(false)
      }
    }

    loadMentors()
  }, [user])

  // Format price from paise to rupees
  const formatPrice = (priceInPaise: number) => {
    return `₹${(priceInPaise / 100).toFixed(0)}`
  }

  // Transform backend mentor to QuickBook format
  const transformMentorForQuickBook = (mentor: RecommendedMentor) => {
    return {
      id: mentor.id,
      name: mentor.name,
      role: mentor.role,
      company: mentor.company,
      location: mentor.location,
      rating: mentor.rating,
      reviews: mentor.reviews,
      price: mentor.price / 100, // Convert to rupees
      tags: mentor.tags,
      image: mentor.image || "/default_pfp.png",
      expertise: mentor.expertise,
      experience: mentor.experience,
      responseTime: mentor.responseTime,
      totalMentees: mentor.totalMentees,
      successRate: mentor.successRate,
    }
  }

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

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading recommended mentors...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            {!user && (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No recommended mentors available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={mentor.image || "/default_pfp.png"} alt={mentor.name} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="font-bold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{mentor.role}</p>
                    {mentor.company && (
                      <p className="text-sm font-medium text-blue-600 mb-3">{mentor.company}</p>
                    )}

                    <div className="flex items-center justify-center space-x-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mentor.rating.toFixed(1)}</span>
                      <span className="text-gray-500">({mentor.reviews})</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {mentor.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-center mb-4">
                      <div className="font-bold text-xl text-gray-900">
                        {formatPrice(mentor.price)}/session
                      </div>
                      {mentor.experience && (
                        <div className="text-xs text-gray-600 mt-1">{mentor.experience}</div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        asChild 
                        variant="outline" 
                        className="flex-1" 
                        size="sm"
                      >
                        <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                      </Button>
                      <Button 
                        onClick={() => setSelectedMentor(mentor)}
                        className="flex-1 bg-[#0073CF] hover:bg-[#005fa3]" 
                        size="sm"
                      >
                        Quick Book
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && mentors.length > 0 && (
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/mentors">
                View All Mentors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}

        {/* Quick Book Modal */}
        <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
          <DialogContent className="max-w-3xl w-full rounded-2xl overflow-hidden p-0">
            <VisuallyHidden>
              <DialogTitle>Book {selectedMentor?.name}</DialogTitle>
            </VisuallyHidden>
            {selectedMentor && (
              <QuickBook
                mentor={transformMentorForQuickBook(selectedMentor)}
                sessions={[]} // QuickBook will fetch from backend
                timezones={["IST", "GMT", "EST", "PST"]}
                onClose={() => setSelectedMentor(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
