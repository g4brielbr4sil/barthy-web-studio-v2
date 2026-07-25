import {
  CheckCircle2,
  DraftingCompass,
  Hammer,
  RefreshCw,
  Search,
  type LucideIcon,
} from 'lucide-react'
import type { SectionId } from '../../data/navigation'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

interface ProcessStep {
  title: string
  description: string
  icon: LucideIcon
}

const steps: ProcessStep[] = [
  {
    title: 'Entender',
    description:
      'O contexto, as necessidades e o que realmente precisa ser resolvido.',
    icon: Search,
  },
  {
    title: 'Estruturar',
    description:
      'Organizamos conteúdo, fluxo, prioridades e direção visual.',
    icon: DraftingCompass,
  },
  {
    title: 'Construir',
    description:
      'Transformamos a estrutura em uma experiência funcional e responsiva.',
    icon: Hammer,
  },
  {
    title: 'Validar',
    description:
      'Testamos conteúdo, navegação, comportamento e regras do projeto.',
    icon: CheckCircle2,
  },
  {
    title: 'Evoluir',
    description:
      'Acompanhamos ajustes, aprendizados e novas necessidades.',
    icon: RefreshCw,
  },
]

export function ProcessSection({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  return (
    <section
      id="processo"
      className="process section-shell"
      aria-labelledby="process-title"
    >
      <div className="stage">
        <SectionReveal
          className="process__heading"
          variant="heading"
          data-section-anchor
        >
          <SectionBadge number="04">Como trabalhamos</SectionBadge>
          <h2 id="process-title">
            Um processo claro do primeiro contato à evolução do projeto.
          </h2>
        </SectionReveal>

        <SectionReveal as="ol" className="process__steps" variant="list">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="process-step">
                <div className="process-step__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="process-step__icon" aria-hidden="true">
                  <Icon size={21} />
                </div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            )
          })}
        </SectionReveal>

        <SectionReveal variant="content">
          <TextRollButton
            href="#contato"
            variant="terra"
            className="process__cta"
            onClick={(event) => {
              event.preventDefault()
              onNavigate('contato')
            }}
          >
            Iniciar pelo diagnóstico
          </TextRollButton>
        </SectionReveal>
      </div>
    </section>
  )
}
