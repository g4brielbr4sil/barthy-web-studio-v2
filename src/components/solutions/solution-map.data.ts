import {
  Globe2,
  HeartHandshake,
  LayoutDashboard,
  Workflow,
} from 'lucide-react'
import type { SolutionGroup } from './solution-map.types'

export const solutionGroups: SolutionGroup[] = [
  {
    id: 'web',
    title: 'BWS Digital',
    summary: 'Sites, páginas e presença online',
    architectureSummary:
      'A frente digital da Barthy cria sites, landing pages e portfólios que apresentam o negócio com clareza e conduzem o visitante até o contato.',
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
      },
      {
        eyebrow: 'Organização',
        title: 'Página clara',
      },
      {
        eyebrow: 'Resultado',
        title: 'Contato qualificado',
      },
    ],
  },
  {
    id: 'sistemas',
    title: 'BWS Sistemas',
    summary: 'Clientes, serviços e operação',
    architectureSummary:
      'A BWS Sistemas transforma processos que hoje vivem em planilhas, mensagens e memória em uma ferramenta própria, simples de acompanhar.',
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
      },
      {
        eyebrow: 'Organização',
        title: 'Regras do processo',
      },
      {
        eyebrow: 'Resultado',
        title: 'Próxima ação',
      },
    ],
  },
  {
    id: 'automacoes',
    title: 'BWS Automação',
    summary: 'Integrações e tarefas automáticas',
    architectureSummary:
      'A BWS Automação conecta entradas, tarefas, avisos e integrações para reduzir repetição, espera e trabalho manual.',
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
      },
      {
        eyebrow: 'Execução',
        title: 'Rotina conectada',
      },
      {
        eyebrow: 'Resultado',
        title: 'Aviso e acompanhamento',
      },
    ],
  },
  {
    id: 'care',
    title: 'BWS Suporte',
    summary: 'Manutenção e evolução',
    architectureSummary:
      'A BWS Suporte acompanha manutenção, monitoramento e evolução para a tecnologia continuar útil depois da entrega.',
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
      },
      {
        eyebrow: 'Cuidado',
        title: 'Sinais monitorados',
      },
      {
        eyebrow: 'Evolução',
        title: 'Melhoria priorizada',
      },
    ],
  },
]
