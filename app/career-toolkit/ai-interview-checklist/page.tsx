"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, BookOpenText, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SuggestedMentorsPage } from "../components/suggested_mentors"
import { API_BASE_URL } from "@/lib/api"

// API Configuration - using environment variable from lib/api.ts

// Types for API responses
interface InterviewChecklistResponse {
  role_overview: string
  background_input: string
  practice_questions: any
  puzzles_estimations: any
  study_links: any
  dos_donts: any
  analysis_timestamp: string
  industry: string
  role: string
  experience_level: string
  target_company?: string
}

interface UsageStatsResponse {
  gemini_requests: number
  openai_requests: number
  gemini_limit: number
  openai_limit: number
}

const industryOptions = ["Technology", "Finance", "Marketing", "Design", "Healthcare", "Education", "Consulting"]
const roles = [
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Business/Operations Analyst",
  "Marketing/Growth Specialist",
  "Finance/Accounting",
  "HR/Talent Specialist",
]
const experience = ["Student/Intern", "Entry-Level (0–2 yrs)", "Mid-Level (3–5 yrs)", "Senior (6–10 yrs)", "Executive (10+ yrs)"]


export default function AIInterviewChecklist() {
  // State management
  const [totalUses] = useState(5)
  const [usesRemaining, setUsesRemaining] = useState(5)
  const [generated, setGenerated] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checklistData, setChecklistData] = useState<InterviewChecklistResponse | null>(null)

  // Form state
  const [selectedIndustry, setSelectedIndustry] = useState<string>("Select Industry")
  const [selectedRole, setSelectedRole] = useState<string>("Select Role")
  const [selectedExperience, setSelectedExperience] = useState<string>("Select Experience Level")
  const [targetCompany, setTargetCompany] = useState<string>("")

  // Fetch usage stats on component mount
  useEffect(() => {
    fetchUsageStats()
  }, [])

  const fetchUsageStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/interview-checklist/usage`)
      if (response.ok) {
        const data: UsageStatsResponse = await response.json()
        // Update usage stats if needed
        console.log("Usage stats:", data)
      }
    } catch (error) {
      console.error("Failed to fetch usage stats:", error)
    }
  }

  const handleStart = () => {
    if (usesRemaining > 0) setUsesRemaining((prev) => prev - 1)
  }

  const generateChecklist = async () => {
    // Validate form inputs
    if (selectedIndustry === "Select Industry" || selectedRole === "Select Role" || selectedExperience === "Select Experience Level") {
      setError("Please select Industry, Role, and Experience Level")
      return
    }

    setIsLoading(true)
    setError(null)
    setGenerated(false)

    try {
      const requestBody = {
        industry: selectedIndustry,
        role: selectedRole,
        experience_level: selectedExperience,
        target_company: targetCompany || undefined
      }

      const response = await fetch(`${API_BASE_URL}/interview-checklist/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: InterviewChecklistResponse = await response.json()
      setChecklistData(data)
      setGenerated(true)

      // Decrement usage
      if (usesRemaining > 0) {
        setUsesRemaining((prev) => prev - 1)
      }
    } catch (error) {
      console.error("Error generating checklist:", error)
      setError("Failed to generate interview checklist. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleExpand = (title: string) => {
    setExpanded(expanded === title ? null : title)
  }

  // --- Reusable dropdown ---
  const Dropdown = ({
    label,
    options,
    selected,
    onSelect,
  }: {
    label: string
    options: string[]
    selected: string
    onSelect: (value: string) => void
  }) => (
    <div className="flex flex-col space-y-2">
      <Label className="text-black font-medium">{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-[42px] justify-between rounded-xl border border-gray-300 text-[13px] text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            {selected}
            <ChevronDown className="w-4 h-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[180px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg
                     scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent 
                     [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent 
                     [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full 
                     hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all"
          align="start"
        >
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt}
              onClick={() => onSelect(opt)}
              className={cn(
                "flex justify-between items-center px-3 py-2 rounded-md text-[13px] cursor-pointer transition-colors",
                "hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              {opt}
              {selected === opt && <Check className="w-4 h-4 text-blue-500" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return <div className="whitespace-pre-line">{content}</div>
    }

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {content.map((item, idx) => {
            if (typeof item === 'string') return <li key={idx}>{item}</li>
            // Handle objects
            if (item.question) return <li key={idx}>{item.question}</li>
            if (item.puzzle) return <li key={idx}>{item.puzzle}</li>
            if (item.title) {
              // Check if there's a url
              if (item.url) return <li key={idx}><a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{item.title}</a></li>
              return <li key={idx}>{item.title}</li>
            }
            // Fallback for unknown objects
            return <li key={idx}>{JSON.stringify(item)}</li>
          })}
        </ul>
      )
    }

    if (typeof content === 'object' && content !== null) {
      // Handle Dos and Donts
      if (content.dos || content.donts) {
        return (
          <div className="space-y-4">
            {content.dos && (
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Do&apos;s</h4>
                <ul className="list-none space-y-1">
                  {content.dos.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600">✅</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.donts && (
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Don&apos;ts</h4>
                <ul className="list-none space-y-1">
                  {content.donts.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-red-600">❌</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      }
      return <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(content, null, 2)}</pre>
    }

    return null
  }

  const CardDropdown = ({ title, content }: { title: string; content: any }) => (
    <div
      onClick={() => toggleExpand(title)}
      className="rounded-xl shadow-[0_4px_12px_#9F9D9D40,0_2px_8px_#DADADA40] bg-white px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-900 font-semibold text-lg">{title}</span>
        <div className="bg-[#F0F8FF] rounded-full p-2 flex items-center justify-center">
          <ChevronDown
            className={`text-gray-700 w-5 h-5 transition-transform ${expanded === title ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {expanded === title && generated && (
        <div className="mt-3 text-sm text-gray-700">
          {renderContent(content)}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== Header Box ===== */}
      <div className="w-full max-w-5xl bg-[#EDF7FF] rounded-2xl p-8 flex flex-col md:flex-row md:items-start md:justify-between shadow-[0_10px_0_#E3F2FF] relative">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[52px] font-semibold text-gray-900 leading-tight">
            <span className="text-[#0073CF]">AI Interview</span> Checklist
          </h1>
          <p className="text-black text-[20px] md:text-[22px] whitespace-nowrap">
            Prepare for your next interview with Smart Buddy&apos;s personalized guide.
          </p>
        </div>

        <Button
          onClick={handleStart}
          className={cn(
            "bg-[#0073CF] hover:bg-[#005FA3] text-white rounded-full px-6 py-3 shadow-md transition-all flex items-center gap-2 absolute md:static top-[-20px] right-8 md:top-auto md:right-auto"
          )}
        >
          <Image
            src="/sparkle-filled.png"
            alt="sparkle"
            width={20}
            height={20}
            className="object-contain"
          />
          {usesRemaining} of {totalUses} free uses remaining
        </Button>
      </div>


      {/* ===== Form Box ===== */}
      <Card className="w-full max-w-5xl shadow-[0_4px_12px_#9F9D9D40] rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="grid text-[20px] md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Dropdown
              label="Industry"
              options={industryOptions}
              selected={selectedIndustry}
              onSelect={setSelectedIndustry}
            />
            <Dropdown label="Role" options={roles} selected={selectedRole} onSelect={setSelectedRole} />
            <Dropdown
              label="Experience Level"
              options={experience}
              selected={selectedExperience}
              onSelect={setSelectedExperience}
            />
            <div className="flex flex-col space-y-2">
              <Label className="text-black font-medium">
                Target Company <span className="text-black">(optional)</span>
              </Label>
              <Input
                placeholder="e.g. Google, Amazon..."
                className="rounded-xl border border-gray-300"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button
              onClick={generateChecklist}
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#0070E0] hover:bg-[#005FC2] shadow-[0_4px_0_#0C5CAC] text-white rounded-full px-8 py-3 text-lg font-semibold transition text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <BookOpenText className="w-5 h-5" />
              )}
              {isLoading ? "Generating..." : "Generate Guide"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===== Results / Sections Box ===== */}
      {generated && checklistData && (
        <Card className="w-full max-w-5xl shadow-[0_4px_12px_#9F9D9D40,0_-4px_12px_#DADADA40] rounded-2xl">
          <CardContent className="p-8 space-y-5">
            <CardDropdown title="Role Overview" content={checklistData.role_overview} />
            <CardDropdown title="Background Input" content={checklistData.background_input} />
            <CardDropdown title="Practice Questions" content={checklistData.practice_questions} />
            <CardDropdown title="Puzzles & Estimations" content={checklistData.puzzles_estimations} />
            <CardDropdown title="Study Links" content={checklistData.study_links} />
            <CardDropdown title="Do's and Don'ts" content={checklistData.dos_donts} />
          </CardContent>
        </Card>
      )}

      <SuggestedMentorsPage role={selectedRole} skills={[]} />
    </div>
  )
}
