import { metodologiaConceptos, metodologiaMeta } from '@/modules/metodologia'
import { medicionConceptos, medicionMeta } from '@/modules/medicion'
import { psicometriaConceptos, psicometriaMeta } from '@/modules/psicometria'
import { estadisticaConceptos, estadisticaMeta } from '@/modules/estadistica'
import type { Concept, ModuleMeta } from '@/types/core'

export const allModules: ModuleMeta[] = [
  metodologiaMeta,
  medicionMeta,
  psicometriaMeta,
  estadisticaMeta,
]

const allConcepts: Concept[] = [
  ...metodologiaConceptos,
  ...medicionConceptos,
  ...psicometriaConceptos,
  ...estadisticaConceptos,
]

export const conceptRegistry = new Map<string, Concept>(
  allConcepts.map((c) => [c.id, c])
)
