"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Verified,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { API_BASE_URL } from "@/lib/api";


// Types for API responses
interface Mentor {
  id: string;
  mentor_id: string;
  featured_since?: string;
  mentor: {
    id: string;
    user_id: string;
    bio?: string;
    headline?: string;
    location?: string;
    rating?: number;
    total_sessions?: number;
    company?: string;
    years_experience?: number;
    current_position?: string;
    hourly_rate?: number;
    skills?: string[];
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
}

interface Testimonial {
  id: string;
  testimonial_id: string;
  priority: number;
  featured_at?: string;
  expires_at?: string;
  created_at: string;
  testimonial: {
    id: string;
    content?: string;
    rating?: number;
    created_at: string;
    mentee_name?: string;
    mentee_image?: string;
  };
}

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [popularSkills, setPopularSkills] = useState<string[]>(["Product Management", "Software Engineering", "Data Science", "UX Design"]);
  const [hovered, setHovered] = useState(false);
  const mentorsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  // Transform testimonial data to frontend format
  const transformTestimonial = (backendTestimonial: any) => {
    if (!backendTestimonial || !backendTestimonial.testimonial) {
      return {
        name: "Student",
        content: "Great experience!",
        rating: 5,
        role: "Mentee",
        company: "",
        image: "/placeholder.svg"
      };
    }

    const testimonial = backendTestimonial.testimonial;

    return {
      name: testimonial.mentee_name || "Student",
      content: testimonial.content || "Great experience!",
      rating: testimonial.rating || 5,
      role: "Mentee",
      company: "",
      image: testimonial.mentee_image || "/placeholder.svg"
    };
  };

