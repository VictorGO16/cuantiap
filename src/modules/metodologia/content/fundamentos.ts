import type { Concept } from '@/types/core'

export const fundamentos: Concept = {
  id: 'metodologia-fundamentos',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Fundamentos de la metodología cuantitativa',
  summary:
    'La metodología cuantitativa es el conjunto de procedimientos sistemáticos para generar conocimiento mediante la medición numérica, el análisis estadístico y la comprobación de hipótesis. Se apoya en un paradigma que asume la existencia de una realidad objetiva susceptible de ser medida y que busca explicaciones generalizables.',
  explanation: `La metodología cuantitativa no es simplemente el uso de números: es una forma de formular preguntas y construir respuestas sobre la realidad. Su origen está vinculado al positivismo y al empirismo clásico, que sostienen que el conocimiento válido proviene de la observación sistemática y verificable.

El paradigma cuantitativo parte de tres supuestos centrales. El primero es ontológico: existe una realidad independiente del observador, relativamente estable y susceptible de conocerse. El segundo es epistemológico: el investigador puede separarse del objeto de estudio y obtener datos objetivos. El tercero es metodológico: el camino para conocer esa realidad es la medición, la cuantificación y el análisis estadístico.

En psicología, esto se traduce en estudiar variables como el nivel de ansiedad, el rendimiento académico o la satisfacción laboral mediante instrumentos que producen puntajes, y luego analizar esos puntajes con técnicas estadísticas para extraer conclusiones sobre relaciones, diferencias o predicciones.

La investigación cuantitativa sigue una secuencia lógica: parte de una teoría o de conocimiento previo, formula preguntas e hipótesis, diseña una estrategia de recolección de datos, aplica procedimientos de medición estandarizados, analiza los datos y extrae conclusiones que pueden contrastarse con las hipótesis originales. Esta secuencia distingue la investigación cuantitativa de las formas de conocimiento cotidiano o intuitivo.

Una característica fundamental es la búsqueda de generalización: los resultados obtenidos en una muestra se interpretan como representativos de una población más amplia, siempre dentro de los límites del diseño y del procedimiento de muestreo utilizado. Esto requiere que los procedimientos sean explícitos y replicables: otro investigador, con los mismos datos y métodos, debería llegar a las mismas conclusiones.

La metodología cuantitativa no excluye otras formas de investigación. En ciencias sociales y psicología, coexiste con la metodología cualitativa, que aborda aspectos difíciles de cuantificar, como el significado subjetivo de las experiencias. Ambos enfoques son legítimos y complementarios; la elección depende de la pregunta de investigación.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Estudio sobre depresión y rendimiento académico',
      description:
        'Un investigador mide síntomas depresivos con el BDI-II y rendimiento con promedios de notas en una muestra de 200 estudiantes universitarios. Calcula la correlación entre ambas variables y concluye que existe una asociación negativa moderada.',
      applicableContext:
        'Ilustra el ciclo completo: hipótesis → medición → análisis → conclusión generalizable.',
    },
    {
      id: 'ej-2',
      title: 'Evaluación de una intervención para reducir el estrés',
      description:
        'Se aplica una intervención de mindfulness a un grupo experimental y se compara con un grupo control mediante puntajes de la escala PSS antes y después de la intervención. El análisis estadístico determina si la diferencia es significativa.',
      applicableContext:
        'Muestra cómo el enfoque cuantitativo permite atribuir cambios a una causa mediante comparación controlada.',
    },
  ],
  commonMistakes: [
    'Creer que "cuantitativo" equivale simplemente a usar números, sin considerar el marco conceptual que respalda la medición.',
    'Asumir que los resultados cuantitativos son automáticamente más objetivos o válidos que los cualitativos.',
    'Confundir el paradigma cuantitativo con el paradigma positivista estricto; la investigación cuantitativa contemporánea incorpora el postpositivismo, que reconoce la falibilidad del conocimiento.',
    'Omitir la justificación teórica del estudio y reducirlo a una recolección de datos sin marco conceptual.',
    'Ignorar las limitaciones de generalización cuando la muestra no es representativa de la población de interés.',
  ],
  prerequisites: [],
  relatedConcepts: [
    'metodologia-etica',
    'metodologia-problema-investigacion',
    'metodologia-hipotesis',
    'metodologia-disenos',
  ],
  masteryCriteria: [
    'Distinguir los supuestos ontológicos, epistemológicos y metodológicos del paradigma cuantitativo.',
    'Explicar qué significa que la investigación cuantitativa sea replicable y por qué eso importa.',
    'Identificar las etapas de la secuencia lógica de una investigación cuantitativa.',
    'Comparar ventajas y limitaciones del enfoque cuantitativo frente al cualitativo según el tipo de pregunta de investigación.',
  ],
}
