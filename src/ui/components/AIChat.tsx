'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChatMessage, AIChatRequest } from '@/types/core'

interface AIChatProps {
  conceptId?: string
  moduleId?: string
}

function formatTimestamp(): string {
  return new Date().toISOString()
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <span className="text-2xs text-ink-faint px-1">
        {isUser ? 'Tú' : 'Asistente'}
      </span>
      <div
        className={`
          max-w-[88%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed
          ${isUser
            ? 'bg-ink text-white rounded-tr-sm'
            : 'bg-sidebar border border-border text-ink rounded-tl-sm'
          }
        `}
      >
        {message.content.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-1.5">
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

export function AIChat({ conceptId, moduleId }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isLoading])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  const send = useCallback(async () => {
    const message = input.trim()
    if (!message || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: formatTimestamp(),
    }

    setHistory((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const body: AIChatRequest = {
        message,
        chatMode: 'concept',
        conceptId,
        moduleId,
        history,
      }

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Error del servidor')
      }

      const data = await res.json()
      setHistory((prev) => [
        ...prev,
        { role: 'assistant', content: data.content, timestamp: formatTimestamp() },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, history, conceptId, moduleId])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 bg-ink text-white text-sm font-medium rounded-full shadow-lg hover:bg-ink/90 active:scale-95 transition-transform"
          >
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Consultar asistente
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 h-screen w-chat-panel bg-white border-l border-border z-20 flex flex-col shadow-xl"
          >
            {/* Header */}
            <header className="px-4 h-14 border-b border-border flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-ink leading-none">Asistente</p>
                  <p className="text-2xs text-ink-faint mt-0.5">
                    {conceptId ? 'Usando contexto del concepto' : 'Sin contexto específico'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={() => { setHistory([]); setError(null) }}
                    className="text-xs text-ink-faint hover:text-ink-muted transition-colors px-2 py-1"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-ink-faint hover:text-ink hover:bg-sidebar transition-colors text-lg leading-none"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {history.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                  <div className="w-10 h-10 rounded-full bg-sidebar border border-border flex items-center justify-center">
                    <span className="text-xs font-bold text-ink-muted">?</span>
                  </div>
                  <div>
                    <p className="text-sm text-ink-muted font-medium">¿Qué necesitas aclarar?</p>
                    <p className="text-xs text-ink-faint mt-1 leading-relaxed">
                      El asistente responde usando el contenido del módulo como contexto.
                    </p>
                  </div>
                </div>
              )}

              {history.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}

              {isLoading && <TypingIndicator />}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                  <p className="text-xs text-red-700">{error}</p>
                </div>
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
                  placeholder="Escribe tu pregunta..."
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
              <p className="text-2xs text-ink-faint mt-2">
                Enter para enviar · Shift+Enter para nueva línea
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
