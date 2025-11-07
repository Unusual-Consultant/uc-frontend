"use client";

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
  Verified,
  Globe,
  Award,
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
    price: 150,
    mentees: 45,
    available: true,
    responseTime: "<4 hrs",
    successRate: 95,
    description: "Experienced product manager with a passion for building user-centric products.",
    languages: ["English", "Spanish"],
    yearsExperience: 10,
    badge: "Top Mentor",
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
    price: 120,
    mentees: 32,
    available: false,
    responseTime: "<6 hrs",
    successRate: 90,
    description: "Full-stack engineer specializing in scalable applications.",
    languages: ["English", "Mandarin"],
    yearsExperience: 8,
    badge: "Expert",
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
    price: 180,
    mentees: 67,
    available: true,
    responseTime: "<3 hrs",
    successRate: 97,
    description: "UX leader guiding product teams to create intuitive and engaging experiences.",
    languages: ["English", "French"],
    yearsExperience: 12,
    badge: "Top Rated",
  },
];

export default function MentorCards() {
  return (
    <section className="py-12 font-[Mulish] bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="relative border border-[#C7C7C7] rounded-xl p-4 flex flex-col hover:shadow-lg shadow-[#9F9D9D40] transition-all duration-300 overflow-hidden bg-white"
            >
              {/* Top Banner */}
              <div className="absolute top-0 left-0 w-full h-16 bg-[#C4E1FF] rounded-t-xl z-0" />

              {/* Badge */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 z-20 ${
                  mentor.badge === "Top Rated"
                    ? "bg-yellow-200 text-yellow-800"
                    : mentor.badge === "Expert"
                    ? "bg-purple-200 text-purple-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                <Award className="w-3 h-3" />
                {mentor.badge}
              </div>

              {/* Online Indicator */}
              {mentor.available && (
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-20">
                  <Zap className="w-3 h-3" /> Online
                </div>
              )}

              {/* Profile Info */}
              <div className="flex gap-4 items-start relative z-10 mt-14">
                <div className="relative -mt-6">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                  </Avatar>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-2 py-0.5 rounded-full text-sm flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 text-yellow-400" /> {mentor.rating.toFixed(1)}
                  </div>
                </div>

                <div className="flex-1 flex flex-col mt-1 text-black">
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-bold">{mentor.name}</h3>
                    <Verified className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm">{mentor.title}</p>
                  <p className="text-sm font-medium text-blue-600">{mentor.company}</p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 flex gap-6 font-semibold text-sm text-black items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {mentor.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> {mentor.yearsExperience} yrs
                </div>
                <button className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-800">{mentor.description}</p>

              {/* Stats */}
              <div className="mt-6 flex gap-6 justify-start text-sm text-gray-700">
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Response</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>{mentor.responseTime}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Mentees</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{mentor.mentees}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Success</span>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{mentor.successRate}%</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2 text-black">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#D1EAFF] text-[10px] rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Languages */}
              {mentor.languages && (
                <div className="mt-4 group cursor-pointer inline-block">
                  <div className="relative inline-flex items-center justify-center gap-1 px-2 py-1 bg-gray-300 text-xs rounded-full transition-all duration-300 ease-in-out">
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

              {/* Rate + Buttons */}
              <div className="mt-8 flex items-start gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Starting from</span>
                  <span className="text-lg font-bold text-[#0073CF]">₹{mentor.price}/hr</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-black rounded-full"
                  >
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full"
                  >
                    Quick Book
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
