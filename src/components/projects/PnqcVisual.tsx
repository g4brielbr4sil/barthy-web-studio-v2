const pnqcScreens = {
  catalog: {
    src: '/images/projects/pnqc-catalog.jpg',
    srcSet:
      '/images/projects/pnqc-catalog-480.jpg 480w, /images/projects/pnqc-catalog-960.jpg 960w, /images/projects/pnqc-catalog-1440.jpg 1440w, /images/projects/pnqc-catalog.jpg 1918w',
    width: 1918,
    height: 1079,
  },
  dashboard: {
    src: '/images/projects/pnqc-dashboard.jpg',
    srcSet:
      '/images/projects/pnqc-dashboard-480.jpg 480w, /images/projects/pnqc-dashboard-960.jpg 960w, /images/projects/pnqc-dashboard-1440.jpg 1440w, /images/projects/pnqc-dashboard.jpg 1919w',
    width: 1919,
    height: 1079,
  },
  course: {
    src: '/images/projects/pnqc-course.jpg',
    srcSet:
      '/images/projects/pnqc-course-480.jpg 480w, /images/projects/pnqc-course-960.jpg 960w, /images/projects/pnqc-course-1440.jpg 1440w, /images/projects/pnqc-course.jpg 1918w',
    width: 1918,
    height: 1079,
  },
} as const

const dashboardSizes =
  '(max-width: 520px) 88vw, (max-width: 1179px) 84vw, 620px'
const secondarySizes =
  '(max-width: 520px) 54vw, (max-width: 1179px) 49vw, 360px'

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
          {...pnqcScreens.dashboard}
          sizes={dashboardSizes}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="pnqc-mockup pnqc-mockup--catalog">
        <PnqcChrome />
        <img
          {...pnqcScreens.catalog}
          sizes={secondarySizes}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="pnqc-mockup pnqc-mockup--course">
        <PnqcChrome />
        <img
          {...pnqcScreens.course}
          sizes={secondarySizes}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  )
}
