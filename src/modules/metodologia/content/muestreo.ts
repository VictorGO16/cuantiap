import type { Concept } from '@/types/core'

export const muestreo: Concept = {
  id: 'metodologia-muestreo',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Muestreo',
  summary:
    'El muestreo es el proceso de seleccionar un subconjunto de individuos —la muestra— de una población más amplia, con el objetivo de obtener información que permita hacer inferencias sobre esa población. La calidad del muestreo determina en gran medida la validez externa del estudio.',
  explanation: `El objetivo del muestreo en investigación cuantitativa es obtener una muestra que represente adecuadamente a la población de interés, de modo que las conclusiones del estudio puedan generalizarse más allá de las personas efectivamente estudiadas.

**Conceptos fundamentales**

La *población* es el conjunto completo de individuos que comparten las características de interés para el estudio. La *muestra* es el subconjunto de esa población que efectivamente participa. El *marco muestral* es la lista o base de datos a partir de la cual se selecciona la muestra; no siempre coincide perfectamente con la población teórica.

**Tipos de muestreo**

Los muestreos *probabilísticos* asignan a cada miembro de la población una probabilidad conocida y distinta de cero de ser seleccionado. Esto hace posible la inferencia estadística y el cálculo de márgenes de error.

- *Aleatorio simple*: todos los individuos tienen la misma probabilidad de ser seleccionados. Requiere un marco muestral completo.
- *Aleatorio estratificado*: se divide la población en estratos (subgrupos según una variable relevante, como género o nivel socioeconómico) y se selecciona aleatoriamente dentro de cada estrato. Garantiza representación de subgrupos.
- *Por conglomerados*: se seleccionan aleatoriamente grupos (escuelas, comunidades) y se estudia a todos los individuos dentro de los grupos seleccionados. Práctico cuando no se dispone de un marco muestral individual.
- *Sistemático*: se selecciona cada k-ésimo elemento del marco muestral.

Los muestreos *no probabilísticos* no garantizan que cada miembro de la población tenga una probabilidad conocida de ser seleccionado. Son más fáciles de implementar pero limitan la generalización.

- *Por conveniencia*: se seleccionan los casos más accesibles. Común en investigación formativa y en estudios con poblaciones difíciles de acceder.
- *Intencional o de juicio*: el investigador selecciona casos que cumplan criterios específicos.
- *Bola de nieve*: los participantes reclutan a otros participantes de su red. Útil para poblaciones ocultas o de difícil acceso.

**Tamaño muestral**

El tamaño de la muestra determina la potencia estadística: la capacidad del estudio para detectar un efecto real cuando existe. El tamaño adecuado depende del tamaño del efecto esperado, del nivel de significancia establecido (α) y de la potencia deseada (habitualmente 0,80 o 0,90). Los cálculos de potencia deben realizarse antes de iniciar el estudio, no después.

Una muestra pequeña puede producir un resultado no significativo aunque el efecto exista (error tipo II). Una muestra excesivamente grande detectará diferencias estadísticamente significativas que son triviales en términos prácticos.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Muestreo estratificado en estudio nacional',
      description:
        'Un estudio sobre bienestar psicológico en adultos chilenos estratifica la muestra por región y nivel educativo para garantizar representación proporcional. Dentro de cada estrato, la selección es aleatoria. Esto evita que algunas regiones o grupos socioeconómicos queden subrepresentados.',
      applicableContext:
        'Ilustra cuándo y por qué el muestreo estratificado mejora la representatividad frente al aleatorio simple.',
    },
    {
      id: 'ej-2',
      title: 'Conveniencia y limitaciones de generalización',
      description:
        'Un investigador estudia procrastinación académica aplicando un cuestionario a los 80 estudiantes de su curso. La muestra es conveniente: no puede afirmarse que sea representativa de todos los universitarios del país. Las conclusiones deben limitarse a ese contexto específico.',
      applicableContext:
        'Muestra cómo el muestreo por conveniencia limita la generalización y cómo debe reportarse.',
    },
  ],
  commonMistakes: [
    'Confundir muestra grande con muestra representativa; el tamaño no garantiza representatividad si el método de selección es sesgado.',
    'Calcular el tamaño muestral después de recolectar los datos (justificación post hoc) en lugar de hacer un análisis de potencia a priori.',
    'Ignorar la mortalidad muestral en estudios longitudinales, lo que puede sesgar sistemáticamente la muestra final.',
    'Generalizar conclusiones a poblaciones distintas de aquella de la que se extrajo la muestra.',
    'Confundir el marco muestral con la población teórica, sin reconocer las diferencias entre ambos.',
  ],
  prerequisites: ['metodologia-disenos'],
  relatedConcepts: [
    'estadistica-inferencial',
    'estadistica-error-tipo-i-ii',
    'medicion-sesgo',
  ],
  masteryCriteria: [
    'Distinguir muestreo probabilístico de no probabilístico y señalar las implicaciones para la inferencia estadística.',
    'Seleccionar el tipo de muestreo más apropiado para una pregunta de investigación y una población dadas.',
    'Explicar qué determina el tamaño muestral adecuado y por qué el análisis de potencia debe hacerse antes del estudio.',
    'Identificar las principales limitaciones de generalización según el tipo de muestreo utilizado.',
  ],
}
