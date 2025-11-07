"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ActionPanel() {
  const router = useRouter();

  const cards = [
    {
      img: "/get_resume_reviwed.png",
      alt: "Resume Review",
      title: "Expert feedback in 24 hours",
      buttonText: "Upload Resume",
      href: "/resume-review",
      bg: "#433BC4",
      textColor: "white",
      buttonTextColor: "#433BC4",
    },
    {
      img: "/book_session.png",
      alt: "Book a Session",
      title: "Get matched with top mentors instantly",
      buttonText: "Quick Book",
      href: "/book-session",
      bg: "#FFE6D3",
      textColor: "#333333",
      buttonTextColor: "#333333",
    },
    {
      img: "/plan_career.png",
      alt: "Plan Career",
      title: "Stay updated on your mentorship discussions",
      buttonText: "View Messages",
      href: "/quickactions/messages", 
      bg: "#5DAEFF",
      textColor: "white",
      buttonTextColor: "#5DAEFF",
    },
    {
      img: "/ask_ai.png",
      alt: "Ask AI",
      title: "Get instant career advice",
      buttonText: "Chat Now",
      href: "/ask-ai",
      bg: "#3FC6A6",
      textColor: "white",
      buttonTextColor: "#3FC6A6",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Image
          src="/quick_Access_icon.png"
          alt="Quick Access"
          width={24}
          height={24}
          className="object-contain"
        />
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          <span className="text-[#003b6b]">Quick</span>
          <span className="text-text-primary"> Access</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {cards.map((card, index) => (
          <div key={index} className="group perspective relative w-full h-[350px]">
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <Card className="absolute inset-0 rounded-2xl shadow-lg overflow-hidden [backface-visibility:hidden]">
                <img src={card.img} alt={card.alt} className="w-full h-full object-cover" />
              </Card>

              {/* Back Side */}
              <Card
                className="absolute inset-0 rounded-2xl flex flex-col justify-center items-center text-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                style={{ backgroundColor: card.bg, color: card.textColor }}
              >
                <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                <button
                  onClick={() => router.push(card.href)} // ✅ navigate using router
                  className="bg-white px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                  style={{ color: card.buttonTextColor }}
                >
                  {card.buttonText}
                </button>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
