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

    setFilters({
      minPrice,
      maxPrice,
      isVerified: verified,
      sortBy,
      sessionType,
      packages: [],
      mentorRatings: rating,
      responseTime,
      selectedIndustries: skills,
      experienceLevel: [],
      availability: [],
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

    router.push(url.toString());
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 font-[Mulish]">
      {/* ✅ Constrained content wrapper */}
      <div className="mx-auto px-6" style={{ maxWidth: "1200px" }}>
        {/* ✅ Mentor Banner */}
        <div className="relative w-full flex justify-center mb-10">
          <Image
            src="/mentor-banner.png"
            alt="Mentor Banner"
            width={1200}
            height={150}
            className="object-contain"
            priority
          />
        </div>

        {/* ✅ Search + Actions */}
        <div className="pb-8">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full shadow-lg p-[0.25rem] gap-[0.5rem] overflow-hidden flex-1 max-w-full">
              <div className="relative flex-1">
                <Search className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-black h-[1.25rem] w-[1.25rem]" />
                <Input
                  type="text"
                  placeholder="Search by name, skill, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-[3rem] pr-[1rem] py-[1rem] text-[1.125rem] border-none bg-transparent text-black placeholder-black focus:ring-0 focus:outline-none rounded-full"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="px-[2rem] py-[1rem] text-[1.125rem] font-medium bg-[#0073CF] text-white hover:bg-[#005fa3] rounded-full transition-all"
              >
                Search
              </Button>
            </div>

            {/* AI Recommended Mentors */}
            <Button className="flex items-center gap-2 bg-[#0073CF] text-white rounded-full px-5 py-3 text-[15px] font-medium shadow-[0_4px_12px_rgba(159,157,157,0.35)] hover:bg-[#0063B3] transition-all">
              <Wand2 className="h-5 w-5" />
              Show AI Recommended Mentors
            </Button>

            {/* Filters toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-3 text-[15px] font-medium border border-gray-300 shadow-[0_4px_12px_rgba(159,157,157,0.35)] hover:bg-gray-50 transition-all"
            >
              <Filter className="h-5 w-5" />
              {showFilters ? "Filters & Sort" : " Filters & Sort"}
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
          <div className={`transition-all duration-300 flex gap-8 ${showFilters ? "flex-row" : "flex-col"}`}>
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
