'use client'

import Link from 'next/link'
import { useMobileNav } from '@/store/mobile-nav'
import { useAIChatStore } from '@/store/ai-chat'

function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 1.5h-11A1 1 0 0 0 1.5 2.5v7a1 1 0 0 0 1 1H5l3 3 3-3h2.5a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
    </svg>
  )
}

export function MobileHeader() {
  const toggleSidebar = useMobileNav((s) => s.toggleSidebar)
  const toggleChat = useAIChatStore((s) => s.toggle)
  const isChatOpen = useAIChatStore((s) => s.isOpen)

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-sidebar border-b border-border z-20 flex items-center justify-between px-3 flex-shrink-0">
      <button
        onClick={toggleSidebar}
        className="w-9 h-9 flex items-center justify-center rounded-md text-ink-muted hover:text-ink hover:bg-border/60 transition-colors"
        aria-label="Abrir navegación"
      >
        <IconMenu />
      </button>

      <Link href="/" className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-ink flex items-center justify-center flex-shrink-0">
          <span className="text-2xs font-bold text-white">MC</span>
        </div>
        <span className="text-xs font-semibold text-ink tracking-tight">Metodología Cuantitativa</span>
      </Link>

      <button
        onClick={toggleChat}
        className={`
          w-9 h-9 flex items-center justify-center rounded-md transition-colors
          ${isChatOpen
            ? 'bg-ink text-white'
            : 'text-ink-muted hover:text-ink hover:bg-border/60'
          }
        `}
        aria-label="Asistente"
      >
        <IconChat />
      </button>
    </header>
  )
}
