"use client"

// This file handles speech recognition and voice analysis

// Check if the browser supports the Web Speech API
export const isSpeechRecognitionSupported = () => {
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window
}

// Create a speech recognition instance
export const createSpeechRecognition = () => {
  if (!isSpeechRecognitionSupported()) {
    throw new Error("Speech recognition is not supported in this browser")
  }

  // Use the appropriate constructor based on browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  return new SpeechRecognition()
}

// Voice analysis metrics
export interface VoiceAnalysisResult {
  pace: number // words per minute
  fillerWords: number // count of filler words
  clarity: number // percentage score
  confidence: number // percentage score
  volume: number // percentage score
}

// Analyze voice metrics from transcript
export const analyzeVoice = (transcript: string, durationSeconds: number): VoiceAnalysisResult => {
  // Count words
  const words = transcript.trim().split(/\s+/).length

  // Calculate speaking pace (words per minute)
  const pace = Math.round((words / durationSeconds) * 60)

  // Count filler words
  const fillerWordsRegex = /\b(um|uh|like|you know|so|actually|basically|literally|right|okay)\b/gi
  const fillerWordsMatches = transcript.match(fillerWordsRegex) || []
  const fillerWords = fillerWordsMatches.length

  // Calculate clarity score (inverse relationship with filler words percentage)
  const fillerWordsPercentage = (fillerWords / words) * 100
  const clarity = Math.max(0, Math.min(100, 100 - fillerWordsPercentage * 2))

  // Generate mock scores for metrics we can't directly measure
  const confidence = Math.round(Math.random() * 20) + 70 // 70-90 range
  const volume = Math.round(Math.random() * 20) + 75 // 75-95 range

  return {
    pace,
    fillerWords,
    clarity: Math.round(clarity),
    confidence,
    volume,
  }
}

// Format voice analysis results into feedback
export const generateVoiceFeedback = (analysis: VoiceAnalysisResult): string => {
  const feedbacks = []

  // Pace feedback
  if (analysis.pace < 120) {
    feedbacks.push("Your speaking pace is a bit slow. Aim for 120-160 words per minute for optimal engagement.")
  } else if (analysis.pace > 160) {
    feedbacks.push(
      "Your speaking pace is a bit fast. Consider slowing down to 120-160 words per minute for better clarity.",
    )
  } else {
    feedbacks.push("Your speaking pace is good, within the optimal range of 120-160 words per minute.")
  }

  // Filler words feedback
  if (analysis.fillerWords > 5) {
    feedbacks.push(
      `You used ${analysis.fillerWords} filler words (like "um", "uh", "like"). Try to replace these with pauses.`,
    )
  } else if (analysis.fillerWords > 0) {
    feedbacks.push(
      `You used ${analysis.fillerWords} filler words, which is relatively low. Continue working on eliminating these for even clearer communication.`,
    )
  } else {
    feedbacks.push("You did an excellent job avoiding filler words in your response.")
  }

  // Clarity feedback
  if (analysis.clarity < 70) {
    feedbacks.push("Your speech clarity could be improved. Focus on articulation and reducing filler words.")
  } else if (analysis.clarity < 85) {
    feedbacks.push("Your speech clarity is good. Continue practicing clear articulation for even better results.")
  } else {
    feedbacks.push("Your speech clarity is excellent, making your points easy to understand.")
  }

  return feedbacks.join(" ")
}
