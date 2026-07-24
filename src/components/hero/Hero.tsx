import type { SectionId } from '../../data/navigation'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'

interface HeroProps {
  onNavigate: (section: SectionId) => void
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <HeroContent onNavigate={onNavigate} />
    </section>
  )
}

