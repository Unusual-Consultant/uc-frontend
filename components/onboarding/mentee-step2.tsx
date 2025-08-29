"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Target, BookOpen, Globe, User } from "lucide-react"

interface MenteeStep2Props {
  onNext: (data: any) => void
  onBack: () => void
}

const careerGoals = [
  "Crack Product Management interview",
  "Get job abroad",
  "Learn UI/UX Design",
  "Switch to Data Science",
  "Prepare for MBA",
  "Government Exams preparation",
  "Start my own startup",
  "Get promoted to senior role",
  "Learn coding/programming",
  "Career change guidance",
  "Improve leadership skills",
  "Freelancing guidance",
]

const areasOfInterest = [
  "Product Management",
  "Data Science",
  "UI/UX Design",
  "Software Engineering",
  "Digital Marketing",
  "MBA Preparation",
  "Government Exams",
  "Startup Guidance",
  "Finance & Banking",
  "Consulting",
  "Sales & Business Development",
  "HR & People Operations",
  "Content Writing",
  "Graphic Design",
]

const careerStages = [
  "Student",
  "Fresher (0-2 years)",
  "Working Professional (2-5 years)",
  "Experienced (5+ years)",
  "Career Switcher",
  "Entrepreneur",
]

export function MenteeStep2({ onNext, onBack }: MenteeStep2Props) {
  const [formData, setFormData] = useState({
    primaryGoal: "",
    interests: [] as string[],
    language: "",
    careerStage: "",
  })

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      })
    } else if (formData.interests.length < 3) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      })
    }
  }

  const handleNext = () => {
    if (formData.primaryGoal && formData.interests.length > 0 && formData.language && formData.careerStage) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Goal & Interest Capture</CardTitle>
          <CardDescription>Help us find the perfect mentor for you</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-green-600 rounded-full"></div>
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 2 of 3 • 15-20 seconds</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Primary Career Goal */}
          <div>
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Select primary career goal</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {careerGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={formData.primaryGoal === goal ? "default" : "outline"}
                  className={`text-left justify-start h-auto p-3 ${
                    formData.primaryGoal === goal ? "bg-blue-600 hover:bg-blue-700" : "bg-transparent"
                  }`}
                  onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>

          {/* Areas of Interest */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Choose areas of interest (max 3)</h3>
              <Badge variant="secondary" className="ml-2">
                {formData.interests.length}/3
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              e.g., PM, Data Science, MBA, Govt Exams, Startup Guidance, etc.
            </p>
            <div className="flex flex-wrap gap-2">
              {areasOfInterest.map((interest) => (
                <Badge
                  key={interest}
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 ${
                    formData.interests.includes(interest) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                  } ${formData.interests.length >= 3 && !formData.interests.includes(interest) ? "opacity-50" : ""}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Language and Career Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                <Label className="text-lg font-semibold">Preferred Language</Label>
              </div>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <Label className="text-lg font-semibold">Current Career Stage</Label>
              </div>
              <Select
                value={formData.careerStage}
                onValueChange={(value) => setFormData({ ...formData, careerStage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select career stage" />
                </SelectTrigger>
                <SelectContent>
                  {careerStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} className="bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                !formData.primaryGoal || formData.interests.length === 0 || !formData.language || !formData.careerStage
              }
              className="bg-green-700 hover:bg-green-800"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
