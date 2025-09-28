"use client"

import Image from "next/image"

interface ProfileProgressCircleProps {
  size?: number      // Diameter of the circle
  progress: number   // 0 to 100
  imageSrc: string   // User avatar
}

export const ProfileProgressCircle: React.FC<ProfileProgressCircleProps> = ({
  size = 120,
  progress = 30,
  imageSrc,
}) => {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const innerSize = size - strokeWidth * 2 // fits snug inside the ring
  const imageSize = innerSize * 0.7        // smaller image on top

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* SVG Circle */}
      <svg width={size} height={size} className="absolute rotate-[-90deg]">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // gray-200
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6" // Tailwind blue-500
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Background Circle inside */}
      <div
        className="flex items-center justify-center rounded-full bg-[#D9D9D9]"
        style={{ width: innerSize, height: innerSize }}
      >
        {/* Profile Image */}
        <Image
          src={imageSrc}
          alt="Profile"
          width={imageSize}
          height={imageSize}
          className="object-cover rounded-full"
        />
      </div>
    </div>
  )
}
