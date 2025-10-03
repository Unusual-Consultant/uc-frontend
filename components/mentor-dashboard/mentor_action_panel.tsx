import { Card } from "@/components/ui/card";
import Image from "next/image";

export function MentorActionPanel() {
  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-2">
      <Image
    src="/quick_Access_icon.png" 
    alt="Quick Access"
    width={24} // small size
    height={24}
    className="object-contain"
  />
        <h2 className="text-xl md:text-2xl font-bold text-gray-800"><span className="text-[#003b6b]">Quick</span>
        <span className="text-text-primary"> Access</span></h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <a href="/your-link-here" className="block cursor-pointer">
          <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/schedule_session.png"
              alt="Resume Review"
              className="w-full h-full object-cover"
            />
          </Card>
        </a>

        <a href="/your-link-here" className="block cursor-pointer">
          <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/create_package.png"
              alt="Book a Session"
              className="w-full h-full object-cover"
            />
          </Card>
        </a>

        <a href="/your-link-here" className="block cursor-pointer">
          <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/View_analytics.png"
              alt="Plan Career"
              className="w-full h-full object-cover"
            />
          </Card>
        </a>

        <a href="/your-link-here" className="block cursor-pointer">
          <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <img
              src="/Withdraw_funds.png"
              alt="Ask AI"
              className="w-full h-full object-cover"
            />
          </Card>
        </a>
      </div>
    </div>
  );
}
