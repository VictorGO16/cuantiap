import type { Concept } from '@/types/core'

export const pruebasParametricas: Concept = {
  id: 'estadistica-pruebas-parametricas',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Pruebas paramétricas',
  summary:
    'Las pruebas paramétricas evalúan hipótesis sobre parámetros poblacionales (medias, correlaciones) asumiendo que los datos provienen de distribuciones con propiedades conocidas. Las más frecuentes en psicología son la prueba t de Student, el análisis de varianza (ANOVA) y la correlación de Pearson. Cada una responde a preguntas específicas y requiere supuestos específicos.',
  explanation: `Las pruebas paramétricas son las herramientas estadísticas más potentes cuando sus supuestos se cumplen. Su elección debe guiarse por la pregunta de investigación, el nivel de medición de las variables y la verificación de supuestos.

**Prueba t de Student**

Evalúa si la diferencia entre dos medias es estadísticamente significativa. Existen tres variantes:

*t para una muestra*: compara la media de la muestra con un valor de referencia conocido (p. ej., la media poblacional). Ejemplo: ¿la media de CI en esta escuela difiere de 100?

*t para muestras independientes*: compara las medias de dos grupos que no tienen relación entre sí. Ejemplo: ¿difieren los niveles de ansiedad entre estudiantes de psicología y de ingeniería? Supuestos: normalidad de cada grupo (o n suficientemente grande), homogeneidad de varianzas (usar corrección de Welch si se viola), independencia de las observaciones.

*t para muestras relacionadas (t pareada)*: compara las medias de dos mediciones del mismo grupo o de pares de sujetos emparejados. Ejemplo: ¿cambia el bienestar antes y después de la intervención? Es más potente que la t para independientes porque controla la variabilidad entre sujetos.

El estadístico t se calcula como la diferencia de medias dividida por el error estándar de esa diferencia. Los grados de libertad determinan la distribución de referencia para obtener el valor p. El tamaño del efecto es la d de Cohen: diferencia de medias / desviación estándar combinada. Convenciones: d = .20 pequeño, .50 mediano, .80 grande.

**ANOVA de un factor**

Evalúa si las medias de tres o más grupos difieren entre sí. La lógica: descompone la varianza total en varianza entre grupos (debida al factor) y varianza dentro de grupos (error). El estadístico F = varianza entre grupos / varianza dentro de grupos. Un F grande indica que las diferencias entre grupos son grandes en relación con la variabilidad dentro de los grupos.

El ANOVA global solo indica que al menos dos grupos difieren; no identifica cuáles. Las pruebas post hoc (Tukey HSD, Bonferroni, Scheffé) identifican qué pares de grupos son distintos, controlando el error tipo I. El tamaño del efecto es eta-cuadrado (η²) u omega-cuadrado (ω²): proporción de varianza en la VD explicada por el factor.

**Correlación de Pearson (r)**

Cuantifica la fuerza y dirección de la relación lineal entre dos variables cuantitativas continuas (nivel de intervalo o razón). r varía entre −1 (relación negativa perfecta) y +1 (relación positiva perfecta). r = 0 indica ausencia de relación lineal (aunque puede existir una relación no lineal). Supuestos: distribución bivariada aproximadamente normal, relación lineal, ausencia de outliers influyentes.

Convenciones de Cohen: r = .10 pequeño, .30 mediano, .50 grande. r² indica la proporción de varianza de Y explicada por X.

**Regresión lineal**

Modela la relación entre una VD continua y uno o más predictores. La regresión simple tiene un predictor; la regresión múltiple, varios. Los coeficientes de regresión no estandarizados (B) indican cuánto cambia Y por cada unidad de X; los estandarizados (β) permiten comparar la contribución relativa de distintos predictores. R² indica la proporción de varianza de Y explicada por el modelo.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Elección entre t para independientes y t pareada',
      description:
        'Estudio A: compara la satisfacción laboral de psicólogos clínicos vs. psicólogos organizacionales (grupos distintos) → t para independientes. Estudio B: mide la satisfacción laboral en los mismos psicólogos antes y después de un programa de bienestar → t pareada. La t pareada es más potente porque elimina la variabilidad entre sujetos.',
      applicableContext:
        'Muestra cómo el diseño del estudio determina cuál variante de la prueba t usar.',
    },
    {
      id: 'ej-2',
      title: 'Interpretación de ANOVA con prueba post hoc',
      description:
        'Un investigador compara el puntaje en burnout de tres grupos: psicólogos de atención primaria, hospitales públicos y clínicas privadas. El ANOVA es significativo: F(2, 147) = 8.43, p < .001, η² = .10. La prueba de Tukey indica que atención primaria difiere de clínicas privadas (p = .001) pero no de hospitales públicos (p = .08). η² = .10 indica un efecto moderado.',
      applicableContext:
        'Ilustra cómo interpretar el ANOVA global y las comparaciones post hoc, incluyendo el tamaño del efecto.',
    },
  ],
  commonMistakes: [
    'Usar prueba t para comparar tres o más grupos, lo que infla el error tipo I; debe usarse ANOVA.',
    'Omitir las pruebas post hoc tras un ANOVA significativo, dejando sin identificar qué grupos difieren.',
    'Interpretar r = .30 como "baja correlación" sin considerar el contexto; en psicología, r = .30 puede ser prácticamente relevante.',
    'No verificar la homogeneidad de varianzas antes de la t para independientes, y no usar la corrección de Welch cuando es necesaria.',
    'Confundir correlación de Pearson con regresión: la correlación es simétrica (r_XY = r_YX); la regresión tiene una dirección implícita (X predice Y).',
  ],
  prerequisites: ['estadistica-inferencial', 'estadistica-supuestos', 'estadistica-error-tipo-i-ii'],
  relatedConcepts: [
    'estadistica-pruebas-no-parametricas',
    'estadistica-interpretacion',
    'medicion-niveles-medicion',
  ],
  masteryCriteria: [
    'Seleccionar la prueba t apropiada (una muestra, independientes, pareada) según el diseño del estudio.',
    'Calcular e interpretar la d de Cohen como medida del tamaño del efecto para la prueba t.',
    'Explicar la lógica del ANOVA y para qué sirven las pruebas post hoc.',
    'Interpretar el coeficiente de correlación de Pearson en términos de fuerza, dirección y tamaño del efecto.',
  ],
}
