import type { Concept } from '@/types/core'

export const nivelesMedicion: Concept = {
  id: 'medicion-niveles-medicion',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Niveles de medición',
  summary:
    'Los niveles de medición —nominal, ordinal, de intervalo y de razón— clasifican las variables según las operaciones matemáticas que sus puntajes permiten. Esta clasificación, propuesta por Stevens (1946), determina qué estadísticas son apropiadas y cómo pueden interpretarse los puntajes.',
  explanation: `La escala de medición de una variable no es un detalle técnico menor: define qué tipo de información contienen los datos y, por tanto, qué se puede calcular legítimamente con ellos.

**Nivel nominal**

Las categorías se distinguen solo por nombre; no hay orden ni magnitud. Los números asignados son etiquetas arbitrarias. Operaciones permitidas: contar frecuencias, calcular modas, comparar proporciones. No tiene sentido calcular la media de categorías nominales. Ejemplos: diagnóstico psiquiátrico (depresión, ansiedad, bipolar), género, nacionalidad, tipo de tratamiento.

**Nivel ordinal**

Las categorías tienen un orden significativo, pero los intervalos entre categorías no son necesariamente iguales. La diferencia entre "muy de acuerdo" y "de acuerdo" puede no ser equivalente a la diferencia entre "de acuerdo" y "neutral". Operaciones permitidas: ordenar, calcular medianas y percentiles, aplicar estadísticos no paramétricos. Ejemplos: escalas Likert, nivel socioeconómico (alto/medio/bajo), posición en un ranking.

**Nivel de intervalo**

Las categorías tienen orden y los intervalos entre categorías son iguales. Sin embargo, el cero es arbitrario (no indica ausencia del atributo). Operaciones permitidas: calcular medias, desviaciones estándar, correlaciones de Pearson, pruebas t. Ejemplos: temperatura en Celsius o Fahrenheit, puntajes de CI (coeficiente intelectual), escalas psicológicas estandarizadas con buenas propiedades psicométricas.

**Nivel de razón**

Tiene todas las propiedades del intervalo más un cero absoluto que indica ausencia real del atributo. Permite calcular razones y proporciones. Ejemplos: tiempo de reacción, número de errores, frecuencia de conductas, ingresos mensuales.

**Implicaciones para el análisis estadístico**

Los estadísticos paramétricos (media, desviación estándar, correlación de Pearson, prueba t, ANOVA) presuponen datos de intervalo o razón. Los estadísticos no paramétricos (mediana, correlación de Spearman, prueba de Mann-Whitney) son apropiados para datos ordinales o cuando los supuestos paramétricos no se cumplen.

Un debate recurrente en psicología es si las escalas Likert deben tratarse como ordinales o como de intervalo. El consenso práctico es que cuando la escala tiene suficientes puntos (5 o más) y los ítems tienen buenas propiedades, tratar los puntajes como de intervalo produce resultados razonablemente válidos. Sin embargo, esto es un supuesto analítico, no una propiedad matemática probada.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Identificación del nivel en un conjunto de variables',
      description:
        'En un estudio sobre bienestar laboral: tipo de contrato (indefinido/plazo fijo/honorarios) = nominal; nivel de satisfacción (muy satisfecho a muy insatisfecho, 5 puntos) = ordinal; puntaje en escala estandarizada de burnout = intervalo (con reservas); horas trabajadas por semana = razón.',
      applicableContext:
        'Muestra cómo clasificar variables reales de un estudio y qué implicaciones tiene cada clasificación.',
    },
    {
      id: 'ej-2',
      title: 'Consecuencia de ignorar el nivel de medición',
      description:
        'Si se asignan números a diagnósticos (1=depresión, 2=ansiedad, 3=bipolar) y se calcula la media, el resultado es matemáticamente posible pero no tiene ningún significado. La media de diagnósticos no es un diagnóstico ni una cantidad de diagnósticos: es un error de interpretación derivado de ignorar el nivel de medición.',
      applicableContext:
        'Ilustra las consecuencias concretas de aplicar operaciones estadísticas inapropiadas para el nivel de medición.',
    },
  ],
  commonMistakes: [
    'Calcular medias con variables nominales u ordinales sin verificar si los supuestos se cumplen o si la operación tiene interpretación válida.',
    'Asumir que toda variable con números tiene nivel de intervalo; el número es una etiqueta hasta que se demuestre que los intervalos son iguales.',
    'Ignorar que el nivel de medición de un puntaje compuesto depende de las propiedades del instrumento, no solo del número de opciones de respuesta.',
    'Tratar variables de razón como de intervalo omitiendo el uso de razones cuando estas tienen interpretación relevante.',
    'No considerar el nivel de medición al elegir el estadístico de centralidad: usar la media en lugar de la mediana con datos claramente asimétricos u ordinales.',
  ],
  prerequisites: ['medicion-constructos', 'medicion-operacionalizacion'],
  relatedConcepts: [
    'estadistica-descriptiva',
    'estadistica-supuestos',
    'estadistica-pruebas-parametricas',
    'estadistica-pruebas-no-parametricas',
  ],
  masteryCriteria: [
    'Clasificar variables en nominal, ordinal, intervalo o razón y justificar la clasificación.',
    'Identificar qué estadísticos son apropiados según el nivel de medición de cada variable.',
    'Explicar por qué el cero absoluto distingue la escala de razón de la de intervalo y dar ejemplos.',
    'Describir el debate sobre el tratamiento de escalas Likert y cuándo es aceptable tratarlas como de intervalo.',
  ],
}
