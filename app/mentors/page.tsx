"use client"

import "@fontsource/mulish"
import { useState, useEffect } from "react"
import { MentorFilters } from "@/components/mentor-filters"
import  MentorGrid  from "@/components/mentor-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Wand2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search")
    if (search) {
      setSearchQuery(search)
    }
  }, [])

  const handleSearch = () => {
    const url = new URL(window.location.href)
    if (searchQuery) {
      url.searchParams.set("search", searchQuery)
    } else {
      url.searchParams.delete("search")
    }
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[Mulish]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Mentor
          </h1>

          {/* Search + Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full shadow-lg p-[0.25rem] gap-[0.5rem] overflow-hidden flex-1 max-w-2xl shadow-[#58585840]">
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

            {/* Filters & Sort */}
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-3 text-[15px] font-medium border border-gray-300 shadow-[0_4px_12px_rgba(159,157,157,0.35)] hover:bg-gray-50 transition-all"
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
                <MentorFilters />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <MentorFilters />
          </div>

          {/* Mentor Grid */}
          <div className="lg:col-span-3">
            <MentorGrid searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  )
}
