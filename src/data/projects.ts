export type ProjectVisualKind = 'pnqc' | 'hermes'

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
    id: 'pnqc',
    title: 'PNQC',
    category: 'Plataforma educacional · formação de cuidadores',
    description:
      'Plataforma web em produção para organizar autenticação, perfis de acesso, cursos, módulos, aulas, progresso sequencial e avaliações.',
    detail:
      'Desenvolvida a partir de necessidades reais da operação, com regras de progressão, avaliações com nota mínima de 70%, Supabase Auth, PostgreSQL e funções RPC. Certificados, badges e áreas administrativas seguem em evolução.',
    features: [
      'Autenticação e recuperação de acesso',
      'Perfis student, agency e admin',
      'Cursos, módulos e aulas',
      'Progresso sequencial',
      'Avaliações e aprovação mínima de 70%',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'Auth',
      'RPC',
      'Cloudflare Pages',
    ],
    layout: 'split',
  },
  {
    id: 'hermes',
    title: 'Hermes',
    category: 'Produto próprio · operação Full Stack multiagente',
    description:
      'Aplicação Full Stack autoral que reúne CRM, pipeline, automações, jobs, workers, políticas, aprovações humanas e auditoria em uma operação única.',
    detail:
      'O Hermes começou como um Personal OS e evoluiu para um runtime operacional multiagente. A comunicação externa permanece bloqueada por padrão, enquanto ações internas e fluxos comerciais são coordenados com rastreabilidade e controle humano.',
    features: [
      'CRM e pipeline comercial',
      'Agentes especializados e jobs',
      'Policies e aprovações humanas',
      'Auditoria e idempotência',
      'Deploy, backup e rollback documentados',
    ],
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite', 'SQLAlchemy', 'Docker', 'GitHub Actions'],
    layout: 'split',
  },
]
