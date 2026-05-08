import type { Concept } from '@/types/core'

export const interpretacion: Concept = {
  id: 'estadistica-interpretacion',
  moduleId: 'estadistica',
  version: '1.0.0',
  title: 'Interpretación de resultados estadísticos',
  summary:
    'Interpretar resultados estadísticos correctamente requiere ir más allá del valor p. El reporte completo incluye el estadístico de prueba, los grados de libertad, el valor p, el tamaño del efecto, el intervalo de confianza y la relevancia sustantiva del resultado. La significancia estadística y la relevancia práctica son dimensiones distintas que pueden disociarse.',
  explanation: `La interpretación de resultados estadísticos es donde la técnica estadística se convierte en conocimiento. Un resultado reportado solo como "significativo" o "no significativo" es un resultado incompleto.

**El reporte estándar actual**

Las normas APA actuales (7ª edición) y la mayoría de las revistas científicas exigen reportar: el estadístico de prueba con sus grados de libertad, el valor p exacto (no solo "p < .05"), el tamaño del efecto con su intervalo de confianza y una descripción sustantiva de lo que el resultado significa en el contexto del estudio.

Ejemplo de reporte completo: "Los estudiantes del grupo de intervención obtuvieron mayores puntajes en bienestar (M = 68.4, SD = 9.2) que los del grupo control (M = 63.1, SD = 10.4), t(148) = 3.12, p = .002, d = 0.51, IC 95% [0.18, 0.84]."

**Tamaños del efecto y sus convenciones**

Los tamaños del efecto más comunes y sus convenciones (Cohen, 1988):

- *d de Cohen*: pequeño = .20, mediano = .50, grande = .80. Aplica a comparaciones de dos medias.
- *f de Cohen*: pequeño = .10, mediano = .25, grande = .40. Aplica a ANOVA.
- *r de Pearson*: pequeño = .10, mediano = .30, grande = .50.
- *η²* (eta-cuadrado): pequeño = .01, mediano = .06, grande = .14. Aplica a ANOVA.
- *ω²* (omega-cuadrado): versión menos sesgada de η², preferida con muestras pequeñas.

Las convenciones de Cohen son puntos de referencia, no reglas rígidas. Un efecto "pequeño" puede ser importante si el contexto lo justifica (p. ej., una intervención de bajo costo que mejora minimamente pero en muchas personas).

**Disociación entre significancia y relevancia**

Un resultado estadísticamente significativo no es necesariamente relevante. Con muestras grandes (n > 500), diferencias minúsculas pueden ser significativas. Un resultado no significativo no equivale a "no hay efecto"; puede reflejar falta de potencia estadística.

El concepto de equivalencia estadística (pruebas TOST) evalúa si un efecto es lo suficientemente pequeño para considerarse prácticamente equivalente a cero, en contraste con la lógica NHST que solo evalúa si el efecto existe.

**Limitaciones y contexto**

La interpretación debe situar el resultado en el contexto de la literatura. ¿Es este efecto consistente con estudios anteriores? ¿Las diferencias podrían explicarse por características de la muestra, el instrumento o el diseño? ¿Cuáles son las limitaciones del estudio que afectan la confianza en las conclusiones?

La replicabilidad es una consideración clave: un resultado significativo en un único estudio con muestra pequeña tiene menos credibilidad que uno replicado en múltiples estudios con muestras diversas. Las crisis de replicabilidad en psicología (Open Science Collaboration, 2015) subrayan la importancia de interpretar los resultados con cautela.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Reporte completo vs. reporte incompleto',
      description:
        'Reporte incompleto: "Hubo diferencias significativas entre grupos (p < .05)." Reporte completo: "Los estudiantes de psicología (M = 45.2, SD = 8.1) reportaron mayor empatía que los de ingeniería (M = 41.8, SD = 9.3), t(178) = 2.46, p = .015, d = 0.37, IC 95% [0.07, 0.67]. El tamaño del efecto es pequeño-moderado, lo que sugiere que aunque la diferencia es estadísticamente significativa, la superposición entre distribuciones es considerable."',
      applicableContext:
        'Contrasta el reporte mínimo (solo p) con el reporte completo que incluye toda la información necesaria para interpretar el resultado.',
    },
    {
      id: 'ej-2',
      title: 'Resultado significativo pero trivial',
      description:
        'Un estudio con n = 5000 encuentra que el puntaje promedio de satisfacción laboral es mayor en empleados con contrato indefinido que a plazo fijo: M₁ = 4.23 vs. M₂ = 4.18 (escala de 1 a 5), t(4998) = 3.87, p < .001, d = 0.05. El resultado es altamente significativo pero el tamaño del efecto es trivial (d = 0.05). La diferencia de 0.05 puntos en una escala de 5 no tiene relevancia práctica.',
      applicableContext:
        'Ilustra la disociación entre significancia estadística y relevancia práctica en muestras grandes.',
    },
  ],
  commonMistakes: [
    'Interpretar p < .05 como "el efecto es grande" o "el resultado es importante", sin reportar el tamaño del efecto.',
    'Concluir que la hipótesis de investigación quedó "probada" o "confirmada"; los resultados son evidencia consistente o inconsistente, no pruebas.',
    'Reportar solo los resultados significativos y omitir los no significativos, contribuyendo al sesgo de publicación.',
    'No discutir las limitaciones del estudio al interpretar los resultados, presentándolos como más concluyentes de lo que son.',
    'Generalizar los resultados más allá de la población de la que se extrajo la muestra.',
  ],
  prerequisites: [
    'estadistica-inferencial',
    'estadistica-error-tipo-i-ii',
    'estadistica-pruebas-parametricas',
  ],
  relatedConcepts: [
    'metodologia-hipotesis',
    'psicometria-interpretacion-puntajes',
    'medicion-validez',
  ],
  masteryCriteria: [
    'Redactar el reporte completo de un resultado estadístico incluyendo estadístico, grados de libertad, p, tamaño del efecto e IC.',
    'Aplicar las convenciones de Cohen para interpretar la magnitud de los tamaños del efecto más comunes.',
    'Distinguir significancia estadística de relevancia práctica con ejemplos.',
    'Identificar las limitaciones que deben discutirse al interpretar resultados de un estudio cuantitativo.',
  ],
}
