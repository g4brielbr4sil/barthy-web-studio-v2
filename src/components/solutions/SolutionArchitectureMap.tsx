import { BriefcaseBusiness } from 'lucide-react'
import type { SolutionGroup } from './solution-map.types'

export function SolutionArchitectureMap({
  group,
}: {
  group: SolutionGroup
}) {
  const captionId = `solution-network-caption-${group.id}`
  const descriptionId = `solution-network-description-${group.id}`

  return (
    <figure
      className="solution-network"
      data-density={group.id}
      aria-labelledby={captionId}
      aria-describedby={descriptionId}
    >
      <figcaption id={captionId}>
        <span>Estrutura conectada</span>
        <strong>{group.title}</strong>
      </figcaption>
      <p id={descriptionId} className="solution-network__description">
        {group.architectureSummary} A representação conecta{' '}
        {group.nodes.map((node) => node.label).join(', ')} ao núcleo do negócio.
      </p>

      <div className="solution-network__map" aria-hidden="true">
        <svg
          className="solution-network__connections"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="50" cy="50" r="26" vectorEffect="non-scaling-stroke" />
          {group.nodes.map((node) => (
            <line
              key={`${group.id}-connection-${node.id}`}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="solution-network__core">
          <BriefcaseBusiness size={20} />
          <span>
            <small>BWS</small>
            <strong>Negócio</strong>
          </span>
        </div>

        {group.nodes.map((node) => {
          const Icon = node.icon

          return (
            <span
              key={node.id}
              className="solution-network__node"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span className="solution-network__node-icon">
                <Icon size={16} />
              </span>
              <strong>{node.label}</strong>
            </span>
          )
        })}
      </div>
    </figure>
  )
}
