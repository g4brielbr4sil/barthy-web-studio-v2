import type { SectionId } from '../../data/navigation'
import { useInView } from '../../hooks/useInView'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'

interface HeroProps {
  onNavigate: (section: SectionId) => void
}
export function Hero({ onNavigate }: HeroProps) {
  const { ref, isInView } = useInView<HTMLElement>({
    rootMargin: '180px 0px',
    threshold: 0,
  })

  return (
    <section
      ref={ref}
      id="inicio"
      className="hero"
      data-active={isInView}
      aria-labelledby="hero-title"
    >
      <HeroBackground active={isInView} />
      <HeroContent onNavigate={onNavigate} />
    </section>
  )
}
