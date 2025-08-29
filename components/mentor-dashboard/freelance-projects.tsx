"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Upload,
  Download,
  Calendar,
  DollarSign,
  Star,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react"

export function FreelanceProjects() {
  const [dragActive, setDragActive] = useState(false)

  const activeProjects = [
    {
      id: 1,
      title: "Product Roadmap for SaaS Startup",
      client: "TechFlow Inc.",
      deadline: "2024-01-20",
      progress: 75,
      totalAmount: "₹25,000",
      paidAmount: "₹15,000",
      status: "in-progress",
      milestones: [
        { name: "Research & Analysis", status: "completed", amount: "₹7,500" },
        { name: "Initial Roadmap Draft", status: "completed", amount: "₹7,500" },
        { name: "Stakeholder Review", status: "in-progress", amount: "₹5,000" },
        { name: "Final Delivery", status: "pending", amount: "₹5,000" },
      ],
    },
    {
      id: 2,
      title: "Resume Redesign Package",
      client: "Sarah Johnson",
      deadline: "2024-01-18",
      progress: 40,
      totalAmount: "₹8,000",
      paidAmount: "₹4,000",
      status: "in-progress",
      milestones: [
        { name: "Content Review", status: "completed", amount: "₹2,000" },
        { name: "Design & Layout", status: "completed", amount: "₹2,000" },
        { name: "Revisions", status: "in-progress", amount: "₹2,000" },
        { name: "Final Delivery", status: "pending", amount: "₹2,000" },
      ],
    },
  ]

  const deliveredProjects = [
    {
      id: 3,
      title: "Pitch Deck Creation",
      client: "StartupXYZ",
      completedDate: "2024-01-10",
      totalAmount: "₹15,000",
      rating: 5,
      feedback: "Outstanding work! The pitch deck helped us secure funding.",
      downloadLink: "#",
    },
    {
      id: 4,
      title: "Business Strategy Consultation",
      client: "GrowthCorp",
      completedDate: "2024-01-08",
      totalAmount: "₹20,000",
      rating: 4,
      feedback: "Great insights and actionable recommendations.",
      downloadLink: "#",
    },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file upload logic here
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="delivered">Delivered Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Projects</h3>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Create Proposal
            </Button>
          </div>

          <div className="grid gap-6">
            {activeProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {project.deadline}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {project.paidAmount} / {project.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={project.status === "in-progress" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Milestones</h4>
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {milestone.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : milestone.status === "in-progress" ? (
                            <Clock className="h-5 w-5 text-blue-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-400" />
                          )}
                          <span className="font-medium">{milestone.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{milestone.amount}</span>
                          <Badge
                            variant={
                              milestone.status === "completed"
                                ? "default"
                                : milestone.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Upload Files</h4>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to select</p>
                      <Input type="file" className="hidden" id={`file-${project.id}`} multiple />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor={`file-${project.id}`} className="cursor-pointer">
                          Choose Files
                        </label>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Delivered Projects</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid gap-4">
            {deliveredProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{project.client.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{project.title}</div>
                        <div className="text-sm text-muted-foreground">{project.client}</div>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Completed: {project.completedDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium text-green-600">{project.totalAmount}</span>
                          </div>
                        </div>

                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= project.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{project.rating}/5</span>
                          </div>
                          <div className="text-sm text-gray-700">{project.feedback}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download Files
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
