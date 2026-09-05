export interface ConceptItem {
  title: string
  body: string
  formula?: string
}

export interface WorkedExample {
  title: string
  source: string
  prompt: string
  steps: { title: string; body: string; formula?: string }[]
  answer: string
}

export interface QuizQuestion {
  id: string
  type: 'single' | 'numeric' | 'judge'
  prompt: string
  options?: string[]
  correct: number | string
  tolerance?: number
  explanation: string
}

export type SectionKind = 'knowledge' | 'ai' | 'engineering'

export interface Application {
  id: string
  kind: 'ai' | 'engineering'
  title: string
  description: string
  interaction: string
  keyTakeaway: string
}

export interface Section {
  id: string
  kind: SectionKind
  number: string
  title: string
  minutes: number
  difficulty: '入门' | '核心' | '应用'
  description: string
  memoryHook?: string
  rigorousNote?: string
  metaphor?: { title: string; body: string }
  aiExample?: { title: string; body: string; formula?: string }
  experiment?: { start: string; adjust: string; observe: string }
  objectives?: string[]
  prerequisites?: string
  concepts?: ConceptItem[]
  workedExample?: WorkedExample
  interaction?: string
  applications?: Application[]
  quiz?: QuizQuestion[]
  keyTakeaway: string
}

export interface Chapter {
  id: string
  number: number
  title: string
  subtitle: string
  minutes: number
  difficulty: string
  description: string
  sections: Section[]
}
