"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Code, Briefcase, Users, Brain, Mic, Video, Clock } from "lucide-react"
import Link from "next/link"

export default function NewInterview() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "technical"
  const defaultFocus = searchParams.get("focus") || ""

  const [interviewType, setInterviewType] = useState(defaultType)
  const [duration, setDuration] = useState("30")
  const [difficulty, setDifficulty] = useState("medium")
  const [enableVoice, setEnableVoice] = useState(true)
  const [enableVideo, setEnableVideo] = useState(true)
  const [jobRole, setJobRole] = useState("")
  const [questionCount, setQuestionCount] = useState(10)
  const [loading, setLoading] = useState(false)

  const handleStartInterview = () => {
    setLoading(true)
    // In a real app, we would save the interview configuration
    setTimeout(() => {
      router.push(
        `/interviews/session?type=${interviewType}&duration=${duration}&difficulty=${difficulty}&jobRole=${jobRole}`,
      )
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Interview Session</h1>
        <p className="text-gray-500">Configure your practice interview session</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Type</CardTitle>
              <CardDescription>Select the type of interview you want to practice</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={interviewType} onValueChange={setInterviewType} className="grid gap-4 md:grid-cols-3">
                <div>
                  <RadioGroupItem value="technical" id="technical" className="peer sr-only" />
                  <Label
                    htmlFor="technical"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                  >
                    <Code className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Technical</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="behavioral" id="behavioral" className="peer sr-only" />
                  <Label
                    htmlFor="behavioral"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                  >
                    <Briefcase className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Behavioral</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="hr" id="hr" className="peer sr-only" />
                  <Label
                    htmlFor="hr"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                  >
                    <Users className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">HR</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Role</CardTitle>
              <CardDescription>Select the job role you're preparing for</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                  <SelectItem value="mobile">Mobile Developer</SelectItem>
                  <SelectItem value="devops">DevOps Engineer</SelectItem>
                  <SelectItem value="data">Data Scientist</SelectItem>
                  <SelectItem value="ml">Machine Learning Engineer</SelectItem>
                  <SelectItem value="pm">Product Manager</SelectItem>
                  <SelectItem value="designer">UX/UI Designer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interview Settings</CardTitle>
              <CardDescription>Configure your interview parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Duration</Label>
                <RadioGroup value={duration} onValueChange={setDuration} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="15min" />
                    <Label htmlFor="15min">15 min</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="30min" />
                    <Label htmlFor="30min">30 min</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="45" id="45min" />
                    <Label htmlFor="45min">45 min</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="60" id="60min" />
                    <Label htmlFor="60min">60 min</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easy" />
                    <Label htmlFor="easy">Easy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hard" />
                    <Label htmlFor="hard">Hard</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Number of Questions ({questionCount})</Label>
                <Slider
                  value={[questionCount]}
                  min={5}
                  max={20}
                  step={1}
                  onValueChange={(value) => setQuestionCount(value[0])}
                  className="py-4"
                />
                <p className="text-xs text-gray-500">
                  Select how many questions you want in your interview session. More questions provide a more
                  comprehensive practice experience.
                </p>
              </div>

              <div className="space-y-4">
                <Label>Analysis Features</Label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="voice"
                      checked={enableVoice}
                      onCheckedChange={(checked) => setEnableVoice(checked as boolean)}
                    />
                    <Label htmlFor="voice" className="flex items-center">
                      <Mic className="mr-2 h-4 w-4" />
                      Voice Analysis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="video"
                      checked={enableVideo}
                      onCheckedChange={(checked) => setEnableVideo(checked as boolean)}
                    />
                    <Label htmlFor="video" className="flex items-center">
                      <Video className="mr-2 h-4 w-4" />
                      Facial Expression Analysis
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
              <CardDescription>Your configured interview session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                {interviewType === "technical" && <Code className="mr-2 h-5 w-5 text-blue-600" />}
                {interviewType === "behavioral" && <Briefcase className="mr-2 h-5 w-5 text-blue-600" />}
                {interviewType === "hr" && <Users className="mr-2 h-5 w-5 text-blue-600" />}
                <span className="font-medium capitalize">{interviewType} Interview</span>
              </div>

              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <span>{duration} minutes</span>
              </div>

              <div className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-gray-500" />
                <span className="capitalize">{difficulty} difficulty</span>
              </div>

              <div className="flex items-center">
                <Code className="mr-2 h-5 w-5 text-gray-500" />
                <span>{questionCount} questions</span>
              </div>

              {jobRole && (
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                  <span>
                    {jobRole === "frontend" && "Frontend Developer"}
                    {jobRole === "backend" && "Backend Developer"}
                    {jobRole === "fullstack" && "Full Stack Developer"}
                    {jobRole === "mobile" && "Mobile Developer"}
                    {jobRole === "devops" && "DevOps Engineer"}
                    {jobRole === "data" && "Data Scientist"}
                    {jobRole === "ml" && "Machine Learning Engineer"}
                    {jobRole === "pm" && "Product Manager"}
                    {jobRole === "designer" && "UX/UI Designer"}
                    {jobRole === "other" && "Other Role"}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {enableVoice && (
                  <div className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 flex items-center">
                    <Mic className="mr-1 h-3 w-3" />
                    Voice Analysis
                  </div>
                )}
                {enableVideo && (
                  <div className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 flex items-center">
                    <Video className="mr-1 h-3 w-3" />
                    Facial Analysis
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleStartInterview}
                disabled={loading || !jobRole}
              >
                {loading ? "Preparing Interview..." : "Start Interview"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
