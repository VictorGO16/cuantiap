# Arquitectura Del Proyecto

## Resumen

Este proyecto es una aplicacion pedagogica autocontenida para aprender metodologia cuantitativa, medicion, psicometria y estadistica aplicada. No es una aplicacion administrativa de un curso especifico ni un reflejo de un programa semestral.

El nucleo de la aplicacion debe cubrir los contenidos conceptuales y tecnicos del area con explicaciones, ejemplos, interacciones aplicadas, retroalimentacion y criterios de dominio. Los elementos institucionales o propios de un curso, como fechas, rubricas, trabajos, pautas y temarios, deben existir como modulos opcionales.

La IA se usa como un servicio interno contextualizado por contenidos curados. No reemplaza el contenido validado, no decide por si sola que es correcto y no debe operar como fuente autonoma de conocimiento.

R, Quarto y ejecucion de codigo quedan previstos en la arquitectura, pero no son obligatorios para la primera capa de contenidos. Cuando se incorporen, deben hacerlo mediante proveedores aislados, no ejecutando R directamente dentro del servidor Next.js.

## Principios Arquitectonicos

- **Nucleo independiente:** el nucleo pedagogico no depende de cursos, calendarios, rubricas ni configuraciones institucionales.
- **Modularidad explicita:** cada modulo declara lo que agrega: rutas, navegacion, contenidos, actividades, permisos, capacidades de IA o capacidades de codigo.
- **Dependencias en una direccion:** los modulos consumen capacidades del nucleo; el nucleo no importa modulos concretos.
- **Contenido versionado:** los conceptos, actividades, criterios de evaluacion y prompts deben poder asociarse a una version.
- **IA auditable:** las interacciones relevantes deben registrar la version del prompt y la version del contenido usado.
- **Persistencia desacoplada:** la logica pedagogica no debe depender directamente de Supabase ni de otro proveedor. Debe pasar por servicios o repositorios.
- **Ejecucion de codigo aislada:** Next.js no debe ejecutar R directamente. La ejecucion debe delegarse a un proveedor intercambiable.
- **Desactivacion simple:** un modulo debe poder activarse, desactivarse o deprecarse sin modificar el nucleo.
- **Contenido antes que pantallas:** una vista no equivale a contenido completo. La unidad pedagogica es el concepto, la actividad o el explorador aplicado.
- **Interaccion aplicada por defecto:** todo contenido que pueda representarse mediante manipulacion, visualizacion, simulacion, comparacion o cambio de supuestos debe tener una forma interactiva. Los casos no interactivos deben ser la excepcion, no la norma.

## Stack Base

La primera implementacion debe usar:

- Next.js con App Router.
- React.
- TypeScript.
- Tailwind.
- Zustand para estado local de interfaz y sesiones.
- Framer Motion solo para transiciones e interacciones puntuales.
- Next.js route handlers para backend liviano.
- Gemini llamado exclusivamente desde servidor.
- Vercel como deployment inicial.

Supabase es la opcion recomendada para autenticacion, progreso, respuestas, sesiones de IA y configuracion persistente. No es obligatorio para renderizar los contenidos base.

## Estructura De Carpetas

Estructura recomendada:

```txt
src/
  app/
    api/
    layout.tsx
    page.tsx

  core/
    modules/
    content/
    activities/
    explorers/
    assessment/
    progress/
    ai/
    code/
    config/

  modules/
    metodologia/
    medicion/
    psicometria/
    estadistica/
    r-quarto/
    curso/

  infrastructure/
    gemini/
    supabase/
    storage/
    telemetry/

  ui/
    components/
    layouts/
    navigation/

  types/
```

Responsabilidades:

- `app/`: rutas de Next.js, layouts, paginas y route handlers.
- `core/`: contratos, servicios y logica reusable de la aplicacion.
- `modules/`: modulos pedagogicos u opcionales.
- `infrastructure/`: adaptadores a proveedores externos.
- `ui/`: componentes visuales reutilizables.
- `types/`: tipos compartidos cuando no pertenezcan a un dominio especifico.

## Modelo De Modulos

Cada modulo debe implementar un contrato explicito. El contrato permite registrar capacidades sin acoplar el nucleo a implementaciones concretas.

