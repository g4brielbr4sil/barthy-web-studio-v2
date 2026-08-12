import type { MouseEvent } from 'react'
import type { SectionId } from '../../data/navigation'
import { TextRollButton } from '../ui/TextRollButton'

interface HeroContentProps {
  onNavigate: (section: SectionId) => void
}
export function HeroContent({ onNavigate }: HeroContentProps) {
  const navigate = (
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId,
  ) => {
    event.preventDefault()
    onNavigate(section)
  }

  return (
    <div className="stage hero__content">
      <div className="hero__copy">
        <p className="hero__label">Barthy Web Studio</p>
        <h1 id="hero-title" className="hero__title">
          <span>
            <span>Tecnologia para negócios</span>
          </span>
          <span>
            <span>venderem e operarem melhor.</span>
          </span>
        </h1>
        <p className="hero__description">
          Sites, sistemas e automações construídos para resolver problemas
          reais da operação.
        </p>
      </div>

      <div className="hero__bottom">
        <TextRollButton
          href="#contato"
          variant="terra"
          className="hero__cta"
          onClick={(event) => navigate(event, 'contato')}
        >
          Falar sobre meu negócio
        </TextRollButton>
      </div>
    </div>
  )
}
