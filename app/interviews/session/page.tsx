"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Mic, Video, Send, Loader2, XCircle, AlertCircle } from "lucide-react"
import { recordAnswer } from "@/lib/interview-actions"
import VideoFeedback from "@/components/video-feedback"
import { generateQuestion, generateFeedback } from "@/lib/chat-service"
import {
  isSpeechRecognitionSupported,
  createSpeechRecognition,
  analyzeVoice,
  generateVoiceFeedback,
  type VoiceAnalysisResult,
} from "@/lib/speech-service"

export default function InterviewSession() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const interviewType = searchParams.get("type") || "technical"
  const duration = Number.parseInt(searchParams.get("duration") || "30")
  const difficulty = searchParams.get("difficulty") || "medium"
  const jobRole = searchParams.get("jobRole") || "frontend"

  const [currentQuestion, setCurrentQuestion] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isThinking, setIsThinking] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [answers, setAnswers] = useState<
    Array<{ question: string; answer: string; feedback: string; voiceFeedback?: string }>
  >([])
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([])
  const [maxQuestions, setMaxQuestions] = useState(10)
  const [error, setError] = useState<string | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysisResult | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const speechRecognitionRef = useRef<any>(null)
  const recordingStartTimeRef = useRef<number>(0)

  // Check if speech recognition is supported
  useEffect(() => {
    setSpeechSupported(isSpeechRecognitionSupported())
  }, [])

  // Initialize interview with first question
  useEffect(() => {
    const getFirstQuestion = async () => {
      try {
        setError(null)
        // Get a specialty based on the job role
        let specialty = "frontend"
        if (jobRole === "backend" || jobRole === "fullstack") {
          specialty = jobRole
        } else if (jobRole === "pm" || jobRole === "designer") {
          specialty = "leadership"
        }

        const question = await generateQuestion(interviewType, specialty, difficulty)
        setCurrentQuestion(question)
        setPreviousQuestions([question])
        setIsLoading(false)
      } catch (error) {
        console.error("Error generating question:", error)
        setCurrentQuestion("Tell me about your background and experience in this field.")
        setError("Failed to load question. Using default question instead.")
        setIsLoading(false)
      }
    }

    getFirstQuestion()

    // Initialize timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setInterviewComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Initialize camera if enabled
    if (videoEnabled) {
      initializeCamera()
    }

    return () => {
      clearInterval(timer)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop()
      }
    }
  }, [interviewType, difficulty, duration, videoEnabled, jobRole])

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setVideoEnabled(false)
      setError("Could not access camera or microphone. Please check your permissions.")
    }
  }

  const handleStartRecording = () => {
    if (!streamRef.current) {
      setError("No audio stream available. Please ensure your microphone is connected.")
      return
    }

    try {
      // Start media recording for audio
      const mediaRecorder = new MediaRecorder(streamRef.current)
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()

      // Start speech recognition if supported
      if (speechSupported) {
        try {
          const recognition = createSpeechRecognition()
          speechRecognitionRef.current = recognition

          recognition.continuous = true
          recognition.interimResults = true
          recognition.lang = "en-US"

          recognition.onstart = () => {
            setIsListening(true)
            recordingStartTimeRef.current = Date.now()
          }

          recognition.onresult = (event: any) => {
            let interimTranscript = ""
            let finalTranscript = ""

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript
              } else {
                interimTranscript += event.results[i][0].transcript
              }
            }

            // Update the text area with the transcription
            setUserAnswer(finalTranscript + interimTranscript)
          }

          recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error)
            setError(`Speech recognition error: ${event.error}`)
            setIsListening(false)
          }

          recognition.onend = () => {
            setIsListening(false)
          }

          recognition.start()
        } catch (error) {
          console.error("Error starting speech recognition:", error)
          setError("Failed to start speech recognition. Please try again.")
        }
      }

      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
      setError("Failed to start recording. Please check your microphone permissions.")
    }
  }

  const handleStopRecording = () => {
    // Stop media recorder
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }

    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop()
    }

    // Calculate recording duration and analyze voice
    if (recordingStartTimeRef.current > 0) {
      const recordingDurationSeconds = (Date.now() - recordingStartTimeRef.current) / 1000
      const analysis = analyzeVoice(userAnswer, recordingDurationSeconds)
      setVoiceAnalysis(analysis)
    }

    setIsRecording(false)
    setIsListening(false)
  }

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return

    setIsThinking(true)
    setError(null)

    try {
      // Stop recording if active
      if (isRecording || isListening) {
        handleStopRecording()
      }

      // Generate feedback for the answer
      const feedbackText = await generateFeedback(currentQuestion, userAnswer)

      // Generate voice feedback if we have voice analysis
      let voiceFeedbackText = ""
      if (voiceAnalysis) {
        voiceFeedbackText = generateVoiceFeedback(voiceAnalysis)
      }

      // Save the answer and feedback
      const newAnswer = {
        question: currentQuestion,
        answer: userAnswer,
        feedback: feedbackText,
        voiceFeedback: voiceFeedbackText,
      }

      setAnswers((prev) => [...prev, newAnswer])

      // Record the answer in the database (simulated)
      await recordAnswer({
        questionNumber,
        question: currentQuestion,
        answer: userAnswer,
        feedback: feedbackText,
        voiceFeedback: voiceFeedbackText,
      })

      // Check if we should end the interview
      if (questionNumber >= maxQuestions || timeRemaining < 60) {
        setInterviewComplete(true)
        setIsThinking(false)
        return
      }

      // Get a specialty based on the job role
      let specialty = "frontend"
      if (jobRole === "backend" || jobRole === "fullstack") {
        specialty = jobRole
      } else if (jobRole === "pm" || jobRole === "designer") {
        specialty = "leadership"
      }

      // Generate next question
      const nextQuestion = await generateQuestion(interviewType, specialty, difficulty, previousQuestions)

      setCurrentQuestion(nextQuestion)
      setPreviousQuestions((prev) => [...prev, nextQuestion])
      setUserAnswer("")
      setQuestionNumber((prev) => prev + 1)
      setVoiceAnalysis(null)
      setIsThinking(false)
    } catch (error) {
      console.error("Error processing answer:", error)
      setError("Failed to process your answer. Please try again.")
      setIsThinking(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleFinishInterview = () => {
    router.push("/interviews/results")
  }

  if (interviewComplete) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Interview Complete!</h1>
            <p className="text-gray-500">
              You've completed your practice interview session. Let's review your performance.
            </p>
            <Button onClick={handleFinishInterview} className="bg-blue-600 hover:bg-blue-700">
              View Results
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium text-gray-500">
                  Question {questionNumber} of {maxQuestions}
                </div>
                <div className="text-sm font-medium text-gray-500">Time remaining: {formatTime(timeRemaining)}</div>
              </div>

              <Progress value={(timeRemaining / (duration * 60)) * 100} className="mb-6" />

              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Interviewer:</h2>
                  <p className="text-gray-800">{currentQuestion}</p>
                  {error && (
                    <div className="mt-2 flex items-center text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {error}
                    </div>
                  )}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">Your Answer:</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={isRecording || isListening ? "text-red-600 border-red-600" : ""}
                      onClick={isRecording || isListening ? handleStopRecording : handleStartRecording}
                      disabled={!speechSupported && !streamRef.current}
                    >
                      <Mic className="h-4 w-4 mr-1" />
                      {isRecording || isListening ? "Stop Recording" : "Record Answer"}
                    </Button>
                  </div>
                </div>

                {!speechSupported && (
                  <div className="mb-2 text-amber-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Speech recognition is not supported in this browser. You can still type your answer.
                  </div>
                )}

                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={isListening ? "Speak now... (transcribing)" : "Type your answer here..."}
                  className="min-h-[200px] mb-4"
                />

                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={isThinking || !userAnswer.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isThinking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Answer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {answers.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Previous Questions & Feedback</h2>
                <div className="space-y-6">
                  {answers.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium mb-1">Question {index + 1}:</h3>
                      <p className="text-gray-800 mb-2">{item.question}</p>
                      <h3 className="font-medium mb-1">Your Answer:</h3>
                      <p className="text-gray-600 mb-2">{item.answer}</p>
                      <h3 className="font-medium mb-1">Content Feedback:</h3>
                      <p className="text-gray-800 bg-blue-50 p-3 rounded mb-2">{item.feedback}</p>
                      {item.voiceFeedback && (
                        <>
                          <h3 className="font-medium mb-1">Voice Feedback:</h3>
                          <p className="text-gray-800 bg-purple-50 p-3 rounded">{item.voiceFeedback}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {videoEnabled ? (
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Video Feed</h3>
                  <Button variant="ghost" size="sm" onClick={() => setVideoEnabled(false)} className="h-8 w-8 p-0">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative aspect-video bg-gray-100 rounded overflow-hidden mb-2">
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                </div>
                <VideoFeedback isRecording={isRecording} isListening={isListening} voiceAnalysis={voiceAnalysis} />
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-6">
              <CardContent className="p-4 text-center">
                <Video className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500 mb-4">Video analysis is disabled</p>
                <Button variant="outline" size="sm" onClick={() => setVideoEnabled(true)} className="w-full">
                  Enable Video
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
