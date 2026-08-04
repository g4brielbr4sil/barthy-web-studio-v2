import { BriefcaseBusiness } from 'lucide-react'
import type { SolutionGroup } from './solution-map.types'

function RadialArchitecture({ group }: { group: SolutionGroup }) {
  return (
    <div className="solution-network__map" aria-hidden="true">
      <svg
        className="solution-network__connections"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
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

      <div className="solution-network__core">
        <span className="solution-network__core-icon">
          <BriefcaseBusiness size={20} />
        </span>
        <span className="solution-network__core-copy">
          <small>Núcleo</small>
          <strong>Negócio</strong>
        </span>
      </div>

      <div className="solution-network__nodes">
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
              <span
                className="solution-network__node-label"
                data-label={node.label}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}

function SystemsArchitecture({ group }: { group: SolutionGroup }) {
  const nodes = Object.fromEntries(group.nodes.map((node) => [node.id, node]))
  const interfaceNodes = ['crm', 'dashboard', 'portal']

  return (
    <div className="solution-system" aria-hidden="true">
      <div className="solution-system__layer">
        <span>Interfaces</span>
        <strong>Onde o trabalho acontece</strong>
      </div>

      <div className="solution-system__interfaces">
        {interfaceNodes.map((nodeId) => {
          const node = nodes[nodeId]
          const Icon = node.icon

          return (
            <div key={node.id} className="solution-system__module">
              <Icon size={17} />
              <span data-label={node.label} />
            </div>
          )
        })}
      </div>

      <div className="solution-system__bus">
        <span />
        <i />
        <i />
        <i />
      </div>

      <div className="solution-system__engine">
        {['dados', 'regras'].map((nodeId) => {
          const node = nodes[nodeId]
          const Icon = node.icon

          return (
            <div
              key={node.id}
              className={`solution-system__source solution-system__source--${node.id}`}
            >
              <Icon size={18} />
              <span data-label={node.label} />
            </div>
          )
        })}

        <div className="solution-system__core">
          <span>
            <BriefcaseBusiness size={20} />
          </span>
          <small>Núcleo</small>
          <strong>Negócio</strong>
        </div>
      </div>

      <div className="solution-system__flow">
        <span data-label="Dados organizados" />
        <i />
        <span data-label="Regras aplicadas" />
        <i />
        <span data-label="Interfaces úteis" />
      </div>
    </div>
  )
}

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

      {group.id === 'sistemas' ? (
        <SystemsArchitecture group={group} />
      ) : (
        <RadialArchitecture group={group} />
      )}

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
