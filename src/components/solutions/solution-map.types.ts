import type { LucideIcon } from 'lucide-react'

type SolutionGroupId = 'web' | 'sistemas' | 'automacoes' | 'care'

export interface SolutionFlowStep {
  eyebrow: string
  title: string
  detail: string
  icon: LucideIcon
}

export interface SolutionGroup {
  id: SolutionGroupId
  title: string
  summary: string
  architectureSummary: string
  items: string[]
  icon: LucideIcon
  flow: SolutionFlowStep[]
}
