const pnqcScreens = {
  catalog: '/images/projects/pnqc-catalog.jpg',
  dashboard: '/images/projects/pnqc-dashboard.jpg',
  course: '/images/projects/pnqc-course.jpg',
} as const

function PnqcChrome() {
  return (
    <div className="pnqc-mockup__chrome">
      <span />
      <span />
      <span />
      <i>pnqc.formacao</i>
    </div>
  )
}

export function PnqcVisual() {
  return (
    <div className="project-visual pnqc-visual" aria-hidden="true">
      <div className="pnqc-visual__glow" />

      <div className="pnqc-visual__caption">
        <span>PNQC</span>
        <strong>Formação em movimento</strong>
      </div>

      <figure className="pnqc-mockup pnqc-mockup--dashboard">
        <PnqcChrome />
        <img
          src={pnqcScreens.dashboard}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="pnqc-mockup pnqc-mockup--catalog">
        <PnqcChrome />
        <img
          src={pnqcScreens.catalog}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="pnqc-mockup pnqc-mockup--course">
        <PnqcChrome />
        <img
          src={pnqcScreens.course}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  )
}
