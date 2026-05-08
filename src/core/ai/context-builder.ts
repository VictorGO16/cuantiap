import { getConcept, getConceptContext } from '@/core/content/service'
import { generateWithFlashLite } from '@/infrastructure/gemini/gemini-client'
import { PROMPTS } from './prompt-registry'
import type { AIContext, AIContextInput } from '@/types/core'

const CONTEXT_LENGTH_THRESHOLD = 3000

export async function buildContext(input: AIContextInput): Promise<AIContext> {
  const { conceptId, moduleId, userMessage } = input

  if (!conceptId) {
    return { relevantConceptIds: [], moduleId }
  }

  const concept = getConcept(conceptId)
  if (!concept) {
    return { relevantConceptIds: [], moduleId }
  }

  const rawContext = getConceptContext(conceptId)

  // Concepto corto: pasa directo sin llamada a flash-lite
  if (rawContext.length <= CONTEXT_LENGTH_THRESHOLD) {
    return {
      conceptData: concept,
      moduleId: concept.moduleId,
      synthesizedContext: rawContext,
      relevantConceptIds: [conceptId],
    }
  }

  // Contexto extenso: flash-lite sintetiza la parte más relevante para la consulta
  const synthesisPrompt = [
    PROMPTS.contextSynthesis,
    `\n\nConsulta del estudiante: "${userMessage}"`,
    `\n\nContenido del concepto:\n${rawContext}`,
  ].join('')

  const synthesized = await generateWithFlashLite(synthesisPrompt)

  return {
    conceptData: concept,
    moduleId: concept.moduleId,
    synthesizedContext: synthesized,
    relevantConceptIds: [conceptId],
  }
}
