import type { Concept } from '@/types/core'

export const errorTipoIII: Concept = {
  id: 'estadistica-error-tipo-i-ii',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Error tipo I, error tipo II y potencia estadística',
  summary:
    'En la prueba de hipótesis existen dos tipos de error: el error tipo I (rechazar H₀ cuando es verdadera, falso positivo) y el error tipo II (no rechazar H₀ cuando es falsa, falso negativo). La potencia estadística es la probabilidad de detectar un efecto real cuando existe. La relación entre estos tres conceptos determina el diseño del estudio.',
  explanation: `Toda decisión estadística enfrenta incertidumbre. No es posible garantizar que una decisión sea correcta, pero sí es posible controlar y cuantificar la probabilidad de equivocarse.

**La tabla de decisiones**

|                      | H₀ verdadera | H₀ falsa |
|----------------------|--------------|----------|
| No rechazar H₀       | Decisión correcta (1−α) | Error tipo II (β) |
| Rechazar H₀          | Error tipo I (α) | Decisión correcta — potencia (1−β) |

**Error tipo I (α, tasa de falsos positivos)**

Es la probabilidad de rechazar H₀ cuando en realidad es verdadera. En términos prácticos: concluir que hay un efecto cuando en realidad no lo hay. Se controla estableciendo el nivel de significancia α antes del análisis (convencionalmente α = .05). Si α = .05, en el 5% de los estudios que se conducen cuando H₀ es verdadera se cometerá un error tipo I.

La inflación del error tipo I ocurre cuando se realizan múltiples comparaciones sin corrección. Si se hacen 20 comparaciones con α = .05, se espera que al menos una resulte significativa por azar. Las correcciones más comunes son Bonferroni (α ajustado = α / número de comparaciones) y Holm-Bonferroni.

**Error tipo II (β, tasa de falsos negativos)**

Es la probabilidad de no rechazar H₀ cuando es falsa. En términos prácticos: no detectar un efecto que existe. Depende de α, del tamaño del efecto y del tamaño muestral.

**Potencia estadística (1 − β)**

La potencia es la probabilidad de detectar un efecto real cuando existe. Un estudio con potencia = .80 tiene un 80% de probabilidad de rechazar H₀ cuando H₀ es falsa. La potencia de .80 es el estándar mínimo aceptable en ciencias sociales; .90 es preferible en estudios clínicos.

La potencia aumenta con: (1) mayor tamaño muestral, (2) mayor tamaño del efecto poblacional, (3) menor varianza en las mediciones, (4) mayor nivel de α. Las relaciones entre estos factores permiten planificar el tamaño muestral necesario para alcanzar la potencia deseada (análisis de potencia a priori).

**El análisis de potencia a priori**

Antes de iniciar un estudio, el investigador especifica: (1) el tamaño del efecto esperado (basado en literatura o en el mínimo efecto clínicamente relevante), (2) el nivel de α, y (3) la potencia deseada (1−β). A partir de estos parámetros se calcula el n necesario. Realizar el análisis de potencia después de recolectar los datos (potencia post-hoc) es metodológicamente inapropiado porque crea razonamiento circular.

**Relación entre errores**

Reducir α (ser más estricto para rechazar H₀) disminuye el error tipo I pero aumenta el error tipo II (con el mismo n). Aumentar n reduce tanto el error tipo I como el tipo II. El investigador debe hacer un balance explícito entre ambos tipos de error según el contexto: los errores tipo I son más costosos cuando un falso positivo lleva a intervenciones dañinas; los errores tipo II son más costosos cuando perder un efecto real tiene graves consecuencias (p. ej., no detectar una enfermedad).`,
  examples: [
    {
      id: 'ej-1',
      title: 'Inflación del error tipo I en comparaciones múltiples',
      description:
        'Un investigador compara 5 grupos en 10 variables dependientes usando pruebas t individuales (50 comparaciones totales, α = .05). La probabilidad de cometer al menos un error tipo I es 1 − (0.95)⁵⁰ ≈ .92. Esto significa que casi con certeza al menos un resultado "significativo" es un falso positivo. La corrección de Bonferroni ajustaría α = .05/50 = .001.',
      applicableContext:
        'Ilustra por qué las comparaciones múltiples sin corrección producen una tasa de error tipo I incontrolable.',
    },
    {
      id: 'ej-2',
      title: 'Cálculo del tamaño muestral por análisis de potencia',
      description:
        'Un investigador planea una prueba t para grupos independientes. Basándose en estudios previos, estima un tamaño del efecto pequeño (d = .30), establece α = .05 bilateral y desea potencia = .80. El análisis de potencia (G*Power u otro software) indica n ≈ 176 por grupo (352 total). Con solo 50 por grupo, la potencia sería de aproximadamente .20, lo que significa que el 80% de las veces no detectaría el efecto.',
      applicableContext:
        'Muestra cómo el análisis de potencia a priori informa las decisiones de tamaño muestral.',
    },
  ],
  commonMistakes: [
    'Realizar el análisis de potencia después de los datos (post-hoc) y usarlo para justificar un resultado no significativo como "estudio bien diseñado pero sin efecto."',
    'Interpretar un resultado no significativo como evidencia de que H₀ es verdadera; solo indica que los datos son compatibles con H₀.',
    'Ignorar la inflación del error tipo I en estudios con múltiples comparaciones o múltiples variables dependientes.',
    'Confundir el nivel de significancia α con la probabilidad de que H₀ sea verdadera dado un resultado significativo.',
    'Asumir que un estudio publicado tiene potencia adecuada sin verificarlo; muchos estudios en psicología son crónicamente subpotentes.',
  ],
  prerequisites: ['estadistica-inferencial', 'metodologia-hipotesis', 'metodologia-muestreo'],
  relatedConcepts: [
    'estadistica-pruebas-parametricas',
    'estadistica-interpretacion',
    'estadistica-supuestos',
  ],
  masteryCriteria: [
    'Definir error tipo I, error tipo II y potencia estadística, y explicar sus relaciones.',
    'Explicar qué factores aumentan la potencia estadística y cómo el tamaño muestral los afecta.',
    'Identificar situaciones donde el error tipo I o el tipo II es más costoso y justificar el balance.',
    'Explicar por qué las comparaciones múltiples sin corrección inflan el error tipo I y cuáles son las correcciones disponibles.',
  ],
}
