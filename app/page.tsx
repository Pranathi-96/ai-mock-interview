import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Briefcase, Code, Users, BarChart, Brain } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6" />
            <span>InterviewAI</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/interviews" className="text-sm font-medium hover:underline">
              My Interviews
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:underline">
              Profile
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Master Your Interviews with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Practice with realistic AI-powered interviews, get instant feedback, and improve your skills.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/interviews/new">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Practice Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">AI-Powered</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Realistic Interview Simulations</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform uses advanced AI to create realistic interview scenarios that adapt to your responses,
                  just like a real interview. Practice technical and behavioral questions with our intelligent system.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[300px] w-[300px] rounded-full bg-blue-100 flex items-center justify-center">
                  <Code className="h-24 w-24 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Interview Types</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Practice different types of interviews to prepare for any job opportunity.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-3">
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <Code className="h-12 w-12 text-blue-600" />
                    <CardTitle className="text-xl">Technical Interview</CardTitle>
                    <CardDescription>Practice coding problems, system design, and technical concepts.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-gray-500">
                      Covers algorithms, data structures, language-specific questions, and more.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/new?type=technical">
                      <Button>Start Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <Briefcase className="h-12 w-12 text-blue-600" />
                    <CardTitle className="text-xl">Behavioral Interview</CardTitle>
                    <CardDescription>Master common behavioral and situational questions.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-gray-500">
                      Practice STAR method responses and showcase your soft skills effectively.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/new?type=behavioral">
                      <Button>Start Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-blue-600" />
                    <CardTitle className="text-xl">HR Interview</CardTitle>
                    <CardDescription>Prepare for questions about your background and career goals.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-gray-500">
                      Cover common HR questions about your resume, salary expectations, and company fit.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/new?type=hr">
                      <Button>Start Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex justify-center lg:order-last">
                <div className="relative h-[300px] w-[300px] rounded-full bg-blue-100 flex items-center justify-center">
                  <BarChart className="h-24 w-24 text-blue-600" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  Comprehensive Analysis
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Detailed Feedback & Improvement</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Receive instant feedback on your performance, including voice analysis, facial expressions, and
                  content evaluation. Track your progress over time and focus on areas that need improvement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-center gap-2 font-bold">
              <Brain className="h-5 w-5" />
              <span>InterviewAI</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 InterviewAI. All rights reserved.</p>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
