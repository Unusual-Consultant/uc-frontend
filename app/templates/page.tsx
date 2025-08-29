import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Heart } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Product Manager Resume",
    category: "Resume",
    image: "/placeholder.svg?height=300&width=200",
    downloads: 1250,
    rating: 4.9,
    price: "Free",
    description: "Professional resume template designed specifically for product managers.",
  },
  {
    id: 2,
    title: "Software Engineer Cover Letter",
    category: "Cover Letter",
    image: "/placeholder.svg?height=300&width=200",
    downloads: 890,
    rating: 4.8,
    price: "$9",
    description: "Stand out with this modern cover letter template for tech roles.",
  },
  {
    id: 3,
    title: "Project Proposal Template",
    category: "Business",
    image: "/placeholder.svg?height=300&width=200",
    downloads: 650,
    rating: 5.0,
    price: "$15",
    description: "Comprehensive project proposal template for client presentations.",
  },
  {
    id: 4,
    title: "UX Portfolio Template",
    category: "Portfolio",
    image: "/placeholder.svg?height=300&width=200",
    downloads: 420,
    rating: 4.7,
    price: "$25",
    description: "Showcase your UX work with this professional portfolio template.",
  },
]

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional Templates</h1>
        <p className="text-lg text-gray-600">Download professionally designed templates to accelerate your career</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="sm" className="bg-white/80">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute top-4 left-4">
                <Badge>{template.category}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <span>{template.downloads} downloads</span>
                <span>⭐ {template.rating}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{template.price}</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
