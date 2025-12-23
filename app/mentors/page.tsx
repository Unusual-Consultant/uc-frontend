"use client";

import "@fontsource/mulish";
import { useState, useEffect, useCallback } from "react";
import { MentorFilters } from "@/components/mentor-filters";
import MentorGrid from "@/components/mentor-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Wand2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function MentorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<any>({
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    if (search) setSearchQuery(search);

    // Load filters from URL
    const minPrice = urlParams.get("minPrice") ? Number(urlParams.get("minPrice")) : 0;
    const maxPrice = urlParams.get("maxPrice") ? Number(urlParams.get("maxPrice")) : 2000;
    const skills = urlParams.get("skills") ? urlParams.get("skills")!.split(",") : [];
    const rating = urlParams.get("rating") ? urlParams.get("rating")!.split(",") : [];
    const sortBy = urlParams.get("sortBy") || "relevance";
    const verified = urlParams.get("verified") === "true";
    const responseTime = urlParams.get("responseTime") ? urlParams.get("responseTime")!.split(",") : [];
    const sessionType = urlParams.get("sessionType") ? urlParams.get("sessionType")!.split(",") : [];
    const packages = urlParams.get("packages") ? urlParams.get("packages")!.split(",") : [];
    const experienceLevel = urlParams.get("experienceLevel") ? urlParams.get("experienceLevel")!.split(",") : [];
    const availability = urlParams.get("availability") ? urlParams.get("availability")!.split(",") : [];

    setFilters({
      minPrice,
      maxPrice,
      isVerified: verified,
      sortBy,
      sessionType,
      packages,
      mentorRatings: rating,
      responseTime,
      selectedIndustries: skills,
      experienceLevel,
      availability,
    });
  }, []);

  const handleSearch = () => {
    const url = new URL(window.location.href);
    if (searchQuery) url.searchParams.set("search", searchQuery);
    else url.searchParams.delete("search");
    router.push(url.toString());
  };

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
    // Update URL with filter parameters
    const url = new URL(window.location.href);
    
    // Add/update filter params
    if (newFilters.minPrice > 0 || newFilters.maxPrice < 2000) {
      url.searchParams.set("minPrice", newFilters.minPrice);
      url.searchParams.set("maxPrice", newFilters.maxPrice);
    } else {
      url.searchParams.delete("minPrice");
      url.searchParams.delete("maxPrice");
    }

    if (newFilters.selectedIndustries?.length > 0) {
      url.searchParams.set("skills", newFilters.selectedIndustries.join(","));
    } else {
      url.searchParams.delete("skills");
    }

    if (newFilters.mentorRatings?.length > 0) {
      url.searchParams.set("rating", newFilters.mentorRatings.join(","));
    } else {
      url.searchParams.delete("rating");
    }

    if (newFilters.sortBy !== "relevance") {
      url.searchParams.set("sortBy", newFilters.sortBy);
    } else {
      url.searchParams.delete("sortBy");
    }

    if (newFilters.isVerified) {
      url.searchParams.set("verified", "true");
    } else {
      url.searchParams.delete("verified");
    }

    if (newFilters.responseTime?.length > 0) {
      url.searchParams.set("responseTime", newFilters.responseTime.join(","));
    } else {
      url.searchParams.delete("responseTime");
    }

    if (newFilters.sessionType?.length > 0) {
      url.searchParams.set("sessionType", newFilters.sessionType.join(","));
    } else {
      url.searchParams.delete("sessionType");
    }

    if (newFilters.packages?.length > 0) {
      url.searchParams.set("packages", newFilters.packages.join(","));
    } else {
      url.searchParams.delete("packages");
    }

    if (newFilters.experienceLevel?.length > 0) {
      url.searchParams.set("experienceLevel", newFilters.experienceLevel.join(","));
    } else {
      url.searchParams.delete("experienceLevel");
    }

    if (newFilters.availability?.length > 0) {
      url.searchParams.set("availability", newFilters.availability.join(","));
    } else {
      url.searchParams.delete("availability");
    }

    router.push(url.toString());
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 font-[Mulish]">
      {/* ✅ Constrained content wrapper */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* ✅ Mentor Banner */}
        <div className="relative w-full flex justify-center mb-8 lg:mb-10">
          <Image
            src="/mentor-banner.png"
            alt="Mentor Banner"
            width={1400}
            height={150}
            className="object-contain"
            priority
          />
        </div>

        {/* ✅ Search + Actions */}
        <div className="pb-6 lg:pb-8">
          <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full shadow-lg p-1 gap-2 overflow-hidden flex-1 min-w-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by name, skill, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 pr-4 py-6 text-base border-none bg-transparent text-black placeholder-black focus:ring-0 focus:outline-none rounded-full font-[Mulish] font-semibold w-full text-md"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="px-14 py-6 text-base font-semibold bg-[#0073CF] text-white hover:bg-[#003c6c] rounded-full transition-all whitespace-nowrap"
              >
                Search
              </Button>
            </div>

            {/* AI Recommended Mentors */}
            <Button className="flex items-center gap-2 bg-[#0073CF] text-white rounded-full px-4 lg:px-5 py-6 text-sm lg:text-base font-semibold shadow-[0_4px_12px_rgba(159,157,157,0.35)] hover:bg-[#003c6c] transition-all whitespace-nowrap">
              <Wand2 className="h-5 w-5" />
              <span className="hidden sm:inline">Show AI Recommended Mentors</span>
              <span className="sm:hidden">AI Mentors</span>
            </Button>

            {/* Filters toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters((prev) => !prev)}
              className="hidden lg:flex items-center gap-2 bg-white text-black rounded-full px-4 lg:px-5 py-6 text-sm lg:text-base font-semibold border-white shadow-[0_4px_12px_rgba(159,157,157,0.35)] hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              <Filter className="h-5 w-5" />
              Filters & Sort
            </Button>

            {/* Mobile Filters Drawer */}
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-white text-black rounded-full border shadow-[0_4px_12px_rgba(159,157,157,0.35)]"
                >
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <MentorFilters onFiltersChange={handleFiltersChange} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className={`transition-all duration-300 flex flex-col lg:flex-row gap-6 lg:gap-8`}>
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="hidden lg:block w-[320px] shrink-0">
                <MentorFilters onFiltersChange={handleFiltersChange} />
              </div>
            )}

            {/* Mentor Cards Section */}
            <div className="flex-1 min-w-0">
              <MentorGrid showFilters={showFilters} filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
