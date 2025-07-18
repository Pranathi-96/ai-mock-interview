import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, BarChart3, Calendar, Clock, Code, Users } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import ProgressChart from "@/components/progress-chart"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-gray-500">Track your interview practice and progress.</p>
            </div>
            <Link href="/interviews/new">
              <Button className="bg-blue-600 hover:bg-blue-700">New Interview</Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-gray-500">+5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5h</div>
                <p className="text-xs text-gray-500">+2h from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                <Code className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Technical</div>
                <p className="text-xs text-gray-500">5 interviews</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Your interview performance scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Areas of strength and improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Technical Knowledge</div>
                      <div className="text-sm text-gray-500">85%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[85%] rounded-full bg-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Communication</div>
                      <div className="text-sm text-gray-500">72%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[72%] rounded-full bg-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Problem Solving</div>
                      <div className="text-sm text-gray-500">78%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[78%] rounded-full bg-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Confidence</div>
                      <div className="text-sm text-gray-500">65%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[65%] rounded-full bg-blue-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="recent">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="recent">Recent Interviews</TabsTrigger>
                <TabsTrigger value="recommended">Recommended Practice</TabsTrigger>
              </TabsList>
              <Link href="/interviews" className="text-sm text-blue-600 hover:underline flex items-center">
                View all
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <TabsContent value="recent" className="mt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Code className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">Technical Interview</CardTitle>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">82%</div>
                    </div>
                    <CardDescription>React.js Frontend Developer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      <p>Completed on April 14, 2025</p>
                      <p>Duration: 45 minutes</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/1" className="w-full">
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">Behavioral Interview</CardTitle>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">75%</div>
                    </div>
                    <CardDescription>Leadership & Teamwork</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      <p>Completed on April 10, 2025</p>
                      <p>Duration: 30 minutes</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/2" className="w-full">
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">HR Interview</CardTitle>
                      </div>
                      <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">68%</div>
                    </div>
                    <CardDescription>Career Goals & Motivation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      <p>Completed on April 5, 2025</p>
                      <p>Duration: 25 minutes</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/3" className="w-full">
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="recommended" className="mt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">System Design Interview</CardTitle>
                    </div>
                    <CardDescription>Recommended based on your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Practice designing scalable systems and architecture for senior roles.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/new?type=system-design" className="w-full">
                      <Button className="w-full">Start Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">Conflict Resolution</CardTitle>
                    </div>
                    <CardDescription>Improvement area identified</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Practice answering questions about handling workplace conflicts effectively.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/new?type=behavioral&focus=conflict" className="w-full">
                      <Button className="w-full">Start Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">Algorithm Deep Dive</CardTitle>
                    </div>
                    <CardDescription>Strengthen your technical skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Focus on advanced algorithms and data structures for technical interviews.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/interviews/new?type=technical&focus=algorithms" className="w-full">
                      <Button className="w-full">Start Practice</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
