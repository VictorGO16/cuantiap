'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAIChatStore } from '@/store/ai-chat'
import { useMobileNav } from '@/store/mobile-nav'
import type { ModuleMeta, Concept } from '@/types/core'

interface SidebarProps {
  modules: ModuleMeta[]
  conceptsByModule: Record<string, Concept[]>
}

const MODULE_PATHS: Record<string, string> = {
  metodologia: '/metodologia',
  medicion: '/medicion',
  psicometria: '/psicometria',
  estadistica: '/estadistica',
}

function getConceptPath(moduleId: string, conceptId: string) {
  return `${MODULE_PATHS[moduleId]}/${conceptId}`
}

const MODULE_LABELS: Record<string, string> = {
  metodologia: 'M',
  medicion: 'Me',
  psicometria: 'P',
  estadistica: 'E',
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M13.5 1.5h-11A1 1 0 0 0 1.5 2.5v7a1 1 0 0 0 1 1H5l3 3 3-3h2.5a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sidebar({ modules, conceptsByModule }: SidebarProps) {
  const pathname = usePathname()
  const toggleChat = useAIChatStore((s) => s.toggle)
  const isChatOpen = useAIChatStore((s) => s.isOpen)
  const isSidebarOpen = useMobileNav((s) => s.isSidebarOpen)
  const closeSidebar = useMobileNav((s) => s.closeSidebar)

  // Close mobile sidebar on navigation
  useEffect(() => {
    closeSidebar()
  }, [pathname, closeSidebar])

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    modules.forEach((m) => {
      init[m.id] = pathname.startsWith(MODULE_PATHS[m.id] ?? '/')
    })
    return init
  })

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden fixed inset-0 bg-ink/40 z-30"
            onClick={closeSidebar}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed top-0 left-0 h-screen w-sidebar bg-sidebar border-r border-border flex flex-col z-40
          transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-4 h-14 border-b border-border flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-ink flex items-center justify-center flex-shrink-0">
              <span className="text-2xs font-bold text-white">MC</span>
            </div>
            <span className="text-xs font-semibold text-ink tracking-tight leading-tight">
              Metodología<br />Cuantitativa
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {modules.map((mod) => {
            const basePath = MODULE_PATHS[mod.id]
            const isModuleActive = pathname.startsWith(basePath)
            const isOpen = expanded[mod.id]
            const concepts = conceptsByModule[mod.id] ?? []

            return (
              <div key={mod.id} className="mb-0.5">
                <button
                  onClick={() => toggle(mod.id)}
                  className={`
                    w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left
                    transition-colors duration-100
                    ${isModuleActive
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink hover:bg-border/60'
                    }
                  `}
                >
                  <span className={`
                    w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-2xs font-bold
                    transition-colors duration-100
                    ${isModuleActive ? 'bg-ink text-white' : 'bg-border text-ink-muted'}
                  `}>
                    {MODULE_LABELS[mod.id]}
                  </span>
                  <span className={`text-xs flex-1 font-medium ${isModuleActive ? 'text-ink' : ''}`}>
                    {mod.name}
                  </span>
                  <span className="text-2xs text-ink-faint tabular-nums">{concepts.length}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-ink-faint text-xs ml-0.5"
                  >
                    ›
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-2 pl-3 border-l border-border mt-0.5 mb-1 space-y-0.5">
                        {concepts.map((concept) => {
                          const href = getConceptPath(mod.id, concept.id)
                          const isActive = pathname === href
                          return (
                            <Link
                              key={concept.id}
                              href={href}
                              className={`
                                block px-2 py-1.5 rounded text-xs leading-snug transition-colors duration-100
                                ${isActive
                                  ? 'text-accent font-medium bg-accent-light'
                                  : 'text-ink-muted hover:text-ink hover:bg-border/50'
                                }
                              `}
                            >
                              {concept.title}
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* Assistant button */}
        <div className="px-3 py-2.5 border-t border-border flex-shrink-0">
          <button
            onClick={toggleChat}
            className={`
              w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
              border transition-all duration-150
              ${isChatOpen
                ? 'bg-ink text-white border-ink'
                : 'text-ink-muted border-border bg-white hover:text-ink hover:border-ink-faint'
              }
            `}
          >
            <IconChat />
            <span className="flex-1 text-left">Asistente</span>
            {isChatOpen && <span className="text-2xs opacity-60 font-normal">abierto</span>}
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border flex-shrink-0">
          <p className="text-2xs text-ink-faint">v1.0 · 2025</p>
        </div>
      </aside>
    </>
  )
}
