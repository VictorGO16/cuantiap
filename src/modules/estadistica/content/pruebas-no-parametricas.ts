import type { Concept } from '@/types/core'

export const pruebasNoParametricas: Concept = {
  id: 'estadistica-pruebas-no-parametricas',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Pruebas no paramétricas',
  summary:
    'Las pruebas no paramétricas son alternativas a las pruebas paramétricas cuando los supuestos de normalidad o nivel de medición no se cumplen. Funcionan principalmente sobre rangos en lugar de puntajes brutos, lo que las hace más robustas ante distribuciones asimétricas y outliers. Sin embargo, tienen menor potencia estadística que sus equivalentes paramétricos cuando los supuestos paramétricos sí se cumplen.',
  explanation: `Las pruebas no paramétricas son valiosas cuando los datos son ordinales, cuando la distribución es marcadamente no normal (especialmente en muestras pequeñas) o cuando existen outliers que distorsionan los estadísticos basados en medias.

**Chi-cuadrado (χ²)**

La prueba de chi-cuadrado evalúa si existe asociación entre dos variables categóricas (nominales u ordinales con pocas categorías). Compara las frecuencias observadas con las frecuencias esperadas bajo el supuesto de independencia. Un χ² grande indica que la distribución observada difiere de lo esperado.

*χ² de bondad de ajuste*: evalúa si una distribución observada se ajusta a una distribución teórica esperada.

*χ² de independencia*: evalúa si dos variables categóricas son independientes (no relacionadas).

Supuestos: frecuencias esperadas ≥ 5 en al menos el 80% de las celdas; si no se cumplen, usar la prueba exacta de Fisher (para tablas 2×2). El tamaño del efecto es V de Cramér.

**Mann-Whitney U (alternativa a t para independientes)**

Compara las distribuciones de dos grupos independientes mediante rangos. Técnicamente evalúa si los valores de un grupo tienden a ser mayores que los del otro. No asume normalidad ni igualdad de varianzas, pero sí que las distribuciones de ambos grupos tienen la misma forma (para interpretarse como comparación de medianas). El tamaño del efecto es r = Z / √N.

**Wilcoxon de rangos con signo (alternativa a t pareada)**

Compara dos medidas relacionadas (pre-post o pares) mediante los rangos de las diferencias. Es la alternativa no paramétrica a la t pareada. El tamaño del efecto es r = Z / √N.

**Kruskal-Wallis (alternativa al ANOVA de un factor)**

Extiende Mann-Whitney a tres o más grupos independientes. Si el resultado global es significativo, se usan comparaciones post hoc para grupos (Dunn con corrección de Bonferroni). El tamaño del efecto es eta-cuadrado basado en rangos (η²H).

**Correlación de Spearman (ρ) y Kendall (τ)**

La correlación de Spearman calcula la correlación de Pearson sobre los rangos de los datos. Es apropiada cuando la relación no es lineal, cuando hay outliers influyentes o cuando las variables son ordinales. Kendall's tau es más apropiado con muestras pequeñas y tiene propiedades estadísticas superiores en algunos contextos.

**Cuándo elegir pruebas no paramétricas**

La elección no es automática. Con muestras grandes (n > 30–50 por grupo), los estadísticos paramétricos son robustos a desviaciones moderadas de la normalidad gracias al teorema central del límite. Las pruebas no paramétricas son especialmente importantes con: (1) muestras pequeñas (n < 20–30), (2) distribuciones fuertemente asimétricas, (3) variables genuinamente ordinales, (4) datos con outliers que no pueden eliminarse.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Chi-cuadrado de independencia',
      description:
        'Un estudio examina si el tipo de apego (seguro, ansioso, evitativo) se asocia con la frecuencia de consulta psicológica (nunca, una vez, dos o más veces). Los datos se organizan en una tabla 3×3. χ²(4) = 12.8, p = .012, V de Cramér = .21 (efecto pequeño-moderado). La asociación es estadísticamente significativa, pero el efecto es modesto.',
      applicableContext:
        'Ilustra el uso de chi-cuadrado para examinar la relación entre dos variables categóricas.',
    },
    {
      id: 'ej-2',
      title: 'Mann-Whitney vs. t de Student en muestra pequeña',
      description:
        'Se compara el nivel de estrés (escala ordinal de 5 puntos) entre dos grupos de n = 15. La distribución es marcadamente asimétrica. La prueba t (M₁ = 3.2, M₂ = 2.4, t(28) = 1.93, p = .063) no es significativa, pero Mann-Whitney (U = 72, Z = -2.14, p = .032, r = .28) sí lo es. La distribución asimétrica y la muestra pequeña favorecen Mann-Whitney en este caso.',
      applicableContext:
        'Muestra que la elección entre prueba paramétrica y no paramétrica puede afectar las conclusiones, especialmente en muestras pequeñas.',
    },
  ],
  commonMistakes: [
    'Aplicar pruebas no paramétricas por defecto sin verificar si los supuestos paramétricos se cumplen; esto reduce la potencia innecesariamente.',
    'Interpretar Mann-Whitney como comparación de medianas sin verificar que las distribuciones tienen la misma forma.',
    'No reportar el tamaño del efecto en pruebas no paramétricas (V de Cramér, r), reduciendo la interpretabilidad del resultado.',
    'Usar chi-cuadrado cuando las frecuencias esperadas son menores de 5 en muchas celdas, lo que invalida el estadístico; usar prueba exacta de Fisher.',
    'Aplicar Kruskal-Wallis sin pruebas post hoc cuando el resultado es significativo, dejando sin identificar qué grupos difieren.',
  ],
  prerequisites: ['estadistica-supuestos', 'estadistica-pruebas-parametricas'],
  relatedConcepts: [
    'estadistica-inferencial',
    'estadistica-interpretacion',
    'medicion-niveles-medicion',
  ],
  masteryCriteria: [
    'Identificar cuándo es apropiado usar pruebas no paramétricas en lugar de pruebas paramétricas.',
    'Emparejar cada prueba no paramétrica con su equivalente paramétrico.',
    'Interpretar el resultado de chi-cuadrado de independencia con su tamaño del efecto (V de Cramér).',
    'Explicar las limitaciones de potencia de las pruebas no paramétricas frente a sus equivalentes paramétricos.',
  ],
}
