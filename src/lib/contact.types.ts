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
export interface ContactResponse {
  ok: boolean
  message?: string
}
