import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image";



export function Footer() {
  return (
    <footer className="bg-[#012643] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
           <div className="flex items-center space-x-4">
  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white cursor-pointer hover:bg-gray-400 transition-all flex items-center justify-center overflow-hidden">
    <Image
      src="/UCLogo-main.png"
      alt="Unusual Consultant Logo"
      width={80}
      height={80}
      className="object-cover rounded-full"
    />
  </div>
  <span className="font-extrabold text-[30px]">Unusual Consultant</span>
</div>


            <p className="text-white text-sm font-semibold text-[16px]">
              Unusual journeys need Unusual guidance
              — we bring both AI and experts together.</p>
           <div className="flex space-x-6">
  <Facebook className="h-7 w-7 cursor-pointer rounded-full bg-white p-1 text-[#012643] hover:bg-gray-400 transition-all" />
  <Twitter className="h-7 w-7 cursor-pointer rounded-full bg-white p-1 text-[#012643] hover:bg-gray-400 transition-all" />
  <Linkedin className="h-7 w-7 cursor-pointer rounded-full bg-white p-1 text-[#012643] hover:bg-gray-400 transition-all" />
  <Instagram className="h-7 w-7 cursor-pointer rounded-full bg-white p-1 text-[#012643] hover:bg-gray-400 transition-all" />
</div>

          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-[26px] md:pl-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[18px]">
              <li>
                <Link href="/mentors" className="text-white hover:text-white">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-white hover:text-white">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/resume-builder" className="text-white hover:text-white">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/roadmaps" className="text-white hover:text-white">
                  Roadmaps
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 text-[26px]">
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="space-y-2 text-sm text-[18px]">
              <li>
                <Link href="/help" className="text-white hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-whitehover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-[26px] ">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3 text-sm text-[18px]">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-white" />
                <span className="text-white">hello@unusualconsultant.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-white" />
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-white" />
                <span className="text-white">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-4 text-center text-[18px] text-white">
          <p>&copy; 2025 Unusual Consultant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
