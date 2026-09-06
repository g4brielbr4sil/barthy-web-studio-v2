import {
  CalendarClock,
  CheckCircle2,
  Circle,
  MessageCircle,
  Receipt,
  Wrench,
} from 'lucide-react'

const statusSteps = [
  { label: 'Orçamento enviado', done: true },
  { label: 'Aguardando aprovação', done: true },
  { label: 'Em execução', done: true, current: true },
  { label: 'Pronto', done: false },
]

const historyEntries = [
  { label: 'Entrada', detail: '12/03 · 08h40' },
  { label: 'Diagnóstico', detail: '12/03 · 11h10' },
  { label: 'Serviço', detail: '13/03 · em andamento' },
  { label: 'Entrega prevista', detail: '14/03' },
]

export function ModularSystemPreview() {
  return (
    <figure className="system-preview" aria-labelledby="system-preview-caption">
      <figcaption
        id="system-preview-caption"
        className="system-preview__caption"
      >
        <span>Interface demonstrativa · dados fictícios</span>
        <strong>Painel de uma oficina usando o sistema modular</strong>
      </figcaption>

      <div className="system-preview__board">
        <div className="system-preview__client">
          <div className="system-preview__client-header">
            <span className="system-preview__avatar" aria-hidden="true">
              JF
            </span>
            <div>
              <strong>João Ferreira</strong>
              <small>Fiat Argo 1.8 · 2019 · Revisão + troca de óleo</small>
            </div>
          </div>

          <ol className="system-preview__status">
            {statusSteps.map((step) => (
              <li key={step.label} data-done={step.done} data-current={step.current}>
                {step.done ? (
                  <CheckCircle2 size={15} aria-hidden="true" />
                ) : (
                  <Circle size={15} aria-hidden="true" />
                )}
                <span>{step.label}</span>
              </li>
            ))}
          </ol>

          <div className="system-preview__next-action">
            <CalendarClock size={16} aria-hidden="true" />
            <span>
              <small>Próxima ação</small>
              Retornar cliente até sexta
            </span>
          </div>
        </div>

        <div className="system-preview__side">
          <div className="system-preview__whatsapp">
            <header>
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp contextual
            </header>
            <p className="system-preview__bubble system-preview__bubble--in">
              Qualquer novidade do meu carro?
            </p>
            <p className="system-preview__bubble system-preview__bubble--out">
              Orçamento aprovado, iniciamos o serviço hoje.
            </p>
          </div>

          <div className="system-preview__quote">
            <header>
              <Receipt size={15} aria-hidden="true" />
              Orçamento
            </header>
            <strong>R$ 480,00</strong>
            <small>3 itens · aprovado pelo cliente</small>
          </div>
        </div>

        <ol className="system-preview__history">
          {historyEntries.map((entry) => (
            <li key={entry.label}>
              <Wrench size={14} aria-hidden="true" />
              <div>
                <strong>{entry.label}</strong>
                <small>{entry.detail}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}
