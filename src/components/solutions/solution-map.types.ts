import type { LucideIcon } from 'lucide-react'

type SolutionGroupId = 'web' | 'sistemas' | 'automacoes' | 'care'

interface SolutionNode {
  id: string
  label: string
  icon: LucideIcon
  x: number
  y: number
}
export interface SolutionGroup {
  id: SolutionGroupId
  title: string
  summary: string
  architectureSummary: string
  items: string[]
  icon: LucideIcon
  nodes: SolutionNode[]
}
