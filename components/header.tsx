"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, Settings, LogOut, LayoutDashboard, ChevronDown } from "lucide-react"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

export function Header() {
  const { user, isAuthenticated, logout } = useAuthenticatedUser()
  const router = useRouter()
  const pathname = usePathname()

  const authPages = ["/login", "/signup"]

  // ✅ Reordered quick links as requested
  const quickLinks = [
    { name: "Find Mentors", href: "/mentors" },
    { name: "Courses", href: "/courses" },
    { name: "Templates", href: "/templates" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Roadmaps", href: "/roadmaps" },
    { name: "Blogs", href: "/blogs" },
  ]

  const displayName = user?.firstName || user?.name || "User"

  if (authPages.includes(pathname)) {
    return (
      <header className="flex justify-start py-2 px-6">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/unusual-consultant-logo.jpg" alt="Logo" className="h-10 w-10" />
          <span className="font-semibold text-lg text-black">Unusual Consultant</span>
        </Link>
      </header>
    )
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 
                 shadow-[0_2px_20px_rgba(0,0,0,0.1)] border-b border-white/20"
    >
      <div className="flex h-16 items-center justify-between px-10">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/unusual-consultant-logo.jpg" alt="Logo" className="h-10 w-10" />
            <span className="font-semibold text-lg text-black">Unusual Consultant</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {quickLinks.map((link) => {
            if (link.name === "Resume Builder") {
              return (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="text-sm font-medium text-gray-800 hover:text-[#0073CF] flex items-center gap-1 transition-colors">
                      Resume Builder
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 mt-2 rounded-lg shadow-lg backdrop-blur-xl bg-white/80 border border-white/30">
                    <DropdownMenuItem asChild>
                      <Link href="/templates" className="text-sm hover:text-[#0073CF] transition-colors">
                        Templates
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/resume-tools" className="text-sm hover:text-[#0073CF] transition-colors">
                        Resume Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/resume-analyzer" className="text-sm hover:text-[#0073CF] transition-colors">
                        Analyzer
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-800 hover:text-[#0073CF] transition-colors"
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* User / Login */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-[#0073CF] text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu (unchanged) */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
