import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Clock, MessageCircle, Video, Calendar } from "lucide-react"
import Link from "next/link"

const suggestedMentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    expertise: ["Product Management", "Strategy", "Leadership"],
    price: "₹1500",
    duration: "45 mins",
    matchScore: 95,
    bio: "Helped 50+ professionals transition to PM roles at top tech companies",
    nextAvailable: "Today 4:00 PM",
    languages: ["English", "Hindi"],
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Ex-Amazon PM",
    company: "Freelance Career Coach",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviews: 89,
    location: "Seattle, WA",
    expertise: ["Interview Prep", "Resume Review", "Career Strategy"],
    price: "₹1200",
    duration: "30 mins",
    matchScore: 92,
    bio: "Specialized in helping professionals crack FAANG interviews",
    nextAvailable: "Tomorrow 10:00 AM",
    languages: ["English"],
  },
  {
    id: 3,
    name: "Priya Sharma",
    title: "Product Lead",
    company: "Flipkart",
    image: "/placeholder.svg?height=120&width=120",
    rating: 5.0,
    reviews: 156,
    location: "Bangalore, India",
    expertise: ["Product Management", "Indian Market", "E-commerce"],
    price: "₹800",
    duration: "45 mins",
    matchScore: 88,
    bio: "Expert in Indian product ecosystem and startup growth strategies",
    nextAvailable: "Today 7:00 PM",
    languages: ["English", "Hindi", "Kannada"],
  },
]

export default function SuggestedMentorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Perfect Mentor Matches</h1>
            <p className="text-lg text-gray-600">
              Based on your goals and preferences, here are the best mentors for you
            </p>
          </div>

          {/* Mentors List */}
          <div className="space-y-6">
            {suggestedMentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative">
                          <img
                            src={mentor.image || "/placeholder.svg"}
                            alt={mentor.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                          />
                          <div className="absolute -top-1 -right-1">
                            <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                              {mentor.matchScore}% Match
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-gray-900">{mentor.name}</h3>
                          <p className="text-gray-600">{mentor.title}</p>
                          <p className="text-blue-600 font-medium">{mentor.company}</p>

                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{mentor.rating}</span>
                              <span>({mentor.reviews})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{mentor.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{mentor.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Next: {mentor.nextAvailable}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Languages: {mentor.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing & Actions */}
                    <div className="lg:w-80 flex flex-col justify-between">
                      <div className="text-center lg:text-right mb-4">
                        <div className="text-3xl font-bold text-green-600">{mentor.price}</div>
                        <div className="text-gray-500">for {mentor.duration}</div>
                        <div className="text-sm text-green-600 mt-1">✓ Available {mentor.nextAvailable}</div>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full bg-green-700 hover:bg-green-800" size="lg">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Session
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <MessageCircle className="mr-1 h-3 w-3" />
                            Chat
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Video className="mr-1 h-3 w-3" />
                            Video Call
                          </Button>
                        </div>
                        <Button variant="link" asChild className="w-full">
                          <Link href={`/mentors/${mentor.id}`}>View Full Profile</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="text-center mt-8 space-y-4">
            <p className="text-gray-600">Not finding the right match?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/mentors">Browse All Mentors</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/onboarding/mentee?step=2">Update Preferences</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
