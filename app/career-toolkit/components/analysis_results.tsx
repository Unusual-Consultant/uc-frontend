"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface AnalysisResultsProps {
  resumeText: string
  highlightWords: string[]
  missingKeywords: string[]
  aiInsights: string[]
  matchScore: number
}

export default function AnalysisResults({
  resumeText,
  highlightWords,
  missingKeywords,
  aiInsights,
  matchScore,
}: AnalysisResultsProps) {
  // highlight keywords
  const highlightText = (text: string) => {
    const regex = new RegExp(`\\b(${highlightWords.join("|")})\\b`, "gi")
    return text.replace(regex, (match) => `<span class="bg-green-200 font-semibold">${match}</span>`)
  }

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-5xl px-2">
        <div className="flex items-center gap-3">
          <Image src="/light-bulb.png" alt="analysis" width={35} height={35} />
          <div>
            <h1 className="text-[#003C6C] text-[28px] font-bold">Analysis Results</h1>
            <p className="text-gray-700 text-[15px]">See your resume&apos;s match score and AI suggestions</p>
          </div>
        </div>

        {/* Semi-Circle Gradient Meter */}
        <div className="relative w-40 h-24">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <defs>
              <linearGradient id="matchGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#003C6C" />
                <stop offset="100%" stopColor="#FF55C1" />
              </linearGradient>
            </defs>

            <path d="M10 50 A40 40 0 0 1 90 50" stroke="#E5E7EB" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              stroke="url(#matchGradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray="126"
              strokeDashoffset={126 - (matchScore / 100) * 126}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#003C6C] pt-4">
            <span className="text-lg font-semibold">{matchScore}%</span>
            <span className="text-sm font-medium">Match Score</span>
          </div>
        </div>
      </div>

      {/* Main White Box */}
      <Card className="w-full max-w-5xl shadow-[0_4px_12px_#9F9D9D40,0_-4px_12px_#DADADA40] rounded-2xl">
        <CardContent className="p-8 space-y-8">
          {/* Your Resume */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/green_tick.png" alt="Your Resume" width={22} height={22} />
              <h2 className="text-[20px] font-semibold text-gray-900">Your Resume</h2>
            </div>
            <div
              className="bg-[#F8F9FB] border border-gray-300 rounded-xl p-4 mt-2 text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap font-[Inter]"
              dangerouslySetInnerHTML={{ __html: highlightText(resumeText.replace(/\n/g, "<br>")) }}
            />
          </div>

          {/* Missing Keywords */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/missingkeyword.png" alt="Missing Keywords" width={22} height={22} />
              <h2 className="text-[20px] font-semibold text-gray-900">Missing Keywords</h2>
            </div>
            <div className="bg-[#F8F9FB] border border-gray-300 rounded-xl p-4 mt-2 flex flex-wrap gap-2">
              {missingKeywords.map((kw) => (
                <span key={kw} className="bg-[#FEE2E2] text-[#A02A2A] px-3 py-1 rounded-full text-[16px]">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/bi_stars.png" alt="sparkle" width={24} height={24} />
              <h2 className="text-[20px] font-semibold text-gray-900">AI Powered Insights from Smart Buddy</h2>
            </div>
            <div className="bg-[#F8F9FB] border border-gray-300 rounded-xl p-4 mt-2 text-[16px] text-gray-700 leading-relaxed space-y-2">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Image src="/lightbulb-circle.png" alt="spark" width={21} height={21} />
                  <p>{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
