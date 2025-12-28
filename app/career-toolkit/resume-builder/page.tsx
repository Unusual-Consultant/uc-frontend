"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wand2, Loader2 } from "lucide-react";
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
import ToolkitActionButton from "../components/toolkit-action-button";
import { API_BASE_URL } from "@/lib/api";

interface ResumeTemplate {
  id: string;
  industry: string;
  role: string;
  experience_level: string;
  include_photo: boolean;
  image_path: string;
  pdf_path: string | null;
  word_path: string | null;
  name: string | null;
  description: string | null;
}

export default function AIResumeTemplateBuilder() {
  const [selectedIndustry, setSelectedIndustry] = useState("Select Industry");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [selectedExperience, setSelectedExperience] = useState("Select Experience Level");
  const [includePhoto, setIncludePhoto] = useState(false);

  const [showTemplates, setShowTemplates] = useState(false);
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalUses] = useState(5);
  const [usesRemaining, setUsesRemaining] = useState(5);
  const [userId, setUserId] = useState<string | null>(null);

  // Dynamic options from backend
  const [industryOptions, setIndustryOptions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);

  // Fetch user ID, usage stats, and filter options on mount
  useEffect(() => {
    // Get user ID from localStorage or session
    const storedUserId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUsageStats(storedUserId);
    }

    // Fetch filter options from backend
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      // Fetch industries
      const industriesRes = await fetch(`${API_BASE_URL}/resume-templates/templates/industries`);
      if (industriesRes.ok) {
        const industriesData = await industriesRes.json();
        setIndustryOptions(industriesData.industries || []);
      }

      // Fetch roles
      const rolesRes = await fetch(`${API_BASE_URL}/resume-templates/templates/roles`);
      if (rolesRes.ok) {
        const rolesData = await rolesRes.json();
        setRoles(rolesData.roles || []);
      }

      // Fetch experience levels
      const experienceRes = await fetch(`${API_BASE_URL}/resume-templates/templates/experience-levels`);
      if (experienceRes.ok) {
        const experienceData = await experienceRes.json();
        setExperience(experienceData.experience_levels || []);
      }
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  };

  const fetchUsageStats = async (uid: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-career-toolkit-usage/usage?user_id=${uid}`);
      if (response.ok) {
        const data = await response.json();
        setUsesRemaining(data.remaining_usage);
      }
    } catch (err) {
      console.error("Failed to fetch usage stats:", err);
    }
  };

  const incrementUsage = async () => {
    if (!userId) {
      console.warn("Cannot increment usage: userId is not set");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/ai-career-toolkit-usage/usage/increment?user_id=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool_type: "resume_template_builder",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usage incremented:", data);
        if (data.remaining_usage !== undefined) {
          setUsesRemaining(data.remaining_usage);
        } else {
          console.error("Invalid response format:", data);
          // Fallback: refresh usage stats
          await fetchUsageStats(userId);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to increment usage:", response.status, errorData);
      }
    } catch (err) {
      console.error("Failed to increment usage:", err);
    }
  };

  const handleGenerate = async () => {
    // Validate selections
    if (selectedIndustry === "Select Industry" || selectedRole === "Select Role" || selectedExperience === "Select Experience Level") {
      setError("Please select Industry, Role, and Experience Level");
      return;
    }

    if (usesRemaining <= 0) {
      setError("You have reached your usage limit. Please upgrade to continue.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowTemplates(false);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedIndustry !== "Select Industry") params.append("industry", selectedIndustry);
      if (selectedRole !== "Select Role") params.append("role", selectedRole);
      if (selectedExperience !== "Select Experience Level") params.append("experience_level", selectedExperience);
      params.append("include_photo", includePhoto.toString());

      const response = await fetch(`${API_BASE_URL}/resume-templates/templates?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }

      const data = await response.json();
      setTemplates(data.templates || []);
      setShowTemplates(true);

      // Increment usage only if templates were successfully fetched
      // (Even if empty results, it still counts as a use since the API call succeeded)
      if (userId) {
        await incrementUsage();
        // Refresh usage stats to ensure UI is updated
        await fetchUsageStats(userId);
      } else {
        console.warn("Cannot increment usage: userId is not set. User may not be logged in.");
      }

      if (!data.templates || data.templates.length === 0) {
        setError("No templates found matching your criteria. Please try different filters.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch templates");
      console.error("Error fetching templates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // We no longer need a static role→skills mapping.

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
            className="w-full h-[2.625rem] justify-between rounded-xl border border-gray-300 text-[0.8125rem] text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
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
                "flex justify-between items-center px-3 py-2 rounded-md text-[0.8125rem] cursor-pointer transition-colors",
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


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center px-6 py-10 space-y-8">
      {/* ===== Header Box ===== */}
      <div className="w-full max-w-[77.5rem] bg-[#EDF7FF] rounded-2xl p-8 flex flex-col md:flex-row md:items-start md:justify-between shadow-[0_10px_0_#E3F2FF] relative">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[3.25rem] font-semibold text-gray-900 leading-tight">
            <span className="text-[#0073CF]">AI Resume Template</span> Builder
          </h1>
          <p className="text-black text-xl md:text-[1.375rem] whitespace-nowrap">
            Generate and customize professional resume templates
          </p>
        </div>

        <div className={cn(
          "bg-[#0073CF] text-white rounded-full px-6 py-3 shadow-md transition-all flex items-center gap-2 absolute md:static top-[-20px] right-8 md:top-auto md:right-auto"
        )}>
          <Image
            src="/sparkle-filled.png"
            alt="sparkle"
            width={20}
            height={20}
            className="object-contain"
          />
          {usesRemaining} of {totalUses} free uses remaining
        </div>
      </div>

      {/* ===== Form Box ===== */}
      <Card className="w-full max-w-[77.5rem] shadow-[0_4px_12px_#9F9D9D40] rounded-2xl mx-auto">
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
                      className={`text-[0.6875rem] font-bold select-none transition-all duration-150
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Generate Templates Button */}
          <div className="flex justify-end">
            <ToolkitActionButton
              onClick={handleGenerate}
              disabled={usesRemaining <= 0}
              isLoading={isLoading}
              loadingText="Generating..."
              icon={<Wand2 className="w-5 h-5" />}
            >
              Generate Templates
            </ToolkitActionButton>
          </div>
        </CardContent>
      </Card>

      {/* ===== Templates Section ===== */}
      {showTemplates && templates.length > 0 && (
        <>
          <Card className="w-full max-w-[77.5rem] bg-[#E8F2FD] rounded-xl border border-[#C5D9F2] shadow-sm p-8 mt-8">
            <CardContent>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpenText className="w-6 h-6" />
                Templates for you
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] justify-items-center">
                {templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ===== AI Recommended Mentors Section ===== */}
          {selectedRole !== "Select Role" && (
            <SuggestedMentorsPage
              skills={[]}
              role={selectedRole}
            />
          )}
        </>
      )}
    </div>
  );
}

// === Reusable Template Card ===
function TemplateCard({ template }: { template: ResumeTemplate }) {
  const [shouldLoadPdf, setShouldLoadPdf] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lazy load PDF only when card is in viewport, with staggered loading
  useEffect(() => {
    if (!template.pdf_path || shouldLoadPdf) return;

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay to prevent all PDFs loading at once
            // This prevents browsers from trying to download multiple files
            const delay = Math.random() * 500; // 0-500ms random delay
            timeoutId = setTimeout(() => {
              setShouldLoadPdf(true);
            }, delay);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [template.pdf_path, shouldLoadPdf]);

  // Helper function to normalize PDF path for backend endpoint
  // Backend expects: /templates/{file_path} where file_path is relative to templates folder
  const normalizePdfPath = (path: string | null): string | null => {
    if (!path) return null;

    // If it's a full URL, use it directly
    if (path.startsWith('http')) {
      return path;
    }

    // Remove leading /templates/ if present, as backend endpoint already includes /templates/
    let normalizedPath = path;
    if (normalizedPath.startsWith('/templates/')) {
      normalizedPath = normalizedPath.replace('/templates/', '');
    } else if (normalizedPath.startsWith('templates/')) {
      normalizedPath = normalizedPath.replace('templates/', '');
    }

    // Remove leading slash if still present
    if (normalizedPath.startsWith('/')) {
      normalizedPath = normalizedPath.substring(1);
    }

    return normalizedPath;
  };

  // Get PDF URL for embedding (preview)
  const getPdfUrl = () => {
    const normalizedPath = normalizePdfPath(template.pdf_path);
    if (!normalizedPath) return null;

    // If it's already a full URL, return as is
    if (normalizedPath.startsWith('http')) {
      return normalizedPath;
    }

    // Backend serves PDFs at root level /templates/...
    const baseUrl = API_BASE_URL.replace('/api/v1', '');
    return `${baseUrl}/templates/${normalizedPath}`;
  };

  // Get PDF URL for download (with download parameter)
  const getDownloadUrl = () => {
    const normalizedPath = normalizePdfPath(template.pdf_path);
    if (!normalizedPath) return null;

    // If it's already a full URL, add download parameter
    if (normalizedPath.startsWith('http')) {
      const url = new URL(normalizedPath);
      url.searchParams.set('download', 'true');
      return url.toString();
    }

    // Backend serves PDFs at root level /templates/...
    const baseUrl = API_BASE_URL.replace('/api/v1', '');
    return `${baseUrl}/templates/${normalizedPath}?download=true`;
  };

  // Handle direct PDF download
  const handleDownload = () => {
    const downloadUrl = getDownloadUrl();
    if (!downloadUrl) {
      console.error('No PDF path available for download');
      return;
    }

    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = template.name ? `${template.name}.pdf` : 'resume-template.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pdfUrl = shouldLoadPdf ? getPdfUrl() : null;

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center bg-white rounded-3xl shadow-[0_0_15px_#C4E1FF] w-[20.625rem] h-[28.125rem] p-[0.9375rem_1.125rem] transition-transform hover:scale-[1.02]"
    >
      <div className="relative w-full h-[23.75rem] overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full rounded-2xl border-0"
            title={template.name || `Template ${template.id}`}
            style={{ minHeight: '380px' }}
            loading="lazy"
          />
        ) : template.pdf_path ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">Loading preview...</div>
              <div className="text-gray-300 text-xs">PDF will appear shortly</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">PDF not available</div>
              <div className="text-gray-300 text-xs">No preview to display</div>
            </div>
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex gap-3 mt-4">
        <Button
          onClick={handleDownload}
          className="bg-white text-[#0073CF] border border-[#C4E1FF] rounded-full px-5 py-2 text-sm font-medium shadow-sm hover:bg-[#F0F8FF]"
          disabled={!template.pdf_path}
        >
          Download
        </Button>

        <Button className="bg-white text-[#0073CF] border border-[#C4E1FF] rounded-full px-5 py-2 text-sm font-medium shadow-sm hover:bg-[#F0F8FF]">
          Mail
        </Button>
      </div>
    </div>
  );
}
