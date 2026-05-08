import type { Concept } from '@/types/core'

export const instrumentos: Concept = {
  id: 'medicion-instrumentos',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Instrumentos de medición',
  summary:
    'Los instrumentos de medición son los procedimientos estandarizados mediante los cuales se obtienen datos sobre las variables de interés. En psicología, los principales tipos son cuestionarios de autoinforme, pruebas de desempeño, escalas de observación y registros conductuales. La elección del instrumento adecuado depende del constructo, la población y el contexto.',
  explanation: `Un instrumento de medición es cualquier recurso que permite asignar valores numéricos a los atributos de personas, objetos o situaciones. En psicología, los instrumentos transforman características no directamente observables en datos cuantificables.

**Cuestionarios y escalas de autoinforme**

Son el tipo más frecuente en psicología. El participante responde directamente preguntas sobre sus experiencias, actitudes, emociones o conductas. Incluyen escalas Likert (frecuencia o grado de acuerdo), escalas de diferencial semántico, listas de chequeo y escalas visuales analógicas. Su principal ventaja es la eficiencia; su principal limitación es la susceptibilidad al sesgo de deseabilidad social y a la aquiescencia.

**Pruebas de desempeño máximo**

Miden lo que la persona puede hacer cuando intenta rendir al máximo. Incluyen tests de inteligencia, pruebas de aptitudes, tests de logro académico. A diferencia de los cuestionarios, tienen respuestas correctas e incorrectas. La evaluación de validez se centra en si el test discrimina entre niveles de habilidad.

**Escalas de observación**

El evaluador registra la conducta del individuo, ya sea en contexto natural o estandarizado. Pueden ser listas de chequeo (presencia/ausencia de conductas) o escalas de valoración (frecuencia o intensidad de conductas). Requieren entrenamiento del observador y procedimientos de verificación de confiabilidad interjueces.

**Medidas fisiológicas y de conducta**

Frecuencia cardíaca, cortisol, tiempo de reacción, datos de neuroimagen. Tienen mayor objetividad en el sentido de que no dependen del autoinforme, pero plantean desafíos de validez: ¿el cortisol mide "estrés" en el sentido psicológico?

**Criterios para seleccionar un instrumento**

Un instrumento debe seleccionarse basándose en: (1) evidencia de validez para el constructo de interés, (2) confiabilidad documentada en poblaciones similares a la del estudio, (3) disponibilidad de normas o baremos si se requiere interpretación normativa, (4) adecuación cultural y lingüística, y (5) viabilidad práctica (longitud, costo, formación requerida para su aplicación).

Adaptar un instrumento de otro idioma o cultura no es simplemente traducirlo: requiere un proceso de adaptación cultural que incluye traducción inversa, revisión por expertos, piloteo cognitivo y verificación de equivalencia psicométrica.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Selección de instrumento según constructo y contexto',
      description:
        'Para medir ansiedad en atención primaria, el investigador evalúa tres opciones: el GAD-7 (7 ítems, validado para cribado en APS, ampliamente usado en Chile), el STAI (40 ítems, distingue ansiedad rasgo/estado, más tiempo de aplicación) y el BAI (21 ítems, énfasis en síntomas somáticos). Elige el GAD-7 por su brevedad, validez documentada y adecuación al contexto clínico.',
      applicableContext:
        'Ilustra el proceso de selección de instrumento considerando constructo, contexto y propiedades psicométricas.',
    },
    {
      id: 'ej-2',
      title: 'Problema de validez en una medida fisiológica',
      description:
        'Un estudio usa la frecuencia cardíaca como medida de "ansiedad social". El aumento de FC puede deberse a estrés, actividad física previa, cafeína o anticipación positiva (emoción). Sin una operacionalización que controle estas fuentes alternativas, la validez de la FC como medida de ansiedad social es cuestionable.',
      applicableContext:
        'Muestra que la objetividad de una medida no garantiza automáticamente su validez para el constructo.',
    },
  ],
  commonMistakes: [
    'Elegir un instrumento solo porque está disponible o es conocido, sin verificar evidencia de validez para la población específica del estudio.',
    'Asumir que la traducción directa de un instrumento garantiza equivalencia cultural y psicométrica.',
    'Ignorar las instrucciones de administración y puntuación del instrumento, lo que invalida la comparación con normas existentes.',
    'Usar un instrumento diseñado para diagnóstico clínico en una muestra no clínica, o viceversa, sin considerar las implicaciones.',
    'No reportar las propiedades psicométricas del instrumento en el contexto del estudio (confiabilidad obtenida, no solo la reportada en el manual).',
  ],
  prerequisites: ['medicion-constructos', 'medicion-operacionalizacion'],
  relatedConcepts: ['medicion-validez', 'medicion-confiabilidad', 'psicometria-construccion-instrumentos'],
  masteryCriteria: [
    'Distinguir los principales tipos de instrumentos de medición en psicología y señalar sus ventajas y limitaciones.',
    'Identificar los criterios relevantes para seleccionar un instrumento según constructo, población y contexto.',
    'Explicar por qué la traducción de un instrumento no equivale a su adaptación cultural.',
    'Evaluar si la elección de un instrumento en un estudio publicado es adecuada para el constructo y la muestra.',
  ],
}
