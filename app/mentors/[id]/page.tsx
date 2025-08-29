import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Users, Award, MessageCircle, Video } from "lucide-react"
import { ReviewSummary } from "@/components/reviews/review-summary"
import { ReviewDisplay } from "@/components/reviews/review-display"

export default function MentorDetailPage({ params }: { params: { id: string } }) {
  // Mock mentor data - in real app would fetch based on params.id
  const mentor = {
    id: params.id,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    hourlyRate: 150,
    responseTime: "Within 2 hours",
    totalMentees: 89,
    yearsExperience: 8,
    specialties: ["Product Strategy", "User Research", "Team Leadership", "Agile Development"],
    bio: "I'm a Senior Product Manager at Google with over 8 years of experience in building and scaling digital products. I've led cross-functional teams to launch products used by millions of users worldwide.",
    experience: [
      {
        company: "Google",
        role: "Senior Product Manager",
        duration: "2020 - Present",
        description:
          "Leading product strategy for Google Search features, managing a team of 12 engineers and designers.",
      },
      {
        company: "Facebook",
        role: "Product Manager",
        duration: "2018 - 2020",
        description: "Launched 3 major features for Facebook Marketplace, increasing user engagement by 40%.",
      },
    ],
  }

  // Mock review data
  const reviewSummaryData = {
    averageRating: 4.9,
    totalReviews: 127,
    ratingDistribution: {
      5: 98,
      4: 22,
      3: 5,
      2: 2,
      1: 0,
    },
    topTags: [
      { tag: "Clear Explanations", count: 45 },
      { tag: "Industry Expertise", count: 38 },
      { tag: "Practical Advice", count: 35 },
      { tag: "Great Communication", count: 32 },
      { tag: "Well Prepared", count: 28 },
      { tag: "Problem Solver", count: 24 },
    ],
    sessionSpecificAverages: {
      punctuality: 4.9,
      communication: 4.8,
      expertise: 5.0,
      helpfulness: 4.7,
    },
  }

  const mockReviews = [
    {
      id: "1",
      menteeId: "mentee1",
      menteeName: "Arjun Patel",
      rating: 5,
      review:
        "Absolutely fantastic session! Sarah provided incredibly detailed feedback on my product management approach and helped me understand the nuances of working at a large tech company. Her insights into Google's product development process were invaluable.",
      tags: ["Clear Explanations", "Industry Expertise", "Practical Advice", "Great Communication"],
      sessionType: "Career Strategy Call",
      date: "2 days ago",
      verified: true,
      helpful: 12,
      sessionSpecific: {
        punctuality: 5,
        communication: 5,
        expertise: 5,
        helpfulness: 5,
      },
      mentorResponse: {
        response:
          "Thank you so much for the kind words, Arjun! I'm thrilled to hear that our session was helpful. Best of luck with your interviews - you're going to do great!",
        date: "1 day ago",
      },
    },
    {
      id: "2",
      menteeId: "mentee2",
      menteeName: "Priya Sharma",
      rating: 5,
      review:
        "Sarah's guidance was exactly what I needed for my PM interview prep. She provided specific frameworks and real examples from her experience at Google. Highly recommend!",
      tags: ["Industry Expertise", "Well Prepared", "Problem Solver"],
      sessionType: "Mock Interview",
      date: "1 week ago",
      verified: true,
      helpful: 8,
      sessionSpecific: {
        punctuality: 5,
        communication: 4,
        expertise: 5,
        helpfulness: 5,
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <img src={mentor.image || "/placeholder.svg"} alt={mentor.name} className="w-32 h-32 rounded-full" />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{mentor.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">
                    {mentor.title} at {mentor.company}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {mentor.responseTime}
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-gray-500 ml-1">({mentor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-1" />
                      <span>{mentor.totalMentees} mentees</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-gray-400 mr-1" />
                      <span>{mentor.yearsExperience} years exp.</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Content */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About {mentor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{mentor.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{exp.role}</h3>
                            <p className="text-blue-600">{exp.company}</p>
                          </div>
                          <span className="text-gray-500 text-sm">{exp.duration}</span>
                        </div>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <ReviewSummary {...reviewSummaryData} />
              <ReviewDisplay reviews={mockReviews} hasMore={true} />
            </TabsContent>

            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Available Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Career Strategy Call</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        45-minute session focused on career planning and goal setting
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-green-600">₹1500</span>
                        <Button size="sm" className="bg-green-700 hover:bg-green-800">
                          Book Now
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Resume Review</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        30-minute detailed review of your resume with actionable feedback
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-green-600">₹800</span>
                        <Button size="sm" className="bg-green-700 hover:bg-green-800">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-3xl font-bold text-green-600">₹{mentor.hourlyRate}</span>
                <span className="text-gray-500">/hour</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-green-700 hover:bg-green-800" size="lg">
                <MessageCircle className="mr-2 h-4 w-4" />
                Book Session
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Video className="mr-2 h-4 w-4" />
                Free 15-min Call
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">{mentor.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Mentees</span>
                <span className="font-medium">{mentor.totalMentees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{mentor.yearsExperience} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{mentor.rating}/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
