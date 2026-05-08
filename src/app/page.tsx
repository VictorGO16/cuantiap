import Link from 'next/link'
import { AppLayout } from '@/ui/layouts/AppLayout'
import { ContextUpdater } from '@/ui/components/ContextUpdater'
import { getAllModules, getConceptsByModule } from '@/core/content/service'

const MODULE_PATHS: Record<string, string> = {
  metodologia: '/metodologia',
  medicion: '/medicion',
  psicometria: '/psicometria',
  estadistica: '/estadistica',
}

const MODULE_DESCRIPTIONS_SHORT: Record<string, string> = {
  metodologia: 'Diseño de investigación, hipótesis, variables y muestreo.',
  medicion: 'Constructos, operacionalización, validez y confiabilidad.',
  psicometria: 'TCT, construcción de instrumentos y análisis factorial.',
  estadistica: 'Estadística descriptiva, inferencial y pruebas de hipótesis.',
}

export default function Home() {
  const modules = getAllModules()
  const totalConcepts = modules.reduce((acc, m) => acc + m.conceptIds.length, 0)

  return (
    <AppLayout>
      <ContextUpdater />
      <div className="pb-16">
        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-ink-faint bg-sidebar border border-border px-2.5 py-1 rounded-full">
              Pregrado · Psicología
            </span>
          </div>
          <h1 className="text-[2rem] font-semibold text-ink tracking-tight leading-tight mb-4">
            Metodología<br />Cuantitativa
          </h1>
          <p className="text-base text-ink-muted leading-[1.75] max-w-prose">
            Aplicación pedagógica para aprender investigación cuantitativa, medición, psicometría
            y estadística aplicada. Cada concepto incluye explicación técnica, ejemplos,
            errores frecuentes y criterios de dominio.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <Stat value={modules.length} label="módulos" />
            <div className="w-px h-6 bg-border" />
            <Stat value={totalConcepts} label="conceptos" />
          </div>
        </header>

        {/* Modules grid */}
        <div className="border-t border-border pt-8">
          <p className="text-2xs font-semibold uppercase tracking-widest text-ink-faint mb-5">
            Módulos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modules.map((mod) => {
              const concepts = getConceptsByModule(mod.id)
              return (
                <Link
                  key={mod.id}
                  href={MODULE_PATHS[mod.id] ?? `/${mod.id}`}
                  className="block group"
                >
                  <div className="bg-white border border-border rounded-xl p-5 hover:border-accent/30 hover:shadow-sm transition-all duration-150 h-full">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                        {mod.name}
                      </p>
                      <span className="text-xs text-ink-faint tabular-nums">{concepts.length}</span>
                    </div>
                    <p className="text-xs text-ink-faint leading-relaxed">
                      {MODULE_DESCRIPTIONS_SHORT[mod.id] ?? mod.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {concepts.slice(0, 4).map((c) => (
                        <span
                          key={c.id}
                          className="text-2xs px-2 py-0.5 bg-sidebar rounded-full text-ink-faint"
                        >
                          {c.title}
                        </span>
                      ))}
                      {concepts.length > 4 && (
                        <span className="text-2xs px-2 py-0.5 bg-sidebar rounded-full text-ink-faint">
                          +{concepts.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* IA note */}
        <div className="mt-8 border border-border rounded-xl p-5 bg-white">
          <p className="text-xs font-semibold text-ink mb-1">Asistente IA</p>
          <p className="text-xs text-ink-faint leading-relaxed">
            En cada concepto hay un asistente disponible. Responde usando el contenido
            académico del módulo como contexto. No reemplaza el estudio, lo complementa.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-xl font-semibold text-ink tabular-nums">{value}</span>
      <span className="text-xs text-ink-faint">{label}</span>
    </div>
  )
}
