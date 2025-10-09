"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Filter } from "lucide-react"

  const skills = [
    "Product Management",
    "Software Engineering",
    "Data Science",
  "UX Design",
  "Marketing",
    "Sales",
  "Finance",
    "Operations",
  "Strategy",
  "Leadership"
]

const locations = [
  "San Francisco, CA",
  "New York, NY", 
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Remote"
  ]

  const experienceLevels = [
    "Entry Level (0-2 years)",
  "Mid Level (3-7 years)", 
  "Senior Level (8+ years)",
  "Executive (15+ years)"
]

const availability = [
  "Available today",
  "Available this week",
  "Available next week"
]

export function MentorFilters() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([50, 300])
  const [rating, setRating] = useState<number>(0)

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

  const toggleExperience = (exp: string) => {
    setSelectedExperience(prev => 
      prev.includes(exp) 
        ? prev.filter(e => e !== exp)
        : [...prev, exp]
    )
  }

  const toggleAvailability = (avail: string) => {
    setSelectedAvailability(prev => 
      prev.includes(avail) 
        ? prev.filter(a => a !== avail)
        : [...prev, avail]
    )
  }

  const clearAllFilters = () => {
    setSelectedSkills([])
    setSelectedLocations([])
    setSelectedExperience([])
    setSelectedAvailability([])
    setPriceRange([50, 300])
    setRating(0)
  }

  const hasActiveFilters = selectedSkills.length > 0 || 
    selectedLocations.length > 0 || 
    selectedExperience.length > 0 || 
    selectedAvailability.length > 0 || 
    priceRange[0] !== 50 || 
    priceRange[1] !== 300 || 
    rating > 0

  return (
    <div className="space-y-6">
      {/* Header */}
          <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700"
          >
                <X className="h-4 w-4 mr-1" />
            Clear all
              </Button>
            )}
          </div>

      {/* Skills Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Skills & Expertise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedSkills.includes(skill)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "hover:bg-blue-50 hover:border-blue-300"
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => toggleLocation(location)}
                />
                <label 
                  htmlFor={location}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Level Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Experience Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={selectedExperience.includes(level)}
                  onCheckedChange={() => toggleExperience(level)}
                />
                <label 
                  htmlFor={level}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Price Range (₹/hr)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
              </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={rating.toString()} onValueChange={(value) => setRating(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="3">3+ stars</SelectItem>
              <SelectItem value="4">4+ stars</SelectItem>
              <SelectItem value="4.5">4.5+ stars</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {availability.map((avail) => (
              <div key={avail} className="flex items-center space-x-2">
                <Checkbox
                  id={avail}
                  checked={selectedAvailability.includes(avail)}
                  onCheckedChange={() => toggleAvailability(avail)}
                />
                <label 
                  htmlFor={avail}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {avail}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Active Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
              {selectedLocations.map(location => (
                <Badge key={location} variant="secondary" className="bg-blue-100 text-blue-800">
                  {location}
                </Badge>
              ))}
              {selectedExperience.map(exp => (
                <Badge key={exp} variant="secondary" className="bg-blue-100 text-blue-800">
                  {exp}
                </Badge>
              ))}
              {selectedAvailability.map(avail => (
                <Badge key={avail} variant="secondary" className="bg-blue-100 text-blue-800">
                  {avail}
                </Badge>
              ))}
              {rating > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {rating}+ stars
                </Badge>
              )}
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                ₹{priceRange[0]}-{priceRange[1]}/hr
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
