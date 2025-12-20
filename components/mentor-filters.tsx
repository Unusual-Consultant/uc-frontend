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
  const [availability, setAvailability] = useState<string[]>([]);

  // Trigger callback whenever filters change
  const notifyFilterChange = () => {
    if (onFiltersChange) {
      onFiltersChange({
        minPrice,
        maxPrice,
        isVerified,
        sortBy,
        sessionType,
        packages,
        mentorRatings,
        responseTime,
        selectedIndustries,
        experienceLevel,
        availability,
      });
    }
  };

  const industries = [
    "Technology",
    "Product Management",
    "Data Science",
    "Finance",
    "Marketing",
    "Design",
    "Healthcare",
    "Sales",
    "Education",
    "Consulting",
  ];
  const sessionTypes = ["1:1 Session", "Group Session"];
  const packageOptions = [
    "1:1 Mentoring",
    "Resume Review",
    "Mock Interview",
    "Career Guidance",
    "Portfolio Review",
    "Technical Interview",
    "System Design",
    "Leadership Coaching",
  ];

  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6-10 years)",
    "Executive Level (10+ years)",
  ];

  const ratingOptions = [
    "4.5 Stars and above",
    "4.0 Stars and above",
    "3.5 Stars and above",
    "Any Rating",

  ];

  const avalability = [
    "Available Today",
    "This week",
    "Next Week",
    "Flexible Schedule",
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
    { value: "experience", label: "High to Low" },
    { value: "rating", label: "High to Low" },
    { value: "response-time", label: "Fastest First" },
    { value: "newest-mentors", label: "Newest Mentors First" },
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
    setSelectedIndustries([]);
    setExperienceLevel([]);
    setAvailability([]);
    // Notify with cleared filters
    if (onFiltersChange) {
      onFiltersChange({
        minPrice: 0,
        maxPrice: 2000,
        isVerified: false,
        sortBy: "relevance",
        sessionType: [],
        packages: [],
        mentorRatings: [],
        responseTime: [],
        selectedIndustries: [],
        experienceLevel: [],
        availability: [],
      });
    }
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
    setIsVerified((prev) => {
      const newVerified = !prev;
      if (onFiltersChange) {
        onFiltersChange({
          minPrice,
          maxPrice,
          isVerified: newVerified,
          sortBy,
          sessionType,
          packages,
          mentorRatings,
          responseTime,
          selectedIndustries,
          experienceLevel,
          availability,
        });
      }
      return newVerified;
    });
  };

  return (
    <div className="space-y-8 font-['Mulish']">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-[700] flex items-center gap-2">
          <Filter className="h-6 w-6 text-black" />
          Filters & Sort
        </h2>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Verified Mentors Row */}
      <div className="flex items-center justify-between border border-[#C7C7C7] rounded-xl px-5 py-7 bg-white shadow-sm w-full max-w-[400px]">
        {/* Text */}
        <span className="text-[16px] font-[600] font-[Mulish] text-black">
          Verified Mentors only
        </span>

        {/* Twitter-style Switch */}
        <button
          onClick={toggleVerified}
          className="relative flex items-center justify-center w-[53px] h-[25px] rounded-full border-2 border-[#0073CF] bg-white transition-all duration-300 overflow-hidden"
        >
          {/* No color-changing background now */}
          <div className="absolute inset-0 rounded-full bg-white" />

          {/* Verified badge as toggle thumb */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ${isVerified ? "translate-x-[18px]" : "-translate-x-[18px]"
              }`}
          >
            <svg
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 transition-all duration-300"
            >
              <path
                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                fill={isVerified ? "#1d9bf0" : "#9ca3af"} // toggle color only
              />
            </svg>
          </div>
        </button>


      </div>

      {/* Sort By */}
      <Card className="border w-[311px]  border-[#C7C7C7] rounded-lg transition-all duration-300 hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[20px] font-[700] text-black">
            <SortDesc className="h-5 w-5 text-black" />
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={(value) => {
            setSortBy(value);
            if (onFiltersChange) {
              onFiltersChange({
                minPrice,
                maxPrice,
                isVerified,
                sortBy: value,
                sessionType,
                packages,
                mentorRatings,
                responseTime,
                selectedIndustries,
                experienceLevel,
                availability,
              });
            }
          }}>
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
      <Card className="border border-[#C7C7C7] w-[311px] h-[220px] rounded-lg transition-all duration-300 hover:border-[#87CEEB] hover:shadow-[0_2px_8px_rgba(135,206,235,0.4)]">
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
    notifyFilterChange();
  }}
  min={0}
  max={2000}
  step={100}
  className="relative w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border [&_[role=slider]]:border-gray-400 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:rounded-full [&_[role=slider]]:shadow-md [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform"
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
              placeholder="Min Price"
              value={minPrice === 0 ? '' : minPrice}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                setMinPrice(value);
                setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
                notifyFilterChange();
              }}
              className="w-full border border-[#C7C7C7] rounded-md px-3 py-2 text-sm focus:border-[#87CEEB] focus:ring-[#87CEEB]/40 outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice === 2000 ? '' : maxPrice}
              onChange={(e) => {
                const value = e.target.value === '' ? 2000 : Number(e.target.value);
                setMaxPrice(value);
                setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
                notifyFilterChange();
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 25 23"
              fill="none"
              className="text-black"
            >
              <path
                d="M12.3496 0.150391V5.15039H24.8496V22.3496H0.150391V0.150391H12.3496ZM2.34961 20.1504H5.15039V17.3496H2.34961V20.1504ZM7.34961 20.1504H10.1504V17.3496H7.34961V20.1504ZM12.3496 10.1504H14.8496V12.3496H12.3496V15.1504H14.8496V17.3496H12.3496V20.1504H22.6504V7.34961H12.3496V10.1504ZM19.8496 15.1504V17.3496H17.6504V15.1504H19.8496ZM2.34961 15.1504H5.15039V12.3496H2.34961V15.1504ZM7.34961 15.1504H10.1504V12.3496H7.34961V15.1504ZM19.8496 10.1504V12.3496H17.6504V10.1504H19.8496ZM2.34961 10.1504H5.15039V7.34961H2.34961V10.1504ZM7.34961 10.1504H10.1504V7.34961H7.34961V10.1504ZM2.34961 5.15039H5.15039V2.34961H2.34961V5.15039ZM7.34961 5.15039H10.1504V2.34961H7.34961V5.15039Z"
                fill="black"
                stroke="white"
                strokeWidth="0.3"
              />
            </svg>

            Domain/Industry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={industry}
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={(checked) => {
                  const newIndustries = checked
                    ? [...selectedIndustries, industry]
                    : selectedIndustries.filter((i) => i !== industry);
                  setSelectedIndustries(newIndustries);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType,
                      packages,
                      mentorRatings,
                      responseTime,
                      selectedIndustries: newIndustries,
                      experienceLevel,
                      availability,
                    });
                  }
                }}
              />
              <label htmlFor={industry} className="text-md font-semibold cursor-pointer">
                {industry}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Type */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[22px] mb-2 font-[700] text-black">
            <Clock className="h-5 w-5 text-black" />
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
                  const newSessionTypes = checked
                    ? [...sessionType, type]
                    : sessionType.filter((t) => t !== type);
                  setSessionType(newSessionTypes);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType: newSessionTypes,
                      packages,
                      mentorRatings,
                      responseTime,
                      selectedIndustries,
                      experienceLevel,
                      availability,
                    });
                  }
                }}
              />
              <label htmlFor={type} className="text-md font-semibold cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-[#C7C7C7]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[22px] mb-2font-[700] text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              className="text-black"
            >
              <path
                d="M23 2L24.593 5L28 5.414L25.5 7.667L26 11L23 9.125L20 11L20.5 7.667L18 5.414L21.5 5L23 2Z"
                fill="black"
              />
              <path
                d="M22.717 13.2497L20.779 12.7517C20.4316 14.0899 19.6953 15.2952 18.6633 16.2152C17.6312 17.1352 16.3496 17.7286 14.9804 17.9206C13.6112 18.1126 12.2158 17.8944 10.9706 17.2937C9.72529 16.693 8.686 15.7367 7.98398 14.5456C7.28197 13.3545 6.94873 11.982 7.02637 10.6016C7.10401 9.22118 7.58904 7.89475 8.42019 6.78988C9.25134 5.685 10.3913 4.85125 11.6961 4.39397C13.0009 3.93668 14.4119 3.87637 15.751 4.22066L16.25 2.28366C14.2979 1.77592 12.2319 1.93934 10.384 2.74768C8.53606 3.55601 7.01365 4.96227 6.06153 6.74037C5.10941 8.51848 4.78289 10.5651 5.13447 12.5512C5.48605 14.5373 6.4953 16.3475 7.99996 17.6907V30.0007L14 26.0007L20 30.0007V17.7087C21.3282 16.525 22.2741 14.9728 22.717 13.2497ZM18 26.2637L14 23.5967L9.99996 26.2637V19.0507C11.2409 19.6744 12.6104 19.9998 13.9993 20.0008C15.3881 20.0019 16.7581 19.6786 18 19.0567V26.2637Z"
                fill="black"
              />
            </svg>

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
                  const newLevels = checked
                    ? [...experienceLevel, level]
                    : experienceLevel.filter((l) => l !== level);
                  setExperienceLevel(newLevels);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType,
                      packages,
                      mentorRatings,
                      responseTime,
                      selectedIndustries,
                      experienceLevel: newLevels,
                      availability,
                    });
                  }
                }}
              />
              <label htmlFor={level} className="text-mb font-semibold cursor-pointer">
                {level}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Packages */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[22px] mb-2 font-[700] text-black">
            <Briefcase className="h-5 w-5 text-black" />
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
                  const newPackages = checked
                    ? [...packages, pkg]
                    : packages.filter((p) => p !== pkg);
                  setPackages(newPackages);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType,
                      packages: newPackages,
                      mentorRatings,
                      responseTime,
                      selectedIndustries,
                      experienceLevel,
                      availability,
                    });
                  }
                }}
              />
              <label htmlFor={pkg} className="text-md font-semibold cursor-pointer">
                {pkg}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mentor Rating */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[22px] mb-2 font-[700] text-black">
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
                  const newRatings = checked
                    ? [...mentorRatings, rating]
                    : mentorRatings.filter((r) => r !== rating);
                  setMentorRatings(newRatings);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType,
                      packages,
                      mentorRatings: newRatings,
                      responseTime,
                      selectedIndustries,
                      experienceLevel,
                      availability,
                    });
                  }
                }}
              />
              <label htmlFor={rating} className="text-md font-semibold cursor-pointer">
                {rating}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[22px] mb-2 font-[700] text-black">
            {/* Availability Icon */}
            <Clock className="h-5 w-5 text-black" />
            Availability
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {avalability.map((slot) => (
            <div key={slot} className="flex items-center space-x-2">
              <Checkbox
                id={slot}
                checked={availability.includes(slot)}
                onCheckedChange={(checked) => {
                  const newAvailability = checked
                    ? [...availability, slot]
                    : availability.filter((s) => s !== slot);
                  setAvailability(newAvailability);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType,
                      packages,
                      mentorRatings,
                      responseTime,
                      selectedIndustries,
                      experienceLevel,
                      availability: newAvailability,
                    });
                  }
                }}

              />
              <label htmlFor={slot} className="text-md font-semibold cursor-pointer">
                {slot}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>


      {/* Response Time */}
      <Card className="border border-[#C7C7C7] rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-[22px] mb-2 font-[700] text-black">
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
                  const newResponseTime = checked
                    ? [...responseTime, option]
                    : responseTime.filter((r) => r !== option);
                  setResponseTime(newResponseTime);
                  if (onFiltersChange) {
                    onFiltersChange({
                      minPrice,
                      maxPrice,
                      isVerified,
                      sortBy,
                      sessionType,
                      packages,
                      mentorRatings,
                      responseTime: newResponseTime,
                      selectedIndustries,
                      experienceLevel,
                      availability,
                    });
                  }
                }}
              />
              <label htmlFor={option} className="text-md font-semibold cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
