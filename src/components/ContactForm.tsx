import {
  AlertCircle,
  Check,
  Copy,
  LoaderCircle,
  Send,
} from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import {
  CONTACT_EMAIL,
  copyContactEmail,
  getContactEndpoint,
} from '../lib/contact'
import { trackEvent } from '../lib/tracking'

type FieldName =
  | 'nome'
  | 'whatsapp'
  | 'email'
  | 'empresaProjeto'
  | 'tipoSolucao'
  | 'mensagem'

type FieldErrors = Partial<Record<FieldName, string>>
type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured'

const serviceGroups = [
  {
    label: 'Presença digital',
    options: ['Landing page', 'Portfólio profissional', 'Página institucional'],
  },
  {
    label: 'Sistemas',
    options: ['CRM', 'Dashboard', 'Portal', 'Sistema sob medida'],
  },
  {
    label: 'Operação',
    options: ['Automação', 'Integração', 'Organização digital'],
  },
  {
    label: 'Outros',
    options: ['Ainda não sei qual solução preciso'],
  },
]

function validateForm(formData: FormData): FieldErrors {
  const errors: FieldErrors = {}
  const nome = String(formData.get('nome') ?? '').trim()
  const whatsapp = String(formData.get('whatsapp') ?? '').replace(/\D/g, '')
  const email = String(formData.get('email') ?? '').trim()
  const empresaProjeto = String(formData.get('empresaProjeto') ?? '').trim()
  const tipoSolucao = String(formData.get('tipoSolucao') ?? '').trim()
  const mensagem = String(formData.get('mensagem') ?? '').trim()

  if (nome.length < 2) {
    errors.nome = 'Informe seu nome com pelo menos 2 caracteres.'
  }

  const phoneWithoutCountry =
    whatsapp.length === 13 && whatsapp.startsWith('55')
      ? whatsapp.slice(2)
      : whatsapp
  if (!/^[1-9]{2}9\d{8}$/.test(phoneWithoutCountry)) {
    errors.whatsapp =
      'Informe um WhatsApp brasileiro com DDD, como (61) 99999-9999.'
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Informe um e-mail válido ou deixe o campo vazio.'
  }

  if (empresaProjeto.length < 2) {
    errors.empresaProjeto = 'Informe a empresa ou o nome do projeto.'
  }

  if (!tipoSolucao) {
    errors.tipoSolucao = 'Selecione o tipo de solução.'
  }

  if (mensagem.length < 20) {
    errors.mensagem =
      'Conte um pouco mais sobre o contexto, usando pelo menos 20 caracteres.'
  }

  return errors
}

