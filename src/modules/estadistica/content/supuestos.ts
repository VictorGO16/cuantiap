import type { Concept } from '@/types/core'

export const supuestos: Concept = {
  id: 'estadistica-supuestos',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Supuestos estadísticos',
  summary:
    'Los estadísticos paramétricos —prueba t, ANOVA, correlación de Pearson, regresión— asumen que los datos cumplen ciertos supuestos: normalidad de la distribución, homogeneidad de varianzas, independencia de las observaciones y, según el análisis, nivel de medición de intervalo o razón. Verificar estos supuestos antes del análisis es parte del rigor metodológico.',
  explanation: `Los estadísticos paramétricos son robustos y estadísticamente potentes, pero su validez depende de que los datos cumplan ciertos supuestos. Ignorar estos supuestos no invalida automáticamente el análisis, pero puede producir resultados engañosos —especialmente en muestras pequeñas o cuando las violaciones son severas.

**Normalidad**

Muchas pruebas paramétricas asumen que la variable de interés (o los residuos del modelo) siguen una distribución normal en la población. En la práctica, el teorema central del límite garantiza que con muestras grandes (n > 30, aunque el umbral varía) la distribución de las medias muestrales tiende a la normalidad incluso si los datos individuales no son normales.

Las pruebas de normalidad más usadas son Shapiro-Wilk (recomendada para muestras pequeñas, n < 50) y Kolmogorov-Smirnov. Sin embargo, con muestras grandes estas pruebas detectan desviaciones triviales como significativas. Es preferible evaluar la normalidad mediante inspección visual (histograma, gráfico Q-Q) y los estadísticos de asimetría y curtosis.

**Homogeneidad de varianzas (homocedasticidad)**

Pruebas como la t de Student para grupos independientes y el ANOVA asumen que las varianzas de los grupos comparados son iguales (o similares). La prueba de Levene evalúa este supuesto. Si se viola, puede usarse la corrección de Welch para la prueba t o pruebas robustas para el ANOVA.

**Independencia de las observaciones**

Cada observación debe ser independiente de las demás. Este supuesto se viola cuando los datos son multinivel (estudiantes dentro de escuelas), cuando las medidas son repetidas (mismo sujeto en distintos tiempos) o cuando existe dependencia espacial o temporal. Las violaciones de independencia producen errores estándar subestimados y tasas de error tipo I infladas.

**Ausencia de outliers influyentes**

Los outliers pueden distorsionar los estadísticos paramétricos. En regresión, los residuos studentizados, los valores de apalancamiento (leverage) y la distancia de Cook permiten identificar observaciones influyentes.

**Linealidad y homocedasticidad en regresión**

En regresión lineal, la relación entre el predictor y el criterio debe ser lineal y los residuos deben tener varianza constante. Los gráficos de residuos (residuos vs. valores ajustados) son la herramienta estándar para evaluar estos supuestos.

**Alternativas cuando los supuestos no se cumplen**

Cuando los supuestos paramétricos se violan severamente, las alternativas son: (1) pruebas no paramétricas (Mann-Whitney, Kruskal-Wallis), que no asumen normalidad; (2) transformaciones de los datos (logarítmica, raíz cuadrada); (3) bootstrapping, que no requiere supuestos distribucionales.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Evaluación visual de normalidad',
      description:
        'Un investigador aplica la prueba de Shapiro-Wilk a una variable de ingresos (n = 40) y obtiene W = .83, p < .001, rechazando la normalidad. Sin embargo, el histograma muestra una distribución unimodal con leve asimetría positiva. Con n = 40, la t de Student es razonablemente robusta a esta desviación. La decisión de usar una alternativa no paramétrica depende de la magnitud de la asimetría, no solo del valor p de Shapiro-Wilk.',
      applicableContext:
        'Ilustra por qué la evaluación de supuestos requiere juicio más allá de los resultados mecánicos de una prueba formal.',
    },
    {
      id: 'ej-2',
      title: 'Violación de independencia en datos anidados',
      description:
        'Un estudio compara el rendimiento de estudiantes en 20 escuelas. Si se aplica una prueba t ignorando la estructura anidada (estudiantes dentro de escuelas), los errores estándar estarán subestimados porque los estudiantes de la misma escuela no son independientes entre sí. La alternativa correcta es un modelo mixto o multinivel que incorpora la estructura de agrupamiento.',
      applicableContext:
        'Muestra una violación del supuesto de independencia frecuente en investigación educativa y sus consecuencias.',
    },
  ],
  commonMistakes: [
    'Aplicar la prueba de Shapiro-Wilk en muestras grandes y rechazar la normalidad por desviaciones mínimas que no afectan el análisis.',
    'Ignorar el supuesto de independencia en datos que tienen estructura anidada (estudiantes en escuelas, pacientes en hospitales).',
    'Usar la prueba de Levene como criterio definitivo para elegir entre t de Student y t de Welch, sin considerar el tamaño de muestra ni la magnitud de la diferencia de varianzas.',
    'Transformar los datos sin reportarlo ni justificarlo, lo que dificulta la interpretación y la replicabilidad.',
    'Asumir que las pruebas no paramétricas son "más seguras" o "sin supuestos"; también tienen supuestos (principalmente, que las distribuciones tienen la misma forma cuando se usan para comparar medianas).',
  ],
  prerequisites: ['estadistica-descriptiva', 'estadistica-inferencial'],
  relatedConcepts: [
    'estadistica-pruebas-parametricas',
    'estadistica-pruebas-no-parametricas',
    'medicion-niveles-medicion',
  ],
  masteryCriteria: [
    'Identificar los supuestos de los estadísticos paramétricos más comunes (prueba t, ANOVA, correlación de Pearson).',
    'Evaluar el supuesto de normalidad usando múltiples fuentes de evidencia (inspección visual, estadísticos de asimetría, pruebas formales).',
    'Seleccionar la alternativa apropiada cuando los supuestos paramétricos se violan severamente.',
    'Explicar por qué la violación del supuesto de independencia es especialmente problemática y cuándo ocurre.',
  ],
}
