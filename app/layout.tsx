import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthenticatedUserProvider } from "@/context/AuthenticatedUserProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Unusual Consultant - Find Your Perfect Mentor",
  description: "Connect with industry experts for mentorship and freelance opportunities",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AuthenticatedUserProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthenticatedUserProvider>
      </body>
    </html>
  )
}
