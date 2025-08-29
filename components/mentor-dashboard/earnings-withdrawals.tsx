"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, CreditCard, Wallet, Download, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function EarningsWithdrawals() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("")

  const earningsOverview = {
    totalEarnings: "₹1,24,500",
    thisMonth: "₹45,230",
    thisWeek: "₹12,400",
    withdrawableBalance: "₹38,750",
    pendingClearance: "₹6,480",
    mentorshipEarnings: "₹89,200",
    freelanceEarnings: "₹35,300",
  }

  const monthlyBreakdown = [
    { month: "January 2024", mentorship: "₹32,400", freelance: "₹12,830", total: "₹45,230" },
    { month: "December 2023", mentorship: "₹28,900", freelance: "₹8,600", total: "₹37,500" },
    { month: "November 2023", mentorship: "₹31,200", freelance: "₹10,400", total: "₹41,600" },
  ]

  const withdrawalHistory = [
    {
      id: 1,
      date: "2024-01-10",
      amount: "₹25,000",
      method: "Bank Transfer",
      status: "completed",
      transactionId: "TXN123456789",
    },
    {
      id: 2,
      date: "2024-01-05",
      amount: "₹15,000",
      method: "UPI",
      status: "completed",
      transactionId: "UPI987654321",
    },
    {
      id: 3,
      date: "2024-01-03",
      amount: "₹8,500",
      method: "PayPal",
      status: "processing",
      transactionId: "PP456789123",
    },
  ]

  const payoutMethods = [
    {
      id: 1,
      type: "Bank Transfer",
      details: "HDFC Bank - ****1234",
      isDefault: true,
      processingTime: "1-2 business days",
    },
    {
      id: 2,
      type: "UPI",
      details: "apoorv@paytm",
      isDefault: false,
      processingTime: "Instant",
    },
    {
      id: 3,
      type: "PayPal",
      details: "apoorv@email.com",
      isDefault: false,
      processingTime: "3-5 business days",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsOverview.totalEarnings}</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsOverview.thisMonth}</div>
            <div className="text-xs text-muted-foreground">Mentorship: ₹32,400 • Freelance: ₹12,830</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Withdrawable Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{earningsOverview.withdrawableBalance}</div>
            <div className="text-xs text-muted-foreground">Available for withdrawal</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{earningsOverview.pendingClearance}</div>
            <div className="text-xs text-muted-foreground">Clears in 2-3 days</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="methods">Payout Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="withdraw" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Withdrawal Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Available: {earningsOverview.withdrawableBalance}
                  </div>
                </div>

                <div>
                  <Label htmlFor="method">Payout Method</Label>
                  <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payout method" />
                    </SelectTrigger>
                    <SelectContent>
                      {payoutMethods.map((method) => (
                        <SelectItem key={method.id} value={method.type}>
                          {method.type} - {method.details}
                          {method.isDefault && " (Default)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-1">Processing Time</div>
                  <div className="text-sm text-blue-800">
                    {selectedMethod && payoutMethods.find((m) => m.type === selectedMethod)?.processingTime}
                  </div>
                </div>

                <Button className="w-full" disabled={!withdrawalAmount || !selectedMethod}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Withdraw ₹{withdrawalAmount || "0"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {monthlyBreakdown.map((month, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">{month.month}</div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Mentorship</div>
                          <div className="font-medium">{month.mentorship}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Freelance</div>
                          <div className="font-medium">{month.freelance}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Total</div>
                          <div className="font-medium text-green-600">{month.total}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {withdrawalHistory.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`p-6 ${index !== withdrawalHistory.length - 1 ? "border-b" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.status === "completed"
                              ? "bg-green-100"
                              : transaction.status === "processing"
                                ? "bg-yellow-100"
                                : "bg-red-100"
                          }`}
                        >
                          {transaction.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : transaction.status === "processing" ? (
                            <Clock className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.amount}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.method} • {transaction.date}
                          </div>
                          <div className="text-xs text-muted-foreground">ID: {transaction.transactionId}</div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "processing"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Payout Methods</h3>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Add New Method
            </Button>
          </div>

          <div className="grid gap-4">
            {payoutMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{method.type}</div>
                        <div className="text-sm text-muted-foreground">{method.details}</div>
                        <div className="text-xs text-muted-foreground">Processing: {method.processingTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && <Badge variant="default">Default</Badge>}
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
