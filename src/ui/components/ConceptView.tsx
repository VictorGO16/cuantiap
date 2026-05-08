import Link from 'next/link'
import { DesignDecisionFlow } from './DesignDecisionFlow'
import { ExplanationRenderer } from './ExplanationRenderer'
import { getConcept } from '@/core/content/service'
import type { Concept } from '@/types/core'

function getConceptPath(conceptId: string): string {
  const modules = ['metodologia', 'medicion', 'psicometria', 'estadistica']
  const moduleId = modules.find((m) => conceptId.startsWith(m + '-'))
  return moduleId ? `/${moduleId}/${conceptId}` : '#'
}

interface ConceptViewProps {
  concept: Concept
}

export function ConceptView({ concept }: ConceptViewProps) {
  const resolvedRelated = concept.relatedConcepts
    .map((id) => ({ id, concept: getConcept(id) }))
    .filter((r) => r.concept !== undefined)

  const resolvedPrereqs = concept.prerequisites
    .map((id) => ({ id, concept: getConcept(id) }))
    .filter((r) => r.concept !== undefined)

  return (
    <article className="pb-24">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-accent bg-accent-light px-2 py-0.5 rounded-full">
            {concept.moduleId.charAt(0).toUpperCase() + concept.moduleId.slice(1)}
          </span>
          <span className="text-xs text-ink-faint">v{concept.version}</span>
        </div>
        <h1 className="text-[1.625rem] font-semibold text-ink tracking-tight leading-tight mb-4">
          {concept.title}
        </h1>
        <p className="text-base text-ink-muted leading-[1.75] max-w-prose border-l-2 border-border pl-4">
          {concept.summary}
        </p>
      </header>

      <div className="border-t border-border pt-8 space-y-10">
        {/* Explicación */}
        <section>
          <SectionLabel>Explicación</SectionLabel>
          <ExplanationRenderer text={concept.explanation} />
        </section>

        {concept.id === 'metodologia-disenos' && (
          <section>
            <SectionLabel>Flujo decisional</SectionLabel>
            <DesignDecisionFlow />
          </section>
        )}

        {/* Ejemplos */}
        {concept.examples.length > 0 && (
          <section>
            <SectionLabel>Ejemplos aplicados</SectionLabel>
            <div className="space-y-3">
              {concept.examples.map((example, i) => (
                <div
                  key={example.id}
                  className="border-l-2 border-accent bg-accent-light/25 rounded-r-lg px-4 py-4"
                >
                  <p className="text-xs font-semibold text-accent mb-1.5">
                    Ejemplo {i + 1} — {example.title}
                  </p>
                  <p className="text-sm text-ink leading-[1.7] mb-2">
                    {example.description}
                  </p>
                  <p className="text-xs text-ink-faint italic">
                    {example.applicableContext}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Errores frecuentes */}
        {concept.commonMistakes.length > 0 && (
          <section>
            <SectionLabel>Errores frecuentes</SectionLabel>
            <ul className="space-y-2.5">
              {concept.commonMistakes.map((mistake, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-ink-muted leading-[1.65]"
                >
                  <span className="text-amber-500 flex-shrink-0 font-medium mt-0.5 select-none">
                    —
                  </span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Criterios de dominio */}
        {concept.masteryCriteria.length > 0 && (
          <section>
            <SectionLabel>Criterios de dominio</SectionLabel>
            <ul className="space-y-3">
              {concept.masteryCriteria.map((criterion, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink leading-[1.65]">
                  <span className="w-5 h-5 rounded-full border-2 border-accent/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-2xs font-bold text-accent">{i + 1}</span>
                  </span>
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Relaciones conceptuales */}
        {(resolvedPrereqs.length > 0 || resolvedRelated.length > 0) && (
          <section className="border-t border-border pt-8">
            <SectionLabel>Relaciones conceptuales</SectionLabel>
            <div className="flex flex-col gap-4">
              {resolvedPrereqs.length > 0 && (
                <div>
                  <p className="text-2xs text-ink-faint uppercase tracking-wider mb-2">
                    Prerrequisitos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resolvedPrereqs.map(({ id, concept: related }) => (
                      <Link
                        key={id}
                        href={getConceptPath(id)}
                        className="text-xs px-3 py-1 bg-white border border-border rounded-full text-ink-muted hover:text-accent hover:border-accent/30 transition-colors"
                      >
                        {related!.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {resolvedRelated.length > 0 && (
                <div>
                  <p className="text-2xs text-ink-faint uppercase tracking-wider mb-2">
                    Conceptos relacionados
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resolvedRelated.map(({ id, concept: related }) => (
                      <Link
                        key={id}
                        href={getConceptPath(id)}
                        className="text-xs px-3 py-1 bg-white border border-border rounded-full text-ink-muted hover:text-accent hover:border-accent/30 transition-colors"
                      >
                        {related!.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-2xs font-semibold uppercase tracking-widest text-ink-faint mb-4">
      {children}
    </p>
  )
}
