import type { Concept } from '@/types/core'

export const inferencial: Concept = {
  id: 'estadistica-inferencial',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Estadística inferencial',
  summary:
    'La estadística inferencial permite hacer conclusiones sobre una población a partir de los datos de una muestra. Incluye dos procedimientos principales: la estimación (calcular parámetros poblacionales con intervalos de confianza) y la prueba de hipótesis (evaluar la probabilidad de que los datos observados sean compatibles con la hipótesis nula).',
  explanation: `La estadística descriptiva describe lo que se observa en la muestra. La estadística inferencial va más allá: usa la muestra para hacer afirmaciones sobre la población de la que proviene, siempre con cierto grado de incertidumbre.

**La lógica de la inferencia estadística**

La inferencia parte de una suposición sobre la distribución de los estadísticos muestrales. Si se extrajera una gran cantidad de muestras aleatorias de la misma población y se calculara el mismo estadístico (p. ej., la media) en cada una, se obtendría una distribución de muestreo de ese estadístico. Esta distribución tiene propiedades conocidas matemáticamente (teorema central del límite).

El *error estándar* (SE) es la desviación estándar de la distribución de muestreo. Para la media muestral: SE = SD / √n. El error estándar disminuye al aumentar el tamaño muestral: muestras más grandes producen estimaciones más precisas.

**Estimación por intervalos de confianza**

Un intervalo de confianza del 95% para una media indica que, si se repitiese el procedimiento de muestreo y construcción del intervalo muchas veces, el 95% de los intervalos construidos contendría el verdadero parámetro poblacional. No es correcto decir que "hay 95% de probabilidad de que el parámetro esté en este intervalo específico."

Los intervalos de confianza son más informativos que los valores p porque comunican magnitud e incertidumbre simultáneamente. Se calculan como: IC = M ± (t_crítico × SE).

**Prueba de hipótesis (NHST)**

La lógica de la prueba de hipótesis es la siguiente:
1. Se formula la H₀ (no hay efecto o relación).
2. Se calcula el estadístico de prueba (t, F, χ²) que cuantifica la discrepancia entre los datos y lo que se esperaría si H₀ fuera verdadera.
3. Se calcula el valor p: la probabilidad de obtener un estadístico igual o más extremo que el observado, asumiendo que H₀ es verdadera.
4. Si p < α (habitualmente 0.05), se rechaza H₀.

**El valor p no es la probabilidad de que H₀ sea verdadera.** Es la probabilidad de los datos dado H₀. Esta distinción es frecuentemente malentendida.

**Significancia estadística vs. relevancia práctica**

Un resultado puede ser estadísticamente significativo (p < .05) sin ser prácticamente relevante, especialmente con muestras grandes. Un resultado puede no ser significativo y aun así ser importante (muestras pequeñas con poca potencia). El tamaño del efecto cuantifica la magnitud de la diferencia o relación, independientemente de la significancia estadística.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Interpretación correcta del intervalo de confianza',
      description:
        'Un estudio obtiene una diferencia de medias de 3.2 puntos en bienestar entre grupos, IC 95% [0.8, 5.6]. La interpretación correcta: si replicáramos este estudio muchas veces, el 95% de los intervalos construidos contendría la diferencia verdadera. El intervalo no incluye el cero, lo que es consistente con un efecto real. La diferencia mínima plausible es 0.8 y la máxima es 5.6.',
      applicableContext:
        'Muestra cómo comunicar resultados usando intervalos de confianza en lugar de solo el valor p.',
    },
    {
      id: 'ej-2',
      title: 'Significancia sin relevancia práctica',
      description:
        'Un estudio con n = 2000 encuentra que el bienestar es significativamente mayor en mujeres que en hombres (t(1998) = 2.14, p = .032), con una diferencia de medias de 0.3 puntos en una escala de 1 a 100, d de Cohen = 0.10. El resultado es estadísticamente significativo, pero el tamaño del efecto es negligible. La diferencia no tiene relevancia práctica.',
      applicableContext:
        'Ilustra por qué el valor p por sí solo no es suficiente para evaluar la importancia de un resultado.',
    },
  ],
  commonMistakes: [
    'Interpretar el valor p como la probabilidad de que H₀ sea verdadera, o como la probabilidad de error al rechazarla.',
    'Concluir que si p > .05, "no hay efecto"; la no significancia puede deberse a falta de potencia estadística.',
    'No reportar el tamaño del efecto junto al valor p, omitiendo información crítica sobre la magnitud del resultado.',
    'Interpretar el intervalo de confianza como "hay 95% de probabilidad de que el parámetro esté en este rango específico", confundiendo probabilidad frecuentista con probabilidad bayesiana.',
    'Reportar "tendencia a la significancia" (p = .07) como si fuera un resultado relevante; los umbrales de significancia son convencionales y no deben interpretarse como gradaciones.',
  ],
  prerequisites: ['estadistica-descriptiva', 'metodologia-hipotesis', 'metodologia-muestreo'],
  relatedConcepts: [
    'estadistica-error-tipo-i-ii',
    'estadistica-supuestos',
    'estadistica-interpretacion',
  ],
  masteryCriteria: [
    'Explicar la lógica de la distribución de muestreo y su relación con el error estándar.',
    'Interpretar correctamente un intervalo de confianza del 95%.',
    'Describir el proceso de la prueba de hipótesis nula (NHST) paso a paso.',
    'Distinguir significancia estadística de relevancia práctica y explicar el rol del tamaño del efecto.',
  ],
}
