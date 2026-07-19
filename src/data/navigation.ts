export type SectionId =
  | 'inicio'
  | 'projetos'
  | 'estudio'
  | 'solucoes'
  | 'processo'
  | 'contato'

export interface NavigationItem {
  id: Exclude<SectionId, 'inicio'>
  label: string
  href: string
}

export const navigation: NavigationItem[] = [
  { id: 'estudio', label: 'Estúdio', href: '#estudio' },
  { id: 'projetos', label: 'Projetos', href: '#projetos' },
  { id: 'solucoes', label: 'Soluções', href: '#solucoes' },
  { id: 'processo', label: 'Processo', href: '#processo' },
  { id: 'contato', label: 'Contato', href: '#contato' },
]

export const observedSectionIds: SectionId[] = [
  'inicio',
  'estudio',
  'projetos',
  'solucoes',
  'processo',
  'contato',
]
