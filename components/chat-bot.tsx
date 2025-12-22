"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { sendChatMessage } from "@/lib/api"
import AnimatedCornerIcons from "./animated_smart_buddy"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Smart Buddy. I can help you find the perfect mentor, answer questions about our platform, or guide you through your career journey. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true)
    }

    window.addEventListener("openChatbot", handleOpenChatbot)
    return () => {
      window.removeEventListener("openChatbot", handleOpenChatbot)
    }
  }, [])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    const messageText = inputMessage
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Get auth token if available
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null

      // Send message to backend
      const response = await sendChatMessage(messageText, conversationId || undefined, authToken)

      // Store conversation ID
      if (response.conversation_id) {
        setConversationId(response.conversation_id)
      }

      // Add bot response
      const botResponse: Message = {
        id: messages.length + 2,
        text: response.response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4"
    >
      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg relative">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Smart Buddy
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-900">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 flex-shrink-0" />
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-gray-500">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button onClick={sendMessage} size="sm" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="ghost"
          className="w-14 h-14 transition-all duration-300 bg-transparent hover:bg-transparent"
          title="Smart Buddy"
        >
          <AnimatedCornerIcons />
        </Button>
      )}
    </div>
  )
}
