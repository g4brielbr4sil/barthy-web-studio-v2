import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'

export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="projects section-shell"
      aria-labelledby="projects-title"
    >
      <div className="stage">
        <SectionReveal className="projects__heading" data-section-anchor>
          <SectionBadge number="04">Experiência aplicada</SectionBadge>
          <h2 id="projects-title">Projetos e demonstrações</h2>
          <p>
            Trabalhos próprios e experiência profissional apresentados com o
            contexto correto, sem métricas ou resultados inventados.
          </p>
        </SectionReveal>

        <SectionReveal className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </SectionReveal>
      </div>
    </section>
  )
}
