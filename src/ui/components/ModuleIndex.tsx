import Link from 'next/link'
import type { ModuleMeta, Concept } from '@/types/core'

interface ModuleIndexProps {
  module: ModuleMeta
  concepts: Concept[]
  modulePath: string
}

export function ModuleIndex({ module, concepts, modulePath }: ModuleIndexProps) {
  return (
    <div className="pb-16">
      <header className="mb-10">
        <h1 className="text-[1.625rem] font-semibold text-ink tracking-tight mb-3">
          {module.name}
        </h1>
        <p className="text-base text-ink-muted leading-[1.75] max-w-prose">
          {module.description}
        </p>
      </header>

      <div className="border-t border-border pt-8">
        <p className="text-2xs font-semibold uppercase tracking-widest text-ink-faint mb-5">
          {concepts.length} conceptos
        </p>

        <div className="space-y-1.5">
          {concepts.map((concept, index) => (
            <Link
              key={concept.id}
              href={`${modulePath}/${concept.id}`}
              className="block group"
            >
              <div className="flex items-start gap-5 px-4 py-4 rounded-lg border border-transparent hover:border-border hover:bg-white transition-all duration-150">
                <span className="text-sm text-ink-faint font-mono tabular-nums mt-0.5 w-5 flex-shrink-0 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors mb-1 leading-snug">
                    {concept.title}
                  </p>
                  <p className="text-xs text-ink-faint leading-relaxed line-clamp-2">
                    {concept.summary}
                  </p>
                </div>
                <span className="text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity text-sm mt-0.5 flex-shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
