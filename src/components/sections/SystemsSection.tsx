import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  ContactRound,
  FileSpreadsheet,
  ListTodo,
  Settings2,
} from 'lucide-react'
import type { SectionId } from '../../data/navigation'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

const examples = [
  { label: 'Controle de orçamentos', icon: FileSpreadsheet },
  { label: 'Acompanhamento de serviços', icon: ClipboardCheck },
  { label: 'Gestão de clientes', icon: ContactRound },
  { label: 'Pedidos e próximas ações', icon: ListTodo },
  { label: 'Processos e regras internas', icon: Settings2 },
  { label: 'Dashboards', icon: BarChart3 },
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
              está em um trecho específico da operação: orçamento que some no
              WhatsApp, acompanhamento feito de memória, planilhas paralelas ou
              informação espalhada.
            </p>
            <p>
              A Barthy entende a regra, organiza o fluxo e constrói uma ferramenta
              do tamanho do problema.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal
          className="systems__examples"
          aria-label="Exemplos de processos que podem ser organizados"
        >
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <div key={example.label} className="systems__example">
                <Icon size={18} aria-hidden="true" />
                <span>{example.label}</span>
              </div>
            )
          })}
        </SectionReveal>

        <SectionReveal className="systems__paths">
          <article className="systems-path systems-path--products">
            <span>Soluções próprias</span>
            <h3>Produtos que nascem de problemas recorrentes</h3>
            <p>
              Além dos projetos sob medida, a Barthy desenvolve frentes próprias
              para dores que aparecem em diferentes negócios. Essas soluções
              evoluem internamente e só entram no portfólio comercial quando
              estiverem prontas para uso real.
            </p>
          </article>

          <article className="systems-path systems-path--custom">
            <span>Desenvolvimento sob medida</span>
            <h3>Software desenhado a partir da rotina da sua empresa</h3>
            <p>
              Mapeamos como o processo funciona hoje, o que precisa ser registrado,
              quem acompanha cada etapa e quais decisões o sistema deve facilitar.
              O resultado é uma ferramenta objetiva, sem transformar um problema
              específico em um ERP desnecessário.
            </p>
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

        <div className="systems__flow" aria-hidden="true">
          <span>Rotina observada</span>
          <ArrowRight size={18} />
          <span>Regra organizada</span>
          <ArrowRight size={18} />
          <strong>Ferramenta em uso</strong>
        </div>
      </div>
    </section>
  )
}
