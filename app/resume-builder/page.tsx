'use client'

import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const resumeOfferings = [
  {
    title: "Resume Templates",
    description: "Browse our collection of ATS-friendly resume templates tailored for different industries and experience levels.",
    href: "/career-toolkit/resume-builder",
    backgroundImage: "/resume-templates.png",
    buttonText: "Browse Templates",
    priceText: "234 free available",
  },
  {
    title: "AI Resume Analyzer",
    description: "Upload your resume and get AI-powered insights on formatting, content quality, and ATS compatibility.",
    href: "/career-toolkit/ai-resume-analyzer",
    backgroundImage: "/resume-analyser.png",
    buttonText: "Analyse Resume",
    priceText: "Free Forever",
  },
  {
    title: "Expert Review",
    description: "Connect with industry experts who can provide personalized feedback and suggestions for improvement.",
    href: "/quickactions/resume-review",
    backgroundImage: "/expert-review.png",
    buttonText: "Book Expert Review",
    priceText: "Starting from ₹89",
  },
]

const faqs = [
  {
    question: "What makes your resume templates ATS-friendly?",
    answer: "Our templates are specifically designed to pass Applicant Tracking Systems. They use clean formatting, standard fonts, and proper structure that ATS software can easily parse and read."
  },
  {
    question: "How does the AI Resume Analyzer work?",
    answer: "Our AI analyzes your resume for formatting issues, keyword optimization, content quality, and ATS compatibility. It provides actionable insights and suggestions to improve your resume's effectiveness."
  },
  {
    question: "Can I get expert feedback on my resume?",
    answer: "Yes! You can book a session with industry experts who will provide personalized feedback and suggestions tailored to your career goals and target industry."
  },
  {
    question: "Are the resume templates free to use?",
    answer: "We offer 234 free resume templates that you can use immediately. Premium templates with advanced features are also available for purchase."
  },
  {
    question: "How long does an expert review take?",
    answer: "Expert reviews typically take 24-48 hours. You'll receive detailed feedback via email, and you can book a follow-up call if needed."
  },
]

export default function ResumeBuilderPage() {
  const [openFAQs, setOpenFAQs] = useState<number[]>([])

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 font-[Mulish] pb-0">
      {/* Constrained content wrapper */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1300px] pb-16">
        {/* Banner */}
        <div className="relative w-full flex justify-center mb-8 lg:mb-10">
          <Image
            src="/resume-banner.png"
            alt="Resume Builder Banner"
            width={1400}
            height={150}
            className="object-contain"
            priority
          />
        </div>

      

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {resumeOfferings.map((offering) => (
            <Card
              key={offering.title}
              className="border-0 shadow-[0_20px_40px_#9F9D9D40] overflow-hidden flex flex-col h-full rounded-2xl"
            >
              <div className="relative h-38 overflow-hidden">
                <img
                  src={offering.backgroundImage || "/placeholder.svg"}
                  alt={offering.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">{offering.title}</h3>
                  <CardDescription className="text-gray-800 text-base leading-relaxed">
                    {offering.description}
                  </CardDescription>
                  
                  {/* Pricing Info */}
                  <div className="mt-4 text-left">
                    <p className="text-[#0073CF] font-bold text-base">{offering.priceText}</p>
                  </div>
                </div>

                {/* Explore Button */}
                <Link href={offering.href} className="mt-6">
                  <Button
                    className="relative w-full bg-[#0073CF] hover:bg-[#0073CF] text-white rounded-full overflow-hidden h-11 flex items-center justify-center group px-2"
                  >
                    {/* Button text */}
                    <span className="z-10 relative text-center font-medium transition-all duration-300 group-hover:opacity-0">
                      {offering.buttonText}
                    </span>

                    {/* Arrow circle */}
                    <span className="absolute right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-16px)] group-hover:right-2 group-hover:rounded-full">
                      <ArrowRight className="text-[#0073CF] h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="mt-16 mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold m-2">
            <span className="text-black">Why choose our </span>
            <span className="text-[#0073CF]">Resume Builder?</span>
          </h2>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {[
            {
              title: "ATS-Friendly",
              description: "All templates pass Applicant Tracking System",
              icon: "/icons/ats-friendly.png",
            },
            {
              title: "AI-Powered",
              description: "Smart suggestions and instant feedback",
              icon: "/icons/ai-powered.png",
            },
            {
              title: "Expert Reviewed",
              description: "Designed by HR professionals",
              icon: "/icons/expert-reviewed.png",
            },
            {
              title: "Easy to use",
              description: "Optimize your resume in minutes",
              icon: "/icons/easy-to-use.png",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="relative border-0 shadow-[0_20px_40px_#9F9D9D40] rounded-2xl pt-8"
            >
              {/* Blue circle - half above card */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#0073CF] rounded-full flex items-center justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              <CardContent className="pt-12 mb-6 pb-6 px-12 text-center">
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className=" text-base leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold m-2 mb-12">
            <span className="text-black">Frequently Asked </span>
            <span className="text-[#0073CF]">Questions?</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 relative"
              >
                {/* Blue strip on left */}
                <div className="absolute left-0 top-0 h-full w-2 bg-[#0073CF] rounded-l-2xl"></div>
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 pl-8 flex items-center justify-between transition-colors"
                >
                  <span className="text-left font-bold text-lg text-black pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 bg-[#f0f8ff] rounded-full flex items-center justify-center transition-transform duration-300 ${openFAQs.includes(index) ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-[#0073CF]" />
                  </div>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 pt-2 pl-8">
                    <p className="text-gray-700 text-base leading-relaxed font-semibold">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}