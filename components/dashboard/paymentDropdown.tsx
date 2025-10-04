"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Smartphone, Banknote, Wallet } from "lucide-react"

type MethodId = "card" | "upi" | "netbanking" | "wallet"
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

const paymentMethods: { id: MethodId; label: string; icon: IconComponent }[] = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", icon: Banknote },
  { id: "wallet", label: "Digital Wallet", icon: Wallet },
]

interface Props {
  onPaymentComplete?: () => void
}

export default function PaymentButtonsGroup({ onPaymentComplete }: Props) {
  const [openId, setOpenId] = useState<MethodId | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Card
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExp, setCardExp] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  // UPI
  const [upiId, setUpiId] = useState("")

  // Netbanking
  const [selectedBank, setSelectedBank] = useState("HDFC")

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpenId(null)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null)
    }
    document.addEventListener("click", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const toggle = (id: MethodId) => setOpenId((prev) => (prev === id ? null : id))

  const handlePay = (method: MethodId) => {
    alert(`${method} payment simulated!`)
    setOpenId(null)
    if (onPaymentComplete) onPaymentComplete()
  }

  return (
    <div ref={rootRef} className="w-full max-w-2xl">
      <div className="grid grid-cols-1 gap-3">
        {paymentMethods.map((m) => {
          const Icon = m.icon
          const isOpen = openId === m.id

          return (
            <div key={m.id} className="relative">
              <Button
                variant="outline"
                onClick={() => toggle(m.id)}
                className="w-full justify-between flex items-center px-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-[#0073CF]" />
                  <span className="text-sm">{m.label}</span>
                </div>
                <svg
                  className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {isOpen && (
                <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-[#C7C7C7] rounded-md shadow-lg p-4">
                  {/* Card */}
                  {m.id === "card" && (
                    <div className="space-y-2">
                      <input
                        placeholder="Card Number"
                        className="w-full border px-3 py-2 rounded"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <input
                        placeholder="Name on Card"
                        className="w-full border px-3 py-2 rounded"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <input
                          placeholder="MM/YY"
                          className="w-1/2 border px-3 py-2 rounded"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                        />
                        <input
                          placeholder="CVV"
                          className="w-1/2 border px-3 py-2 rounded"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* UPI */}
                  {m.id === "upi" && (
                    <input
                      placeholder="Enter UPI ID"
                      className="w-full border px-3 py-2 rounded"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  )}

                  {/* Netbanking */}
                  {m.id === "netbanking" && (
                    <select
                      className="w-full border px-3 py-2 rounded"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option>HDFC</option>
                      <option>ICICI</option>
                      <option>SBI</option>
                      <option>Axis</option>
                    </select>
                  )}

                  {/* Wallet */}
                  {m.id === "wallet" && (
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => handlePay("wallet")}>PayPal</Button>
                      <Button onClick={() => handlePay("wallet")}>Amazon Pay</Button>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={() => setOpenId(null)}>Cancel</Button>
                    <Button
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handlePay(m.id)}
                    >
                      Pay
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
