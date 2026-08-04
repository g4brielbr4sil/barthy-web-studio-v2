const hermesScreens = {
  dashboard: '/images/projects/hermes-dashboard-redacted.jpg',
  pipeline: '/images/projects/hermes-pipeline-redacted.jpg',
  revenue: '/images/projects/hermes-revenue-redacted.jpg',
} as const

function BrowserChrome() {
  return (
    <div className="hermes-mockup__chrome">
      <span />
      <span />
      <span />
      <i>hermes.local</i>
    </div>
  )
}

export function HermesVisual() {
  return (
    <div className="project-visual hermes-visual" aria-hidden="true">
      <div className="hermes-visual__glow" />

      <div className="hermes-visual__caption">
        <span>Hermes</span>
        <strong>Operação conectada</strong>
      </div>

      <figure className="hermes-mockup hermes-mockup--dashboard">
        <BrowserChrome />
        <img
          src={hermesScreens.dashboard}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="hermes-mockup hermes-mockup--pipeline">
        <BrowserChrome />
        <img
          src={hermesScreens.pipeline}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="hermes-mockup hermes-mockup--revenue">
        <BrowserChrome />
        <img
          src={hermesScreens.revenue}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  )
}
