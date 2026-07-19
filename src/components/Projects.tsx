import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionBadge } from './SectionBadge'
import { SectionReveal } from './SectionReveal'

export function Projects() {
  return (
    <section
      id="projetos"
      className="projects section-shell"
      aria-labelledby="projects-title"
    >
      <div className="stage">
        <SectionReveal className="projects__heading" data-section-anchor>
          <SectionBadge number="02">Experiência aplicada</SectionBadge>
          <h2 id="projects-title">Projetos em destaque</h2>
          <p>
            Sistemas reais apresentados como prova de repertório, contexto e
            capacidade de execução.
          </p>
        </SectionReveal>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
