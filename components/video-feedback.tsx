"use client"

import { useState, useEffect } from "react"
import { Mic, Video, AlertTriangle, Volume2 } from "lucide-react"
import type { VoiceAnalysisResult } from "@/lib/speech-service"

interface VideoFeedbackProps {
  isRecording: boolean
  voiceAnalysis?: VoiceAnalysisResult | null
  isListening?: boolean
}

export default function VideoFeedback({ isRecording, voiceAnalysis, isListening = false }: VideoFeedbackProps) {
  const [feedbackItems, setFeedbackItems] = useState<Array<{ type: string; message: string }>>([])

  useEffect(() => {
    if (isRecording) {
      // Simulate real-time feedback during recording
      const feedbackInterval = setInterval(() => {
        const feedbackTypes = [
          { type: "positive", message: "Good eye contact maintained" },
          { type: "neutral", message: "Speaking at a good pace" },
          { type: "warning", message: "Try to reduce filler words" },
          { type: "positive", message: "Good posture detected" },
          { type: "warning", message: "Consider more hand gestures" },
          { type: "neutral", message: "Voice volume is appropriate" },
          { type: "warning", message: "Looking away from camera" },
          { type: "positive", message: "Clear articulation detected" },
        ]

        const randomFeedback = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)]

        setFeedbackItems((prev) => {
          const newItems = [...prev, randomFeedback]
          // Keep only the last 3 items
          return newItems.slice(-3)
        })
      }, 5000)

      return () => clearInterval(feedbackInterval)
    }
  }, [isRecording])

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Real-time Feedback</h3>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center ${isListening ? "text-green-500" : isRecording ? "text-red-500" : "text-gray-400"}`}
          >
            <Mic className="h-3 w-3 mr-1" />
            <span className="text-xs">{isListening ? "Listening" : isRecording ? "Recording" : "Idle"}</span>
          </div>
          <div className="flex items-center text-green-500">
            <Video className="h-3 w-3 mr-1" />
            <span className="text-xs">Active</span>
          </div>
        </div>
      </div>

      {voiceAnalysis && (
        <div className="mb-3 p-2 rounded bg-blue-50 text-blue-800 text-xs">
          <div className="flex items-center mb-1">
            <Volume2 className="h-3 w-3 mr-1" />
            <span className="font-medium">Voice Analysis:</span>
          </div>
          <div className="pl-4 space-y-1">
            <div>Pace: {voiceAnalysis.pace} words/min</div>
            <div>Filler Words: {voiceAnalysis.fillerWords} detected</div>
            <div>Clarity: {voiceAnalysis.clarity}%</div>
          </div>
        </div>
      )}

      <div className="space-y-2 text-xs">
        {isRecording || isListening ? (
          feedbackItems.length > 0 ? (
            feedbackItems.map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded flex items-start ${
                  item.type === "positive"
                    ? "bg-green-50 text-green-700"
                    : item.type === "warning"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-gray-50 text-gray-700"
                }`}
              >
                {item.type === "warning" && <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />}
                <span>{item.message}</span>
              </div>
            ))
          ) : (
            <div className="p-2 rounded bg-gray-50 text-gray-500">Analyzing your performance...</div>
          )
        ) : (
          <div className="p-2 rounded bg-gray-50 text-gray-500">Start recording to receive real-time feedback</div>
        )}
      </div>
    </div>
  )
}
