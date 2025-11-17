"use client"

import "@fontsource/mulish"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Wallet, Gift, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

export function PromotionsBanner() {
  const { makeAuthenticatedRequest } = useAuthenticatedUser()
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [referralEarnings, setReferralEarnings] = useState(0)
  const [referralCount, setReferralCount] = useState(0)
  const [perReferralAmount, setPerReferralAmount] = useState(500)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReferralStats = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const token = localStorage.getItem("auth_token")
        if (!token) {
          console.warn("No auth token found, showing default values")
          setReferralCode("")
          setReferralEarnings(0)
          setReferralCount(0)
          setIsLoading(false)
          return
        }

        const response = await makeAuthenticatedRequest(`/mentee-dashboard/referral-stats`)

        if (!response.ok) {
          throw new Error(`Failed to fetch referral stats: ${response.status}`)
        }

        const data: {
          referralCode: string
          referralCount: number
          referralEarnings: number
          perReferralAmount: number
        } = await response.json()

        setReferralCode(data.referralCode)
        setReferralEarnings(data.referralEarnings)
        setReferralCount(data.referralCount)
        setPerReferralAmount(data.perReferralAmount)
      } catch (err) {
        console.error("Error fetching referral stats:", err)
        setError("Failed to load referral stats")
        setReferralCode("")
        setReferralEarnings(0)
        setReferralCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReferralStats()
  }, [makeAuthenticatedRequest])

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(
        `https://unusualconsultant.com/signup?ref=${referralCode}`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6 font-[Mulish]">
      {/* 🎁 Gift Card Section */}
      <Card className="relative overflow-hidden rounded-[16px] shadow-lg">
        <img
          src="/giftbanner.gif"
          alt="Animated Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />

        <CardContent className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-5 gap-4 md:gap-10 text-white">
          <div className="flex items-center">
            <Image
              src="/giftanimation.gif"
              alt="Gift Animation"
              width={120}
              height={120}
              unoptimized
              className="object-contain"
            />
            <div>
              <h3 className="text-lg md:text-xl font-semibold leading-tight">
                Invite Friends, Earn ₹500 Credits
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-snug">
                Share your referral link and earn credits for every friend who joins
              </p>
            </div>
          </div>

          {/* Referral Code Box */}
          <div className="relative w-[180px] md:w-[200px] p-3 flex flex-col items-center space-y-1 text-center bg-white">
  {/* Dashed border */}
  <div className="absolute inset-0 rounded-md pointer-events-none"
       style={{
         border: "2px solid",
         borderImage: "repeating-linear-gradient(45deg, black 0 6px, transparent 6px 12px) 1",
         borderImageSlice: 1,
       }}
  />
  {/* Actual content */}
  {isLoading ? (
    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
  ) : referralCode ? (
    <div
      className="py-2 px-3 flex flex-col items-center space-y-1 cursor-pointer"
      onClick={copyReferralCode}
    >
      <p className="text-[#525252] text-[11px] font-medium">Your referral code is</p>
      <span className="font-mono text-black text-sm font-semibold">{referralCode}</span>
      <span className="text-[#525252] text-[11px] hover:underline">
        {copied ? "Copied!" : "Tap to Copy"}
      </span>
    </div>
  ) : (
    <p className="text-gray-500 text-[10px]">No referral code available</p>
  )}
</div>

        </CardContent>
      </Card>

      {/* 📊 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Stat 1 */}
        <Card className="rounded-[10px] shadow-md hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center justify-center text-center py-8 md:py-10">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-7 w-7 text-black" />
              <span className="text-2xl font-bold text-[#0073CF]">{referralCount}</span>
            </div>
            <p className="text-[18px] font-semibold text-[#525252] leading-[140%]">
              Friends Referred
            </p>
          </CardContent>
        </Card>

        {/* Stat 2 */}
        <Card className="rounded-[10px] shadow-md hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center justify-center text-center py-8 md:py-10">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="h-7 w-7 text-black" />
              <span className="text-2xl font-bold text-[#0073CF]">
                ₹{referralEarnings.toLocaleString()}
              </span>
            </div>
            <p className="text-[18px] font-semibold text-[#525252] leading-[140%]">
              Credits Earned
            </p>
          </CardContent>
        </Card>

        {/* Stat 3 */}
        <Card className="rounded-[10px] shadow-md hover:shadow-xl transition">
          <CardContent className="flex flex-col items-center justify-center text-center py-8 md:py-10">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="h-7 w-7 text-black" />
              <span className="text-2xl font-bold text-[#0073CF]">₹{perReferralAmount}</span>
            </div>
            <p className="text-[18px] font-semibold text-[#525252] leading-[140%]">
              Per Referral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🏞️ Gift Card Image Section */}
      {/* 🏞️ Gift Card Image Section */}
<div className="flex justify-center">
  <Image
    src="/gift_card.png"
    alt="Gift Card"
    width={1050}
    height={600}
    className="max-w-[1234px]"
  />
</div>

    </div>
  )
}
