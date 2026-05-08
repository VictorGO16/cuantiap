import type { Concept } from '@/types/core'

export const disenos: Concept = {
  id: 'metodologia-disenos',
  moduleId: 'metodologia',
  version: '1.0.0',
  title: 'Diseños de investigación',
  summary:
    'El diseño de investigación es el plan estructurado que especifica cómo se recolectarán, controlarán y analizarán los datos para responder la pregunta de investigación. Los diseños se clasifican en experimentales —donde el investigador manipula la VI y asigna aleatoriamente a los participantes— y no experimentales —donde se estudian variables tal como ocurren naturalmente.',
  explanation: `El diseño de investigación es la decisión arquitectónica central de un estudio: determina qué conclusiones son posibles y cuáles no. Elegir un diseño inadecuado para la pregunta de investigación es uno de los errores más costosos, porque no puede corregirse una vez que los datos están recolectados.

**Diseños experimentales**

En los diseños experimentales, el investigador controla directamente la VI manipulándola y asignando aleatoriamente a los participantes a las condiciones. La asignación aleatoria es el mecanismo que permite controlar las variables extrañas y hacer inferencias causales.

El experimento clásico (diseño de grupos aleatorios con pretest-postest) incluye: (1) medición inicial de la VD en todos los participantes, (2) asignación aleatoria al grupo experimental o control, (3) aplicación del tratamiento al grupo experimental, (4) medición final de la VD en todos los participantes. La diferencia entre grupos en el postest, ajustada por el pretest, se atribuye al efecto del tratamiento.

Los diseños factoriales permiten examinar simultáneamente el efecto de dos o más VI y sus interacciones.

**Diseños cuasiexperimentales**

Los diseños cuasiexperimentales manipulan la VI pero no asignan aleatoriamente. Los grupos se forman por criterios naturales o prácticos (cursos, consultorios, escuelas). Sin aleatorización, las diferencias entre grupos previas al tratamiento son una amenaza a la validez interna, lo que limita la inferencia causal.

**Diseños no experimentales**

En los diseños no experimentales, el investigador no manipula ninguna variable; mide y observa lo que ocurre naturalmente. Permiten describir, explorar y estudiar relaciones entre variables, pero no permiten concluir causalidad.

- *Descriptivos*: documentan la prevalencia o distribución de variables en una muestra o población.
- *Correlacionales*: examinan la relación entre dos o más variables, cuantificando su fuerza y dirección.
- *Ex post facto*: estudian el efecto de una VI que ya ocurrió (p. ej., abuso infantil en la infancia sobre variables psicológicas en la adultez).

**Dimensión temporal**

Transversales: los datos se recolectan en un único momento. Longitudinales: los datos se recolectan en varios momentos en el tiempo, lo que permite estudiar cambios y estabilidad. Los diseños longitudinales son más informativos pero más costosos y están expuestos a la mortalidad muestral.

La validez interna —certeza de que los cambios observados en la VD se deben a la VI y no a factores extraños— es mayor en los diseños experimentales. La validez externa —generalización de los resultados a otras personas, contextos y tiempos— depende del procedimiento de muestreo y de la representatividad de la muestra.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Diseño experimental para evaluar intervención',
      description:
        'Un estudio asigna aleatoriamente a 60 estudiantes con ansiedad al test a un grupo de intervención (técnicas de regulación cognitiva) o a un grupo control (lista de espera). Se mide ansiedad antes y después de la intervención. La aleatorización controla diferencias previas entre grupos.',
      applicableContext:
        'Muestra las condiciones necesarias para un diseño experimental válido: manipulación de VI y asignación aleatoria.',
    },
    {
      id: 'ej-2',
      title: 'Diseño correlacional transversal',
      description:
        'Se aplica a 150 adultos mayores una batería de instrumentos que mide actividad física, función cognitiva y calidad de vida. El análisis de correlaciones examina qué variables se asocian. No es posible concluir causalidad: que la actividad física se correlacione con mejor función cognitiva no implica que una cause la otra.',
      applicableContext:
        'Ilustra las posibilidades y limitaciones de los diseños no experimentales correlacionales.',
    },
  ],
  commonMistakes: [
    'Concluir causalidad a partir de diseños correlacionales o cuasiexperimentales sin la justificación metodológica adecuada.',
    'Confundir diseño cuasiexperimental con experimental; la diferencia clave es la asignación aleatoria, no la manipulación de la VI.',
    'Elegir un diseño transversal cuando la pregunta de investigación requiere estudiar cambios en el tiempo.',
    'Ignorar las amenazas a la validez interna propias del diseño elegido y no reportarlas como limitaciones.',
    'Subestimar la complejidad de los diseños longitudinales: pérdida de participantes, efectos de maduración, efectos del testeo repetido.',
  ],
  prerequisites: [
    'metodologia-problema-investigacion',
    'metodologia-hipotesis',
    'metodologia-variables',
  ],
  relatedConcepts: ['metodologia-muestreo', 'estadistica-supuestos', 'estadistica-inferencial'],
  masteryCriteria: [
    'Clasificar un diseño de investigación descrito como experimental, cuasiexperimental o no experimental, justificando la clasificación.',
    'Explicar por qué la asignación aleatoria es la condición necesaria para inferir causalidad.',
    'Distinguir diseños transversales de longitudinales y señalar qué preguntas de investigación responde mejor cada uno.',
    'Identificar las principales amenazas a la validez interna según el diseño utilizado.',
  ],
}
