"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, User, Building, Award, LinkIcon } from "lucide-react"

interface MentorStep2Props {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

const topSkills = [
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
  "MBA Guidance",
  "Startup Advice",
  "Content Writing",
  "Graphic Design",
]

export function MentorStep2Enhanced({ onNext, onBack, initialData }: MentorStep2Props) {
  const [formData, setFormData] = useState({
    fullName: initialData?.name || "",
    roleOrTitle: "",
    company: "",
    isFreelancer: false,
    yearsExperience: "",
    topSkills: [] as string[],
    linkedinUrl: initialData?.linkedinUrl || "",
    portfolioUrl: "",
  })

  const toggleSkill = (skill: string) => {
    if (formData.topSkills.includes(skill)) {
      setFormData({
        ...formData,
        topSkills: formData.topSkills.filter((s) => s !== skill),
      })
    } else if (formData.topSkills.length < 3) {
      setFormData({
        ...formData,
        topSkills: [...formData.topSkills, skill],
      })
    }
  }

  const handleNext = () => {
    if (formData.fullName && formData.roleOrTitle && formData.yearsExperience && formData.topSkills.length > 0) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Professional Identity</CardTitle>
          <CardDescription>Tell us about your professional background</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 2 of 5 • 20-25 seconds</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 text-blue-600 mr-2" />
              <Label htmlFor="fullName">Full Name</Label>
            </div>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g., John Doe"
            />
          </div>

          {/* Role/Title */}
          <div>
            <div className="flex items-center mb-2">
              <Building className="h-4 w-4 text-blue-600 mr-2" />
              <Label htmlFor="roleOrTitle">Role & Company OR Freelance Title</Label>
            </div>
            <Input
              id="roleOrTitle"
              value={formData.roleOrTitle}
              onChange={(e) => setFormData({ ...formData, roleOrTitle: e.target.value })}
              placeholder="e.g., Senior PM at Google OR Ex-Amazon PM"
            />
            <p className="text-xs text-gray-500 mt-1">
              Examples: "Ex-Amazon PM", "Freelance Career Coach", "Senior Designer at Meta"
            </p>
          </div>

          {/* Company (optional for freelancers) */}
          <div>
            <Label htmlFor="company">Company (if applicable)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g., Google, Meta, or leave blank if freelancer"
            />
          </div>

          {/* Years of Experience */}
          <div>
            <div className="flex items-center mb-2">
              <Award className="h-4 w-4 text-blue-600 mr-2" />
              <Label htmlFor="yearsExperience">Years of Experience</Label>
            </div>
            <Input
              id="yearsExperience"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
              placeholder="e.g., 5 years"
            />
          </div>

          {/* Top 3 Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Top 3 Skills (Tags)</h3>
            <Badge variant="secondary" className="mb-3">
              {formData.topSkills.length}/3 selected
            </Badge>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={formData.topSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 ${
                    formData.topSkills.includes(skill) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
                  } ${formData.topSkills.length >= 3 && !formData.topSkills.includes(skill) ? "opacity-50" : ""}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <LinkIcon className="h-4 w-4 text-blue-600 mr-2" />
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              </div>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <Label htmlFor="portfolioUrl">Portfolio / Personal Site</Label>
              <Input
                id="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://yourportfolio.com"
              />
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
                !formData.fullName ||
                !formData.roleOrTitle ||
                !formData.yearsExperience ||
                formData.topSkills.length === 0
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
