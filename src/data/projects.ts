export type ProjectVisualKind = 'levens' | 'pnqc' | 'hermes'

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
    id: 'levens',
    title: 'Levens',
    category: 'Experiência profissional · operação, sistemas e governança',
    description:
      'Atuação em uma operação real de cuidado, conectando portais, cadastros, documentos, escalas, validações, integrações e rotinas de acompanhamento.',
    detail:
      'Experiência aplicada à evolução e validação de fluxos digitais que apoiam diferentes etapas da operação. O trabalho foi colaborativo e é apresentado como experiência profissional, não como criação exclusiva da Barthy.',
    features: [
      'Portais por perfil',
      'Cadastros e documentos',
      'Vagas e escalas',
      'Validações operacionais',
      'Integrações e acompanhamento',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'APIs', 'n8n', 'Iugu'],
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
