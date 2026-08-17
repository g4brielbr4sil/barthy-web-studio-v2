import {
  BellRing,
  ContactRound,
  Database,
  FileInput,
  Globe2,
  HeartHandshake,
  Inbox,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  PanelsTopLeft,
  Route,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import type { SolutionGroup } from './solution-map.types'

export const solutionGroups: SolutionGroup[] = [
  {
    id: 'web',
    title: 'BWS Web',
    summary: 'Presença digital',
    architectureSummary:
      'Sites e páginas que apresentam o negócio com clareza e conduzem o visitante até o contato.',
    items: [
      'Sites institucionais',
      'Landing pages',
      'Portfólios',
      'Formulários',
      'Páginas de serviços',
    ],
    icon: Globe2,
    flow: [
      {
        eyebrow: 'Entrada',
        title: 'Negócio e oferta',
        detail: 'Entendemos o que precisa ser apresentado e para quem.',
        icon: FileInput,
      },
      {
        eyebrow: 'Organização',
        title: 'Página clara',
        detail: 'Conteúdo, hierarquia e prova orientam a leitura.',
        icon: PanelsTopLeft,
      },
      {
        eyebrow: 'Resultado',
        title: 'Contato qualificado',
        detail: 'O visitante entende a proposta e sabe como avançar.',
        icon: MessageCircle,
      },
    ],
  },
  {
    id: 'sistemas',
    title: 'BWS Systems',
    summary: 'Sistemas',
    architectureSummary:
      'Clientes, orçamentos, serviços e decisões reunidos em uma ferramenta simples de acompanhar.',
    items: [
      'Sistemas comerciais',
      'Gestão de clientes',
      'Orçamentos',
      'Acompanhamento',
      'Dashboards',
      'Sistemas sob medida',
    ],
    icon: LayoutDashboard,
    flow: [
      {
        eyebrow: 'Entrada',
        title: 'Clientes e pedidos',
        detail: 'As informações chegam por um ponto de entrada definido.',
        icon: ContactRound,
      },
      {
        eyebrow: 'Organização',
        title: 'Regras do processo',
        detail: 'Status, responsáveis e histórico ficam no mesmo fluxo.',
        icon: Database,
      },
      {
        eyebrow: 'Resultado',
        title: 'Próxima ação',
        detail: 'A equipe enxerga o que acompanhar e o que decidir.',
        icon: ListChecks,
      },
    ],
  },
  {
    id: 'automacoes',
    title: 'BWS Automations',
    summary: 'Automação',
    architectureSummary:
      'Entradas, tarefas, avisos e integrações conectados para reduzir repetição, espera e trabalho manual.',
    items: [
      'Integrações',
      'Notificações',
      'Fluxos automáticos',
      'Automação operacional',
      'IA aplicada quando necessária',
    ],
    icon: Workflow,
    flow: [
      {
        eyebrow: 'Gatilho',
        title: 'Evento ou pedido',
        detail: 'Uma ação real inicia o fluxo sem depender de memória.',
        icon: Inbox,
      },
      {
        eyebrow: 'Execução',
        title: 'Rotina conectada',
        detail: 'Regras encaminham tarefas, dados e integrações.',
        icon: Workflow,
      },
      {
        eyebrow: 'Resultado',
        title: 'Aviso e acompanhamento',
        detail: 'A equipe recebe o sinal certo e mantém o controle.',
        icon: BellRing,
      },
    ],
  },
  {
    id: 'care',
    title: 'BWS Care',
    summary: 'Suporte e evolução',
    architectureSummary:
      'Suporte, monitoramento e evolução para a tecnologia continuar útil depois da entrega.',
    items: [
      'Manutenção',
      'Suporte',
      'Monitoramento',
      'Evoluções',
      'Hospedagem',
      'Acompanhamento técnico',
    ],
    icon: HeartHandshake,
    flow: [
      {
        eyebrow: 'Uso real',
        title: 'Operação acompanhada',
        detail: 'O que foi entregue continua perto da rotina do negócio.',
        icon: HeartHandshake,
      },
      {
        eyebrow: 'Cuidado',
        title: 'Sinais monitorados',
        detail: 'Erros, dúvidas e necessidades deixam de ficar soltos.',
        icon: ShieldCheck,
      },
      {
        eyebrow: 'Evolução',
        title: 'Melhoria priorizada',
        detail: 'A solução avança conforme o uso mostra o próximo passo.',
        icon: Route,
      },
    ],
  },
]
