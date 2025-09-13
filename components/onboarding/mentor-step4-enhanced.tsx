"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calendar, Video, DollarSign, X } from "lucide-react"

interface MentorStep4Props {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

const days = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

const sessionFormats = [
  "Video Call",
  "Phone Call",
  "In-Person",
  "Chat/Text"
]

export function MentorStep4Enhanced({ onNext, onBack, initialData }: MentorStep4Props) {
  const [formData, setFormData] = useState({
    availabilitySlots: initialData?.availability_slots || [],
    sessionFormat: initialData?.session_format || "",
    payoutMethod: initialData?.payout_method || "upi",
    upiId: initialData?.upi_id || "",
    bankAccount: initialData?.bank_account || "",
    ifscCode: initialData?.ifsc_code || "",
    panNumber: initialData?.pan_number || "ABCDE1234F",
    gstNumber: initialData?.gst_number || "",
  })

  const [selectedDay, setSelectedDay] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addAvailability = () => {
    if (selectedDay && startTime && endTime) {
      const newSlot = {
        day: selectedDay,
        start_time: startTime,
        end_time: endTime
      }
      setFormData({
        ...formData,
        availabilitySlots: [...formData.availabilitySlots, newSlot]
      })
      setSelectedDay("")
      setStartTime("")
      setEndTime("")
    }
  }

  const removeAvailability = (index: number) => {
    setFormData({
      ...formData,
      availabilitySlots: formData.availabilitySlots.filter((_, i) => i !== index)
    })
  }

  const handleNext = async () => {
    if (formData.availabilitySlots.length === 0 || !formData.sessionFormat || !formData.payoutMethod) {
      alert("Please fill in all required fields")
      return
    }

    if (formData.payoutMethod === "upi" && !formData.upiId) {
      alert("Please enter UPI ID")
      return
    }

    if (formData.payoutMethod === "bank_transfer" && (!formData.bankAccount || !formData.ifscCode)) {
      alert("Please enter bank account details")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/v1/mentors/onboarding/step4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          availability_slots: formData.availabilitySlots,
          session_format: formData.sessionFormat,
          payout_method: formData.payoutMethod,
          upi_id: formData.payoutMethod === "upi" ? formData.upiId : null,
          bank_account: formData.payoutMethod === "bank_transfer" ? formData.bankAccount : null,
          ifsc_code: formData.payoutMethod === "bank_transfer" ? formData.ifscCode : null,
          pan_number: formData.panNumber,
          gst_number: formData.gstNumber || null
        })
      })

      if (response.ok) {
        onNext(formData)
      } else {
        const error = await response.json()
        alert(`Error: ${error.detail}`)
      }
    } catch (error) {
      console.error("Error saving step 4 data:", error)
      alert("Error saving data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#0073CF' }}>
              <span className="text-white text-sm font-semibold">UC</span>
            </div>
            <span className="font-medium text-gray-800">Unusual Consultant</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Title and Progress */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Mulish, sans-serif' }}>Availability and Payout-Setup</h1>
            <p className="text-gray-600 mb-6">Set your schedule and payment preferences</p>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0073CF' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-500">Step 4 of 5 • 30-40 seconds</p>
          </div>
          
          <div className="space-y-8">
            {/* Available Days/Time */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5" style={{ color: '#0073CF' }} />
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Mulish, sans-serif' }}>Available Days/ Time</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Select all time slots when you're available for mentoring.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="day" className="text-sm font-medium">Days you're available</Label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium">From</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="endTime" className="text-sm font-medium">To</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              
              <Button
                onClick={addAvailability}
                className="w-full p-3 text-white rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: '#0073CF' }}
              >
                + Add availability
              </Button>
              
              {/* Added Availability List */}
              {formData.availabilitySlots.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.availabilitySlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">
                        {slot.day}, {slot.start_time} - {slot.end_time}
                      </span>
                      <button
                        onClick={() => removeAvailability(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Preferred mode */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-5 w-5" style={{ color: '#0073CF' }} />
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Mulish, sans-serif' }}>Preferred mode</h3>
              </div>
              
              <div>
                <Label htmlFor="sessionFormat" className="text-sm font-medium">Select Session format</Label>
                <Select value={formData.sessionFormat} onValueChange={(value) => setFormData({ ...formData, sessionFormat: value })}>
                  <SelectTrigger className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <SelectValue placeholder="Select Session format" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionFormats.map((format) => (
                      <SelectItem key={format} value={format}>{format}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payout Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5" style={{ color: '#0073CF' }} />
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Mulish, sans-serif' }}>Payout Details</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Preferred Payout method:</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="upi"
                    name="payoutMethod"
                    value="upi"
                    checked={formData.payoutMethod === "upi"}
                    onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                    className="text-blue-600"
                  />
                  <Label htmlFor="upi" className="text-sm">UPI (Recommended)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="bank"
                    name="payoutMethod"
                    value="bank_transfer"
                    checked={formData.payoutMethod === "bank_transfer"}
                    onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                    className="text-blue-600"
                  />
                  <Label htmlFor="bank" className="text-sm">Bank Transfer</Label>
                </div>
              </div>
              
              {formData.payoutMethod === "upi" && (
                <div className="mt-4">
                  <Label htmlFor="upiId" className="text-sm font-medium">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="yourname@paytm"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              )}
              
              {formData.payoutMethod === "bank_transfer" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="bankAccount" className="text-sm font-medium">Bank Account Number</Label>
                    <Input
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      placeholder="Enter bank account number"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode" className="text-sm font-medium">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                      placeholder="Enter IFSC code"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tax Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Mulish, sans-serif' }}>Tax Details (Optional - can be added later)</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="panNumber" className="text-sm font-medium">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Required for payouts above ₹50,000/year</p>
                </div>
                
                <div>
                  <Label htmlFor="gstNumber" className="text-sm font-medium">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="GST Number"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">For mentors with GST registration</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8">
              <button 
                onClick={onBack}
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                disabled={isLoading}
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#0073CF' }}
              >
                {isLoading ? "Saving..." : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}