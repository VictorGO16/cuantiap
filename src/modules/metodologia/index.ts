import type { ModuleMeta } from '@/types/core'
import { metodologiaConceptos } from './content'

export const metodologiaMeta: ModuleMeta = {
  id: 'metodologia',
  name: 'Metodología',
  description:
    'Fundamentos del diseño de investigación cuantitativa: problema, objetivos, hipótesis, variables, diseños y muestreo.',
  version: '1.0.0',
  status: 'active',
  conceptIds: metodologiaConceptos.map((c) => c.id),
}

export { metodologiaConceptos }
