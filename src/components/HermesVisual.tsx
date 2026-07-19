import { Command, ListChecks, WalletCards } from 'lucide-react'

export function HermesVisual() {
  return (
    <div className="project-visual hermes-visual" aria-hidden="true">
      <div className="hermes-visual__top">
        <span className="visual-mark visual-mark--terra">H</span>
        <span>Command center</span>
        <Command size={16} />
      </div>
      <div className="hermes-visual__grid">
        <div className="hermes-panel hermes-panel--pipeline">
          <small>CRM</small>
          <div className="pipeline-columns">
            <span>
              <i />
              Entrada
            </span>
            <span>
              <i />
              Diagnóstico
            </span>
            <span>
              <i />
              Próxima ação
            </span>
          </div>
        </div>
        <div className="hermes-panel hermes-panel--metric">
          <WalletCards size={17} />
          <small>Financeiro</small>
          <strong>Visão organizada</strong>
        </div>
        <div className="hermes-panel hermes-panel--metric">
          <ListChecks size={17} />
          <small>Tarefas</small>
          <strong>Prioridades claras</strong>
        </div>
        <div className="hermes-terminal">
          <span>$ hermes status</span>
          <span className="terminal-line">crm: pronto para revisão</span>
          <span className="terminal-line">rotina: 3 próximas ações</span>
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    </div>
  )
}
