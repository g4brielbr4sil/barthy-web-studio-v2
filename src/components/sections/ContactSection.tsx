import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import {
  CONTACT_EMAIL,
  copyContactEmail,
  getEmailHref,
  getWhatsappUrl,
} from '../../lib/contact'
import { ContactForm } from '../contact/ContactForm'
import { SectionBadge } from '../ui/SectionBadge'
import { SectionReveal } from '../ui/SectionReveal'

export function ContactSection() {
  const whatsappUrl = getWhatsappUrl()
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    const success = await copyContactEmail()
    setCopied(success)
    if (success) window.setTimeout(() => setCopied(false), 2200)
  }

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
          <p>
            Descreva o processo que mais precisa de clareza. Com esse contexto,
            identificamos onde um site, sistema ou automação pode ajudar e qual
            é o próximo passo mais útil.
          </p>
        </SectionReveal>

        <SectionReveal
          className="contact__channels"
          aria-label="Canais de contato"
        >
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span>
                <small>WhatsApp</small>
                Abrir conversa
              </span>
              <Send size={16} aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                setWhatsappMessage(
                  `O atendimento pelo WhatsApp ainda não está disponível. Use ${CONTACT_EMAIL}.`,
                )
              }}
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span>
                <small>WhatsApp</small>
                Consultar disponibilidade
              </span>
              <Send size={16} aria-hidden="true" />
            </button>
          )}

          <a href="#formulario">
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

        {whatsappMessage && (
          <div className="contact__notice" role="status" aria-live="polite">
            <span>{whatsappMessage}</span>
            <button type="button" onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'E-mail copiado' : 'Copiar e-mail'}
            </button>
          </div>
        )}

        <SectionReveal id="formulario" className="contact__form">
          <ContactForm />
        </SectionReveal>
      </div>
    </section>
  )
}
