'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download, Bot } from 'lucide-react'

interface CareerResource {
  id: string
  title: string
  description: string
  downloads: string
  type: 'template' | 'checklist' | 'generator' | 'analyzer' | 'ai-tool'
  isFree?: boolean
  isAI?: boolean
  image: string
  icon: string
  backgroundColor: string
}

export function CareerToolkitSection() {
  const [resources] = useState<CareerResource[]>([
    {
      id: '1',
      title: 'Resume Template',
      description: 'ATS-friendly resume template used by top performers.',
      downloads: '11.7k downloads',
      type: 'template',
      isFree: true,
      image: '/resume_template.png',
      icon: '/docicon.png',
      backgroundColor: 'bg-[#5fb8b7]',
    },
    {
      id: '2',
      title: 'Interview Checklist',
      description: 'Complete prep checklist for PM interviews.',
      downloads: '829k downloads',
      type: 'checklist',
      isFree: true,
      image: '/interview_checklist.png',
      icon: '/tickicon.png',
      backgroundColor: 'bg-[#f57d7a]',
    },
    {
      id: '3',
      title: 'Career Roadmap Generator',
      description: 'Personalized path to your dream role.',
      downloads: '2.1k daily users',
      type: 'generator',
      isAI: true,
      image: '/roadmap.png',
      icon: '/roadmap.svg',
      backgroundColor: 'bg-[#C8BAFE]',
    },
    {
      id: '4',
      title: 'AI Resume Analyzer',
      description: 'Get instant feedback on your resume.',
      downloads: '2.1k daily users',
      type: 'ai-tool',
      isAI: true,
      image: '/resumeanalyzer.png',
      icon: '/brainicon.png',
      backgroundColor: 'bg-[#21abba]',
    },
  ])

  const handleDownload = (resourceId: string) => {
    console.log('Download resource:', resourceId)
  }

  const handleTryAI = (resourceId: string) => {
    console.log('Try AI tool:', resourceId)
  }

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="/ep_document.png"
            alt="Career Toolkit Icon"
            width={28}
            height={34}
            className="object-contain"
          />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            <span className="text-[#003b6b]">Career</span>
            <span className="text-text-primary"> Toolkit</span>
          </h2>
        </div>

        <p className="text-base md:text-lg font-medium leading-normal text-gray-500 mb-8 md:mb-12 pl-9">
          Free resources to accelerate your career
        </p>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-background-card rounded-xl overflow-hidden shadow-[0px_4px_4px_#0000003f]"
            >
              {/* Header with Image */}
              <div
                className={`${resource.backgroundColor} rounded-t-xl p-4 md:p-6 relative h-32 md:h-36 flex items-center justify-center`}
              >
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-contain max-w-full max-h-full"
                />

                {/* Free/AI Badge */}
                <div className="absolute top-4 left-4">
                  {resource.isFree ? (
                    <span className="px-4 py-1 bg-[#dcecfc] rounded-2xl text-base font-semibold text-text-primary">
                      Free
                    </span>
                  ) : resource.isAI ? (
                    <span className="px-6 py-1 bg-[#dcecfc] rounded-2xl text-base font-semibold text-text-primary">
                      AI
                    </span>
                  ) : null}
                </div>

                {/* Small Icon with background */}
                <div className="absolute -bottom-8 right-6 bg-[#DDEDFD]  p-3 shadow">
                  <Image
                    src={resource.icon}
                    alt={`${resource.type} icon`}
                    width={42}
                    height={42}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 pt-12">
                <h3 className="text-xl md:text-2xl font-bold leading-relaxed text-text-primary mb-3">
                  {resource.title}
                </h3>
                <p className="text-base font-normal leading-relaxed text-text-primary mb-4">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold leading-normal text-blue-600">
                    {resource.downloads}
                  </span>

                  {resource.isFree ? (
                    <Button
                      className="px-4 h-10 rounded-full bg-blue-600 text-white flex items-center gap-2"
                      onClick={() => handleDownload(resource.id)}
                    >
                      <Download className="h-5 w-5" />
                      Download
                    </Button>
                  ) : (
                    <Button
                      className="px-4 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center gap-2"
                      onClick={() => handleTryAI(resource.id)}
                    >
                      <Bot className="h-5 w-5" />
                      Try
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
