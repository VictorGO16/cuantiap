import type { Concept } from '@/types/core'

export const fundamentos: Concept = {
  id: 'psicometria-fundamentos',
  moduleId: 'psicometria',
  version: '1.0.0',
  title: 'Fundamentos de la psicometría',
  summary:
    'La psicometría es la disciplina que estudia los fundamentos teóricos y los métodos para la medición de atributos psicológicos. Su marco teórico central es la teoría clásica de los tests (TCT), que modela el puntaje observado como la suma de un puntaje verdadero y un error aleatorio. La psicometría guía la construcción, evaluación y uso de instrumentos de medición en psicología.',
  explanation: `La psicometría es la disciplina que da rigor científico a la medición en psicología. Sin un marco psicométrico sólido, los instrumentos psicológicos serían meras colecciones de preguntas sin sustento matemático ni verificación de sus propiedades.

**La teoría clásica de los tests (TCT)**

El modelo fundamental de la TCT es: **X = V + E**

Donde X es el puntaje observado de una persona en un test, V es su puntaje verdadero (la cantidad del atributo que realmente tiene) y E es el error de medición aleatorio (variación no sistemática debida a factores circunstanciales: estado de ánimo, cansancio, distracciones, ambigüedad de ítems).

Los supuestos fundamentales de la TCT son: (1) la media de los errores en la población es cero (E[E] = 0); (2) el error no correlaciona con el puntaje verdadero; (3) los errores de distintos tests no correlacionan entre sí. Estos supuestos permiten derivar la definición de confiabilidad como r(X, V)² = la proporción de varianza observada que es varianza verdadera.

**Implicaciones de la TCT**

La confiabilidad nunca puede estimarse directamente porque el puntaje verdadero es latente. En cambio, se estima indirectamente mediante correlaciones entre formas paralelas, entre aplicaciones repetidas (test-retest) o entre los propios ítems del test (consistencia interna).

El error estándar de medición (SEM = SD√(1-r)) indica la incertidumbre alrededor del puntaje observado de un individuo. Un puntaje de 45 en una escala con SEM = 3 indica que el puntaje verdadero está probablemente en el rango [42, 48] (aproximadamente ±1 SEM).

**Limitaciones de la TCT y alternativas**

La TCT tiene limitaciones: las propiedades de los ítems (dificultad, discriminación) dependen de la muestra usada, y las propiedades de las personas (puntaje verdadero) dependen del instrumento usado. La teoría de respuesta al ítem (TRI o IRT) supera estas limitaciones mediante modelos probabilísticos que separan las propiedades del ítem de las del sujeto, pero es matemáticamente más compleja y requiere muestras mayores.

La psicometría moderna también incluye el análisis factorial confirmatorio (AFC) para evaluar la estructura de los tests, el análisis de invarianza para verificar la equivalencia entre grupos, y el análisis de redes para modelar las relaciones entre ítems sin asumir un factor latente.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Aplicación del modelo X = V + E',
      description:
        'Una persona obtiene un puntaje de 62 en una escala de ansiedad (X = 62). Su puntaje verdadero (V) podría ser 60, y ese día tuvo un error positivo de +2 por estar especialmente preocupada por un examen. Otra vez que rinde la misma escala obtiene 59, con un error de -1. El promedio de múltiples aplicaciones converge en el puntaje verdadero.',
      applicableContext:
        'Ilustra la lógica del modelo TCT y cómo el error aleatorio afecta las mediciones individuales.',
    },
    {
      id: 'ej-2',
      title: 'Error estándar de medición e interpretación de puntajes',
      description:
        'Un test de inteligencia tiene media = 100, SD = 15 y confiabilidad = .90. SEM = 15√(1-.90) = 15 × .316 ≈ 4.7. Si alguien obtiene un puntaje de 115, el intervalo de confianza del 68% para su puntaje verdadero es [110.3, 119.7]. Esto indica que el puntaje observado debe interpretarse con incertidumbre.',
      applicableContext:
        'Muestra cómo usar el SEM para comunicar la incertidumbre en los puntajes individuales.',
    },
  ],
  commonMistakes: [
    'Tratar el puntaje observado como si fuera el puntaje verdadero, ignorando el error de medición inherente a toda medición psicológica.',
    'Confundir la TCT con las pruebas estadísticas; la TCT es un modelo matemático sobre la estructura del puntaje, no un procedimiento de análisis de datos.',
    'Asumir que un test con alta confiabilidad tiene un SEM pequeño sin calcular; la relación depende también de la desviación estándar de la muestra.',
    'Ignorar que las propiedades de confiabilidad estimadas en la TCT son específicas de la muestra y pueden variar en otras poblaciones.',
  ],
  prerequisites: ['medicion-constructos', 'medicion-confiabilidad'],
  relatedConcepts: [
    'psicometria-construccion-instrumentos',
    'psicometria-confiabilidad-clasica',
    'psicometria-evidencia-validez',
  ],
  masteryCriteria: [
    'Explicar el modelo X = V + E y los supuestos de la TCT.',
    'Calcular e interpretar el error estándar de medición dado un coeficiente de confiabilidad y una desviación estándar.',
    'Distinguir las limitaciones de la TCT frente a la TRI.',
    'Explicar por qué el puntaje verdadero es latente y cómo se estima la confiabilidad indirectamente.',
  ],
}
