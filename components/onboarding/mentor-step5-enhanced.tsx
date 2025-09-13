"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight, Shield, Upload, Award, FileText } from "lucide-react"

interface MentorStep5Props {
  onNext: (data: any) => void
  onBack: () => void
  initialData?: any
}

export function MentorStep5Enhanced({ onNext, onBack, initialData }: MentorStep5Props) {
  const [formData, setFormData] = useState({
    agreedToTerms: initialData?.agreed_to_terms || false,
    agreedToGuidelines: initialData?.agreed_to_guidelines || false,
    uploadedId: false,
    uploadedCertificate: false,
    wantsVerifiedBadge: initialData?.wants_verified_badge || false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (type: "id" | "certificate") => {
    // Simulate file upload
    if (type === "id") {
      setFormData({ ...formData, uploadedId: true })
    } else {
      setFormData({ ...formData, uploadedCertificate: true })
    }
  }

  const handleFinish = async () => {
    if (!formData.agreedToTerms || !formData.agreedToGuidelines) {
      alert("Please agree to the terms and guidelines to continue")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/v1/mentors/onboarding/step5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          agreed_to_terms: formData.agreedToTerms,
          agreed_to_guidelines: formData.agreedToGuidelines,
          wants_verified_badge: formData.wantsVerifiedBadge
        })
      })

      if (response.ok) {
        onNext(formData)
      } else {
        const error = await response.json()
        alert(`Error: ${error.detail}`)
      }
    } catch (error) {
      console.error("Error saving step 5 data:", error)
      alert("Error saving data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Agreement & Verification</CardTitle>
          <CardDescription>Final step to complete your mentor profile</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-green-600 rounded-full"></div>
              <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Step 5 of 5 • 5-10 seconds</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mandatory Agreements */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              Required Agreements
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: !!checked })}
                />
                <div className="flex-1">
                  <Label className="font-medium">I agree to mentor terms & conditions</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Including payment terms, session guidelines, and platform policies.{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Read full terms
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox
                  checked={formData.agreedToGuidelines}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreedToGuidelines: !!checked })}
                />
                <div className="flex-1">
                  <Label className="font-medium">I agree to community guidelines</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Professional conduct, respectful communication, and quality standards.{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Read guidelines
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Verification */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 text-blue-600 mr-2" />
              Optional Verification (for verified badge)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload documents to get a verified badge and increase your credibility with mentees.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={formData.wantsVerifiedBadge}
                  onCheckedChange={(checked) => setFormData({ ...formData, wantsVerifiedBadge: !!checked })}
                />
                <Label>I want to get verified for a verified badge</Label>
              </div>

              {formData.wantsVerifiedBadge && (
                <div className="space-y-4 ml-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 text-blue-600 mr-2" />
                        <Label>Government ID</Label>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">Aadhaar, Passport, or Driver's License</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileUpload("id")}
                        className="w-full bg-transparent"
                      >
                        <Upload className="mr-2 h-3 w-3" />
                        {formData.uploadedId ? "ID Uploaded ✓" : "Upload ID"}
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Award className="h-4 w-4 text-blue-600 mr-2" />
                        <Label>Education Certificate</Label>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">Degree, diploma, or professional certification</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileUpload("certificate")}
                        className="w-full bg-transparent"
                      >
                        <Upload className="mr-2 h-3 w-3" />
                        {formData.uploadedCertificate ? "Certificate Uploaded ✓" : "Upload Certificate"}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Verified Badge Benefits:</strong> Higher visibility in search, increased trust from
                      mentees, and priority in mentor recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your profile will be reviewed within 24-48 hours</li>
              <li>• You'll receive an email confirmation once approved</li>
              <li>• Start receiving mentee requests immediately after approval</li>
              <li>• Earn money helping others grow their careers!</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} className="bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleFinish}
              disabled={isLoading || !formData.agreedToTerms || !formData.agreedToGuidelines}
              className="bg-green-700 hover:bg-green-800"
            >
              {isLoading ? "Completing..." : "Complete Profile Setup"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
