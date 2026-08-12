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
          <SectionBadge number="03">Experiência aplicada</SectionBadge>
          <h2 id="projects-title">Projetos que carregam operação de verdade</h2>
          <p>
            Conceitos e produtos próprios que mostram a Barthy trabalhando além
            da interface: fluxos, regras, dados, acompanhamento e evolução de
            sistemas.
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
