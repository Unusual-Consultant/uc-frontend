"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { FileText } from "lucide-react"
import { SuggestedMentorsPage } from "../components/suggested_mentors"
import UploadBox from "../components/uploadbox"
import AnalysisResults from "../components/analysis_results"

// mock data
const resumeText = `John Doe
john.doe@email.com | (123) 456-7890 | LinkedIn.com/in/johndoe

Summary
Highly motivated and results-oriented professional with 5 years of experience in Product Management. 
Proven ability to lead cross-functional teams and drive product strategy. Seeking to leverage expertise 
in SaaS and agile methodologies to contribute to a dynamic tech company.

Experience
Senior Product Manager | Tech Solutions Inc. | San Francisco, CA Jan 2022 – Present
• Led product roadmap for flagship SaaS platform, increasing user engagement by 20%.
• Managed a team of 5 engineers and 2 designers, fostering an agile development environment.
• Conducted market research and competitive analysis to identify new product opportunities.

Product Manager | Innovate Corp. | San Francisco, CA Mar 2019 – Dec 2021
• Launched 3 new features, resulting in a 15% increase in customer satisfaction.
• Collaborated with sales and marketing to develop go-to-market strategies.
• Analyzed user data to inform product decisions and prioritize backlog.

Education
MBA | University of California, Berkeley | 2019
B.S. Computer Science | Stanford University | 2015

Skills
Product Management, Agile, Scrum, SaaS, Market Research, User Stories, JIRA, Confluence, SQL, 
Data Analysis, Cross-functional Leadership, Go-to-Market Strategy.`

const highlightWords = ["Product", "SaaS", "agile", "Management", "market", "user"]

const missingKeywords = [
  "A/B Testing",
  "Customer Retention",
  "Cloud Deployment",
  "Data Visualization",
  "OKRs",
]

const aiInsights = [
  "Emphasize quantifiable results in bullet points (e.g., 'Improved conversion by 25%').",
  "Add more measurable KPIs to show business impact.",
  "Include leadership and communication keywords to strengthen profile.",
]

export default function AIResumeAnalyzer() {
  const [totalUses] = useState(5)
  const [usesRemaining, setUsesRemaining] = useState(5)
  const [analysisTriggered, setAnalysisTriggered] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [matchScore, setMatchScore] = useState(78)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleStart = () => {
    if (usesRemaining > 0) setUsesRemaining((prev) => prev - 1)
  }

  const handleAnalyze = () => {
    setAnalysisTriggered(true)
    setMatchScore(Math.floor(Math.random() * 21) + 70) // random 70–90
  }

  const openFileDialog = () => fileInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) console.log("File selected:", e.target.files[0].name)
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) console.log("File dropped:", e.dataTransfer.files[0].name)
  }

  // highlight keywords
  const highlightText = (text: string) => {
    const regex = new RegExp(`\\b(${highlightWords.join("|")})\\b`, "gi")
    return text.replace(regex, (match) => `<span class="bg-yellow-200 font-semibold">${match}</span>`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== HEADER BOX ===== */}
      <div className="w-full max-w-5xl bg-[#EDF7FF] rounded-2xl p-8 flex flex-col md:flex-row md:items-start md:justify-between shadow-[0_10px_0_#E3F2FF] relative">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[52px] font-semibold text-gray-900 leading-tight">
            <span className="text-[#0073CF]">AI Resume</span> Analyzer
          </h1>
          <p className="text-black text-[20px] md:text-[22px] whitespace-nowrap">
            Get instant feedback and a match score for your resume
          </p>
        </div>

        <Button
          onClick={handleStart}
          className={cn(
            "bg-[#0073CF] hover:bg-[#005FA3] text-white rounded-full px-6 py-3 shadow-md transition-all flex items-center gap-2 absolute md:static top-[-20px] right-8 md:top-auto md:right-auto"
          )}
        >
          <Image src="/sparkle-filled.png" alt="sparkle" width={20} height={20} className="object-contain" />
          {usesRemaining} of {totalUses} free uses remaining
        </Button>
      </div>

      {/* ===== UPLOAD SECTION ===== */}
<Card className="w-full max-w-5xl shadow-[0_4px_12px_#9F9D9D40] rounded-2xl">
  <CardContent className="p-8 space-y-6">
    {/* Resume + Job Description Section */}
    <div className="flex flex-col lg:flex-row gap-4">

      {/* ===== Resume Upload ===== */}
      <div className="flex-[0.9] flex flex-col space-y-4 border border-[#C7C7C7] rounded-2xl bg-[#F8F9FB] p-5 shadow-[0_4px_8px_#00000020] h-[300px]">
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
  openFileDialog={openFileDialog}
  handleDrag={handleDrag}
  handleFileChange={handleFileChange}
  infoText={{ formats: "PDF, DOCX, TXT", maxSize: "5MB" }}
/>

</div>

      {/* ===== Job Description ===== */}
      <div className="flex-[1.5] flex flex-col space-y-4 border border-[#C7C7C7] rounded-2xl bg-[#F8F9FB] p-5 shadow-[0_4px_8px_#00000020] h-[300px]">
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

<UploadBox
  dragActive={dragActive}
  openFileDialog={openFileDialog}
  handleDrag={handleDrag}
  handleFileChange={handleFileChange}
  infoText={{ formats: "PDF, DOCX, TXT", maxSize: "5MB" }}
/>
</div>
      </div>
    </div>

    {/* Analyze Button */}
    <div className="flex justify-end pt-6">
      <Button
        onClick={handleAnalyze}
        className="flex items-center gap-2 bg-[#0070E0] hover:bg-[#005FC2] shadow-[0_4px_0_#0C5CAC] text-white rounded-full px-8 py-3 text-lg font-semibold transition text-[16px]"
      >
        <FileText className="w-5 h-5" />
        Analyze Resume
      </Button>
    </div>
  </CardContent>
</Card>

      {/* ===== ANALYSIS RESULTS ===== */}
{analysisTriggered && (
  <AnalysisResults
    resumeText={resumeText}
    highlightWords={highlightWords}
    missingKeywords={missingKeywords}
    aiInsights={aiInsights}
    matchScore={matchScore}
  />
)}



      {/* Suggested Mentors */}
      <SuggestedMentorsPage />
    </div>
  )
}
