import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  ContactRound,
  FileSpreadsheet,
  ListTodo,
  Settings2,
  Workflow,
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
  { label: 'Processos internos', icon: Settings2 },
  { label: 'Dashboards', icon: BarChart3 },
  { label: 'Automações', icon: Workflow },
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
          <SectionBadge number="03">BWS Systems</SectionBadge>
          <h2 id="systems-title">Software feito para o trabalho real</h2>
          <div className="systems__intro">
            <p>
              Nem todo negócio precisa de um ERP gigante. Às vezes o problema
              está em um processo específico que ainda depende de planilha,
              caderno, memória ou dezenas de conversas no WhatsApp.
            </p>
            <p>
              A Barthy transforma esses processos em ferramentas simples e úteis.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="systems__examples" aria-label="Exemplos de processos que podem ser organizados">
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
            <span>Produtos Barthy</span>
            <h3>Hipóteses próprias em validação</h3>
            <p>
              A Barthy estuda produtos para problemas recorrentes. Barthy Flow é
              uma tese em validação para negócios que vendem por orçamento e
              WhatsApp. Não está disponível para contratação nesta fase.
            </p>
          </article>

          <article className="systems-path systems-path--custom">
            <span>Soluções desenvolvidas sob medida</span>
            <h3>Uma ferramenta para o processo específico da sua empresa</h3>
            <p>
              O trabalho parte da rotina atual para organizar dados, regras e
              acompanhamento sem empurrar uma plataforma maior do que o problema.
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
          <span>Processo atual</span>
          <ArrowRight size={18} />
          <span>Regra entendida</span>
          <ArrowRight size={18} />
          <strong>Ferramenta útil</strong>
        </div>
      </div>
    </section>
  )
}
