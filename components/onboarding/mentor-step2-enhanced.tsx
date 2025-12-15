"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, User, Building, Award, LinkIcon, Clock, Trophy } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"

interface MentorStep2Props {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

const topSkills = [
  "Product management",
  "Data Science", 
  "Software Engineering",
  "UI UX Design",
  "Digital Marketing",
  "Finance",
  "Consulting",
  "Entrepreneurship",
  "Interview Preparation",
  "MBA Guidance",
  "Sales",
  "Career Strategy",
  "Content Writing",
  "Graphic Design",
]

export function MentorStep2Enhanced({ onNext, onBack, initialData }: MentorStep2Props) {
  const [formData, setFormData] = useState({
    fullName: initialData?.full_name || "",
    roleOrTitle: initialData?.role_or_title || "",
    company: initialData?.company || "",
    yearsExperience: initialData?.years_experience || "",
    topSkills: initialData?.top_skills || [] as string[],
    linkedinUrl: initialData?.linkedin_url || "",
    portfolioUrl: initialData?.portfolio_url || "",
  })

  const [isLoading, setIsLoading] = useState(false)

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.full_name || "",
        roleOrTitle: initialData.role_or_title || "",
        company: initialData.company || "",
        yearsExperience: initialData.years_experience ? String(initialData.years_experience) : "",
        topSkills: initialData.top_skills || [],
        linkedinUrl: initialData.linkedin_url || "",
        portfolioUrl: initialData.portfolio_url || "",
      })
    }
  }, [initialData])

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

  const handleNext = async () => {
    if (!formData.fullName || !formData.roleOrTitle || !formData.yearsExperience || formData.topSkills.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    const token = localStorage.getItem("access_token")
    console.log("Token being sent:", token)
    
    if (!token) {
      alert("No authentication token found. Please sign in again.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/mentors/onboarding/step2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          role_or_title: formData.roleOrTitle,
          company: formData.company || null,
          years_experience: formData.yearsExperience,
          top_skills: formData.topSkills,
          linkedin_url: formData.linkedinUrl || null,
          portfolio_url: formData.portfolioUrl || null
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Step 2 saved successfully:", result)
        onNext(formData)
      } else {
        const errorText = await response.text()
        let errorMessage = "Failed to save data"
        try {
          const error = JSON.parse(errorText)
          errorMessage = error.detail || error.message || errorMessage
        } catch {
          errorMessage = errorText || errorMessage
        }
        console.error("Error saving step 2:", response.status, errorMessage)
        alert(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error("Error saving step 2 data:", error)
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
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#0073CF' }}>
              <span className="text-white text-sm font-semibold">UC</span>
            </div>
            <span className="font-medium text-gray-800">Unusual Consultant</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Title and Progress */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Mulish, sans-serif' }}>Professional Identity</h1>
            <p className="text-gray-600 mb-6">Tell us about your professional background</p>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0073CF' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-500">Step 2 of 5 • 20-25 seconds</p>
          </div>
          
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4" style={{ color: '#0073CF' }} />
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name*</Label>
              </div>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Role or Freelance Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4" style={{ color: '#0073CF' }} />
                <Label htmlFor="roleOrTitle" className="text-sm font-medium">Role or Freelance Title*</Label>
              </div>
              <Input
                id="roleOrTitle"
                value={formData.roleOrTitle}
                onChange={(e) => setFormData({ ...formData, roleOrTitle: e.target.value })}
                placeholder="e.g., Ex-Amazon PM, Freelancer Coach or Senior Designer at Meta"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4" style={{ color: '#0073CF' }} />
                <Label htmlFor="company" className="text-sm font-medium">Company</Label>
              </div>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Google, Meta or leave blank if freelancer"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" style={{ color: '#0073CF' }} />
                <Label htmlFor="yearsExperience" className="text-sm font-medium">Years of experience*</Label>
              </div>
              <Input
                id="yearsExperience"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                placeholder="e.g., 5 years"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Top 3 Skills */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4" style={{ color: '#0073CF' }} />
                <Label className="text-sm font-medium">Top 3 skills (Tags)*</Label>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {formData.topSkills.length}/3 Selected
                </span>
              </div>
              <Input
                placeholder="Type or select up to 3 skills"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-3"
                readOnly
              />
              <div className="grid grid-cols-2 gap-2 text-xs">
                {topSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    disabled={formData.topSkills.length >= 3 && !formData.topSkills.includes(skill)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      formData.topSkills.includes(skill) 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : formData.topSkills.length >= 3 && !formData.topSkills.includes(skill)
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="h-4 w-4" style={{ color: '#0073CF' }} />
                  <Label htmlFor="linkedinUrl" className="text-sm font-medium">Linkedin URL*</Label>
                </div>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="h-4 w-4" style={{ color: '#0073CF' }} />
                  <Label htmlFor="portfolioUrl" className="text-sm font-medium">Portfolio/Personal Site</Label>
                </div>
                <Input
                  id="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
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
              disabled={isLoading || !formData.fullName || !formData.roleOrTitle || !formData.yearsExperience || formData.topSkills.length === 0}
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
