"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calendar, Video, CreditCard, Smartphone } from "lucide-react"

interface MentorStep4Props {
  onNext: (data: any) => void
  onBack: () => void
}

const availabilitySlots = [
  "Monday 9 AM - 12 PM",
  "Monday 2 PM - 6 PM",
  "Monday 7 PM - 10 PM",
  "Tuesday 9 AM - 12 PM",
  "Tuesday 2 PM - 6 PM",
  "Tuesday 7 PM - 10 PM",
  "Wednesday 9 AM - 12 PM",
  "Wednesday 2 PM - 6 PM",
  "Wednesday 7 PM - 10 PM",
  "Thursday 9 AM - 12 PM",
  "Thursday 2 PM - 6 PM",
  "Thursday 7 PM - 10 PM",
  "Friday 9 AM - 12 PM",
  "Friday 2 PM - 6 PM",
  "Friday 7 PM - 10 PM",
  "Saturday Morning",
  "Saturday Evening",
  "Sunday Morning",
  "Sunday Evening",
]

const sessionFormats = [
  { id: "gmeet", label: "Google Meet", icon: Video },
  { id: "zoom", label: "Zoom", icon: Video },
  { id: "chat", label: "Chat", icon: Smartphone },
  { id: "topmate", label: "Topmate-style call", icon: Video },
]

export function MentorStep4Enhanced({ onNext, onBack }: MentorStep4Props) {
  const [formData, setFormData] = useState({
    availability: [] as string[],
    sessionFormat: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
    panNumber: "",
    gstNumber: "",
    preferredPayout: "upi",
  })

  const toggleAvailability = (slot: string) => {
    if (formData.availability.includes(slot)) {
      setFormData({
        ...formData,
        availability: formData.availability.filter((a) => a !== slot),
      })
    } else {
      setFormData({
        ...formData,
        availability: [...formData.availability, slot],
      })
    }
  }

  const handleNext = () => {
    if (
      formData.availability.length > 0 &&
      formData.sessionFormat &&
      (formData.upiId || (formData.bankAccount && formData.ifscCode))
    ) {
      onNext(formData)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Availability & Payout Setup</CardTitle>
          <CardDescription>Set your schedule and payment preferences</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 4 of 5 • 30-40 seconds</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Available Days/Time */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Available Days/Time</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Select all time slots when you're available for mentoring</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {availabilitySlots.map((slot) => (
                <div key={slot} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.availability.includes(slot)}
                    onCheckedChange={() => toggleAvailability(slot)}
                  />
                  <Label className="text-sm">{slot}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Session Format */}
          <div>
            <div className="flex items-center mb-3">
              <Video className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Session Format</h3>
            </div>
            <Select
              value={formData.sessionFormat}
              onValueChange={(value) => setFormData({ ...formData, sessionFormat: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your preferred session format" />
              </SelectTrigger>
              <SelectContent>
                {sessionFormats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payout Details */}
          <div>
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Payout Details</h3>
            </div>

            {/* Payout Method Selection */}
            <div className="mb-4">
              <Label>Preferred Payout Method</Label>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.preferredPayout === "upi"}
                    onCheckedChange={() => setFormData({ ...formData, preferredPayout: "upi" })}
                  />
                  <Label>UPI (Recommended)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.preferredPayout === "bank"}
                    onCheckedChange={() => setFormData({ ...formData, preferredPayout: "bank" })}
                  />
                  <Label>Bank Transfer</Label>
                </div>
              </div>
            </div>

            {/* UPI Details */}
            {formData.preferredPayout === "upi" && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Smartphone className="h-4 w-4 text-blue-600 mr-2" />
                    <Label htmlFor="upiId">UPI ID</Label>
                  </div>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="yourname@paytm / yourname@gpay"
                  />
                </div>
              </div>
            )}

            {/* Bank Details */}
            {formData.preferredPayout === "bank" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankAccount">Bank Account Number</Label>
                    <Input
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      placeholder="Account number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                      placeholder="IFSC Code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Optional Tax Details */}
            <div className="space-y-4 mt-6">
              <h4 className="font-medium text-gray-700">Tax Details (Optional - can be added later)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    placeholder="ABCDE1234F (optional)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Required for payouts above ₹50,000/year</p>
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    placeholder="GST Number (optional)"
                  />
                  <p className="text-xs text-gray-500 mt-1">For advanced mentors with GST registration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} className="bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                formData.availability.length === 0 ||
                !formData.sessionFormat ||
                (formData.preferredPayout === "upi" && !formData.upiId) ||
                (formData.preferredPayout === "bank" && (!formData.bankAccount || !formData.ifscCode))
              }
              className="bg-green-700 hover:bg-green-800"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
