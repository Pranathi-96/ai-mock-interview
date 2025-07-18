"use server"

interface AnswerData {
  questionNumber: number
  question: string
  answer: string
  feedback?: string
  voiceFeedback?: string
}

export async function recordAnswer(data: AnswerData) {
  // In a real application, this would save to a database
  console.log("Recording answer:", data)

  // If no feedback was provided, generate mock feedback
  if (!data.feedback) {
    const feedbackOptions = [
      "Your answer demonstrates good technical knowledge. Consider providing more specific examples to strengthen your response.",
      "You explained the concept well. To improve, try to be more concise and focus on the most relevant aspects.",
      "Good response overall. Try to structure your answer with a clear beginning, middle, and conclusion for better clarity.",
      "Your answer shows strong problem-solving skills. Consider mentioning how your approach might adapt to different scenarios.",
      "You provided a comprehensive answer. To make it even better, quantify your achievements when discussing past experiences.",
    ]

    data.feedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
  }

  // Simulate a database operation
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    data,
  }
}

export async function getInterviewQuestions(type: string, difficulty: string, count = 5) {
  // Mock questions instead of calling OpenAI
  const mockQuestions = {
    technical: {
      easy: [
        "What is the difference between let, const, and var in JavaScript?",
        "Explain the box model in CSS.",
        "What is the purpose of semantic HTML?",
        "Describe the difference between synchronous and asynchronous code.",
        "What is responsive design?",
      ],
      medium: [
        "Explain how React's virtual DOM works.",
        "What are closures in JavaScript and how would you use them?",
        "Describe the principles of RESTful API design.",
        "What are the different ways to manage state in React applications?",
        "Explain the concept of CSS Grid and how it differs from Flexbox.",
      ],
      hard: [
        "Explain how you would implement a complex state management system for a large application.",
        "Describe your approach to optimizing the performance of a web application.",
        "How would you design a scalable microservices architecture?",
        "Explain how you would implement authentication and authorization in a distributed system.",
        "Describe advanced techniques for handling concurrency in JavaScript.",
      ],
    },
    behavioral: {
      easy: [
        "Tell me about yourself.",
        "What are your strengths and weaknesses?",
        "Why are you interested in this position?",
        "How do you handle stress and pressure?",
        "Describe your ideal work environment.",
      ],
      medium: [
        "Tell me about a time when you had to work under a tight deadline.",
        "Describe a situation where you had to resolve a conflict within your team.",
        "How do you prioritize tasks when you have multiple deadlines?",
        "Tell me about a time when you failed and what you learned from it.",
        "How do you handle criticism of your work?",
      ],
      hard: [
        "Describe a situation where you had to make a difficult decision with limited information.",
        "Tell me about a time when you had to lead a team through a challenging project.",
        "How have you handled disagreements with your manager?",
        "Describe a situation where you had to adapt to a significant change at work.",
        "Tell me about a time when you had to deliver bad news to a client or stakeholder.",
      ],
    },
    hr: {
      easy: [
        "Why do you want to work for our company?",
        "Where do you see yourself in 5 years?",
        "What are your salary expectations?",
        "How did you hear about this position?",
        "What do you know about our company?",
      ],
      medium: [
        "Why should we hire you?",
        "What challenges are you looking for in this position?",
        "How would your colleagues describe your work style?",
        "What are you looking for in your next role?",
        "How do you stay updated with industry trends?",
      ],
      hard: [
        "What aspects of our company culture appeal to you?",
        "How do you align with our company's mission and values?",
        "What questions do you have about our company's strategic direction?",
        "How would you contribute to our company's diversity and inclusion initiatives?",
        "What do you think sets our company apart from our competitors?",
      ],
    },
  }

  // Get questions based on type and difficulty
  const typeQuestions = mockQuestions[type as keyof typeof mockQuestions] || mockQuestions.technical
  const difficultyQuestions = typeQuestions[difficulty as keyof typeof typeQuestions] || typeQuestions.medium

  return difficultyQuestions
}

export async function analyzeInterviewPerformance(answers: AnswerData[]) {
  // In a real application, this would analyze the answers and provide insights
  // For now, we'll return mock data

  // Calculate average scores based on the number of answers
  const overallScore = Math.floor(Math.random() * 15) + 65 // 65-80 range
  const technicalScore = Math.floor(Math.random() * 20) + 70 // 70-90 range
  const communicationScore = Math.floor(Math.random() * 20) + 65 // 65-85 range
  const confidenceScore = Math.floor(Math.random() * 25) + 60 // 60-85 range
  const bodyLanguageScore = Math.floor(Math.random() * 20) + 65 // 65-85 range

  // Generate strengths and improvements
  const strengths = [
    "Strong technical knowledge demonstration",
    "Clear articulation of complex concepts",
    "Good problem-solving approach explanation",
    "Positive and enthusiastic demeanor",
    "Thoughtful responses to follow-up questions",
  ]

  const improvements = [
    "Work on maintaining consistent eye contact during responses",
    "Reduce filler words like 'um' and 'you know'",
    "Provide more concrete examples in technical explanations",
    "Structure longer responses with clearer beginning, middle, and end",
    "Practice more concise answers to common questions",
  ]

  return {
    scores: {
      overall: overallScore,
      technical: technicalScore,
      communication: communicationScore,
      confidence: confidenceScore,
      bodyLanguage: bodyLanguageScore,
    },
    strengths,
    improvements,
    answers: answers.map((answer) => ({
      ...answer,
      score: Math.floor(Math.random() * 20) + 70, // 70-90 range
    })),
  }
}
