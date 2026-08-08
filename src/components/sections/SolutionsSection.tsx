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
  const [activeIndex, setActiveIndex] = useState(1)
  const activeGroup = solutionGroups[activeIndex] ?? solutionGroups[0]

  return (
    <section
      id="solucoes"
      className="solutions section-shell"
      aria-labelledby="solutions-title"
    >
      <div className="stage">
        <SectionReveal className="solutions__heading" data-section-anchor>
          <SectionBadge number="02">Quatro linhas de atuação</SectionBadge>
          <h2 id="solutions-title">Soluções conectadas ao seu negócio</h2>
          <p>
            Da presença online às ferramentas que organizam a operação.
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
                  Linha de solução
                </span>
                <h3>{activeGroup.title}</h3>
                <p>{activeGroup.summary}</p>
                <p className="solution-panel__architecture-summary">
                  {activeGroup.architectureSummary}
                </p>
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
          Falar sobre meu negócio
        </TextRollButton>
      </div>
    </section>
  )
}
