import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Mail, FileText } from "lucide-react"
import Link from "next/link"

export default function ProfilePendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Profile Submitted Successfully!</CardTitle>
              <CardDescription>Your mentor application is under review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Thank you for applying to become a mentor on Unusual Consultant. Our team will review your profile and
                  get back to you within 24-48 hours.
                </p>
              </div>

              {/* What happens next */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Profile Review</h4>
                      <p className="text-sm text-gray-600">
                        Our team reviews your professional background and expertise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Verification</h4>
                      <p className="text-sm text-gray-600">We verify your LinkedIn profile and work experience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Profile Goes Live</h4>
                      <p className="text-sm text-gray-600">Once approved, your profile will be visible to mentees</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Stay in touch</h4>
                </div>
                <p className="text-sm text-blue-800">
                  We'll send you an email confirmation once your profile is approved. If you have any questions, reach
                  out to us at{" "}
                  <a href="mailto:mentors@unusualconsultant.com" className="underline">
                    mentors@unusualconsultant.com
                  </a>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/mentor/resources">
                    <FileText className="mr-2 h-4 w-4" />
                    Mentor Resources
                  </Link>
                </Button>
              </div>

              {/* Timeline */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Expected review time: 24-48 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
