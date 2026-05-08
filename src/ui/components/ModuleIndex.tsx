import Link from 'next/link'
import type { ModuleMeta, Concept } from '@/types/core'

interface ModuleIndexProps {
  module: ModuleMeta
  concepts: Concept[]
  modulePath: string
}

export function ModuleIndex({ module, concepts, modulePath }: ModuleIndexProps) {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-ink tracking-tight mb-2">{module.name}</h1>
        <p className="text-base text-ink-muted leading-relaxed max-w-prose">{module.description}</p>
      </header>

      <div className="border-t border-border pt-8">
        <p className="section-label px-0 mb-4">Conceptos — {concepts.length}</p>
        <div className="space-y-2">
          {concepts.map((concept, index) => (
            <Link
              key={concept.id}
              href={`${modulePath}/${concept.id}`}
              className="block group"
            >
              <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-accent/30 hover:bg-accent-light/30 transition-colors">
                <span className="text-sm text-ink-faint font-mono mt-0.5 w-5 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors mb-1">
                    {concept.title}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                    {concept.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