```ts
export interface AppModule {
  id: string
  name: string
  version: string
  status: 'active' | 'disabled' | 'deprecated'
  routes?: ModuleRoute[]
  navigation?: NavigationItem[]
  content?: ContentSource[]
  activities?: ActivityDefinition[]
  explorers?: ExplorerDefinition[]
  aiContexts?: AIContextProvider[]
  permissions?: PermissionDefinition[]
}
```

El registro de modulos debe ser central y tipado:

```ts
export const moduleRegistry = [
  metodologiaModule,
  medicionModule,
  psicometriaModule,
  estadisticaModule,
  rQuartoModule,
  cursoModule,
]
```

La configuracion de activacion debe estar separada del registro:

```ts
export const enabledModules = {
  metodologia: true,
  medicion: true,
  psicometria: true,
  estadistica: true,
  'r-quarto': false,
  curso: false,
}
```

El registro define que existe. La configuracion define que se expone.

## Nucleo Pedagogico

Los contenidos deben modelarse como unidades estructuradas. No deben depender de componentes React ni de una pantalla especifica.

```ts
export interface Concept {
  id: string
  moduleId: string
  title: string
  summary: string
  explanation: string
  examples: Example[]
  commonMistakes: string[]
  prerequisites: string[]
  relatedConcepts: string[]
  masteryCriteria: string[]
  version: string
}
```

Un concepto esta completo solo si incluye:

- definicion clara;
- explicacion tecnica correcta;
- ejemplo aplicado;
- errores frecuentes;
- actividad o explorador aplicado cuando el contenido lo permita;
- retroalimentacion;
- criterios de dominio;
- relacion con conceptos previos y posteriores.

La primera implementacion puede mantener los contenidos en archivos versionados dentro del repositorio. Esto facilita revision, trazabilidad y despliegue simple. Mover contenidos a una base de datos debe ser una decision posterior, no un requisito inicial.

## Modulos Iniciales De Contenido

La cobertura conceptual inicial debe organizarse en cuatro modulos principales.

```txt
metodologia
  fundamentos
  etica
  problema-investigacion
  objetivos
  hipotesis
  variables
  disenos
  muestreo

medicion
  constructos
  operacionalizacion
  niveles-medicion
  instrumentos
  validez
  confiabilidad
  sesgo

psicometria
  fundamentos
  construccion-instrumentos
  evidencia-validez
  confiabilidad-clasica
  interpretacion-puntajes

estadistica
  descriptiva
  inferencial
  supuestos
  error-tipo-i-ii
  pruebas-parametricas
  pruebas-no-parametricas
  interpretacion
```

Estos modulos son el producto principal. Los modulos de curso, fechas, entregas o codigo no deben definir la estructura conceptual base.

## Actividades

La aplicacion debe contar con un motor de actividades antes de integrar ejecucion de R. Las actividades evaluan comprension, formulacion, clasificacion, interpretacion y toma de decisiones metodologicas. Deben poder evaluarse sin IA y, cuando corresponda, complementar la retroalimentacion con IA.

Tipos iniciales:

```txt
seleccion-multiple
clasificacion
ordenamiento
analisis-de-caso
completar-formulacion
identificar-variable
evaluar-hipotesis
seleccionar-diseno
interpretar-resultado
comparar-alternativas
```

Contrato base:

```ts
export interface ActivityDefinition {
  id: string
  moduleId: string
  conceptIds: string[]
  type: ActivityType
  prompt: string
  inputSchema: unknown
  evaluation: EvaluationRule[]
  feedback: FeedbackRule[]
  version: string
}
```

Resultado de evaluacion:

```ts
export interface AssessmentResult {
  activityId: string
  isCorrect: boolean
  score?: number
  feedback: string
  matchedCriteria: string[]
  missingCriteria: string[]
}
```

La evaluacion deterministica debe tener prioridad. La IA puede mejorar la explicacion del feedback, pero no reemplazar los criterios definidos por la actividad.

## Exploradores Aplicados

Los exploradores aplicados son componentes interactivos de dominio. No son quizzes ni pantallas de lectura. Permiten manipular datos, supuestos, definiciones, decisiones analiticas o representaciones visuales y observar cambios en resultados o interpretaciones.

La regla de diseno es amplia: si un concepto puede hacerse visible mediante interaccion, debe tener una representacion interactiva. Las interacciones pueden incluir calculo, simulacion, visualizacion, comparacion, clasificacion dinamica, cambio de supuestos, reagrupacion, filtrado, transformacion, arrastre, seleccion o edicion guiada.

