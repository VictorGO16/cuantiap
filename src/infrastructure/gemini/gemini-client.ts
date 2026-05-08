import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno.')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const flashModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
export const flashLiteModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

export async function generateWithFlash(prompt: string, systemInstruction?: string): Promise<string> {
  const model = systemInstruction
    ? genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction })
    : flashModel

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function generateWithFlashLite(prompt: string, systemInstruction?: string): Promise<string> {
  const model = systemInstruction
    ? genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite', systemInstruction })
    : flashLiteModel

  const result = await model.generateContent(prompt)
  return result.response.text()
}
