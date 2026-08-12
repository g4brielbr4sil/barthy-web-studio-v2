import {
  BellRing,
  ClipboardCheck,
  ContactRound,
  FileSpreadsheet,
  LayoutDashboard,
  ListTodo,
} from 'lucide-react'

const pipeline = [
  {
    title: 'Novo contato',
    count: '04',
    card: 'Briefing recebido',
    meta: 'Próximo: entender contexto',
  },
  {
    title: 'Orçamento',
    count: '03',
    card: 'Proposta em análise',
    meta: 'Retorno programado',
  },
  {
    title: 'Em andamento',
    count: '02',
    card: 'Entrega em validação',
    meta: 'Próximo: revisão final',
  },
]

export function BwsFlowVisual() {
  return (
    <div className="project-visual bws-flow-visual" aria-hidden="true">
      <header className="bws-flow__topbar">
        <div className="bws-flow__brand">
          <span>BWS</span>
          <div>
            <strong>Operations</strong>
            <small>Interface conceitual</small>
          </div>
        </div>
        <span className="bws-flow__concept">Mockup conceitual</span>
      </header>

      <div className="bws-flow__shell">
        <aside className="bws-flow__rail">
          <span className="is-active"><LayoutDashboard size={17} /></span>
          <span><ContactRound size={17} /></span>
          <span><FileSpreadsheet size={17} /></span>
          <span><ClipboardCheck size={17} /></span>
          <span><ListTodo size={17} /></span>
        </aside>

        <div className="bws-flow__main">
          <div className="bws-flow__heading">
            <div>
              <span>Visão geral</span>
              <strong>Operação comercial</strong>
            </div>
            <span className="bws-flow__alert"><BellRing size={16} /></span>
          </div>

          <div className="bws-flow__metrics">
            <article>
              <span>Oportunidades</span>
              <strong>09</strong>
              <small>4 pedem atenção</small>
            </article>
            <article>
              <span>Orçamentos ativos</span>
              <strong>03</strong>
              <small>1 retorno hoje</small>
            </article>
            <article>
              <span>Próximos passos</span>
              <strong>05</strong>
              <small>organizados por prioridade</small>
            </article>
          </div>

          <div className="bws-flow__workspace">
            <section className="bws-flow__pipeline">
              <header>
                <strong>Pipeline leve</strong>
                <span>Acompanhamento</span>
              </header>
              <div>
                {pipeline.map((column) => (
                  <article key={column.title}>
                    <header>
                      <span>{column.title}</span>
                      <small>{column.count}</small>
                    </header>
                    <div>
                      <strong>{column.card}</strong>
                      <small>{column.meta}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="bws-flow__history">
              <header>
                <strong>Próximas ações</strong>
                <span>Hoje</span>
              </header>
              <ul>
                <li><span />Retomar orçamento</li>
                <li><span />Validar conteúdo</li>
                <li><span />Registrar decisão</li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
