import type { Concept } from '@/types/core'

export const confiabilidad: Concept = {
  id: 'medicion-confiabilidad',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Confiabilidad',
  summary:
    'La confiabilidad es el grado en que un instrumento produce mediciones consistentes y estables. En la teoría clásica de los tests, refleja la proporción de varianza verdadera en los puntajes observados. Se evalúa mediante distintos métodos: consistencia interna, estabilidad temporal (test-retest) y concordancia entre evaluadores (interjueces).',
  explanation: `La confiabilidad es una condición necesaria pero no suficiente para la validez. Sin confiabilidad no puede haber validez: si el instrumento produce puntajes erráticos, no puede medir nada de forma válida. Pero un instrumento puede ser muy confiable y aun así no medir el constructo de interés.

La teoría clásica de los tests (TCT) formaliza la confiabilidad mediante la ecuación fundamental: **X = V + E**, donde X es el puntaje observado, V es el puntaje verdadero y E es el error de medición aleatorio. La confiabilidad (r_XX) es el cociente entre la varianza verdadera y la varianza observada: cuanto mayor la proporción de varianza verdadera, mayor la confiabilidad.

**Consistencia interna**

Evalúa si todos los ítems del instrumento miden el mismo constructo. El coeficiente más usado es el alfa de Cronbach (α), que estima la consistencia interna a partir de las correlaciones entre ítems. Valores de α ≥ .70 se consideran aceptables en investigación; ≥ .80 en contextos clínicos donde se toman decisiones sobre individuos.

Una limitación importante: el alfa de Cronbach asume que todos los ítems son equivalentes (modelo tau-equivalente). En la práctica, este supuesto rara vez se cumple. El omega de McDonald (ω) es un estimador más robusto que no requiere este supuesto y es preferido metodológicamente.

**Estabilidad temporal (test-retest)**

Evalúa si el instrumento produce puntajes similares en dos aplicaciones separadas en el tiempo en la misma muestra. Se cuantifica mediante la correlación entre ambas mediciones. El intervalo entre aplicaciones debe ser suficientemente largo para eliminar efectos de memoria, pero suficientemente corto para que el constructo no haya cambiado genuinamente.

**Confiabilidad interjueces**

Evalúa si diferentes evaluadores que aplican el mismo instrumento o criterio llegan a los mismos resultados. Se cuantifica mediante el coeficiente kappa de Cohen (para categorías) o el coeficiente de correlación intraclase (CCI) para puntuaciones continuas.

**Error estándar de medición (SEM)**

El SEM indica cuánto puede variar el puntaje observado de un individuo alrededor de su puntaje verdadero por efecto del error aleatorio. Se calcula como SEM = SD × √(1 - r_XX). Es especialmente relevante en contextos de evaluación individual.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Interpretación del alfa de Cronbach',
      description:
        'Una escala de regulación emocional de 10 ítems obtiene α = .82 en una muestra de 300 universitarios. Esto indica consistencia interna adecuada para investigación. Sin embargo, si se elimina el ítem 7 el alfa sube a .87, lo que sugiere que ese ítem no cohesiona bien con los demás y podría revisarse.',
      applicableContext:
        'Ilustra cómo interpretar el alfa y usar el análisis de alfa si se elimina el ítem para evaluar la calidad de cada ítem.',
    },
    {
      id: 'ej-2',
      title: 'Diferencia entre alfa y omega',
      description:
        'Una escala con ítems de distinto peso factorial (unos cargan más en el factor que otros) produce α = .73 y ω = .81. El alfa subestima la confiabilidad real porque asume equivalencia entre ítems. En este caso, el omega es un mejor estimador de la consistencia interna.',
      applicableContext:
        'Muestra por qué el omega de McDonald es metodológicamente preferible al alfa de Cronbach cuando los ítems no son equivalentes.',
    },
  ],
  commonMistakes: [
    'Interpretar la confiabilidad como una propiedad fija del instrumento; en realidad varía según la muestra, el contexto y el momento de aplicación.',
    'Confundir alta consistencia interna con unidimensionalidad: α alto es compatible con multidimensionalidad si las dimensiones están correlacionadas.',
    'Reportar solo el alfa sin considerar el omega ni analizar el comportamiento de ítems individuales.',
    'No calcular el error estándar de medición en contextos donde se toman decisiones sobre individuos basadas en el puntaje.',
    'Asumir que un alpha > .70 garantiza validez; la confiabilidad no implica que el instrumento mida el constructo correcto.',
  ],
  prerequisites: ['medicion-constructos', 'medicion-instrumentos'],
  relatedConcepts: [
    'medicion-validez',
    'psicometria-confiabilidad-clasica',
    'psicometria-fundamentos',
  ],
  masteryCriteria: [
    'Explicar la ecuación fundamental de la TCT (X = V + E) y su relación con la confiabilidad.',
    'Distinguir consistencia interna, estabilidad temporal y confiabilidad interjueces, y señalar cuándo es apropiado usar cada método.',
    'Interpretar el alfa de Cronbach y el omega de McDonald en un informe de investigación.',
    'Calcular e interpretar el error estándar de medición dado un SD y un coeficiente de confiabilidad.',
  ],
}
