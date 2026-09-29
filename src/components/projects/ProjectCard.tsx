import type { Project } from '../../data/projects'
import { ProjectMedia } from './ProjectMedia'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className={`project-card project-card--${project.variant}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="project-card__media">
        <ProjectMedia project={project} />
      </div>

      <div className="project-card__body">
        <div className="project-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="project-card__copy">
          <p className="project-card__category">{project.category}</p>
          <h3 id={`project-title-${project.id}`}>{project.title}</h3>
          <p className="project-card__description">{project.description}</p>
        </div>
      </div>
    </article>
  )
}
