import { Clock3, Menu, X } from 'lucide-react'
import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import type { SectionId } from '../../data/navigation'
import { useBrasiliaTime } from '../../hooks/useBrasiliaTime'
import { useHeaderHeight } from '../../hooks/useHeaderHeight'
import { BrandLockup } from '../brand/BrandLockup'
import { TextRollButton } from '../ui/TextRollButton'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  activeSection: SectionId
  isPastHero: boolean
  onNavigate: (section: SectionId) => void
}
export function Header({
  activeSection,
  isPastHero,
  onNavigate,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useHeaderHeight<HTMLElement>()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const time = useBrasiliaTime()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
        className={`site-header ${isPastHero ? 'is-scrolled' : ''}`}
      >
        <div className="stage">
          <div className="site-header__pill">
            <BrandLockup
              onClick={(event) => handleNavigation(event, 'inicio')}
            />

            <DesktopNavigation
              activeSection={activeSection}
              onNavigate={onNavigate}
            />

            <div className="site-header__actions">
              <div className="availability">
                <span className="availability__dot" aria-hidden="true" />
                <span className="availability__status">
                  Agenda aberta para novos projetos
                </span>
                <time
                  className="header-time"
                  data-clock-style="original"
                  dateTime={time}
                  aria-label={`${time} em Brasília`}
                >
                  <Clock3
                    className="header-time__icon--original"
                    size={14}
                    aria-hidden="true"
                  />
                  <span className="header-time__value" aria-hidden="true">
                    {time}
                  </span>
                  <span className="header-time__zone" aria-hidden="true">
                    {' '}em Brasília
                  </span>
                </time>
              </div>
              <ThemeToggle />
              <TextRollButton
                href="#contato"
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