Ejemplos no exhaustivos:

- como cambia una media al modificar una agrupacion;
- como cambia una distribucion al transformar o filtrar una variable;
- como cambia el alpha si se elimina un item;
- como cambia una prueba t al seleccionar otra variable dependiente o grupo;
- como cambian los resultados al incluir o excluir casos;
- como cambia una conclusion al modificar supuestos, escala de medicion o criterio de decision.

Contrato base:

```ts
export interface ExplorerDefinition {
  id: string
  moduleId: string
  conceptIds: string[]
  title: string
  description: string
  dataset: DatasetDefinition
  controls: ExplorerControl[]
  outputs: ExplorerOutput[]
  interpretationPrompts: InterpretationPrompt[]
  version: string
}
```

Controles posibles:

```txt
selector-variable
selector-grupo
filtro-casos
exclusion-item
transformacion-variable
selector-prueba
selector-supuesto
umbral-decision
```

Salidas posibles:

```txt
tabla-resumen
grafico-distribucion
grafico-comparacion-grupos
matriz-correlaciones
resultado-prueba-t
resultado-alpha
resultado-descriptivos
interpretacion-guiada
```

Ejemplos de exploradores:

```txt
distribucion-variable-continua
  Permite seleccionar una variable, ver histograma, densidad, media, mediana, desviacion estandar, asimetria visual y casos extremos.

comparacion-agrupaciones
  Permite cambiar variable de agrupacion y observar medias, dispersion, tamanos de grupo y diferencias descriptivas.

prueba-t-interactiva
  Permite elegir variable dependiente y grupo, revisar supuestos, ver estadistico, grados de libertad, valor p, intervalo de confianza y tamano de efecto.

alpha-si-elimina-item
  Permite activar o excluir items, observar el alpha total, alpha si se elimina cada item, correlaciones item-total e implicancias de la decision.

operacionalizacion-variable
  Permite conectar constructo, indicador, item, escala de respuesta y nivel de medicion.

muestreo-y-error
  Permite cambiar tamano muestral y observar variacion esperada, error estandar e implicancias para inferencia.
```

Reglas:

- Todo explorador debe tener un dataset pequeno y comprensible.
- Todo control debe producir un cambio visible.
- Todo resultado numerico debe ir acompanado de interpretacion.
- El estudiante debe poder comparar estados antes y despues de una manipulacion.
- La lista de exploradores no es cerrada. Cada modulo debe proponer nuevas interacciones cuando el contenido lo permita.
- Si un contenido solo se presenta como texto, debe existir una razon pedagogica o tecnica clara.
- La IA puede explicar resultados, pero los calculos y cambios visibles deben provenir de codigo deterministico.
- Si un calculo requiere R en una etapa posterior, el explorador debe poder funcionar inicialmente con calculos TypeScript o resultados precomputados.

## IA

La IA debe funcionar como servicio interno, no como logica distribuida en componentes o rutas aisladas.

Flujo:

```txt
pregunta del usuario
  -> deteccion de intencion
  -> recuperacion de contexto curado
  -> construccion de prompt
  -> llamada a Gemini
  -> validacion basica
  -> respuesta
```

Estructura recomendada:

```txt
core/ai/
  ai-service.ts
  context-builder.ts
  prompt-registry.ts
  response-schemas.ts

infrastructure/gemini/
  gemini-client.ts
```

Modos internos:

- explicacion;
- retroalimentacion;
- comparacion conceptual;
- correccion de respuesta;
- generacion de ejemplo;
- orientacion de formulacion.

Contrato de contexto:

```ts
export interface AIContextProvider {
  id: string
  moduleId: string
  getContext(input: AIContextInput): Promise<AIContext>
}
```

Registro de interacciones:

```ts
export interface AIInteractionLog {
  id: string
  userId?: string
  moduleId?: string
  conceptIds: string[]
  activityId?: string
  mode: AIMode
  promptVersion: string
  contentVersion: string
  input: string
  output: string
  createdAt: string
}
```

Reglas:

- Gemini se llama solo desde servidor.
- La API key nunca se expone al cliente.
- La IA responde usando contexto curado.
- Si falta contexto suficiente, la respuesta debe limitarse y explicitar la limitacion.
- La IA no inventa referencias.
- La IA no resuelve trabajos completos.
- La IA no reemplaza criterios de evaluacion.
- Toda salida estructurada debe validarse antes de usarse en la interfaz.

