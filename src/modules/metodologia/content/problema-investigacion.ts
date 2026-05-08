import type { Concept } from '@/types/core'

export const problemaInvestigacion: Concept = {
  id: 'metodologia-problema-investigacion',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Formulación del problema de investigación',
  summary:
    'El problema de investigación es una brecha en el conocimiento que el estudio pretende reducir. Formularlo correctamente determina la viabilidad del estudio, el diseño adecuado y la relevancia de los resultados. Un problema bien formulado es específico, empíricamente abordable y sustentado en literatura.',
  explanation: `La formulación del problema es el paso más crítico de la investigación cuantitativa. Un problema mal planteado hace que todo lo que sigue —hipótesis, diseño, análisis— sea irrelevante o incoherente.

Un problema de investigación surge de identificar una brecha: algo que no se sabe, que está en disputa o que necesita verificación empírica. No toda pregunta es un problema de investigación. "¿Es mejor la terapia cognitivo-conductual?" no es un problema investigable sin especificar: ¿mejor que qué?, ¿para quién?, ¿en qué resultado?, ¿medido cómo?

Los criterios para evaluar un problema de investigación son:

**Relevancia teórica o práctica.** El problema debe conectarse con un cuerpo de conocimiento existente o tener implicancias para la práctica profesional. La revisión de literatura permite identificar qué se sabe y dónde están las brechas.

**Viabilidad empírica.** El problema debe ser abordable con los recursos disponibles: tiempo, acceso a participantes, instrumentos existentes o construibles, financiamiento. Un problema perfectamente formulado pero inviable no conduce a investigación real.

**Especificidad.** Preguntas amplias como "¿qué afecta el bienestar?" deben acotarse a variables concretas, poblaciones definidas y contextos específicos.

**Carácter empírico.** El problema debe resolverse con evidencia, no con razonamiento filosófico o moral. "¿Es ética la pena de muerte?" no es un problema de investigación empírica; "¿cómo afecta la exposición a debates sobre la pena de muerte las actitudes punitivas en estudiantes universitarios?" sí lo es.

La pregunta de investigación es la forma sintética del problema. Debe formularse con precisión: incluye las variables de interés, la población y el tipo de relación que se indaga. Un problema puede dar lugar a una pregunta principal y varias secundarias.

El alcance de la investigación —exploratorio, descriptivo, correlacional o explicativo— se deriva del estado del conocimiento sobre el problema. Cuando un fenómeno es poco conocido, los estudios exploratorios y descriptivos son los adecuados. Cuando hay teoría y evidencia acumulada, es posible formular hipótesis causales y diseños explicativos.

La justificación del estudio articula por qué vale la pena investigar este problema: qué conocimiento genera, qué decisiones informa, qué poblaciones beneficia.`,
  examples: [
    {
      id: 'ej-1',
      title: 'De pregunta amplia a problema investigable',
      description:
        'Pregunta inicial: "¿Cómo influye el uso de redes sociales en los jóvenes?" → Problema reformulado: "¿En qué medida el uso diario de Instagram se asocia con niveles de insatisfacción corporal en mujeres de 18 a 25 años de Santiago?" La segunda versión es específica, empíricamente abordable y define población, variables y contexto.',
      applicableContext: 'Muestra el proceso de refinamiento desde una inquietud general hasta un problema de investigación válido.',
    },
    {
      id: 'ej-2',
      title: 'Justificación de relevancia teórica y práctica',
      description:
        'Un investigador estudia la relación entre perfeccionismo y agotamiento académico en estudiantes de medicina. La justificación teórica señala la brecha en estudios latinoamericanos sobre esta relación; la justificación práctica apunta a que los resultados pueden informar programas de bienestar estudiantil.',
      applicableContext: 'Ilustra cómo articular relevancia en términos que la comunidad científica y los tomadores de decisiones puedan valorar.',
    },
  ],
  commonMistakes: [
    'Confundir el tema de investigación con el problema de investigación; un tema es amplio, un problema es una brecha específica en el conocimiento.',
    'Formular preguntas cuya respuesta ya existe en la literatura disponible, sin haberla revisado.',
    'Plantear problemas no empíricos, como preguntas filosóficas, normativas o puramente teóricas que no pueden responderse con datos.',
    'Formular el problema sin considerar la viabilidad del estudio, incluyendo acceso a la muestra y disponibilidad de instrumentos válidos.',
    'Usar lenguaje vago o términos sin definir en la pregunta de investigación ("bienestar", "éxito", "salud mental" sin especificar).',
  ],
  prerequisites: ['metodologia-fundamentos'],
  relatedConcepts: [
    'metodologia-objetivos',
    'metodologia-hipotesis',
    'metodologia-variables',
    'metodologia-disenos',
  ],
  masteryCriteria: [
    'Distinguir un problema de investigación de una simple pregunta de interés.',
    'Aplicar los criterios de relevancia, viabilidad, especificidad y carácter empírico para evaluar un problema.',
    'Reformular una pregunta amplia en un problema de investigación cuantitativa válido.',
    'Identificar el alcance apropiado (exploratorio, descriptivo, correlacional o explicativo) según el estado del conocimiento sobre el problema.',
  ],
}
