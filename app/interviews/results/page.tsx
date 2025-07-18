"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2, BarChart3, MessageSquare, Video, Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import PerformanceChart from "@/components/performance-chart"

export default function InterviewResults() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the interview results
  const mockResults = {
    overallScore: 78,
    technicalScore: 82,
    communicationScore: 75,
    confidenceScore: 68,
    bodyLanguageScore: 72,
    questions: [
      {
        question: "Can you explain how React's virtual DOM works and why it's beneficial?",
        answer:
          "React's virtual DOM is an in-memory representation of the real DOM. When state changes in a React component, React creates a new virtual DOM tree and compares it with the previous one through a process called 'diffing'. It then updates only the parts of the real DOM that have changed, rather than re-rendering the entire DOM tree. This approach is beneficial because DOM operations are expensive, and minimizing them improves performance significantly.",
        feedback:
          "Strong technical explanation that covers the key concepts accurately. You clearly understand how the virtual DOM works and its performance benefits. Consider adding a brief real-world example to make your explanation more concrete.",
        score: 85,
      },
      {
        question: "Describe a challenging project you worked on and how you overcame obstacles.",
        answer:
          "I led a team that had to migrate a legacy system to a modern architecture with a tight deadline. We faced challenges with data migration and maintaining service continuity. I broke down the project into smaller milestones, implemented a phased migration approach, and set up comprehensive testing. We completed the migration on time with minimal disruption.",
        feedback:
          "Good use of the STAR method to structure your response. You clearly outlined the challenge and your approach. To strengthen this answer, provide more specific details about your personal contributions and quantify the impact of your solution.",
        score: 78,
      },
      {
        question: "How would you design a scalable API for a social media platform?",
        answer:
          "I would use a microservices architecture to ensure scalability and maintainability. Key components would include authentication services, content management, user management, and analytics. I'd implement RESTful principles, use caching strategies like Redis, and ensure proper database indexing. For high traffic, I'd consider message queues like Kafka for asynchronous processing.",
        feedback:
          "Your answer demonstrates strong system design knowledge. You covered important architectural considerations and specific technologies. To improve, discuss how you would handle specific challenges like real-time features or content delivery optimization.",
        score: 80,
      },
    ],
    improvements: [
      "Work on maintaining consistent eye contact during responses",
      "Reduce filler words like 'um' and 'you know'",
      "Provide more concrete examples in technical explanations",
      "Structure longer responses with clearer beginning, middle, and end",
      "Practice more concise answers to common questions",
    ],
    strengths: [
      "Strong technical knowledge demonstration",
      "Clear articulation of complex concepts",
      "Good problem-solving approach explanation",
      "Positive and enthusiastic demeanor",
      "Thoughtful responses to follow-up questions",
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Interview Results</h1>
          <p className="text-gray-500">Technical Interview • April 16, 2025</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{mockResults.overallScore}%</div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Technical Knowledge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{mockResults.technicalScore}%</div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{mockResults.communicationScore}%</div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Body Language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{mockResults.bodyLanguageScore}%</div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Video className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Your overall interview performance</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <PerformanceChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Strengths</CardTitle>
                <CardDescription>Areas where you performed well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockResults.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Focus on these areas for better results</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockResults.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-orange-500" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve your interview skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Technical Knowledge</h3>
                  <p className="text-gray-700">
                    Your technical explanations are strong, but could benefit from more concrete examples. Try
                    practicing the STAR method (Situation, Task, Action, Result) for technical scenarios to make your
                    answers more impactful. Consider preparing 5-7 detailed technical stories that showcase different
                    skills.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Communication Style</h3>
                  <p className="text-gray-700">
                    Your communication is clear, but you tend to use filler words when discussing complex topics.
                    Practice pausing instead of using fillers like "um" or "you know." Record yourself answering
                    questions and review to identify patterns. Focus on maintaining a consistent pace throughout your
                    responses.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Body Language</h3>
                  <p className="text-gray-700">
                    Your body language is generally positive, but eye contact could be improved. Practice maintaining
                    natural eye contact during video calls. Be mindful of your posture - you tend to lean back when
                    thinking, which can appear disengaged. Try to maintain an alert, slightly forward posture throughout
                    the interview.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/training" className="w-full">
                <Button className="w-full">View Personalized Training Plan</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4">
          {mockResults.questions.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Question {index + 1}</CardTitle>
                    <CardDescription>Technical knowledge assessment</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Score: {item.score}%</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Question:</h3>
                  <p className="text-gray-800">{item.question}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Your Answer:</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Feedback:</h3>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-gray-800">{item.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center">
            <Link href="/interviews/new">
              <Button className="bg-blue-600 hover:bg-blue-700">Practice Again</Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voice Analysis</CardTitle>
              <CardDescription>Insights from your speech patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Speaking Pace</span>
                  <span className="text-sm text-gray-500">145 words/min</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-gray-500">
                  Your speaking pace is good. The ideal range is 120-160 words per minute.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Vocal Variety</span>
                  <span className="text-sm text-gray-500">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-gray-500">
                  Your tone could use more variation to keep the listener engaged.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Filler Words</span>
                  <span className="text-sm text-gray-500">12 instances</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-gray-500">
                  You used "um" and "like" frequently. Try to replace these with pauses.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Clarity</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-gray-500">Your pronunciation and articulation are very clear.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facial Expression Analysis</CardTitle>
              <CardDescription>Insights from your visual presentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Eye Contact</span>
                  <span className="text-sm text-gray-500">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-gray-500">You looked away from the camera frequently when thinking.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Facial Expressions</span>
                  <span className="text-sm text-gray-500">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-gray-500">Your expressions were generally positive and engaged.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Posture</span>
                  <span className="text-sm text-gray-500">72%</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-gray-500">
                  Your posture was good but you tended to lean back when thinking.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Gestures</span>
                  <span className="text-sm text-gray-500">70%</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-gray-500">Your hand gestures were natural but limited in variety.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
              <CardDescription>Evaluation of your answer content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Relevance</span>
                  <span className="text-sm text-gray-500">88%</span>
                </div>
                <Progress value={88} className="h-2" />
                <p className="text-xs text-gray-500">Your answers were highly relevant to the questions asked.</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Structure</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-gray-500">
                  Your answers had good structure but sometimes lacked clear conclusions.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Examples</span>
                  <span className="text-sm text-gray-500">70%</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-gray-500">
                  You provided good examples but could include more specific details.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Technical Accuracy</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-gray-500">Your technical explanations were accurate and well-articulated.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
