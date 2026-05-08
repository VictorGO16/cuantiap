import { conceptRegistry, allModules } from './registry'
import type { Concept, ModuleMeta } from '@/types/core'

export function getConcept(id: string): Concept | undefined {
  return conceptRegistry.get(id)
}

export function getModule(id: string): ModuleMeta | undefined {
  return allModules.find((m) => m.id === id)
}

export function getConceptsByModule(moduleId: string): Concept[] {
  const mod = getModule(moduleId)
  if (!mod) return []
  return mod.conceptIds.map((id) => conceptRegistry.get(id)).filter(Boolean) as Concept[]
}

export function getAllModules(): ModuleMeta[] {
  return allModules.filter((m) => m.status === 'active')
}

export function getConceptContext(id: string): string {
  const concept = getConcept(id)
  if (!concept) return ''

  return [
    `# ${concept.title}`,
    `## Resumen`,
    concept.summary,
    `## Explicación`,
    concept.explanation,
    `## Ejemplos`,
    concept.examples.map((e) => `### ${e.title}\n${e.description}\n\nContexto: ${e.applicableContext}`).join('\n\n'),
    `## Errores frecuentes`,
    concept.commonMistakes.map((m, i) => `${i + 1}. ${m}`).join('\n'),
    `## Criterios de dominio`,
    concept.masteryCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n'),
  ].join('\n\n')
}
