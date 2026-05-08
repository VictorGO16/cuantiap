import type { Concept } from '@/types/core'

export const construccionInstrumentos: Concept = {
  id: 'psicometria-construccion-instrumentos',
  moduleId: 'psicometria',
  version: '1.0.0',
  title: 'Construcción de instrumentos',
  summary:
    'La construcción de un instrumento psicológico es un proceso sistemático que va desde la definición del constructo hasta la validación del instrumento final. Las etapas incluyen marco conceptual, generación de ítems, revisión por expertos, piloteo cognitivo, estudio piloto, análisis psicométrico y validación.',
  explanation: `Construir un instrumento psicológico válido y confiable es un proceso riguroso que puede tomar años. La mayoría de los problemas de medición en investigación psicológica se originan en instrumentos mal construidos o mal adaptados.

**Etapa 1: Marco conceptual**

Antes de escribir un solo ítem, el constructor debe tener una definición clara y bien delimitada del constructo: qué incluye, qué excluye, cuáles son sus dimensiones y cómo se distingue de constructos relacionados. Esta definición debe sustentarse en teoría y revisión de literatura.

**Etapa 2: Generación del pool de ítems**

Se genera un conjunto inicial de ítems que supera en número a los que tendrá el instrumento final (habitualmente al menos el doble). Los ítems deben representar adecuada y proporcionalmente todas las dimensiones del constructo. Las fuentes para generar ítems incluyen la revisión de instrumentos existentes, entrevistas con personas de la población objetivo y juicio de expertos en el constructo.

**Etapa 3: Revisión por expertos (validez de contenido)**

Un panel de expertos evalúa si cada ítem es relevante, claro y representativo del constructo. Se calculan índices de acuerdo como el IVC (Índice de Validez de Contenido) de Lawshe. Ítems con IVC bajo se eliminan o reformulan.

**Etapa 4: Piloteo cognitivo**

Un pequeño grupo de personas de la población objetivo lee y responde los ítems en voz alta, verbalizando su proceso de comprensión. Este piloteo detecta ítems ambiguos, doble barreled (que preguntan dos cosas a la vez), con vocabulario inadecuado o que generan respuestas no esperadas.

**Etapa 5: Estudio piloto y análisis psicométrico**

Se aplica el pool de ítems a una muestra representativa (habitualmente 200-500 personas, dependiendo de los análisis). Se examinan: distribución de respuestas, correlaciones ítem-total, análisis factorial exploratorio para verificar la estructura del constructo, y estimación de la confiabilidad.

**Etapa 6: Análisis factorial confirmatorio y validación**

En una muestra independiente, se verifica la estructura factorial con AFC y se recogen múltiples tipos de evidencia de validez (convergente, discriminante, de criterio). Se establece la baremación si se requiere interpretación normativa.

**Principios de redacción de ítems**

Los ítems deben ser: breves y simples, redactados en el vocabulario de la población objetivo, no ambiguos, no doble barreled, no formulados con doble negación. Las escalas de respuesta deben ser apropiadas para el tipo de ítem (frecuencia, intensidad, acuerdo) y tener suficientes puntos para capturar variabilidad.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Ítem doble barreled y su corrección',
      description:
        '"Me siento cansado y sin motivación cuando pienso en mis estudios." Este ítem pregunta dos cosas a la vez: cansancio y falta de motivación. Un participante puede sentirse muy cansado pero relativamente motivado. La corrección separa el ítem en dos: "Me siento cansado cuando pienso en mis estudios." y "Me siento sin motivación respecto a mis estudios."',
      applicableContext:
        'Ilustra un error frecuente en redacción de ítems y cómo corregirlo.',
    },
    {
      id: 'ej-2',
      title: 'Análisis de ítems en el estudio piloto',
      description:
        'En un estudio piloto de una nueva escala de procrastinación académica (n=250), el ítem 4 tiene media = 1.2 sobre 5, con el 82% de los participantes respondiendo "nunca". Esta distribución con efecto suelo indica que el ítem no diferencia bien entre personas con distintos niveles de procrastinación. Se reformula para capturar conductas más frecuentes.',
      applicableContext:
        'Muestra cómo el análisis de distribución de respuestas en el piloto informa la mejora de ítems.',
    },
  ],
  commonMistakes: [
    'Saltar al análisis factorial sin un marco conceptual claro, lo que lleva a retener factores estadísticos sin interpretación sustantiva.',
    'Construir ítems sin piloteo cognitivo, resultando en ítems que los participantes interpretan de manera distinta a la esperada.',
    'Generar un pool inicial de ítems insuficiente, lo que limita las posibilidades de depuración.',
    'Confundir el análisis factorial exploratorio con el confirmatorio; el exploratorio genera hipótesis sobre la estructura, el confirmatorio las contrasta.',
    'Asumir que un instrumento construido en un grupo puede usarse directamente en otro sin verificar invarianza de medición.',
  ],
  prerequisites: ['psicometria-fundamentos', 'medicion-validez', 'medicion-confiabilidad'],
  relatedConcepts: [
    'psicometria-evidencia-validez',
    'psicometria-confiabilidad-clasica',
    'medicion-sesgo',
  ],
  masteryCriteria: [
    'Describir las etapas del proceso de construcción de un instrumento psicológico.',
    'Identificar las características de un ítem bien redactado y detectar problemas frecuentes (doble barreled, ambigüedad, doble negación).',
    'Explicar el propósito del piloteo cognitivo y qué información proporciona.',
    'Describir los análisis psicométricos mínimos del estudio piloto: distribución de respuestas, correlaciones ítem-total, análisis factorial.',
  ],
}