function FieldError({
  id,
  message,
}: {
  id: string
  message?: string
}) {
  if (!message) return null

  return (
    <span id={id} className="field-error">
      <AlertCircle size={14} aria-hidden="true" />
      {message}
    </span>
  )
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const clearError = (field: FieldName) => {
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
    if (status !== 'loading' && status !== 'success') setStatus('idle')
  }

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const firstField = Object.keys(fieldErrors)[0] as FieldName | undefined
    if (!firstField) return
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
      ?.focus()
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading') return

    const form = event.currentTarget
    const formData = new FormData(form)
    const fieldErrors = validateForm(formData)

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      setStatus('error')
      setStatusMessage('Revise os campos indicados antes de enviar.')
      window.requestAnimationFrame(() => focusFirstError(fieldErrors))
      return
    }

    setErrors({})
    const endpoint = getContactEndpoint()
    if (!endpoint) {
      setStatus('unconfigured')
      setStatusMessage(
        `O envio online ainda não está configurado. Seus dados foram preservados. Envie a mensagem para ${CONTACT_EMAIL}.`,
      )
      return
    }

    const payload = {
      nome: String(formData.get('nome') ?? '').trim(),
      whatsapp: String(formData.get('whatsapp') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      empresaProjeto: String(formData.get('empresaProjeto') ?? '').trim(),
      tipoSolucao: String(formData.get('tipoSolucao') ?? '').trim(),
      mensagem: String(formData.get('mensagem') ?? '').trim(),
      source: 'barthy-web-studio-v2',
    }

    setStatus('loading')
    setStatusMessage('')
    trackEvent('cta_click', {
      source: 'contact-form',
      destination: 'configured-endpoint',
    })

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Contact endpoint returned a non-success response.')
      }

      setStatus('success')
      setStatusMessage(
        'Mensagem recebida. A Barthy entrará em contato pelos dados informados.',
      )
      form.reset()
    } catch {
      setStatus('error')
      setStatusMessage(
        `Não foi possível confirmar o envio. Seus dados foram preservados. Tente novamente ou escreva para ${CONTACT_EMAIL}.`,
      )
    }
  }

  const onCopyEmail = async () => {
    const success = await copyContactEmail()
    setCopied(success)
    if (success) window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="contact-form__intro">
        <span>Briefing inicial</span>
        <p>
          Preencha o essencial. Nenhum dado é enviado se o endpoint não estiver
          configurado.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={errors.nome ? 'nome-error' : undefined}
            onInput={() => clearError('nome')}
          />
          <FieldError id="nome-error" message={errors.nome} />
        </div>

        <div className="form-field">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(61) 99999-9999"
            maxLength={20}
            required
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
            onInput={() => clearError('whatsapp')}
          />
          <FieldError id="whatsapp-error" message={errors.whatsapp} />
        </div>

        <div className="form-field">
          <label htmlFor="email">
            E-mail <span>opcional</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onInput={() => clearError('email')}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div className="form-field">
          <label htmlFor="empresaProjeto">Empresa ou projeto</label>
          <input
            id="empresaProjeto"
            name="empresaProjeto"
            type="text"
            autoComplete="organization"
            maxLength={140}
            required
            aria-invalid={Boolean(errors.empresaProjeto)}
            aria-describedby={
              errors.empresaProjeto ? 'empresaProjeto-error' : undefined
            }
            onInput={() => clearError('empresaProjeto')}
          />
          <FieldError
            id="empresaProjeto-error"
            message={errors.empresaProjeto}
          />
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="tipoSolucao">Tipo de solução</label>
          <select
            id="tipoSolucao"
            name="tipoSolucao"
            defaultValue=""
            required
            aria-invalid={Boolean(errors.tipoSolucao)}
            aria-describedby={
              errors.tipoSolucao ? 'tipoSolucao-error' : undefined
            }
            onChange={() => clearError('tipoSolucao')}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {serviceGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <FieldError id="tipoSolucao-error" message={errors.tipoSolucao} />
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            maxLength={1800}
            required
            placeholder="Conte o que você precisa construir, organizar ou melhorar."
            aria-invalid={Boolean(errors.mensagem)}
            aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
            onInput={() => clearError('mensagem')}
          />
          <FieldError id="mensagem-error" message={errors.mensagem} />
        </div>
      </div>

      {status !== 'idle' && status !== 'loading' && (
        <div
          className={`form-status form-status--${status}`}
          role={status === 'success' ? 'status' : 'alert'}
          aria-live="polite"
        >
          {status === 'success' ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} aria-hidden="true" />
          )}
          <span>{statusMessage}</span>
          {status !== 'success' && (
            <button type="button" onClick={onCopyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'E-mail copiado' : 'Copiar e-mail'}
            </button>
          )}
        </div>
      )}

      <button
        className="form-submit"
        type="submit"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
        data-cta-source="contact-form"
      >
        <span>
          {status === 'loading' ? 'Enviando' : 'Enviar briefing inicial'}
        </span>
        {status === 'loading' ? (
          <LoaderCircle className="form-submit__loader" size={18} />
        ) : (
          <Send size={18} aria-hidden="true" />
        )}
      </button>
    </form>
  )
}
