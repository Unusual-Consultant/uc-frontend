"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  "/SmartBuddy_1.png",
  "/SmartBuddy_2.png",
  "/SmartBuddy_3.png",
  "/SmartBuddy_4.png",
  "/SmartBuddy_5.png",
  "/SmartBuddy_6.png",
];

export default function AnimatedSmartBuddy() {
  const [index, setIndex] = useState(0);

  // Instantly cycle images every 1s (no fade)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Change -top-8 to -bottom-8 to match the right-0 positioning (assuming the right-0 means 0 padding from the right)
    <div className="absolute -bottom-8 -right-0 w-[120px] h-[108px] z-20">
      <Image
        src={images[index]}
        alt={`SmartBuddy Animation ${index + 1}`}
        fill
        className="object-contain transition-none"
        priority
      />
    </div>
  );
}