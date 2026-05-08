import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildContext } from './context-builder'
import { PROMPTS, PROMPT_VERSION } from './prompt-registry'
import type { AIChatRequest, AIChatResponse, AIMode, ChatMessage } from '@/types/core'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY no está configurada.')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

function buildUserPrompt(message: string, context: string): string {
  if (!context) return message

  return `Contexto académico del concepto que el estudiante está estudiando:\n\n${context}\n\n---\n\nConsulta del estudiante: ${message}`
}

function toGeminiHistory(history: ChatMessage[]) {
  return history.map((msg) => ({
    role: msg.role === 'user' ? ('user' as const) : ('model' as const),
    parts: [{ text: msg.content }],
  }))
}

export async function processChat(request: AIChatRequest): Promise<AIChatResponse> {
  const { message, conceptId, moduleId, history } = request

  const aiContext = await buildContext({
    conceptId,
    moduleId,
    userMessage: message,
    conversationHistory: history,
  })

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: PROMPTS.systemInstruction,
  })

  const chat = model.startChat({
    history: toGeminiHistory(history),
  })

  const userPrompt = buildUserPrompt(message, aiContext.synthesizedContext ?? '')
  const result = await chat.sendMessage(userPrompt)
  const responseText = result.response.text()

  const mode: AIMode = 'explanation'

  return {
    content: responseText,
    mode,
    conceptIds: aiContext.relevantConceptIds,
  }
}

export { PROMPT_VERSION }
