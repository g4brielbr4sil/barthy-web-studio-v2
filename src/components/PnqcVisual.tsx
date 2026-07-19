import { Award, BookOpenCheck, ShieldCheck } from 'lucide-react'

export function PnqcVisual() {
  return (
    <div className="project-visual pnqc-visual" aria-hidden="true">
      <div className="visual-toolbar">
        <span>Trilha de formação</span>
        <span>72%</span>
      </div>
      <div className="pnqc-visual__progress">
        <span />
      </div>
      <div className="pnqc-visual__layout">
        <div className="pnqc-visual__modules">
          <div className="module-row module-row--complete">
            <span>01</span>
            <div>
              <strong>Fundamentos</strong>
              <small>Concluído</small>
            </div>
            <BookOpenCheck size={17} />
          </div>
          <div className="module-row module-row--active">
            <span>02</span>
            <div>
              <strong>Prática profissional</strong>
              <small>Em andamento</small>
            </div>
            <ShieldCheck size={17} />
          </div>
          <div className="module-row">
            <span>03</span>
            <div>
              <strong>Avaliação final</strong>
              <small>Próxima etapa</small>
            </div>
            <Award size={17} />
          </div>
        </div>
        <div className="pnqc-visual__certificate">
          <span className="certificate-seal">
            <Award size={22} />
          </span>
          <small>Certificação</small>
          <strong>Verificável</strong>
          <span className="certificate-code">PNQC • 2026</span>
        </div>
      </div>
    </div>
  )
}
