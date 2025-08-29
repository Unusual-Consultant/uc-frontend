"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Copy, Users, IndianRupee } from "lucide-react"
import { useState } from "react"

export function PromotionsBanner() {
  const [copied, setCopied] = useState(false)
  const referralCode = "APOORV2024"
  const referralEarnings = 2500
  const referralCount = 5

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://unusualconsultant.com/signup?ref=${referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Main Referral Banner */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/20 rounded-full">
                <Gift className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Invite Friends, Earn ₹500 Credits</h3>
                <p className="text-sm opacity-90">
                  Share your referral link and earn credits for every friend who joins
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="secondary"
                onClick={copyReferralCode}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <p className="text-xs opacity-75">Code: {referralCode}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{referralCount}</span>
            </div>
            <p className="text-sm text-gray-600">Friends Referred</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <IndianRupee className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{referralEarnings}</span>
            </div>
            <p className="text-sm text-gray-600">Credits Earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Gift className="h-6 w-6 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">₹500</span>
            </div>
            <p className="text-sm text-gray-600">Per Referral</p>
          </CardContent>
        </Card>
      </div>

      {/* Limited Time Offer */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Gift className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-orange-900">Limited Time: Double Rewards!</h4>
                  <Badge className="bg-orange-200 text-orange-800">2x Credits</Badge>
                </div>
                <p className="text-sm text-orange-700">Earn ₹1000 credits per referral this month only</p>
              </div>
            </div>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
