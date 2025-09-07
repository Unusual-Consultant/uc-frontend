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
import { Menu, User, Settings, LogOut, LayoutDashboard } from "lucide-react"
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider"

export function Header() {
  const { user, isAuthenticated, logout } = useAuthenticatedUser()
  const router = useRouter()
  const pathname = usePathname()

  // Pages where we only show the logo
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

  // ✅ Only logo for auth pages
  if (authPages.includes(pathname)) {
    return (
      <header className="flex justify-start py-2 px-6">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/unusual-consultant-logo.jpg"
            alt="Unusual Consultant Logo"
            className="h-10 w-10"
          />
          <span className="font-semibold text-lg text-black">
            Unusual Consultant
          </span>
        </Link>
      </header>
    )
  }

  // ✅ Full header for all other pages
  return (
    <header className="flex justify-center py-2">
      <div className="container mx-7xl flex h-16 items-center justify-between px-6 
                  bg-white rounded-2xl shadow-2xl shadow-[0_0_25px_rgba(0,0,0,0.2)] max-w-9xl">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/unusual-consultant-logo.jpg"
              alt="Unusual Consultant Logo"
              className="h-10 w-10"
            />
            <span className="font-semibold text-lg text-black">Unusual Consultant</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-[32px]">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
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
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button  
                asChild
                className="bg-[#0073CF] text-white px-7 py-4 rounded-3xl hover:bg-blue-700"
              >
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{displayName}</div>
                    <div className="text-sm text-gray-600">Logged in</div>
                  </div>
                </div>
              )}

              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t pt-4 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/profile">Profile</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-red-600 border-red-200"
                      onClick={() => logout()}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button className="w-full bg-green-700 hover:bg-green-800" asChild>
                      <Link href="/onboarding/mentor">Become a Mentor</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
