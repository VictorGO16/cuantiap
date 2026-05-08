import type { Concept } from '@/types/core'

export const validez: Concept = {
  id: 'medicion-validez',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Validez',
  summary:
    'La validez se refiere al grado en que un instrumento mide lo que afirma medir. Los estándares actuales (AERA, APA, NCME, 2014) conceptualizan la validez como un juicio integrado sustentado en diferentes fuentes de evidencia: contenido, estructura interna, relaciones con otras variables, procesos de respuesta y consecuencias del uso.',
  explanation: `La validez no es una propiedad del instrumento en abstracto, sino de las inferencias que se hacen a partir de sus puntajes en un contexto específico. Un test puede ser válido para medir depresión en adultos y no serlo en adolescentes, o válido para cribado y no para diagnóstico.

Los estándares actuales (AERA, APA y NCME, 2014) organizan las fuentes de evidencia de validez en cinco categorías:

**Evidencia basada en el contenido del instrumento**

Examina si los ítems del instrumento representan adecuada y exhaustivamente el dominio del constructo. Se evalúa mediante juicio de expertos: ¿los ítems cubren las distintas facetas del constructo? ¿Hay contenido relevante omitido? ¿Hay contenido irrelevante incluido? El índice de validez de contenido (IVC) de Lawshe es una métrica frecuente para cuantificar el acuerdo entre jueces.

**Evidencia basada en la estructura interna**

Examina si las relaciones entre los ítems son consistentes con la estructura del constructo postulada por la teoría. Un análisis factorial confirmatorio (AFC) evalúa si los datos se ajustan a un modelo específico (p. ej., un constructo unidimensional vs. dos factores correlacionados). Si el instrumento postula que mide un constructo unidimensional, los ítems deben correlacionar entre sí y cargar en un solo factor.

**Evidencia basada en relaciones con otras variables**

Incluye evidencia convergente (el instrumento correlaciona con medidas de constructos teóricamente relacionados), discriminante (el instrumento no correlaciona con medidas de constructos teóricamente no relacionados) y de criterio (el instrumento predice un criterio externo relevante, ya sea concurrente o predictivo).

**Evidencia basada en los procesos de respuesta**

Examina si los participantes comprenden e interpretan los ítems de la manera esperada. Se evalúa mediante entrevistas cognitivas, protocolo de pensamiento en voz alta u otras técnicas cualitativas.

**Evidencia basada en las consecuencias del uso**

Considera el impacto del uso del instrumento: ¿produce decisiones justas para distintos grupos? ¿Existen sesgos sistemáticos que perjudiquen a subgrupos específicos?

El concepto de invarianza de medición (también llamado equivalencia de medición) es relevante cuando se comparan grupos: antes de comparar puntajes entre hombres y mujeres, o entre países, debe verificarse que el instrumento funciona de la misma manera en ambos grupos.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Evidencia convergente y discriminante',
      description:
        'Un nuevo instrumento de resiliencia se valida correlacionándolo con una escala de afrontamiento activo (convergente, r esperado > 0,40) y con una escala de neuroticismo (discriminante, r esperado bajo o negativo). Si la correlación convergente es alta y la discriminante es baja, hay evidencia de que el instrumento mide resiliencia y no otra variable.',
      applicableContext:
        'Muestra cómo la red de relaciones con otras variables apoya o cuestiona la interpretación del constructo.',
    },
    {
      id: 'ej-2',
      title: 'Análisis factorial confirmatorio como evidencia de estructura interna',
      description:
        'Los autores de una escala de autocompasión postulan tres factores: mindfulness, humanidad compartida y autoamabilidad. El AFC evalúa si los datos se ajustan a este modelo de tres factores. Si el ajuste es adecuado (CFI > .90, RMSEA < .08), hay evidencia de que la estructura interna es coherente con la teoría.',
      applicableContext:
        'Ilustra cómo el AFC contribuye a la evidencia de validez basada en la estructura interna.',
    },
  ],
  commonMistakes: [
    'Tratar la validez como una propiedad dicotómica (el instrumento "es válido" o "no lo es") en lugar de como un juicio gradual sustentado en múltiples fuentes de evidencia.',
    'Asumir que porque un instrumento fue validado en otro país o idioma, su validez se transfiere automáticamente al contexto del nuevo estudio.',
    'Confundir confiabilidad con validez: un instrumento puede ser muy consistente (confiable) y no medir el constructo que dice medir (no válido).',
    'Basar la evidencia de validez solo en el contenido o solo en una fuente, sin integrar múltiples tipos de evidencia.',
    'Ignorar la invarianza de medición al comparar grupos, lo que puede producir comparaciones de puntajes que no son equivalentes entre grupos.',
  ],
  prerequisites: ['medicion-constructos', 'medicion-operacionalizacion', 'medicion-instrumentos'],
  relatedConcepts: [
    'medicion-confiabilidad',
    'psicometria-evidencia-validez',
    'psicometria-construccion-instrumentos',
  ],
  masteryCriteria: [
    'Describir las cinco fuentes de evidencia de validez según los estándares AERA/APA/NCME (2014).',
    'Distinguir validez convergente de discriminante y explicar cómo se evalúa cada una.',
    'Explicar por qué la validez es dependiente del contexto de uso y no es una propiedad fija del instrumento.',
    'Identificar errores de razonamiento sobre validez en el método de un artículo publicado.',
  ],
}
