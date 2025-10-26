"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Verified,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { featuredMentors, testimonials } from "@/lib/data";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 1500); // change word every 1.5s
    return () => clearInterval(interval);
  }, []);

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

      <div className="relative container mx-auto max-w-[90rem] px-[1rem] sm:px-[2rem] lg:px-[4rem] py-[4rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3rem] items-center min-h-[80vh]">
          {/* Left Column */}
          <div className="space-y-[2rem]">
            {/* Animated Heading */}
            <div className="space-y-[1.5rem]">
  <h1 className="text-4xl md:text-5xl lg:text-[55px] font-bold text-gray-900 leading-tight">
    Find Unusual growth
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0073CF] to-[#003C6C]">
      <span className="text-black">through</span> {words[currentWordIndex]}
    </span>
  </h1>



  <p className="text-[1.25rem] text-black leading-relaxed max-w-[36rem]">
    AI as your frontline mentor, with human experts ready to step in
    for deeper guidance on demand.
  </p>
</div>


            {/* Search Bar */}
            <div className="space-y-[1rem]">
              <div className="flex items-center bg-white rounded-full shadow-lg mt-[1.5rem] p-[0.25rem] gap-[0.5rem] overflow-hidden shadow-[#58585840]">
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
  <span className="font-bold text-[15px] text-black ">Popular:</span>
  {["Product Management","Software Engineering","Data Science","UX Design"].map((skill) => (
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="px-8 py-4 text-lg rounded-3xl bg-[#0073CF] text-white hover:bg-[#005fa3]"
              >
                <Link href="/mentors">Find Mentors</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg rounded-3xl bg-transparent border-black"
              >
                <Link href="/signup" >Become a Mentor</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Animated Cards */}
          <div className="space-y-10">
            {/* Mentors Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Meet our Mentors
              </h3>
              <div className="relative overflow-hidden whitespace-nowrap" role="region">
                <div className="inline-flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
                  {[...featuredMentors, ...featuredMentors].map((mentor, i) => (
                    <Card key={`${mentor.id}-${i}`} className="min-w-[20rem] backdrop-blur-sm bg-white/80 border-0 shadow-xl"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Avatar className="w-16 h-16">
                              <AvatarImage
                                src={mentor.image || "/placeholder.svg"}
                                alt={mentor.name}
                              />
                              <AvatarFallback>
                                {mentor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {mentor.available && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-lg text-gray-900">
                                {mentor.name}
                              </h4>
                              <Verified className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {mentor.title}
                            </p>
                            <p className="text-sm font-medium text-blue-600 mb-3">
                              {mentor.company}
                            </p>

                            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{mentor.rating}</span>
                                <span>({mentor.sessions})</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{mentor.location}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {mentor.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="font-bold text-xl">
                                ${mentor.price}/hr
                              </div>
                              <Button
                                size="sm"
                                disabled={!mentor.available}
                                className="disabled:opacity-50"
                              >
                                {mentor.available ? "Book Now" : "Unavailable"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
{/* testimonials */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Success Stories
              </h3>

              <div className="relative overflow-hidden whitespace-nowrap w-full">
  <div className="inline-flex gap-6 animate-scroll-right hover:[animation-play-state:paused]">
    {[...testimonials, ...testimonials].map((t, i) => (
      <Card 
      key={`${t.name}-${i}`}
      className="inline-block w-[20rem] h-auto flex-shrink-0 bg-white/80 border-0 shadow-xl rounded-2xl"
    >
      <CardContent className="p-4 flex flex-col space-y-2">
        {/* Avatar + Rating */}
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={t.image || "/placeholder.svg"} alt={t.name} />
            <AvatarFallback>
              {t.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
    
          <div className="flex flex-col">
            <div className="flex space-x-1 mb-1">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
    
            {/* Testimonial text */}
            <p className="text-gray-700 text-sm italic break-words whitespace-pre-wrap">
              "{t.content}"
            </p>
    
            {/* Name + Role */}
            <div className="text-sm font-medium text-gray-900 mt-1">{t.name}</div>
            <div className="text-xs text-gray-500">{t.role} at {t.company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    ))}
  </div>
</div>


            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
