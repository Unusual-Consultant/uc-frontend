import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Play } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Complete Product Management Bootcamp",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=300",
    duration: "12 weeks",
    students: 1250,
    rating: 4.9,
    price: 299,
    level: "Beginner to Advanced",
    description: "Master product management from strategy to execution with real-world projects.",
  },
  {
    id: 2,
    title: "Full-Stack Web Development",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=200&width=300",
    duration: "16 weeks",
    students: 890,
    rating: 4.8,
    price: 399,
    level: "Intermediate",
    description: "Build modern web applications with React, Node.js, and cloud deployment.",
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    instructor: "Emily Rodriguez",
    image: "/placeholder.svg?height=200&width=300",
    duration: "8 weeks",
    students: 650,
    rating: 5.0,
    price: 249,
    level: "Beginner",
    description: "Learn user experience design principles and create stunning user interfaces.",
  },
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional Courses</h1>
        <p className="text-lg text-gray-600">
          Learn from industry experts with hands-on projects and real-world applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-white text-gray-900">{course.level}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription>by {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Enroll Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
