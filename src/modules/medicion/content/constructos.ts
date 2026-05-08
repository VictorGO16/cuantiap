import type { Concept } from '@/types/core'

export const constructos: Concept = {
  id: 'medicion-constructos',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Constructos psicológicos',
  summary:
    'Un constructo es un concepto teórico que representa una característica o proceso psicológico que no puede observarse directamente. Los constructos son el objeto de medición en psicología: inteligencia, ansiedad, autoeficacia y personalidad son ejemplos de constructos que se infieren a partir de indicadores observables.',
  explanation: `Los constructos son abstracciones teóricas que organizan la comprensión de los fenómenos psicológicos. A diferencia de las variables físicas —como la altura o el peso—, los constructos psicológicos no tienen una existencia directamente observable. Se infieren a partir de patrones de conducta, respuestas en cuestionarios o medidas fisiológicas.

La distinción entre el constructo (lo que queremos medir) y el indicador (lo que efectivamente medimos) es fundamental para entender los problemas de medición en psicología. El puntaje en una escala de depresión no es la depresión: es un conjunto de respuestas a ítems que, según la teoría y la evidencia empírica, se relacionan con el constructo subyacente.

Los constructos pueden ser más simples (unidimensionales) o más complejos (multidimensionales). La autoestima global puede tratarse como un constructo unidimensional; el bienestar psicológico de Ryff es multidimensional y abarca seis dimensiones distintas. Esta estructura interna tiene implicaciones directas para la construcción de instrumentos y el análisis de datos.

Los constructos latentes son aquellos que se asume causan las respuestas observables. En el modelo reflectivo, los ítems son efectos del constructo: si la depresión aumenta, todos los ítems relacionados con ella tienden a aumentar. En el modelo formativo, los ítems constituyen (causan) el constructo: el nivel socioeconómico se forma a partir de ingresos, educación y ocupación, no a la inversa.

La distinción entre constructos categoriales (la persona tiene o no tiene el trastorno) y dimensionales (la persona tiene más o menos del atributo) tiene consecuencias para los instrumentos y los análisis. La psicología contemporánea tiende a adoptar modelos dimensionales para la mayoría de los fenómenos, incluidos los trastornos mentales.

Para que un constructo sea científicamente útil debe estar bien delimitado teóricamente, distinguirse de otros constructos relacionados y tener indicadores válidos y confiables. La indefinición del constructo es una fuente frecuente de problemas de validez en la investigación psicológica.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Constructo unidimensional vs. multidimensional',
      description:
        'La satisfacción con la vida (SWLS, Diener et al.) se trata habitualmente como un constructo unidimensional: un único puntaje total resume la evaluación cognitiva global del bienestar. El bienestar psicológico (Ryff) es multidimensional: autonomía, dominio del entorno, crecimiento personal, relaciones positivas, propósito en la vida y autoaceptación son dimensiones diferenciables.',
      applicableContext:
        'Ilustra que la dimensionalidad de un constructo debe especificarse teóricamente antes de construir el instrumento.',
    },
    {
      id: 'ej-2',
      title: 'Constructo latente en modelo reflectivo',
      description:
        'La ansiedad social (constructo latente) se asume que causa las respuestas a ítems como "evito situaciones sociales", "me preocupa el juicio de los demás" o "siento tensión física en grupos". Si la ansiedad social disminuye con el tratamiento, se espera que todos los ítems muestren reducción, ya que son reflejos del constructo.',
      applicableContext:
        'Muestra la lógica del modelo reflectivo y por qué es importante para la construcción de escalas.',
    },
  ],
  commonMistakes: [
    'Tratar el puntaje del instrumento como si fuera el constructo mismo, ignorando el error de medición y las limitaciones del instrumento.',
    'Asumir que un constructo es unidimensional sin verificarlo empíricamente mediante análisis factorial.',
    'Confundir constructo con concepto cotidiano: "inteligencia" en psicometría tiene una definición operacional específica que puede diferir del uso coloquial.',
    'Ignorar la distinción entre modelos reflectivos y formativos al construir o evaluar un instrumento.',
    'Usar instrumentos diseñados para un constructo para medir uno diferente sin evidencia de equivalencia conceptual.',
  ],
  prerequisites: ['metodologia-variables'],
  relatedConcepts: [
    'medicion-operacionalizacion',
    'medicion-validez',
    'medicion-instrumentos',
    'psicometria-fundamentos',
  ],
  masteryCriteria: [
    'Explicar por qué los constructos psicológicos no pueden medirse directamente y cómo se infieren.',
    'Distinguir constructos unidimensionales de multidimensionales y señalar las implicaciones para la medición.',
    'Diferenciar el modelo reflectivo del modelo formativo con ejemplos.',
    'Articular la diferencia entre el constructo y el puntaje obtenido en un instrumento.',
  ],
}
