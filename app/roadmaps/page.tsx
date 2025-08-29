import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, CheckCircle, ArrowRight } from "lucide-react"

const roadmaps = [
  {
    id: 1,
    title: "Product Manager Career Path",
    description: "Complete roadmap from junior to senior product manager",
    duration: "6-12 months",
    difficulty: "Intermediate",
    students: 1250,
    progress: 0,
    steps: 8,
    image: "/placeholder.svg?height=200&width=300",
    skills: ["Strategy", "Analytics", "Leadership", "User Research"],
  },
  {
    id: 2,
    title: "Full-Stack Developer Journey",
    description: "Master frontend and backend development",
    duration: "8-16 months",
    difficulty: "Beginner to Advanced",
    students: 890,
    progress: 25,
    steps: 12,
    image: "/placeholder.svg?height=200&width=300",
    skills: ["React", "Node.js", "Databases", "DevOps"],
  },
  {
    id: 3,
    title: "UX Designer Pathway",
    description: "From design basics to advanced UX principles",
    duration: "4-8 months",
    difficulty: "Beginner",
    students: 650,
    progress: 60,
    steps: 6,
    image: "/placeholder.svg?height=200&width=300",
    skills: ["Design Thinking", "Prototyping", "User Testing", "Figma"],
  },
]

export default function RoadmapsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Roadmaps</h1>
        <p className="text-lg text-gray-600">Follow structured learning paths designed by industry experts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={roadmap.image || "/placeholder.svg"}
                alt={roadmap.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={roadmap.difficulty === "Beginner" ? "secondary" : "default"}>
                  {roadmap.difficulty}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{roadmap.title}</CardTitle>
              <CardDescription>{roadmap.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{roadmap.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{roadmap.students} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>{roadmap.steps} steps</span>
                  </div>
                </div>

                {roadmap.progress > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{roadmap.progress}%</span>
                    </div>
                    <Progress value={roadmap.progress} className="h-2" />
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {roadmap.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full">
                  {roadmap.progress > 0 ? "Continue Learning" : "Start Roadmap"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
