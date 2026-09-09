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
    category: 'Plataforma educacional em produção',
    description:
      'Uma jornada de formação que organiza cursos, módulos, aulas, progresso e avaliações para alunos e diferentes perfis de acesso.',
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
    category: 'Sistema operacional · automação com controle humano',
    description:
      'Uma operação própria que conecta relacionamento, tarefas automáticas, acompanhamento e decisões que continuam sob controle humano.',
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
