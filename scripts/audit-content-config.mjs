import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const paths = {
  app: 'src/app/App.tsx',
  hero: 'src/components/hero/HeroContent.tsx',
  cssMotion: 'src/components/hero/CssMotionBackground.tsx',
  solutions: 'src/components/sections/SolutionsSection.tsx',
  solutionData: 'src/components/solutions/solution-map.data.ts',
  systems: 'src/components/sections/SystemsSection.tsx',
  projects: 'src/data/projects.ts',
  process: 'src/components/sections/ProcessSection.tsx',
  contactSection: 'src/components/sections/ContactSection.tsx',
  contactForm: 'src/components/contact/ContactForm.tsx',
  contact: 'src/lib/contact.ts',
  activeSection: 'src/hooks/useActiveSection.ts',
  footer: 'src/components/footer/Footer.tsx',
  theme: 'src/theme/ThemeContext.tsx',
  shader: 'src/components/hero/ShaderSurface.tsx',
  html: 'index.html',
  envExample: '.env.example',
  hermesStatus: 'docs/HERMES_INTEGRATION_STATUS.md',
}

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(paths).map(async ([key, path]) => [
      key,
      await readFile(new URL(`../${path}`, import.meta.url), 'utf8'),
    ]),
  ),
)

const renderedPublicCopy = [
  sources.hero,
  sources.solutions,
  sources.solutionData,
  sources.systems,
  sources.projects,
  sources.process,
  sources.contactSection,
  sources.contactForm,
  sources.footer,
  sources.html,
].join('\n')

for (const phrase of [
  'Tecnologia para negócios',
  'venderem e operarem melhor',
  'Soluções conectadas ao seu negócio',
  'Sistemas para a rotina real do negócio',
  'Tem um processo no seu negócio que poderia funcionar melhor?',
]) {
  assert.match(
    renderedPublicCopy,
    new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `A copy comercial obrigatória deve conter: ${phrase}`,
  )
}

for (const line of [
  'BWS Digital',
  'BWS Sistemas',
  'BWS Automação',
  'BWS Suporte',
]) {
  assert.match(sources.solutionData, new RegExp(line))
}

for (const banned of [
  /Experiência editorial/i,
  /Versão editorial experimental/i,
  /dominar sua categoria/i,
  /Comprar Barthy Flow/i,
  /Hipóteses próprias em validação/i,
  /Não está disponível para contratação nesta fase/i,
  /sem métricas ou resultados inventados/i,
]) {
  assert.doesNotMatch(renderedPublicCopy, banned)
}

assert.doesNotMatch(
  sources.systems,
  /Barthy Flow/,
  'Produtos ainda não ofertados não devem ser expostos como produto comercial na home.',
)
assert.doesNotMatch(
  sources.projects,
  /Levens/i,
  'Levens não deve aparecer na área pública de cases.',
)
assert.doesNotMatch(
  sources.projects,
  /RadarDF/,
  'RadarDF está fora da seleção pública atual de cases.',
)
assert.match(
  sources.projects,
  /PNQC/,
  'PNQC deve permanecer como case público real.',
)
assert.match(
  sources.projects,
  /Hermes/,
  'Hermes deve permanecer como produto próprio e case público.',
)
assert.match(
  sources.projects,
  /persistência, certificados e selos seguem em evolução/,
  'PNQC deve deixar explícito o estado ainda evolutivo desses recursos.',
)
assert.doesNotMatch(
  sources.projects,
  /Plataforma educacional em produção/,
  'PNQC não deve ser apresentado como produção enquanto a persistência segue em evolução.',
)
assert.doesNotMatch(
  sources.projects,
  /certificados verificáveis/i,
  'Recursos de certificação ainda em evolução não podem ser apresentados como concluídos.',
)
assert.match(sources.contact, /VITE_BARTHY_WHATSAPP_URL/)
assert.match(sources.contact, /VITE_BARTHY_CONTACT_ENDPOINT/)
assert.match(sources.contact, /safeHttpUrl/)
assert.doesNotMatch(sources.contact, /https?:\/\//)
assert.match(
  sources.contact,
  /isLocalHttp/,
  'HTTP sem TLS deve ser aceito apenas para desenvolvimento local.',
)
assert.match(
  sources.contact,
  /phone\?: string/,
  'O payload deve permitir retorno somente por e-mail.',
)
assert.match(
  sources.contactForm,
  /body\.status !== 'ok'/,
  'O formulário só deve confirmar sucesso quando o Hermes responder com status ok.',
)
assert.match(
  sources.contactForm,
  /Informe um WhatsApp ou um e-mail para retorno/,
  'O briefing deve aceitar pelo menos um canal de retorno sem obrigar WhatsApp.',
)
assert.doesNotMatch(
  `${sources.envExample}\n${sources.hermesStatus}`,
  /sslip\.io|44-199-249-92/,
  'Hosts operacionais não devem ficar expostos nos arquivos de exemplo ou status.',
)

assert.match(
  sources.activeSection,
  /hashSection === 'formulario'/,
  'O hash do formulário deve ser reconhecido como uma âncora válida de Contato.',
)
assert.match(
  sources.activeSection,
  /isFormAnchor \|\| isContentAnchor \? hashSection : section/,
  'A navegação direta deve rolar até o formulário sem redirecionar para o início.',
)
assert.match(
  sources.activeSection,
  /hashSection === 'conteudo'/,
  'O link de acessibilidade deve preservar a âncora do conteúdo principal.',
)
assert.match(
  sources.activeSection,
  /cancelAnimationFrame\(locationNavigationFrame\)/,
  'Eventos simultâneos de hash e histórico não devem duplicar a rolagem.',
)

assert.doesNotMatch(
  sources.theme,
  /localStorage|sessionStorage|prefers-color-scheme|matchMedia/,
  'O tema inicial deve ser light em toda nova carga, sem preferência persistida ou automática.',
)
assert.match(sources.theme, /return 'light'/)

assert.match(
  sources.shader,
  /momentum=\{32\}/,
  'A intensidade-base do ChromaFlow deve ser preservada também em touch.',
)
assert.match(sources.shader, /radius=\{4\.6\}/)
assert.match(sources.shader, /intensity=\{1\.05\}/)
assert.doesNotMatch(
  sources.shader,
  /if \(!pageVisible\) return null/,
  'A composição WebGPU não deve desmontar apenas porque a aba perdeu visibilidade.',
)
assert.doesNotMatch(
  sources.cssMotion,
  /hero__organic-shape--signal/,
  'A camada signal introduzida na PR #20 não deve substituir a composição original do fallback.',
)

const appOrder = [
  '<Hero',
  '<SolutionsSection',
  '<SystemsSection',
  '<ProjectsSection',
  '<ProcessSection',
  '<ContactSection',
].map((token) => sources.app.indexOf(token))
assert.ok(appOrder.every((position) => position >= 0))
assert.deepEqual(appOrder, [...appOrder].sort((a, b) => a - b))

console.log('Auditoria de conteúdo, posicionamento e configuração concluída.')
