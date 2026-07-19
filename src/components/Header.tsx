import { Menu, X } from 'lucide-react'
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { navigation, type SectionId } from '../data/navigation'
import { useBrasiliaTime } from '../hooks/useBrasiliaTime'
import { Brand } from './Brand'
import { MobileMenu } from './MobileMenu'
import { TextRollButton } from './TextRollButton'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const time = useBrasiliaTime()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height)
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${height}px`,
      )
    }

    updateHeaderHeight()

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        document.documentElement.style.removeProperty('--site-header-height')
      }
    }

    let animationFrame = 0
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateHeaderHeight)
    })
    observer.observe(header, { box: 'border-box' })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      document.documentElement.style.removeProperty('--site-header-height')
    }
  }, [])

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId,
  ) => {
    event.preventDefault()
    onNavigate(section)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header ${
          activeSection === 'inicio' ? '' : 'is-scrolled'
        }`}
      >
        <div className="stage">
          <div className="site-header__pill">
            <Brand onClick={(event) => handleNavigation(event, 'inicio')} />

            <nav className="desktop-nav" aria-label="Navegação principal">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={
                    activeSection === item.id ? 'location' : undefined
                  }
                  onClick={(event) => handleNavigation(event, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="site-header__actions">
              <ThemeToggle />
              <div className="availability" aria-label="Disponibilidade do estúdio">
                <span className="availability__dot" aria-hidden="true" />
                <span className="availability__status">
                  Agenda aberta para novos projetos
                </span>
                <time dateTime={time}>
                  {time}
                  <span> em Brasília</span>
                </time>
              </div>
              <TextRollButton
                href="#contato"
                source="header"
                className="header-cta"
                onClick={(event) => handleNavigation(event, 'contato')}
              >
                Falar sobre meu projeto
              </TextRollButton>
              <button
                ref={menuButtonRef}
                className="menu-button"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
                {menuOpen ? (
                  <X size={18} aria-hidden="true" />
                ) : (
                  <Menu size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        time={time}
        triggerRef={menuButtonRef}
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
    </>
  )
}
