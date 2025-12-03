import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthenticatedUserProvider } from "@/context/AuthenticatedUserProvider"
import { ChatBot } from "@/components/chat-bot"
import { Mulish } from "next/font/google";
import { Suspense } from "react";
import { MainWrapper } from "@/components/MainWrapper";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unusual Consultant - Find Your Perfect Mentor",
  description: "Connect with industry experts for mentorship and freelance opportunities",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mulish.variable}>
      <body
        className={`${mulish.className} min-h-screen bg-gradient-to-t from-[#B7DFFF] to-white`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <AuthenticatedUserProvider>``
            <Header />

            <MainWrapper>
              {children}
            </MainWrapper>

            <Footer />
            <ChatBot />
          </AuthenticatedUserProvider>
        </Suspense>
      </body>
    </html>
  )
}
