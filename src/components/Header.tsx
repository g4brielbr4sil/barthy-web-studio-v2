import { Menu, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { navigation } from '../data/navigation'
import { useBrasiliaTime } from '../hooks/useBrasiliaTime'
import { Brand } from './Brand'
import { MobileMenu } from './MobileMenu'
import { TextRollButton } from './TextRollButton'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const time = useBrasiliaTime()
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header className="site-header">
        <div className="stage">
          <div className="site-header__pill">
            <Brand />

            <nav className="desktop-nav" aria-label="Navegação principal">
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
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
      />
    </>
  )
}
