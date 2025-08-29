"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"mentee" | "mentor">("mentee")
  const router = useRouter()
  const userName = "Apoorv"

  useEffect(() => {
    // Check if user is logged in from localStorage or auth context
    const authState = localStorage.getItem("userAuth")
    if (authState) {
      const { isLoggedIn: loggedIn, userType: type } = JSON.parse(authState)
      setIsLoggedIn(loggedIn)
      setUserType(type)
    }
  }, [])

  const quickLinks = [
    { name: "Find Mentors", href: "/mentors" },
    { name: "Courses", href: "/courses" },
    { name: "Templates", href: "/templates" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Roadmaps", href: "/roadmaps" },
    { name: "Blogs", href: "/blogs" },
  ]

  const handleSignOut = () => {
    // Clear authentication state
    localStorage.removeItem("userAuth")
    setIsLoggedIn(false)
    setUserType("mentee")
    // Redirect to home page
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600" />
            <span className="font-bold text-xl">Unusual Consultant</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {quickLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{userName.charAt(0)}</span>
                  </div>
                  <span className="font-medium">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={`/${userType}/dashboard`} className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    🧑‍🎓 {userType === "mentee" ? "Mentee" : "Mentor"} Dashboard
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
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-green-700 hover:bg-green-800" asChild>
                <Link href="/onboarding/mentor">Become a Mentor</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              {isLoggedIn && (
                <>
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                      <span className="text-white font-medium">{userName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{userName}</div>
                      <div className="text-sm text-gray-600 capitalize">{userType}</div>
                    </div>
                  </div>
                  <Link
                    href={`/${userType}/dashboard`}
                    className="text-sm font-medium transition-colors hover:text-blue-600 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    🧑‍🎓 Dashboard
                  </Link>
                </>
              )}

              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/profile">Profile</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-red-600 border-red-200"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
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
