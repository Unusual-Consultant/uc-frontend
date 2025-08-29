"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, MessageCircle, Video, FileText, Clock, DollarSign, Calendar, Users } from "lucide-react"

interface MenteeStep3Props {
  onNext: (data: any) => void
  onBack: () => void
}

const sessionModes = [
  { id: "chat", label: "Chat Session", icon: MessageCircle, description: "Text-based mentoring" },
  { id: "video", label: "Video Call", icon: Video, description: "Face-to-face mentoring" },
  { id: "resume", label: "Resume Review", icon: FileText, description: "Get feedback on your resume" },
  { id: "mock", label: "Mock Interview", icon: Clock, description: "Practice interviews" },
]

const timeSlots = [
  "Morning (6 AM - 12 PM)",
  "Afternoon (12 PM - 6 PM)",
  "Evening (6 PM - 10 PM)",
  "Late Night (10 PM - 12 AM)",
  "Weekends",
  "Flexible",
]

const sessionTypes = [
  { id: "individual", label: "Individual Sessions", description: "One-on-one mentoring" },
  { id: "group", label: "Group Sessions", description: "Learn with peers" },
]

const budgetRanges = [
  { id: "free", label: "Free Sessions", range: "₹0", description: "In collaboration with mentors" },
  { id: "budget", label: "Budget Friendly", range: "₹199 - ₹499", description: "Experienced professionals" },
  { id: "premium", label: "Premium", range: "₹500+", description: "Industry experts" },
]

export function MenteeStep3({ onNext, onBack }: MenteeStep3Props) {
  const [formData, setFormData] = useState({
    preferredModes: [] as string[],
    timeSlots: [] as string[],
    sessionTypes: [] as string[],
    budget: "",
  })

  const toggleMode = (mode: string) => {
    if (formData.preferredModes.includes(mode)) {
      setFormData({
        ...formData,
        preferredModes: formData.preferredModes.filter((m) => m !== mode),
      })
    } else {
      setFormData({
        ...formData,
        preferredModes: [...formData.preferredModes, mode],
      })
    }
  }

  const toggleTimeSlot = (slot: string) => {
    if (formData.timeSlots.includes(slot)) {
      setFormData({
        ...formData,
        timeSlots: formData.timeSlots.filter((s) => s !== slot),
      })
    } else {
      setFormData({
        ...formData,
        timeSlots: [...formData.timeSlots, slot],
      })
    }
  }

  const toggleSessionType = (type: string) => {
    if (formData.sessionTypes.includes(type)) {
      setFormData({
        ...formData,
        sessionTypes: formData.sessionTypes.filter((t) => t !== type),
      })
    } else {
      setFormData({
        ...formData,
        sessionTypes: [...formData.sessionTypes, type],
      })
    }
  }

  const handleFinish = () => {
    if (formData.preferredModes.length > 0 && formData.budget && formData.sessionTypes.length > 0) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Personalization & Matching</CardTitle>
          <CardDescription>Final step to find your perfect mentor match</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-green-600 rounded-full"></div>
              <div className="w-8 h-2 bg-green-600 rounded-full"></div>
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 3 of 3 • 5-15 seconds</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Preferred Session Modes */}
          <div>
            <div className="flex items-center mb-4">
              <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Preferred Mode</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Chat / Video / Resume Review / Mock</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionModes.map((mode) => {
                const IconComponent = mode.icon
                return (
                  <Card
                    key={mode.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.preferredModes.includes(mode.id) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => toggleMode(mode.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{mode.label}</h4>
                          <p className="text-sm text-gray-600">{mode.description}</p>
                        </div>
                        <Checkbox checked={formData.preferredModes.includes(mode.id)} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Session Type: Individual vs Group */}
          <div>
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Session Type</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Individual / Group</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.sessionTypes.includes(type.id) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                  onClick={() => toggleSessionType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      <Checkbox checked={formData.sessionTypes.includes(type.id)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Time Slots */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Available Time Slots (Optional)</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Quick multi-select, optional</p>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <Badge
                  key={slot}
                  variant={formData.timeSlots.includes(slot) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 ${
                    formData.timeSlots.includes(slot) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleTimeSlot(slot)}
                >
                  {slot}
                </Badge>
              ))}
            </div>
          </div>

          {/* Budget Preference */}
          <div>
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Budget Preference</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Free (In collaboration) / ₹199–₹499 / ₹500+</p>
            <div className="grid grid-cols-1 gap-3">
              {budgetRanges.map((budget) => (
                <Card
                  key={budget.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.budget === budget.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, budget: budget.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{budget.label}</h4>
                        <p className="text-sm text-gray-600">{budget.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{budget.range}</div>
                        <Checkbox checked={formData.budget === budget.id} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} className="bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleFinish}
              disabled={formData.preferredModes.length === 0 || !formData.budget || formData.sessionTypes.length === 0}
              className="bg-green-700 hover:bg-green-800"
            >
              Find My Mentors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
