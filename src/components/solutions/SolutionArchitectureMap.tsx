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
      <figcaption id={captionId}>Visão da solução</figcaption>
      <div className="solution-journey__intro">
        <h3>{group.title}</h3>
        <p id={descriptionId} className="solution-journey__summary">
          {group.architectureSummary}
        </p>
      </div>

      <span className="solution-journey__flow-label">Como funciona</span>

      <ol className="solution-journey__steps">
        {group.flow.map((step, index) => {
          return (
            <li key={step.title} className="solution-journey__step">
              <span className="solution-journey__step-marker" aria-hidden="true">
                <span className="solution-journey__step-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </span>
              <div>
                <small>{step.eyebrow}</small>
                <strong>{step.title}</strong>
              </div>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
