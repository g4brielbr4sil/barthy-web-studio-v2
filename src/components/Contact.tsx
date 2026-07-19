import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import {
  CONTACT_EMAIL,
  copyContactEmail,
  getEmailHref,
  getWhatsappUrl,
} from '../lib/contact'
import { trackEvent } from '../lib/tracking'
import { ContactForm } from './ContactForm'
import { SectionReveal } from './SectionReveal'

export function Contact() {
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
        <SectionReveal className="contact__heading">
          <p className="eyebrow">Próximo passo</p>
          <h2 id="contact-title">
            Seu próximo projeto pode começar com uma conversa clara.
          </h2>
          <p>
            Conte o que você precisa construir, organizar ou melhorar. A Barthy
            analisa o contexto e indica o próximo passo.
          </p>
        </SectionReveal>

        <div className="contact__channels" aria-label="Canais de contato">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-cta-source="contact-whatsapp"
              onClick={() =>
                trackEvent('cta_click', {
                  source: 'contact-whatsapp',
                  destination: 'whatsapp',
                })
              }
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
              data-cta-source="contact-whatsapp"
              onClick={() => {
                setWhatsappMessage(
                  `O WhatsApp ainda não está configurado nesta V2. Use ${CONTACT_EMAIL}.`,
                )
                trackEvent('cta_click', {
                  source: 'contact-whatsapp',
                  destination: 'unconfigured',
                })
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

          <a href="#formulario" data-cta-source="contact-form">
            <Send size={20} aria-hidden="true" />
            <span>
              <small>Formulário</small>
              Enviar briefing
            </span>
          </a>

          <a
            href={getEmailHref()}
            data-cta-source="contact-email"
            onClick={() =>
              trackEvent('cta_click', {
                source: 'contact-email',
                destination: 'email',
              })
            }
          >
            <Mail size={20} aria-hidden="true" />
            <span>
              <small>E-mail</small>
              {CONTACT_EMAIL}
            </span>
            <Send size={16} aria-hidden="true" />
          </a>
        </div>

        {whatsappMessage && (
          <div className="contact__notice" role="status" aria-live="polite">
            <span>{whatsappMessage}</span>
            <button type="button" onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'E-mail copiado' : 'Copiar e-mail'}
            </button>
          </div>
        )}

        <div id="formulario" className="contact__form">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
