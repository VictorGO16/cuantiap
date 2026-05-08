import type { Concept } from '@/types/core'

export const evidenciaValidez: Concept = {
  id: 'psicometria-evidencia-validez',
  moduleId: 'psicometria',
  version: '1.0.0',
  title: 'Evidencias de validez psicométrica',
  summary:
    'La evidencia de validez en psicometría se organiza en fuentes múltiples que, en conjunto, sustentan la interpretación de los puntajes de un instrumento. El proceso de validación incluye análisis factorial (exploratorio y confirmatorio), evaluación de validez convergente y discriminante, y verificación de validez de criterio.',
  explanation: `La validación de un instrumento es un proceso continuo, no un evento único. Cada estudio que usa el instrumento contribuye o cuestiona la evidencia acumulada.

**Análisis factorial exploratorio (AFE)**

El AFE se usa cuando no existe una teoría suficientemente precisa que especifique la estructura del constructo. Examina las correlaciones entre ítems para identificar agrupaciones naturales (factores). Las decisiones clave incluyen el método de extracción (habitualmente factorización de ejes principales o máxima verosimilitud), el método de rotación (oblicua como Promax u oblimin si se espera que los factores correlacionen; ortogonal como Varimax si no) y el número de factores a retener (análisis paralelo, MAP de Velicer, scree plot).

El AFE genera hipótesis sobre la estructura. Estas hipótesis deben contrastarse en una muestra independiente con AFC.

**Análisis factorial confirmatorio (AFC)**

El AFC evalúa el ajuste de un modelo factorial especificado a priori a los datos observados. Los índices de ajuste más usados son: CFI (Comparative Fit Index, >.90 aceptable, >.95 excelente), RMSEA (Root Mean Square Error of Approximation, <.08 aceptable, <.06 excelente), SRMR (Standardized Root Mean Residual, <.08). El chi-cuadrado es sensible al tamaño muestral y no se usa como criterio único.

Las cargas factoriales indican qué tan bien cada ítem representa al factor. Cargas ≥ .40 se consideran sustanciales. Las comunalidades (h²) indican qué proporción de la varianza del ítem es explicada por el factor.

**Validez convergente y discriminante (Matriz Multirasgo-Multimétodo)**

La matriz MTMM de Campbell y Fiske (1959) es un diseño para evaluar validez convergente (el instrumento correlaciona con otras medidas del mismo constructo) y discriminante (el instrumento no correlaciona con medidas de constructos distintos). En la práctica, se evalúa comparando correlaciones: la validez convergente requiere que las correlaciones entre medidas del mismo constructo sean significativas y sustanciales; la discriminante requiere que sean menores que las convergentes.

El AVE (Varianza Media Extraída) y la raíz cuadrada del AVE se usan en el marco del modelamiento de ecuaciones estructurales para evaluar validez discriminante.

**Validez de criterio**

La validez de criterio evalúa si el instrumento predice o se asocia con un criterio externo relevante. La validez concurrente examina la relación con un criterio medido al mismo tiempo; la validez predictiva examina la relación con un criterio medido en el futuro.

**Invarianza de medición**

Antes de comparar puntajes entre grupos, debe verificarse si el instrumento funciona de la misma manera en todos ellos. Se evalúa mediante AFC multigrupo en etapas: invarianza configural (misma estructura), métrica (iguales cargas), escalar (iguales interceptos) y estricta (iguales residuos).`,
  examples: [
    {
      id: 'ej-1',
      title: 'Interpretación de índices de ajuste en AFC',
      description:
        'Una escala de regulación emocional de 12 ítems (3 factores) obtiene en AFC: χ²(51) = 87.3, p < .001; CFI = .96; RMSEA = .051 [.030, .072]; SRMR = .055. El CFI y el RMSEA son buenos; el SRMR es adecuado. El chi-cuadrado es significativo, pero esto es esperable en muestras grandes. El ajuste global es satisfactorio.',
      applicableContext:
        'Muestra cómo evaluar el ajuste de un modelo factorial a partir de múltiples índices y no solo el chi-cuadrado.',
    },
    {
      id: 'ej-2',
      title: 'Evidencia convergente y discriminante',
      description:
        'Una nueva escala de mindfulness (r = .62 con otra escala de mindfulness establecida) muestra buena validez convergente. Su correlación con una escala de extroversión es r = .08 (no significativa), lo que apoya la validez discriminante: el instrumento mide algo distinto de la extroversión.',
      applicableContext:
        'Ilustra cómo interpretar la red de correlaciones con otras variables como evidencia de validez.',
    },
  ],
  commonMistakes: [
    'Reportar solo el chi-cuadrado del AFC sin considerar índices complementarios (CFI, RMSEA, SRMR), lo que lleva a conclusiones incorrectas en muestras grandes.',
    'Usar el mismo conjunto de datos para el AFE y el AFC, lo que produce resultados sobreoptimistas.',
    'Confundir una carga factorial alta con validez: la carga indica ajuste al modelo, no que el ítem mide el constructo correcto.',
    'No verificar la invarianza de medición antes de comparar grupos, produciendo comparaciones que asumen equivalencia sin demostrarla.',
    'Interpretar el ajuste del modelo AFC como evidencia suficiente de validez, ignorando la necesidad de validez convergente y discriminante.',
  ],
  prerequisites: ['psicometria-fundamentos', 'psicometria-construccion-instrumentos', 'medicion-validez'],
  relatedConcepts: [
    'psicometria-confiabilidad-clasica',
    'estadistica-supuestos',
    'medicion-sesgo',
  ],
  masteryCriteria: [
    'Describir las diferencias entre AFE y AFC y cuándo usar cada uno.',
    'Interpretar los índices de ajuste del AFC (CFI, RMSEA, SRMR) según los criterios estándar.',
    'Explicar qué es la validez convergente y discriminante y cómo se evalúa.',
    'Describir el concepto de invarianza de medición y por qué es necesario verificarla antes de comparar grupos.',
  ],
}
