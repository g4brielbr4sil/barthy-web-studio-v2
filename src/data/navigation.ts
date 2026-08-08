export type SectionId =
  | 'inicio'
  | 'problemas'
  | 'projetos'
  | 'solucoes'
  | 'sistemas'
  | 'processo'
  | 'contato'

interface NavigationItem {
  id: Exclude<SectionId, 'inicio'>
  label: string
  href: string
}

export const navigation: NavigationItem[] = [
  { id: 'solucoes', label: 'Soluções', href: '#solucoes' },
  { id: 'sistemas', label: 'Sistemas', href: '#sistemas' },
  { id: 'projetos', label: 'Projetos', href: '#projetos' },
  { id: 'processo', label: 'Processo', href: '#processo' },
  { id: 'contato', label: 'Contato', href: '#contato' },
]

export const observedSectionIds = [
  'inicio',
  'problemas',
  'solucoes',
  'sistemas',
  'projetos',
  'processo',
  'contato',
] as const satisfies readonly SectionId[]

export function isSectionId(value: string): value is SectionId {
  return observedSectionIds.some((id) => id === value)
}
