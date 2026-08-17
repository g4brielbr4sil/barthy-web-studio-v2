import { ArrowRight } from 'lucide-react'
import type { SolutionGroup } from './solution-map.types'

export function SolutionArchitectureMap({
  group,
}: {
  group: SolutionGroup
}) {
  const captionId = `solution-journey-caption-${group.id}`
  const descriptionId = `solution-journey-description-${group.id}`

  return (
    <figure
      className="solution-journey"
      data-solution={group.id}
      aria-labelledby={captionId}
      aria-describedby={descriptionId}
    >
      <figcaption id={captionId}>Como esta linha trabalha</figcaption>
      <p id={descriptionId} className="solution-journey__summary">
        {group.architectureSummary}
      </p>

      <ol className="solution-journey__steps">
        {group.flow.map((step, index) => {
          const Icon = step.icon

          return (
            <li key={step.title} className="solution-journey__step">
              <span className="solution-journey__step-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="solution-journey__step-icon" aria-hidden="true">
                <Icon size={19} />
              </span>
              <div>
                <small>{step.eyebrow}</small>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
              {index < group.flow.length - 1 && (
                <ArrowRight
                  className="solution-journey__arrow"
                  size={18}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
