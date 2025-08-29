"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, FileText, Video, MessageCircle, Clock, DollarSign, Calendar } from "lucide-react"

interface MentorStep3Props {
  onNext: (data: any) => void
  onBack: () => void
}

const sessionTypes = [
  { id: "resume", label: "Resume Review", icon: FileText, description: "Review and provide feedback on resumes" },
  { id: "mock", label: "Mock Interview", icon: Video, description: "Conduct practice interviews" },
  {
    id: "strategy",
    label: "Career Strategy Call",
    icon: MessageCircle,
    description: "Discuss career planning and goals",
  },
  {
    id: "college",
    label: "College Application Help",
    icon: FileText,
    description: "Guide through college applications",
  },
  { id: "ama", label: "AMA (Ask Me Anything)", icon: MessageCircle, description: "Open Q&A sessions" },
]

const durations = ["20 mins", "30 mins", "45 mins", "60 mins"]

const timeSlots = [
  "Monday Morning",
  "Monday Evening",
  "Tuesday Morning",
  "Tuesday Evening",
  "Wednesday Morning",
  "Wednesday Evening",
  "Thursday Morning",
  "Thursday Evening",
  "Friday Morning",
  "Friday Evening",
  "Weekend",
]

export function MentorStep3({ onNext, onBack }: MentorStep3Props) {
  const [formData, setFormData] = useState({
    sessionTypes: [] as string[],
    durations: [] as string[],
    pricePerSession: "",
    availability: [] as string[],
  })

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

  const toggleDuration = (duration: string) => {
    if (formData.durations.includes(duration)) {
      setFormData({
        ...formData,
        durations: formData.durations.filter((d) => d !== duration),
      })
    } else {
      setFormData({
        ...formData,
        durations: [...formData.durations, duration],
      })
    }
  }

  const toggleAvailability = (slot: string) => {
    if (formData.availability.includes(slot)) {
      setFormData({
        ...formData,
        availability: formData.availability.filter((a) => a !== slot),
      })
    } else {
      setFormData({
        ...formData,
        availability: [...formData.availability, slot],
      })
    }
  }

  const handleFinish = () => {
    if (
      formData.sessionTypes.length > 0 &&
      formData.durations.length > 0 &&
      formData.pricePerSession &&
      formData.availability.length > 0
    ) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Setup Your Offerings</CardTitle>
          <CardDescription>Define your mentoring services and availability</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-green-600 rounded-full"></div>
              <div className="w-8 h-2 bg-green-600 rounded-full"></div>
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Session Types */}
          <div>
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Types of Sessions Offered</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {sessionTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.sessionTypes.includes(type.id) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => toggleSessionType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium">{type.label}</h4>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                        <Checkbox checked={formData.sessionTypes.includes(type.id)} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Session Duration and Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Session Duration(s)</h3>
              </div>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <div key={duration} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.durations.includes(duration)}
                      onCheckedChange={() => toggleDuration(duration)}
                    />
                    <Label>{duration}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Price per Session</h3>
              </div>
              <Input
                value={formData.pricePerSession}
                onChange={(e) => setFormData({ ...formData, pricePerSession: e.target.value })}
                placeholder="e.g., ₹1500"
              />
              <p className="text-sm text-gray-600 mt-1">Suggested range: ₹500 - ₹3000</p>
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Availability</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <div key={slot} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.availability.includes(slot)}
                    onCheckedChange={() => toggleAvailability(slot)}
                  />
                  <Label className="text-sm">{slot}</Label>
                </div>
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
              disabled={
                formData.sessionTypes.length === 0 ||
                formData.durations.length === 0 ||
                !formData.pricePerSession ||
                formData.availability.length === 0
              }
              className="bg-green-700 hover:bg-green-800"
            >
              Complete Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
