import { constructos } from './constructos'
import { operacionalizacion } from './operacionalizacion'
import { nivelesMedicion } from './niveles-medicion'
import { instrumentos } from './instrumentos'
import { validez } from './validez'
import { confiabilidad } from './confiabilidad'
import { sesgo } from './sesgo'
import type { Concept } from '@/types/core'

export const medicionConceptos: Concept[] = [
  constructos,
  operacionalizacion,
  nivelesMedicion,
  instrumentos,
  validez,
  confiabilidad,
  sesgo,
]

export {
  constructos,
  operacionalizacion,
  nivelesMedicion,
  instrumentos,
  validez,
  confiabilidad,
  sesgo,
}
