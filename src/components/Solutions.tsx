import {
  BarChart3,
  Blocks,
  ContactRound,
  Database,
  FileInput,
  Globe2,
  Headset,
  Inbox,
  LayoutDashboard,
  ListChecks,
  ListTodo,
  MessageCircle,
  Network,
  PanelsTopLeft,
  Plug,
  Route,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { SectionReveal } from './SectionReveal'
import { TextRollButton } from './TextRollButton'

interface SolutionNode {
  id: string
  label: string
  icon: LucideIcon
  x: number
  y: number
}

type SolutionConnection = [
  startX: number,
  startY: number,
  endX: number,
  endY: number,
]

interface SolutionGroup {
  id: string
  title: string
  summary: string
  items: string[]
  icon: LucideIcon
  rings: number
  nodes: SolutionNode[]
  connections: SolutionConnection[]
}

const solutionGroups: SolutionGroup[] = [
  {
    id: 'presenca',
    title: 'Presença digital',
    summary: 'Apresentar com clareza, ritmo e uma direção visual própria.',
    items: ['Landing pages', 'Portfólios', 'Páginas institucionais'],
    icon: Globe2,
    rings: 1,
    nodes: [
      { id: 'pagina', label: 'Página', icon: PanelsTopLeft, x: 50, y: 17 },
      {
        id: 'portfolio',
        label: 'Portfólio',
        icon: FileInput,
        x: 24,
        y: 70,
      },
      {
        id: 'contato',
        label: 'Contato',
        icon: MessageCircle,
        x: 76,
        y: 70,
      },
    ],
    connections: [
      [50, 50, 50, 17],
      [50, 50, 24, 70],
      [50, 50, 76, 70],
    ],
  },
  {
    id: 'sistemas',
    title: 'Sistemas',
    summary: 'Organizar dados, regras e rotinas em interfaces úteis.',
    items: ['CRMs', 'Dashboards', 'Portais', 'Ferramentas internas'],
    icon: LayoutDashboard,
    rings: 2,
    nodes: [
      { id: 'crm', label: 'CRM', icon: ContactRound, x: 50, y: 13 },
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        x: 20,
        y: 34,
      },
      { id: 'portal', label: 'Portal', icon: PanelsTopLeft, x: 80, y: 34 },
      { id: 'dados', label: 'Dados', icon: Database, x: 27, y: 78 },
      { id: 'regras', label: 'Regras', icon: ListChecks, x: 73, y: 78 },
    ],
    connections: [
      [50, 50, 50, 13],
      [50, 50, 20, 34],
      [50, 50, 80, 34],
      [50, 50, 27, 78],
      [50, 50, 73, 78],
      [20, 34, 27, 78],
      [80, 34, 73, 78],
      [27, 78, 73, 78],
    ],
  },
  {
    id: 'operacao',
    title: 'Operação',
    summary: 'Conectar entradas, ferramentas e próximas ações.',
    items: ['Automações', 'Integrações', 'Formulários', 'Organização digital'],
    icon: Workflow,
    rings: 3,
    nodes: [
      { id: 'entrada', label: 'Entrada', icon: Inbox, x: 50, y: 10 },
      {
        id: 'atendimento',
        label: 'Atendimento',
        icon: Headset,
        x: 18,
        y: 27,
      },
      { id: 'automacao', label: 'Automação', icon: Zap, x: 82, y: 27 },
      { id: 'integracao', label: 'Integração', icon: Plug, x: 84, y: 63 },
      { id: 'tarefas', label: 'Tarefas', icon: ListTodo, x: 70, y: 87 },
      {
        id: 'relatorios',
        label: 'Relatórios',
        icon: BarChart3,
        x: 30,
        y: 87,
      },
      {
        id: 'proxima-acao',
        label: 'Próxima ação',
        icon: Route,
        x: 16,
        y: 63,
      },
      {
        id: 'acompanhamento',
        label: 'Acompanhamento',
        icon: Network,
        x: 50,
        y: 76,
      },
    ],
    connections: [
      [50, 50, 50, 10],
      [50, 50, 18, 27],
      [50, 50, 82, 27],
      [50, 50, 84, 63],
      [50, 50, 70, 87],
      [50, 50, 30, 87],
      [50, 50, 16, 63],
      [50, 50, 50, 76],
      [18, 27, 16, 63],
      [82, 27, 84, 63],
      [16, 63, 30, 87],
      [84, 63, 70, 87],
      [30, 87, 50, 76],
      [70, 87, 50, 76],
    ],
  },
]

