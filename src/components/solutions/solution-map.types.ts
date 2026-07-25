import type { LucideIcon } from 'lucide-react'

type SolutionGroupId = 'presenca' | 'sistemas' | 'operacao'
type SolutionLayer = 1 | 2 | 3

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
  layer: SolutionLayer
  nodes: SolutionNode[]
}
