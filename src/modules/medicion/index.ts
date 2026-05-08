import type { ModuleMeta } from '@/types/core'
import { medicionConceptos } from './content'

export const medicionMeta: ModuleMeta = {
  id: 'medicion',
  name: 'Medición',
  description:
    'Fundamentos de la medición en psicología: constructos, operacionalización, niveles de medición, instrumentos, validez, confiabilidad y sesgo.',
  version: '1.0.0',
  status: 'active',
  conceptIds: medicionConceptos.map((c) => c.id),
}

export { medicionConceptos }