function SolutionNetwork({ group }: { group: SolutionGroup }) {
  const GroupIcon = group.icon

  return (
    <figure
      className="solution-network"
      data-density={group.id}
      aria-label={`Representação visual conceitual de ${group.title}`}
    >
      <figcaption>Representação visual</figcaption>

      <svg
        className="solution-network__connections"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {Array.from({ length: group.rings }, (_, index) => (
          <ellipse
            key={`ring-${index + 1}`}
            className={`solution-network__ring solution-network__ring--${
              index + 1
            }`}
            cx="50"
            cy="50"
            rx={17 + index * 12}
            ry={13 + index * 9}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {group.connections.map(([startX, startY, endX, endY], index) => (
          <line
            key={`${group.id}-connection-${index}`}
            className={index % 3 === 0 ? 'is-flowing' : undefined}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            pathLength="1"
            vectorEffect="non-scaling-stroke"
            style={
              {
                '--connection-delay': `${index * 110}ms`,
              } as CSSProperties
            }
          />
        ))}
      </svg>

      <div className="solution-network__core" aria-hidden="true">
        <span>
          <img src="/favicon.svg" width="34" height="34" alt="" />
        </span>
        <GroupIcon size={14} />
      </div>

      <div className="solution-network__nodes" aria-hidden="true">
        {group.nodes.map((node, index) => {
          const Icon = node.icon

          return (
            <span
              key={node.id}
              className="solution-network__node"
              style={
                {
                  '--node-x': `${node.x}%`,
                  '--node-y': `${node.y}%`,
                  '--node-delay': `${80 + index * 70}ms`,
                } as CSSProperties
              }
            >
              <span className="solution-network__node-icon">
                <Icon size={17} />
              </span>
              <span className="solution-network__node-label">
                {node.label}
              </span>
            </span>
          )
        })}
      </div>
    </figure>
  )
}

function SolutionPanel({ group }: { group: SolutionGroup }) {
  return (
    <div className="solution-panel" data-solution={group.id}>
      <SolutionNetwork group={group} />

      <div className="solution-panel__copy">
        <span>
          <Blocks size={15} aria-hidden="true" />
          Estrutura aplicada
        </span>
        <h3>{group.title}</h3>
        <p>{group.summary}</p>
        <ul>
          {group.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeGroup = solutionGroups[activeIndex] ?? solutionGroups[0]

  const selectTab = (index: number) => {
    setActiveIndex(index)
  }

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % solutionGroups.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + solutionGroups.length) % solutionGroups.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = solutionGroups.length - 1
    } else {
      return
    }

    event.preventDefault()
    selectTab(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section
      id="solucoes"
      className="solutions section-shell"
      aria-labelledby="solutions-title"
    >
      <div className="stage">
        <SectionReveal className="solutions__heading">
          <p className="eyebrow">Capacidade conectada</p>
          <h2 id="solutions-title">O que construímos</h2>
          <p>
            Do primeiro ponto de contato à ferramenta que organiza a operação.
          </p>
        </SectionReveal>

        <div className="solutions__experience">
          <div
            className="solutions__tabs"
            role="tablist"
            aria-label="Grupos de soluções"
            aria-orientation="vertical"
          >
            {solutionGroups.map((group, index) => {
              const Icon = group.icon
              const selected = index === activeIndex

              return (
                <button
                  key={group.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  id={`tab-${group.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="solutions-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={22} aria-hidden="true" />
                  <strong>{group.title}</strong>
                  <small>{group.summary}</small>
                </button>
              )
            })}
          </div>

          <div
            id="solutions-panel"
            className="solutions__active-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeGroup.id}`}
            tabIndex={0}
          >
            <SolutionPanel group={activeGroup} />
          </div>
        </div>

        <TextRollButton
          href="#contato"
          source="solutions"
          variant="outline"
          className="solutions__cta"
        >
          Estruturar uma solução
        </TextRollButton>
      </div>
    </section>
  )
}
