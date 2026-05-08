import Link from 'next/link'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { getAllModules } from '@/core/content/service'

const MODULE_PATHS: Record<string, string> = {
  metodologia: '/metodologia',
  medicion: '/medicion',
  psicometria: '/psicometria',
  estadistica: '/estadistica',
}

export default function Home() {
  const modules = getAllModules()

  return (
    <AppLayout>
      <div className="max-w-content">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-ink tracking-tight mb-3">
            Metodología Cuantitativa
          </h1>
          <p className="text-base text-ink-muted leading-relaxed max-w-prose">
            Aplicación pedagógica para aprender metodología cuantitativa, medición,
            psicometría y estadística aplicada en psicología. Selecciona un módulo para comenzar.
          </p>
        </header>

        <div className="border-t border-border pt-8">
          <p className="section-label px-0 mb-4">Módulos — {modules.length}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={MODULE_PATHS[mod.id] ?? `/${mod.id}`}
                className="block group"
              >
                <div className="card hover:border-accent/30 hover:bg-accent-light/20 transition-colors h-full">
                  <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors mb-2">
                    {mod.name}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed mb-3">
                    {mod.description}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {mod.conceptIds.length} conceptos
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
