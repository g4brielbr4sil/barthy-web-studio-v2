import {
  Blocks,
  FileInput,
  Globe2,
  LayoutDashboard,
  Network,
  PanelsTopLeft,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { SectionReveal } from './SectionReveal'
import { TextRollButton } from './TextRollButton'

interface SolutionGroup {
  id: string
  title: string
  summary: string
  items: string[]
  icon: LucideIcon
}

const solutionGroups: SolutionGroup[] = [
  {
    id: 'presenca',
    title: 'Presença digital',
    summary: 'Apresentar com clareza, ritmo e uma direção visual própria.',
    items: ['Landing pages', 'Portfólios', 'Páginas institucionais'],
    icon: Globe2,
  },
  {
    id: 'sistemas',
    title: 'Sistemas',
    summary: 'Organizar dados, regras e rotinas em interfaces úteis.',
    items: ['CRMs', 'Dashboards', 'Portais', 'Ferramentas internas'],
    icon: LayoutDashboard,
  },
  {
    id: 'operacao',
    title: 'Operação',
    summary: 'Conectar entradas, ferramentas e próximas ações.',
    items: ['Automações', 'Integrações', 'Formulários', 'Organização digital'],
    icon: Workflow,
  },
]

function SolutionPanel({
  group,
  active,
}: {
  group: SolutionGroup
  active?: boolean
}) {
  const Icon = group.icon

  return (
    <div
      className="solution-panel"
      data-solution={group.id}
      data-active={active}
    >
      <div className="solution-panel__canvas" aria-hidden="true">
        <div className="solution-panel__core">
          <Icon size={26} />
        </div>
        <span className="solution-panel__orbit solution-panel__orbit--one">
          <PanelsTopLeft size={18} />
        </span>
        <span className="solution-panel__orbit solution-panel__orbit--two">
          <Network size={18} />
        </span>
        <span className="solution-panel__orbit solution-panel__orbit--three">
          <FileInput size={18} />
        </span>
        <span className="solution-panel__line solution-panel__line--one" />
        <span className="solution-panel__line solution-panel__line--two" />
        <span className="solution-panel__line solution-panel__line--three" />
      </div>
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
    setActiveIndex(nextIndex)
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

        <div className="solutions__desktop">
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
                  aria-controls={`panel-${group.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={21} aria-hidden="true" />
                  <strong>{group.title}</strong>
                  <small>{group.summary}</small>
                </button>
              )
            })}
          </div>

          <div
            id={`panel-${activeGroup.id}`}
            className="solutions__active-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeGroup.id}`}
            tabIndex={0}
          >
            <SolutionPanel group={activeGroup} active />
          </div>
        </div>

        <div className="solutions__mobile">
          {solutionGroups.map((group) => (
            <SolutionPanel key={group.id} group={group} active />
          ))}
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
