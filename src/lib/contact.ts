export const CONTACT_EMAIL = 'contato.barthywebstudio@gmail.com'

export type ContactFieldName =
  | 'nome'
  | 'whatsapp'
  | 'email'
  | 'empresaProjeto'
  | 'tipoSolucao'
  | 'mensagem'

export type ContactFieldErrors = Partial<
  Record<ContactFieldName, string>
>

export interface ContactPayload {
  nome: string
  whatsapp: string
  email: string
  empresaProjeto: string
  tipoSolucao: string
  mensagem: string
  source: 'barthy-web-studio-v2'
}

/**
 * Schema aceito pelo endpoint público do Hermes (POST /api/public/barthy/leads).
 * Usa `extra="forbid"` no backend: qualquer campo fora desta lista rejeita a
 * requisição inteira, então nomes em português (nome/whatsapp/empresaProjeto/
 * tipoSolucao/mensagem) nunca podem ser enviados diretamente.
 */
export interface HermesLeadPayload {
  name: string
  phone: string
  email?: string
  company: string
  service: string
  message: string
  source: string
  honeypot: string
}

export function buildHermesLeadPayload(
  values: Omit<ContactPayload, 'source'>,
): HermesLeadPayload {
  const digits = values.whatsapp.replace(/\D/g, '')
  const phone =
    digits.length === 11 ? `+55${digits}` : digits ? `+${digits}` : ''

  const payload: HermesLeadPayload = {
    name: values.nome,
    phone,
    company: values.empresaProjeto,
    service: values.tipoSolucao,
    message: values.mensagem,
    source: 'barthy-web-studio-v2',
    honeypot: '',
  }

  if (values.email) payload.email = values.email

  return payload
}

function safeHttpUrl(value: string | undefined): string {
  const candidate = value?.trim()
  if (!candidate) return ''

  try {
    const parsed = new URL(candidate)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
      ? parsed.toString()
      : ''
  } catch {
    return ''
  }
}

export function getWhatsappUrl(): string {
  return safeHttpUrl(import.meta.env.VITE_BARTHY_WHATSAPP_URL)
}

export function getContactEndpoint(): string {
  return safeHttpUrl(import.meta.env.VITE_BARTHY_CONTACT_ENDPOINT)
}

export function getEmailHref(subject = 'Novo projeto com a Barthy'): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

export async function copyContactEmail(): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      return true
    }

    const field = document.createElement('textarea')
    field.value = CONTACT_EMAIL
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const copied = document.execCommand('copy')
    field.remove()
    return copied
  } catch {
    return false
  }
}
