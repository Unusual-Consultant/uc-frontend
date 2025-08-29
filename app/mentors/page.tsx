"use client"

import { useState, useEffect } from "react"
import { MentorFilters } from "@/components/mentor-filters"
import { MentorGrid } from "@/components/mentor-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
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
    // Update URL with search query
    const url = new URL(window.location.href)
    if (searchQuery) {
      url.searchParams.set("search", searchQuery)
    } else {
      url.searchParams.delete("search")
    }
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Mentor</h1>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name, skill, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button onClick={handleSearch} size="lg">
              Search
            </Button>

            {/* Mobile Filters Toggle */}
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="md:hidden bg-transparent">
                  <SlidersHorizontal className="h-5 w-5" />
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
