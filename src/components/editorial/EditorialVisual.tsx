import { LayoutTemplate, Sparkles } from 'lucide-react'

interface EditorialVisualProps {
  size: 'small' | 'large'
}

const visualDescriptions: Record<EditorialVisualProps['size'], string> = {
  small: 'Detalhe editorial do processo criativo da Barthy Web Studio',
  large:
    'Composição editorial do estúdio e das experiências digitais da Barthy',
}

export function EditorialVisual({ size }: EditorialVisualProps) {
  return (
    <figure
      className={`editorial-visual editorial-visual--${size} editorial-visual--fallback`}
      role="img"
      aria-label={`${visualDescriptions[size]}. Imagem editorial em produção.`}
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
