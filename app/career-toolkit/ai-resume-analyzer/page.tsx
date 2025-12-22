"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { FileText, Loader2, UploadCloud, X } from "lucide-react"
import { SuggestedMentorsPage } from "../components/suggested_mentors"
import UploadBox from "../components/uploadbox"
import AnalysisResults from "../components/analysis_results"
import { API_BASE_URL } from "@/lib/api"

// API Configuration - using environment variable from lib/api.ts

// Types for API responses
interface AnalysisResponse {
  match_score: number
  matched_keywords: string[]
  missing_keywords: string[]
  ai_insights: string[]
  analysis_timestamp: string
  resume_length: number
  job_description_length: number
  resume_text: string
}

interface UsageResponse {
  gemini_requests: number
  openai_requests: number
  gemini_limit: number
  openai_limit: number
}

export default function AIResumeAnalyzer() {
  // State management
  const [totalUses, setTotalUses] = useState(15) // Gemini limit
  const [usesRemaining, setUsesRemaining] = useState(15)
  const [analysisTriggered, setAnalysisTriggered] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Analysis results state
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null)
  const [resumeText, setResumeText] = useState("")

  // File refs
  const resumeFileRef = useRef<HTMLInputElement | null>(null)
  const jobDescFileRef = useRef<HTMLInputElement | null>(null)

  // Selected files
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null)
  const [selectedJobDescFile, setSelectedJobDescFile] = useState<File | null>(null)

  // Fetch usage stats on component mount
  useEffect(() => {
    fetchUsageStats()
  }, [])

  // API Functions
  const fetchUsageStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resume-analysis/usage`)
      if (!response.ok) throw new Error('Failed to fetch usage stats')
      const data: UsageResponse = await response.json()
      setUsesRemaining(data.gemini_limit - data.gemini_requests)
      setTotalUses(data.gemini_limit)
    } catch (error) {
      console.error('Error fetching usage stats:', error)
    }
  }

  const analyzeResume = async () => {
    if (!selectedResumeFile) {
      setError("Please upload a resume file")
      return
    }

    if (!jobDescription.trim() && !selectedJobDescFile) {
      setError("Please provide a job description or upload a job description file")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resume_file', selectedResumeFile)

      if (jobDescription.trim()) {
        formData.append('job_description', jobDescription)
      }

      if (selectedJobDescFile) {
        formData.append('job_description_file', selectedJobDescFile)
      }

      const response = await fetch(`${API_BASE_URL}/resume-analysis/analyze`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Analysis failed')
      }

      const data: AnalysisResponse = await response.json()
      setAnalysisResults(data)
      setResumeText(data.resume_text) // Use resume text from backend
      setAnalysisTriggered(true)

      // Update usage stats
      await fetchUsageStats()

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during analysis')
    } finally {
      setIsLoading(false)
    }
  }

  // File handling functions
  const openResumeFileDialog = () => resumeFileRef.current?.click()
  const openJobDescFileDialog = () => jobDescFileRef.current?.click()

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedResumeFile(file)
      setError(null)
    }
  }

  const handleJobDescFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedJobDescFile(file)
      setError(null)
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'resume' | 'jobdesc') => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (type === 'resume') {
        setSelectedResumeFile(file)
      } else {
        setSelectedJobDescFile(file)
      }
      setError(null)
    }
  }

  // highlight keywords
  const highlightText = (text: string, keywords: string[]) => {
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi")
    return text.replace(regex, (match) => `<span class="bg-green-200 font-semibold">${match}</span>`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== HEADER BOX ===== */}
      <div className="w-full max-w-[1240px] bg-[#EDF7FF] rounded-2xl p-8 flex flex-col md:flex-row md:items-start md:justify-between shadow-[0_10px_0_#E3F2FF] relative">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[52px] font-semibold text-gray-900 leading-tight">
            <span className="text-[#0073CF]">AI Resume</span> Analyzer
          </h1>
          <p className="text-black text-[20px] md:text-[22px] whitespace-nowrap">
            Get instant feedback and a match score for your resume
          </p>
        </div>

        <Button
          onClick={fetchUsageStats}
          className={cn(
            "bg-[#0073CF] hover:bg-[#005FA3] text-white rounded-full px-6 py-3 shadow-md transition-all flex items-center gap-2 absolute md:static top-[-20px] right-8 md:top-auto md:right-auto"
          )}
        >
          <Image src="/sparkle-filled.png" alt="sparkle" width={20} height={20} className="object-contain" />
          {usesRemaining} of {totalUses} free uses remaining
        </Button>
      </div>

      {/* ===== UPLOAD SECTION ===== */}
      <Card className="w-full max-w-[1240px] shadow-[0_4px_12px_#9F9D9D40] rounded-2xl">
        <CardContent className="p-8 space-y-6">
          {/* Resume + Job Description Section */}
          <div className="flex flex-col lg:flex-row gap-4">

            {/* ===== Resume Upload ===== */}
            <div className="flex-[0.9] flex flex-col space-y-4 border border-[#C7C7C7] rounded-2xl bg-[#F8F9FB] p-5 shadow-[0_4px_8px_#00000020] h-[350px]">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/upload_Resume_icon.png"
                  alt="analysis"
                  width={20}
                  height={20}
                />
                <h3 className="text-lg font-semibold text-gray-800 text-left">
                  Upload Resume
                </h3>
              </div>

              <UploadBox
                dragActive={dragActive}
                openFileDialog={openResumeFileDialog}
                handleDrag={handleDrag}
                handleFileChange={handleResumeFileChange}
                handleDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e, 'resume')}
                infoText={{ formats: "PDF, DOCX, TXT", maxSize: "5MB" }}
              />
              <input
                ref={resumeFileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleResumeFileChange}
                className="hidden"
              />
              {selectedResumeFile && (
                <div className="mt-2 flex items-center justify-between text-sm text-green-600 font-medium">
                  <span>Selected: {selectedResumeFile.name}</span>
                  <button
                    onClick={() => {
                      setSelectedResumeFile(null)
                      if (resumeFileRef.current) resumeFileRef.current.value = ""
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors relative group"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      remove file
                    </span>
                  </button>
                </div>
              )}

            </div>

            {/* ===== Job Description ===== */}
            <div className="flex-[1.5] flex flex-col space-y-4 border border-[#C7C7C7] rounded-2xl bg-[#F8F9FB] p-5 shadow-[0_4px_8px_#00000020] h-[350px]">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/job_desc_icon.png"
                  alt="analysis"
                  width={20}
                  height={20}
                />
                <h3 className="text-lg font-semibold text-gray-800 ">
                  Job Description
                </h3>
                <p className="text-sm text-gray-700 font-medium px-7">
                  Or upload Job Description File
                </p>
              </div>

              <div className="flex gap-4 items-start flex-col lg:flex-row">
                {/* Text Area */}
                <div className="relative w-full lg:w-3/5">
                  <textarea
                    placeholder="Paste job description here..."
                    maxLength={5000}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-[180px] p-3 border border-gray-300 rounded-lg resize-none text-sm bg-white"
                  ></textarea>
                  <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                    {jobDescription.length}/5000
                  </span>
                </div>

                {/* Upload Box */}
                <div className="w-full lg:w-2/5">
                  <UploadBox
                    dragActive={dragActive}
                    openFileDialog={openJobDescFileDialog}
                    handleDrag={handleDrag}
                    handleFileChange={handleJobDescFileChange}
                    handleDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e, 'jobdesc')}
                    infoText={{ formats: "PDF, DOCX, TXT", maxSize: "5MB" }}
                  />
                  <input
                    ref={jobDescFileRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleJobDescFileChange}
                    className="hidden"
                  />
                  {selectedJobDescFile && (
                    <div className="mt-2 flex items-center justify-between text-sm text-green-600 font-medium">
                      <span>Selected: {selectedJobDescFile.name}</span>
                      <button
                        onClick={() => {
                          setSelectedJobDescFile(null)
                          if (jobDescFileRef.current) jobDescFileRef.current.value = ""
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors relative group"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          remove file
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Analyze Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={analyzeResume}
              disabled={isLoading || (!selectedResumeFile && !jobDescription.trim())}
              className="flex items-center gap-2 bg-[#0070E0] hover:bg-[#005FC2] shadow-[0_4px_0_#0C5CAC] text-white rounded-full px-8 py-3 text-lg font-semibold transition text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
              {isLoading ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===== ANALYSIS RESULTS ===== */}
      {analysisTriggered && analysisResults && (
        <AnalysisResults
          resumeText={analysisResults.resume_text}
          highlightWords={analysisResults.matched_keywords}
          missingKeywords={analysisResults.missing_keywords}
          aiInsights={analysisResults.ai_insights}
          matchScore={analysisResults.match_score}
        />
      )}



      {/* Suggested Mentors */}
      <SuggestedMentorsPage />
    </div>
  )
}