## R Y Quarto

R y Quarto son capacidades previstas para una etapa posterior. Deben entrar como modulo y proveedor de codigo, no como dependencia del nucleo.

Interfaz:

```ts
export interface CodeExecutionProvider {
  id: string
  language: 'r'
  execute(input: CodeExecutionInput): Promise<CodeExecutionResult>
}
```

Proveedores posibles:

- `staticRProvider`: muestra codigo y salidas preparadas.
- `webRProvider`: ejecuta en navegador si el ejercicio lo permite.
- `remoteRProvider`: delega ejecucion a un servicio externo aislado.

Reglas:

- Next.js no ejecuta R directamente.
- Los ejercicios de codigo deben poder renderizarse aunque la ejecucion este desactivada.
- La UI no debe depender de un proveedor especifico.
- El proveedor activo debe poder cambiarse por configuracion.

## Modulo Curso

El modulo curso es opcional y debe estar desactivado por defecto en la aplicacion base.

Capacidades posibles:

```txt
curso
  fechas
  rubricas
  trabajos
  pautas
  temarios
  calendario
```

Reglas:

- El modulo curso puede consumir conceptos, actividades y criterios del nucleo.
- El modulo curso no modifica contenidos pedagogicos base.
- Las fechas, rubricas y entregas no deben aparecer en la navegacion si el modulo esta desactivado.
- La aplicacion debe seguir siendo util sin ningun curso configurado.

## Persistencia

Guardar solo lo que requiere estado o auditoria:

```txt
usuarios
progreso
respuestas
intentos
estados_exploradores
sesiones_ia
entregas_opcionales
configuracion_modulos
```

Los contenidos pedagogicos base pueden partir en archivos del repositorio. Esto evita que el sistema de persistencia determine prematuramente el modelo de contenido.

La persistencia debe accederse mediante servicios o repositorios del nucleo. Los componentes React y los modulos no deben llamar directamente a tablas o clientes externos cuando haya logica de dominio involucrada.

## Interfaces Minimas

La primera implementacion debe definir estas interfaces:

```txt
AppModule
Concept
ActivityDefinition
ExplorerDefinition
AssessmentResult
AIContextProvider
AIInteractionLog
CodeExecutionProvider
```

Estas interfaces son el limite estable inicial. Pueden ampliarse, pero no deben mezclarse con detalles de UI ni de proveedores externos.

## Criterios De Calidad

Un contenido se considera implementado solo cuando tiene estructura pedagogica completa, no solo una pagina visible.

Checklist minimo:

- El concepto tiene definicion y explicacion.
- Incluye al menos un ejemplo aplicado.
- Declara errores frecuentes.
- Tiene una actividad asociada.
- Tiene un explorador aplicado cuando el contenido involucra datos, medicion, comparacion, inferencia o cambio de supuestos.
- Tiene retroalimentacion predefinida.
- Declara criterios de dominio.
- Expone relaciones con otros conceptos.
- Puede proveer contexto a la IA.

La interfaz debe apoyar lectura, practica y retroalimentacion. La prioridad es claridad conceptual, no decoracion visual.

## Pruebas Y Escenarios

Escenarios que deben verificarse al implementar:

- Un modulo puede activarse y desactivarse desde configuracion.
- La navegacion solo muestra modulos activos.
- Un concepto puede renderizarse sin depender de Supabase.
- Una actividad puede evaluarse sin IA.
- Un explorador aplicado permite modificar controles y observar cambios visibles en resultados.
- Un explorador aplicado muestra interpretacion junto a salidas numericas o graficas.
- La IA puede responder usando contexto de un concepto especifico.
- La IA limita respuestas cuando no hay contexto suficiente.
- El modulo curso puede activarse sin modificar modulos pedagogicos.
- El proveedor de codigo puede cambiarse sin modificar componentes de contenido.
- La aplicacion puede correr en Vercel sin exponer la API key de Gemini al cliente.

## Defaults Iniciales

- Contenido versionado en repositorio.
- Estado local con Zustand.
- Persistencia con Supabase cuando se requiera estado entre sesiones o usuarios.
- Gemini solo desde servidor.
- Modulo curso desactivado por defecto.
- Modulo R/Quarto previsto, pero no obligatorio para la primera implementacion.
- Sin fechas ni estimaciones de implementacion dentro de la documentacion de arquitectura.
