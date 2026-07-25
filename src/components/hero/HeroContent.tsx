import { Blocks, MapPin } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { SectionId } from '../../data/navigation'
import { trackEvent } from '../../lib/tracking'
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
            <span>Criamos experiências digitais</span>
          </span>
          <span>
            <span>para marcas prontas para dominar</span>
          </span>
          <span>
            <span>sua categoria online.</span>
          </span>
        </h1>
      </div>

      <div className="hero__bottom">
        <TextRollButton
          href="#contato"
          source="hero-primary"
          variant="terra"
          className="hero__cta"
          onClick={(event) => navigate(event, 'contato')}
        >
          Começar um projeto
        </TextRollButton>

        <a
          className="hero-badge"
          href="#solucoes"
          data-cta-source="hero-badge"
          onClick={(event) => {
            trackEvent('cta_click', {
              source: 'hero-badge',
              destination: '#solucoes',
            })
            navigate(event, 'solucoes')
          }}
        >
          <span className="hero-badge__icon" aria-hidden="true">
            <Blocks size={18} />
          </span>
          <span>Presença, sistemas e operação digital</span>
          <span className="hero-badge__place">
            <MapPin size={13} aria-hidden="true" />
            Brasília
          </span>
        </a>
      </div>
    </div>
  )
}
