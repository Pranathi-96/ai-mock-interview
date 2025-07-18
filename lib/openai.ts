export const generateText = async (prompt: string) => {
  // Mock implementation for generateText
  console.log("Generating text for prompt:", prompt)
  await new Promise((resolve) => setTimeout(resolve, 500))
  return `Mock response for prompt: ${prompt}`
}

export const openai = {
  configuration: {},
  // Add any other necessary properties or methods here
}
