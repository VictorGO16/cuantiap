import type { Concept } from '@/types/core'

export const disenos: Concept = {
  id: 'metodologia-disenos',
  moduleId: 'metodologia',
  version: '1.1.0',
  title: 'Diseños de investigación',
  summary:
    'El diseño de investigación es el plan lógico y operativo que conecta la pregunta, las hipótesis, las variables, la muestra, la recolección de datos y el análisis. Define qué evidencia se necesita, cómo se controlarán las explicaciones alternativas y qué tipo de conclusiones serán válidas: descriptivas, relacionales, predictivas o causales.',
  explanation: `El diseño de investigación es la arquitectura metodológica del estudio. No es solo una etiqueta formal, sino el conjunto de decisiones que determina qué datos se recolectan, cuándo se recolectan, con quiénes, bajo qué condiciones y con qué grado de control. Un buen diseño traduce una pregunta de investigación en un procedimiento capaz de producir evidencia pertinente y defendible.

La elección del diseño debe partir de la pregunta. Si la pregunta busca describir una situación, basta un diseño descriptivo bien muestreado. Si busca estimar asociaciones, se requiere un diseño correlacional o predictivo. Si busca explicar cambios en el tiempo, se necesita una estrategia longitudinal. Si busca probar efectos causales, el diseño debe maximizar el control sobre variables extrañas, idealmente mediante manipulación de la variable independiente y asignación aleatoria.

**La lógica del diseño**

Todo diseño debe resolver cuatro decisiones básicas:

- *Propósito*: describir, comparar, asociar, predecir, explicar o evaluar efectos.
- *Grado de control*: observar variables naturales, manipular una condición o controlar experimentalmente el contexto.
- *Temporalidad*: medir en un único momento, seguir casos durante el tiempo o reconstruir eventos ya ocurridos.
- *Unidad de análisis*: personas, grupos, instituciones, comunidades, documentos, registros clínicos u observaciones repetidas.

Estas decisiones no son independientes. Un estudio puede ser no experimental y longitudinal; experimental y factorial; cuasiexperimental y con medidas repetidas; descriptivo y transversal. Por eso conviene clasificar los diseños usando varias dimensiones, no una sola categoría.

**Diseños experimentales**

En un diseño experimental el investigador manipula deliberadamente una variable independiente (VI), asigna aleatoriamente a los participantes a condiciones y mide el efecto sobre una variable dependiente (VD). La asignación aleatoria es crucial porque distribuye, por azar, características conocidas y desconocidas entre los grupos. Gracias a ella, si los grupos difieren después de la intervención, la explicación más plausible es la manipulación experimental.

Un experimento clásico con pretest-postest incluye:

1. Medición inicial de la VD.
2. Asignación aleatoria al grupo experimental y al grupo control.
3. Aplicación del tratamiento o intervención al grupo experimental.
4. Ausencia de tratamiento, tratamiento habitual, placebo o lista de espera en el grupo control.
5. Medición final de la VD.
6. Comparación del cambio entre grupos.

La condición control no siempre significa "no hacer nada". Puede ser una lista de espera, una intervención alternativa, un placebo, el tratamiento habitual o una condición activa diseñada para controlar expectativas, contacto con profesionales o tiempo de exposición.

Los diseños experimentales permiten la inferencia causal más fuerte, pero no son automáticamente perfectos. Pueden fallar si hay abandono diferencial entre grupos, baja fidelidad de implementación, contaminación entre condiciones, instrumentos poco válidos o muestras tan artificiales que la generalización se vuelve débil.

**Variantes experimentales frecuentes**

- *Diseño postest con grupo control*: se asigna aleatoriamente y se mide solo al final. Es útil cuando el pretest puede sensibilizar a los participantes o alterar la respuesta.
- *Diseño pretest-postest con grupo control*: permite estimar cambio y verificar equivalencia inicial entre grupos.
- *Diseño Solomon de cuatro grupos*: combina grupos con y sin pretest para evaluar si el pretest produce efectos de sensibilización.
- *Diseños factoriales*: manipulan dos o más VI al mismo tiempo. Permiten estimar efectos principales e interacciones.
- *Diseños intra-sujeto o de medidas repetidas*: las mismas personas pasan por varias condiciones. Aumentan potencia estadística, pero requieren controlar efectos de orden, aprendizaje y fatiga.
- *Diseños de caso único experimental*: evalúan cambios sistemáticos en uno o pocos casos mediante fases como línea base, intervención y retiro o alternancia de tratamientos.

Los diseños factoriales son especialmente importantes porque muchas preguntas psicológicas, educativas y sociales no dependen de una sola causa. Por ejemplo, una intervención puede funcionar solo en estudiantes con alta motivación inicial, o un programa puede ser más eficaz cuando se combina con acompañamiento familiar. Esa diferencia entre condiciones es una interacción.

**Diseños cuasiexperimentales**

Los diseños cuasiexperimentales manipulan o introducen una intervención, pero no asignan aleatoriamente a los participantes. Se usan cuando la aleatorización no es posible, no es ética o no es práctica: cursos completos, escuelas, centros de salud, comunas, programas institucionales o cohortes ya formadas.

Su principal debilidad es que los grupos pueden diferir antes de la intervención. Si un curso recibe un programa de apoyo y otro no, las diferencias posteriores podrían deberse al programa, pero también a diferencias previas en rendimiento, docentes, clima escolar, apoyo familiar o motivación.

Para fortalecer un cuasiexperimento se pueden usar varias estrategias:

- Medir pretest para estimar equivalencia inicial.
- Usar grupos de comparación lo más parecidos posible.
- Incorporar covariables relevantes en el análisis.
- Aplicar emparejamiento o puntaje de propensión cuando corresponde.
- Usar series temporales interrumpidas con varias mediciones antes y después.
- Reportar explícitamente amenazas a la validez interna.

Un cuasiexperimento no debe presentarse como experimento verdadero. Puede aportar evidencia causal plausible, especialmente si combina buen grupo de comparación, mediciones repetidas y control estadístico, pero su inferencia causal es más vulnerable que la de un experimento aleatorizado.

**Diseños no experimentales**

En los diseños no experimentales el investigador no manipula variables ni asigna condiciones. Observa, mide y analiza fenómenos tal como ocurren. Son indispensables cuando la manipulación sería imposible o inaceptable: historia de trauma, nivel socioeconómico, diagnóstico clínico, estilos parentales, consumo previo de sustancias, rasgos de personalidad o trayectorias educativas.

Los principales diseños no experimentales son:

- *Descriptivos*: estiman frecuencia, prevalencia, distribución o características de un fenómeno. Responden preguntas como "cuánto", "cómo se distribuye" o "qué características presenta".
- *Comparativos*: contrastan grupos naturales, por ejemplo personas con y sin diagnóstico, estudiantes de distintos niveles o usuarios y no usuarios de un servicio.
- *Correlacionales*: estiman fuerza y dirección de la relación entre variables. Permiten decir que dos variables se asocian, pero no que una causa la otra.
- *Predictivos*: usan una o más variables para anticipar un resultado. La predicción puede ser útil incluso sin establecer causalidad.
- *Ex post facto*: comparan grupos definidos por una condición ya ocurrida, como exposición previa a violencia, repetición escolar o participación histórica en un programa.

La limitación central de los diseños no experimentales es la ambigüedad causal. Si apoyo social y bienestar se correlacionan, puede ser que el apoyo aumente el bienestar, que las personas con mayor bienestar construyan mejores redes, o que una tercera variable explique ambas. Esta posibilidad se llama problema de tercera variable o confusión.

**Dimensión temporal**

La temporalidad define cuándo se mide y qué tipo de cambio puede estudiarse.

- *Transversal*: los datos se recolectan en un único momento. Es eficiente y permite describir o estimar asociaciones, pero no muestra trayectorias ni permite establecer precedencia temporal.
- *Longitudinal*: se mide a los mismos casos en dos o más momentos. Permite estudiar cambio, estabilidad, dirección temporal y trayectorias individuales.
- *Retrospectivo*: reconstruye información del pasado mediante registros, entrevistas o memoria de los participantes. Es útil cuando los eventos ya ocurrieron, pero puede verse afectado por sesgos de recuerdo o registros incompletos.
- *Prospectivo*: sigue a los participantes hacia el futuro desde una línea base. Fortalece la interpretación temporal, aunque exige más recursos y enfrenta pérdida de participantes.
- *Serie temporal*: realiza múltiples mediciones antes y después de un evento o intervención. Es muy útil para evaluar políticas, programas o cambios institucionales cuando no hay aleatorización.

Un error común es tratar un diseño transversal como si demostrara secuencia temporal. Medir autoestima y rendimiento académico el mismo día no permite saber si la autoestima antecede al rendimiento, si el rendimiento afecta la autoestima o si ambas variables se influyen mutuamente.

**Validez interna, externa, de constructo y estadística**

La calidad de un diseño no se evalúa solo por su nombre. Debe analizarse qué amenazas controla y cuáles deja abiertas.

La *validez interna* se refiere al grado en que los cambios observados en la VD pueden atribuirse a la VI y no a explicaciones alternativas. Sus amenazas incluyen historia, maduración, selección, mortalidad experimental, instrumentación, efecto de prueba, regresión a la media y contaminación entre grupos.

La *validez externa* se refiere al grado en que los resultados pueden generalizarse a otras personas, contextos, momentos y formas de medición. Depende del muestreo, del contexto del estudio, de la naturalidad de la intervención y de la similitud entre la muestra y la población objetivo.

La *validez de constructo* pregunta si las operaciones del estudio realmente representan los conceptos teóricos. Una intervención puede llamarse "regulación emocional", pero si solo entrega información general sobre estrés, quizá no manipula el constructo que declara.

La *validez estadística* se refiere a si el análisis tiene potencia suficiente, cumple supuestos razonables y usa pruebas coherentes con el diseño. Un buen diseño puede producir conclusiones débiles si el tamaño muestral es insuficiente, si se ignora la dependencia entre observaciones o si se aplican pruebas inadecuadas.

**Cómo seleccionar un diseño**

Una forma práctica de elegir diseño es hacer coincidir la pregunta con el tipo de inferencia buscada:

- Si la pregunta es "¿cuál es la prevalencia?", el diseño suele ser descriptivo transversal con muestreo adecuado.
- Si la pregunta es "¿se relacionan X e Y?", corresponde un diseño correlacional, transversal o longitudinal según la teoría.
- Si la pregunta es "¿X predice Y en el futuro?", se requiere idealmente un diseño longitudinal prospectivo.
- Si la pregunta es "¿una intervención produce cambio?", se necesita un experimento o cuasiexperimento.
- Si la pregunta es "¿cómo cambia una variable antes y después de una política?", puede ser apropiada una serie temporal interrumpida.
- Si la pregunta es "¿para quién funciona mejor una intervención?", conviene un diseño factorial, un análisis de moderación o subgrupos planificados.

El diseño también debe ser ético y factible. No todo lo metodológicamente ideal puede implementarse. La tarea del investigador es justificar la opción elegida, reconocer sus límites y evitar conclusiones que el diseño no permite sostener.`,
  examples: [
    {
      id: 'ej-1',
      title: 'Experimento aleatorizado para evaluar una intervención',
      description:
        'Un equipo asigna aleatoriamente a 120 estudiantes con ansiedad ante evaluaciones a dos condiciones: entrenamiento en regulación cognitiva o lista de espera. Mide ansiedad antes, después y un mes más tarde. Si ambos grupos eran equivalentes al inicio y el grupo intervenido mejora más, la inferencia causal es fuerte.',
      applicableContext:
        'Muestra las condiciones centrales de un experimento: manipulación de la VI, asignación aleatoria, grupo control y medición de cambio.',
    },
    {
      id: 'ej-2',
      title: 'Cuasiexperimento en contexto escolar',
      description:
        'Una escuela implementa un programa de tutorías en dos cursos de primero medio, mientras otros dos cursos continúan con apoyo habitual. No hubo asignación aleatoria, porque los cursos ya existían. El estudio mide rendimiento antes y después, compara grupos y controla rendimiento inicial y asistencia.',
      applicableContext:
        'Ilustra cómo evaluar una intervención real cuando la aleatorización no es posible y qué controles aumentan la credibilidad del diseño.',
    },
    {
      id: 'ej-3',
      title: 'Diseño correlacional longitudinal',
      description:
        'Un estudio mide apoyo social, síntomas depresivos y estrés académico al inicio y al final del semestre. El análisis evalúa si el apoyo social inicial predice cambios posteriores en síntomas, controlando síntomas iniciales. Esto mejora la interpretación temporal frente a un estudio transversal.',
      applicableContext:
        'Muestra que un diseño no experimental puede ser longitudinal y aportar evidencia temporal, aunque sin demostrar causalidad definitiva.',
    },
    {
      id: 'ej-4',
      title: 'Serie temporal interrumpida para evaluar una política',
      description:
        'Un servicio de salud registra mensualmente tiempos de espera durante 18 meses antes y 18 meses después de implementar un nuevo sistema de priorización. El análisis examina si hay cambio inmediato de nivel o cambio de tendencia tras la implementación.',
      applicableContext:
        'Útil cuando se evalúan políticas o programas aplicados a toda una institución y no existe grupo control aleatorizado.',
    },
  ],
  commonMistakes: [
    'Concluir causalidad a partir de un diseño correlacional transversal solo porque la asociación es estadísticamente significativa.',
    'Llamar "experimental" a cualquier estudio con intervención, aunque no exista asignación aleatoria.',
    'Creer que el grupo control siempre significa ausencia total de tratamiento; puede ser placebo, lista de espera, tratamiento habitual o intervención alternativa.',
    'Elegir un diseño transversal para preguntas que requieren cambio, trayectoria, desarrollo o precedencia temporal.',
    'No distinguir entre manipulación de la VI, medición de variables y control estadístico; son decisiones metodológicas diferentes.',
    'Ignorar amenazas a la validez interna como selección, historia, maduración, mortalidad experimental, regresión a la media o contaminación entre grupos.',
    'Suponer que un diseño longitudinal demuestra causalidad por sí solo; mejora la temporalidad, pero no elimina automáticamente la confusión.',
    'No alinear el análisis estadístico con el diseño, por ejemplo tratar mediciones repetidas como si fueran observaciones independientes.',
    'Generalizar resultados de una muestra conveniente a una población amplia sin justificar representatividad ni límites de validez externa.',
    'Presentar las limitaciones como un trámite final en lugar de integrarlas a la interpretación de los hallazgos.',
  ],
  prerequisites: [
    'metodologia-problema-investigacion',
    'metodologia-hipotesis',
    'metodologia-variables',
  ],
  relatedConcepts: [
    'metodologia-muestreo',
    'estadistica-supuestos',
    'estadistica-inferencial',
    'medicion-operacionalizacion',
  ],
  masteryCriteria: [
    'Clasificar un estudio como experimental, cuasiexperimental o no experimental, justificando la decisión por manipulación, asignación aleatoria y control.',
    'Distinguir propósito descriptivo, correlacional, predictivo, explicativo y evaluativo, y proponer un diseño coherente con cada propósito.',
    'Explicar por qué la asignación aleatoria fortalece la inferencia causal y por qué la manipulación sin aleatorización no basta para un experimento verdadero.',
    'Diferenciar diseños transversales, longitudinales, retrospectivos, prospectivos y de series temporales, señalando qué preguntas responde mejor cada uno.',
    'Identificar amenazas específicas a la validez interna según el diseño y proponer estrategias razonables para reducirlas.',
    'Reconocer cuándo una conclusión excede la evidencia disponible y reformularla de manera metodológicamente defendible.',
    'Seleccionar un grupo control o de comparación apropiado para una intervención, justificando sus ventajas y limitaciones.',
    'Alinear diseño, variables, muestra y análisis estadístico en una propuesta de investigación breve.',
  ],
}
