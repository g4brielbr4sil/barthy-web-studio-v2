export type ProjectVisualKind = 'radardf' | 'pnqc' | 'hermes'

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
    id: 'radardf',
    title: 'RadarDF',
    category: 'Plataforma de vagas · Distrito Federal',
    description:
      'Uma plataforma para reunir vagas do DF, tirar duplicidade e aproximar candidato certo de vaga certa, sem taxa para quem está buscando emprego.',
    detail:
      'Em desenvolvimento. Nasce de um problema real: agregar oportunidades hoje espalhadas, normalizar e cruzar perfil com vaga de forma direta. Empresas pagam por destaque e ferramentas de recrutamento; candidato usa de graça.',
    features: [
      'Agregação de vagas de múltiplas fontes',
      'Remoção de duplicadas',
      'Matching entre candidato e vaga',
      'Painel de candidaturas',
      'Portal para empresas',
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Em construção'],
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
