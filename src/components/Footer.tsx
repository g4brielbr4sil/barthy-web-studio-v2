import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { navigation } from '../data/navigation'
import { CONTACT_EMAIL, getEmailHref } from '../lib/contact'
import { trackEvent } from '../lib/tracking'
import { Brand } from './Brand'

export function Footer() {
  return (
    <footer className="footer">
      <div className="stage footer__grid">
        <div className="footer__brand">
          <Brand inverse />
          <p>
            Páginas, sistemas e operação digital para empresas e
            profissionais.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Navegação do rodapé">
          <span>Navegação</span>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <span>Contato</span>
          <a
            href={getEmailHref()}
            data-cta-source="footer"
            onClick={() =>
              trackEvent('cta_click', {
                source: 'footer',
                destination: 'email',
              })
            }
          >
            <Mail size={16} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <p>
            <MapPin size={16} aria-hidden="true" />
            Brasília, DF
          </p>
        </div>
      </div>

      <div className="stage footer__bottom">
        <p>© {new Date().getFullYear()} Barthy Web Studio</p>
        <p>Versão editorial experimental</p>
        <a href="#inicio" aria-label="Voltar ao início">
          Voltar ao início
          <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
