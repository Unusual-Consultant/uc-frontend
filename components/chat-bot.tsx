"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Info, Rocket, User2 } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "bot" | "user"
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi, I’m Smart Buddy, your first mentor on Unusual Consultant.",
      sender: "bot",
    },
    {
      id: 2,
      text: "I’ll guide you with career questions and, if needed, connect you with expert mentors✨\n\nWhat’s on your mind today?",
      sender: "bot",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = (text?: string) => {
    const messageToSend = text || inputMessage.trim()
    if (!messageToSend) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageToSend,
      sender: "user",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        text: getBotResponse(messageToSend),
        sender: "bot",
      }
      setMessages((prev) => [...prev, botReply])
    }, 800)
  }

  const getBotResponse = (msg: string) => {
    const lower = msg.toLowerCase()
    if (lower.includes("career")) return "Let’s discuss your career path — what area are you exploring right now?"
    if (lower.includes("skill")) return "Awesome! Skill growth is key — which skill are you focusing on improving?"
    if (lower.includes("interview")) return "Let’s prepare for success! I can share mock questions and interview tips."
    return "That’s interesting! I can help you with mentorship, skill building, or interview prep — which would you like to focus on?"
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-16 h-16 bg-[#3B81BF] shadow-[0_4px_20px_#00000040] hover:scale-105 transition"
          >
            <MessageCircle className="text-white" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed right-6 z-50 w-96 max-w-[calc(100vw-2rem)] transition-all duration-300"
          style={{ bottom: !isOpen ? "24px" : "40px" }}
        >
          <Card className="border-0 shadow-[0_4px_20px_#00000040] rounded-2xl overflow-hidden bg-[#F5FBFF]">
            {/* Header */}
            <CardHeader
  className="bg-[#F1F8FF] shadow-[0_4px_8px_#00000040] flex justify-between items-start py-2 px-3"
>
  {/* Left corner: Smart Buddy */}
  <div className="flex items-start gap-3">
    <div className="bg-[#3B81BF] rounded-full p-1 flex items-center justify-center">
      <img
        src="/smartbuddy.png"
        alt="Smart Buddy"
        className="h-10 w-10 rounded-full"
      />
    </div>
    <CardTitle className="text-sm font-medium text-[#3B81BF] mt-1">
      Smart Buddy
    </CardTitle>
    <div className="ml-auto">
    <X
      className="h-5 w-5 cursor-pointer text-[#3B81BF] hover:opacity-75"
      onClick={() => setIsOpen(false)}
    />
  </div>
  </div>


</CardHeader>


            <CardContent className="p-4">
              {/* Messages */}
              <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`px-4 py-3 max-w-[80%] text-sm leading-relaxed shadow-[0_2px_6px_#00000020] ${
                        msg.sender === "bot"
                          ? "bg-[#FFFFF] text-black rounded-2xl"
                          : "bg-[#0073CF] text-white rounded-2xl"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Option Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  onClick={() => sendMessage("Career Guidance")}
                  className="bg-[#0073CF] hover:bg-[#0063B5] text-white text-xs px-3 py-1.5 rounded-full shadow-[0_2px_6px_#00000040] flex items-center gap-1"
                >
                  <Info className="h-3 w-3" /> Career Guidance
                </Button>

                <Button
                  onClick={() => sendMessage("Skill Growth")}
                  className="bg-[#0073CF] hover:bg-[#0063B5] text-white text-xs px-3 py-1.5 rounded-full shadow-[0_2px_6px_#00000040] flex items-center gap-1"
                >
                  <Rocket className="h-3 w-3" /> Skill Growth
                </Button>

                <Button
                  onClick={() => sendMessage("Interview Preparation")}
                  className="bg-[#0073CF] hover:bg-[#0063B5] text-white text-xs px-3 py-1.5 rounded-full shadow-[0_2px_6px_#00000040] flex items-center gap-1"
                >
                  <User2 className="h-3 w-3" /> Interview Preparation
                </Button>
              </div>

              {/* Input */}
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Write your response..."
                className="w-full border border-gray-300 text-sm rounded-none focus-visible:ring-0"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
