'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAIChatStore, type ChatMode } from '@/store/ai-chat'
import type { ChatMessage, AIChatRequest } from '@/types/core'

// ─── Markdown renderer ────────────────────────────────────────────────────────

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    if (match[1]) nodes.push(<strong key={match.index} className="font-semibold text-ink">{match[2]}</strong>)
    else if (match[3]) nodes.push(<em key={match.index} className="italic text-ink-muted">{match[4]}</em>)
    else if (match[5]) nodes.push(<code key={match.index} className="bg-sidebar border border-border rounded px-1 py-0.5 text-xs font-mono text-ink">{match[6]}</code>)
    last = match.index + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function MarkdownMessage({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/)
  const elements: React.ReactNode[] = []

  for (let bi = 0; bi < blocks.length; bi++) {
    const block = blocks[bi].trim()
    if (!block) continue

    // Fenced code block
    if (block.startsWith('```')) {
      const lines = block.split('\n')
      const code = lines.slice(1, lines[lines.length - 1] === '```' ? -1 : undefined).join('\n')
      elements.push(
        <pre key={bi} className="bg-sidebar border border-border rounded-md px-3 py-2.5 my-1.5 overflow-x-auto">
          <code className="text-xs text-ink font-mono whitespace-pre">{code}</code>
        </pre>
      )
      continue
    }

    // Heading
    const headingMatch = block.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      elements.push(
        <p key={bi} className="text-sm font-semibold text-ink mt-2 mb-0.5">
          {parseInline(headingMatch[2])}
        </p>
      )
      continue
    }

    // Unordered list
    const lines = block.split('\n')
    if (lines.every((l) => /^[-*]\s/.test(l.trim()))) {
      elements.push(
        <ul key={bi} className="space-y-0.5 my-1.5 pl-3">
          {lines.map((l, i) => (
            <li key={i} className="text-sm text-ink leading-relaxed flex gap-2">
              <span className="text-ink-faint flex-shrink-0 mt-0.5">–</span>
              <span>{parseInline(l.replace(/^[-*]\s+/, ''))}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list
    if (lines.every((l) => /^\d+\.\s/.test(l.trim()))) {
      elements.push(
        <ol key={bi} className="space-y-0.5 my-1.5 pl-3">
          {lines.map((l, i) => (
            <li key={i} className="text-sm text-ink leading-relaxed flex gap-2">
              <span className="text-ink-faint flex-shrink-0 tabular-nums mt-0.5">{i + 1}.</span>
              <span>{parseInline(l.replace(/^\d+\.\s+/, ''))}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Mixed block: some lines are list items, others are text
    if (lines.some((l) => /^[-*]\s/.test(l.trim()) || /^\d+\.\s/.test(l.trim()))) {
      elements.push(
        <div key={bi} className="space-y-0.5 my-1">
          {lines.map((l, i) => {
            const trimmed = l.trim()
            if (/^[-*]\s/.test(trimmed)) {
              return (
                <div key={i} className="text-sm text-ink leading-relaxed flex gap-2">
                  <span className="text-ink-faint flex-shrink-0 mt-0.5">–</span>
                  <span>{parseInline(trimmed.replace(/^[-*]\s+/, ''))}</span>
                </div>
              )
            }
            if (/^\d+\.\s/.test(trimmed)) {
              const num = trimmed.match(/^(\d+)/)![1]
              return (
                <div key={i} className="text-sm text-ink leading-relaxed flex gap-2">
                  <span className="text-ink-faint flex-shrink-0 tabular-nums mt-0.5">{num}.</span>
                  <span>{parseInline(trimmed.replace(/^\d+\.\s+/, ''))}</span>
                </div>
              )
            }
            return <p key={i} className="text-sm text-ink leading-relaxed">{parseInline(l)}</p>
          })}
        </div>
      )
      continue
    }

    // Paragraph (may span multiple lines)
    const joined = lines.join(' ')
    elements.push(
      <p key={bi} className="text-sm text-ink leading-relaxed">
        {parseInline(joined)}
      </p>
    )
  }

  return <div className="space-y-1">{elements}</div>
}

// ─── Chat components ──────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <span className="text-2xs text-ink-faint px-1">{isUser ? 'Tú' : 'Asistente'}</span>
      {isUser ? (
        <div className="max-w-[88%] rounded-xl rounded-tr-sm px-3.5 py-2.5 bg-ink text-white text-sm leading-relaxed">
          {message.content.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </div>
      ) : (
        <div className="max-w-[92%] rounded-xl rounded-tl-sm px-3.5 py-2.5 bg-sidebar border border-border">
          <MarkdownMessage content={message.content} />
        </div>
      )}
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="bg-sidebar border border-border rounded-xl rounded-tl-sm px-3.5 py-2.5 flex gap-1">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-ink-faint rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay }}
          />
        ))}
      </div>
    </div>
  )
}

const TOOL_LABELS: Record<string, string> = {
  distribuciones: 'Distribuciones',
  grupos: 'Grupos',
  psicometria: 'Psicometría',
  variables: 'Correlación',
}

function EmptyState({ mode, conceptTitle, datasetLabel, toolLabel }: {
  mode: ChatMode
  conceptTitle?: string
  datasetLabel?: string
  toolLabel?: string
}) {
  if (mode === 'general') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
        <div className="w-10 h-10 rounded-full bg-sidebar border border-border flex items-center justify-center">
          <span className="text-xs font-bold text-ink-muted">G</span>
        </div>
        <div>
          <p className="text-sm text-ink-muted font-medium">Asistente general del curso</p>
          <p className="text-xs text-ink-faint mt-1.5 leading-relaxed">
            Podés preguntar sobre cualquier tema de los cuatro módulos. El asistente sabe en qué página estás.
          </p>
        </div>
      </div>
    )
  }
  if (mode === 'data') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
        <div className="w-10 h-10 rounded-full bg-sidebar border border-border flex items-center justify-center">
          <span className="text-xs font-bold text-ink-muted">D</span>
        </div>
        <div>
          <p className="text-sm text-ink-muted font-medium">Intérprete de resultados</p>
          <p className="text-xs text-ink-faint mt-1.5 leading-relaxed">
            Ejecutá un análisis en{' '}
            <span className="font-medium text-ink-muted">{toolLabel}</span>
            {datasetLabel && (
              <> con el dataset <span className="font-medium text-ink-muted">{datasetLabel}</span></>
            )}
            {' '}y pedile al asistente que interprete los resultados.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
      <div className="w-10 h-10 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center">
        <span className="text-xs font-bold text-accent">C</span>
      </div>
      <div>
        <p className="text-sm text-ink-muted font-medium">Asistente del concepto</p>
        <p className="text-xs text-ink-faint mt-1.5 leading-relaxed">
          Respuestas ancladas al contenido de{' '}
          <span className="font-medium text-ink-muted">{conceptTitle}</span>.
        </p>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

function ErrorWidget({
  onRetry,
  onDismiss,
}: {
  onRetry: () => void
  onDismiss: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col gap-2.5 items-start"
    >
      <span className="text-2xs text-ink-faint px-1">Asistente</span>
      <div className="max-w-[92%] rounded-xl rounded-tl-sm px-3.5 py-3 bg-sidebar border border-border">
        <p className="text-sm text-ink-muted leading-relaxed mb-3">
          No se pudo procesar la consulta. Puede ser un problema temporal con el servicio.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onRetry}
            className="text-xs font-medium px-3 py-1.5 bg-ink text-white rounded-md hover:bg-ink/90 transition-colors"
          >
            Reintentar
          </button>
          <button
            onClick={onDismiss}
            className="text-xs text-ink-faint hover:text-ink-muted transition-colors px-2 py-1.5"
          >
            Cancelar
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function GlobalAIChat() {
  const {
    isOpen,
    close,
    activeMode,
    setActiveMode,
    generalHistory,
    conceptHistories,
    dataHistory,
    currentConceptId,
    currentConceptTitle,
    dataContext,
    addToGeneral,
    addToConcept,
    addToData,
    clearGeneralHistory,
    clearConceptHistory,
    clearDataHistory,
    popLastGeneral,
    popLastConcept,
    popLastData,
  } = useAIChatStore()

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [failedMessage, setFailedMessage] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const activeHistory =
    activeMode === 'general'
      ? generalHistory
      : activeMode === 'data'
      ? dataHistory
      : (conceptHistories[currentConceptId ?? ''] ?? [])

  const canUseData = !!dataContext
  const dataTabLabel = 'Explorador'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeHistory, isLoading, failedMessage])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 220)
  }, [isOpen, activeMode])

  const sendMessage = useCallback(async (message: string, addToHistory = true) => {
    if (!message || isLoading) return

    const store = useAIChatStore.getState()
    const cid = store.currentConceptId
    const ctitle = store.currentConceptTitle
    const mode = store.activeMode
    const ctx = store.dataContext
    const historySnapshot =
      mode === 'general'
        ? store.generalHistory
        : mode === 'data'
        ? store.dataHistory
        : (store.conceptHistories[cid ?? ''] ?? [])

    const userMsg: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    }

    if (addToHistory) {
      if (mode === 'general') addToGeneral([userMsg])
      else if (mode === 'data') addToData([userMsg])
      else if (cid) addToConcept(cid, [userMsg])
    }

    setIsLoading(true)
    setFailedMessage(null)

    try {
      const navContext = cid && ctitle
        ? `Concepto activo: "${ctitle}"`
        : 'Página de inicio o índice de módulo'

      const body: AIChatRequest = {
        message,
        chatMode: mode,
        conceptId: mode === 'concept' ? cid : undefined,
        navContext: mode === 'general' ? navContext : undefined,
        dataContext: mode === 'data' ? ctx : undefined,
        history: historySnapshot,
      }

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Error del servidor')
      }

      const data = await res.json()
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toISOString(),
      }

      if (mode === 'general') addToGeneral([assistantMsg])
      else if (mode === 'data') addToData([assistantMsg])
      else if (cid) addToConcept(cid, [assistantMsg])
    } catch {
      if (addToHistory) {
        if (mode === 'general') popLastGeneral()
        else if (mode === 'data') popLastData()
        else if (cid) popLastConcept(cid)
      }
      setFailedMessage(message)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, addToGeneral, addToConcept, addToData, popLastGeneral, popLastConcept, popLastData])

  const send = useCallback(() => {
    const message = input.trim()
    if (!message) return
    setInput('')
    sendMessage(message)
  }, [input, sendMessage])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  function handleRetry() {
    if (!failedMessage) return
    const msg = failedMessage
    setFailedMessage(null)
    sendMessage(msg)
  }

  function handleDismissError() {
    setFailedMessage(null)
  }

  function handleClear() {
    setFailedMessage(null)
    if (activeMode === 'general') clearGeneralHistory()
    else if (activeMode === 'data') clearDataHistory()
    else if (currentConceptId) clearConceptHistory(currentConceptId)
  }

  function switchMode(mode: ChatMode) {
    if (mode === 'concept' && !currentConceptId) return
    if (mode === 'data' && !dataContext) return
    setActiveMode(mode)
    setFailedMessage(null)
  }

  const canUseConcept = !!currentConceptId
  const hasContent = activeHistory.length > 0 || !!failedMessage

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="fixed right-0 top-14 lg:top-0 h-[calc(100vh-3.5rem)] lg:h-screen w-full lg:w-chat-panel bg-white border-l border-border z-20 flex flex-col shadow-xl"
        >
          {/* Header */}
          <header className="px-4 pt-3.5 pb-0 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-sm font-medium text-ink">Asistente</span>
              </div>
              <div className="flex items-center gap-1">
                {hasContent && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-ink-faint hover:text-ink-muted transition-colors px-2 py-1 rounded-md hover:bg-sidebar"
                  >
                    Nueva conversación
                  </button>
                )}
                <button
                  onClick={close}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-ink-faint hover:text-ink hover:bg-sidebar transition-colors text-lg leading-none"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Mode tabs */}
            <div className="flex">
              <button
                onClick={() => switchMode('general')}
                className={`
                  flex-1 text-xs font-medium px-3 py-2 border-b-2 transition-colors duration-100
                  ${activeMode === 'general'
                    ? 'text-ink border-ink'
                    : 'text-ink-muted border-transparent hover:text-ink'
                  }
                `}
              >
                General
              </button>
              <button
                onClick={() => switchMode('concept')}
                disabled={!canUseConcept}
                title={!canUseConcept ? 'Abre un concepto para activar' : undefined}
                className={`
                  flex-1 text-xs font-medium px-3 py-2 border-b-2 transition-colors duration-100 truncate
                  ${activeMode === 'concept'
                    ? 'text-accent border-accent'
                    : canUseConcept
                    ? 'text-ink-muted border-transparent hover:text-ink'
                    : 'text-ink-faint border-transparent cursor-not-allowed'
                  }
                `}
              >
                {currentConceptTitle ?? 'Concepto'}
              </button>
              {canUseData && (
                <button
                  onClick={() => switchMode('data')}
                  className={`
                    flex-1 text-xs font-medium px-3 py-2 border-b-2 transition-colors duration-100 truncate
                    ${activeMode === 'data'
                      ? 'text-ink border-ink'
                      : 'text-ink-muted border-transparent hover:text-ink'
                    }
                  `}
                >
                  {dataTabLabel}
                </button>
              )}
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {!hasContent && !isLoading && (
              <EmptyState
                mode={activeMode}
                conceptTitle={currentConceptTitle}
                datasetLabel={dataContext?.datasetLabel}
                toolLabel={dataContext ? TOOL_LABELS[dataContext.tool] : undefined}
              />
            )}
            {activeHistory.map((msg, i) => (
              <MessageBubble key={`${activeMode}-${activeMode === 'data' ? 'd' : (currentConceptId ?? 'g')}-${i}`} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {failedMessage && !isLoading && (
              <ErrorWidget onRetry={handleRetry} onDismiss={handleDismissError} />
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex-shrink-0 bg-white">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  activeMode === 'general'
                    ? 'Pregunta sobre el curso...'
                    : activeMode === 'data'
                    ? 'Pide una interpretación de los resultados...'
                    : `Pregunta sobre ${currentConceptTitle ?? 'este concepto'}...`
                }
                rows={2}
                className="flex-1 text-sm resize-none border border-border rounded-lg px-3 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-canvas transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={send}
                disabled={!input.trim() || isLoading}
                className="btn-primary flex-shrink-0 self-end h-9"
              >
                Enviar
              </button>
            </div>
            <p className="text-2xs text-ink-faint mt-2">Enter para enviar · Shift+Enter nueva línea</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
