"use client";

import "@fontsource/mulish";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Briefcase, Verified } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Filter,
  BadgeCheck,
  DollarSign,
  Layers,
  Clock,
  Star,
  Package,
  Users,
  Timer,
  SortDesc,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";

interface MentorFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

export function MentorFilters({ onFiltersChange }: MentorFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isVerified, setIsVerified] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sessionType, setSessionType] = useState<string[]>([]);
  const [packages, setPackages] = useState<string[]>([]);
  const [mentorRatings, setMentorRatings] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);

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
  ];
  const sessionTypes = ["1:1 Session", "Group Session"];
  const packageOptions = [
    "1:1 Mentoring",
    "Resume Review",
    "Mock Interview",
    "Career Guidance",
    "Portfolio Review",
  ];
  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6-10 years)",
    "Executive Level (10+ years)",
  ];

  const ratingOptions = [
    "4★ & Above",
    "3★ & Above",
    "2★ & Above",
    "1★ & Above",
  ];
  const responseOptions = [
    "< 1 Hour",
    "< 24 Hours",
    "Within 3 Days",
    "Within a Week",
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "experience", label: "Most Experienced" },
  ];

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setIsVerified(false);
    setSortBy("relevance");
    setMinPrice(0);
    setMaxPrice(2000);
    setSessionType([]);
    setPackages([]);
    setMentorRatings([]);
    setResponseTime([]);
  };

  const getActiveFiltersCount = () => {
    return (
      sessionType.length +
      packages.length +
      mentorRatings.length +
      responseTime.length +
      (isVerified ? 1 : 0)
    );
  };
  
  const toggleVerified = () => {
    setIsVerified((prev) => !prev);
  };

  return (
    <div className="space-y-8 font-['Mulish']">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-[700] flex items-center gap-2">
          <Filter className="h-6 w-6 text-black" />
          Filters
        </h2>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Verified Mentors Row */}
      <div className="flex items-center justify-between border border-[#C7C7C7] rounded-xl px-5 py-3 bg-white shadow-sm w-full max-w-[400px]">
      {/* Text */}
      <span className="text-[16px] font-[600] font-[Mulish] text-gray-800">
        Verified Mentors only
      </span>

      {/* Twitter-style Switch */}
      <button
        onClick={toggleVerified}
        className="relative flex items-center justify-center w-[70px] h-[32px] rounded-full border-2 border-[#0073CF] bg-white transition-all duration-300 overflow-hidden"
      >
        {/* Toggle background */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isVerified ? "bg-[#0073CF]" : "bg-white"
          }`}
        />

        {/* Verified badge as toggle thumb */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            isVerified ? "translate-x-[18px]" : "-translate-x-[18px]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-all duration-300 ${
              isVerified ? "fill-white" : "fill-[#0073CF]"
            }`}
          >
            <path d="M22 9.54a2.1 2.1 0 0 0-1.36-1.88 2.12 2.12 0 0 1-1.26-1.63 2.09 2.09 0 0 0-2.55-1.76 2.09 2.09 0 0 1-1.9-.57 2.07 2.07 0 0 0-2.94 0 2.09 2.09 0 0 1-1.9.57 2.09 2.09 0 0 0-2.55 1.76 2.12 2.12 0 0 1-1.26 1.63A2.1 2.1 0 0 0 2 9.54a2.09 2.09 0 0 0 1.26 1.87 2.13 2.13 0 0 1 1.26 1.63 2.1 2.1 0 0 0 2.55 1.76 2.09 2.09 0 0 1 1.9.57 2.07 2.07 0 0 0 2.94 0 2.09 2.09 0 0 1 1.9-.57 2.1 2.1 0 0 0 2.55-1.76 2.13 2.13 0 0 1 1.26-1.63A2.1 2.1 0 0 0 22 9.54Z" />
            <path
              d="M10.75 12.75 9 11l1.06-1.06.69.69 2.19-2.19L14 9.5l-3.25 3.25z"
              fill={isVerified ? "#0073CF" : "white"}
            />
          </svg>
        </div>
      </button>

    </div>

      {/* Sort By */}
      <Card className="border border-[#C7C7C7] rounded-lg transition-all duration-300 hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)]">
  <CardHeader className="pb-2">
    <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
      <SortDesc className="h-5 w-5 text-black" />
      Sort By
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="border border-[#C7C7C7] rounded-md bg-white focus:ring-2 focus:ring-[#87CEEB]/40 transition-all">
        <SelectValue placeholder="Select sort option" />
      </SelectTrigger>

      {/* Dropdown content (non-transparent, styled) */}
      <SelectContent className="bg-white border border-[#C7C7C7] shadow-lg rounded-md mt-1">
        {sortOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer hover:bg-[#E0F4FF] transition-colors"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </CardContent>
</Card>


      {/* Price Range */}
      <Card className="border border-[#C7C7C7] rounded-lg transition-all duration-300 hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
          <DollarSign className="h-5 w-5 text-black" />
          Set Price Range (per hour)
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dual Range Slider */}
        <Slider
          value={priceRange}
          onValueChange={(val) => {
            setPriceRange(val);
            setMinPrice(val[0]);
            setMaxPrice(val[1]);
          }}
          min={0}
          max={2000}
          step={100}
          className="relative w-full"
        />

        {/* Labels */}
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>Free</span>
          <span>₹1000</span>
          <span>₹2000+</span>
        </div>

        {/* Numeric Inputs */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMinPrice(value);
              setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
            }}
            className="w-full border border-[#C7C7C7] rounded-md px-3 py-2 text-sm focus:border-[#87CEEB] focus:ring-[#87CEEB]/40 outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMaxPrice(value);
              setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
            }}
            className="w-full border border-[#C7C7C7] rounded-md px-3 py-2 text-sm focus:border-[#87CEEB] focus:ring-[#87CEEB]/40 outline-none transition-all"
          />
        </div>
      </CardContent>
    </Card>


      {/* Industry */}
      <Card className="border border-[#C7C7C7]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <Layers className="h-5 w-5 text-black" />
            Industry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={industry}
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={(checked) => {
                  if (checked)
                    setSelectedIndustries([...selectedIndustries, industry]);
                  else
                    setSelectedIndustries(
                      selectedIndustries.filter((i) => i !== industry)
                    );
                }}
              />
              <label htmlFor={industry} className="text-sm cursor-pointer">
                {industry}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Type */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <Users className="h-5 w-5 text-black" />
            Session Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sessionTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={sessionType.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked)
                    setSessionType([...sessionType, type]);
                  else
                    setSessionType(sessionType.filter((t) => t !== type));
                }}
              />
              <label htmlFor={type} className="text-sm cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-[#C7C7C7]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <Briefcase className="h-5 w-5 text-black" />
            Experience Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level}
                checked={experienceLevel.includes(level)}
                onCheckedChange={(checked) => {
                  if (checked)
                    setExperienceLevel([...experienceLevel, level]);
                  else
                    setExperienceLevel(
                      experienceLevel.filter((l) => l !== level)
                    );
                }}
              />
              <label htmlFor={level} className="text-sm cursor-pointer">
                {level}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Packages */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <Package className="h-5 w-5 text-black" />
            Packages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {packageOptions.map((pkg) => (
            <div key={pkg} className="flex items-center space-x-2">
              <Checkbox
                id={pkg}
                checked={packages.includes(pkg)}
                onCheckedChange={(checked) => {
                  if (checked) setPackages([...packages, pkg]);
                  else setPackages(packages.filter((p) => p !== pkg));
                }}
              />
              <label htmlFor={pkg} className="text-sm cursor-pointer">
                {pkg}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mentor Rating */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <Star className="h-5 w-5 text-black" />
            Mentor Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {ratingOptions.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={rating}
                checked={mentorRatings.includes(rating)}
                onCheckedChange={(checked) => {
                  if (checked) setMentorRatings([...mentorRatings, rating]);
                  else setMentorRatings(mentorRatings.filter((r) => r !== rating));
                }}
              />
              <label htmlFor={rating} className="text-sm cursor-pointer">
                {rating}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <Timer className="h-5 w-5 text-black" />
            Response Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {responseOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={responseTime.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked)
                    setResponseTime([...responseTime, option]);
                  else
                    setResponseTime(responseTime.filter((r) => r !== option));
                }}
              />
              <label htmlFor={option} className="text-sm cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
