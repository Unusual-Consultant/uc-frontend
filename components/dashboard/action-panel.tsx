"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Target, FileText, MessageCircle } from "lucide-react"

export function ActionPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Book a Session Now</h3>
          <p className="text-sm opacity-90 mb-4">Get matched with top mentors instantly</p>
          <Button variant="secondary" size="sm" className="bg-white text-green-600 hover:bg-gray-100">
            Quick Book
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <Target className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Plan My Career Path</h3>
          <p className="text-sm opacity-90 mb-4">AI-powered career roadmap</p>
          <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Planning
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <FileText className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Get Resume Reviewed</h3>
          <p className="text-sm opacity-90 mb-4">Expert feedback in 24 hours</p>
          <Button variant="secondary" size="sm" className="bg-white text-purple-600 hover:bg-gray-100">
            Upload Resume
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <MessageCircle className="h-8 w-8 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Ask AI Mentor</h3>
          <p className="text-sm opacity-90 mb-4">Get instant career advice</p>
          <Button variant="secondary" size="sm" className="bg-white text-orange-600 hover:bg-gray-100">
            Chat Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
