"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Bell, Briefcase, Users, CheckCircle, Loader2 } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import PaymentButtonsGroup from "./paymentDropdown"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"
import { API_BASE_URL } from "@/lib/api"

interface Session {
  id: string
  title: string
  desc: string
  price: string
  duration: string
}

interface Mentor {
  id: string | number
  name: string
  role: string
  company?: string
  location?: string
  rating?: number
  reviews?: number
  price?: number
  tags: string[]
  image: string
  expertise?: string
  experience?: string
  responseTime?: string
  totalMentees?: number
  successRate?: string
  availability?: {
    sessions?: string[]
    days_of_week?: number[]
    times?: string[]
  }
}

interface SessionType {
  id: string
  name: string
  description: string | null
  duration_minutes: number
  price: number
  mode: string
}

interface AvailabilitySlot {
  date: string
  time: string
  timezone: string
  available: boolean
}

interface QuickBookProps {
  mentor: Mentor
  sessions: Session[]
  timezones?: string[]
  onClose: () => void
}

export function QuickBook({ mentor, sessions, timezones = ["IST"], onClose }: QuickBookProps) {
  const { makeAuthenticatedRequest, user } = useAuthenticatedUser()
  const [step, setStep] = useState(1)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timezone, setTimezone] = useState(timezones[0])
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", about: "" })
  const [isLoading, setIsLoading] = useState(false)
  
  // Backend data states
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([])
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [isLoadingSessionTypes, setIsLoadingSessionTypes] = useState(true)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const steps = [
    "Select Session Type",
    "Pick Date & Time",
    "Enter Your Details",
    "Make Payment",
    "Booking Confirmed",
  ]

  // Fetch session types on mount
  useEffect(() => {
    const fetchSessionTypes = async () => {
      if (!mentor?.id) return
      
      try {
        setIsLoadingSessionTypes(true)
        const mentorId = String(mentor.id)
        const response = await fetch(`${API_BASE_URL}/bookings/mentors/${mentorId}/session-types`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch session types: ${response.status}`)
        }
        
        const data = await response.json()
        setSessionTypes(data)
      } catch (err) {
        console.error("Error fetching session types:", err)
        setError("Failed to load session types")
      } finally {
        setIsLoadingSessionTypes(false)
      }
    }
    
    fetchSessionTypes()
  }, [mentor?.id])

  // Update available times when date is selected
  const updateAvailableTimes = (date: string | null, slots: AvailabilitySlot[]) => {
    if (!date) {
      setAvailableTimes([])
      return
    }
    
    const timesForDate = slots
      .filter(slot => slot.date === date && slot.available)
      .map(slot => slot.time)
      .sort()
    
    setAvailableTimes(timesForDate)
  }

  // Update times when date changes
  useEffect(() => {
    if (selectedDate && availabilitySlots.length > 0) {
      updateAvailableTimes(selectedDate, availabilitySlots)
    }
  }, [selectedDate, availabilitySlots])

  // Fetch availability when moving to step 2
  useEffect(() => {
    const fetchAvailability = async () => {
      if (step !== 2 || !mentor?.id) return
      
      try {
        setIsLoadingAvailability(true)
        const mentorId = String(mentor.id)
        const today = new Date().toISOString().split('T')[0]
        const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        
        const response = await fetch(
          `${API_BASE_URL}/bookings/mentors/${mentorId}/availability?start_date=${today}&end_date=${endDate}`
        )
        
        if (!response.ok) {
          throw new Error(`Failed to fetch availability: ${response.status}`)
        }
        
        const data = await response.json()
        const slots: AvailabilitySlot[] = (data.available_slots || []) as AvailabilitySlot[]
        setAvailabilitySlots(slots)
        
        // Extract unique dates
        const dates: string[] = [...new Set(slots.map((slot: AvailabilitySlot) => slot.date))]
        setAvailableDates(dates.sort())
        
        // Filter times for first date if none selected
        if (dates.length > 0 && !selectedDate) {
          updateAvailableTimes(dates[0] as string, slots)
        }
      } catch (err) {
        console.error("Error fetching availability:", err)
        setError("Failed to load availability")
      } finally {
        setIsLoadingAvailability(false)
      }
    }
    
    fetchAvailability()
  }, [step, mentor?.id])

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time selection
    updateAvailableTimes(date, availabilitySlots)
  }

  // Populate form data from user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || '',
        email: user.email || '',
        phone: user.mobile_number || '',
        about: ''
      })
    }
  }, [user])

  const canProceed = () => {
    if (step === 1) return !!selectedSession
    if (step === 2) return !!selectedDate && !!selectedTime && !!timezone
    if (step === 3) return formData.name.trim() !== "" && formData.email.trim() !== ""
    return true
  }

  // Create booking when payment is complete
  const handlePaymentComplete = async () => {
    if (!selectedSession || !selectedDate || !selectedTime) {
      setError("Please complete all booking steps")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Get selected session type
      const sessionType = sessionTypes.find(st => st.id === selectedSession)
      if (!sessionType) {
        throw new Error("Session type not found")
      }

      // Combine date and time into ISO datetime
      const [hours, minutes] = selectedTime.split(':').map(Number)
      const startDateTime = new Date(`${selectedDate}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`)
      
      // Calculate end time based on duration
      const endDateTime = new Date(startDateTime.getTime() + sessionType.duration_minutes * 60 * 1000)

      // Create booking request
      const bookingRequest = {
        mentor_id: String(mentor.id),
        session_type_id: selectedSession,
        scheduled_start: startDateTime.toISOString(),
        scheduled_end: endDateTime.toISOString(),
        timezone: timezone,
        notes: formData.about || null
      }

      const response = await makeAuthenticatedRequest('/bookings/create', {
        method: 'POST',
        body: JSON.stringify(bookingRequest)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to create booking' }))
        throw new Error(errorData.detail || 'Failed to create booking')
      }

      const bookingData = await response.json()
      setBookingId(bookingData.id)
      setStep(5)
    } catch (err) {
      console.error("Error creating booking:", err)
      setError(err instanceof Error ? err.message : "Failed to create booking")
    } finally {
      setIsLoading(false)
    }
  }

  // Format price for display
  const formatPrice = (priceInPaise: number) => {
    return `₹${(priceInPaise / 100).toFixed(0)}`
  }

  // Format duration for display
  const formatDuration = (minutes: number) => {
    return `${minutes} mins`
  }

  return (
    <div className="w-full max-w-[1200px] min-h-[520px] rounded-xl bg-white shadow-lg flex flex-col">
      {/* Stepper */}
      <div className="flex flex-col items-center p-3 bg-[#F8F9FB]">
        {/* Heading aligned with progress bar */}
        <div className="w-[600px] flex items-center gap-2 mb-2">
          <Image
            src="/calendar_icon.png"
            alt="calendar icon"
            width={24}
            height={24}
          />
          <h1 className="text-lg font-semibold">Book a Session</h1>
        </div>

        {/* Progress bar */}
        <div className="relative flex items-center justify-between border border-gray-300 rounded-full bg-white px-3 w-[600px] h-8">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0073CF] transition-all duration-500 rounded-full"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="relative flex w-full justify-between z-10">
            {steps.map((_, i) => {
              const isCompleted = i + 1 <= step
              return (
                <div
                  key={`step-circle-${i}`}
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${isCompleted
                    ? "bg-[#0073CF] text-white"
                    : "bg-[#BBBBBB] text-white"
                    }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step labels */}
        <div className="flex justify-between mt-1 w-[600px]">
          {steps.map((label, i) => (
            <span
              key={`step-label-${i}`}
              className={`text-[10px] ${i + 1 === step ? "text-[#0073CF] font-medium" : "text-gray-500"
                }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>


      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden bg-[#F8F9FB]">
        {/* Left: Booking Steps */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 p-4 space-y-3 overflow-y-auto overflow-x-hidden">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            {/* Step 1: Session Selection */}
            {step === 1 && (
              <>
                {isLoadingSessionTypes ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-sm text-gray-600">Loading session types...</span>
                  </div>
                ) : sessionTypes.length === 0 ? (
                  <div className="text-center py-8 text-sm text-gray-500">
                    No session types available for this mentor.
                  </div>
                ) : (
                  sessionTypes.map((sessionType) => (
                    <Card
                      key={`session-${sessionType.id}`}
                      className={`cursor-pointer transition border ${selectedSession === sessionType.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                        }`}
                      onClick={() => setSelectedSession(sessionType.id)}
                    >
                      <CardContent className="flex justify-between p-3">
                        <div>
                          <h3 className="text-sm font-medium">{sessionType.name}</h3>
                          <p className="text-xs text-gray-500">{sessionType.description || ""}</p>
                          <div className="text-[11px] text-gray-600 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {formatDuration(sessionType.duration_minutes)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-600 text-sm font-semibold">
                            {formatPrice(sessionType.price)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-3 text-sm flex flex-col w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                {/* Date Picker - Always show */}
                <div className="w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                  <p className="font-medium mb-2">Select meeting date</p>
                  
                  {isLoadingAvailability ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <span className="ml-2 text-sm text-gray-600">Loading availability...</span>
                    </div>
                  ) : availableDates.length === 0 ? (
                    <div className="text-center py-4 text-sm text-gray-500">
                      No available slots found for this mentor.
                    </div>
                  ) : (
                    <div className="relative w-full overflow-hidden" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                      <Carousel opts={{ align: "start", loop: false }} className="w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                        <CarouselPrevious className="absolute left-0 z-10 bg-white shadow rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-100 -translate-y-1/2 top-1/2">
                          {"<"}
                        </CarouselPrevious>

                        <CarouselContent className="gap-1" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
                          {availableDates.map((date) => {
                            const dateObj = new Date(date)
                            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" })
                            const dayNum = dateObj.getDate()
                            const month = dateObj.toLocaleDateString("en-US", { month: "short" })
                            
                            return (
                              <CarouselItem key={`date-${date}`} className="basis-auto shrink-0 flex-shrink-0">
                                <div
                                  onClick={() => handleDateSelect(date)}
                                  className={`h-20 w-20 flex flex-col justify-center rounded-lg border text-center cursor-pointer transition font-semibold flex-shrink-0 ${selectedDate === date
                                    ? "bg-[#EDF7FF] border-[#0073CF] text-[#0073CF]"
                                    : "bg-white border-gray-300 text-gray-800 hover:border-gray-400"
                                    }`}
                                >
                                  <div className="text-sm">{dayName}</div>
                                  <div className="text-lg font-bold">{dayNum}</div>
                                  <div className="text-xs">{month}</div>
                                </div>
                              </CarouselItem>
                            )
                          })}
                        </CarouselContent>

                        <CarouselNext className="absolute right-0 z-10 bg-white shadow rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-100 -translate-y-1/2 top-1/2">
                          {">"}
                        </CarouselNext>
                      </Carousel>
                    </div>
                  )}
                </div>

                {/* Time Picker - Show when date is selected or if dates are available */}
                {(selectedDate || availableDates.length > 0) && (
                  <div className="w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                    <p className="font-medium mb-2">Select time of day</p>
                    
                    {!selectedDate ? (
                      <div className="text-center py-2 text-sm text-gray-500">
                        Please select a date first
                      </div>
                    ) : isLoadingAvailability ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      </div>
                    ) : availableTimes.length === 0 ? (
                      <div className="text-center py-2 text-sm text-gray-500">
                        No available times for the selected date.
                      </div>
                    ) : (
                      <div className="relative w-full overflow-hidden" style={{ maxWidth: '100%', boxSizing: 'border-box', width: '100%' }}>
                        <Carousel opts={{ align: "start", loop: false }} className="w-full" style={{ maxWidth: '100%', boxSizing: 'border-box', width: '100%' }}>
                          <CarouselPrevious className="absolute left-0 z-10 bg-white shadow rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-100 -translate-y-1/2 top-1/2">
                            {"<"}
                          </CarouselPrevious>

                          <CarouselContent className="gap-2" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
                            {availableTimes.map((time, i) => (
                              <CarouselItem key={`time-${i}-${time}`} className="basis-auto shrink-0 flex-shrink-0">
                                <div
                                  onClick={() => setSelectedTime(time)}
                                  className={`h-16 min-w-[100px] flex items-center justify-center rounded-lg border cursor-pointer transition font-semibold flex-shrink-0 ${selectedTime === time
                                    ? "bg-blue-50 border-blue-600 text-blue-600"
                                    : "bg-white border-gray-300 text-gray-800 hover:border-gray-400"
                                    }`}
                                >
                                  {time}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>

                          <CarouselNext className="absolute right-0 z-10 bg-white shadow rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-100 -translate-y-1/2 top-1/2">
                            {">"}
                          </CarouselNext>
                        </Carousel>
                      </div>
                    )}
                  </div>
                )}

                {/* Timezone Dropdown */}
                <div className="w-full">
                  <label className="font-medium mb-1 block">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timezones.map((tz, i) => (
                      <option key={`tz-${i}`} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}


            {/* Step 3: Details Form */}
            {step === 3 && (
              <div className="space-y-5 text-sm">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-xs">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#C7C7C7] rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-xs">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-[#C7C7C7] rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-xs">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-[#C7C7C7] rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex items-center gap-1 text-xs text-black">
                  <Bell className="w-4 h-4 flex-shrink-0" />
                  <span>
                    You’ll receive booking details on your email as well as phone
                    number
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-xs">
                    About the call (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#C7C7C7] rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.about || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, about: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="flex flex-col items-center w-full">
                <h2 className="text-sm font-semibold mb-4">
                  Choose Payment Method
                </h2>
                <div className="flex flex-col gap-4 w-full max-w-md">
                  <PaymentButtonsGroup onPaymentComplete={handlePaymentComplete} />
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <div className="flex flex-col items-center justify-center gap-4 mt-10">
                {isLoading ? (
                  <Image
                    src="/payment_processing.gif"
                    alt="Loading"
                    width={100}
                    height={100}
                  />
                ) : (
                  <>
                    <Image
                      src="/payment_complete.gif"
                      alt="Completed"
                      width={100}
                      height={100}
                    />
                    <h2 className="text-green-600 font-bold text-2xl">
                      Booking Confirmed!
                    </h2>
                    <p className="text-black font-semibold text-sm text-center">
                      Your session has been booked successfully. You'll receive a
                      confirmation message shortly.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer Nav */}
          <div className="border-t p-3 flex justify-between">
            <Button
              variant="outline"
              className="border-black rounded-full px-6 py-2"
              size="sm"
              disabled={step === 1}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
            <Button
              size="sm"
              className="rounded-full px-6 py-2"
              disabled={!canProceed()}
              onClick={() =>
                step < steps.length ? setStep((s) => s + 1) : onClose()
              }
            >
              {step < steps.length ? "Next" : "Finish"}
            </Button>
          </div>
        </div>

        {/* Right: Mentor Info */}
        <div className="w-[40%] min-w-[280px] flex-shrink-0 border-l p-2 bg-gray-50 flex flex-col items-center text-xs overflow-y-auto">
          <Card className="rounded-lg overflow-hidden w-full relative shadow-sm">
            {/* Top banner */}
            <div className="bg-[#C4E1FF] h-10 w-full relative" />

            {/* Mentor Info */}
            <CardContent className="relative p-3">
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <div className="relative -mt-8">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    width={55}
                    height={55}
                    className="rounded-full object-cover border-2 border-white shadow"
                  />

                  {/* Rating Pill */}
                  {mentor.rating && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow font-semibold">
                      <span role="img" aria-label="star">⭐</span>
                      <span>{mentor.rating}</span>
                    </div>
                  )}

                </div>

                {/* Name + Role */}
                <div className="mt-1">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-xs text-black">{mentor.name}</span>
                    <Image
                      src="/blue_tick.png"
                      alt="verified"
                      width={12}
                      height={12}
                      className="inline-block"
                    />
                  </div>
                  <div className="text-[10px] text-gray-700">{mentor.role}</div>
                  <div className="text-[10px] text-blue-500 font-semibold">{mentor.company}</div>
                </div>
              </div>

              {/* Location + Experience */}
              <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-black">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {mentor.location}
                </div>
                {mentor.experience && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {mentor.experience}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-2 flex gap-1 flex-wrap">
                {mentor.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-[9px] bg-[#D1EAFF] bg-opacity-60 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Extra Stats */}
              <div className="mt-2 space-y-1 text-[10px] text-gray-700">
                <div className="flex items-center gap-1">
                  <span className="text-black">Response:</span>
                  <Clock className="w-3 h-3 text-red-500" />
                  <span className="font-semibold">{mentor.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-black">Mentees:</span>
                  <Users className="w-3 h-3 text-blue-500" />
                  <span className="font-semibold">{mentor.totalMentees}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-black">Success:</span>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="font-semibold">{mentor.successRate}</span>
                </div>
              </div>
            </CardContent>

            {/* Ticket Dotted Separator */}
            <div className="relative border-t-2 border-dotted border-gray-400">
              <div className="absolute -left-2 -top-2 w-4 h-4 bg-gray-50 rounded-full border border-gray-300" />
              <div className="absolute -right-2 -top-2 w-4 h-4 bg-gray-50 rounded-full border border-gray-300" />
            </div>

            {/* Booking Details Section */}
            <CardContent className="p-3 bg-white">
              <div className="text-xs font-bold mb-2">Booking Details</div>
              <div className="space-y-1 text-xs font-medium">
                {/* Booking ID - only in step 5 */}
                {step === 5 && bookingId && (
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="text-gray-700">
                      #{bookingId.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* Selected Item */}
                {selectedSession && (
                  <div className="flex justify-between">
                    <span>
                      {sessionTypes.find(s => s.id === selectedSession)?.name} (
                      {sessionTypes.find(s => s.id === selectedSession) && formatDuration(sessionTypes.find(s => s.id === selectedSession)!.duration_minutes)})
                    </span>
                    <span className="text-blue-600 font-semibold">
                      {sessionTypes.find(s => s.id === selectedSession) && formatPrice(sessionTypes.find(s => s.id === selectedSession)!.price)}
                    </span>
                  </div>
                )}


                {/* Date */}
                {selectedDate && (
                  <div>
                    <span>
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "2-digit",
                        month: "short"
                      })}
                    </span>
                  </div>
                )}

                {/* Time + Duration */}
                {selectedTime && (
                  <div>
                    <span>
                      {selectedTime} ({timezone})
                    </span>
                  </div>
                )}

                {/* Total */}
                {selectedSession && (
                  <div className="flex justify-between border-t pt-1">
                    <span>Total</span>
                    <span className="text-blue-600 font-semibold">
                      {sessionTypes.find(s => s.id === selectedSession) && formatPrice(sessionTypes.find(s => s.id === selectedSession)!.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Done button */}
              {selectedSession && selectedDate && selectedTime && step === 5 && (
                <div className="mt-2">
                  <Button className="w-full bg-[#0073CF] hover:bg-[#005fa3] text-white rounded-full h-7 text-xs">
                    Done
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

