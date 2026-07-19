import { Clock3, Mail, X } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type RefObject,
} from 'react'
import { navigation, type SectionId } from '../data/navigation'
import { CONTACT_EMAIL, getEmailHref } from '../lib/contact'
import { Brand } from './Brand'
import { TextRollButton } from './TextRollButton'
import { ThemeToggle } from './ThemeToggle'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  time: string
  triggerRef: RefObject<HTMLButtonElement | null>
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function MobileMenu({
  open,
  onClose,
  time,
  triggerRef,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef(true)
  const closeAndRestoreFocus = useCallback(() => {
    restoreFocusRef.current = false
    triggerRef.current?.focus({ preventScroll: true })
    onClose()
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus({ preventScroll: true })
    })
  }, [onClose, triggerRef])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const externalElements = [
      document.querySelector<HTMLElement>('.site-header'),
      document.querySelector<HTMLElement>('.skip-link'),
      document.querySelector<HTMLElement>('main'),
      document.querySelector<HTMLElement>('footer'),
    ].filter((element): element is HTMLElement => Boolean(element))
    const previousInert = externalElements.map(
      (element) => [element, element.inert] as const,
    )

    restoreFocusRef.current = true
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    externalElements.forEach((element) => {
      element.inert = true
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeAndRestoreFocus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      previousInert.forEach(([element, inert]) => {
        element.inert = inert
      })
      document.removeEventListener('keydown', onKeyDown)
      if (restoreFocusRef.current) {
        window.requestAnimationFrame(() => triggerRef.current?.focus())
      }
    }
  }, [closeAndRestoreFocus, open, triggerRef])

  if (!open) return null

  const closeForNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId,
  ) => {
    event.preventDefault()
    restoreFocusRef.current = false
    onClose()
    window.requestAnimationFrame(() => onNavigate(section))
  }

  return (
    <div className="mobile-menu" aria-hidden={!open}>
      <button
        className="mobile-menu__backdrop"
        type="button"
        aria-label="Fechar menu"
        onClick={closeAndRestoreFocus}
      />
      <div
        ref={panelRef}
        id="mobile-navigation"
        className="mobile-menu__sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        <div className="mobile-menu__top">
          <Brand
            onClick={(event) => closeForNavigation(event, 'inicio')}
          />
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            aria-label="Fechar menu"
            onClick={closeAndRestoreFocus}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegação mobile">
          <ul className="mobile-menu__links">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={
                    activeSection === item.id ? 'location' : undefined
                  }
                  onClick={(event) => closeForNavigation(event, item.id)}
                >
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <TextRollButton
          href="#contato"
          source="mobile-menu"
          variant="terra"
          className="mobile-menu__cta"
          onClick={(event) => closeForNavigation(event, 'contato')}
        >
          Falar sobre meu projeto
        </TextRollButton>

        <div className="mobile-menu__meta">
          <ThemeToggle showLabel />
          <span>
            <Clock3 size={16} aria-hidden="true" />
            {time} em Brasília
          </span>
          <a href={getEmailHref()}>
            <Mail size={16} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  )
}
