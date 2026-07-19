export const CONTACT_EMAIL = 'contato.barthywebstudio@gmail.com'

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
