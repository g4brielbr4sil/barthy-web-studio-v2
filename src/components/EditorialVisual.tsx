import { LayoutTemplate, Sparkles } from 'lucide-react'
import { editorialImages } from '../data/projects'

interface EditorialVisualProps {
  size: 'small' | 'large'
}

export function EditorialVisual({ size }: EditorialVisualProps) {
  const image = editorialImages[size]

  if (image.enabled) {
    return (
      <figure className={`editorial-visual editorial-visual--${size}`}>
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </figure>
    )
  }

  return (
    <figure
      className={`editorial-visual editorial-visual--${size} editorial-visual--fallback`}
      role="img"
      aria-label={`${image.alt}. Imagem editorial em produção.`}
    >
      <div className="editorial-visual__orb" aria-hidden="true" />
      <div className="editorial-visual__window" aria-hidden="true">
        <div className="editorial-visual__window-top">
          <span />
          <span />
          <span />
        </div>
        <div className="editorial-visual__window-body">
          <div className="editorial-visual__line editorial-visual__line--strong" />
          <div className="editorial-visual__line" />
          <div className="editorial-visual__blocks">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      {size === 'large' && (
        <div className="editorial-visual__float" aria-hidden="true">
          <Sparkles size={18} />
          <span>Estratégia</span>
          <LayoutTemplate size={18} />
          <span>Experiência</span>
        </div>
      )}
      <figcaption>Imagem editorial em produção</figcaption>
    </figure>
  )
}
