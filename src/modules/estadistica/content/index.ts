import { descriptiva } from './descriptiva'
import { inferencial } from './inferencial'
import { supuestos } from './supuestos'
import { errorTipoIII } from './error-tipo-i-ii'
import { pruebasParametricas } from './pruebas-parametricas'
import { pruebasNoParametricas } from './pruebas-no-parametricas'
import { interpretacion } from './interpretacion'
import type { Concept } from '@/types/core'

export const estadisticaConceptos: Concept[] = [
  descriptiva,
  inferencial,
  supuestos,
  errorTipoIII,
  pruebasParametricas,
  pruebasNoParametricas,
  interpretacion,
]

export {
  descriptiva,
  inferencial,
  supuestos,
  errorTipoIII,
  pruebasParametricas,
  pruebasNoParametricas,
  interpretacion,
}
