import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import "@fontsource/mulish";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Star,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  expertise: string[];
  price: number;
  mentees: number;
  available: boolean;
  responseTime: string;
  successRate: number;
  description: string;
  languages: string[];
  yearsExperience: number;
  badge?: string;
}

export default function MentorCards({ showFilters, filters }: { showFilters: boolean; filters?: any }) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", "1");
        params.append("per_page", "50");
        
        if (searchQuery) {
          params.append("search_query", searchQuery);
        }

        // Add price filters
        if (filters?.minPrice !== undefined && filters?.minPrice > 0) {
          params.append("min_rating", "0"); // API doesn't have min_price, using for reference
        }
        if (filters?.maxPrice !== undefined && filters?.maxPrice < 2000) {
          params.append("max_price", String(filters.maxPrice * 100)); // Convert to paise
        }

        // Add skills filters
        if (filters?.selectedIndustries && filters.selectedIndustries.length > 0) {
          params.append("skills", filters.selectedIndustries.join(","));
        }

        // Add rating filters
        if (filters?.mentorRatings && filters.mentorRatings.length > 0) {
          const minRating = filters.mentorRatings[0] === "4★ & Above" ? 4
            : filters.mentorRatings[0] === "3★ & Above" ? 3
            : filters.mentorRatings[0] === "2★ & Above" ? 2
            : 1;
          params.append("min_rating", String(minRating));
        }

        const response = await fetch(`${API_BASE_URL}/mentors/profiles?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          let mappedMentors = data.mentors.map((m: any) => ({
            id: m.id,
            name: m.full_name,
            title: m.headline || "Mentor",
            company: m.company || "",
            image: m.profile_picture_url || "/placeholder.svg?height=80&width=80",
            rating: m.rating || 0,
            reviews: m.total_sessions || 0,
            location: m.location || "Remote",
            expertise: m.skills || [],
            price: m.hourly_rate || 0,
            mentees: m.total_sessions || 0,
            available: true,
            responseTime: "24 hrs",
            successRate: 100,
            description: m.headline || "",
            languages: [],
            yearsExperience: 0,
          }));

          // Client-side filtering for fields not available in API
          if (filters?.responseTime && filters.responseTime.length > 0) {
            mappedMentors = mappedMentors.filter((m: Mentor) =>
              filters.responseTime.some((rt: string) => m.responseTime.includes(rt) || rt === "< 24 Hours")
            );
          }

          // Sort mentors
          if (filters?.sortBy === "price-low") {
            mappedMentors.sort((a: Mentor, b: Mentor) => a.price - b.price);
          } else if (filters?.sortBy === "price-high") {
            mappedMentors.sort((a: Mentor, b: Mentor) => b.price - a.price);
          } else if (filters?.sortBy === "rating") {
            mappedMentors.sort((a: Mentor, b: Mentor) => b.rating - a.rating);
          }

          setMentors(mappedMentors);
        } else {
          console.error("Failed to fetch mentors");
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [searchQuery, filters]);

  if (loading) {
    return (
      <section className="py-12 font-[Mulish] bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Loading mentors...</p>
        </div>
      </section>
    );
  }

  if (mentors.length === 0) {
    return (
      <section className="py-12 font-[Mulish] bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>No mentors found matching your criteria.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 font-[Mulish] bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Grid: Use auto-rows-fr so all cards in a row have equal height */}
        <div
          className={`grid grid-cols-1 gap-12 transition-all duration-300 ${showFilters ? "md:grid-cols-2" : "md:grid-cols-3"
            } auto-rows-fr`}
        >
          {mentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="relative border border-[#C7C7C7] rounded-xl p-4 flex flex-col hover:shadow-lg shadow-[#9F9D9D40] transition-all duration-300 overflow-hidden bg-white"
            >
              {/* Card content wrapper: flex-col + flex-1 for inner content */}
              <div className="flex flex-col flex-1">
                {/* Banner */}
                <div className="absolute top-0 left-0 w-full h-20 bg-[#C4E1FF] rounded-t-xl z-0" />

                {mentor.available && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-4 py-1 rounded-full flex items-center gap-1 z-20">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-green-500 fill-green-500" />
                    </div>
                    Online
                  </div>
                )}

                {/* Avatar + Info */}
                <div className="flex gap-4 items-start relative z-10 mt-14 py-2">
                  <div className="relative -mt-6">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                      <AvatarImage src={mentor.image} alt={mentor.name} />
                    </Avatar>
                    <div className="absolute w-[58px] h-[23px] -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-2 py-0.5 rounded-full text-sm flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 text-yellow-400" />{" "}
                      <span className="text-black">{mentor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col mt-1 text-black">
                    <div className="flex items-center gap-1">
                      <h3 className="text-lg font-bold">{mentor.name}</h3>
                    </div>
                    <p className="text-sm">{mentor.title}</p>
                    <p className="text-sm font-medium text-blue-600">{mentor.company}</p>
                  </div>
                </div>

                {/* Location / Experience / Favorite */}
                <div className="mt-4 flex gap-4 font-semibold text-sm text-black items-center">
                  <div className="flex items-center gap-1 text-[14px]">
                    <MapPin className="w-4 h-4" /> {mentor.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {mentor.yearsExperience} yrs experience
                  </div>
                  <button className="ml-auto text-gray-400 hover:text-red-500 transition-colors relative -top-10">
                    <Heart className="w-4 h-4 text-black " />
                  </button>
                </div>

                <p className="mt-4 text-sm text-black font-[500] flex-1 line-clamp-3">{mentor.description}</p>

                {/* Stats */}
                <div className="mt-6 flex justify-center gap-4 text-gray-700 w-full font-[Mulish]">
                  <div className="flex flex-col items-center">
                    <span className="font-[600] text-[13px] text-center whitespace-nowrap">Response Time</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-[13px] font-[700]">{mentor.responseTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-[600] text-[13px] text-center whitespace-nowrap">Total Mentees</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-[13px] font-[700]">{mentor.mentees}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-[600] text-[13px] text-center whitespace-nowrap">Success Rate</span>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-[13px] font-[700]">{mentor.successRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Expertise / Languages */}
                <div className="mt-6 flex flex-wrap gap-2 text-black font-[Mulish]">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-4 py-1 bg-[#D1EAFF] text-[12px] rounded-full font-semibold">
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-4 py-1 bg-[#D1EAFF] text-[12px] rounded-full font-semibold">
                      +{mentor.expertise.length - 3}
                    </span>
                  )}
                </div>
                {mentor.languages && mentor.languages.length > 0 && (
                  <div className="mt-3 group cursor-pointer inline-block font-[500]">
                    <div className="relative inline-flex items-center justify-center gap-1 px-3 py-1 bg-gray-300 text-xs rounded-full transition-all duration-300 ease-in-out">
                      <span className="flex items-center gap-1 transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 whitespace-nowrap">
                        <Globe className="w-3 h-3 text-blue-400" />
                        Languages
                      </span>
                      <span className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {mentor.languages.join(", ")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-8 flex items-start gap-4">
                  <div className="flex flex-col pt-7">
                    <span className="text-sm font-semibold">Starting from</span>
                    <span className="text-lg font-bold text-[#0073CF]">₹{mentor.price}/hr</span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Button variant="outline" size="sm" className="w-full border-black rounded-full">
                      <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                      Quick Book
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}