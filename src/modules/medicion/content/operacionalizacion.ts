import type { Concept } from '@/types/core'

export const operacionalizacion: Concept = {
  id: 'medicion-operacionalizacion',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Operacionalización de variables',
  summary:
    'Operacionalizar una variable consiste en especificar los procedimientos concretos mediante los cuales será medida: qué instrumento se usará, qué indicadores se observarán, cómo se calcularán los puntajes. Es el puente entre la definición conceptual y la medición empírica.',
  explanation: `La operacionalización es el proceso que convierte un concepto abstracto en algo medible. Sin operacionalización, las variables permanecen en el nivel de la teoría y no pueden estudiarse empíricamente.

El proceso de operacionalización consta de dos pasos relacionados pero distintos.

La *definición conceptual* describe el constructo en términos teóricos: qué es, cuáles son sus componentes, cómo se distingue de constructos relacionados. Por ejemplo: "el burnout académico es un estado de agotamiento emocional, cinismo hacia las obligaciones académicas y sensación de ineficacia, derivado de la exposición crónica a demandas académicas excesivas."

La *definición operacional* especifica cómo se medirá ese constructo en el estudio: "el burnout académico se medirá con el MBI-SS (Maslach Burnout Inventory — Student Survey), que produce puntajes en tres subescalas (agotamiento, cinismo, eficacia académica). Se usará el puntaje total ponderado según las instrucciones del manual."

Una misma variable puede operacionalizarse de distintas maneras, y distintas operacionalizaciones pueden dar resultados diferentes. Esto es relevante para la replicabilidad: si dos estudios miden "ansiedad" con instrumentos distintos, sus resultados no son directamente comparables.

Los indicadores son las manifestaciones observables del constructo. Para el constructo "apoyo social percibido", los indicadores podrían ser: "percibo que cuento con personas a quienes recurrir en momentos difíciles", "siento que las personas cercanas me valoran", "tengo alguien con quien hablar cuando tengo problemas."

El nivel de medición que produce la operacionalización tiene consecuencias directas para los análisis estadísticos. Una variable operacionalizada mediante una escala Likert de 5 puntos genera datos ordinales en sentido estricto, aunque frecuentemente se tratan como de intervalo. Esta decisión analítica debe justificarse.

La calidad de la operacionalización se evalúa mediante la validez del instrumento (¿mide lo que dice medir?) y la confiabilidad (¿lo mide con consistencia?).`,
  examples: [
    {
      id: 'ej-1',
      title: 'Operacionalización de autoeficacia académica',
      description:
        'Definición conceptual: "la autoeficacia académica es la creencia de los estudiantes en su capacidad para realizar exitosamente las tareas académicas requeridas." Definición operacional: "se medirá con la Escala de Autoeficacia Académica de Blanco et al. (2011), de 8 ítems tipo Likert (1 a 5), produciéndose un puntaje continuo de 8 a 40. Puntajes más altos indican mayor autoeficacia percibida."',
      applicableContext:
        'Muestra la estructura completa de una operacionalización bien elaborada: definición conceptual, instrumento, escala y dirección del puntaje.',
    },
    {
      id: 'ej-2',
      title: 'Múltiples operacionalizaciones del mismo constructo',
      description:
        'La depresión puede operacionalizarse con el BDI-II (21 ítems, autoinforme, evalúa las últimas dos semanas), el PHQ-9 (9 ítems, basado en criterios DSM) o una entrevista estructurada clínica (SCID). Estas operacionalizaciones miden aspectos parcialmente distintos del mismo constructo, lo que explica que los estudios no siempre sean directamente comparables.',
      applicableContext:
        'Ilustra por qué la elección del instrumento de medición es una decisión metodológica relevante.',
    },
  ],
  commonMistakes: [
    'Presentar una definición conceptual vaga e incompleta y pasar directamente al instrumento, sin articular el puente teórico.',
    'Usar un instrumento validado en otra cultura o idioma sin verificar si la operacionalización es equivalente en el contexto del estudio.',
    'Confundir el indicador con el constructo: "el puntaje en el BDI-II" no es "la depresión", es una medida del constructo.',
    'No reportar el sistema de puntuación del instrumento, haciendo imposible la replicación.',
    'Elegir el instrumento por conveniencia o disponibilidad en lugar de por la calidad de su operacionalización del constructo de interés.',
  ],
  prerequisites: ['medicion-constructos', 'medicion-niveles-medicion'],
  relatedConcepts: [
    'medicion-instrumentos',
    'medicion-validez',
    'medicion-confiabilidad',
    'psicometria-construccion-instrumentos',
  ],
  masteryCriteria: [
    'Distinguir definición conceptual de definición operacional para una variable dada.',
    'Identificar los indicadores de un constructo a partir de su definición conceptual.',
    'Explicar por qué diferentes operacionalizaciones del mismo constructo pueden producir resultados no comparables.',
    'Evaluar si una operacionalización es coherente con la definición conceptual del constructo.',
  ],
}
