import { Mail, MessageCircle, Send } from 'lucide-react'
import { type MouseEvent } from 'react'
import {
  CONTACT_EMAIL,
  getEmailHref,
  getWhatsappUrl,
} from '../../lib/contact'
import { ContactForm } from '../contact/ContactForm'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'

export function ContactSection({
  onNavigateToForm,
}: {
  onNavigateToForm: () => void
}) {
  const whatsappUrl = getWhatsappUrl()

  return (
    <section
      id="contato"
      className="contact section-shell"
      aria-labelledby="contact-title"
    >
      <div className="stage">
        <SectionReveal className="contact__heading" data-section-anchor>
          <SectionBadge number="05">Contato</SectionBadge>
          <h2 id="contact-title">
            Tem um processo no seu negócio que poderia funcionar melhor?
          </h2>
        </SectionReveal>

        <SectionReveal
          className="contact__channels"
          aria-label="Canais de contato"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" />
            <span>
              <small>WhatsApp</small>
              Falar com a BWS
            </span>
            <Send size={16} aria-hidden="true" />
          </a>

          <a
            href="#formulario"
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault()
              onNavigateToForm()
            }}
          >
            <Send size={20} aria-hidden="true" />
            <span>
              <small>Formulário</small>
              Enviar briefing
            </span>
          </a>

          <a href={getEmailHref()}>
            <Mail size={20} aria-hidden="true" />
            <span>
              <small>E-mail</small>
              {CONTACT_EMAIL}
            </span>
            <Send size={16} aria-hidden="true" />
          </a>
        </SectionReveal>

        <SectionReveal
          id="formulario"
          className="contact__form"
          tabIndex={-1}
          aria-label="Briefing inicial"
        >
          <ContactForm />
        </SectionReveal>
      </div>
    </section>
  )
}
