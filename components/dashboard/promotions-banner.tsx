"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, IndianRupee } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Wallet} from "lucide-react"
import { Gift} from "lucide-react"


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

  const handleLearnMore = () => {
    console.log("Learn more about referral program")
  }
  return (
    <div className="space-y-6">
      {/* Main Referral Banner with full background image */}
      <Card className="relative text-white overflow-hidden rounded-xl w-full">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/code_bg.png')" }}
        />

        <CardContent className="relative p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left content with GIF */}
          <div className="flex items-center space-x-4">
            <Image
              src="/giftanimation.png"
              alt="Gift"
              width={60}
              height={60}
              className="object-contain"
            />
            <div>
              <h3 className="text-xl font-bold mb-1">Invite Friends, Earn ₹500 Credits</h3>
              <p className="text-sm opacity-90">
                Share your referral link and earn credits for every friend who joins
              </p>
            </div>
          </div>

          {/* Referral Code Box with dotted outline */}
          <div className="border-2 bg-white border-dotted border-black rounded-md p-3 flex flex-col items-center space-y-1 w-[200px] text-center">
  <p className="text-gray-500 text-[10px]">Your referral code is</p>
  <span className="font-mono text-black text-sm font-semibold">{referralCode}</span>
  <span
    onClick={copyReferralCode}
    className="text-gray-500 text-[11px] cursor-pointer hover:underline"
  >
    {copied ? "Copied!" : "Tap to Copy"}
  </span>
</div>

        </CardContent>
      </Card>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
  {/* Friends Referred */}
  <Card className="shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition rounded-xl">
    <CardContent className="p-8 text-center flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3">
        <Users className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-blue-600">{referralCount}</span>
      </div>
      <p className="text-base font-medium text-gray-600">Friends Referred</p>
    </CardContent>
  </Card>

  {/* Credits Earned */}
  <Card className="shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition rounded-xl">
    <CardContent className="p-8 text-center flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3">
        <Wallet className="h-8 w-8 text-green-600" />
        <span className="text-2xl font-bold text-green-600">
          ₹{referralEarnings.toLocaleString()}
        </span>
      </div>
      <p className="text-base font-medium text-gray-600">Credits Earned</p>
    </CardContent>
  </Card>

  {/* Per Referral */}
  <Card className="shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition rounded-xl">
    <CardContent className="p-8 text-center flex flex-col items-center">
      <div className="flex items-center gap-3 mb-3">
        <Gift className="h-8 w-8 text-purple-600" />
        <span className="text-2xl font-bold text-purple-600">₹500</span>
      </div>
      <p className="text-base font-medium text-gray-600">Per Referral</p>
    </CardContent>
  </Card>
</div>
{/* promotional banner */}
<Card className="relative rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.25)] overflow-hidden">
  {/* Confetti Background (repeated) */}
  <div className="absolute inset-0 flex flex-wrap opacity-80">
    <Image
      src="/confetti1.png"
      alt="Confetti 1"
      width={200}
      height={120}
      className="object-cover"
    />
    <Image
      src="/confetti2.png"
      alt="Confetti 2"
      width={200}
      height={120}
      className="object-cover"
    />
    <Image
      src="/confetti1.png"
      alt="Confetti 1 repeat"
      width={200}
      height={120}
      className="object-cover"
    />
    <Image
      src="/confetti2.png"
      alt="Confetti 2 repeat"
      width={300}
      height={120}
      className="object-cover"
    />
  </div>

  {/* Content Layer */}
  <div className="relative flex items-center justify-between gap-4 p-4 md:p-6">
    {/* Text */}
    <div className="flex-1 text-center md:text-center">
      <h4 className="text-lg md:text-xl font-bold mb-1">Limited Time: Double Rewards!</h4>
      <p className="text-sm md:text-base font-semibold mb-3">
        Earn ₹1000 credits per referral this month only
      </p>
      <span className="px-7 py-1.5 bg-red-100 text-red-600 font-semibold text-sm rounded-xl">
        2x credits
      </span>
    </div>

    {/* Button */}
    <div className="flex-shrink-0">
      <Button
        size="sm"
        className="bg-blue-600 text-white px-6 py-1.5 rounded-lg"
        onClick={handleLearnMore}
      >
        Learn More
      </Button>
    </div>
  </div>

  {/* Gift in Top-left */}
  <div className="absolute top-2 left-1">
    <Image
      src="/gift.png"
      alt="Gift"
      width={100}
      height={100}
      className="opacity-95"
    />
  </div>
</Card>

    </div>
  )
}
