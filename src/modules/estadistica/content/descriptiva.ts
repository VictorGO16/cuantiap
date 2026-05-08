import type { Concept } from '@/types/core'

export const descriptiva: Concept = {
  id: 'estadistica-descriptiva',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Estadística descriptiva',
  summary:
    'La estadística descriptiva organiza, resume y representa los datos de una muestra mediante medidas de tendencia central, dispersión y distribución. Su objetivo es describir lo observado sin hacer inferencias sobre una población más amplia. Es el punto de partida obligatorio de cualquier análisis cuantitativo.',
  explanation: `La estadística descriptiva transforma un conjunto de datos brutos en información comprensible. Antes de aplicar cualquier prueba inferencial, es imprescindible conocer la distribución de las variables: su forma, su centro y su dispersión.

**Medidas de tendencia central**

La *media aritmética* (M) es el promedio de los puntajes. Es la medida más sensible a los valores extremos (outliers). Se usa cuando la distribución es aproximadamente simétrica y la variable es de intervalo o razón.

La *mediana* (Md) es el valor que divide la distribución en dos mitades iguales. Es resistente a los outliers y apropiada para distribuciones asimétricas o variables ordinales.

La *moda* es el valor o categoría que aparece con mayor frecuencia. Es la única medida de tendencia central apropiada para variables nominales.

**Medidas de dispersión**

La *varianza* (s²) es el promedio de los cuadrados de las desviaciones respecto a la media. La *desviación estándar* (SD) es la raíz cuadrada de la varianza, en las mismas unidades que los datos originales. Ambas miden cuánto se dispersan los puntajes alrededor de la media.

El *rango* es la diferencia entre el valor máximo y mínimo; simple pero muy sensible a los outliers.

El *rango intercuartil* (RIC) es la diferencia entre el percentil 75 y el percentil 25. Mide la dispersión del 50% central de los datos y es resistente a los extremos.

El *coeficiente de variación* (CV = SD/M × 100) permite comparar la dispersión relativa entre variables con distintas escalas o unidades.

**Distribución y forma**

La *asimetría* (skewness) indica si la distribución se extiende más hacia la derecha (asimetría positiva) o hacia la izquierda (asimetría negativa). La *curtosis* indica si la distribución es más puntiaguda o más aplanada que la distribución normal. Valores de asimetría y curtosis alejados de cero indican desviación de la normalidad.

**Representación gráfica**

Los histogramas muestran la distribución de frecuencias de variables continuas. Los diagramas de caja (boxplots) representan la mediana, los cuartiles y los outliers. Los gráficos de barras son apropiados para variables categóricas. La elección del gráfico debe ser coherente con el nivel de medición de la variable.

**Tablas de frecuencias**

Para variables categóricas o discretas, las tablas de frecuencias muestran el recuento (n), la frecuencia relativa (%) y, si aplica, los porcentajes acumulados. Son el análisis descriptivo básico para variables nominales y ordinales.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Impacto de outliers en media vs. mediana',
      description:
        'Ingresos mensuales de 10 psicólogos (en miles): 500, 600, 650, 700, 720, 740, 760, 800, 850, 4500. Media = 1182, Mediana = 730. El outlier (4500) infla la media haciéndola poco representativa del ingreso típico. La mediana describe mejor el centro de esta distribución asimétrica.',
      applicableContext:
        'Muestra cuándo la mediana es más informativa que la media como medida de tendencia central.',
    },
    {
      id: 'ej-2',
      title: 'Descripción de una variable de escala psicológica',
      description:
        'Escala de ansiedad (rango 0–63) aplicada a 150 estudiantes: M = 28.4, SD = 9.2, Md = 27.0, asimetría = 0.43, curtosis = -0.12. La ligera asimetría positiva indica que hay más casos en puntuaciones bajas que altas, pero la distribución es aproximadamente normal. El RIC = [22, 34], con algunos outliers por encima de 48.',
      applicableContext:
        'Ilustra el reporte completo de estadísticos descriptivos para una variable cuantitativa.',
    },
  ],
  commonMistakes: [
    'Reportar la media sin la desviación estándar, ocultando información crítica sobre la variabilidad de los datos.',
    'Usar la media como medida de centralidad con distribuciones muy asimétricas o con outliers influyentes.',
    'Reportar la mediana como medida de dispersión; la mediana es una medida de tendencia central, no de dispersión.',
    'Usar gráficos de barras para variables continuas (en lugar de histogramas) o histogramas para variables nominales.',
    'No explorar la distribución de los datos antes de aplicar pruebas inferenciales, pasando por alto violaciones de supuestos.',
  ],
  prerequisites: ['medicion-niveles-medicion'],
  relatedConcepts: [
    'estadistica-inferencial',
    'estadistica-supuestos',
    'psicometria-interpretacion-puntajes',
  ],
  masteryCriteria: [
    'Calcular e interpretar media, mediana, moda, varianza, SD y rango intercuartil.',
    'Seleccionar la medida de tendencia central y dispersión apropiada según el nivel de medición y la distribución de la variable.',
    'Interpretar la asimetría y la curtosis de una distribución.',
    'Elegir el tipo de gráfico adecuado según el nivel de medición de la variable.',
  ],
}
