import type { Concept } from '@/types/core'

export const variables: Concept = {
  id: 'metodologia-variables',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Variables de investigación',
  summary:
    'Una variable es cualquier característica, atributo o propiedad que puede tomar distintos valores. En investigación cuantitativa, las variables se clasifican según su función en el estudio —dependiente, independiente, covariable— y según su nivel de medición, lo que determina qué análisis estadísticos son apropiados.',
  explanation: `Las variables son las unidades básicas de la investigación cuantitativa. Identificarlas correctamente y entender su rol en el diseño es indispensable para construir hipótesis coherentes y elegir los análisis adecuados.

**Variable independiente (VI):** es la variable que el investigador manipula (en diseños experimentales) o que se postula como predictora o antecedente (en diseños no experimentales). Es la variable "causa" o "factor" en la lógica del estudio.

**Variable dependiente (VD):** es la variable que el investigador mide y que se espera que cambie o se explique en función de la VI. Es el "resultado" o "criterio" del estudio.

**Variables covariables o de control:** son variables que pueden influir en la VD pero no son el foco del estudio. Se controlan estadística o metodológicamente para aislar el efecto de la VI.

**Variables moderadoras:** modifican la relación entre VI y VD. La fuerza o dirección de la relación cambia en función del nivel de la variable moderadora.

**Variables mediadoras:** explican el mecanismo por el cual la VI influye en la VD. Son el "por qué" de la relación.

La operacionalización de una variable consiste en definir cómo se medirá: qué instrumento, qué escala, qué indicadores. Una variable puede operacionalizarse de distintas maneras; la elección debe justificarse teórica y psicométricamente.

El nivel de medición de una variable determina las operaciones matemáticas y los análisis estadísticos permitidos. Las variables nominales permiten clasificar; las ordinales, ordenar; las de intervalo, calcular diferencias; las de razón, calcular proporciones (ver concepto "Niveles de medición").

La definición conceptual describe la variable en términos teóricos (qué es el constructo). La definición operacional describe cómo se medirá en el estudio (qué instrumento, qué puntuación). Ambas definiciones deben ser coherentes: el instrumento debe medir lo que el constructo define.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Variables en estudio sobre estrés y rendimiento',
      description:
        'VI: nivel de estrés académico (medido con el SISCO). VD: rendimiento académico (promedio de notas del semestre). Variable covariable: horas de estudio semanales. La investigadora controla estadísticamente las horas de estudio para aislar el efecto del estrés sobre el rendimiento.',
      applicableContext:
        'Ilustra la identificación de VI, VD y covariables en un diseño correlacional.',
    },
    {
      id: 'ej-2',
      title: 'Variable moderadora en investigación sobre intervención',
      description:
        'Un estudio evalúa el efecto de una intervención de regulación emocional (VI) sobre la ansiedad (VD). El género actúa como moderador: la intervención podría ser más efectiva en mujeres que en hombres. La moderación se analiza mediante términos de interacción en el modelo de regresión.',
      applicableContext:
        'Muestra cómo una tercera variable puede modificar la relación entre VI y VD.',
    },
  ],
  commonMistakes: [
    'Confundir VI y VD en estudios no experimentales, donde la dirección de la relación es teórica, no manipulativa.',
    'Operacionalizar una variable con un instrumento que mide un constructo diferente al que la definición conceptual describe.',
    'Ignorar las variables de confusión o covariables relevantes, lo que amenaza la validez interna del estudio.',
    'Asumir que cualquier variable numérica tiene nivel de intervalo sin verificar los supuestos del instrumento.',
    'Confundir variable moderadora y mediadora: la moderadora cambia la fuerza de la relación; la mediadora explica el mecanismo.',
  ],
  prerequisites: ['metodologia-problema-investigacion', 'metodologia-hipotesis'],
  relatedConcepts: [
    'medicion-constructos',
    'medicion-operacionalizacion',
    'medicion-niveles-medicion',
    'metodologia-disenos',
  ],
  masteryCriteria: [
    'Identificar la VI y la VD en una descripción de estudio cuantitativo.',
    'Distinguir variables moderadoras de mediadoras y explicar su función en el modelo.',
    'Elaborar una definición conceptual y una definición operacional para una variable dada.',
    'Explicar por qué el nivel de medición de una variable restringe los análisis estadísticos posibles.',
  ],
}
