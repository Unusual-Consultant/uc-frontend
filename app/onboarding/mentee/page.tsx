"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface SignupOption {
  id: number
  name: string
}

interface SignupOptions {
  career_goals: SignupOption[]
  interests: SignupOption[]
  languages: SignupOption[]
  career_stages: SignupOption[]
}

export default function SignupStep2() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState<SignupOptions | null>(null)
  const [selectedCareerGoal, setSelectedCareerGoal] = useState<number | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([])
  const [selectedCareerStage, setSelectedCareerStage] = useState<number | null>(null)
  const [customGoal, setCustomGoal] = useState("")
  const [customInterest, setCustomInterest] = useState("")
  
  // Get email and userType from URL params
  const email = searchParams.get("email") || localStorage.getItem("google_email") || ""
  const userType = searchParams.get("userType") || localStorage.getItem("userType") || "mentee"
  
  useEffect(() => {
    fetchSignupOptions()
  }, [])

  const fetchSignupOptions = async () => {
    try {
      // Since this is step 2, we might not have the auth token yet
      // We'll need to get the options without authentication for new users
      const response = await fetch("http://localhost:8000/api/v1/mentee/signup/options", {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch options")
      }

      const data = await response.json()
      setOptions(data)
    } catch (error) {
      console.error("Error fetching signup options:", error)
      // For now, we'll set some default options if API fails
      setOptions({
        career_goals: [
          { id: 1, name: "Crack Product management Interview" },
          { id: 2, name: "Get job abroad" },
          { id: 3, name: "Switch to Data Science" },
          { id: 4, name: "Learn AI UX Design" },
          { id: 5, name: "MBA Preparation" },
          { id: 6, name: "Government Exams Preparation" },
          { id: 7, name: "Start my own Startup" },
          { id: 8, name: "Learn Coding/Programming" },
          { id: 9, name: "Get promoted to Senior role" },
          { id: 10, name: "Career change guidance" },
          { id: 11, name: "Improve leadership skills" },
          { id: 12, name: "Freelancing Guidance" }
        ],
        interests: [
          { id: 1, name: "Product management" },
          { id: 2, name: "Data Science" },
          { id: 3, name: "UI UX Design" },
          { id: 4, name: "Software Engineering" },
          { id: 5, name: "Digital Marketing" },
          { id: 6, name: "MBA Preparation" },
          { id: 7, name: "Government Exams" },
          { id: 8, name: "Startup Guidance" },
          { id: 9, name: "Consulting" },
          { id: 10, name: "Finance & Banking" },
          { id: 11, name: "Content Writing" },
          { id: 12, name: "Graphic Design" },
          { id: 13, name: "Sales & Business Development" },
          { id: 14, name: "HR & People Operations" }
        ],
        languages: [
          { id: 1, name: "English" },
          { id: 2, name: "Hindi" },
          { id: 3, name: "German" },
          { id: 4, name: "Spanish" },
          { id: 5, name: "French" },
          { id: 6, name: "Mandarin" }
        ],
        career_stages: [
          { id: 1, name: "Student" },
          { id: 2, name: "Entry Level (0-2 years)" },
          { id: 3, name: "Mid Level (3-7 years)" },
          { id: 4, name: "Senior Level (8+ years)" }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCareerGoalSelect = (goalId: number) => {
    setSelectedCareerGoal(goalId)
    setCustomGoal("")
  }

  const handleInterestToggle = (interestId: number) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : prev.length < 3 ? [...prev, interestId] : prev
    )
  }

  const handleLanguageToggle = (languageId: number) => {
    setSelectedLanguages(prev => 
      prev.includes(languageId) 
        ? prev.filter(id => id !== languageId)
        : prev.length < 3 ? [...prev, languageId] : prev
    )
  }

  const handleContinue = () => {
    if (!selectedCareerGoal && !customGoal.trim()) {
      alert("Please select a career goal or enter a custom one")
      return
    }
    
    if (selectedInterests.length === 0 && !customInterest.trim()) {
      alert("Please select at least one interest")
      return
    }
    
    if (selectedLanguages.length === 0) {
      alert("Please select at least one language")
      return
    }
    
    if (!selectedCareerStage) {
      alert("Please select your current career stage")
      return
    }

    // Save selections and redirect based on user type
    const selections = {
      email: email,
      userType: userType,
      career_goal: selectedCareerGoal || customGoal,
      interests: selectedInterests,
      languages: selectedLanguages,
      career_stage: selectedCareerStage,
      custom_interest: customInterest
    }
    
    localStorage.setItem(`${userType}_onboarding_data`, JSON.stringify(selections))
    
    // Redirect to appropriate dashboard
    router.push(`/${userType}/dashboard`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Loading options...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!options) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-lg mb-4">Failed to load options. Please try again.</p>
          <button 
            onClick={fetchSignupOptions} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">UC</span>
            </div>
            <span className="font-medium text-gray-800">Unusual Consultant</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Title and Progress */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Goal & Interests</h1>
            <p className="text-gray-600 mb-6">Help us find the perfect mentor for you</p>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-500">Step 2 of 3 • 10-15 seconds</p>
          </div>
          
          <div className="space-y-8">
            {/* Career Goal Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500">🎯</span>
                <h3 className="text-lg font-semibold">Select primary career goal</h3>
              </div>
              
              <input 
                type="text"
                placeholder="Type your goal or select one below..."
                value={customGoal}
                onChange={(e) => {
                  setCustomGoal(e.target.value)
                  if (e.target.value.trim()) {
                    setSelectedCareerGoal(null)
                  }
                }}
                className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {options.career_goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleCareerGoalSelect(goal.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedCareerGoal === goal.id 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {goal.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500">📚</span>
                <h3 className="text-lg font-semibold">Choose areas of interest (max 3)</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {selectedInterests.length}/3 Selected
                </span>
              </div>
              
              <input 
                type="text"
                placeholder="Type an interest or pick from the list below..."
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {options.interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    disabled={selectedInterests.length >= 3 && !selectedInterests.includes(interest.id)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      selectedInterests.includes(interest.id) 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : selectedInterests.length >= 3 && !selectedInterests.includes(interest.id)
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {interest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-blue-500">🗣️</span>
                  <h3 className="text-base font-semibold">Languages you speak</h3>
                </div>
                
                <select 
                  value=""
                  onChange={(e) => {
                    const langId = parseInt(e.target.value)
                    if (langId && selectedLanguages.length < 3) {
                      handleLanguageToggle(langId)
                    }
                  }}
                  disabled={selectedLanguages.length >= 3}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Languages you speak (max3)</option>
                  {options.languages
                    .filter(lang => !selectedLanguages.includes(lang.id))
                    .map((lang) => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                </select>

                {/* Selected Languages Pills */}
                {selectedLanguages.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {selectedLanguages.slice(0, 3).map((langId, index) => {
                        const lang = options.languages.find(l => l.id === langId)
                        return lang ? (
                          <span 
                            key={langId}
                            className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-full text-xs cursor-pointer hover:bg-blue-600"
                            onClick={() => handleLanguageToggle(langId)}
                          >
                            {index + 1}. {lang.name} ×
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  If you want to change the preference, drop it
                </p>
              </div>

              {/* Career Stage Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{color: '#0073CF'}}>👤</span>
                  <h3 className="text-base font-semibold">Current Career Stage</h3>
                </div>
                
                <select 
                  value={selectedCareerStage || ""}
                  onChange={(e) => setSelectedCareerStage(parseInt(e.target.value) || null)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select Career Startegy</option>
                  {options.career_stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>{stage.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-8 mt-8">
            <button 
              onClick={() => router.push('/signup')}
              className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Back
            </button>
            <button 
              onClick={handleContinue}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}