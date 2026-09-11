/**
 * Contrato do formulário de contato contra o endpoint público do Hermes
 * (POST /api/public/barthy/leads).
 *
 * O schema BarthyLeadRequest usa extra="forbid": qualquer chave fora da lista
 * rejeita a requisição inteira com HTTP 422. Este script verifica o payload
 * gerado, a normalização do telefone e a validação da URL do endpoint.
 *
 * Rode via `pnpm test:contact`: o import direto de src/lib/contact.ts exige
 * --experimental-strip-types no Node 22.13 (versão do CI). No Node 22.18+ e
 * 24+ o type stripping já é padrão e a flag é inofensiva.
 */

import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const { buildHermesLeadPayload, safeHttpUrl } = await import(
  '../src/lib/contact.ts'
)

const HERMES_FIELDS = [
  'name',
  'phone',
  'email',
  'company',
  'service',
  'message',
  'source',
  'honeypot',
]

const baseValues = {
  nome: 'Ana Souza',
  whatsapp: '',
  email: '',
  empresaProjeto: 'Souza Consultoria',
  tipoSolucao: 'Landing page',
  mensagem: 'Quero organizar minha presença digital.',
}

const build = (overrides) =>
  buildHermesLeadPayload({ ...baseValues, ...overrides })

// Retorno por WhatsApp.
const whatsappLead = build({ whatsapp: '(61) 99999-9999' })
assert.deepEqual(whatsappLead, {
  name: 'Ana Souza',
  company: 'Souza Consultoria',
  service: 'Landing page',
  message: 'Quero organizar minha presença digital.',
  source: 'barthy-web-studio-v2',
  honeypot: '',
  phone: '+5561999999999',
})

// Retorno somente por e-mail: phone precisa ficar ausente, não vazio.
const emailLead = build({ email: 'ana@exemplo.com' })
assert.equal(
  'phone' in emailLead,
  false,
  'Sem WhatsApp, a chave phone não deve ser enviada.',
)
assert.equal(emailLead.email, 'ana@exemplo.com')

// Sem e-mail, a chave email também não deve ser enviada.
assert.equal('email' in whatsappLead, false)

// Normalização do telefone.
for (const [entrada, esperado] of [
  ['(61) 99999-9999', '+5561999999999'],
  ['61999999999', '+5561999999999'],
  ['+55 61 99999-9999', '+5561999999999'],
  ['55 61 99999 9999', '+5561999999999'],
]) {
  assert.equal(
    build({ whatsapp: entrada }).phone,
    esperado,
    `WhatsApp "${entrada}" deve virar ${esperado}.`,
  )
}

// Nenhum campo fora do contrato, em nenhuma combinação.
for (const lead of [
  whatsappLead,
  emailLead,
  build({ whatsapp: '(61) 99999-9999', email: 'ana@exemplo.com' }),
]) {
  for (const key of Object.keys(lead)) {
    assert.ok(
      HERMES_FIELDS.includes(key),
      `O Hermes usa extra="forbid": "${key}" não pertence ao contrato.`,
    )
  }
  assert.equal(lead.source, 'barthy-web-studio-v2')
  assert.equal(lead.honeypot, '')
  for (const obrigatorio of ['name', 'company', 'service', 'message']) {
    assert.equal(typeof lead[obrigatorio], 'string')
  }
}

// Nomes internos em português nunca podem vazar no payload.
for (const interno of [
  'nome',
  'whatsapp',
  'empresaProjeto',
  'tipoSolucao',
  'mensagem',
]) {
  assert.equal(
    interno in whatsappLead,
    false,
    `O campo interno "${interno}" não pode ser enviado ao Hermes.`,
  )
}

// Endpoint: só HTTPS, com HTTP liberado apenas em desenvolvimento local.
for (const aceita of [
  'https://exemplo.test/api/public/barthy/leads',
  'http://localhost:8000/api/public/barthy/leads',
  'http://127.0.0.1:8000/api/public/barthy/leads',
]) {
  assert.notEqual(safeHttpUrl(aceita), '', `${aceita} deveria ser aceita.`)
}

for (const recusada of [
  '',
  '   ',
  undefined,
  'http://exemplo.test/api/public/barthy/leads',
  'ftp://exemplo.test/leads',
  'javascript:alert(1)',
  '/api/public/barthy/leads',
  'exemplo.test/api/public/barthy/leads',
]) {
  assert.equal(
    safeHttpUrl(recusada),
    '',
    `${String(recusada)} deveria ser recusada como endpoint.`,
  )
}

// O formulário não pode fingir sucesso.
const contactForm = await readFile(
  new URL('../src/components/contact/ContactForm.tsx', import.meta.url),
  'utf8',
)

assert.match(
  contactForm,
  /if \(!response\.ok\) \{\s*throw new Error/,
  'Uma resposta HTTP de erro precisa cair no tratamento de falha.',
)
assert.match(
  contactForm,
  /body\.status !== 'ok'/,
  'Só há sucesso quando o Hermes confirma com status ok.',
)
assert.match(
  contactForm,
  /if \(!endpoint\) \{\s*setStatus\('unconfigured'\)/,
  'Sem VITE_BARTHY_CONTACT_ENDPOINT o formulário deve avisar, não fingir envio.',
)
assert.match(
  contactForm,
  /Seus dados foram preservados/,
  'Em falha, os dados preenchidos precisam continuar no formulário.',
)
assert.match(
  contactForm,
  /setTimeout\(\(\) => controller\.abort\(\), 10_000\)/,
  'O envio precisa manter timeout explícito.',
)
assert.equal(
  (contactForm.match(/form\.reset\(\)/g) ?? []).length,
  1,
  'form.reset() só pode existir no caminho de sucesso.',
)
assert.ok(
  contactForm.indexOf('form.reset()') >
    contactForm.indexOf("setStatus('success')"),
  'Os campos só podem ser limpos depois da confirmação do Hermes.',
)

// Nenhuma credencial do Hermes pode existir no frontend.
const contactSource = await readFile(
  new URL('../src/lib/contact.ts', import.meta.url),
  'utf8',
)
for (const proibido of [/HERMES_API_TOKEN/, /Authorization/i, /Bearer /]) {
  assert.doesNotMatch(`${contactSource}\n${contactForm}`, proibido)
}

console.log('Contrato do formulário de contato com o Hermes verificado.')
