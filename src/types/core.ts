// Tipos canónicos de la aplicación. No deben importar de UI ni de proveedores externos.

export interface Example {
  id: string
  title: string
  description: string
  applicableContext: string
}

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

export interface ModuleMeta {
  id: string
  name: string
  description: string
  version: string
  status: 'active' | 'disabled' | 'deprecated'
  conceptIds: string[]
  color?: string
}

// --- Módulos ---

export interface ModuleRoute {
  path: string
  component: string
}

export interface NavigationItem {
  id: string
  label: string
  path: string
  moduleId: string
}

export interface ContentSource {
  id: string
  type: string
  moduleId: string
}

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

export type ActivityType =
  | 'seleccion-multiple'
  | 'clasificacion'
  | 'ordenamiento'
  | 'analisis-de-caso'
  | 'completar-formulacion'
  | 'identificar-variable'
  | 'evaluar-hipotesis'
  | 'seleccionar-diseno'
  | 'interpretar-resultado'
  | 'comparar-alternativas'

export interface EvaluationRule {
  criterionId: string
  description: string
  required: boolean
}

export interface FeedbackRule {
  condition: string
  message: string
}

export interface ExplorerDefinition {
  id: string
  moduleId: string
  conceptIds: string[]
  title: string
  description: string
  version: string
}

export interface PermissionDefinition {
  id: string
  moduleId: string
  scope: string
}

export interface AppModule {
  id: string
  name: string
  version: string
  status: 'active' | 'disabled' | 'deprecated'
  routes?: ModuleRoute[]
  navigation?: NavigationItem[]
  activities?: ActivityDefinition[]
  explorers?: ExplorerDefinition[]
  aiContexts?: AIContextProvider[]
  permissions?: PermissionDefinition[]
}

// --- IA ---

export type AIMode =
  | 'explanation'
  | 'feedback'
  | 'conceptual-comparison'
  | 'answer-correction'
  | 'example-generation'
  | 'formulation-guidance'

export interface AIContextInput {
  conceptId?: string
  moduleId?: string
  userMessage: string
  conversationHistory?: ChatMessage[]
}

export interface AIContext {
  conceptData?: Concept
  moduleId?: string
  synthesizedContext?: string
  relevantConceptIds: string[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type AIChatMode = 'general' | 'concept' | 'data'

export interface AIChatRequest {
  message: string
  chatMode: AIChatMode
  conceptId?: string
  moduleId?: string
  navContext?: string
  dataContext?: AnalysisContext
  history: ChatMessage[]
}

// --- Módulo Interactivo ---

export type InteractiveTool = 'distribuciones' | 'grupos' | 'psicometria' | 'variables'

export interface DescriptiveStats {
  n: number
  mean: number
  sd: number
  median: number
  min: number
  max: number
  skewness: number
  kurtosis: number
}

export interface GroupStats {
  name: string
  n: number
  mean: number
  sd: number
}

export interface TestResult {
  type: 't' | 'anova' | 'r'
  statistic: number
  df: string
  pValue: number
  effectSize: number
  effectLabel: string
  significant: boolean
}

export interface ItemStats {
  id: string
  label: string
  mean: number
  sd: number
  itemTotal: number
  alphaIfDeleted: number
}

export interface InstrumentResult {
  name: string
  sigla: string
  nItems: number
  alpha: number
  items: ItemStats[]
}

export interface AnalysisContext {
  tool: InteractiveTool
  datasetId: string
  datasetLabel: string
  variableId?: string
  variableLabel?: string
  groupById?: string
  groupByLabel?: string
  instrumentId?: string
  instrumentLabel?: string
  results?: {
    descriptives?: DescriptiveStats
    filter?: string
    groups?: GroupStats[]
    test?: TestResult
    instrument?: InstrumentResult
  }
}

export interface AIChatResponse {
  content: string
  mode: AIMode
  conceptIds: string[]
}

export interface AIContextProvider {
  id: string
  moduleId: string
  getContext(input: AIContextInput): Promise<AIContext>
}

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

// --- Evaluación ---

export interface AssessmentResult {
  activityId: string
  isCorrect: boolean
  score?: number
  feedback: string
  matchedCriteria: string[]
  missingCriteria: string[]
}

// --- Ejecución de código (R/Quarto — fase posterior) ---

export interface CodeExecutionInput {
  code: string
  data?: Record<string, unknown>
  context?: Record<string, unknown>
}

export interface CodeExecutionResult {
  success: boolean
  output?: string
  visualization?: string
  error?: string
}

export interface CodeExecutionProvider {
  id: string
  language: 'r'
  execute(input: CodeExecutionInput): Promise<CodeExecutionResult>
}
