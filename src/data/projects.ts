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
    category: 'Experiência profissional · sistemas e governança de TI',
    description:
      'Portais, fluxos, integrações e governança aplicados a uma operação real de cuidado.',
    detail:
      'Experiência profissional aplicada ao desenvolvimento, à validação, às integrações e à governança. A atuação acontece de forma colaborativa e não é apresentada como criação exclusiva da Barthy.',
    features: [
      'Portais por perfil',
      'Cadastros e documentos',
      'Vagas e escalas',
      'Avaliações e financeiro',
      'Integrações operacionais',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'APIs', 'n8n', 'Iugu'],
    layout: 'wide',
  },
  {
    id: 'pnqc',
    title: 'PNQC',
    category: 'Projeto próprio em desenvolvimento · plataforma educacional',
    description:
      'Cursos, progresso sequencial, avaliações, autenticação e certificações verificáveis.',
    detail:
      'Uma jornada educacional estruturada por perfis, módulos, regras de avanço, critérios de aprovação e proteção de dados.',
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
    category: 'Projeto próprio em desenvolvimento · operação pessoal',
    description:
      'CRM, financeiro, tarefas, estudos, relatórios e acompanhamento em uma única estrutura.',
    detail:
      'Uma central de comando em evolução para organizar informações, rotinas e decisões, apoiada por uma API própria e por armazenamento local controlado.',
    features: [
      'CRM e pipeline',
      'Financeiro e tarefas',
      'Rotina e estudos',
      'Relatórios operacionais',
      'Terminal simulado',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'SQLite', 'Docker', 'API REST'],
    layout: 'split',
  },
]
