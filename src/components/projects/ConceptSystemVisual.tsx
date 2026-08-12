import {
  BellRing,
  CalendarClock,
  CircleDollarSign,
  ContactRound,
  MoveRight,
  Radar,
} from 'lucide-react'

export function ConceptSystemVisual() {
  return (
    <div className="project-visual concept-system-visual" aria-hidden="true">
      <div className="concept-system-visual__grid" />
      <div className="concept-system-visual__glow" />

      <header className="concept-system-visual__header">
        <span>Sistema comercial</span>
        <strong>Conceito BWS</strong>
        <small>
          <Radar size={13} /> Fluxo acompanhado
        </small>
      </header>

      <div className="concept-system-visual__canvas">
        <div className="concept-system-visual__clients">
          <span>Carteira ativa</span>
          <strong>
            <ContactRound size={17} /> Clientes
          </strong>
          <div className="concept-system-visual__avatars">
            <i>AL</i>
            <i>NC</i>
            <i>MS</i>
          </div>
          <small>Oportunidades organizadas por contexto</small>
        </div>

        <div className="concept-system-visual__orbit">
          <svg viewBox="0 0 520 230" preserveAspectRatio="none">
            <path d="M 12 176 C 132 38, 310 28, 505 112" pathLength="1" />
            <circle cx="64" cy="127" r="5" />
            <circle cx="244" cy="54" r="5" />
            <circle cx="432" cy="83" r="5" />
          </svg>

          <span className="concept-system-visual__orbit-label concept-system-visual__orbit-label--lead">
            Oportunidade
          </span>
          <span className="concept-system-visual__orbit-label concept-system-visual__orbit-label--budget">
            Orçamento
          </span>
          <span className="concept-system-visual__orbit-label concept-system-visual__orbit-label--followup">
            Acompanhamento
          </span>

          <div className="concept-system-visual__focus">
            <span>
              <CircleDollarSign size={16} /> Orçamento
            </span>
            <strong>Em revisão</strong>
            <small>Status atualizado hoje</small>
          </div>

          <div className="concept-system-visual__next-action">
            <CalendarClock size={15} />
            <span>
              <small>Próxima ação</small>
              Retorno amanhã
            </span>
          </div>
        </div>

        <aside className="concept-system-visual__alert">
          <BellRing size={17} />
          <span>
            <small>Alerta</small>
            2 acompanhamentos hoje
          </span>
        </aside>
      </div>

      <footer className="concept-system-visual__pipeline">
        <span>Entrada</span>
        <MoveRight size={13} />
        <span>Oportunidade</span>
        <MoveRight size={13} />
        <span>Orçamento</span>
        <MoveRight size={13} />
        <strong>Próxima ação</strong>
      </footer>
    </div>
  )
}
