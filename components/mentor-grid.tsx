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

const DUMMY_MENTORS: Mentor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 127,
    location: "Delhi, India",
    expertise: ["Product Strategy", "Agile", "User Research", "Growth"],
    price: 1500,
    mentees: 89,
    available: true,
    responseTime: "24",
    successRate: 98,
    description: "Experienced PM with 10+ years in tech. Helped launch products used by millions. Passionate about mentoring aspiring product managers.",
    languages: ["English", "Spanish", "Hindi"],
    yearsExperience: 10,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Tech Lead & Architect",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 203,
    location: "Seattle, WA",
    expertise: ["System Design", "Cloud Architecture", "Leadership", "React"],
    price: 1200,
    mentees: 156,
    available: true,
    responseTime: "12",
    successRate: 96,
    description: "Architect specializing in scalable systems. Love helping engineers grow into leadership roles and master system design.",
    languages: ["English", "Mandarin"],
    yearsExperience: 12,
  },
  {
    id: "3",
    name: "Priya Sharma",
    title: "Data Science Manager",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    reviews: 94,
    location: "Bangalore, India",
    expertise: ["Machine Learning", "Python", "Data Analysis", "AI"],
    price: 1000,
    mentees: 67,
    available: false,
    responseTime: "24",
    successRate: 95,
    description: "ML expert with focus on practical applications. Mentoring data scientists and analysts to advance their careers.",
    languages: ["English", "Hindi"],
    yearsExperience: 8,
  },
  {
    id: "4",
    name: "James Rodriguez",
    title: "Startup Founder & CEO",
    company: "TechVentures",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4.9,
    reviews: 78,
    location: "Austin, TX",
    expertise: ["Entrepreneurship", "Fundraising", "Strategy", "Leadership"],
    price: 1800,
    mentees: 45,
    available: true,
    responseTime: "48",
    successRate: 100,
    description: "Serial entrepreneur. Successfully raised $50M+ across 3 startups. Here to help founders navigate their journey.",
    languages: ["English"],
    yearsExperience: 15,
  },
  {
    id: "5",
    name: "Emily Watson",
    title: "UX Design Lead",
    company: "Apple",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    rating: 4.8,
    reviews: 112,
    location: "Cupertino, CA",
    expertise: ["UI/UX Design", "Figma", "Design Systems", "Research"],
    price: 1100,
    mentees: 92,
    available: true,
    responseTime: "24",
    successRate: 97,
    description: "Design leader passionate about creating intuitive experiences. Mentoring designers at all levels to elevate their craft.",
    languages: ["English", "French"],
    yearsExperience: 9,
  },
  {
    id: "6",
    name: "David Kim",
    title: "DevOps Engineer",
    company: "Netflix",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4.6,
    reviews: 65,
    location: "Los Angeles, CA",
    expertise: ["DevOps", "Kubernetes", "CI/CD", "AWS"],
    price: 900,
    mentees: 54,
    available: true,
    responseTime: "24",
    successRate: 94,
    description: "DevOps specialist helping teams build reliable infrastructure. Expert in cloud platforms and automation.",
    languages: ["English", "Korean"],
    yearsExperience: 7,
  },
  {
    id: "7",
    name: "Lisa Anderson",
    title: "Marketing Director",
    company: "Meta",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4.9,
    reviews: 143,
    location: "New York, NY",
    expertise: ["Digital Marketing", "Growth Hacking", "Brand Strategy", "SEO"],
    price: 1300,
    mentees: 108,
    available: true,
    responseTime: "12",
    successRate: 99,
    description: "Marketing leader with proven track record in scaling brands. Passionate about teaching data-driven marketing strategies.",
    languages: ["English"],
    yearsExperience: 11,
  },
  {
    id: "8",
    name: "Raj Patel",
    title: "Blockchain Developer",
    company: "Coinbase",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 4.7,
    reviews: 56,
    location: "Remote",
    expertise: ["Blockchain", "Solidity", "Web3", "Smart Contracts"],
    price: 1400,
    mentees: 38,
    available: true,
    responseTime: "24",
    successRate: 93,
    description: "Web3 developer specializing in DeFi and NFTs. Helping developers transition into blockchain technology.",
    languages: ["English", "Gujarati"],
    yearsExperience: 5,
  },
];

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

        // Add price filters - backend only supports max_price, min_price is client-side filtered
        if (filters?.maxPrice !== undefined && filters?.maxPrice < 2000) {
          params.append("max_price", String(filters.maxPrice)); // Backend expects rupees
        }

        // Add skills filters (domain/industry)
        if (filters?.selectedIndustries && filters.selectedIndustries.length > 0) {
          params.append("skills", filters.selectedIndustries.join(","));
        }

        // Add location filter if backend supports it
        if (filters?.location && filters.location.trim()) {
          params.append("location", filters.location);
        }

        // Add rating filters
        if (filters?.mentorRatings && filters.mentorRatings.length > 0) {
          // Find the highest minimum rating from selected options
          const ratings = filters.mentorRatings.map((rating: string) => {
            if (rating.includes("4.5")) return 4.5;
            if (rating.includes("4.0") || rating.includes("4★")) return 4.0;
            if (rating.includes("3.5") || rating.includes("3★")) return 3.5;
            return 0;
          });
          const minRating = Math.max(...ratings);
          if (minRating > 0) {
            params.append("min_rating", String(minRating));
          }
        }

        const response = await fetch(`${API_BASE_URL}/mentors/profiles?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          let mappedMentors = data.mentors && data.mentors.length > 0 ? data.mentors.map((m: any) => ({
            id: m.id,
            name: m.full_name,
            title: m.role || m.headline || "Mentor",
            company: m.company || "",
            image: m.profile_picture_url || "/placeholder.svg?height=80&width=80",
            rating: m.rating || 0,
            reviews: m.total_sessions || 0,
            location: m.location || "Remote",
            expertise: m.skills || [],
            price: m.hourly_rate || 0, // Backend already returns in rupees (converted from paise)
            mentees: m.total_sessions || 0,
            available: m.is_online || m.available || false,
            responseTime: "24 hrs",
            successRate: 100,
            description: m.headline || "",
            languages: m.languages || [],
            yearsExperience: m.years_experience || 0,
          })) : DUMMY_MENTORS;

          // Client-side filtering for fields not available in API

          // Filter by verified status
          if (filters?.isVerified) {
            // Assuming verified mentors have higher ratings or specific badge
            mappedMentors = mappedMentors.filter((m: Mentor) => m.rating >= 4.5);
          }

          // Filter by price range
          if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
            const min = filters.minPrice || 0;
            const max = filters.maxPrice || 2000;
            mappedMentors = mappedMentors.filter((m: Mentor) => m.price >= min && m.price <= max);
          }

          // Filter by session type
          if (filters?.sessionType && filters.sessionType.length > 0) {
            // Since dummy data doesn't have session type, we'll keep all for now
            // In real implementation, filter by: filters.sessionType.includes(m.sessionType)
          }

          // Filter by packages
          if (filters?.packages && filters.packages.length > 0) {
            // Filter mentors whose expertise matches selected packages
            mappedMentors = mappedMentors.filter((m: Mentor) =>
              filters.packages.some((pkg: string) =>
                m.expertise.some((exp: string) =>
                  exp.toLowerCase().includes(pkg.toLowerCase()) ||
                  pkg.toLowerCase().includes(exp.toLowerCase())
                )
              )
            );
          }

          // Filter by experience level
          if (filters?.experienceLevel && filters.experienceLevel.length > 0) {
            mappedMentors = mappedMentors.filter((m: Mentor) => {
              return filters.experienceLevel.some((level: string) => {
                if (level.includes("0-2")) return m.yearsExperience >= 0 && m.yearsExperience <= 2;
                if (level.includes("3-5")) return m.yearsExperience >= 3 && m.yearsExperience <= 5;
                if (level.includes("6-10")) return m.yearsExperience >= 6 && m.yearsExperience <= 10;
                if (level.includes("10+")) return m.yearsExperience > 10;
                return true;
              });
            });
          }

          // Filter by mentor ratings
          if (filters?.mentorRatings && filters.mentorRatings.length > 0) {
            mappedMentors = mappedMentors.filter((m: Mentor) => {
              return filters.mentorRatings.some((rating: string) => {
                if (rating.includes("4.5")) return m.rating >= 4.5;
                if (rating.includes("4.0")) return m.rating >= 4.0;
                if (rating.includes("3.5")) return m.rating >= 3.5;
                return true; // "Any Rating"
              });
            });
          }

          // Filter by availability
          if (filters?.availability && filters.availability.length > 0) {
            mappedMentors = mappedMentors.filter((m: Mentor) => {
              // Filter by available mentors for immediate availability
              if (filters.availability.includes("Available Today")) {
                return m.available;
              }
              return true; // For other availability options, show all
            });
          }

          // Filter by response time
          if (filters?.responseTime && filters.responseTime.length > 0) {
            mappedMentors = mappedMentors.filter((m: Mentor) => {
              const responseHours = parseInt(m.responseTime);
              return filters.responseTime.some((rt: string) => {
                if (rt.includes("< 1 Hour")) return responseHours < 1;
                if (rt.includes("< 24 Hours")) return responseHours <= 24;
                if (rt.includes("Within 3 Days")) return responseHours <= 72;
                if (rt.includes("Within a Week")) return responseHours <= 168;
                return true;
              });
            });
          }

          // Sort mentors
          if (filters?.sortBy === "price-low") {
            mappedMentors.sort((a: Mentor, b: Mentor) => a.price - b.price);
          } else if (filters?.sortBy === "price-high") {
            mappedMentors.sort((a: Mentor, b: Mentor) => b.price - a.price);
          } else if (filters?.sortBy === "rating") {
            mappedMentors.sort((a: Mentor, b: Mentor) => b.rating - a.rating);
          } else if (filters?.sortBy === "experience") {
            mappedMentors.sort((a: Mentor, b: Mentor) => b.yearsExperience - a.yearsExperience);
          } else if (filters?.sortBy === "response-time") {
            mappedMentors.sort((a: Mentor, b: Mentor) => parseInt(a.responseTime) - parseInt(b.responseTime));
          } else if (filters?.sortBy === "newest-mentors") {
            // For newest mentors, reverse the array (assuming later items are newer)
            mappedMentors.reverse();
          }

          setMentors(mappedMentors);
        } else {
          console.error("Failed to fetch mentors");
          // Use dummy data if API fails
          setMentors(DUMMY_MENTORS);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        // Use dummy data if API request fails
        setMentors(DUMMY_MENTORS);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [searchQuery, filters]);

  if (loading) {
    return (
      <section className="py-8 lg:py-12 font-[Mulish]">
        <div className="w-full text-center">
          <p className="text-sm lg:text-base text-gray-600">Loading mentors...</p>
        </div>
      </section>
    );
  }

  if (mentors.length === 0) {
    return (
      <section className="py-8 lg:py-12 font-[Mulish]">
        <div className="w-full text-center">
          <p className="text-sm lg:text-base text-gray-600">No mentors found matching your criteria.</p>
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
              className={`relative rounded-xl p-5 lg:p-6 flex flex-col hover:shadow-lg shadow-[#9F9D9D40] transition-all duration-300 bg-white ${mentor.available ? 'border-[3px] border-[#28a745]' : 'border border-white'
                }`}
              style={{ overflow: 'visible' }}
            >
              {/* Card content wrapper: flex-col + flex-1 for inner content */}
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Banner */}
                <div className="absolute top-0 left-0 w-full h-16 lg:h-20 bg-[#C4E1FF] rounded-t-xl z-0" />

                {/* Avatar + Info */}
                <div className="flex gap-3 lg:gap-4 items-start relative z-10 mt-10 lg:mt-12 py-2">
                  <div className="relative -mt-4 lg:-mt-6">
                    <Avatar className={`w-16 h-16 lg:w-20 lg:h-20 border-[3px] shadow-md ${mentor.available ? 'border-[#28a745]' : 'border-white'
                      }`}>
                      <AvatarImage src={mentor.image} alt={mentor.name} />
                    </Avatar>
                    <div className="absolute w-[60px] lg:w-[70px] h-[20px] lg:h-[23px] -bottom-2 lg:-bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-2 py-0.5 rounded-full text-xs lg:text-sm flex items-center space-x-1 lg:space-x-2 justify-center shadow">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-black font-semibold">{mentor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col mt-0 lg:mt-1 text-black">
                    <div className="flex items-center gap-1">
                      <h3 className="text-base lg:text-lg font-bold leading-tight">{mentor.name}</h3>
                    </div>
                    <p className="text-xs lg:text-sm font-semibold mt-0.5">{mentor.title}</p>
                    <p className="text-xs lg:text-sm font-bold text-blue-600 mt-0.5">{mentor.company}</p>
                  </div>
                </div>

                {/* Location / Experience / Favorite */}
                <div className="mt-3 lg:mt-4 flex gap-10 lg:gap-10 font-semibold text-[11px] lg:text-xs text-black items-center">
                  <div className="flex items-center gap-2">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.33333 4.66667C9.33333 4.05383 9.21263 3.447 8.97811 2.88081C8.74358 2.31462 8.39984 1.80017 7.9665 1.36683C7.53316 0.933495 7.01871 0.589751 6.45252 0.355229C5.88634 0.120707 5.2795 0 4.66667 0C4.05383 0 3.447 0.120707 2.88081 0.355229C2.31462 0.589751 1.80018 0.933495 1.36683 1.36683C0.933495 1.80017 0.589751 2.31462 0.355229 2.88081C0.120707 3.447 -9.13196e-09 4.05383 0 4.66667C0 5.59133 0.272667 6.45133 0.736667 7.17667H0.731333L4.66667 13.3333L8.602 7.17667H8.59733C9.07795 6.42774 9.33341 5.55655 9.33333 4.66667ZM4.66667 6.66667C4.13623 6.66667 3.62753 6.45595 3.25245 6.08088C2.87738 5.70581 2.66667 5.1971 2.66667 4.66667C2.66667 4.13623 2.87738 3.62753 3.25245 3.25245C3.62753 2.87738 4.13623 2.66667 4.66667 2.66667C5.1971 2.66667 5.70581 2.87738 6.08088 3.25245C6.45595 3.62753 6.66667 4.13623 6.66667 4.66667C6.66667 5.1971 6.45595 5.70581 6.08088 6.08088C5.70581 6.45595 5.1971 6.66667 4.66667 6.66667Z" fill="black" />
                    </svg>

                    <span className="line-clamp-1">{mentor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.2 8.4C3.08609 8.4 2.0178 7.9575 1.23015 7.16985C0.442499 6.3822 0 5.31391 0 4.2C0 3.08609 0.442499 2.0178 1.23015 1.23015C2.0178 0.442499 3.08609 0 4.2 0C5.31391 0 6.3822 0.442499 7.16985 1.23015C7.9575 2.0178 8.4 3.08609 8.4 4.2C8.4 5.31391 7.9575 6.3822 7.16985 7.16985C6.3822 7.9575 5.31391 8.4 4.2 8.4ZM4.2 6.3C4.75695 6.3 5.2911 6.07875 5.68492 5.68492C6.07875 5.2911 6.3 4.75695 6.3 4.2C6.3 3.64305 6.07875 3.1089 5.68492 2.71508C5.2911 2.32125 4.75695 2.1 4.2 2.1C3.64305 2.1 3.1089 2.32125 2.71508 2.71508C2.32125 3.1089 2.1 3.64305 2.1 4.2C2.1 4.75695 2.32125 5.2911 2.71508 5.68492C3.1089 6.07875 3.64305 6.3 4.2 6.3ZM7 8.225V14L4.2 11.2L1.4 14V8.225C2.22049 8.79998 3.1981 9.10842 4.2 9.10842C5.2019 9.10842 6.17951 8.79998 7 8.225Z" fill="black" />
                    </svg>

                    <span>{mentor.yearsExperience} yrs experience</span>
                  </div>
                  <button className="ml-auto text-gray-400 hover:text-red-500 transition-colors relative -top-8 lg:-top-10">
                    <Heart className="h-4 w-4 text-black" />
                  </button>
                </div>

                <p className="mt-3 lg:mt-4 text-xs lg:text-sm text-black font-medium flex-1 line-clamp-3 leading-relaxed">{mentor.description}</p>

                {/* Stats */}
                <div className="mt-4 lg:mt-6 flex justify-between text-gray-700 w-full font-[Mulish]">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-black text-[11px] lg:text-xs text-center whitespace-nowrap">Response Time</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
                      <span className="text-xs lg:text-sm font-bold">&lt; {mentor.responseTime} hrs</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-black text-[11px] lg:text-xs text-center whitespace-nowrap">Total Mentees</span>
                    <div className="flex font-bold items-center gap-1 mt-1">
                      <Users className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500" />
                      <span className="text-xs lg:text-sm font-bold">{mentor.mentees}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-black text-[11px] lg:text-xs text-center whitespace-nowrap">Success Rate</span>
                    <div className="flex items-center gap-1 mt-1">
                      <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7106 0.519957C16.6255 0.315036 16.4626 0.152192 16.2577 0.0670911C16.1569 0.0241184 16.0486 0.00132504 15.939 0H11.7458C11.5234 0 11.3101 0.0883566 11.1528 0.245632C10.9955 0.402908 10.9072 0.616219 10.9072 0.83864C10.9072 1.06106 10.9955 1.27437 11.1528 1.43165C11.3101 1.58892 11.5234 1.67728 11.7458 1.67728H13.9179L9.2299 6.36528L6.47078 3.59777C6.39281 3.51916 6.30006 3.45677 6.19786 3.41419C6.09567 3.37162 5.98605 3.3497 5.87534 3.3497C5.76463 3.3497 5.65502 3.37162 5.55282 3.41419C5.45062 3.45677 5.35787 3.51916 5.27991 3.59777L0.248068 8.62961C0.169464 8.70757 0.107074 8.80032 0.0644972 8.90252C0.0219206 9.00471 0 9.11433 0 9.22504C0 9.33575 0.0219206 9.44536 0.0644972 9.54756C0.107074 9.64976 0.169464 9.74251 0.248068 9.82047C0.326031 9.89908 0.418785 9.96147 0.520981 10.004C0.623177 10.0466 0.732792 10.0685 0.843503 10.0685C0.954213 10.0685 1.06383 10.0466 1.16602 10.004C1.26822 9.96147 1.36097 9.89908 1.43894 9.82047L5.87534 5.37568L8.63447 8.14319C8.71243 8.2218 8.80518 8.28419 8.90738 8.32677C9.00958 8.36934 9.11919 8.39126 9.2299 8.39126C9.34061 8.39126 9.45023 8.36934 9.55242 8.32677C9.65462 8.28419 9.74737 8.2218 9.82534 8.14319L15.1004 2.85976V5.03184C15.1004 5.25426 15.1887 5.46757 15.346 5.62485C15.5033 5.78212 15.7166 5.87048 15.939 5.87048C16.1614 5.87048 16.3748 5.78212 16.532 5.62485C16.6893 5.46757 16.7777 5.25426 16.7777 5.03184V0.83864C16.7763 0.729049 16.7535 0.62078 16.7106 0.519957Z" fill="#16A34A"/>
</svg>

                      <span className="text-xs lg:text-sm font-bold">{mentor.successRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Expertise / Languages */}
                <div className="mt-4 lg:mt-6 flex flex-wrap gap-2 text-black font-[Mulish]">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-3 lg:px-4 py-1 bg-[#edf7ff] text-[11px] lg:text-xs rounded-full font-semibold">
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-3 lg:px-4 py-1 bg-[#edf7ff] text-[11px] lg:text-xs rounded-full font-semibold">
                      +{mentor.expertise.length - 3}
                    </span>
                  )}
                </div>
                {mentor.languages && mentor.languages.length > 0 && (
                  <div className="mt-2 lg:mt-3 inline-block font-medium">
                    <div className="group relative inline-flex items-center justify-center gap-1 px-3 py-1 bg-[#e9eef3] text-[11px] lg:text-xs rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:min-w-max">
                      <Globe className="w-3 h-3 text-blue-400 transition-opacity duration-300 group-hover:opacity-0 group-hover:w-0" />
                      <span className="whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0 group-hover:absolute group-hover:invisible">
                        Languages
                      </span>
                      <span className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:relative whitespace-nowrap">
                        {mentor.languages.join(", ")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-6 lg:mt-8 flex items-start gap-3 lg:gap-4">
                  <div className="flex flex-col pt-4 lg:pt-6">
                    <span className="text-xs lg:text-sm font-semibold text-gray-600">Starting from</span>
                    <span className="mt-1">
                      <span className="text-base lg:text-lg font-bold text-[#0073CF]">₹{mentor.price}</span>
                      <span className="text-sm lg:text-base font-bold text-black">/Session</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Button variant="outline" size="sm" className="w-full border-black hover:border-[#0073CF] rounded-full hover:bg-[#edf7ff] text-xs lg:text-sm font-semibold transition-all">
                      <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" className="w-full bg-[#0073cf] text-white hover:bg-[#003c6c] rounded-full text-xs lg:text-sm font-semibold transition-all">
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