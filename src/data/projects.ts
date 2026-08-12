export type ProjectVisualKind = 'concept' | 'pnqc' | 'hermes'

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
    id: 'concept',
    title: 'Interface conceitual BWS',
    category: 'Sistema comercial · conceito BWS',
    description:
      'Uma composição autoral que conecta clientes, oportunidades, orçamentos e próximas ações em um fluxo comercial leve de acompanhar.',
    detail:
      'Esta interface é uma demonstração conceitual da capacidade da Barthy de traduzir uma rotina comercial em informação clara. Não representa um produto disponível ou um sistema completo.',
    features: [
      'Clientes e oportunidades',
      'Orçamentos e status',
      'Próximas ações',
      'Alertas de acompanhamento',
      'Pipeline comercial leve',
    ],
    stack: ['React', 'TypeScript', 'CSS', 'UI/UX', 'Fluxos operacionais'],
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
