import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Users, MessageCircle, Star, TrendingUp } from "lucide-react"

const resources = [
  {
    title: "Mentoring Best Practices",
    description: "Learn effective mentoring techniques and communication strategies",
    icon: BookOpen,
    type: "Guide",
  },
  {
    title: "Setting Up Your Profile",
    description: "Tips to create an attractive and professional mentor profile",
    icon: Star,
    type: "Tutorial",
  },
  {
    title: "Conducting Video Sessions",
    description: "Technical setup and best practices for video mentoring calls",
    icon: Video,
    type: "Guide",
  },
  {
    title: "Building Your Reputation",
    description: "How to get great reviews and build a strong mentor reputation",
    icon: TrendingUp,
    type: "Strategy",
  },
  {
    title: "Community Guidelines",
    description: "Platform rules and guidelines for mentors",
    icon: Users,
    type: "Policy",
  },
  {
    title: "Getting Your First Mentee",
    description: "Strategies to attract and connect with your first mentees",
    icon: MessageCircle,
    type: "Guide",
  },
]

export default function MentorResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mentor Resources</h1>
        <p className="text-lg text-gray-600">Everything you need to become a successful mentor on our platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const IconComponent = resource.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{resource.type}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{resource.description}</CardDescription>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Need Help?</h2>
            <p className="text-blue-800 mb-6">Our mentor success team is here to help you succeed on the platform</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
