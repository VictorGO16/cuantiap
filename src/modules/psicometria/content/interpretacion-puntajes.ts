import type { Concept } from '@/types/core'

export const interpretacionPuntajes: Concept = {
  id: 'psicometria-interpretacion-puntajes',
  moduleId: 'psicometria',
  version: '1.0.0',
  title: 'Interpretación de puntajes',
  summary:
    'Los puntajes crudos de un test raramente son interpretables por sí solos. La psicometría ofrece dos marcos de interpretación: la interpretación referida a normas (el puntaje se interpreta comparándolo con una distribución de referencia) y la interpretación referida al criterio (el puntaje se compara con un estándar de desempeño o con un punto de corte clínicamente relevante).',
  explanation: `Un puntaje crudo de 47 en una escala de estrés no dice nada por sí mismo. ¿Es alto o bajo? ¿Es preocupante? Para responder estas preguntas, el puntaje debe interpretarse en un marco de referencia.

**Interpretación referida a normas (IRN)**

La IRN compara el puntaje de una persona con la distribución de puntajes de un grupo de referencia (la muestra normativa). Los tipos de puntajes normalizados más frecuentes son:

*Puntajes Z (puntajes estándar)*: transforman el puntaje crudo a una distribución con media = 0 y SD = 1. Z = (X − M) / SD. Un puntaje Z = +1.5 indica que la persona está 1.5 desviaciones estándar por encima de la media de referencia.

*Puntajes T*: transforman el puntaje Z a una distribución con media = 50 y SD = 10. T = 50 + 10Z. Se usan para evitar puntajes negativos y facilitar la comunicación.

*Percentiles*: indican el porcentaje de la muestra normativa que obtiene un puntaje igual o menor. Un percentil 75 significa que el 75% del grupo de referencia obtiene puntajes iguales o menores.

La IRN requiere que la muestra normativa sea representativa de la población a la que pertenece la persona evaluada. Usar normas de una población diferente (otro país, otra época, otro grupo etario) produce interpretaciones inválidas.

**Interpretación referida al criterio (IRC)**

La IRC compara el puntaje con un estándar predefinido, independientemente de la distribución de la muestra. El resultado es categórico: la persona supera o no el estándar.

Los puntos de corte clínicos (p. ej., "puntaje ≥ 10 en el PHQ-9 indica depresión moderada") se establecen a partir de estudios de sensibilidad y especificidad con respecto a un diagnóstico de referencia (criterio dorado). Un punto de corte válido maximiza la sensibilidad (detecta los casos reales) y la especificidad (no clasifica como casos a quienes no lo son).

**Regresión a la media**

Un fenómeno importante en la interpretación de puntajes repetidos: si una persona obtuvo un puntaje extremo (muy alto o muy bajo) en la primera medición, es probable que en la segunda medición obtenga un puntaje más cercano a la media del grupo, aunque no haya habido ninguna intervención. Esto se llama regresión a la media y debe considerarse al interpretar cambios en estudios pre-post sin grupo de control.

**Diferencia mínimamente detectable (MDC) y diferencia mínimamente importante (DMI)**

La MDC es el cambio en el puntaje que supera el error de medición, es decir, un cambio real más allá del ruido. La DMI es el cambio que tiene importancia clínica o práctica desde la perspectiva del paciente o usuario. Un cambio puede superar la MDC (cambio real) pero no la DMI (no significativo en la práctica).`,
  examples: [
    {
      id: 'ej-1',
      title: 'Transformación a puntaje T e interpretación',
      description:
        'Una persona obtiene un puntaje crudo de 63 en una escala de ansiedad (M = 50, SD = 10, norma en adultos). Z = (63−50)/10 = 1.3. T = 50 + 10(1.3) = 63. Esto indica que la persona está en el percentil aproximado 90, o sea, su nivel de ansiedad es mayor al del 90% de la muestra normativa. Este puntaje T es elevado y clínicamente relevante.',
      applicableContext:
        'Muestra el proceso de transformación de puntaje crudo a puntaje normativo e interpretación.',
    },
    {
      id: 'ej-2',
      title: 'Regresión a la media en estudios pre-post',
      description:
        'Un grupo de estudiantes con alta ansiedad de prueba (percentil 90 en prettest) participa en una intervención. En el postest, su puntaje promedio baja al percentil 75. Sin un grupo control, no es posible saber si la mejora se debe a la intervención o a la regresión a la media: los puntajes extremos tienden a acercarse al promedio en mediciones repetidas.',
      applicableContext:
        'Ilustra por qué la regresión a la media es una amenaza a la validez interna en diseños pre-post sin control.',
    },
  ],
  commonMistakes: [
    'Interpretar puntajes crudos sin transformarlos a una escala normativa, lo que hace imposible saber si el puntaje es alto, bajo o promedio.',
    'Usar normas de una población diferente a la del evaluado (normas extranjeras o de otro grupo etario), lo que invalida la interpretación.',
    'Atribuir cambios en puntajes pre-post exclusivamente a la intervención sin considerar la regresión a la media.',
    'Confundir la diferencia mínimamente detectable (cambio real, más allá del error) con la diferencia mínimamente importante (cambio clínicamente significativo).',
    'Establecer puntos de corte clínicos de manera arbitraria sin sustentarlos en estudios de sensibilidad y especificidad con un criterio de referencia.',
  ],
  prerequisites: ['psicometria-fundamentos', 'psicometria-confiabilidad-clasica', 'estadistica-descriptiva'],
  relatedConcepts: [
    'estadistica-inferencial',
    'estadistica-interpretacion',
    'medicion-niveles-medicion',
  ],
  masteryCriteria: [
    'Transformar un puntaje crudo a puntaje Z, puntaje T y percentil dados la media y la desviación estándar de la muestra normativa.',
    'Distinguir interpretación referida a normas de interpretación referida al criterio con ejemplos.',
    'Explicar qué es la regresión a la media y cuándo es una amenaza para la interpretación de resultados.',
    'Describir la diferencia entre MDC y DMI y señalar su relevancia en investigación con diseños pre-post.',
  ],
}
