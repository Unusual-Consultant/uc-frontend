"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wand2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ChevronDown, BookOpenText, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch"; // ✅ Add ShadCN switch
import Link from "next/link";
import { SuggestedMentorsPage } from "../components/suggested_mentors";

const industryOptions = [
  "Technology",
  "Finance",
  "Marketing",
  "Design",
  "Healthcare",
  "Education",
  "Consulting",
];

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
];

const experience = [
  "Student/Intern",
  "Entry-Level (0–2 yrs)",
  "Mid-Level (3–5 yrs)",
  "Senior (6–10 yrs)",
  "Executive (10+ yrs)",
];

export default function AIResumeTemplateBuilder() {
  const [selectedIndustry, setSelectedIndustry] = useState("Select Industry");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [selectedExperience, setSelectedExperience] = useState("Select Experience Level");
  const [includePhoto, setIncludePhoto] = useState(false);

  const [showTemplates, setShowTemplates] = useState(false);
  const [totalUses] = useState(5);
  const [usesRemaining, setUsesRemaining] = useState(5);

  const handleStart = () => {
    if (usesRemaining > 0) setUsesRemaining((prev) => prev - 1);
  };

  const handleGenerate = () => {
    setShowTemplates(true);
  };

  // --- Reusable dropdown ---
  const Dropdown = ({
    label,
    options,
    selected,
    onSelect,
  }: {
    label: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
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
          className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[180px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
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
  );

  // Mock resume templates
  const templates = [
    { id: 1, image: "/template1.png", pdf: "/template1.pdf", word: "/template1.docx" },
    { id: 2, image: "/template2.png", pdf: "/template2.pdf", word: "/template2.docx" },
    { id: 3, image: "/template3.png", pdf: "/template3.pdf", word: "/template3.docx" },
    { id: 4, image: "/template4.png", pdf: "/template4.pdf", word: "/template4.docx" },
    { id: 5, image: "/template5.png", pdf: "/template5.pdf", word: "/template5.docx" },
    { id: 6, image: "/template6.png", pdf: "/template6.pdf", word: "/template6.docx" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== Header Box ===== */}
      <div className="w-full max-w-5xl bg-[#EDF7FF] rounded-2xl p-8 flex flex-col md:flex-row md:items-start md:justify-between shadow-[0_10px_0_#E3F2FF] relative">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[52px] font-semibold text-gray-900 leading-tight">
            <span className="text-[#0073CF]">AI Resume Template</span> Builder
          </h1>
          <p className="text-black text-[20px] md:text-[22px] whitespace-nowrap">
            Generate and customize professional resume templates
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
      <Card className="w-full max-w-5xl shadow-[0_4px_12px_#9F9D9D40] rounded-2xl mx-auto">
  <CardContent className="p-8 space-y-8">
    {/* Filters Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end">
      <Dropdown
        label="Industry"
        options={industryOptions}
        selected={selectedIndustry}
        onSelect={setSelectedIndustry}
      />
      <Dropdown
        label="Role"
        options={roles}
        selected={selectedRole}
        onSelect={setSelectedRole}
      />
      <Dropdown
        label="Experience Level"
        options={experience}
        selected={selectedExperience}
        onSelect={setSelectedExperience}
      />

      {/* ✅ Include Photo (Aligned Label) */}
      <div className="flex flex-col justify-end space-y-2 mt-[2px]">
  <Label className="text-black font-medium leading-tight">Include Photo</Label>
  <div className="flex items-center space-x-3 mt-[2px]">
    <button
      onClick={() => setIncludePhoto(!includePhoto)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-150
        ${includePhoto ? "bg-green-500" : "bg-gray-300"}`}
    >
      <span
        className={`inline-flex h-6 w-6 transform rounded-full bg-white shadow-sm transition-all duration-150
          ${includePhoto ? "translate-x-4" : "translate-x-0"} items-center justify-center`}
      >
        <span
          className={`text-[11px] font-bold select-none transition-all duration-150
            ${includePhoto ? "text-green-400" : "text-gray-400"}`}
        >
          {includePhoto ? "✓" : "×"}
        </span>
      </span>
    </button>
    <span className="text-sm text-gray-700">
      {includePhoto ? "Yes" : "No"}
    </span>
  </div>
</div>

    </div>

    {/* Generate Templates Button */}
    <div className="flex justify-end">
      <Button
        onClick={handleGenerate}
        className="flex items-center gap-2 bg-[#0070E0] hover:bg-[#005FC2] shadow-[0_4px_0_#0C5CAC] text-white rounded-full px-8 py-3 text-[16px] font-semibold transition"
      >
        <Wand2 className="w-5 h-5" />
        Generate Templates
      </Button>
    </div>
  </CardContent>
</Card>

      {/* ===== Templates Section ===== */}
      {showTemplates && (
  <Card className="w-full max-w-6xl bg-[#E8F2FD] rounded-[12px] border border-[#C5D9F2] shadow-sm p-8 mt-8">
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] justify-items-center">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </CardContent>
  </Card>
)}


      <SuggestedMentorsPage />
    </div>
  );
}

// === Reusable Template Card ===
function TemplateCard({ template }: { template: { id: number; image: string; pdf: string; word: string } }) {
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  
    return (
      <div
        key={template.id}
        className="relative flex flex-col items-center bg-white rounded-[24px] shadow-[0_0_15px_#C4E1FF] w-[330px] h-[450px] p-[15px_18px] transition-transform hover:scale-[1.02]"
      >
        <div className="relative w-full h-[380px] overflow-hidden rounded-[18px]">
          <Image
            src={template.image}
            alt={`Template ${template.id}`}
            fill
            className="object-cover rounded-[18px]"
          />
        </div>
  
        {/* Buttons Section */}
        <div className="flex gap-3 mt-4 relative">
          <div className="relative">
            <Button
              onClick={() => setShowDownloadOptions((prev) => !prev)}
              className="bg-white text-[#0073CF] border border-[#C4E1FF] rounded-full px-5 py-2 text-sm font-medium shadow-sm hover:bg-[#F0F8FF]"
            >
              Download
            </Button>
  
            {showDownloadOptions && (
              <div className="absolute top-[110%] left-0 bg-white border border-[#C4E1FF] rounded-xl shadow-md overflow-hidden z-10">
                <Link
                  href={template.pdf}
                  target="_blank"
                  className="block px-4 py-2 text-sm text-[#0073CF] hover:bg-[#F0F8FF]"
                >
                  Download PDF
                </Link>
                <Link
                  href={template.word}
                  target="_blank"
                  className="block px-4 py-2 text-sm text-[#0073CF] hover:bg-[#F0F8FF]"
                >
                  Download Word
                </Link>
              </div>
            )}
          </div>
  
          <Button className="bg-white text-[#0073CF] border border-[#C4E1FF] rounded-full px-5 py-2 text-sm font-medium shadow-sm hover:bg-[#F0F8FF]">
            Mail
          </Button>
        </div>
      </div>
    );
  }
  