import { BriefcaseBusiness } from 'lucide-react'
import type { SolutionGroup } from './solution-map.types'

export function SolutionArchitectureMap({
  group,
}: {
  group: SolutionGroup
}) {
  const captionId = `solution-network-caption-${group.id}`
  const descriptionId = `solution-network-description-${group.id}`
  const legendTitleId = `solution-network-legend-${group.id}`

  return (
    <figure
      className="solution-network"
      data-density={group.id}
      aria-labelledby={captionId}
      aria-describedby={descriptionId}
    >
      <figcaption id={captionId}>
        Arquitetura do negócio · {group.title}
      </figcaption>
      <p id={descriptionId} className="solution-network__description">
        {group.architectureSummary} Os elementos desta camada estão conectados
        ao núcleo do negócio.
      </p>

      <div className="solution-network__map">
        <svg
          className="solution-network__connections"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {[1, 2, 3].map((layer) => {
            const state =
              layer === group.layer
                ? 'is-current'
                : layer < group.layer
                  ? 'is-complete'
                  : 'is-upcoming'

            return (
              <circle
                key={`ring-${layer}`}
                className={`solution-network__ring solution-network__ring--${layer} ${state}`}
                cx="50"
                cy="50"
                r={14 + layer * 10}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}

          {group.nodes.map((node, index) => (
            <line
              key={`${group.id}-connection-${node.id}`}
              className={index % 3 === 0 ? 'is-flowing' : undefined}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="solution-network__core" aria-hidden="true">
          <span className="solution-network__core-icon">
            <BriefcaseBusiness size={20} />
          </span>
          <span className="solution-network__core-copy">
            <small>Núcleo</small>
            <strong>Negócio</strong>
          </span>
        </div>

        <div className="solution-network__nodes" aria-hidden="true">
          {group.nodes.map((node) => {
            const Icon = node.icon

            return (
              <span
                key={node.id}
                className="solution-network__node"
                data-node={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
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
      </div>

      <div
        className="solution-network__mobile-legend"
        aria-labelledby={legendTitleId}
      >
        <p id={legendTitleId}>Elementos desta camada</p>
        <ul>
          {group.nodes.map((node) => {
            const Icon = node.icon

            return (
              <li key={node.id}>
                <Icon size={15} aria-hidden="true" />
                <span>{node.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </figure>
  )
}
