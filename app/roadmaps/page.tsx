'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const experienceLevels = [
  "Student",
  "Entry Level (0-2 years)",
  "Mid Level (3-7 years)",
  "Senior Level (8+ years)",
]

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Bootcamp",
  "Self-Taught",
]

const timeframes = [
  "3 months",
  "6 months",
  "12 months",
  "18 months",
  "24 months",
]

const suggestedSkills = ["Python", "JavaScript", "React", "Data Analysis", "Machine Learning"]
const suggestedTools = ["VS Code", "Git", "Figma", "Jira", "Docker"]

export default function RoadmapsPage() {
  const [experienceLevel, setExperienceLevel] = useState("")
  const [education, setEducation] = useState("")
  const [desiredRole, setDesiredRole] = useState("")
  const [keySkills, setKeySkills] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [familiarTools, setFamiliarTools] = useState("")
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [timeframe, setTimeframe] = useState("")
  const [targetCompany, setTargetCompany] = useState("")

  const handleSkillChipClick = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill))
  }

  const handleToolChipClick = (tool: string) => {
    if (!selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool])
    }
  }

  const handleRemoveTool = (tool: string) => {
    setSelectedTools(selectedTools.filter(t => t !== tool))
  }

  const handleGenerateRoadmap = () => {
    if (!experienceLevel || !education || !desiredRole || !keySkills || !familiarTools || !timeframe) {
      alert("Please fill in all required fields")
      return
    }
    // TODO: Implement roadmap generation
    console.log({
      experienceLevel,
      education,
      desiredRole,
      keySkills,
      selectedSkills,
      familiarTools,
      selectedTools,
      timeframe,
      targetCompany,
    })
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-[Mulish] pb-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1300px] pt-8 pb-16">
        {/* Banner */}
        <div className="relative w-full flex justify-center mb-8 lg:mb-10">
          <Image
            src="/resume-banner.png"
            alt="Roadmaps Banner"
            width={1400}
            height={150}
            className="object-contain"
            priority
          />
        </div>

        {/* Main Form Card */}
        <Card className="bg-white border-0 shadow-[0_20px_40px_#9F9D9D40] rounded-2xl mb-8">
          <CardContent className="p-8">
            {/* Row 1: Experience Level, Education, Desired Role */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full p-3 pr-10 border border-[#C7C7C7] rounded-lg focus:ring-2 focus:ring-[#87CEEB]/40 focus:border-[#87CEEB] text-base text-gray-700 bg-white appearance-none cursor-pointer transition-all hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)] [&>option]:py-3 [&>option]:px-4 [&>option]:rounded-lg [&>option]:border-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    <option value="" className="py-3 px-4 rounded-lg">Select Experience Level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level} className="py-3 px-4 rounded-lg">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Highest Education
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full p-3 pr-10 border border-[#C7C7C7] rounded-lg focus:ring-2 focus:ring-[#87CEEB]/40 focus:border-[#87CEEB] text-base text-gray-700 bg-white appearance-none cursor-pointer transition-all hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)] [&>option]:py-3 [&>option]:px-4 [&>option]:rounded-lg [&>option]:border-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    <option value="" className="py-3 px-4 rounded-lg">Select Education Level</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level} className="py-3 px-4 rounded-lg">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Desired Role
                  </label>
                  <input
                    type="text"
                    value={desiredRole}
                    onChange={(e) => setDesiredRole(e.target.value)}
                    placeholder="e.g., Product Manager, Data Scientist"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] focus:border-transparent text-base placeholder:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Key Skills and Familiar Tools */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Key Skills (Select all that apply)
                  </label>
                  <input
                    type="text"
                    value={keySkills}
                    onChange={(e) => setKeySkills(e.target.value)}
                    placeholder="Enter your key skills"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] focus:border-transparent text-base placeholder:text-gray-600 mb-3"
                  />
                  {/* Selected Skills */}
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedSkills.map((skill) => (
                        <span
                          key={skill}
                          onClick={() => handleRemoveSkill(skill)}
                          className="inline-flex items-center px-3 py-1 bg-[#0073CF] text-white rounded-full text-xs cursor-pointer hover:bg-[#005fa3]"
                        >
                          {skill} ×
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Suggested Skills Chips */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills
                      .filter(skill => !selectedSkills.includes(skill))
                      .map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleSkillChipClick(skill)}
                          className="px-4 py-2 rounded-full border border-gray-200 text-sm transition hover:border-[#0073CF] hover:bg-[#E6F3FC] text-gray-700"
                        >
                          {skill}
                        </button>
                      ))}
                  </div>
                </div>

                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Familiar Tools (Select all that apply)
                  </label>
                  <input
                    type="text"
                    value={familiarTools}
                    onChange={(e) => setFamiliarTools(e.target.value)}
                    placeholder="Enter tools you're familiar with"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] focus:border-transparent text-base placeholder:text-gray-600 mb-3"
                  />
                  {/* Selected Tools */}
                  {selectedTools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedTools.map((tool) => (
                        <span
                          key={tool}
                          onClick={() => handleRemoveTool(tool)}
                          className="inline-flex items-center px-3 py-1 bg-[#0073CF] text-white rounded-full text-xs cursor-pointer hover:bg-[#005fa3]"
                        >
                          {tool} ×
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Suggested Tools Chips */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedTools
                      .filter(tool => !selectedTools.includes(tool))
                      .map((tool) => (
                        <button
                          key={tool}
                          onClick={() => handleToolChipClick(tool)}
                          className="px-4 py-2 rounded-full border border-gray-200 text-sm transition hover:border-[#0073CF] hover:bg-[#E6F3FC] text-gray-700"
                        >
                          {tool}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Timeframe, Target Company, Generate Button */}
            <div className="mb-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Targeted Timeframe
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-3 pr-10 border border-[#C7C7C7] rounded-lg focus:ring-2 focus:ring-[#87CEEB]/40 focus:border-[#87CEEB] text-base text-gray-700 bg-white appearance-none cursor-pointer transition-all hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)] [&>option]:py-3 [&>option]:px-4 [&>option]:rounded-lg [&>option]:border-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    <option value="" className="py-3 px-4 rounded-lg">Select Timeframe</option>
                    {timeframes.map((time) => (
                      <option key={time} value={time} className="py-3 px-4 rounded-lg">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-lg font-bold text-gray-900 mb-4 block">
                    Target Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g., Google, Microsoft"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] focus:border-transparent text-base placeholder:text-gray-600"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleGenerateRoadmap}
                    className="bg-[#0073CF] hover:bg-[#003c6c] text-md text-white rounded-full px-8 h-11 font-semibold transition-all duration-200 shadow-[0_4px_0_0_#003c6c] hover:shadow-[0_4px_0_0_#003c6c] hover:shadow-[inset_20px_0_0_0_#003c6c,inset_-20px_0_0_0_#003c6c,0_4px_0_0_#003c6c]"
                    style={{
                      boxShadow: '0 6px 0 0 #0c5cac',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'inset 30px 0 0 0 transparent, inset -30px 0 0 0 transparent, 0 4px 0 0 #003c6c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 0 0 #003c6c';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.87828 3.18873C4.87828 2.84063 5.01656 2.50679 5.2627 2.26065C5.50884 2.01451 5.84268 1.87623 6.19078 1.87623C6.53887 1.87623 6.87271 2.01451 7.11885 2.26065C7.36499 2.50679 7.50328 2.84063 7.50328 3.18873C7.50328 3.53682 7.36499 3.87066 7.11885 4.11681C6.87271 4.36295 6.53887 4.50123 6.19078 4.50123C5.84268 4.50123 5.50884 4.36295 5.2627 4.11681C5.01656 3.87066 4.87828 3.53682 4.87828 3.18873ZM3.14278 2.25123H0.940776C0.692135 2.25123 0.453679 2.35 0.277863 2.52582C0.102048 2.70163 0.00327593 2.94009 0.00327593 3.18873C0.00327593 3.43737 0.102048 3.67582 0.277863 3.85164C0.453679 4.02746 0.692135 4.12623 0.940776 4.12623H3.14278C3.34333 4.77807 3.74757 5.34845 4.29616 5.75363C4.84474 6.15882 5.50878 6.37745 6.19078 6.37745C6.87277 6.37745 7.53681 6.15882 8.08539 5.75363C8.63398 5.34845 9.03822 4.77807 9.23878 4.12623H14.0658C14.6157 4.12609 15.1494 4.31188 15.5804 4.65343C16.0113 4.99498 16.3141 5.47221 16.4396 6.00759C16.5651 6.54297 16.5058 7.10505 16.2715 7.6025C16.0371 8.09995 15.6415 8.50355 15.1488 8.74773C14.9026 8.13646 14.473 7.61649 13.9193 7.2593C13.3655 6.9021 12.7146 6.72524 12.0562 6.75303C11.3978 6.78082 10.7642 7.0119 10.2425 7.41448C9.72078 7.81707 9.3366 8.37139 9.14278 9.00123H4.31578C3.27833 9.00044 2.27537 9.37367 1.49082 10.0525C0.70627 10.7313 0.192719 11.6702 0.0443437 12.697C-0.104032 13.7237 0.122712 14.7696 0.682996 15.6427C1.24328 16.5159 2.09955 17.1578 3.09478 17.4507C3.26169 18.1279 3.64598 18.7316 4.18877 19.1695C4.73155 19.6074 5.40292 19.8552 6.10003 19.8752C6.79714 19.8951 7.48156 19.6859 8.04846 19.2797C8.61536 18.8735 9.03348 18.2927 9.23878 17.6262H16.5363C16.2213 17.9172 15.9903 17.9802 15.9408 17.9802C15.6921 17.9802 15.4537 18.079 15.2779 18.2548C15.102 18.4306 15.0033 18.6691 15.0033 18.9177C15.0033 19.1664 15.102 19.4048 15.2779 19.5806C15.4537 19.7565 15.6921 19.8552 15.9408 19.8552C16.7313 19.8552 17.4513 19.3677 17.9403 18.8772C18.4263 18.3927 18.8553 17.7387 19.0623 17.0337C19.1067 16.9242 19.1291 16.8069 19.1283 16.6887V16.6782C19.1293 16.5983 19.1198 16.5186 19.0998 16.4412C18.9108 15.6837 18.4578 14.9757 17.9403 14.4582C17.4498 13.9692 16.7313 13.4802 15.9408 13.4802C15.6921 13.4802 15.4537 13.579 15.2779 13.7548C15.102 13.9306 15.0033 14.1691 15.0033 14.4177C15.0033 14.6664 15.102 14.9048 15.2779 15.0806C15.4537 15.2565 15.6921 15.3552 15.9408 15.3552C15.9918 15.3552 16.2423 15.4242 16.5798 15.7512H9.23878C9.04495 15.1214 8.66077 14.5671 8.13905 14.1645C7.61734 13.7619 6.98372 13.5308 6.32532 13.503C5.66692 13.4752 5.01608 13.6521 4.4623 14.0093C3.90851 14.3665 3.47898 14.8865 3.23278 15.4977C2.74139 15.2526 2.34711 14.8488 2.11374 14.3517C1.88037 13.8547 1.82157 13.2934 1.94686 12.7587C2.07215 12.2241 2.37419 11.7474 2.80411 11.4057C3.23402 11.0641 3.76665 10.8775 4.31578 10.8762H9.14278C9.34807 11.5427 9.76619 12.1235 10.3331 12.5297C10.9 12.9359 11.5844 13.1451 12.2815 13.1252C12.9786 13.1052 13.65 12.8574 14.1928 12.4195C14.7356 11.9816 15.1199 11.3779 15.2868 10.7007C16.2799 10.4058 17.1338 9.7633 17.6923 8.89068C18.2507 8.01807 18.4765 6.97361 18.3283 5.94823C18.1802 4.92286 17.6679 3.98505 16.8853 3.30623C16.1026 2.62741 15.1018 2.25293 14.0658 2.25123H9.23878C9.03822 1.59938 8.63398 1.029 8.08539 0.623822C7.53681 0.21864 6.87277 0 6.19078 0C5.50878 0 4.84474 0.21864 4.29616 0.623822C3.74757 1.029 3.34333 1.59938 3.14278 2.25123ZM4.87828 16.6887V16.6677C4.88105 16.3206 5.02127 15.9886 5.26824 15.7446C5.51521 15.5006 5.8488 15.3643 6.19598 15.3657C6.54317 15.3671 6.87566 15.506 7.12066 15.752C7.36567 15.998 7.50323 16.331 7.50323 16.6782C7.50323 17.0254 7.36567 17.3585 7.12066 17.6044C6.87566 17.8504 6.54317 17.9893 6.19598 17.9907C5.8488 17.9921 5.51521 17.8559 5.26824 17.6119C5.02127 17.3678 4.88105 17.0359 4.87828 16.6887ZM12.1908 8.62623C12.9078 8.62623 13.4913 9.20223 13.5033 9.91623V9.93873C13.5033 10.1983 13.4263 10.4521 13.2821 10.6679C13.1379 10.8838 12.9329 11.052 12.693 11.1513C12.4532 11.2507 12.1893 11.2767 11.9347 11.226C11.6801 11.1754 11.4463 11.0504 11.2627 10.8668C11.0791 10.6832 10.9541 10.4494 10.9035 10.1948C10.8529 9.94018 10.8788 9.67628 10.9782 9.43646C11.0775 9.19663 11.2457 8.99164 11.4616 8.84742C11.6774 8.7032 11.9312 8.62623 12.1908 8.62623Z" fill="white" />
                    </svg>

                    Generate Roadmap
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
