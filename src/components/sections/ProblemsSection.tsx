import {
  ChevronDown,
  ClipboardList,
  Files,
  MessageSquareWarning,
  Repeat2,
} from 'lucide-react'
import { useState } from 'react'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'

const problems = [
  {
    title: 'Orçamentos perdidos no WhatsApp',
    description: 'Organizamos oportunidades, retornos e próximos passos.',
    icon: MessageSquareWarning,
  },
  {
    title: 'Informações espalhadas',
    description: 'Centralizamos clientes, serviços e dados importantes.',
    icon: Files,
  },
  {
    title: 'Trabalho repetitivo',
    description:
      'Criamos automações para tarefas que consomem tempo todos os dias.',
    icon: Repeat2,
  },
  {
    title: 'Presença digital improvisada',
    description:
      'Construímos uma estrutura profissional para o cliente encontrar e entender a empresa.',
    icon: ClipboardList,
  },
]

export function ProblemsSection() {
  const [activeProblem, setActiveProblem] = useState<number | null>(0)

  return (
    <section
      id="problemas"
      className="problems section-shell"
      aria-labelledby="problems-title"
    >
      <div className="stage">
        <SectionReveal className="problems__heading" data-section-anchor>
          <SectionBadge number="01">Onde a Barthy entra</SectionBadge>
          <h2 id="problems-title">
            Tecnologia começa pelo que está atrapalhando o negócio hoje.
          </h2>
          <p>
            Antes de propor uma ferramenta, a Barthy entende onde oportunidades,
            informações e tempo estão sendo perdidos.
          </p>
        </SectionReveal>

        <SectionReveal as="ol" className="problems__list">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <li key={problem.title} className="problem-item">
                <span className="problem-item__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{problem.title}</h3>
                  <p>{problem.description}</p>
                </div>
              </li>
            )
          })}
        </SectionReveal>

        <SectionReveal
          className="problems__bubbles"
          aria-label="Situações que a Barthy ajuda a organizar"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            const expanded = activeProblem === index
            const panelId = `problem-bubble-${index}`

            return (
              <article
                key={problem.title}
                className="problem-bubble"
                data-expanded={expanded}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setActiveProblem(expanded ? null : index)}
                >
                  <span className="problem-bubble__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="problem-bubble__icon" aria-hidden="true">
                    <Icon size={19} />
                  </span>
                  <strong>{problem.title}</strong>
                  <ChevronDown
                    className="problem-bubble__chevron"
                    size={18}
                    aria-hidden="true"
                  />
                </button>
                <div id={panelId} className="problem-bubble__content" hidden={!expanded}>
                  <p>{problem.description}</p>
                </div>
              </article>
            )
          })}
        </SectionReveal>
      </div>
    </section>
  )
}
