import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  Wrench,
} from 'lucide-react'

const boardColumns = [
  {
    label: 'Diagnóstico',
    card: 'Revisão inicial',
    meta: 'Entrada registrada',
  },
  {
    label: 'Orçamento',
    card: 'Aguardando aprovação',
    meta: 'Retorno programado',
  },
  {
    label: 'Execução',
    card: 'Serviço em andamento',
    meta: 'Etapa acompanhada',
  },
]

export function StudioConceptVisual() {
  return (
    <div className="project-visual workshop-visual" aria-hidden="true">
      <div className="workshop-visual__topbar">
        <span className="workshop-visual__mark">BWS</span>
        <div>
          <strong>Operação de serviços</strong>
          <small>Interface demonstrativa</small>
        </div>
        <span className="workshop-visual__concept">Conceito</span>
      </div>

      <div className="workshop-app">
        <aside className="workshop-app__rail">
          <span className="is-active"><ClipboardList size={16} /></span>
          <span><FileSpreadsheet size={16} /></span>
          <span><CalendarClock size={16} /></span>
          <span><Wrench size={16} /></span>
        </aside>

        <main className="workshop-dashboard">
          <header className="workshop-dashboard__heading">
            <div>
              <small>Visão geral</small>
              <strong>Serviços em andamento</strong>
            </div>
            <span>Hoje</span>
          </header>

          <div className="workshop-dashboard__signals">
            <div>
              <FileSpreadsheet size={17} />
              <span>Novos pedidos</span>
            </div>
            <div>
              <CheckCircle2 size={17} />
              <span>Aprovações</span>
            </div>
            <div>
              <BellRing size={17} />
              <span>Próximas ações</span>
            </div>
          </div>

          <section className="workshop-board">
            <header>
              <span>Fluxo operacional</span>
              <small>Do pedido ao acompanhamento</small>
            </header>
            <div className="workshop-board__columns">
              {boardColumns.map((column, index) => (
                <div key={column.label} className="workshop-board__column">
                  <span>
                    <i />
                    {column.label}
                  </span>
                  <article>
                    <small>OS {String(index + 24).padStart(3, '0')}</small>
                    <strong>{column.card}</strong>
                    <p>{column.meta}</p>
                  </article>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="workshop-actions">
          <span>Próximas ações</span>
          <strong>Retornos que pedem atenção</strong>
          <ul>
            <li><i /> Confirmar aprovação</li>
            <li><i /> Atualizar etapa</li>
            <li><i /> Registrar entrega</li>
          </ul>
          <div>
            <CalendarClock size={18} />
            <span>Histórico preservado</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
