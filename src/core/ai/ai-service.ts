import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildContext } from './context-builder'
import { PROMPTS, PROMPT_VERSION } from './prompt-registry'
import type { AIChatRequest, AIChatResponse, ChatMessage } from '@/types/core'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY no está configurada.')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

function toGeminiHistory(history: ChatMessage[]) {
  return history.map((msg) => ({
    role: msg.role === 'user' ? ('user' as const) : ('model' as const),
    parts: [{ text: msg.content }],
  }))
}

async function processChatGeneral(request: AIChatRequest): Promise<AIChatResponse> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: PROMPTS.general,
  })

  const chat = model.startChat({
    history: toGeminiHistory(request.history),
  })

  // navContext is sent as data so the model knows where in the app the user is.
  // This is not a prompt patch — it's structured navigation data injected per message.
  const messageWithNav = request.navContext
    ? `[Navegación actual: ${request.navContext}]\n\n${request.message}`
    : request.message

  const result = await chat.sendMessage(messageWithNav)

  return {
    content: result.response.text(),
    mode: 'explanation',
    conceptIds: [],
  }
}

async function processChatConcept(request: AIChatRequest): Promise<AIChatResponse> {
  const aiContext = await buildContext({
    conceptId: request.conceptId,
    moduleId: request.moduleId,
    userMessage: request.message,
    conversationHistory: request.history,
  })

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: PROMPTS.concept,
  })

  const chat = model.startChat({
    history: toGeminiHistory(request.history),
  })

  const userPrompt = aiContext.synthesizedContext
    ? `Contenido académico del concepto:\n\n${aiContext.synthesizedContext}\n\n---\n\nConsulta: ${request.message}`
    : request.message

  const result = await chat.sendMessage(userPrompt)

  return {
    content: result.response.text(),
    mode: 'explanation',
    conceptIds: aiContext.relevantConceptIds,
  }
}

export async function processChat(request: AIChatRequest): Promise<AIChatResponse> {
  if (request.chatMode === 'general') {
    return processChatGeneral(request)
  }
  return processChatConcept(request)
}

export { PROMPT_VERSION }
