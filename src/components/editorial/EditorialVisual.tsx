interface EditorialVisualProps {
  size: 'small' | 'large'
}

const studioScreens = {
  hero: '/images/studio/barthy-hero.jpg',
  process: '/images/studio/barthy-process-mobile.jpg',
  solutions: '/images/studio/barthy-solutions.jpg',
} as const

const visualDescriptions: Record<EditorialVisualProps['size'], string> = {
  small: 'Processo responsivo da Barthy Web Studio em um mockup mobile',
  large: 'Direção visual da Barthy Web Studio em uma composição de desktop',
}

function StudioChrome() {
  return (
    <div className="studio-screen__chrome" aria-hidden="true">
      <span />
      <span />
      <span />
      <i>barthy.web.studio</i>
    </div>
  )
}

export function EditorialVisual({ size }: EditorialVisualProps) {
  return (
    <figure
      className={`editorial-visual editorial-visual--${size}`}
      role="img"
      aria-label={visualDescriptions[size]}
    >
      <div className="editorial-visual__glow" aria-hidden="true" />

      {size === 'small' ? (
        <div className="studio-phone" aria-hidden="true">
          <div className="studio-phone__speaker" />
          <img
            src={studioScreens.process}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="studio-composition" aria-hidden="true">
          <div className="studio-screen studio-screen--hero">
            <StudioChrome />
            <img
              src={studioScreens.hero}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="studio-screen studio-screen--solutions">
            <StudioChrome />
            <img
              src={studioScreens.solutions}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      <figcaption>
        {size === 'small' ? 'Produto responsivo' : 'Direção visual aplicada'}
      </figcaption>
    </figure>
  )
}
