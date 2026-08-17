import {
  BarChart3,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  ContactRound,
  FileSpreadsheet,
  Inbox,
  ListChecks,
  ListTodo,
  Settings2,
  Workflow,
} from 'lucide-react'
import { useState } from 'react'
import type { SectionId } from '../../data/navigation'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'
import { TextRollButton } from '../ui/TextRollButton'

const systemExamples = [
  {
    id: 'orcamentos',
    label: 'Controle de orçamentos',
    icon: FileSpreadsheet,
    description:
      'Centraliza pedidos, valores, aprovações e retornos para nenhum orçamento depender da memória ou ficar perdido em uma conversa.',
    outcome: 'Cada oportunidade fica com status, histórico e próxima ação visíveis.',
    flow: ['Pedido recebido', 'Orçamento organizado', 'Retorno acompanhado'],
  },
  {
    id: 'servicos',
    label: 'Acompanhamento de serviços',
    icon: ClipboardCheck,
    description:
      'Mostra o que entrou, o que está em execução e o que precisa de validação antes da entrega.',
    outcome: 'A operação enxerga gargalos e mantém o cliente informado.',
    flow: ['Serviço aberto', 'Etapa registrada', 'Entrega acompanhada'],
  },
  {
    id: 'clientes',
    label: 'Gestão de clientes',
    icon: ContactRound,
    description:
      'Reúne contatos, demandas, histórico e contexto comercial numa visão fácil de consultar.',
    outcome: 'A equipe retoma cada conversa sabendo o que já aconteceu.',
    flow: ['Contato cadastrado', 'Histórico reunido', 'Relacionamento ativo'],
  },
  {
    id: 'acoes',
    label: 'Pedidos e próximas ações',
    icon: ListTodo,
    description:
      'Transforma solicitações dispersas em responsabilidades, prazos e prioridades claras.',
    outcome: 'O próximo passo deixa de ser implícito e passa a ser acompanhável.',
    flow: ['Pedido registrado', 'Responsável definido', 'Ação concluída'],
  },
  {
    id: 'processos',
    label: 'Processos internos',
    icon: Settings2,
    description:
      'Organiza rotinas específicas sem impor um sistema maior e mais complexo do que o negócio precisa.',
    outcome: 'A regra real da empresa vira um fluxo simples de executar.',
    flow: ['Rotina observada', 'Regra definida', 'Fluxo em uso'],
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: BarChart3,
    description:
      'Consolida os sinais que ajudam a acompanhar a operação e decidir onde agir primeiro.',
    outcome: 'Informações importantes deixam de ficar escondidas em planilhas paralelas.',
    flow: ['Dados reunidos', 'Visão organizada', 'Decisão facilitada'],
  },
  {
    id: 'automacoes',
    label: 'Automações',
    icon: Workflow,
    description:
      'Conecta eventos, tarefas e avisos para reduzir repetição sem tirar o controle da equipe.',
    outcome: 'O trabalho manual diminui e as exceções continuam visíveis.',
    flow: ['Evento identificado', 'Regra executada', 'Equipe avisada'],
  },
]

const mobileUseCases = [
  'Orçamentos e aprovações',
  'Clientes e serviços',
  'Próximas ações e alertas',
  'Dashboards e automações',
]

export function SystemsSection({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const [activeExampleIndex, setActiveExampleIndex] = useState(0)
  const activeExample = systemExamples[activeExampleIndex] ?? systemExamples[0]

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

        <SectionReveal className="systems__showcase">
          <div
            className="systems__selector"
            role="group"
            aria-label="Exemplos de processos que podem ser organizados"
          >
            {systemExamples.map((example, index) => {
              const Icon = example.icon
              const selected = activeExampleIndex === index

              return (
                <button
                  key={example.id}
                  type="button"
                  aria-pressed={selected}
                  data-selected={selected}
                  onClick={() => setActiveExampleIndex(index)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{example.label}</span>
                </button>
              )
            })}
          </div>

          <article className="systems-demo" aria-live="polite">
            <header>
              <span>Fluxo em destaque</span>
              <h3>{activeExample.label}</h3>
              <p>{activeExample.description}</p>
            </header>
            <ol className="systems-demo__flow">
              {activeExample.flow.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <p className="systems-demo__outcome">
              <CheckCircle2 size={19} aria-hidden="true" />
              {activeExample.outcome}
            </p>
          </article>
        </SectionReveal>

        <SectionReveal className="systems__mobile-story">
          <article>
            <span>O que resolve</span>
            <h3>Menos informação solta. Mais clareza para agir.</h3>
            <p>
              A ferramenta reúne o que chega, aplica a regra do processo e mostra
              o próximo passo sem transformar a rotina em um sistema pesado.
            </p>
          </article>

          <div className="systems__mobile-uses">
            <span>Exemplos de uso</span>
            <ul>
              {mobileUseCases.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <ol className="systems__mobile-flow" aria-label="Fluxo simplificado do sistema">
            <li>
              <Inbox size={18} aria-hidden="true" />
              <span>Entrada</span>
              <strong>Pedido ou informação</strong>
            </li>
            <li>
              <ListChecks size={18} aria-hidden="true" />
              <span>Organização</span>
              <strong>Status e responsável</strong>
            </li>
            <li>
              <BellRing size={18} aria-hidden="true" />
              <span>Ação</span>
              <strong>Próximo passo visível</strong>
            </li>
          </ol>
        </SectionReveal>

        <SectionReveal className="systems__paths">
          <article className="systems-path systems-path--products">
            <span>Soluções próprias</span>
            <h3>Produtos que nascem de problemas recorrentes</h3>
            <p>
              A Barthy também transforma padrões de operação em conceitos e
              produtos próprios. Cada frente só entra no portfólio comercial
              quando estiver pronta para uso real.
            </p>
          </article>

          <article className="systems-path systems-path--custom">
            <span>Desenvolvimento sob medida</span>
            <h3>Software desenhado a partir da rotina da sua empresa</h3>
            <p>
              Mapeamos o processo, o que precisa ser registrado e quais decisões
              a ferramenta deve facilitar, sem criar um ERP desnecessário.
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
      </div>
    </section>
  )
}
