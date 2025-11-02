"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import template1 from "./resume_templates/Analyst_1.jpg";
import { Wand2, ChevronDown, Check, Download, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const templates = [
    { id: 1, image: template1, pdf: "/template1.pdf", word: "/template1.docx" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== Header ===== */}
      <div className="w-full max-w-6xl bg-[#EDF7FF] rounded-2xl p-8 flex flex-col md:flex-row md:items-start md:justify-between shadow-[0_10px_0_#E3F2FF] relative">
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
          className="bg-[#0073CF] hover:bg-[#005FA3] text-white rounded-full px-6 py-3 shadow-md transition-all flex items-center gap-2 absolute md:static top-[-20px] right-8"
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
      <Card className="w-full max-w-6xl shadow-[0_4px_12px_#9F9D9D40] rounded-2xl mx-auto">
  <CardContent className="p-8 space-y-8">
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">

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
      <div className="flex flex-col space-y-2">
  <Label className="text-black font-medium leading-tight">Include Photo</Label>
  <div className="flex items-center space-x-3">
    <button
      onClick={() => setIncludePhoto(!includePhoto)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-150 ${
        includePhoto ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-flex h-6 w-6 transform rounded-full bg-white shadow-sm transition-all duration-150 ${
          includePhoto ? "translate-x-4" : "translate-x-0"
        } items-center justify-center`}
      >
        <span
          className={`text-[11px] font-bold select-none transition-all duration-150 ${
            includePhoto ? "text-green-400" : "text-gray-400"
          }`}
        >
          {includePhoto ? "✓" : "×"}
        </span>
      </span>
    </button>
    <span className="text-sm text-gray-700">{includePhoto ? "Yes" : "No"}</span>
  </div>
</div>
</div>

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

// === Template Card ===
function TemplateCard({
  template,
}: {
  template: { id: number; image: any; pdf: string; word: string };
}) {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  return (
    <div className="relative flex flex-col items-center bg-white rounded-[24px] w-[330px] h-[450px] p-[15px_18px] transition-transform hover:scale-[1.02]">
      {/* Image with glow */}
      <div className="relative w-full h-[380px] overflow-hidden rounded-[18px] border-[3px] border-[#C4E1FF] shadow-[0_0_20px_#C4E1FF80] transition-all">
        <Image
          src={template.image}
          alt={`Template ${template.id}`}
          fill
          className="object-cover rounded-[15px]"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4 relative">
        {/* Download Button */}
        <div className="relative">
  <Button
    onClick={() => setShowDownloadOptions((prev) => !prev)}
    className={cn(
      "flex flex-col items-center justify-center bg-white text-black border border-[#D1D5DB] rounded-full text-[12px] font-medium shadow-[0_2px_6px_#60606040] hover:bg-[#F8F9FA] transition-all duration-200 overflow-hidden",
      showDownloadOptions
        ? "h-[64px] px-4 py-[4px]"
        : "h-[28px] px-4 py-[3px]"
    )}
  >
    {!showDownloadOptions ? (
      <div className="flex items-center gap-1">
        <Download className="w-3.5 h-3.5" />
        Download
      </div>
    ) : (
      <div className="flex flex-col items-center space-y-[2px] w-full text-[12px] font-medium">
      <Link
  href={template.pdf}
  target="_blank"
  className="flex justify-center items-center gap-1 w-full hover:text-[#0073CF] transition"
>
  <Image
    src="/pdf_icon.png"  
    alt="PDF"
    width={14}
    height={14}
    className="object-contain"
  />
  Download PDF
</Link>
        <div className="w-[70%] h-[1px] bg-gray-300" />
        <Link
          href={template.word}
          target="_blank"
          className="flex justify-center items-center gap-1 w-full hover:text-[#0073CF] transition"
        >
            <Image
    src="/word_icon.png"  
    alt="PDF"
    width={14}
    height={14}
    className="object-contain"
  /> Download Word
        </Link>
      </div>
    )}
  </Button>
</div>


        {/* Mail Button */}
        <Button className="flex items-center justify-center gap-1 bg-white text-black border border-[#D1D5DB] rounded-full w-[130px] h-[28px] text-[12px] font-medium shadow-[0_2px_6px_#60606040] hover:bg-[#F8F9FA] transition-all">
    <Mail className="w-3.5 h-3.5" />
    Send to Mail
  </Button>
      </div>
    </div>
  );
}
