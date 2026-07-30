import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const paths = {
  header: 'src/components/header/Header.tsx',
  headerClock: 'src/styles/components/header-clock.css',
  contact: 'src/lib/contact.ts',
  contactSection: 'src/components/sections/ContactSection.tsx',
  contactForm: 'src/components/contact/ContactForm.tsx',
  shader: 'src/components/hero/ShaderSurface.tsx',
  motion: 'src/styles/motion.css',
  projects: 'src/data/projects.ts',
}

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(paths).map(async ([key, path]) => [
      key,
      await readFile(new URL(`../${path}`, import.meta.url), 'utf8'),
    ]),
  ),
)

const joinedTextErrors = [
  /abertapara/i,
  /projetosem/i,
  /BrasíliaAgenda/i,
  /disponível\.Use/i,
  /projetoA Barthy/i,
]

const publicCopy = [
  sources.header,
  sources.contactSection,
  sources.contactForm,
  sources.projects,
].join('\n')

for (const pattern of joinedTextErrors) {
  assert.doesNotMatch(
    publicCopy,
    pattern,
    `Texto público contém palavras ou frases unidas: ${pattern}`,
  )
}

assert.match(
  sources.header,
  /availability__status-lead">Agenda aberta<\/span>/,
  'A mensagem comercial da agenda deve preservar a abertura aprovada.',
)
assert.match(
  sources.header,
  /availability__status-detail">\s*para novos projetos\s*<\/span>/,
  'O complemento da agenda deve existir como fragmento próprio.',
)
assert.doesNotMatch(
  sources.header,
  /\{' '\}/,
  'O Header não deve depender de espaços literais frágeis entre fragmentos.',
)
assert.match(
  sources.headerClock,
  /\.availability__status\s*\{[\s\S]*?gap:\s*0\.24rem;/,
  'O espaçamento entre a chamada e o complemento deve ser controlado por CSS.',
)
assert.match(
  sources.header,
  /aria-label=\{`\$\{time\} em Brasília`\}/,
  'O relógio deve manter o nome acessível em português.',
)

assert.doesNotMatch(
  sources.contactSection,
  /nesta V2/i,
  'A interface pública não deve expor linguagem interna de versão.',
)
assert.match(
  sources.contact,
  /VITE_BARTHY_WHATSAPP_URL/,
  'O WhatsApp deve continuar configurável por variável de ambiente.',
)
assert.match(
  sources.contact,
  /VITE_BARTHY_CONTACT_ENDPOINT/,
  'O endpoint de contato deve continuar configurável por variável de ambiente.',
)
assert.match(
  sources.contact,
  /safeHttpUrl/,
  'URLs externas precisam continuar passando pela validação central.',
)
assert.doesNotMatch(
  sources.contact,
  /https?:\/\//,
  'A configuração de contato não deve conter endpoint ou WhatsApp hardcoded.',
)

assert.match(
  sources.shader,
  /momentum=\{finePointer \? 32 : 13\}/,
  'O ChromaFlow autônomo deve continuar disponível em dispositivos touch.',
)
assert.match(
  sources.shader,
  /radius=\{finePointer \? 4\.6 : 3\.5\}/,
  'O raio autônomo do ChromaFlow deve continuar configurado no touch.',
)
assert.doesNotMatch(
  sources.motion,
  /data-motion-ready[^\n]*hero__organic-shape/,
  'O fundo ambiental não deve depender do gatilho editorial.',
)
assert.match(
  sources.headerClock,
  /prefers-reduced-motion:\s*no-preference/,
  'A animação da disponibilidade deve respeitar redução de movimento.',
)
assert.match(
  sources.projects,
  /Uma central de comando em evolução/,
  'A apresentação pública do Hermes deve permanecer em português.',
)

console.log('Auditoria de conteúdo, movimento e configuração concluída.')
