"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, CheckCircle, Brain, Zap } from "lucide-react"

const toolkitItems = [
  {
    id: 1,
    title: "Resume Template",
    description: "ATS-friendly resume template used by top performers",
    type: "template",
    icon: FileText,
    badge: "Free",
    downloads: 1247,
  },
  {
    id: 2,
    title: "Interview Checklist",
    description: "Complete prep checklist for PM interviews",
    type: "checklist",
    icon: CheckCircle,
    badge: "Free",
    downloads: 892,
  },
  {
    id: 3,
    title: "AI Resume Analyzer",
    description: "Get instant feedback on your resume",
    type: "ai-tool",
    icon: Brain,
    badge: "AI",
    downloads: 2156,
  },
  {
    id: 4,
    title: "Career Roadmap Generator",
    description: "Personalized path to your dream role",
    type: "ai-tool",
    icon: Zap,
    badge: "AI",
    downloads: 1634,
  },
]

export function CareerToolkit() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Career Toolkit
        </CardTitle>
        <p className="text-sm text-gray-600">Free resources to accelerate your career</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {toolkitItems.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge
                        variant={item.badge === "AI" ? "default" : "secondary"}
                        className={item.badge === "AI" ? "bg-purple-100 text-purple-700" : ""}
                      >
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.downloads.toLocaleString()} downloads</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Download className="h-4 w-4 mr-1" />
                  {item.type === "ai-tool" ? "Try" : "Download"}
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
