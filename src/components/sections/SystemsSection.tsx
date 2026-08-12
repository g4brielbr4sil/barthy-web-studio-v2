import type { SectionId } from '../../data/navigation'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

const examples = [
  {
    title: 'Clientes e oportunidades',
    description: 'Uma visão clara de quem precisa de retorno e do que vem depois.',
  },
  {
    title: 'Orçamentos e decisões',
    description: 'Propostas, status e histórico sem depender da memória ou do WhatsApp.',
  },
  {
    title: 'Serviços em andamento',
    description: 'Responsáveis, prazos e próximos passos reunidos no mesmo fluxo.',
  },
  {
    title: 'Indicadores e automações',
    description: 'Informação útil para acompanhar a operação e reduzir tarefas repetidas.',
  },
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
          <SectionBadge number="02">BWS Systems</SectionBadge>
          <h2 id="systems-title">Software feito para o trabalho real</h2>
          <div className="systems__intro">
            <p>
              Nem todo negócio precisa de um ERP enorme. Muitas vezes, o gargalo
              está em um trecho específico da operação: um orçamento sem retorno,
              uma planilha paralela ou uma etapa que ninguém consegue acompanhar.
            </p>
            <p>
              A Barthy entende a regra, organiza o fluxo e constrói uma ferramenta
              objetiva, do tamanho do problema.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="systems__body">
          <ol
            className="systems__examples"
            aria-label="Processos que podem ser organizados"
          >
            {examples.map((example, index) => (
              <li key={example.title} className="systems__example">
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <article className="systems__approach">
            <span>Da rotina ao sistema</span>
            <h3>Uma ferramenta útil começa antes da interface.</h3>
            <p>
              Mapeamos o que precisa ser registrado, quem acompanha cada etapa e
              quais decisões o sistema deve facilitar. Assim, a tecnologia nasce
              com foco e pode evoluir junto com a operação.
            </p>
            <ol className="systems__flow" aria-label="Fluxo de construção do sistema">
              <li>Rotina observada</li>
              <li>Regra organizada</li>
              <li>Ferramenta útil</li>
            </ol>
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
          </article>
        </SectionReveal>
      </div>
    </section>
  )
}
