import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { SectionId } from '../../data/navigation'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

const operationalProblems = [
  'Orçamentos se perdem nas conversas.',
  'O retorno depende da memória.',
  'O histórico fica espalhado.',
  'A equipe não enxerga o próximo passo.',
]

export function SystemsSection({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  return (
    <section
      id="sistemas"
      className="systems section-shell"
      aria-labelledby="systems-title"
    >
      <div className="stage">
        <SectionReveal className="systems__heading" data-section-anchor>
          <SectionBadge number="02">BWS Sistemas</SectionBadge>
          <h2 id="systems-title">Sistemas para a rotina real do negócio</h2>
          <p>
            Software sob medida para organizar o trecho da operação que hoje
            depende de memória, planilha, papel ou WhatsApp.
          </p>
        </SectionReveal>

        <SectionReveal className="systems__story">
          <article className="systems-story__problem">
            <span>Problema real</span>
            <h3>Quando a informação fica solta, o trabalho perde ritmo.</h3>
            <ul>
              {operationalProblems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </article>

          <ArrowRight
            className="systems-story__arrow"
            size={24}
            aria-hidden="true"
          />

          <article className="systems-story__answer">
            <span>BWS Sistemas</span>
            <h3>
              Transformamos esse fluxo em uma ferramenta simples e própria.
            </h3>
            <p>
              A regra do negócio vira status, responsáveis, histórico e próxima
              ação em uma interface que a equipe consegue usar.
            </p>
          </article>

        </SectionReveal>

        <SectionReveal className="systems__closing">
          <div>
            <span>Desenvolvimento sob medida</span>
            <h3>Começamos pela parte da operação que mais precisa melhorar.</h3>
            <p>
              Mapeamos o processo, definimos o essencial e construímos uma base
              que pode evoluir junto com o negócio.
            </p>
          </div>
          <TextRollButton
            href="#contato"
            variant="outline"
            onClick={(event) => {
              event.preventDefault()
              onNavigate('contato')
            }}
          >
            Falar sobre meu negócio
          </TextRollButton>
          <CheckCircle2 size={20} aria-hidden="true" />
        </SectionReveal>
      </div>
    </section>
  )
}
