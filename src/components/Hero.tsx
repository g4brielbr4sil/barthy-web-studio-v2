import {
  Component,
  lazy,
  Suspense,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import { Blocks, MapPin } from 'lucide-react'
import { Header } from './Header'
import { TextRollButton } from './TextRollButton'
import { trackEvent } from '../lib/tracking'

const HeroShader = lazy(() => import('./HeroShader'))

class ShaderErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // O fallback visual da Hero já está renderizado fora deste boundary.
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__fallback" aria-hidden="true" />
      <div className="hero-shader" aria-hidden="true">
        <ShaderErrorBoundary>
          <Suspense fallback={null}>
            <HeroShader />
          </Suspense>
        </ShaderErrorBoundary>
      </div>
      <Header />

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
          >
            Começar um projeto
          </TextRollButton>

          <a
            className="hero-badge"
            href="#solucoes"
            data-cta-source="hero-badge"
            onClick={() =>
              trackEvent('cta_click', {
                source: 'hero-badge',
                destination: '#solucoes',
              })
            }
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
    </section>
  )
}
