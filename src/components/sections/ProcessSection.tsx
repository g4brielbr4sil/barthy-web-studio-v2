import {
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
    title: 'Entendemos',
    description:
      'Conversamos sobre o negócio e identificamos o problema.',
    icon: Search,
  },
  {
    title: 'Desenhamos',
    description:
      'Definimos a solução mais simples que realmente resolve.',
    icon: DraftingCompass,
  },
  {
    title: 'Construímos',
    description:
      'Desenvolvemos, validamos e colocamos para funcionar.',
    icon: Hammer,
  },
  {
    title: 'Evoluímos',
    description:
      'Acompanhamos o uso e melhoramos quando necessário.',
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
        <SectionReveal className="process__heading" data-section-anchor>
          <SectionBadge number="04">Como trabalhamos</SectionBadge>
          <h2 id="process-title">
            Um processo claro do primeiro contato à evolução do projeto.
          </h2>
          <p>
            Conte como sua empresa trabalha hoje. A Barthy parte da rotina real
            do negócio para identificar onde um site, sistema ou automação pode
            simplificar o trabalho e melhorar o acompanhamento.
          </p>
        </SectionReveal>

        <SectionReveal as="ol" className="process__steps">
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

        <TextRollButton
          href="#contato"
          variant="terra"
          className="process__cta"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('contato')
          }}
        >
          Falar sobre meu negócio
        </TextRollButton>
      </div>
    </section>
  )
}