  // Transform backend data to frontend format
  const transformMentor = (backendMentor: any) => {
    if (!backendMentor || !backendMentor.mentor) {
      return {
        id: "unknown",
        name: "Mentor",
        title: "Mentor",
        company: "",
        image: "/placeholder.svg?height=80&width=80",
        rating: 0,
        sessions: 0,
        location: "Remote",
        skills: ["Expert"],
        price: 100,
        available: true,
      };
    }
    const mentor = backendMentor.mentor;
    const bioParts = mentor.bio?.split(' at ') || [];

    // Extract name from full_name, first_name/last_name, or bio
    let name = mentor.full_name || "Mentor";
    if (!name || name === "Mentor") {
      if (mentor.first_name && mentor.last_name) {
        name = `${mentor.first_name} ${mentor.last_name}`;
      } else if (bioParts[0]) {
        name = bioParts[0];
      }
    }

    // Get skills array or use headline
    const skills = mentor.skills && mentor.skills.length > 0
      ? mentor.skills
      : [mentor.headline || "Expert"];

    // Get hourly rate directly from backend
    const price = mentor.hourly_rate || 1000;

    return {
      id: backendMentor.mentor_id,
      name: name,
      title: bioParts[0] || mentor.headline || "Expert",
      company: mentor.company || "",
      image: mentor.profile_picture_url || "/placeholder.svg?height=80&width=80",
      rating: mentor.rating || 0,
      sessions: mentor.total_sessions || 0,
      location: mentor.location || "Remote",
      skills: skills,
      price: price,
      available: true,
    };
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorsRes, testimonialsRes, skillsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/featured-mentors/`),
          fetch(`${API_BASE_URL}/featured-testimonials/`),
          fetch(`${API_BASE_URL}/statistics/trending-skills?limit=4`)
        ]);

        if (mentorsRes.ok) {
          const mentorsData = await mentorsRes.json();
          const transformedMentors = (mentorsData.featured_mentors || []).map(transformMentor);
          setMentors(transformedMentors);
        }

        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          const transformedTestimonials = (testimonialsData.featured_testimonials || []).map(transformTestimonial);
          setTestimonials(transformedTestimonials);
        }

        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          if (skillsData.skills && skillsData.skills.length > 0) {
            setPopularSkills(skillsData.skills);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock data if API fails
        const { featuredMentors, testimonials } = await import("@/lib/data");
        setMentors(featuredMentors);
        setTestimonials(testimonials);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorsRes, testimonialsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/featured-mentors/`),
          fetch(`${API_BASE_URL}/featured-testimonials/`),
        ]);

        if (mentorsRes.ok) {
          const mentorsData = await mentorsRes.json();
          setMentors((mentorsData.featured_mentors || []).map(transformMentor));
        }

        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(
            (testimonialsData.featured_testimonials || []).map(
              transformTestimonial
            )
          );
        }
      } catch (e) {
        console.error("API error:", e);
      }
    };
    fetchData();
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      router.push(`/mentors?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/mentors");
    }
  }, [searchQuery, router]);


  const words = ["AI", "Guidance", "Mentorship", "Support"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  const scroll = (ref: any, direction: "left" | "right") => {
    if (!ref.current) return;
    const container = ref.current as HTMLDivElement;
    const amount = 300;
    const delta = direction === "left" ? -amount : amount;
    const next = container.scrollLeft + delta;

    // Looping behavior: if near edges, recenter around middle
    const maxScroll = container.scrollWidth;
    const view = container.clientWidth;

    if (next < view) {
      container.scrollLeft = maxScroll / 2; // jump to middle
    } else if (next + view * 1.5 > maxScroll) {
      container.scrollLeft = maxScroll / 2 - view; // jump to middle-left
    }

    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Removed auto-centering to avoid interfering with transform animation loop
  // useEffect(() => {
  //   const c = mentorsRef.current;
  //   if (c && c.scrollWidth > 0) {
  //     c.scrollLeft = c.scrollWidth / 2 - c.clientWidth / 2;
  //   }
  // }, [mentors.length]);

  return (
    <section
      className="relative overflow-hidden min-h-[57.625rem]"
      style={{
        background:
          "linear-gradient(165deg, #FFFFFF 0%, #FFFFFF 40%, #D1EAFF 55%, #B7DFFF 70%)",
      }}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-[5rem] left-[2.5rem] w-[18rem] h-[18rem] bg-blue-100 rounded-full filter blur-[4rem] opacity-20 animate-blob"></div>
        <div className="absolute top-[10rem] right-[2.5rem] w-[18rem] h-[18rem] bg-blue-50 rounded-full filter blur-[4rem] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[2rem] left-[5rem] w-[18rem] h-[18rem] bg-blue-200 rounded-full filter blur-[4rem] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto max-w-[90rem] px-[1rem] sm:px-[2rem] lg:px-[4rem] pt-[6rem] pb-[3rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3rem] items-start min-h-[80vh]">
          {/* Left Column */}
          <div className="space-y-[2rem]">
            {/* Animated Heading */}
            <div
              className="space-y-[1.2rem] relative"
              style={{
                width: "608.22px",
                opacity: 1,
                transform: "rotate(0deg)",
              }}
            >
              <h1 className="text-[50px] md:text-[55px] font-[800] text-gray-900 leading-tight mb-4">
                Find Unusual Growth
                <br />
                <span className="text-black">through </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[currentWordIndex]}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block bg-gradient-to-r from-[#0073CF] to-[#003C6C] bg-clip-text text-transparent font-bold"
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>

              <p className="text-[1.25rem] text-black leading-relaxed max-w-[36rem]">
                AI as your frontline mentor, with human experts ready to step in
                for deeper guidance on demand.
              </p>
            </div>

            {/* Search Bar */}
            <div className="space-y-[1rem] mt-[1rem]">
              <div className="flex items-center bg-white rounded-full shadow-lg p-[0.25rem] gap-[0.5rem] overflow-hidden shadow-[#58585840]">
                <div className="relative flex-1">
                  <Search className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-black h-[1.25rem] w-[1.25rem]" />
                  <Input
                    type="text"
                    placeholder="Search by skill, role, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-[3rem] pr-[1.25rem] py-[1rem] text-[1.125rem] border-none bg-transparent text-black placeholder-black focus:ring-0 focus:outline-none rounded-full"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="px-[2rem] py-[1rem] text-[1.125rem] font-medium bg-[#0073CF] text-white hover:bg-[#005fa3] rounded-full transition-all"
                >
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-bold text-[15px] text-black">Popular:</span>
                {popularSkills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-pointer text-[15px] bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-gray-100 transition"
                    onClick={() => {
                      setSearchQuery(skill);
                      handleSearch();
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-[1rem]">
              <div className="relative inline-block group">
                <Button
                  asChild
                  className="w-[241px] h-[54px] rounded-[36.08px] bg-[#0073CF] text-white text-[20px] font-semibold opacity-100 hover:bg-[#005fa3] transition-all duration-300"
                >
                  <Link href="/mentors">Find a mentor</Link>
                </Button>

                {/* Tooltip bubble */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[65px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                  <div className="relative bg-white text-[#003C6C] text-[14px] font-medium px-5 py-3 rounded-xl shadow-[0_4px_8px_#9F9D9D40] w-[221px] text-center">
                    Looking for guidance?
                    {/* Small arrow */}
                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" />
                  </div>
                </div>
              </div>



              {/* Wrap the button + tooltip inside a group */}
              <div className="relative inline-block group">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-[241px] h-[54px] rounded-[36.08px] text-[20px] bg-transparent border-black hover:bg-white hover:border-white transition-all duration-300"
                >
                  <Link href="/signup">Become a Mentor</Link>
                </Button>

                {/* Tooltip bubble */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[65px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                  <div className="relative bg-white text-[#003C6C] text-[14px] font-medium px-5 py-3 rounded-xl shadow-[0_4px_8px_#9F9D9D40] w-[293px] text-center">
                    Want to be mentor as an expert?
                    {/* Small arrow */}
                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Animated Cards */}
          <div className="space-y-10 relative">

            {/* Mentors Section */}
            <div className="relative">
              <h3 className=" font-[700] text-black text-[22px] mb-3">
                Meet our Mentors
              </h3>
              <div
                ref={mentorsRef}
                className="relative overflow-x-auto no-scrollbar whitespace-nowrap"
                role="region"
              >
                <div className="inline-flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
                  {[...mentors, ...mentors].map((mentor, i) => (
                    <Card
                      key={`${mentor.id}-${i}`}
                      className="bg-white/90 w-[522px] h-[246px] shadow-md hover:shadow-2xl rounded-2xl transition-all transform hover:-translate-y-1 border-0"
                    >
                      <CardContent className="p-4 pt-7"> {/* Slightly increased top padding for better vertical balance */}
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="relative py-3">
                            <Avatar className="w-[65px] h-[65px]">
                              <AvatarImage
                                src={mentor.image || "/placeholder.svg"}
                                alt={mentor.name}
                                className="object-cover"
                              />
                              <AvatarFallback>
                                {(mentor.name || "M")
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-sm text-black py-1">
                            {/* Name, Title, Company */}
                            <div className="space-y-0 mb-2">
                              <h3 className="font-[700] text-[20px] text-base">{mentor.name}</h3>
                              <p className="font-[600] text-[16px]">{mentor.title}</p>
                              <p className="font-[700] text-[16px] text-[#0073CF]">{mentor.company}</p>
                            </div>

                            {/* Rating + Location */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center gap-1 text[500] text-[14px]">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{mentor.rating}</span>
                                <span className=" text-black">({mentor.sessions})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-black" />
                                <span className="text-[14px] font-[500] text-black">{mentor.location}</span>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {mentor.skills.map((skill: string) => (
                                <span
                                  key={skill}
                                  className="w-[110px] h-[23px] rounded-[17.46px] bg-[#D1EAFF66] text-black text-xs font-medium flex items-center justify-center px-[4.36px] py-[5.67px]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>


                            {/* Footer */}
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-[800] text-[20px] ">${mentor.price}/hr</span>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-[120px] h-[38px] rounded-[30px] border border-black text-black text-[14px] font-[600] hover:bg-gray-100 transition-all duration-200"
                                >
                                  View Profile
                                </Button>
                                <Button
                                  size="sm"
                                  disabled={!mentor.available}
                                  className="w-[120px] h-[38px] rounded-[30px] bg-[#0073CF] text-white text-[14px] font-[600] flex items-center justify-center gap-2 hover:bg-[#005fa3] disabled:opacity-50 transition-all duration-200"
                                >
                                  {mentor.available ? "Quick Book" : "Unavailable"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {/* Mentor arrows positioned just below the mentors row */}
              <div className="absolute -bottom-8 right-0 flex gap-2 z-10">
                <button
                  onClick={() => scroll(mentorsRef, "left")}
                  className="w-6 h-6 flex items-center justify-center bg-white/90 border border-gray-300 rounded-full hover:bg-gray-100 shadow-sm transition-all"
                  aria-label="Scroll mentors left"
                >
                  <ChevronLeft size={12} />
                </button>
                <button
                  onClick={() => scroll(mentorsRef, "right")}
                  className="w-6 h-6 flex items-center justify-center bg-white/90 border border-gray-300 rounded-full hover:bg-gray-100 shadow-sm transition-all"
                  aria-label="Scroll mentors right"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* testimonials */}
            <div className="relative py-1">
              <h3 className=" font-[700] text-black text-[22px] mb-3">
                Success Stories
              </h3>

              <div ref={testimonialsRef} className="relative overflow-x-auto no-scrollbar whitespace-nowrap w-full">
                <div className="inline-flex gap-6 animate-scroll-right hover:[animation-play-state:paused]">
                  {[...testimonials, ...testimonials].map((t, i) => (
                    <Card
                      key={`${t.name}-${i}`}
                      className="inline-block w-[522px] h-[213px] flex-shrink-0 bg-white/90 border-0 shadow-md hover:shadow-2xl rounded-2xl transition-all transform hover:-translate-y-1"
                    >
                      <CardContent className="p-5 flex flex-col justify-between h-full">
                        {/* Top Section — Avatar + Text */}
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14 flex-shrink-0">
                            <AvatarImage src={t.image || "/placeholder.svg"} alt={t.name} />
                            <AvatarFallback>
                              {(t.name || "U")
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            {/* Rating */}
                            <div className="flex space-x-1 mb-1 mt-[8px]"> {/* Lowered stars */}
                              {[...Array(t.rating)].map((_, i) => (
                                <Star key={i} className="h-[19px] w-[19px] fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-black text-[16px] font-[600] italic leading-snug break-words whitespace-pre-wrap mt-[4px]"> {/* Lowered paragraph */}
                              “{t.content}”
                            </p>
                          </div>
                        </div>

                        {/* Bottom Section — Name + Role */}
                        <div className="mt-3 ml-[70px]">
                          <div className="text-[18px] font-[800] text-black">{t.name}</div>
                          <div className="text-[16px] text-black font-[600]">
                            {t.role} at {t.company}
                          </div>
                        </div>
                      </CardContent>
                    </Card>


                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 right-0 flex gap-2 z-10">
                <button
                  onClick={() => scroll(testimonialsRef, "left")}
                  className="w-6 h-6 flex items-center justify-center bg-white/90 border border-gray-300 rounded-full hover:bg-gray-100 shadow-sm transition-all"
                  aria-label="Scroll testimonials left"
                >
                  <ChevronLeft size={12} />
                </button>
                <button
                  onClick={() => scroll(testimonialsRef, "right")}
                  className="w-6 h-6 flex items-center justify-center bg-white/90 border border-gray-300 rounded-full hover:bg-gray-100 shadow-sm transition-all"
                  aria-label="Scroll testimonials right"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}