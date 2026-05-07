// Tipos principales de la aplicación

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

export interface Example {
  id: string
  title: string
  description: string
  applicableContext: string
}

export interface AssessmentResult {
  activityId: string
  isCorrect: boolean
  score?: number
  feedback: string
  matchedCriteria: string[]
  missingCriteria: string[]
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

export type AIMode =
  | 'explanation'
  | 'feedback'
  | 'conceptual-comparison'
  | 'answer-correction'
  | 'example-generation'
  | 'formulation-guidance'

export interface CodeExecutionProvider {
  id: string
  language: 'r'
  execute(input: CodeExecutionInput): Promise<CodeExecutionResult>
}

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
