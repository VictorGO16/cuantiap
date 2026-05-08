import type { ModuleMeta } from '@/types/core'
import { psicometriaConceptos } from './content'

export const psicometriaMeta: ModuleMeta = {
  id: 'psicometria',
  name: 'Psicometría',
  description:
    'Teoría clásica de los tests, construcción y validación de instrumentos, análisis factorial y criterios de calidad psicométrica.',
  version: '1.0.0',
  status: 'active',
  conceptIds: psicometriaConceptos.map((c) => c.id),
}

export { psicometriaConceptos }
