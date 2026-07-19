import {
  Blocks,
  Home,
  Layers3,
  MessageCircle,
  Route,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { SectionId } from '../data/navigation'

interface MobileNavigationItem {
  id: SectionId
  label: string
  href: `#${SectionId}`
  icon: LucideIcon
}

const mobileNavigation: MobileNavigationItem[] = [
  { id: 'inicio', label: 'Início', href: '#inicio', icon: Home },
  { id: 'projetos', label: 'Projetos', href: '#projetos', icon: Layers3 },
  { id: 'solucoes', label: 'Soluções', href: '#solucoes', icon: Blocks },
  { id: 'processo', label: 'Processo', href: '#processo', icon: Route },
  {
    id: 'contato',
    label: 'Contato',
    href: '#contato',
    icon: MessageCircle,
  },
]

interface MobileBottomNavProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}

export function MobileBottomNav({
  activeSection,
  onNavigate,
}: MobileBottomNavProps) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const visualViewport = window.visualViewport
    let focusFrame = 0

    const updateKeyboardState = () => {
      const activeElement = document.activeElement
      const formControl =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement
      const viewportCompressed = visualViewport
        ? visualViewport.height < window.innerHeight * 0.78
        : false

      navRef.current?.toggleAttribute(
        'data-keyboard-open',
        formControl && viewportCompressed,
      )
    }

    const deferKeyboardCheck = () => {
      window.cancelAnimationFrame(focusFrame)
      focusFrame = window.requestAnimationFrame(updateKeyboardState)
    }

    visualViewport?.addEventListener('resize', updateKeyboardState)
    document.addEventListener('focusin', deferKeyboardCheck)
    document.addEventListener('focusout', deferKeyboardCheck)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      visualViewport?.removeEventListener('resize', updateKeyboardState)
      document.removeEventListener('focusin', deferKeyboardCheck)
      document.removeEventListener('focusout', deferKeyboardCheck)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="mobile-bottom-nav"
      aria-label="Navegação rápida"
    >
      <span className="mobile-bottom-nav__rail" aria-hidden="true" />
      {mobileNavigation.map((item) => {
        const Icon = item.icon
        const active = item.id === activeSection

        return (
          <a
            key={item.id}
            href={item.href}
            className={active ? 'is-active' : undefined}
            aria-label={item.label}
            aria-current={active ? 'location' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
            <span aria-hidden="true">{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
