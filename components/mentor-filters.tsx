"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Filter } from "lucide-react"

interface MentorFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export function MentorFilters({ onFiltersChange }: MentorFiltersProps) {
  const [priceRange, setPriceRange] = useState([50, 200])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState<string[]>([])
  const [availability, setAvailability] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")

  const industries = [
    "Technology",
    "Finance",
    "Marketing",
    "Design",
    "Healthcare",
    "Education",
    "Consulting",
    "Sales",
    "Operations",
    "HR",
    "Manufacturing",
    "Retail",
    "Media",
    "Legal",
    "Real Estate",
  ]

  const skills = [
    "Leadership",
    "Product Management",
    "Software Engineering",
    "Data Science",
    "UX/UI Design",
    "Digital Marketing",
    "Business Strategy",
    "Project Management",
    "Sales",
    "Customer Success",
    "DevOps",
    "Machine Learning",
    "Analytics",
    "Content Strategy",
    "Brand Management",
    "Operations",
  ]

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Portuguese",
    "Italian",
    "Russian",
    "Arabic",
    "Hindi",
  ]

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6-10 years)",
    "Executive Level (10+ years)",
  ]

  const availabilityOptions = ["Available Today", "Available This Week", "Available Next Week", "Flexible Schedule"]

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "experience", label: "Most Experienced" },
    { value: "reviews", label: "Most Reviews" },
  ]

  const clearAllFilters = () => {
    setPriceRange([50, 200])
    setSelectedIndustries([])
    setSelectedSkills([])
    setSelectedLanguages([])
    setExperienceLevel([])
    setAvailability([])
    setVerifiedOnly(false)
    setSortBy("relevance")
  }

  const getActiveFiltersCount = () => {
    return (
      selectedIndustries.length +
      selectedSkills.length +
      selectedLanguages.length +
      experienceLevel.length +
      availability.length +
      (verifiedOnly ? 1 : 0)
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort and Verified Toggle */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Sort
            </CardTitle>
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Verified Mentors Only */}
          <div className="flex items-center justify-between">
            <Label htmlFor="verified" className="text-sm font-medium">
              Verified Mentors Only
            </Label>
            <Switch id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle>Price Range (per hour)</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={25} step={25} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      {/* Industries */}
      <Card>
        <CardHeader>
          <CardTitle>Industry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {industries.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={industry}
                  checked={selectedIndustries.includes(industry)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedIndustries([...selectedIndustries, industry])
                    } else {
                      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry))
                    }
                  }}
                />
                <label htmlFor={industry} className="text-sm cursor-pointer">
                  {industry}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSkills([...selectedSkills, skill])
                    } else {
                      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                    }
                  }}
                />
                <label htmlFor={skill} className="text-sm cursor-pointer">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Level */}
      <Card>
        <CardHeader>
          <CardTitle>Experience Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={experienceLevel.includes(level)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setExperienceLevel([...experienceLevel, level])
                    } else {
                      setExperienceLevel(experienceLevel.filter((l) => l !== level))
                    }
                  }}
                />
                <label htmlFor={level} className="text-sm cursor-pointer">
                  {level}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLanguages([...selectedLanguages, language])
                    } else {
                      setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
                    }
                  }}
                />
                <label htmlFor={language} className="text-sm cursor-pointer">
                  {language}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {availabilityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={availability.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAvailability([...availability, option])
                    } else {
                      setAvailability(availability.filter((a) => a !== option))
                    }
                  }}
                />
                <label htmlFor={option} className="text-sm cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Filters ({getActiveFiltersCount()})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedIndustries.map((industry) => (
                <Badge key={industry} variant="secondary" className="text-xs">
                  {industry}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedIndustries(selectedIndustries.filter((i) => i !== industry))}
                  />
                </Badge>
              ))}
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedSkills(selectedSkills.filter((s) => s !== skill))}
                  />
                </Badge>
              ))}
              {verifiedOnly && (
                <Badge variant="secondary" className="text-xs">
                  Verified Only
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setVerifiedOnly(false)} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
