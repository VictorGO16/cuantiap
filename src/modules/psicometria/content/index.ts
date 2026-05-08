import { fundamentos } from './fundamentos'
import { construccionInstrumentos } from './construccion-instrumentos'
import { evidenciaValidez } from './evidencia-validez'
import { confiabilidadClasica } from './confiabilidad-clasica'
import { interpretacionPuntajes } from './interpretacion-puntajes'
import type { Concept } from '@/types/core'

export const psicometriaConceptos: Concept[] = [
  fundamentos,
  construccionInstrumentos,
  evidenciaValidez,
  confiabilidadClasica,
  interpretacionPuntajes,
]

export {
  fundamentos,
  construccionInstrumentos,
  evidenciaValidez,
  confiabilidadClasica,
  interpretacionPuntajes,
}
