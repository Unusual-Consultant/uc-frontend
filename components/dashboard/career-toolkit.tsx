'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Bot, Loader2 } from 'lucide-react'
import { useAuthenticatedUser } from '@/context/AuthenticatedUserProvider'

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
  const { makeAuthenticatedRequest } = useAuthenticatedUser()
  const [resources, setResources] = useState<CareerResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCareerResources = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const token = localStorage.getItem("auth_token")
        if (!token) {
          console.warn("No auth token found, showing empty state")
          setResources([])
          setIsLoading(false)
          return
        }

        const response = await makeAuthenticatedRequest(
          `/mentee-dashboard/career-resources`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch career resources: ${response.status}`)
        }

        const data: Array<{
          id: string
          title: string
          description: string
          downloads: string
          type: string
          isFree: boolean
          isAI: boolean
          image: string
          icon: string
          backgroundColor: string
        }> = await response.json()

        // Transform backend data to match frontend format
        const transformedResources: CareerResource[] = data.map((resource) => ({
          id: resource.id,
          title: resource.title,
          description: resource.description,
          downloads: resource.downloads,
          type: resource.type as CareerResource['type'],
          isFree: resource.isFree,
          isAI: resource.isAI,
          image: resource.image,
          icon: resource.icon,
          backgroundColor: resource.backgroundColor,
        }))

        setResources(transformedResources)
      } catch (err) {
        console.error("Error fetching career resources:", err)
        setError("Failed to load career resources")
        setResources([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCareerResources()
  }, [makeAuthenticatedRequest])

  const handleTryAI = (resourceId: string) => {
    console.log('Try resource:', resourceId)
    // Navigate to the appropriate career toolkit page based on resource type
    const resource = resources.find(r => r.id === resourceId)
    if (!resource) return
    
    // Map resource types to routes
    const routeMap: Record<string, string> = {
      'template': '/career-toolkit/resume-builder',
      'checklist': '/career-toolkit/ai-interview-checklist',
      'generator': '/career-toolkit/ai-roadmap',
      'analyzer': '/career-toolkit/ai-resume-analyzer',
      'ai-tool': '/career-toolkit/ai-resume-analyzer'
    }
    
    const route = routeMap[resource.type]
    if (route && typeof window !== 'undefined') {
      window.location.href = route
    }
  }

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex items-left gap-2 mb-1">
          <Image
            src="/ep_document.png"
            alt="Career Toolkit Icon"
            width={28}
            height={34}
            className="object-contain"
          />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 ">
            <span className="text-[#003b6b]">Career</span>
            <span className="text-text-primary"> Toolkit</span>
          </h2>
        </div>

        <p className="text-base md:text-lg font-medium leading-normal text-gray-500 mb-8 md:mb-12 pl-9">
          Free resources to accelerate your career
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading career resources...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-2">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Resources Grid */}
        {!isLoading && !error && (
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

                  <Button
                    className="px-4 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center gap-2"
                    onClick={() => handleTryAI(resource.id)}
                  >
                    <Bot className="h-5 w-5" />
                    Try
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
