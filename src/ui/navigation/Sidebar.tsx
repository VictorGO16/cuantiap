'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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

export function Sidebar({ modules, conceptsByModule }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    modules.forEach((m) => {
      init[m.id] = pathname.startsWith(MODULE_PATHS[m.id] ?? '')
    })
    return init
  })

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-sidebar bg-sidebar border-r border-border flex flex-col z-10 overflow-hidden">
      <div className="px-5 py-5 border-b border-border flex-shrink-0">
        <Link href="/" className="block">
          <span className="text-sm font-semibold text-ink tracking-tight">
            Metodología Cuantitativa
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        {modules.map((mod) => {
          const basePath = MODULE_PATHS[mod.id]
          const isModuleActive = pathname.startsWith(basePath)
          const isOpen = expanded[mod.id]
          const concepts = conceptsByModule[mod.id] ?? []

          return (
            <div key={mod.id} className="mb-1">
              <button
                onClick={() => toggle(mod.id)}
                className={`sidebar-link w-full text-left ${isModuleActive ? 'text-ink font-medium' : ''}`}
              >
                <span className="flex-1">{mod.name}</span>
                <span className="text-ink-faint text-xs ml-auto">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="ml-3 mt-0.5 space-y-0.5">
                  {concepts.map((concept) => {
                    const href = getConceptPath(mod.id, concept.id)
                    const isActive = pathname === href
                    return (
                      <Link
                        key={concept.id}
                        href={href}
                        className={`sidebar-link text-xs ${isActive ? 'sidebar-link-active' : ''}`}
                      >
                        {concept.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="px-5 py-3 border-t border-border flex-shrink-0">
        <span className="text-2xs text-ink-faint">v1.0 — 2025</span>
      </div>
    </aside>
  )
}
