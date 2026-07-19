import { Clock3, Mail, X } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'
import { navigation } from '../data/navigation'
import { CONTACT_EMAIL, getEmailHref } from '../lib/contact'
import { TextRollButton } from './TextRollButton'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  time: string
  triggerRef: RefObject<HTMLButtonElement | null>
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
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
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
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [onClose, open, triggerRef])

  if (!open) return null

  return (
    <div className="mobile-menu" aria-hidden={!open}>
      <button
        className="mobile-menu__backdrop"
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
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
          <span className="mobile-menu__eyebrow">Navegação</span>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegação mobile">
          <ul className="mobile-menu__links">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a href={item.href} onClick={onClose}>
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
          onClick={onClose}
        >
          Falar sobre meu projeto
        </TextRollButton>

        <div className="mobile-menu__meta">
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
