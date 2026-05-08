import type { Concept } from '@/types/core'

export const objetivos: Concept = {
  id: 'metodologia-objetivos',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Objetivos de investigación',
  summary:
    'Los objetivos de investigación especifican qué pretende lograr el estudio de manera concreta y verificable. Se distinguen entre objetivo general —que expresa el propósito global del estudio— y objetivos específicos —que descomponen ese propósito en acciones delimitadas y metodológicamente alcanzables.',
  explanation: `Los objetivos son la traducción operativa del problema de investigación: convierten la pregunta en una declaración de lo que el estudio hará. Un estudio bien diseñado debe poder verificarse: al finalizar, se debería poder constatar si cada objetivo fue alcanzado.

El objetivo general expresa el propósito central del estudio en una sola oración. Debe incluir un verbo que indique la acción epistemológica que el estudio realizará, las variables o fenómenos implicados y la población o contexto de interés. Ejemplos de verbos adecuados para metodología cuantitativa: determinar, establecer, analizar, comparar, examinar, evaluar, estimar, identificar. Verbos que señalan niveles más profundos de análisis (explicar, predecir, contrastar) implican diseños más complejos y deben usarse solo cuando el diseño lo justifica.

Los objetivos específicos descomponen el objetivo general en pasos metodológicamente secuenciales. Cada objetivo específico debe ser: (a) derivable del objetivo general, (b) abordable con los datos que el estudio recolectará, y (c) verificable mediante un análisis concreto.

Un error frecuente es confundir objetivos metodológicos con objetivos de conocimiento. "Aplicar el instrumento X" es un paso metodológico, no un objetivo de investigación. "Establecer la relación entre X e Y en la muestra" sí lo es.

La coherencia entre problema, objetivos e hipótesis es fundamental. Si la pregunta pregunta por una relación entre dos variables, el objetivo debe establecerla y la hipótesis debe anticipar el sentido de esa relación. Esta cadena lógica es lo que da coherencia interna al proyecto.

El alcance del estudio —exploratorio, descriptivo, correlacional, explicativo— debe reflejarse en los verbos usados en los objetivos. Un estudio descriptivo no puede tener objetivos que impliquen explicar causalidad, porque el diseño no lo permite.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Objetivo general bien formulado',
      description:
        '"Determinar la relación entre el apoyo social percibido y el agotamiento emocional en profesores de educación básica de la Región Metropolitana durante el año 2025." Incluye acción (determinar), variables (apoyo social percibido, agotamiento emocional), población (profesores de EB) y contexto temporal-geográfico.',
      applicableContext:
        'Modelo de redacción de objetivo general para un estudio correlacional.',
    },
    {
      id: 'ej-2',
      title: 'Desglose en objetivos específicos',
      description:
        'Del objetivo anterior se derivan: (1) Describir los niveles de apoyo social percibido en la muestra. (2) Describir los niveles de agotamiento emocional en la muestra. (3) Analizar la correlación entre apoyo social percibido y agotamiento emocional. (4) Comparar los niveles de agotamiento emocional según el nivel de apoyo social percibido (alto vs. bajo).',
      applicableContext:
        'Muestra cómo los objetivos específicos secuencian la investigación: primero describir, luego relacionar, luego comparar.',
    },
  ],
  commonMistakes: [
    'Redactar objetivos que no pueden verificarse al finalizar el estudio porque son demasiado abstractos o generales.',
    'Usar verbos que implican un nivel de conocimiento mayor al que el diseño permite (p. ej., "demostrar que X causa Y" en un diseño correlacional).',
    'Incluir pasos metodológicos como objetivos de investigación (p. ej., "recolectar datos con el cuestionario X").',
    'Formular objetivos específicos que no se derivan del objetivo general o que van más allá de lo que el estudio puede responder.',
    'No mantener coherencia lógica entre la pregunta de investigación, el objetivo general y los objetivos específicos.',
  ],
  prerequisites: ['metodologia-problema-investigacion'],
  relatedConcepts: ['metodologia-hipotesis', 'metodologia-variables', 'metodologia-disenos'],
  masteryCriteria: [
    'Redactar un objetivo general que incluya acción, variables y población de forma clara.',
    'Derivar objetivos específicos coherentes a partir de un objetivo general dado.',
    'Identificar verbos apropiados según el alcance del estudio (descriptivo, correlacional, explicativo).',
    'Detectar objetivos mal formulados: demasiado amplios, no verificables o methodológicamente inapropiados.',
  ],
}
