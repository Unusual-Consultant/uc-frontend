"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Users, Clock, Heart, Verified, MessageCircle, Calendar, Eye, Award } from "lucide-react"
import Link from "next/link"

const mentors = [
  {
    id: 1,
    name: "Michael Chen",
    title: "Engineering Manager",
    company: "Meta",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviews: 110,
    location: "Seattle, WA",
    expertise: ["Engineering Management", "System Design", "Node.js"],
    price: 120,
    mentees: 32,
    experience: "10+ years",
    bio: "I'm an Engineering Manager at Meta with over 10 years of experience in building scalable systems and leading engineering teams.",
    availability: "Available this week",
    verified: true,
    recentlyActive: true,
    languages: ["English", "Chinese"],
    responseTime: "< 4 hours",
    successRate: 95,
    badge: "Top Mentor",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Software Engineer",
    company: "Meta",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviews: 89,
    location: "Seattle, WA",
    expertise: ["React", "Node.js", "System Design", "Architecture", "TypeScript"],
    price: 120,
    mentees: 32,
    experience: "6+ years",
    bio: "Full-stack engineer with expertise in building scalable web applications and mentoring junior developers.",
    availability: "Available next week",
    verified: true,
    recentlyActive: false,
    languages: ["English", "Chinese"],
    responseTime: "< 4 hours",
    successRate: 95,
    badge: "Expert",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Apple",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviews: 156,
    location: "Cupertino, CA",
    expertise: ["UX Design", "Design Systems", "User Research", "Prototyping"],
    price: 180,
    mentees: 67,
    experience: "10+ years",
    bio: "Design leader passionate about creating intuitive user experiences and mentoring the next generation of designers.",
    availability: "Available today",
    verified: true,
    recentlyActive: true,
    languages: ["English", "Spanish"],
    responseTime: "< 1 hour",
    successRate: 99,
    badge: "Top Rated",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Science Manager",
    company: "Netflix",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.7,
    reviews: 73,
    location: "Los Angeles, CA",
    expertise: ["Data Science", "Machine Learning", "Python", "Analytics"],
    price: 140,
    mentees: 28,
    experience: "7+ years",
    bio: "Data science expert helping professionals transition into ML and advance their analytical careers.",
    availability: "Available this week",
    verified: false,
    recentlyActive: true,
    languages: ["English", "Korean"],
    responseTime: "< 6 hours",
    successRate: 92,
    badge: "Rising Star",
  },
  {
    id: 5,
    name: "Lisa Wang",
    title: "Marketing Director",
    company: "Spotify",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviews: 94,
    location: "New York, NY",
    expertise: ["Digital Marketing", "Growth", "Analytics", "Strategy"],
    price: 130,
    mentees: 41,
    experience: "9+ years",
    bio: "Marketing leader with expertise in growth strategies and digital transformation.",
    availability: "Available next week",
    verified: true,
    recentlyActive: false,
    languages: ["English", "Chinese"],
    responseTime: "< 3 hours",
    successRate: 96,
    badge: "Expert",
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Engineering Manager",
    company: "Uber",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviews: 112,
    location: "Austin, TX",
    expertise: ["Engineering Leadership", "Team Management", "Architecture", "Scaling"],
    price: 160,
    mentees: 53,
    experience: "12+ years",
    bio: "Engineering leader focused on building high-performing teams and scalable systems.",
    availability: "Available this week",
    verified: true,
    recentlyActive: true,
    languages: ["English"],
    responseTime: "< 2 hours",
    successRate: 97,
    badge: "Top Mentor",
  },
  {
    id: 7,
    name: "Anna Martinez",
    title: "VP of Engineering",
    company: "Slack",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviews: 203,
    location: "San Francisco, CA",
    expertise: ["Leadership", "Engineering Management", "Strategy", "Culture"],
    price: 200,
    mentees: 78,
    experience: "15+ years",
    bio: "Executive leader with deep experience in scaling engineering organizations and building culture.",
    availability: "Available today",
    verified: true,
    recentlyActive: true,
    languages: ["English", "Spanish"],
    responseTime: "< 1 hour",
    successRate: 99,
    badge: "Executive",
  },
  {
    id: 8,
    name: "Robert Taylor",
    title: "Principal Designer",
    company: "Figma",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviews: 145,
    location: "San Francisco, CA",
    expertise: ["Product Design", "Design Systems", "Leadership", "Strategy"],
    price: 170,
    mentees: 62,
    experience: "11+ years",
    bio: "Principal designer with expertise in design systems and product strategy at scale.",
    availability: "Available this week",
    verified: true,
    recentlyActive: true,
    languages: ["English"],
    responseTime: "< 2 hours",
    successRate: 98,
    badge: "Top Rated",
  },
  {
    id: 9,
    name: "Jennifer Lee",
    title: "Head of Growth",
    company: "Notion",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviews: 167,
    location: "San Francisco, CA",
    expertise: ["Growth Marketing", "Product Marketing", "Analytics", "Strategy"],
    price: 185,
    mentees: 71,
    experience: "13+ years",
    bio: "Growth expert with proven track record of scaling products from startup to enterprise.",
    availability: "Available next week",
    verified: true,
    recentlyActive: false,
    languages: ["English", "Korean"],
    responseTime: "< 3 hours",
    successRate: 97,
    badge: "Growth Expert",
  },
]

interface MentorGridProps {
  searchQuery?: string
}

export function MentorGrid({ searchQuery }: MentorGridProps) {
  const [hoveredMentor, setHoveredMentor] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (mentorId: number) => {
    setFavorites((prev) => (prev.includes(mentorId) ? prev.filter((id) => id !== mentorId) : [...prev, mentorId]))
  }

  // Filter mentors based on search query
  const filteredMentors = searchQuery
    ? mentors.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : mentors

  if (filteredMentors.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any mentors matching your criteria. Try adjusting your filters or search terms.
          </p>
          <div className="space-y-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Clear Filters
            </Button>
            <p className="text-sm text-gray-500">
              Or{" "}
              <Link href="/mentors" className="text-blue-600 hover:underline">
                browse all mentors
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""} found
            {searchQuery && (
              <span className="ml-2 text-sm">
                for "<span className="font-medium">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Card
            key={mentor.id}
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-[1.02]"
            onMouseEnter={() => setHoveredMentor(mentor.id)}
            onMouseLeave={() => setHoveredMentor(null)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header with Image and Basic Info */}
                <div className="flex items-start space-x-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback className="text-lg">
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {mentor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Verified className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{mentor.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{mentor.title}</p>
                        <p className="text-sm font-medium text-blue-600 truncate">{mentor.company}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(mentor.id)
                        }}
                        className="p-1"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(mentor.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </div>

                    {/* Rating and Quick Stats */}
                    <div className="flex items-center space-x-3 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span>({mentor.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{mentor.mentees}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location and Experience */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{mentor.experience}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {mentor.bio}
                  </p>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <div className="font-bold text-xl text-gray-900">₹{mentor.price}/hr</div>
                    <div className="text-xs text-gray-500">{mentor.availability}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link href={`/mentors/${mentor.id}`}>
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 pt-8">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button key={page} variant={page === 1 ? "default" : "outline"} size="sm" className="w-10">
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
