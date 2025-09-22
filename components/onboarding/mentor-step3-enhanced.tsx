"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calendar, Video, DollarSign, X, FileText, Users, MessageCircle, Briefcase, Target, Lightbulb, GraduationCap, Plus, Globe, Clock } from "lucide-react"

interface MentorStep3Props {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

const mentorshipOfferings = [
  { id: "resume_review", label: "Resume Review", icon: FileText, description: "Review and provide feedback on resumes" },
  {
    id: "career_strategy",
    label: "Career Strategy Call",
    icon: MessageCircle,
    description: "Discuss career planning and goals",
  },
  { id: "interview_prep", label: "Interview Preparation", icon: Video, description: "Mock interviews and preparation" },
  { id: "mba_admissions", label: "MBA/MS Admissions", icon: GraduationCap, description: "Guide through applications" },
  { id: "domain_advice", label: "Domain-specific Advice", icon: Users, description: "UX, Product, Data, etc." },
]

const languages = [
  "English",
  "Hindi",
  "German",
  "Spanish",
  "French",
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

const sessionTypes = [
  "Resume Review",
  "Career Strategy Call",
  "Interview Preparation",
  "MBA/MS Admissions",
  "Domain-specific Advice"
]

const durations = [
  "30 minutes",
  "45 minutes", 
  "60 minutes",
  "90 minutes"
]

export function MentorStep3Enhanced({ onNext, onBack, initialData }: MentorStep3Props) {
  const [formData, setFormData] = useState({
    offerings: initialData?.offerings || [] as string[],
    languages: initialData?.languages || [] as string[],
    timeZones: initialData?.time_zones || [] as string[],
    sessionType: initialData?.session_pricing?.[0]?.session_type || "",
    sessionDuration: initialData?.session_pricing?.[0]?.duration || "",
    sessionPrice: initialData?.session_pricing?.[0]?.price?.toString() || "",
    customOffering: initialData?.custom_offering || "",
  })

  const [isLoading, setIsLoading] = useState(false)

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

  const handleNext = async () => {
    console.log("Form data:", formData)
    console.log("Validation check:")
    console.log("- Offerings:", formData.offerings.length)
    console.log("- Languages:", formData.languages.length)
    console.log("- TimeZones:", formData.timeZones.length)
    console.log("- Session Type:", formData.sessionType)
    console.log("- Session Duration:", formData.sessionDuration)
    console.log("- Session Price:", formData.sessionPrice)
    
    if (
      formData.offerings.length === 0 ||
      formData.languages.length === 0 ||
      formData.timeZones.length === 0 ||
      !formData.sessionType ||
      !formData.sessionDuration ||
      !formData.sessionPrice
    ) {
      alert("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/v1/mentors/onboarding/step3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          offerings: formData.offerings,
          custom_offering: formData.customOffering || null,
          languages: formData.languages,
          time_zones: formData.timeZones,
          session_pricing: [{
            session_type: formData.sessionType,
            duration: formData.sessionDuration,
            price: parseInt(formData.sessionPrice)
          }]
        })
      })

      if (response.ok) {
        onNext(formData)
      } else {
        const error = await response.json()
        alert(`Error: ${error.detail}`)
      }
    } catch (error) {
      console.error("Error saving step 3 data:", error)
      alert("Error saving data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">UC</span>
            </div>
            <span className="font-medium text-gray-800">Unusual Consultant</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Title and Progress */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Mulish, sans-serif' }}>Mentorship Offerings</h1>
            <p className="text-gray-600 mb-6">Share how you can best support mentees</p>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0073CF' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-500">Step 3 of 5 • 25-30 seconds</p>
          </div>
          
          <div className="space-y-8">
            {/* What can you help with */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Mulish, sans-serif' }}>What can you help with? (Multi-Select)</h3>
              <div className="space-y-3">
                {mentorshipOfferings.map((offering) => {
                  const IconComponent = offering.icon
                  return (
                    <div
                      key={offering.id}
                      className={`cursor-pointer transition-all duration-200 p-4 border rounded-lg ${
                        formData.offerings.includes(offering.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleOffering(offering.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5" style={{ color: '#0073CF' }} />
                        <div className="flex-1">
                          <h4 className="font-medium">{offering.label}</h4>
                          <p className="text-sm text-gray-600">{offering.description}</p>
                        </div>
                        <Checkbox checked={formData.offerings.includes(offering.id)} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Custom offering */}
              <div className="mt-4">
                <Input
                  value={formData.customOffering}
                  onChange={(e) => setFormData({ ...formData, customOffering: e.target.value })}
                  placeholder="e.g. Startup pitch review, Technical architecture guidance"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="text-blue-600 text-sm mt-2 flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  + Add Other
                </button>
              </div>
            </div>

            {/* Languages and Time Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <Globe className="h-5 w-5 mr-2" style={{ color: '#0073CF' }} />
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'Mulish, sans-serif' }}>Languages you speak</h3>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={() => {
                          if (formData.languages.includes(language)) {
                            toggleLanguage(language)
                          } else if (formData.languages.length < 3) {
                            toggleLanguage(language)
                          }
                        }}
                        disabled={!formData.languages.includes(language) && formData.languages.length >= 3}
                      />
                      <Label 
                        htmlFor={`lang-${language}`} 
                        className="text-sm cursor-pointer flex-1"
                      >
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {/* Selected Languages Pills */}
                {formData.languages.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {formData.languages.slice(0, 3).map((language, index) => (
                        <span 
                          key={language}
                          className="inline-flex items-center px-3 py-1 text-white rounded-full text-xs cursor-pointer hover:opacity-80"
                          style={{ backgroundColor: '#0073CF' }}
                          onClick={() => toggleLanguage(language)}
                        >
                          {index + 1}. {language} ×
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      If you want to change the preference, drag it
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 mr-2" style={{ color: '#0073CF' }} />
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'Mulish, sans-serif' }}>Time zones you support</h3>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {timeZones.map((timeZone) => (
                    <div key={timeZone} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tz-${timeZone}`}
                        checked={formData.timeZones.includes(timeZone)}
                        onCheckedChange={() => toggleTimeZone(timeZone)}
                      />
                      <Label 
                        htmlFor={`tz-${timeZone}`} 
                        className="text-sm cursor-pointer flex-1"
                      >
                        {timeZone}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {/* Selected Time Zones Pills */}
                {formData.timeZones.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {formData.timeZones.map((timeZone, index) => (
                        <span 
                          key={timeZone}
                          className="inline-flex items-center px-3 py-1 text-white rounded-full text-xs cursor-pointer hover:opacity-80"
                          style={{ backgroundColor: '#0073CF' }}
                          onClick={() => toggleTimeZone(timeZone)}
                        >
                          {timeZone} ×
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Session Pricing */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Mulish, sans-serif' }}>Set Session(s) Price</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select value={formData.sessionType} onValueChange={(value) => setFormData({ ...formData, sessionType: value })}>
                    <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={formData.sessionDuration} onValueChange={(value) => setFormData({ ...formData, sessionDuration: value })}>
                    <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    value={formData.sessionPrice}
                    onChange={(e) => setFormData({ ...formData, sessionPrice: e.target.value })}
                    placeholder="Enter price"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              
              {/* Pricing Guidelines */}
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
                <p className="text-sm font-medium mb-2" style={{ color: '#0073CF' }}>Pricing Guidelines</p>
                <p className="text-xs" style={{ color: '#0073CF' }}>Entry level: ₹500-1500</p>
                <p className="text-xs" style={{ color: '#0073CF' }}>Experienced: ₹1500-3000</p>
                <p className="text-xs" style={{ color: '#0073CF' }}>Expert Level: ₹3000+</p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-8 mt-8">
            <button 
              onClick={onBack}
              className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={isLoading || formData.offerings.length === 0 || formData.languages.length === 0 || formData.timeZones.length === 0 || !formData.sessionType || !formData.sessionDuration || !formData.sessionPrice}
              className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#0073CF' }}
            >
              {isLoading ? "Saving..." : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
