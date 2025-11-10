"use client";

import "@fontsource/mulish";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Star,
  Zap,
  Verified,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    expertise: ["Product Management", "Strategy", "Leadership"],
    mentees: 45,
    available: true,
    responseTime: "<4 hrs",
    successRate: 95,
    description:
      "Experienced product manager with a passion for building user-centric products.",
    languages: ["English", "Spanish"],
    yearsExperience: 10,
    match: "85",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Software Engineer",
    company: "Meta",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 89,
    location: "Seattle, WA",
    expertise: ["React", "Node.js", "System Design"],
    mentees: 32,
    available: false,
    responseTime: "<6 hrs",
    successRate: 90,
    description: "Full-stack engineer specializing in scalable applications.",
    languages: ["English", "Mandarin"],
    yearsExperience: 8,
    match: "98",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead",
    company: "Apple",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 156,
    location: "Cupertino, CA",
    expertise: ["UX Design", "Design Systems", "Research"],
    mentees: 67,
    available: true,
    responseTime: "<3 hrs",
    successRate: 97,
    description:
      "UX leader guiding product teams to create intuitive and engaging experiences.",
    languages: ["English", "French"],
    yearsExperience: 12,
    match: "95",
  },
];

export default function MentorCards({ showFilters }: { showFilters: boolean }) {
  const sortedMentors = [...mentors].sort(
    (a, b) => parseInt(b.match) - parseInt(a.match)
  );

  return (
    <section className="py-12 font-[Mulish] bg-gray-50 relative">
      <div className="container mx-auto px-4">
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-12 xl:gap-16 transition-all duration-300`}>

          {sortedMentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className="relative flex flex-col items-center"
            >
              {/* 🥇 Top Mentor Badge ABOVE Card */}
              {index === 0 && (
                <div className="absolute -top-[9px] left-[55px] transform -translate-x-1/2 z-30">
                  <Image
                    src="/number_1_mentor.png"
                    alt="Top Mentor"
                    width={130}
                    height={130}
                    className="object-contain"
                  />
                </div>
              )}

              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-[#B9015A] to-[#0172CE]">
                <Card className="relative rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg shadow-[#9F9D9D40] transition-all duration-300 overflow-hidden bg-white w-full mx-auto min-h-[660px]">
                  {/* Top Blue Banner */}
                  <div className="absolute top-0 left-0 w-full h-24 bg-[#C4E1FF] rounded-t-xl z-0" />

                  {/* Match Badge */}
                  <div className="absolute top-3 right-3 z-20 flex flex-col items-center">
  {/* Match Pill */}
  <div className="px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 bg-white text-[#0073CF] w-[110px] h-[25px] justify-center">
    <Sparkles className="h-3 w-3" />
    <span className="font-[800] font-[Mulish]">{mentor.match}% Match</span>
  </div>

  {/* Text below pill */}
  {index === 0 && (
    <div className="mt-1 w-[150px] text-center text-[13px] font-[700] text-[#003C6C] font-[Mulish]">
      Perfect match for {mentor.title} roles
    </div>
  )}
</div>


                  {/* Online Badge */}
                  {mentor.available && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-4 py-1 rounded-full flex items-center gap-1 z-20">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <Zap className="w-3 h-3 text-green-500 fill-green-500" />
                      </div>
                      Online
                    </div>
                  )}

                  {/* Profile Info with slight overlap */}
                  <div className="flex gap-4 items-start relative z-10 mt-[70px] -mb-4">
                    <div className="relative -mt-10 py-6">
                      <Avatar className="w-20 h-20 border-4 border-white shadow-md ">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                      </Avatar>
                      <div className="absolute w-[58px] h-[23px] bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-2  rounded-full text-sm flex items-center gap-1 shadow">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-black">
                          {mentor.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col mt-2 text-black py-2">
                      <div className="flex items-center gap-1">
                        <h3 className="text-lg font-bold">{mentor.name}</h3>
                        <svg
  viewBox="0 0 22 22"
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6 transition-all duration-300 fill-blue-600"
>
  <path
    d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
  />
</svg>

                      </div>
                      <p className="text-sm">{mentor.title}</p>
                      <p className="text-sm font-medium text-blue-600">
                        {mentor.company}
                      </p>
                    </div>
                  </div>

                  {/* Resume Reviewed Image */}
                  <div className="mt-4 -ml-4">
                    <Image
                      src="/resume-reviewed.png"
                      alt="Resume Reviewed"
                      width={245}
                      height={30}
                      className="w-[250px] h-[30px] object-contain"
                    />
                  </div>

                  {/* Location + Experience + Heart */}
                  <div className="mt-2 flex items-center gap-6 font-semibold text-sm text-black relative">
                    <div className="flex items-center gap-1 text-[14px]">
                      <MapPin className="w-4 h-4" /> {mentor.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> {mentor.yearsExperience} yrs experience
                    </div>
                    <button className="ml-auto text-gray-400 hover:text-red-500 transition-colors absolute right-0 -top-14">
                      <Heart className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-black font-[500]">
                    {mentor.description}
                  </p>

                  {/* Stats Row */}
                  <div className="mt-6 flex justify-center gap-4 text-gray-700 w-full max-w-[340px] mx-auto font-[Mulish]">
                    <div className="flex flex-col items-center">
                      <span className="font-[600] text-[13px] text-center whitespace-nowrap">
                        Response Time
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-[13px] font-[700]">
                          {mentor.responseTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-[600] text-[13px] text-center whitespace-nowrap">
                        Total Mentees
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-[13px] font-[700]">
                          {mentor.mentees}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-[600] text-[13px] text-center whitespace-nowrap">
                        Success Rate
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-[13px] font-[700]">
                          {mentor.successRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-6 flex flex-wrap gap-2 text-black font-[Mulish]">
                    {mentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-1 bg-[#D1EAFF] text-[12px] rounded-full font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Languages */}
                  {mentor.languages && (
                    <div className="mt-3 group cursor-pointer inline-block font-[Mulish] font-[500]">
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

                  {/* Resume Review Packages */}
                  <div className="mt-6 p-[1px] rounded-xl bg-gradient-to-r from-[#B9015A] to-[#0172CE]">
                    <div className="bg-gradient-to-r from-[#FFF1F7] via-[#ECF7FF] to-[#F8F9FB] rounded-xl px-4 py-3">
                      <h4 className="text-[14px] font-semibold text-gray-800 mb-2">
                        Resume Review Packages:
                      </h4>
                      <div className="space-y-1 text-sm font-[Mulish]">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Basic Review:</span>
                          <span className="font-semibold text-gray-900">
                            ₹89
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Detailed Review:</span>
                          <span className="font-semibold text-gray-900">
                            ₹149
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Premium + Mock:
                          </span>
                          <span className="font-semibold text-gray-900">
                            ₹249
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-1/2 border-black rounded-full font-[Mulish] font-semibold"
                    >
                      <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="w-1/2 bg-blue-600 text-white hover:bg-blue-700 rounded-full font-[Mulish] font-semibold"
                    >
                      Quick Book
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
