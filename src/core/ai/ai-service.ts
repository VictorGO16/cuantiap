import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildContext } from './context-builder'
import { PROMPTS, PROMPT_VERSION } from './prompt-registry'
import type { AIChatRequest, AIChatResponse, ChatMessage, AnalysisContext } from '@/types/core'

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
    ? `Briefing del concepto (preparado para esta consulta por un modelo auxiliar — úsalo como contexto filtrado, no como texto a resumir):\n\n${aiContext.synthesizedContext}\n\n---\n\nConsulta del usuario: ${request.message}`
    : request.message

  const result = await chat.sendMessage(userPrompt)

  return {
    content: result.response.text(),
    mode: 'explanation',
    conceptIds: aiContext.relevantConceptIds,
  }
}

function serializeDataContext(ctx: AnalysisContext): string {
  const lines: string[] = [
    `Herramienta: ${ctx.tool}`,
    `Dataset: ${ctx.datasetLabel}`,
  ]
  if (ctx.variableLabel) lines.push(`Variable analizada: ${ctx.variableLabel} (${ctx.variableId})`)
  if (ctx.groupByLabel) lines.push(`Variable de agrupación: ${ctx.groupByLabel} (${ctx.groupById})`)
  if (ctx.instrumentLabel) lines.push(`Instrumento: ${ctx.instrumentLabel}`)

  if (ctx.results) {
    const r = ctx.results
    if (r.descriptives) {
      const d = r.descriptives
      lines.push('\nEstadísticos descriptivos:')
      lines.push(`  n = ${d.n}, M = ${d.mean.toFixed(3)}, DE = ${d.sd.toFixed(3)}`)
      lines.push(`  Mediana = ${d.median.toFixed(3)}, Mín = ${d.min.toFixed(3)}, Máx = ${d.max.toFixed(3)}`)
      lines.push(`  Asimetría = ${d.skewness.toFixed(3)}, Curtosis = ${d.kurtosis.toFixed(3)}`)
      if (r.filter) lines.push(`  Filtro aplicado: ${r.filter}`)
    }
    if (r.groups) {
      lines.push('\nEstadísticos por grupo:')
      for (const g of r.groups) {
        lines.push(`  ${g.name}: n=${g.n}, M=${g.mean.toFixed(3)}, DE=${g.sd.toFixed(3)}`)
      }
    }
    if (r.test) {
      const t = r.test
      if (t.type === 'r') {
        const n = parseInt(t.df) + 2
        lines.push(`\nCorrelación de Pearson:`)
        lines.push(`  Variable X: ${ctx.groupByLabel ?? ctx.groupById}`)
        lines.push(`  Variable Y: ${ctx.variableLabel ?? ctx.variableId}`)
        lines.push(`  r = ${t.statistic.toFixed(3)}, r² = ${t.effectSize.toFixed(3)} (${(t.effectSize * 100).toFixed(0)}% varianza compartida)`)
        lines.push(`  p ${t.pValue < 0.001 ? '< .001' : '= ' + t.pValue.toFixed(3)}, n = ${n}`)
        lines.push(`  ${t.effectLabel} — ${t.significant ? 'estadísticamente significativa' : 'no significativa (α = .05)'}`)
      } else if (t.type === 't') {
        lines.push(`\nPrueba t de Welch: t(${t.df}) = ${t.statistic.toFixed(3)}, p ${t.pValue < 0.001 ? '< .001' : '= ' + t.pValue.toFixed(3)}`)
        lines.push(`  d de Cohen = ${t.effectSize.toFixed(3)} (${t.effectLabel})`)
        lines.push(`  Resultado: ${t.significant ? 'SIGNIFICATIVO (p < .05)' : 'NO significativo (p ≥ .05)'}`)
      } else {
        lines.push(`\nANOVA de un factor: F(${t.df}) = ${t.statistic.toFixed(3)}, p ${t.pValue < 0.001 ? '< .001' : '= ' + t.pValue.toFixed(3)}`)
        lines.push(`  η² = ${t.effectSize.toFixed(3)} (${t.effectLabel})`)
        lines.push(`  Resultado: ${t.significant ? 'SIGNIFICATIVO (p < .05)' : 'NO significativo (p ≥ .05)'}`)
      }
    }
    if (r.instrument) {
      const ins = r.instrument
      lines.push(`\nAnálisis psicométrico — ${ins.name} (${ins.sigla}):`)
      lines.push(`  Ítems: ${ins.nItems}, α de Cronbach = ${ins.alpha.toFixed(3)}`)
      lines.push('\n  Ítem | M | DE | r ítem-total | α si se elimina')
      for (const item of ins.items) {
        lines.push(`  ${item.id} | ${item.mean.toFixed(2)} | ${item.sd.toFixed(2)} | ${item.itemTotal.toFixed(3)} | ${item.alphaIfDeleted.toFixed(3)}`)
      }
    }
  }
  return lines.join('\n')
}

async function processChatData(request: AIChatRequest): Promise<AIChatResponse> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: PROMPTS.data,
  })

  const chat = model.startChat({ history: toGeminiHistory(request.history) })

  const contextBlock = request.dataContext
    ? `[Análisis activo]\n${serializeDataContext(request.dataContext)}\n\n---\n\n`
    : ''

  const result = await chat.sendMessage(`${contextBlock}${request.message}`)

  return { content: result.response.text(), mode: 'explanation', conceptIds: [] }
}

export async function processChat(request: AIChatRequest): Promise<AIChatResponse> {
  if (request.chatMode === 'general') return processChatGeneral(request)
  if (request.chatMode === 'data') return processChatData(request)
  return processChatConcept(request)
}

export { PROMPT_VERSION }
