'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
      <span className="text-2xs text-ink-faint px-1">
        {isUser ? 'Tú' : 'Asistente'}
      </span>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-white'
            : 'bg-sidebar border border-border text-ink'
        }`}
      >
        {message.content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < message.content.split('\n').length - 1 && <br />}
          </span>
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
      inputRef.current.focus()
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
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: formatTimestamp(),
      }

      setHistory((prev) => [...prev, assistantMessage])
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
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-20 px-4 py-2 bg-ink text-white text-sm font-medium rounded-full shadow-lg hover:bg-ink/90 transition-colors"
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {isOpen ? 'Cerrar asistente' : 'Consultar asistente'}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-screen w-chat-panel bg-white border-l border-border z-10 flex flex-col shadow-xl">
          <header className="px-4 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-sm font-medium text-ink">Asistente</p>
              <p className="text-xs text-ink-faint">
                {conceptId ? 'Contexto: concepto activo' : 'Sin contexto específico'}
              </p>
            </div>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-ink-muted hover:text-ink transition-colors"
              title="Limpiar conversación"
            >
              Limpiar
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {history.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-sm text-ink-muted">
                  Haz una pregunta sobre el concepto que estás estudiando.
                </p>
                <p className="text-xs text-ink-faint mt-2">
                  El asistente responde usando el contenido académico del módulo.
                </p>
              </div>
            )}

            {history.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-sidebar border border-border rounded-lg px-3 py-2">
                  <span className="text-xs text-ink-muted">Procesando</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="px-4 py-3 border-t border-border flex-shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pregunta sobre el concepto..."
                rows={2}
                className="flex-1 text-sm resize-none border border-border rounded-md px-3 py-2 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-canvas"
                disabled={isLoading}
              />
              <button
                onClick={send}
                disabled={!input.trim() || isLoading}
                className="btn-primary flex-shrink-0 self-end"
              >
                Enviar
              </button>
            </div>
            <p className="text-2xs text-ink-faint mt-2">Enter para enviar · Shift+Enter para nueva línea</p>
          </div>
        </div>
      )}
    </>
  )
}
