interface EditorialVisualProps {
  size: 'small' | 'large'
}

const visualDescriptions: Record<EditorialVisualProps['size'], string> = {
  small:
    'Composição abstrata de uma interface adaptada para desktop, tablet e celular',
  large:
    'Quadro de direção visual com tipografia, cores, ritmo e componentes de interface',
}

function ResponsiveSystem() {
  return (
    <div className="responsive-system" aria-hidden="true">
      <div className="responsive-system__guide responsive-system__guide--start" />
      <div className="responsive-system__guide responsive-system__guide--end" />

      <div className="responsive-system__device responsive-system__device--desktop">
        <div className="responsive-system__bar">
          <span />
          <i />
          <i />
          <i />
        </div>
        <div className="responsive-system__layout">
          <strong>Clareza em cada escala.</strong>
          <span />
          <span />
          <div>
            <i />
            <i />
          </div>
        </div>
      </div>

      <div className="responsive-system__device responsive-system__device--tablet">
        <div className="responsive-system__bar">
          <span />
          <i />
        </div>
        <div className="responsive-system__layout">
          <strong>Ritmo</strong>
          <span />
          <span />
        </div>
      </div>

      <div className="responsive-system__device responsive-system__device--mobile">
        <div className="responsive-system__bar">
          <span />
          <i />
        </div>
        <div className="responsive-system__layout">
          <strong>Foco.</strong>
          <span />
          <span />
          <span className="responsive-system__action">Ação</span>
        </div>
      </div>

      <div className="responsive-system__scale">
        <span>360</span>
        <span>768</span>
        <span>1440</span>
      </div>
    </div>
  )
}

function VisualDirectionSystem() {
  return (
    <div className="visual-direction" aria-hidden="true">
      <div className="visual-direction__header">
        <span>01 / Sistema visual</span>
        <i>Barthy Web Studio</i>
      </div>

      <div className="visual-direction__type">
        <small>Forma + função</small>
        <strong>Aa</strong>
        <p>Digital com clareza, presença e direção.</p>
      </div>

      <div className="visual-direction__palette">
        <span data-color="navy">#0A1931</span>
        <span data-color="blue">#4A7FA7</span>
        <span data-color="terra">#CD765D</span>
        <span data-color="ice">#F6FAFD</span>
      </div>

      <div className="visual-direction__interface">
        <div className="visual-direction__nav">
          <b>BWS</b>
          <span />
          <span />
          <i />
        </div>
        <div className="visual-direction__hero">
          <span>02 / Composição</span>
          <strong>Uma presença que organiza e comunica.</strong>
          <div>
            <i />
            <i />
          </div>
        </div>
        <div className="visual-direction__cards">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="visual-direction__measure" />
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

      {size === 'small' ? <ResponsiveSystem /> : <VisualDirectionSystem />}

      <figcaption>
        {size === 'small' ? 'Escala responsiva' : 'Sistema visual aplicado'}
      </figcaption>
    </figure>
  )
}
