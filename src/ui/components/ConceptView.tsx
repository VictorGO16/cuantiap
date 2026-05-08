import { ConceptSection } from './ConceptSection'
import type { Concept } from '@/types/core'

interface ConceptViewProps {
  concept: Concept
}

export function ConceptView({ concept }: ConceptViewProps) {
  return (
    <article>
      <header className="mb-8">
        <p className="text-sm text-ink-muted mb-2">{concept.moduleId.charAt(0).toUpperCase() + concept.moduleId.slice(1)}</p>
        <h1 className="text-2xl font-semibold text-ink tracking-tight mb-3">{concept.title}</h1>
        <p className="text-base text-ink-muted leading-relaxed max-w-prose">{concept.summary}</p>
      </header>

      <div className="border-t border-border pt-8">
        <ConceptSection title="Explicación">
          <div className="prose prose-sm max-w-none">
            {concept.explanation.split('\n\n').map((paragraph, i) => {
              // Detecta encabezados markdown (**texto**)
              const withBold = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return null
              }
              return (
                <p
                  key={i}
                  className="mb-4 text-sm text-ink leading-7"
                  dangerouslySetInnerHTML={{ __html: withBold }}
                />
              )
            })}
          </div>
        </ConceptSection>

        {concept.examples.length > 0 && (
          <ConceptSection title="Ejemplos aplicados">
            <div className="space-y-4">
              {concept.examples.map((example) => (
                <div key={example.id} className="border border-border rounded-lg p-4">
                  <p className="text-sm font-medium text-ink mb-1">{example.title}</p>
                  <p className="text-sm text-ink-muted leading-relaxed mb-2">{example.description}</p>
                  <p className="text-xs text-ink-faint italic">{example.applicableContext}</p>
                </div>
              ))}
            </div>
          </ConceptSection>
        )}

        {concept.commonMistakes.length > 0 && (
          <ConceptSection title="Errores frecuentes">
            <ul className="space-y-2">
              {concept.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-muted">
                  <span className="text-ink-faint mt-0.5 flex-shrink-0">—</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </ConceptSection>
        )}

        {concept.masteryCriteria.length > 0 && (
          <ConceptSection title="Criterios de dominio">
            <ul className="space-y-2">
              {concept.masteryCriteria.map((criterion, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink">
                  <span className="text-ink-faint flex-shrink-0">{i + 1}.</span>
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </ConceptSection>
        )}

        {(concept.prerequisites.length > 0 || concept.relatedConcepts.length > 0) && (
          <ConceptSection title="Relaciones conceptuales" variant="muted">
            <div className="flex flex-wrap gap-4">
              {concept.prerequisites.length > 0 && (
                <div>
                  <p className="text-xs text-ink-faint mb-1">Prerrequisitos</p>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.prerequisites.map((id) => (
                      <span key={id} className="text-xs px-2 py-1 bg-border rounded text-ink-muted">
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {concept.relatedConcepts.length > 0 && (
                <div>
                  <p className="text-xs text-ink-faint mb-1">Conceptos relacionados</p>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.relatedConcepts.map((id) => (
                      <span key={id} className="text-xs px-2 py-1 bg-border rounded text-ink-muted">
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ConceptSection>
        )}
      </div>
    </article>
  )
}
