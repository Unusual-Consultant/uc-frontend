"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Users, Award, MessageCircle, Video, Heart, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"

interface MentorDetailClientProps {
  mentor: any
  testimonials: any[]
  reviewSummaryData: any
}

export default function MentorDetailClient({ mentor, testimonials, reviewSummaryData }: MentorDetailClientProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showBookingInterface, setShowBookingInterface] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTimezone, setSelectedTimezone] = useState("UTC")

  // Show mentor profile page with booking sidebar
  return (
    <div className="min-h-screen" style={{backgroundColor: '#DDE7F5'}}>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 gap-6 ${showBookingInterface ? 'lg:grid-cols-7' : 'lg:grid-cols-6'}`}>
          {/* Main Content Area - Takes 3 columns */}
          <div className={showBookingInterface ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Profile Header */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start space-x-8">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-56 h-56 rounded-2xl overflow-hidden border-4 border-blue-500">
                      <img 
                        src={mentor.image || "/placeholder.svg"} 
                        alt={mentor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{mentor.name}</h1>
                        <p className="text-xl text-gray-900 mb-3">{mentor.title} at {mentor.company}</p>
                        
                        {/* Location, Experience, and Rating in one line */}
                        <div className="flex items-center space-x-6 mb-4">
                          <div className="flex items-center text-gray-800">
                            <div className="w-4 h-4 bg-gray-800 rounded-full mr-2"></div>
                            <span>{mentor.location}</span>
                          </div>
                          <div className="flex items-center text-gray-800">
                            <div className="w-4 h-4 bg-gray-800 rounded-full mr-2"></div>
                            <span>{mentor.yearsExperience} yrs experience</span>
                          </div>
                          <div className="flex items-center">
                            <div className="text-gray-900 px-3 py-1 rounded-full text-sm flex items-center" style={{backgroundColor: '#E9EEF3'}}>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-semibold">{mentor.rating}</span>
                              <span className="ml-1">({mentor.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {mentor.specialties.map((specialty: string, index: number) => (
                            <span key={index} className="text-gray-900 px-3 py-1 rounded-full text-sm" style={{backgroundColor: '#E9EEF3'}}>
                              {specialty}
                            </span>
                          ))}
                        </div>

                        {/* Performance Metrics */}
                        <div className="flex items-center space-x-8">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-sm text-gray-800">Response Time</span>
                            <span className="text-sm font-medium text-gray-800 ml-1">{mentor.responseTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-800">Total mentees</span>
                            <span className="text-sm font-medium text-gray-800 ml-1">{mentor.totalMentees}</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-800">Success Rate</span>
                            <span className="text-sm font-medium text-gray-800 ml-1">{mentor.successRate}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Heart Icon */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-3"
                        onClick={() => setIsFavorited(!isFavorited)}
                      >
                        <Heart 
                          className={`h-8 w-8 ${
                            isFavorited 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-gray-400 hover:text-red-500'
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs - Inside the card */}
                <Tabs defaultValue="experience" className="w-full mt-6">
                  <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0 gap-1 border-b-2 border-blue-500">
                    <TabsTrigger value="about" className="py-2 px-4 text-sm font-medium text-gray-800 hover:text-blue-600 rounded-none data-[state=active]:text-blue-700 data-[state=active]:bg-blue-100 data-[state=active]:rounded-t-lg">About</TabsTrigger>
                    <TabsTrigger value="experience" className="py-2 px-4 text-sm font-medium text-gray-800 hover:text-blue-600 rounded-none data-[state=active]:text-blue-700 data-[state=active]:bg-blue-100 data-[state=active]:rounded-t-lg">Experience</TabsTrigger>
                    <TabsTrigger value="testimonials" className="py-2 px-4 text-sm font-medium text-gray-800 hover:text-blue-600 rounded-none data-[state=active]:text-blue-700 data-[state=active]:bg-blue-100 data-[state=active]:rounded-t-lg">Testimonials</TabsTrigger>
                    <TabsTrigger value="sessions" className="py-2 px-4 text-sm font-medium text-gray-800 hover:text-blue-600 rounded-none data-[state=active]:text-blue-700 data-[state=active]:bg-blue-100 data-[state=active]:rounded-t-lg">Sessions</TabsTrigger>
                    <TabsTrigger value="achievements" className="py-2 px-4 text-sm font-medium text-gray-800 hover:text-blue-600 rounded-none data-[state=active]:text-blue-700 data-[state=active]:bg-blue-100 data-[state=active]:rounded-t-lg">Achievements</TabsTrigger>
                  </TabsList>

                  {/* Tab Content */}
                  <div className="space-y-4 mt-4">
                    <TabsContent value="about">
                      <div className="bg-white rounded-2xl p-6 h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="space-y-4">
                          {/* About Section */}
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About {mentor.name}</h2>
                            <p className="text-gray-900 leading-relaxed">
                              Full-stack engineer turned engineering manager with <span className="text-blue-600 font-medium">10+ years</span> of experience. 
                              Expert in <span className="text-blue-600 font-medium">system design</span>, <span className="text-blue-600 font-medium">team leadership</span>, and 
                              <span className="text-blue-600 font-medium"> career transitions</span> from IC to management roles. 
                              Adept at building scalable products and driving cross-functional collaboration. 
                              Passionate about mentoring engineers and shaping high-performing, growth-oriented teams.
                            </p>
                          </div>

                          {/* Education Section */}
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">CM</span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-lg text-blue-600">MS Computer Science</h3>
                                    <p className="text-gray-800">Carnegie Mellon University</p>
                                  </div>
                                  <span className="text-gray-700 text-sm">2012-14</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="experience">
                      <Card className="h-[500px] flex flex-col">
                        <CardHeader className="flex-shrink-0">
                          <CardTitle>Work Experience</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                          <div className="h-full overflow-y-auto space-y-4 pl-2 pr-2 custom-scrollbar">
                            {mentor.experience.map((exp: any, index: number) => (
                              <div key={index} className="bg-blue-500 rounded-2xl">
                                <div className="pl-9 pr-9 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ml-1" style={{boxShadow: '0 4px 8px -1px rgba(0, 0, 0, 0.25), 0 2px 6px -1px rgba(0, 0, 0, 0.15)'}}>
                                  <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                                      <img src={exp.logo} alt={exp.company} className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-4">
                                        <div>
                                          <h3 className="font-semibold text-lg text-gray-900 mb-2">{exp.role}</h3>
                                          <p className="text-blue-600 font-medium text-sm">{exp.company}</p>
                                        </div>
                                        <span className="text-gray-700 text-sm">{exp.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-gray-900 text-sm leading-relaxed mt-4">{exp.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="testimonials">
                      <Card className="h-[500px] flex flex-col">
                        <CardHeader className="flex-shrink-0">
                          <CardTitle>Testimonials</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                          <div className="h-full overflow-y-auto space-y-4 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Left Column */}
                              <div className="space-y-6">
                                {/* Overall Rating Card with AI Review */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Overall rating</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center space-x-4 mb-6">
                                      <div className="text-4xl font-bold text-gray-900">4.8</div>
                                      <div className="flex flex-col">
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                          ))}
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1">(based on 110 reviews)</p>
                                      </div>
                                    </div>
                                    
                                    {/* Rating Distribution - Below the average */}
                                    <div className="space-y-2">
                                      {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center space-x-2">
                                          <span className="text-sm text-gray-800 w-6">{stars}</span>
                                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div 
                                              className="bg-blue-500 h-2 rounded-full" 
                                              style={{ 
                                                width: `${stars === 5 ? 86 : stars === 4 ? 21 : stars === 3 ? 3 : 0}%` 
                                              }}
                                            ></div>
                                          </div>
                                          <span className="text-sm text-gray-800 w-8">
                                            {stars === 5 ? 86 : stars === 4 ? 21 : stars === 3 ? 3 : 0}
                                          </span>
                                        </div>
                                      ))}
                                    </div>

                                    {/* AI Generated Review - Part of Overall Rating Card */}
                                    <div className="border-2 border-gradient-to-r from-pink-400 to-purple-500 rounded-lg p-4 mt-16">
                                      <div className="flex items-center space-x-2 mb-3">
                                        <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                                          <span>✨</span>
                                          <span>AI Generated review</span>
                                        </div>
                                      </div>
                                      <p className="text-gray-900 leading-relaxed">
                                        "Michael gave clear, practical guidance with real industry examples. His insights on system design and career growth were incredibly helpful."
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Right Column */}
                              <div className="space-y-6">
                                {/* Session Quality Breakdown Card with Strengths */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Session Quality Breakdown</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4 mb-6">
                                      {[
                                        { label: "Punctuality", rating: 4.7 },
                                        { label: "Communication", rating: 5.0 },
                                        { label: "Expertise", rating: 4.8 },
                                        { label: "Helpfulness", rating: 4.9 }
                                      ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between">
                                          <span className="text-gray-900 font-medium">{item.label}</span>
                                          <div className="flex items-center space-x-3">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                              <div 
                                                className="bg-blue-500 h-2 rounded-full" 
                                                style={{ width: `${(item.rating / 5) * 100}%` }}
                                              ></div>
                                            </div>
                                            <span className="text-gray-900 font-medium w-8">{item.rating}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Most Mentioned Strengths - Part of Session Quality Card */}
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Most mentioned strengths</h3>
                                      <div className="flex flex-wrap gap-2">
                                        {[
                                          { tag: "Clear Explanations", count: 45 },
                                          { tag: "Industry Expertise", count: 38 },
                                          { tag: "Practical Advice", count: 35 },
                                          { tag: "Great Communication", count: 32 },
                                          { tag: "Well prepared", count: 28 },
                                          { tag: "Problem Solver", count: 24 }
                                        ].map((strength, index) => (
                                          <div key={index} className="bg-gray-100 text-gray-900 px-3 py-2 rounded-full text-sm flex items-center space-x-2">
                                            <span>{strength.tag}</span>
                                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                              {strength.count}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>

                            {/* Individual Testimonials */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">Recent Testimonials</h3>
                              {[
                                {
                                  id: "1",
                                  name: "Priya Das",
                                  image: "/placeholder.svg?height=40&width=40",
                                  session: "Career Strategy Call",
                                  date: "2 days ago",
                                  rating: 5,
                                  review: "Excellent session! Michael provided clear guidance on my career transition from IC to management. His real-world examples made complex concepts easy to understand."
                                },
                                {
                                  id: "2", 
                                  name: "Cion Reyes",
                                  image: "/placeholder.svg?height=40&width=40",
                                  session: "System Design Review",
                                  date: "1 week ago",
                                  rating: 5,
                                  review: "Great session overall. He helped me understand system design concepts better and provided actionable feedback on my architecture approach."
                                },
                                {
                                  id: "3",
                                  name: "Shreyas",
                                  image: "/placeholder.svg?height=40&width=40",
                                  session: "Leadership Coaching",
                                  date: "2 weeks ago",
                                  rating: 4.5,
                                  review: "Excellent communication and guidance throughout the session. I appreciated how structured and thoughtful the approach was."
                                },
                                {
                                  id: "4",
                                  name: "Smith Moron", 
                                  image: "/placeholder.svg?height=40&width=40",
                                  session: "Technical Interview Prep",
                                  date: "3 weeks ago",
                                  rating: 4.5,
                                  review: "Felt heard and encouraged. The advice was actionable, and I now have a clear roadmap to follow for my technical interviews."
                                },
                                {
                                  id: "5",
                                  name: "Alex Johnson",
                                  image: "/placeholder.svg?height=40&width=40",
                                  session: "Career Strategy Call",
                                  date: "1 month ago",
                                  rating: 5,
                                  review: "Michael's insights on team leadership were invaluable. He helped me understand how to balance technical work with management responsibilities."
                                }
                              ].map((testimonial) => (
                                <div key={testimonial.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                  <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-gray-900">{testimonial.name}</span>
                                      <span className="text-gray-700">•</span>
                                      <span className="text-sm text-gray-900">{testimonial.session}</span>
                                      <span className="text-gray-700">•</span>
                                      <span className="text-sm text-gray-900">{testimonial.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 mb-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`h-4 w-4 ${
                                            i < Math.floor(testimonial.rating) 
                                              ? 'fill-yellow-400 text-yellow-400' 
                                              : 'text-gray-300'
                                          }`} 
                                        />
                                      ))}
                                      <span className="ml-1 text-sm text-gray-800">{testimonial.rating}/5</span>
                                    </div>
                                    <p className="text-gray-900 text-sm leading-relaxed">"{testimonial.review}"</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sessions">
                      <Card className="h-[500px] flex flex-col">
                        <CardHeader className="flex-shrink-0">
                          <CardTitle>Available Sessions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                          <div className="h-full overflow-y-auto space-y-3 custom-scrollbar">
                            {[
                              {
                                id: "1",
                                title: "Career Strategy Call",
                                description: "1-on-1 career guidance and strategic planning session",
                                duration: "45 mins",
                                price: "₹2500"
                              },
                              {
                                id: "2",
                                title: "Resume Review & Feedback",
                                description: "Comprehensive resume analysis with improvement suggestions",
                                duration: "30 mins",
                                price: "₹1200"
                              },
                              {
                                id: "3",
                                title: "Mock Interview Session",
                                description: "Practice interviews with detailed feedback and tips",
                                duration: "60 mins",
                                price: "₹3000"
                              },
                              {
                                id: "4",
                                title: "Quick Consultation",
                                description: "Brief consultation for specific questions",
                                duration: "60 mins",
                                price: "₹500"
                              },
                              {
                                id: "5",
                                title: "System Design Review",
                                description: "Detailed review of your system design approach and architecture",
                                duration: "90 mins",
                                price: "₹3500"
                              },
                              {
                                id: "6",
                                title: "Leadership Coaching",
                                description: "Personalized coaching for leadership and management skills",
                                duration: "60 mins",
                                price: "₹2800"
                              }
                            ].map((session) => (
                              <div key={session.id} className="mr-4 p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                                    <p className="text-sm text-gray-700 mb-3">{session.description}</p>
                                  </div>
                                  <div className="flex flex-col items-end space-y-2 ml-4">
                                    <span className="font-bold text-blue-600 text-lg">{session.price}</span>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                      Book Now
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">{session.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="achievements">
                      <Card className="h-[500px] flex flex-col">
                        <CardHeader className="flex-shrink-0">
                          <CardTitle>Achievements</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                          <div className="h-full overflow-y-auto space-y-4 custom-scrollbar">
                            {[
                              {
                                icon: "📋",
                                title: "Managed 15+ engineers successfully",
                                highlight: "15+"
                              },
                              {
                                icon: "👤",
                                title: "Built systems serving 200M+ users",
                                highlight: "200M+"
                              },
                              {
                                icon: "📊",
                                title: "Improved team velocity by 30%",
                                highlight: "30%"
                              },
                              {
                                icon: "⚙️",
                                title: "Expert in system design",
                                highlight: null
                              },
                              {
                                icon: "🏆",
                                title: "Led 50+ successful product launches",
                                highlight: "50+"
                              },
                              {
                                icon: "💡",
                                title: "Reduced infrastructure costs by 40%",
                                highlight: "40%"
                              },
                              {
                                icon: "🚀",
                                title: "Scaled team from 5 to 25 engineers",
                                highlight: "25"
                              },
                              {
                                icon: "🔧",
                                title: "Implemented microservices architecture",
                                highlight: null
                              },
                              {
                                icon: "📈",
                                title: "Achieved 99.9% uptime for 2 years",
                                highlight: "99.9%"
                              },
                              {
                                icon: "🎯",
                                title: "Mentored 100+ junior developers",
                                highlight: "100+"
                              },
                              {
                                icon: "⚡",
                                title: "Optimized API response time by 60%",
                                highlight: "60%"
                              },
                              {
                                icon: "🔒",
                                title: "Implemented enterprise security standards",
                                highlight: null
                              },
                              {
                                icon: "🌐",
                                title: "Led global team across 3 time zones",
                                highlight: "3"
                              },
                              {
                                icon: "📱",
                                title: "Launched mobile app with 1M+ downloads",
                                highlight: "1M+"
                              },
                              {
                                icon: "🤝",
                                title: "Established cross-functional collaboration",
                                highlight: null
                              }
                            ].map((achievement, index) => (
                              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                                    {achievement.icon}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-900">
                                      {achievement.highlight ? (
                                        <>
                                          {achievement.title.split(achievement.highlight)[0]}
                                          <span className="text-blue-600 font-semibold">{achievement.highlight}</span>
                                          {achievement.title.split(achievement.highlight)[1]}
                                        </>
                                      ) : (
                                        achievement.title
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Book Session Interface or Booking Card */}
          <div className={showBookingInterface ? 'lg:col-span-4' : 'lg:col-span-2'}>
            <div className="sticky top-8">
            {showBookingInterface ? (
              /* Book Session Interface - Larger Card */
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                {/* Book Session Header */}
                <div className="flex items-center space-x-3 p-4 border-b border-gray-200 bg-blue-600 rounded-t-2xl">
                  <button 
                    onClick={() => {
                      console.log('Back arrow clicked, current state:', showBookingInterface)
                      setShowBookingInterface(false)
                      console.log('Setting showBookingInterface to false')
                    }}
                    className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-white" />
                  </button>
                  <h2 className="text-xl font-semibold text-white">Book Session</h2>
                </div>

              {/* Book Session Content */}
              <div className="p-4 space-y-5">
                {/* Select meeting date */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">Select meeting date</h3>
                  <div className="relative">
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md border border-gray-200 z-10">
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-8">
                      {["Tue 16 Sept", "Wed 17 Sept", "Sat 20 Sept", "Sun 21 Sept", "Mon 22 Sept", "Mon 25 Sept"].map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`px-4 py-3 rounded-lg border-2 transition-colors flex-shrink-0 text-sm ${
                            selectedDate === date
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md border border-gray-200 z-10">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Select time of day */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">Select time of day</h3>
                  <div className="relative">
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md border border-gray-200 z-10">
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-8">
                      {["12:00 PM", "3:30 PM", "5:00 PM", "7:30 PM", "9:30 PM"].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-3 rounded-lg border-2 transition-colors flex-shrink-0 text-sm ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md border border-gray-200 z-10">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Timezone */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">Timezone</h3>
                  <div className="relative">
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="UTC">Select Timezone</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                      <option value="PST">PST (Pacific Standard Time)</option>
                      <option value="CST">CST (Central Standard Time)</option>
                      <option value="MST">MST (Mountain Standard Time)</option>
                      <option value="IST">IST (Indian Standard Time)</option>
                      <option value="GMT">GMT (Greenwich Mean Time)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Continue Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium flex items-center justify-center gap-2"
                  onClick={() => {
                    // Handle booking logic here
                    console.log('Booking:', { selectedDate, selectedTime, selectedTimezone })
                  }}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
            ) : (
              /* Original Booking Card */
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">₹{mentor.hourlyRate}</div>
                    <div className="text-gray-700">Starting from</div>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-700 hover:bg-green-800" 
                      size="lg"
                      onClick={() => {
                        console.log('Book Session clicked, current state:', showBookingInterface)
                        setShowBookingInterface(true)
                        console.log('Setting showBookingInterface to true')
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Book Session
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <Video className="mr-2 h-4 w-4" />
                      Free 15-min call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonials Cards - Individual cards */}
            <div className="space-y-4 mt-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={testimonial.menteeImage} 
                        alt={testimonial.menteeName}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{testimonial.menteeName}</span>
                          <span className="text-gray-700">•</span>
                          <span className="text-sm text-gray-900">{testimonial.session}</span>
                          <span className="text-gray-700">•</span>
                          <span className="text-sm text-gray-900">{testimonial.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.floor(testimonial.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-800">{testimonial.rating}/5</span>
                        </div>
                        <p className="text-gray-900 text-sm leading-relaxed">"{testimonial.review}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
