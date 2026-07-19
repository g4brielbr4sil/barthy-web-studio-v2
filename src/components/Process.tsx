import {
  CheckCircle2,
  DraftingCompass,
  Hammer,
  RefreshCw,
  Search,
  type LucideIcon,
} from 'lucide-react'
import { SectionBadge } from './SectionBadge'
import { SectionReveal } from './SectionReveal'
import { TextRollButton } from './TextRollButton'

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

export function Process() {
  return (
    <section
      id="processo"
      className="process section-shell"
      aria-labelledby="process-title"
    >
      <div className="stage">
        <SectionReveal className="process__heading">
          <SectionBadge number="03">Como trabalhamos</SectionBadge>
          <h2 id="process-title">
            Um processo claro do primeiro contato à evolução do projeto.
          </h2>
        </SectionReveal>

        <ol className="process__steps">
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
        </ol>

        <TextRollButton
          href="#contato"
          source="process"
          variant="terra"
          className="process__cta"
        >
          Iniciar pelo diagnóstico
        </TextRollButton>
      </div>
    </section>
  )
}
