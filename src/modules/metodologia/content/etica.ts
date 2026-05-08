import type { Concept } from '@/types/core'

export const etica: Concept = {
  id: 'metodologia-etica',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Ética en la investigación cuantitativa',
  summary:
    'La investigación con seres humanos exige respetar principios éticos que protegen la dignidad, la autonomía y el bienestar de los participantes. En psicología, estos principios se articulan en normativas internacionales y en los códigos de ética de las asociaciones profesionales.',
  explanation: `La ética en investigación no es un trámite formal: es la condición que hace posible que la ciencia sea confiable y socialmente legítima. Cuando se estudian personas, existe una asimetría de poder entre investigador y participante que debe gestionarse con procedimientos claros.

Los principios éticos centrales en investigación con seres humanos provienen del Informe Belmont (1979), que establece tres principios fundamentales: respeto por las personas (autonomía), beneficencia y justicia. A partir de este marco, organismos como la American Psychological Association (APA) han desarrollado normativas específicas para la investigación psicológica.

El consentimiento informado es el procedimiento mediante el cual el investigador explica al participante, de forma comprensible, el propósito del estudio, los procedimientos, los posibles riesgos y beneficios, el carácter voluntario de la participación y el derecho a retirarse sin consecuencias. El consentimiento debe ser libre, voluntario y basado en información suficiente. En estudios con menores de edad o poblaciones vulnerables, se requiere el asentimiento del menor y el consentimiento del tutor legal.

La confidencialidad implica proteger la identidad y los datos de los participantes. Los datos deben almacenarse de forma segura y anonimizarse cuando sea posible. El investigador solo puede revelar información personal cuando existe un riesgo grave e inminente para el participante u otras personas.

El engaño en investigación —ocultar el propósito real del estudio— se justifica excepcionalmente cuando (a) el conocimiento no puede obtenerse de otro modo, (b) los participantes no se verán afectados negativamente y (c) existe un debriefing posterior claro. El uso del engaño requiere revisión ética explícita.

La revisión ética institucional (comités de ética o IRB, por sus siglas en inglés) es el mecanismo que verifica que los estudios cumplen con los estándares antes de iniciarse. En investigación formativa, los estudiantes deben someter sus proyectos a revisión ética siguiendo los procedimientos de su institución.

La publicación responsable implica reportar los datos de forma honesta, no omitir resultados desfavorables a las hipótesis, no fabricar ni falsificar datos, y dar crédito adecuado a todas las personas que contribuyeron al estudio.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Consentimiento en estudio sobre trauma',
      description:
        'Un investigador estudia el impacto del abuso infantil en adultos. Diseña un formulario de consentimiento que explica la temática sensible del estudio, informa que los datos serán anonimizados y proporciona contactos de apoyo psicológico en caso de que los participantes lo necesiten.',
      applicableContext:
        'Muestra cómo gestionar el consentimiento en estudios con contenido sensible y cómo proteger el bienestar del participante.',
    },
    {
      id: 'ej-2',
      title: 'Uso controlado del engaño',
      description:
        'En un estudio sobre conformismo social, el investigador no revela la hipótesis para evitar que los participantes modifiquen su comportamiento. Luego del estudio realiza un debriefing explicando el propósito real, verificando que los participantes no quedaron con información distorsionada ni con malestar.',
      applicableContext:
        'Ilustra cuándo el engaño es metodológicamente justificable y cuáles son sus condiciones éticas.',
    },
  ],
  commonMistakes: [
    'Tratar el consentimiento informado como un trámite burocrático en lugar de un proceso de comunicación real con el participante.',
    'Omitir el derecho del participante a retirarse del estudio en cualquier momento sin necesidad de justificarse.',
    'Confundir anonimato (nunca se conoce la identidad) con confidencialidad (se conoce pero se protege).',
    'Reportar solo los resultados estadísticamente significativos y omitir los no significativos, lo que distorsiona el conocimiento acumulado (sesgo de publicación).',
    'No prever el impacto emocional que puede tener participar en un estudio sobre temas sensibles.',
  ],
  prerequisites: ['metodologia-fundamentos'],
  relatedConcepts: ['metodologia-problema-investigacion', 'medicion-sesgo'],
  masteryCriteria: [
    'Explicar los tres principios del Informe Belmont y su aplicación en psicología.',
    'Describir los componentes de un consentimiento informado válido.',
    'Distinguir entre anonimato y confidencialidad con ejemplos.',
    'Identificar las condiciones bajo las cuales el engaño en investigación puede ser éticamente aceptable.',
  ],
}
