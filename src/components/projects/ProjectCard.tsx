import { Minus, Plus } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import type { Project } from '../../data/projects'
import { ProjectMedia } from './ProjectMedia'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const detailsId = useId()
  const ignoreNextClickRef = useRef(false)

  const toggleExpanded = () => {
    setExpanded((value) => !value)
  }

  return (
    <article
      className={`project-card project-card--${project.layout} project-card--${project.id}`}
    >
      <div className="project-card__media">
        <ProjectMedia
          kind={project.id}
          label={`Representação visual do projeto ${project.title}`}
        />
      </div>

      <div className="project-card__body">
        <div className="project-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="project-card__copy">
          <p className="project-card__category">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="project-card__description">{project.description}</p>
        </div>

        <button
          className="project-card__action"
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onPointerUp={(event) => {
            if (event.pointerType !== 'touch' && event.pointerType !== 'pen') {
              return
            }

            ignoreNextClickRef.current = true
            toggleExpanded()
          }}
          onClick={() => {
            if (ignoreNextClickRef.current) {
              ignoreNextClickRef.current = false
              return
            }

            toggleExpanded()
          }}
        >
          <span>{expanded ? 'Fechar detalhes' : 'Ver detalhes'}</span>
          <span className="project-card__action-icon" aria-hidden="true">
            {expanded ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </button>
      </div>

      <div
        id={detailsId}
        className="project-card__details"
        hidden={!expanded}
      >
        <p>{project.detail}</p>
        <div>
          <strong>Estrutura representada</strong>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>
                <Plus size={13} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
