export type ProjectVisualKind = 'studio-concept' | 'pnqc' | 'hermes'

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
    id: 'studio-concept',
    title: 'Operação de oficina',
    category: 'Conceito de interface · sistema para serviços e orçamentos',
    description:
      'Uma visão própria da Barthy para reunir pedidos, orçamentos, aprovações, serviços em andamento e próximas ações numa operação fácil de acompanhar.',
    detail:
      'Peça demonstrativa criada para explorar como uma oficina ou empresa de serviços poderia trocar conversas soltas e controles paralelos por um fluxo operacional claro. O conceito não é apresentado como produto lançado.',
    features: [
      'Pedidos e clientes',
      'Orçamentos e aprovações',
      'Status dos serviços',
      'Próximas ações e alertas',
      'Histórico de acompanhamento',
    ],
    stack: ['React', 'TypeScript', 'Interface conceitual', 'Fluxo sob medida'],
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
      'Autenticação e segurança',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'Auth',
      'RLS',
      'Cloudflare Pages',
    ],
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
      'Automações e integrações',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'SQLite', 'Docker', 'API REST'],
    layout: 'split',
  },
]
