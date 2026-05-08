import type { Concept } from '@/types/core'

export const hipotesis: Concept = {
  id: 'metodologia-hipotesis',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Formulación de hipótesis',
  summary:
    'Una hipótesis es una proposición tentativa sobre la relación entre variables, formulada de manera que pueda ser sometida a prueba empírica. En investigación cuantitativa, la hipótesis guía el análisis estadístico y permite evaluar si los datos son consistentes con la predicción teórica del investigador.',
  explanation: `Las hipótesis son el puente entre la teoría y los datos. Expresan, de forma concreta y verificable, lo que el investigador espera encontrar basándose en el conocimiento previo y el marco teórico.

Una hipótesis bien formulada debe ser: falsificable (es posible encontrar evidencia en su contra), específica (menciona las variables y la naturaleza de su relación), y coherente con el diseño del estudio (solo hipótesis causales en diseños experimentales; hipótesis de asociación en correlacionales).

**Hipótesis de investigación (Hi):** es la predicción del investigador sobre la dirección o magnitud de la relación entre variables. Puede ser direccional ("el apoyo social se relaciona negativamente con el agotamiento") o no direccional ("el apoyo social y el agotamiento están relacionados").

**Hipótesis nula (H₀):** es la proposición de que no existe relación o diferencia entre las variables. Es la hipótesis que la prueba estadística intenta rechazar. La lógica de la inferencia estadística consiste en evaluar qué tan probable sería observar los datos obtenidos si la hipótesis nula fuera verdadera.

**Hipótesis alternativa (Ha):** equivale a la hipótesis de investigación en términos estadísticos. Cuando se rechaza H₀, se adopta Ha.

La distinción entre hipótesis direccional y no direccional tiene implicaciones para la prueba estadística: las hipótesis direccionales corresponden a pruebas unilaterales (one-tailed), mientras que las no direccionales corresponden a pruebas bilaterales (two-tailed). Las pruebas bilaterales son más conservadoras y más habituales en ciencias sociales.

No todos los estudios tienen hipótesis. Los estudios exploratorios y descriptivos suelen trabajar con preguntas de investigación en lugar de hipótesis, porque no hay teoría suficiente para anticipar resultados. Las hipótesis son apropiadas cuando existe un marco teórico que permite hacer predicciones fundadas.

La lógica de la prueba de hipótesis (NHST, Null Hypothesis Significance Testing) tiene limitaciones conocidas: el valor p no indica la magnitud del efecto, y la significancia estadística no equivale a relevancia práctica. Por esto, el reporte moderno de resultados incluye siempre el tamaño del efecto junto al valor p.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Hipótesis en estudio correlacional',
      description:
        'Hi: "El perfeccionismo autoorientado se asocia positivamente con los síntomas de ansiedad en estudiantes universitarios." H₀: "No existe relación entre el perfeccionismo autoorientado y los síntomas de ansiedad en estudiantes universitarios." La Hi es direccional y se contrasta con la H₀ mediante correlación de Pearson o Spearman según los supuestos del diseño.',
      applicableContext:
        'Modelo de formulación para estudios correlacionales con predicción direccional.',
    },
    {
      id: 'ej-2',
      title: 'Hipótesis en estudio cuasiexperimental',
      description:
        'Hi: "Los estudiantes que reciben retroalimentación formativa obtendrán puntajes más altos en la prueba de rendimiento que los que no la reciben." H₀: "No existe diferencia en los puntajes de rendimiento entre estudiantes con y sin retroalimentación formativa." La dirección está especificada, lo que implica una prueba unilateral.',
      applicableContext:
        'Ilustra hipótesis causal en diseño con grupos de comparación.',
    },
  ],
  commonMistakes: [
    'Formular hipótesis causales en estudios con diseño correlacional o no experimental, donde no es posible establecer causalidad.',
    'Confundir la hipótesis de investigación con la hipótesis nula; la prueba estadística contrasta la H₀, no directamente la Hi.',
    'Redactar hipótesis que no son falsificables, ya sea por ser demasiado vagas o por estar formuladas de modo que cualquier resultado las confirme.',
    'Incluir hipótesis en estudios exploratorios donde no existe teoría suficiente para justificar predicciones.',
    'Interpretar el rechazo de la H₀ como "prueba" de que la hipótesis de investigación es correcta, sin considerar el tamaño del efecto ni la replicabilidad.',
  ],
  prerequisites: ['metodologia-problema-investigacion', 'metodologia-objetivos'],
  relatedConcepts: [
    'metodologia-variables',
    'estadistica-inferencial',
    'estadistica-error-tipo-i-ii',
    'estadistica-interpretacion',
  ],
  masteryCriteria: [
    'Redactar una hipótesis de investigación y su correspondiente hipótesis nula para un problema dado.',
    'Distinguir entre hipótesis direccional y no direccional y señalar las implicaciones para la prueba estadística.',
    'Explicar la lógica de la prueba de hipótesis nula (NHST) y sus limitaciones.',
    'Identificar qué tipos de estudios justifican el uso de hipótesis y cuáles trabajan mejor con preguntas de investigación.',
  ],
}
