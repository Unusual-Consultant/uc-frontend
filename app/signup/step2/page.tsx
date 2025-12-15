"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { API_BASE_URL } from "@/lib/api"

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
  const [apiError, setApiError] = useState<string | null>(null)
  const [selectedCareerGoal, setSelectedCareerGoal] = useState<number | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([])
  const [selectedCareerStage, setSelectedCareerStage] = useState<number | null>(null)
  const [customGoal, setCustomGoal] = useState("")
  const [customInterest, setCustomInterest] = useState("")
  const [targetRole, setTargetRole] = useState("")
  
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState("mentee")
  
  useEffect(() => {
    // Safely get values from searchParams and localStorage
    const emailParam = searchParams.get("email")
    const userTypeParam = searchParams.get("userType")
    const tokenParam = searchParams.get("token")
    
    if (emailParam) {
      setEmail(emailParam)
    } else if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("google_email") || "")
    }
    
    if (userTypeParam) {
      setUserType(userTypeParam)
    } else if (typeof window !== "undefined") {
      setUserType(localStorage.getItem("userType") || "mentee")
    }
    
    // Store token if provided (from Google OAuth)
    if (tokenParam && typeof window !== "undefined") {
      localStorage.setItem("access_token", tokenParam)
      localStorage.setItem("auth_token", tokenParam)
      console.log("Token stored from URL:", tokenParam)
    }
    
    fetchSignupOptions()
  }, [searchParams])

  const fetchSignupOptions = async () => {
    try {
      setIsLoading(true)
      setApiError(null)
      console.log("🔍 Fetching signup options from API...")
  
      // Use mentee signup options for both mentee and mentor (they share the same data)
      const response = await fetch(`${API_BASE_URL}/mentees/signup/options`, {
        headers: { "Content-Type": "application/json" }
      })
      console.log("📡 API Response status:", response.status)
  
      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API Error:", response.status, errorText)
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }
  
      const data = await response.json()
      console.log("✅ API Data received:", data)
  
      // ✅ Instead of throwing, just fall back per section if empty
      setOptions({
        career_goals: data.career_goals?.length ? data.career_goals : [
          { id: 1, name: "Crack Product management Interview" },
          { id: 2, name: "Get job abroad" },
          { id: 3, name: "Switch to Data Science" },
          { id: 4, name: "Learn UI UX Design" },
          { id: 5, name: "MBA Preparation" },
          { id: 6, name: "Government Exams Preparation" },
          { id: 7, name: "Start my own Startup" },
          { id: 8, name: "Learn Coding/Programming" },
          { id: 9, name: "Get promoted to Senior role" },
          { id: 10, name: "Career change guidance" },
          { id: 11, name: "Improve leadership skills" },
          { id: 12, name: "Freelancing Guidance" }
        ],
        interests: data.interests?.length ? data.interests : [
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
        languages: data.languages?.length ? data.languages : [
          { id: 1, name: "English" },
          { id: 2, name: "Hindi" },
          { id: 3, name: "German" },
          { id: 4, name: "Spanish" },
          { id: 5, name: "French" },
          { id: 6, name: "Mandarin" }
        ],
        career_stages: data.career_stages?.length ? data.career_stages : [
          { id: 1, name: "Student" },
          { id: 2, name: "Entry Level (0-2 years)" },
          { id: 3, name: "Mid Level (3-7 years)" },
          { id: 4, name: "Senior Level (8+ years)" }
        ]
      })
    } catch (error) {
      console.error("❌ Error fetching signup options:", error)
      setApiError(error instanceof Error ? error.message : "Unknown error")
      console.log("🔄 Falling back to hardcoded data...")
  
      // 👇 fallback if API totally fails
      setOptions({
        career_goals: [
          { id: 1, name: "Crack Product management Interview" },
          { id: 2, name: "Get job abroad" },
          { id: 3, name: "Switch to Data Science" },
          { id: 4, name: "Learn UI UX Design" },
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

  const handleContinue = async () => {
  // --- Validation ---
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

  // --- Prepare payload ---
  const payload = {
    email,
    user_type: userType, // "mentee"
    career_goal:
      selectedCareerGoal != null
        ? options?.career_goals.find((g) => g.id === selectedCareerGoal)?.name ||
          customGoal.trim()
        : customGoal.trim(),
    interests: [
      ...selectedInterests.map((id) => id.toString()), // UUID strings expected
      ...(customInterest.trim() ? [customInterest.trim()] : []),
    ],
    languages: selectedLanguages.map((id) => id.toString()),
    career_stage: selectedCareerStage?.toString() || null,
    custom_interest: customInterest.trim(),
    target_role: targetRole.trim() || null,
  }

  try {
    setIsLoading(true)

    // --- Correct endpoint for mentee onboarding ---
    const endpoint = `${API_BASE_URL}/mentees/signup/step2`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(localStorage.getItem("auth_token") && {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
        })
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Failed to save step 2:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        payload: payload
      })
      alert(`Failed to save data: ${response.status} - ${errorText}. Please try again.`)
      return
    }

    const result = await response.json()
    console.log("Step 2 saved:", result)

    // --- Save localStorage for next step ---
    if (typeof window !== "undefined") {
      localStorage.setItem(`${userType}_onboarding_data`, JSON.stringify(payload))
      localStorage.setItem("user_id", result.user_id)
    }

    // --- Redirect to step 3 ---
    router.push(`/signup/step3?email=${encodeURIComponent(email)}&userType=${userType}`)
  } catch (err) {
    console.error("❌ Error saving step 2 data:", {
      error: err,
      payload: payload,
      endpoint: endpoint
    })
    alert(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`)
  } finally {
    setIsLoading(false)
  }
}


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Loading options...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0073CF] mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!options) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-lg mb-4">Failed to load options. Please try again.</p>
          {apiError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">API Error:</p>
              <p className="text-sm">{apiError}</p>
            </div>
          )}
          <button
            onClick={fetchSignupOptions}
            className="px-4 py-2 bg-[#0073CF] text-white rounded-lg hover:bg-[#005fa3]"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
       

        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Title and Progress */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold mb-2">Goal & Interests</h1>
            <p className="text-gray-600 mb-6">Help us find the perfect mentor for you</p>
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-[#0073CF]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-500">Step 2 of 3 • 10–15 seconds</p>
          </div>

          <div className="space-y-8">
            {/* Career Goal Section */}
            <div  className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <img src="/primary.png" alt="career goal" className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-900">Select primary career goal</h3>
              </div>
              <input
                type="text"
                placeholder="Type your goal or select one below"
                value={customGoal}
                onChange={(e) => {
                  setCustomGoal(e.target.value)
                  if (e.target.value.trim()) setSelectedCareerGoal(null)
                }}
                className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-[#0073CF] text-sm"
              />
              <div className="flex flex-wrap gap-2">
                {options.career_goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleCareerGoalSelect(goal.id)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                      selectedCareerGoal === goal.id
                        ? "border-[#0073CF] bg-[#E6F3FC] text-[#0073CF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {goal.name}
                  </button>
                ))}
              </div>
            </div>
            

            {/* Interests Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <img src="/book.png" alt="career goal" className="w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-900">Choose areas of interest (max 3)</h3>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                  {selectedInterests.length}/3 Selected
                </span>
              </div>
              <input
                type="text"
                placeholder="Type an interest or pick from the list below"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-[#0073CF] text-sm"
              />
              <div className="flex flex-wrap gap-2">
                {options.interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    disabled={selectedInterests.length >= 3 && !selectedInterests.includes(interest.id)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                      selectedInterests.includes(interest.id)
                        ? "border-[#0073CF] bg-[#E6F3FC] text-[#0073CF]"
                        : selectedInterests.length >= 3
                        ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {interest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Role Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <img src="/book.png" alt="target role" className="w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-900">Target Role</h3>
              </div>
              <input
                type="text"
                placeholder="e.g., Product Manager, Software Engineer, Data Scientist"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the job title or role you want to achieve
              </p>
            </div>

            {/* Languages Section */}
<div className="mb-8">
  <div className="flex items-center gap-2 mb-3">
    <img src="/human.png" alt="languages" className="w-6 h-6" />
    <h3 className="text-lg font-semibold text-gray-900">Languages you speak</h3>
  </div>
  <select
    value=""
    onChange={(e) => {
      const langId = parseInt(e.target.value)
      if (langId && selectedLanguages.length < 3) handleLanguageToggle(langId)
    }}
    disabled={selectedLanguages.length >= 3}
    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] text-sm"
  >
    <option value="">Languages you speak (max 3)</option>
    {options.languages
      .filter((lang) => !selectedLanguages.includes(lang.id))
      .map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
  </select>
  {selectedLanguages.length > 0 && (
    <div className="mt-3 flex flex-wrap gap-2">
      {selectedLanguages.slice(0, 3).map((langId, index) => {
        const lang = options.languages.find((l) => l.id === langId)
        return lang ? (
          <span
            key={langId}
            onClick={() => handleLanguageToggle(langId)}
            className="inline-flex items-center px-3 py-1 bg-[#0073CF] text-white rounded-full text-xs cursor-pointer hover:bg-[#005fa3]"
          >
            {index + 1}. {lang.name} ×
          </span>
        ) : null
      })}
    </div>
  )}


              

              <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <img src="/earth.png" alt="career stage" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Current Career Stage</h3>
                </div>
                <select
                  value={selectedCareerStage || ""}
                  onChange={(e) => setSelectedCareerStage(parseInt(e.target.value) || null)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0073CF] text-sm"
                >
                  <option value="">Select Career Strategy</option>
                  {options.career_stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-10 mt-10">
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-[#0073CF] text-white rounded-lg hover:bg-[#005fa3] flex items-center gap-2"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
