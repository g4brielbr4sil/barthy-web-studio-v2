import { CalendarDays, FileCheck2, Network, UsersRound } from 'lucide-react'

export function LevensVisual() {
  return (
    <div className="project-visual levens-visual" aria-hidden="true">
      <div className="levens-visual__rail">
        <span className="visual-mark">L</span>
        <span />
        <span />
        <span />
      </div>
      <div className="levens-visual__main">
        <div className="visual-toolbar">
          <span>Operação Levens</span>
          <span className="visual-status">Conectado</span>
        </div>
        <div className="levens-visual__metrics">
          <div>
            <UsersRound size={18} />
            <span>Perfis</span>
          </div>
          <div>
            <FileCheck2 size={18} />
            <span>Documentos</span>
          </div>
          <div>
            <CalendarDays size={18} />
            <span>Escalas</span>
          </div>
        </div>
        <div className="levens-visual__flow">
          <div className="flow-node">
            <span>Entrada</span>
            <strong>Cadastro</strong>
          </div>
          <span className="flow-line" />
          <div className="flow-node flow-node--accent">
            <span>Validação</span>
            <strong>Operação</strong>
          </div>
          <span className="flow-line" />
          <div className="flow-node">
            <span>Acompanhamento</span>
            <strong>Gestão</strong>
          </div>
        </div>
      </div>
      <div className="levens-visual__integration">
        <Network size={20} />
        <span>Integrações</span>
      </div>
    </div>
  )
}
