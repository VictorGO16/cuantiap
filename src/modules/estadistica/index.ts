import type { ModuleMeta } from '@/types/core'
import { estadisticaConceptos } from './content'

export const estadisticaMeta: ModuleMeta = {
  id: 'estadistica',
  name: 'Estadística',
  description:
    'Estadística descriptiva e inferencial aplicada a la investigación en psicología: supuestos, pruebas, tamaños del efecto e interpretación de resultados.',
  version: '1.0.0',
  status: 'active',
  conceptIds: estadisticaConceptos.map((c) => c.id),
}

export { estadisticaConceptos }
