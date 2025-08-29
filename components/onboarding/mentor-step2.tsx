"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building, Briefcase, Award, Upload } from "lucide-react"

interface MentorStep2Props {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

const expertiseAreas = [
  "Product Management",
  "Software Engineering",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
  "Sales",
  "Finance",
  "Consulting",
  "Entrepreneurship",
  "Leadership",
  "Career Strategy",
  "Interview Preparation",
]

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Media",
  "Consulting",
  "Manufacturing",
  "Real Estate",
  "Government",
  "Non-profit",
  "Startup",
]

export function MentorStep2({ onNext, onBack, initialData }: MentorStep2Props) {
  const [formData, setFormData] = useState({
    currentRole: initialData?.currentRole || "",
    company: initialData?.company || "",
    experience: "",
    expertiseAreas: [] as string[],
    industries: [] as string[],
    linkedinUrl: initialData?.linkedinUrl || "",
    resumeUploaded: false,
  })

  const toggleExpertise = (area: string) => {
    if (formData.expertiseAreas.includes(area)) {
      setFormData({
        ...formData,
        expertiseAreas: formData.expertiseAreas.filter((e) => e !== area),
      })
    } else if (formData.expertiseAreas.length < 3) {
      setFormData({
        ...formData,
        expertiseAreas: [...formData.expertiseAreas, area],
      })
    }
  }

  const toggleIndustry = (industry: string) => {
    if (formData.industries.includes(industry)) {
      setFormData({
        ...formData,
        industries: formData.industries.filter((i) => i !== industry),
      })
    } else {
      setFormData({
        ...formData,
        industries: [...formData.industries, industry],
      })
    }
  }

  const handleNext = () => {
    if (
      formData.currentRole &&
      formData.company &&
      formData.experience &&
      formData.expertiseAreas.length > 0 &&
      formData.industries.length > 0
    ) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Professional Details</CardTitle>
          <CardDescription>Tell us about your professional background</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-green-600 rounded-full"></div>
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Briefcase className="h-4 w-4 text-blue-600 mr-2" />
                <Label htmlFor="currentRole">Current Role</Label>
              </div>
              <Input
                id="currentRole"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                placeholder="e.g., Senior Product Manager"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Building className="h-4 w-4 text-blue-600 mr-2" />
                <Label htmlFor="company">Company</Label>
              </div>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Google"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Award className="h-4 w-4 text-blue-600 mr-2" />
              <Label htmlFor="experience">Total Work Experience</Label>
            </div>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 8 years"
            />
          </div>

          {/* Top 3 Expertise Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Top 3 Expertise Areas</h3>
            <Badge variant="secondary" className="mb-3">
              {formData.expertiseAreas.length}/3 selected
            </Badge>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((area) => (
                <Badge
                  key={area}
                  variant={formData.expertiseAreas.includes(area) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 ${
                    formData.expertiseAreas.includes(area) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                  } ${
                    formData.expertiseAreas.length >= 3 && !formData.expertiseAreas.includes(area) ? "opacity-50" : ""
                  }`}
                  onClick={() => toggleExpertise(area)}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Industries Worked In</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Badge
                  key={industry}
                  variant={formData.industries.includes(industry) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 ${
                    formData.industries.includes(industry) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          {/* LinkedIn URL */}
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <Label>Upload Resume (Optional)</Label>
            <div className="mt-2">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setFormData({ ...formData, resumeUploaded: true })}
              >
                <Upload className="mr-2 h-4 w-4" />
                {formData.resumeUploaded ? "Resume Uploaded ✓" : "Upload Resume"}
              </Button>
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
                !formData.currentRole ||
                !formData.company ||
                !formData.experience ||
                formData.expertiseAreas.length === 0 ||
                formData.industries.length === 0
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
