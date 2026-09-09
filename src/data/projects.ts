export type ProjectVisualKind = 'pnqc' | 'hermes'

export interface Project {
  id: ProjectVisualKind
  title: string
  category: string
  description: string
  detail: string
  features: string[]
  layout: 'wide' | 'split'
}

export const projects: Project[] = [
  {
    id: 'pnqc',
    title: 'PNQC',
    category: 'Plataforma educacional em produção',
    description:
      'Uma plataforma de qualificação profissional para cuidadores, com cursos organizados em módulos, aulas, avaliações e progresso até a certificação.',
    detail:
      'O PNQC conduz o cuidador por uma jornada de formação, acompanha o aprendizado e exige no mínimo 70% em cada avaliação para liberar o módulo seguinte. A experiência reúne áreas para alunos, agências e administração. A emissão e a validação de certificados e os selos de qualificação seguem em evolução.',
    features: [
      'Formação profissional de cuidadores',
      'Cursos, módulos e aulas',
      'Progresso com regra de aprovação de 70%',
      'Áreas para aluno, agência e administração',
      'Certificados e selos em evolução',
    ],
    layout: 'split',
  },
  {
    id: 'hermes',
    title: 'Hermes',
    category: 'Sistema operacional · automação com controle humano',
    description:
      'Um centro de comando pessoal e operacional que reúne rotina, projetos, CRM, finanças e automações e coordena o trabalho comercial da Barthy.',
    detail:
      'O Hermes nasceu como um Personal OS para centralizar rotina, estudos, finanças, projetos e relatórios. Hoje também organiza missões, agentes especializados e próximos passos do funil comercial, mantendo ações sensíveis sob políticas, aprovação humana e auditoria.',
    features: [
      'Rotina, projetos, finanças e estudos',
      'CRM e pipeline comercial',
      'Coordenação de agentes especializados',
      'Políticas e aprovações humanas',
      'Auditoria e próximas ações',
    ],
    layout: 'split',
  },
]
