"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { SuggestedMentorsPage } from "../components/suggested_mentors";
import { CompanyAlignedMentors } from "../components/company-mentors";
import { API_BASE_URL } from "@/lib/api";

interface RoadmapStep {
  duration: string;
  title: string;
  description: string;
  resources: string[];
}




export default function AIRoadmap() {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("")
  const [toolInput, setToolInput] = useState<string>("")
  const [skillError, setSkillError] = useState<string | null>(null)
  const [toolError, setToolError] = useState<string | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<string>("Select Experience Level")
  const [selectedEducation, setSelectedEducation] = useState<string>("Select Education Level")
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("Select Time Frame")
  const [desiredRole, setDesiredRole] = useState<string>("")
  const [targetCompany, setTargetCompany] = useState<string>("")
  const [roadmapData, setRoadmapData] = useState<{ summary: string, steps: RoadmapStep[] } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalUses] = useState(5)
  const [usesRemaining, setUsesRemaining] = useState(5)

  // ✅ Toggle selection helper
  const toggleTag = (tag: string, type: "skill" | "tool") => {
    if (type === "skill") {
      setSelectedSkills((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    } else {
      setSelectedTools((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  // ✅ Add custom skill/tool
  const handleAddItem = (type: "skill" | "tool") => {
    if (type === "skill") {
      const trimmed = skillInput.trim();
      if (!trimmed) return;
      if (trimmed.length > 50) { setSkillError("Can't enter more than 50 characters"); return; }
      if (selectedSkills.length >= 15) { setSkillError("Maximum 15 skills allowed"); return; }
      if (!selectedSkills.includes(trimmed)) {
        setSelectedSkills((prev) => [...prev, trimmed]);
      }
      setSkillInput("");
      setSkillError(null);
      return;
    }
    if (type === "tool") {
      const trimmed = toolInput.trim();
      if (!trimmed) return;
      if (trimmed.length > 50) { setToolError("Can't enter more than 50 characters"); return; }
      if (selectedTools.length >= 15) { setToolError("Maximum 15 tools allowed"); return; }
      if (!selectedTools.includes(trimmed)) {
        setSelectedTools((prev) => [...prev, trimmed]);
      }
      setToolInput("");
      setToolError(null);
      return;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: "skill" | "tool") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "skill" && skillInput.trim().length > 50) {
        setSkillError("Can't enter more than 50 characters");
        return;
      }
      if (type === "tool" && toolInput.trim().length > 50) {
        setToolError("Can't enter more than 50 characters");
        return;
      }
      handleAddItem(type);
    }
  };

  // ✅ Remove item helper
  const removeItem = (item: string, type: "skill" | "tool") => {
    if (type === "skill") {
      setSelectedSkills((prev) => prev.filter((t) => t !== item));
    } else {
      setSelectedTools((prev) => prev.filter((t) => t !== item));
    }
  };

  const handleStart = () => {
    if (usesRemaining > 0) setUsesRemaining((prev) => prev - 1)
  }

  const generateRoadmap = async () => {
    // Validate required fields
    if (selectedExperience === "Select Experience Level" ||
      selectedEducation === "Select Education Level" ||
      selectedTimeFrame === "Select Time Frame") {
      setError("Please select all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setShowRoadmap(false)

    try {
      const response = await fetch(`${API_BASE_URL}/career-roadmap/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experience_level: selectedExperience,
          education: selectedEducation,
          desired_role: desiredRole || null,
          current_skills: selectedSkills,
          tools: selectedTools,
          time_frame: selectedTimeFrame,
          target_company: targetCompany || null
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Set the roadmap data
      setRoadmapData({
        summary: data.roadmap_summary,
        steps: data.steps
      })

      // Show the roadmap
      setShowRoadmap(true)

      // Decrement usage
      if (usesRemaining > 0) {
        setUsesRemaining((prev) => prev - 1)
      }
    } catch (error) {
      console.error("Error generating roadmap:", error)
      setError("Failed to generate roadmap. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  const education = ["High School", "Bachelor's Degree", "Master's Degree", "PhD"]
  const skills = ["React", "Next.js", "Node.js", "Tailwind", "MongoDB"];
  const tools = ["VS Code", "GitHub", "Postman", "Figma", "Docker"];
  const experience = ["Student/Intern", "Entry-Level (0–2 yrs)", "Mid-Level (3–5 yrs)", "Senior (6–10 yrs)", "Executive (10+ yrs)"]


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== Header Box ===== */}
      <div className="w-full max-w-[1240px] bg-[#EDF7FF] rounded-2xl p-8 flex flex-col shadow-[0_10px_0_#E3F2FF]">

        {/* Title */}
        <h1 className="text-[40px] md:text-[52px] font-semibold text-gray-900 leading-tight">
          <span className="text-[#0073CF]">AI Career Roadmap</span> Generator
        </h1>

        {/* Subheading + Button row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-2 space-y-3 md:space-y-0">
          <p className="text-black text-[18px] md:text-[20px]">
            Get a personalized step-by-step plan to achieve your career goals
          </p>

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
      </div>



      {/* ===== Form Box ===== */}
      <Card className="w-full max-w-[1240px] shadow-[0_4px_12px_#9F9D9D40] rounded-2xl">

        <CardContent className="p-8 space-y-8">
          {/* ===== Dropdown Section ===== */}
          <div className="grid text-[20px] md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <Dropdown
              label="Experience Level"
              className="w-full max-w-[350px]"
              options={experience}
              selected={selectedExperience}
              onSelect={setSelectedExperience}
            />
            <Dropdown
              label="Highest Education"
              className="w-full max-w-[350px]"
              options={education}
              selected={selectedEducation}
              onSelect={setSelectedEducation}
            />
            <div className="flex flex-col space-y-2 lg:col-span-2 w-full max-w-[720px]">
              <Label className="text-black font-medium text-[20px]">
                Desired Role <span className="text-black">(optional)</span>
              </Label>
              <Input
                placeholder="e.g. Product Manager, Data Scientist..."
                className="rounded-xl border border-gray-300 w-full text-[20px]"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
              />
            </div>
          </div>


          {/* ===== Key Skills & Tools ===== */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Key Skills */}
            <div className="flex flex-col space-y-3">
              <Label className="text-black font-medium text-[20px]">
                Key Skills
              </Label>
              {/* Input for adding custom skills */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type and press Enter (e.g. React, Node.js, SQL...)"
                  value={skillInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSkillInput(val);
                    if (val.trim().length > 50) {
                      setSkillError("Can't enter more than 50 characters");
                    } else if (selectedSkills.length >= 15) {
                      setSkillError("Maximum 15 skills allowed");
                    } else {
                      setSkillError(null);
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "skill")}
                  className={`rounded-xl border w-full ${skillError ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
                />
                <Button
                  onClick={() => handleAddItem("skill")}
                  className="bg-[#0073CF] text-white px-6 rounded-xl hover:bg-[#005FA3]"
                >
                  Add
                </Button>
              </div>
              {skillError && (
                <p className="text-xs text-red-600 mt-1">{skillError}</p>
              )}
              {/* Suggested tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((tag) => {
                  const isSelected = selectedSkills.includes(tag);
                  return (
                    <span
                      key={tag}
                      onClick={() => toggleTag(tag, "skill")}
                      className={`px-3 py-1 border rounded-full text-sm cursor-pointer transition ${isSelected
                        ? "bg-[#0073CF] text-white border-[#0073CF]"
                        : "border-[#C7C7C7] text-gray-800 hover:bg-gray-100"
                        }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              {/* Selected skills with remove option */}
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <p className="text-sm text-gray-600 w-full">Your Skills:</p>
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#0073CF] text-white rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeItem(skill, "skill")}
                        className="ml-2 hover:bg-[#005FA3] rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Familiar Tools */}
            <div className="flex flex-col space-y-3">
              <Label className="text-black font-medium text-[20px]">
                Familiar Tools
              </Label>
              {/* Input for adding custom tools */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type and press Enter (e.g. VS Code, GitHub, Figma...)"
                  value={toolInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setToolInput(val);
                    if (val.trim().length > 50) {
                      setToolError("Can't enter more than 50 characters");
                    } else if (selectedTools.length >= 15) {
                      setToolError("Maximum 15 tools allowed");
                    } else {
                      setToolError(null);
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "tool")}
                  className={`rounded-xl border w-full ${toolError ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300"}`}
                />
                <Button
                  onClick={() => handleAddItem("tool")}
                  className="bg-[#0073CF] text-white px-6 rounded-xl hover:bg-[#005FA3]"
                >
                  Add
                </Button>
              </div>
              {toolError && (
                <p className="text-xs text-red-600 mt-1">{toolError}</p>
              )}
              {/* Suggested tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {tools.map((tag) => {
                  const isSelected = selectedTools.includes(tag);
                  return (
                    <span
                      key={tag}
                      onClick={() => toggleTag(tag, "tool")}
                      className={`px-3 py-1 border rounded-full text-sm cursor-pointer transition ${isSelected
                        ? "bg-[#0073CF] text-white border-[#0073CF]"
                        : "border-[#C7C7C7] text-gray-800 hover:bg-gray-100"
                        }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              {/* Selected tools with remove option */}
              {selectedTools.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <p className="text-sm text-gray-600 w-full">Your Tools:</p>
                  {selectedTools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-[#0073CF] text-white rounded-full text-sm flex items-center gap-2"
                    >
                      {tool}
                      <button
                        onClick={() => removeItem(tool, "tool")}
                        className="ml-2 hover:bg-[#005FA3] rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* ===== Bottom Row ===== */}
          <div className="flex flex-col md:flex-row justify-start items-center gap-6 pt-4 w-full ">
            <div className="flex items-center gap-6 w-full">
              {/* Time Frame Dropdown */}
              <Dropdown
                label="Tageted Time Frame"
                options={["6–12 months", "12–18 months"]}
                selected={selectedTimeFrame}
                onSelect={setSelectedTimeFrame}
                className="w-full md:w-[350px] "
              />

              {/* Target Company Input */}
              <div className="flex flex-col space-y-1 w-full md:w-[350px] ">
                <Label className="text-black font-medium text-[20px]">Target Company(Optional)</Label>
                <Input
                  placeholder="e.g. Microsoft"
                  className="rounded-xl border border-gray-300 w-full"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                />
              </div>
            </div>


            <Button
              onClick={generateRoadmap}
              disabled={isLoading}
              className="flex items-center gap-2 bg-[#0070E0] hover:bg-[#005FC2] shadow-[0_4px_0_#0C5CAC] text-white rounded-full px-8 py-3 text-lg font-semibold transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : (
                <>
                  <Route />
                  Generate Roadmap
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===== Roadmap Section ===== */}
      {showRoadmap && (
        <Card className="w-full max-w-[1240px] rounded-2xl shadow-[0_4px_12px_#9F9D9D40] bg-white mx-auto">
          <CardContent className="p-8 text-gray-500 text-lg ">

            {/* ===== Roadmap Summary Heading ===== */}
            <h2 className="text-[24px] font-bold text-[#003C6C] mb-4">Roadmap Summary</h2>

            {/* ===== Gray box for Summary (keeps results inside) ===== */}
            <div className="bg-gray-100 rounded-xl p-6 mb-8 text-black text-base leading-relaxed border border-[#C7C7C7]">
              <p>
                {roadmapData?.summary || "This roadmap provides a step-by-step journey to achieving your career goals..."}
              </p>
            </div>

            {/* ===== Step-by-Step Journey Heading ===== */}
            <h2 className="text-[24px] font-bold text-[#003C6C] mb-4">Step-by-step Journey</h2>

            {/* ===== Gray box for Steps ===== */}
            <div className="bg-gray-100 rounded-xl p-6 relative overflow-hidden min-h-[1100px] border border-[#C7C7C7]">

              <div className="absolute left-8 top-0 bottom-0 pointer-events-none">
                {/* Put your image at /public/roadmap-line.svg */}
                <img
                  src="/Roadmap illustration.svg"
                  alt="Roadmap line"
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* ==== Step Cards (kept as before) ==== */}
              <div className="flex flex-col ml-[200px] mt-[120px]">
                {roadmapData?.steps?.map((step, index) => (
                  <div key={index} className={`${index === 0 ? "mt-0" : index === 1 ? "mt-[160px]" : index === 2 ? "mt-[160px]" : "mt-[160px]"} ${index === 3 ? "mb-[90px]" : ""}`}>
                    <StepArrowBox
                      title={step.title}
                      description={step.description}
                      resources={step.resources}
                      duration={step.duration}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showRoadmap && (
        <>
          <SuggestedMentorsPage skills={selectedSkills} role={desiredRole} />
          {targetCompany && (
            <CompanyAlignedMentors company={targetCompany} role={desiredRole} />
          )}
        </>
      )}
    </div>
  );

}

/* === Step Arrow Box === */
function StepArrowBox({
  title,
  description,
  resources,
  duration,
}: {
  title: string;
  description: string;
  resources: string[];
  duration: string;
}) {
  return (
    <div className="relative w-[799px] h-[220px] rounded-2xl overflow-hidden">
      {/* SVG Arrow Shape with Rounded Corners */}
      <svg
        width="799"
        height="220"
        viewBox="0 0 799 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
      >
        <path
          d="M0 110 L40 0 H799 V220 H40 L0 110 Z"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1.5"
          rx="12"
        />
      </svg>

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-center px-12 text-left text-black">
        {/* Duration — top-right corner */}
        <p className="absolute top-4 right-6 text-sm font-semibold text-[#0073CF] bg-[#E8F3FF] px-3 py-1 rounded-full shadow-sm">
          ⏱ {duration}
        </p>

        {/* Title & Description */}
        <h3 className="text-[1.3rem] font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-700 text-[1rem] mb-4" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{description}</p>

        {/* Key Resources List */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Key Resources:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
            {resources.map((res, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#0073CF]"
                >
                  {res}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* === Dropdown Component === */
function Dropdown({
  label,
  options = ["Select Option"],
  selected = "Select Option",
  onSelect = () => { },
  className = "",
}: {
  label: string;
  options?: string[];
  selected?: string;
  onSelect?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <Label className="text-black font-medium text-[20px]">{label}</Label>

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

        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[180px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt}
              className="text-sm text-gray-700 hover:bg-blue-50"
              onClick={() => onSelect(opt)}
            >
              {opt}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
