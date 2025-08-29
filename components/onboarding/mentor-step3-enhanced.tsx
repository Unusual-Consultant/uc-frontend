"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, FileText, Video, MessageCircle, GraduationCap, Users, Globe, Clock } from "lucide-react"

interface MentorStep3Props {
  onNext: (data: any) => void
  onBack: () => void
}

const mentorshipOfferings = [
  { id: "resume", label: "Resume Review", icon: FileText, description: "Review and provide feedback on resumes" },
  {
    id: "career",
    label: "Career Strategy Call",
    icon: MessageCircle,
    description: "Discuss career planning and goals",
  },
  { id: "interview", label: "Interview Prep", icon: Video, description: "Mock interviews and preparation" },
  { id: "mba", label: "MBA / MS Admissions", icon: GraduationCap, description: "Guide through applications" },
  { id: "domain", label: "Domain-Specific Advice", icon: Users, description: "UX, Product, Data, etc." },
]

const languages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Japanese",
  "Korean",
  "Portuguese",
  "Italian",
]

const timeZones = [
  "IST (India)",
  "PST (US West)",
  "EST (US East)",
  "GMT (UK)",
  "CET (Europe)",
  "JST (Japan)",
  "AEST (Australia)",
]

export function MentorStep3Enhanced({ onNext, onBack }: MentorStep3Props) {
  const [formData, setFormData] = useState({
    offerings: [] as string[],
    languages: [] as string[],
    timeZones: [] as string[],
    sessionPrice: "",
    customOffering: "",
  })

  const toggleOffering = (offering: string) => {
    if (formData.offerings.includes(offering)) {
      setFormData({
        ...formData,
        offerings: formData.offerings.filter((o) => o !== offering),
      })
    } else {
      setFormData({
        ...formData,
        offerings: [...formData.offerings, offering],
      })
    }
  }

  const toggleLanguage = (language: string) => {
    if (formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: formData.languages.filter((l) => l !== language),
      })
    } else {
      setFormData({
        ...formData,
        languages: [...formData.languages, language],
      })
    }
  }

  const toggleTimeZone = (timeZone: string) => {
    if (formData.timeZones.includes(timeZone)) {
      setFormData({
        ...formData,
        timeZones: formData.timeZones.filter((tz) => tz !== timeZone),
      })
    } else {
      setFormData({
        ...formData,
        timeZones: [...formData.timeZones, timeZone],
      })
    }
  }

  const handleNext = () => {
    if (
      formData.offerings.length > 0 &&
      formData.languages.length > 0 &&
      formData.timeZones.length > 0 &&
      formData.sessionPrice
    ) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Mentorship Offerings</CardTitle>
          <CardDescription>Define what you can help mentees with</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 3 of 5 • 25-30 seconds</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* What can you help with */}
          <div>
            <h3 className="text-lg font-semibold mb-4">What can you help with? (Multi-select)</h3>
            <div className="grid grid-cols-1 gap-3">
              {mentorshipOfferings.map((offering) => {
                const IconComponent = offering.icon
                return (
                  <Card
                    key={offering.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.offerings.includes(offering.id) ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => toggleOffering(offering.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium">{offering.label}</h4>
                          <p className="text-sm text-gray-600">{offering.description}</p>
                        </div>
                        <Checkbox checked={formData.offerings.includes(offering.id)} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Custom offering */}
            <div className="mt-4">
              <Label htmlFor="customOffering">Other (specify)</Label>
              <Input
                id="customOffering"
                value={formData.customOffering}
                onChange={(e) => setFormData({ ...formData, customOffering: e.target.value })}
                placeholder="e.g., Startup pitch review, Technical architecture guidance"
              />
            </div>
          </div>

          {/* Languages and Time Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Languages you speak</h3>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.languages.includes(language)}
                      onCheckedChange={() => toggleLanguage(language)}
                    />
                    <Label className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Time Zones you support</h3>
              </div>
              <div className="space-y-2">
                {timeZones.map((timeZone) => (
                  <div key={timeZone} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.timeZones.includes(timeZone)}
                      onCheckedChange={() => toggleTimeZone(timeZone)}
                    />
                    <Label className="text-sm">{timeZone}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Session Price */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Set Session Price(s)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sessionPrice">Price per session</Label>
                <Input
                  id="sessionPrice"
                  value={formData.sessionPrice}
                  onChange={(e) => setFormData({ ...formData, sessionPrice: e.target.value })}
                  placeholder="e.g., ₹1500 for 45 mins"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Pricing Guidelines:</p>
                <p className="text-xs text-blue-700">₹500-1500: Entry level</p>
                <p className="text-xs text-blue-700">₹1500-3000: Experienced</p>
                <p className="text-xs text-blue-700">₹3000+: Expert level</p>
              </div>
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
                formData.offerings.length === 0 ||
                formData.languages.length === 0 ||
                formData.timeZones.length === 0 ||
                !formData.sessionPrice
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
