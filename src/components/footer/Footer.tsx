import { ArrowUp, Mail, MapPin } from 'lucide-react'
import type { MouseEvent } from 'react'
import {
  navigation,
  type SectionId,
} from '../../data/navigation'
import { CONTACT_EMAIL, getEmailHref } from '../../lib/contact'
import { BrandLockup } from '../brand/BrandLockup'
import { SectionReveal } from '../ui/SectionReveal'

export function Footer({
  onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    section: SectionId,
  ) => {
    event.preventDefault()
    onNavigate(section)
  }

  return (
    <footer className="footer">
      <SectionReveal className="stage footer__grid">
        <div className="footer__brand">
          <BrandLockup
            inverse
            onClick={(event) => handleNavigation(event, 'inicio')}
          />
          <p>
            Páginas, sistemas e operação digital para empresas e
            profissionais.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Navegação do rodapé">
          <span>Navegação</span>
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavigation(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <span>Contato</span>
          <a href={getEmailHref()}>
            <Mail size={16} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <p>
            <MapPin size={16} aria-hidden="true" />
            Brasília, DF
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="stage footer__bottom">
        <p>© {new Date().getFullYear()} Barthy Web Studio</p>
        <p>Versão editorial experimental</p>
        <a
          href="#inicio"
          aria-label="Voltar ao início"
          onClick={(event) => handleNavigation(event, 'inicio')}
        >
          Voltar ao início
          <ArrowUp size={16} aria-hidden="true" />
        </a>
      </SectionReveal>
    </footer>
  )
}
