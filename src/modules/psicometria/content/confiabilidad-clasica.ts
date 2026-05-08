import type { Concept } from '@/types/core'

export const confiabilidadClasica: Concept = {
  id: 'psicometria-confiabilidad-clasica',
  moduleId: 'psicometria',
  version: '1.0.0',
  title: 'Confiabilidad en la TCT',
  summary:
    'En el marco de la teoría clásica de los tests, la confiabilidad se estima mediante el alfa de Cronbach y el omega de McDonald. El alfa es el estimador más difundido, pero tiene supuestos restrictivos que rara vez se cumplen. El omega es más robusto y se recomienda como estimador principal en la práctica contemporánea.',
  explanation: `La confiabilidad en la TCT cuantifica qué proporción de la varianza de los puntajes observados corresponde a varianza verdadera. Esta proporción no puede calcularse directamente porque el puntaje verdadero es inobservable, pero puede estimarse mediante procedimientos indirectos.

**Alfa de Cronbach (α)**

El alfa de Cronbach se deriva del promedio de las correlaciones entre todos los pares de ítems del test. Su fórmula general es:

α = (k / (k−1)) × (1 − Σsᵢ² / s²ₓ)

Donde k es el número de ítems, Σsᵢ² es la suma de las varianzas de los ítems y s²ₓ es la varianza del puntaje total.

El alfa es un estimador de la confiabilidad **bajo el supuesto de que los ítems son tau-equivalentes**: todos los ítems miden el constructo con la misma precisión (igual carga factorial). Si este supuesto no se cumple —lo que es habitual—, el alfa subestima la confiabilidad real.

El alfa también aumenta mecánicamente al aumentar el número de ítems, independientemente de la calidad de los ítems. Esto significa que añadir ítems repetitivos puede elevar el alfa sin mejorar la medición.

**Omega de McDonald (ω)**

El omega de McDonald no requiere el supuesto de tau-equivalencia. Se calcula a partir de las cargas factoriales del modelo de medición:

ω = (Σλᵢ)² / ((Σλᵢ)² + Σθᵢᵢ)

Donde λᵢ son las cargas factoriales y θᵢᵢ son las varianzas de los errores únicos.

El omega es conceptualmente más coherente con la TCT porque refleja directamente la proporción de varianza del puntaje total que se debe al factor común. Es el estimador recomendado por la mayoría de las guías metodológicas actuales.

**Análisis de ítems**

El análisis ítem-total examina la correlación entre el puntaje en cada ítem y el puntaje total de la escala (excluyendo ese ítem). Ítems con correlación ítem-total corregida < .30 son candidatos a eliminación. El análisis de "alfa si se elimina el ítem" muestra cómo cambia el alfa global al quitar cada ítem, lo que guía decisiones de depuración.

**Coeficiente kappa y CCI**

Para escalas nominales (diagnósticos, categorías), el kappa de Cohen estima el acuerdo entre evaluadores descontando el acuerdo esperado por azar. Para escalas continuas, el coeficiente de correlación intraclase (CCI) estima la consistencia y la concordancia absoluta entre evaluadores. El CCI debe reportarse con su intervalo de confianza.

**Contexto de uso de la confiabilidad**

Los estándares para la confiabilidad dependen del uso del instrumento. En investigación con grupos, α o ω ≥ .70 es generalmente aceptable. En toma de decisiones clínicas sobre individuos (diagnóstico, clasificación), se requiere ≥ .90 porque el error de medición individual tiene consecuencias directas.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Alfa subestima la confiabilidad real',
      description:
        'Una escala de bienestar psicológico tiene tres ítems con cargas factoriales de .40, .70 y .85. El alfa es .68 (por debajo del umbral) pero el omega es .79 (aceptable), porque el alfa penaliza la heterogeneidad de cargas. Reportar solo el alfa llevaría a concluir erróneamente que la escala tiene baja confiabilidad.',
      applicableContext:
        'Ilustra por qué el omega es un estimador más preciso que el alfa cuando los ítems tienen cargas diferenciales.',
    },
    {
      id: 'ej-2',
      title: 'Análisis ítem-total en depuración de escala',
      description:
        'Una escala de 12 ítems tiene α = .75. El ítem 9 tiene correlación ítem-total de .08 y "α si se elimina" de .79. Esta combinación indica que el ítem 9 no aporta al constructo y su eliminación mejora la consistencia interna. Se elimina del instrumento final.',
      applicableContext:
        'Muestra el proceso estándar de depuración de ítems usando análisis ítem-total.',
    },
  ],
  commonMistakes: [
    'Reportar solo el alfa sin verificar si se cumple el supuesto de tau-equivalencia, ignorando el omega como alternativa más robusta.',
    'Eliminar ítems mecánicamente para maximizar el alfa, sin considerar si esos ítems son importantes para la representatividad del contenido del constructo.',
    'Asumir que el alfa ≥ .70 garantiza suficiente confiabilidad independientemente del uso del instrumento.',
    'Confundir alta consistencia interna con evidencia de unidimensionalidad; un instrumento multidimensional con factores correlacionados puede tener alfa alto.',
    'No reportar el intervalo de confianza del coeficiente de confiabilidad, que da información sobre la precisión de la estimación.',
  ],
  prerequisites: ['psicometria-fundamentos', 'medicion-confiabilidad'],
  relatedConcepts: [
    'psicometria-evidencia-validez',
    'psicometria-interpretacion-puntajes',
    'estadistica-descriptiva',
  ],
  masteryCriteria: [
    'Explicar los supuestos del alfa de Cronbach y por qué frecuentemente se viola el supuesto de tau-equivalencia.',
    'Comparar alfa y omega e indicar cuándo preferir el omega.',
    'Interpretar el análisis ítem-total para identificar ítems problemáticos.',
    'Aplicar el estándar de confiabilidad apropiado según el uso del instrumento (investigación vs. decisiones sobre individuos).',
  ],
}
