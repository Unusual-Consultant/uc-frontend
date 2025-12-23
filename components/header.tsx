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
          <img src="/UCLogo-main.png" alt="Logo" className="w-10" />
          <span className="font-semibold text-lg text-black">Unusual Consultant</span>
        </Link>
      </header>
    )
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 
                 shadow-[0px_8px_8px_rgba(0,0,0,0.1)] border-b border-white/20"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/UCLogo-main.png" alt="Logo" className="w-10" />
            <span className="font-bold text-xl text-black">Unusual Consultant</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-md font-semibold text-black hover:text-[#0073CF] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User / Login */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-white/20 transition-all rounded-full px-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-white text-sm font-semibold">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 hidden sm:inline">{displayName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 mt-2 rounded-xl shadow-2xl backdrop-blur-xl bg-white/95 border border-white/40 p-2">
                <div className="px-3 py-3 mb-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Account</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                </div>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem asChild>
                  <Link href="/mentee/dashboard" className="flex items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                    <LayoutDashboard className="mr-3 h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                    <User className="mr-3 h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                    <Settings className="mr-3 h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem className="text-red-600 cursor-pointer px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors group" onClick={() => logout()}>
                  <LogOut className="mr-3 h-5 w-5 group-hover:text-red-700 transition-colors" />
                  <span className="font-medium group-hover:text-red-700 transition-colors">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-[#0073CF] text-white px-10 py-4 rounded-full hover:bg-[#003c6c]"
            >
              <Link href="/login">Log in</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
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

              {isAuthenticated && user ? (
                <div className="pt-4 border-t">
                  <p className="font-semibold mb-2">Hi, {displayName}</p>

                  <Link href="/mentee/dashboard" className="text-sm block py-1 hover:text-blue-600">
                    Dashboard
                  </Link>

                  <Link href="/profile" className="text-sm block py-1 hover:text-blue-600">
                    Profile
                  </Link>

                  <Link href="/settings" className="text-sm block py-1 hover:text-blue-600">
                    Settings
                  </Link>

                  <button
                    onClick={() => logout()}
                    className="text-sm text-red-600 mt-2 hover:underline"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Button
                  asChild
                  className="mt-4 bg-[#0073CF] text-white px-6 py-2 rounded-full hover:bg-blue-700"
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
