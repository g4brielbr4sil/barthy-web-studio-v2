import { Blocks } from 'lucide-react'
import { useState } from 'react'
import type { SectionId } from '../../data/navigation'
import { SolutionArchitectureMap } from '../solutions/SolutionArchitectureMap'
import { solutionGroups } from '../solutions/solution-map.data'
import { SolutionTabs } from '../solutions/SolutionTabs'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

export function SolutionsSection({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeGroup = solutionGroups[activeIndex] ?? solutionGroups[0]

  return (
    <section
      id="solucoes"
      className="solutions section-shell"
      aria-labelledby="solutions-title"
    >
      <div className="stage">
        <SectionReveal className="solutions__heading" data-section-anchor>
          <SectionBadge number="03">Capacidade conectada</SectionBadge>
          <h2 id="solutions-title">O que construímos</h2>
          <p>
            Do primeiro ponto de contato à ferramenta que organiza a operação.
          </p>
        </SectionReveal>

        <SectionReveal className="solutions__experience">
          <SolutionTabs
            groups={solutionGroups}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          <div
            id="solutions-panel"
            className="solutions__active-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeGroup.id}`}
            tabIndex={0}
          >
            <div className="solution-panel" data-solution={activeGroup.id}>
              <SolutionArchitectureMap group={activeGroup} />

              <div className="solution-panel__copy">
                <span>
                  <Blocks size={15} aria-hidden="true" />
                  Estrutura aplicada
                </span>
                <h3>{activeGroup.title}</h3>
                <p>{activeGroup.summary}</p>
                <p className="solution-panel__architecture-summary">
                  {activeGroup.architectureSummary}
                </p>
                <ul className="solution-panel__nodes-list">
                  {activeGroup.nodes.map((node) => (
                    <li key={node.id}>{node.label}</li>
                  ))}
                </ul>
                <ul className="solution-panel__services">
                  {activeGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionReveal>

        <TextRollButton
          href="#contato"
          variant="outline"
          className="solutions__cta"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('contato')
          }}
        >
          Estruturar uma solução
        </TextRollButton>
      </div>
    </section>
  )
}
