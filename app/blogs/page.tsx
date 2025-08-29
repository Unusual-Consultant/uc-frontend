import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Skills Every Product Manager Should Master",
    excerpt: "Discover the key competencies that separate great product managers from the rest...",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Product Management",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Future of Remote Work: Trends and Predictions",
    excerpt: "How remote work is evolving and what it means for your career...",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "7 min read",
    category: "Career",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Building Your First Design System",
    excerpt: "A comprehensive guide to creating scalable design systems...",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "10 min read",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Data Science Career Transition: A Complete Guide",
    excerpt: "Everything you need to know about breaking into data science...",
    author: "David Kim",
    date: "March 8, 2024",
    readTime: "8 min read",
    category: "Data Science",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Industry Insights & Career Tips</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest trends and expert advice from our community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge>{post.category}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                <Link href={`/blogs/${post.id}`}>{post.title}</Link>
              </CardTitle>
              <CardDescription className="text-base">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Link
                href={`/blogs/${post.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
