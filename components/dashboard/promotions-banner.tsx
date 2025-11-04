"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Wallet, Gift } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function PromotionsBanner() {
  const [copied, setCopied] = useState(false);
  const referralCode = "APOORV2024";
  const referralEarnings = 2500;
  const referralCount = 5;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(
      `https://unusualconsultant.com/signup?ref=${referralCode}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLearnMore = () => {
    console.log("Learn more about referral program");
  };

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
          <div className="flex items-center space-x-4 md:space-x-6">
            <Image
              src="/giftanimation.gif"
              alt="Gift Animation"
              width={60}
              height={60}
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
          <div className="border-2 bg-white border-dotted border-black rounded-md py-2 px-3 flex flex-col items-center space-y-1 w-[180px] md:w-[200px] text-center">
            <p className="text-[#525252] text-[11px] font-medium">
              Your referral code is
            </p>
            <span className="font-mono text-black text-sm font-semibold">
              {referralCode}
            </span>
            <span
              onClick={copyReferralCode}
              className="text-[#525252] text-[11px] cursor-pointer hover:underline"
            >
              {copied ? "Copied!" : "Tap to Copy"}
            </span>
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
              <span className="text-2xl font-bold text-[#0073CF]">
                {referralCount}
              </span>
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
              <span className="text-2xl font-bold text-[#0073CF]">₹500</span>
            </div>
            <p className="text-[18px] font-semibold text-[#525252] leading-[140%]">
              Per Referral
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🎉 Offer Section */}
      <Card className="relative rounded-[16px] shadow-lg overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap opacity-80">
          <Image
            src="/confetti1.png"
            alt="Confetti"
            width={200}
            height={120}
            className="object-cover"
          />
          <Image
            src="/confetti2.png"
            alt="Confetti"
            width={200}
            height={120}
            className="object-cover"
          />
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-5 gap-3 text-center">
          <div className="flex-1">
            <h4 className="text-[18px] font-semibold mb-1 text-[#525252]">
              Limited Time: Double Rewards!
            </h4>
            <p className="text-[16px] font-semibold text-[#525252] mb-3">
              Earn ₹1000 credits per referral this month only
            </p>
            <span className="px-7 py-1.5 bg-red-100 text-red-600 font-semibold text-sm rounded-xl">
              2x credits
            </span>
          </div>

          <Button
            size="sm"
            className="bg-[#0073CF] text-white px-6 py-1.5 rounded-lg"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>

        <div className="absolute top-2 left-1">
          <Image
            src="/gift.gif"
            alt="Gift"
            width={90}
            height={90}
            unoptimized
            className="opacity-95"
          />
        </div>
      </Card>
    </div>
  );
}
