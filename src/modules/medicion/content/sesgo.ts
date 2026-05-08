import type { Concept } from '@/types/core'

export const sesgo: Concept = {
  id: 'medicion-sesgo',
  moduleId: 'medicion',
  version: '1.0.0',
  title: 'Sesgo en medición',
  summary:
    'El sesgo de medición ocurre cuando los puntajes de un instrumento están sistemáticamente distorsionados por factores ajenos al constructo de interés. A diferencia del error aleatorio, el sesgo es sistemático y afecta la validez de las inferencias. Las fuentes de sesgo incluyen características del instrumento, del evaluador, del participante y del contexto.',
  explanation: `El error aleatorio reduce la confiabilidad, pero es impredecible y su efecto promedio en una muestra grande tiende a cero. El sesgo, en cambio, distorsiona los puntajes de manera consistente y en una dirección específica, lo que amenaza directamente la validez.

**Sesgo de deseabilidad social**

Los participantes responden de acuerdo con lo que perciben como socialmente aceptable o que les hace quedar bien, en lugar de con honestidad. Es particularmente relevante en medidas de actitudes, conductas socialmente sensibles (consumo de alcohol, violencia) y variables relacionadas con la autoimage. Se controla mediante el anonimato, las instrucciones que normalizan las respuestas honestas, el uso de escalas de deseabilidad social como covariable y, cuando es posible, el uso de medidas indirectas.

**Aquiescencia**

Tendencia a responder afirmativamente o de acuerdo con los ítems independientemente de su contenido. Se controla incluyendo ítems inversos (redactados en dirección opuesta al constructo): si alguien responde de la misma manera a "me siento seguro" y a "me siento inseguro", probablemente está aquiesciendo. Los ítems inversos tienen sus propios problemas (confusión semántica), por lo que deben usarse con cuidado.

**Sesgo de extremosidad**

Tendencia a usar los extremos de la escala de respuesta (siempre o nunca) independientemente de la intensidad real de la experiencia. Varía culturalmente y puede afectar la comparabilidad entre grupos.

**Efecto del evaluador**

En instrumentos de observación o entrevistas estructuradas, el evaluador puede sesgarse por expectativas previas (efecto halo), por fatiga (si evalúa muchos casos seguidos) o por características del participante irrelevantes para la evaluación. Se controla mediante entrenamiento, uso de guías detalladas, evaluación ciega y verificación de confiabilidad interjueces.

**Sesgo de memoria**

En medidas retrospectivas, los participantes reconstruyen eventos pasados de manera imprecisa, influidos por el estado afectivo actual, el tiempo transcurrido o la saliencia del evento. Los estudios prospectivos y los diarios experienciales reducen este sesgo.

**Invarianza de medición y sesgo entre grupos**

Cuando se comparan grupos (géneros, culturas, generaciones), el sesgo puede manifestarse como no invarianza del instrumento: el instrumento no funciona de la misma manera en todos los grupos. Antes de comparar puntajes entre grupos, debe verificarse la invarianza de medición mediante análisis factorial multigrupo.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Deseabilidad social en conductas sensibles',
      description:
        'Un estudio sobre consumo de alcohol en universitarios aplica el cuestionario de manera presencial con el nombre del participante. Los puntajes son significativamente más bajos que los obtenidos cuando el mismo cuestionario se aplica de forma anónima en línea. La diferencia refleja sesgo de deseabilidad social, no diferencias reales en el consumo.',
      applicableContext:
        'Muestra cómo el método de aplicación puede introducir sesgo sistemático en la medición.',
    },
    {
      id: 'ej-2',
      title: 'Ítems inversos para controlar aquiescencia',
      description:
        'Una escala de autoestima incluye ítems directos ("me siento satisfecho con quien soy") e inversos ("siento que no tengo mucho de qué estar orgulloso"). Un participante que responde siempre "muy de acuerdo" sin considerar la dirección del ítem probablemente está aquiesciendo. El análisis de correlación ítem-total permite detectar este patrón.',
      applicableContext:
        'Ilustra la lógica de los ítems inversos y cómo detectar aquiescencia en los datos.',
    },
  ],
  commonMistakes: [
    'Confundir error aleatorio (ruido impredecible) con sesgo (distorsión sistemática en una dirección).',
    'Asumir que el anonimato elimina completamente la deseabilidad social; reduce el sesgo pero rara vez lo elimina del todo.',
    'Incluir demasiados ítems inversos, lo que puede generar confusión en los participantes y reducir la calidad de las respuestas.',
    'Ignorar las diferencias culturales en el uso de escalas de respuesta (extremosidad, aquiescencia) al comparar grupos de distintos países.',
    'No verificar la invarianza de medición antes de comparar grupos, asumiendo que el instrumento funciona igual para todos.',
  ],
  prerequisites: ['medicion-instrumentos', 'medicion-validez'],
  relatedConcepts: [
    'medicion-confiabilidad',
    'metodologia-etica',
    'psicometria-evidencia-validez',
  ],
  masteryCriteria: [
    'Distinguir sesgo de error aleatorio y explicar por qué el sesgo es más problemático para la validez.',
    'Identificar al menos cuatro fuentes de sesgo en medición y describir estrategias de control para cada una.',
    'Explicar la lógica de los ítems inversos para controlar la aquiescencia y sus limitaciones.',
    'Describir qué es la invarianza de medición y por qué es relevante al comparar grupos.',
  ],
}
