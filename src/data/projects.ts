export type ProjectVisualKind = 'bws-flow' | 'pnqc' | 'hermes'

export interface Project {
  id: ProjectVisualKind
  title: string
  category: string
  description: string
  detail: string
  features: string[]
  stack: string[]
  layout: 'wide' | 'split'
}

export const projects: Project[] = [
  {
    id: 'bws-flow',
    title: 'BWS Flow',
    category: 'Interface conceitual · demonstração BWS Systems',
    description:
      'Mockup conceitual de uma central leve para acompanhar clientes, orçamentos, serviços e próximos passos sem transformar a rotina em um sistema excessivo.',
    detail:
      'A interface é uma demonstração visual da linha BWS Systems. Ela não representa um produto oficialmente lançado ou disponível para contratação nesta fase.',
    features: [
      'Clientes e oportunidades',
      'Orçamentos e retornos',
      'Próximos passos',
      'Histórico e alertas',
    ],
    stack: ['React', 'TypeScript', 'Interface autoral'],
    layout: 'wide',
  },
  {
    id: 'pnqc',
    title: 'PNQC',
    category: 'Plataforma educacional · qualificação no ecossistema de cuidado',
    description:
      'Plataforma desenvolvida para estruturar formação, progresso, avaliações e certificações verificáveis para cuidadores e profissionais do ecossistema de cuidado.',
    detail:
      'Uma jornada de qualificação organizada por perfis, módulos e regras de avanço, com critérios de aprovação, progresso sequencial e certificados verificáveis.',
    features: [
      'Módulos e aulas',
      'Progresso sequencial',
      'Avaliações e aprovação',
      'Perfis e certificados',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    layout: 'split',
  },
  {
    id: 'hermes',
    title: 'Hermes',
    category: 'Produto próprio · central operacional da Barthy',
    description:
      'Sistema próprio que reúne CRM, comercial, financeiro, tarefas, relatórios e automações para transformar informação dispersa em rotina acompanhável.',
    detail:
      'O Hermes funciona como laboratório operacional da Barthy: uma central em evolução para organizar oportunidades, tarefas, decisões e acompanhamento com API própria e regras de segurança.',
    features: [
      'CRM e pipeline',
      'Financeiro e tarefas',
      'Rotina operacional',
      'Relatórios e alertas',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'SQLite', 'Docker', 'API REST'],
    layout: 'split',
  },
]
