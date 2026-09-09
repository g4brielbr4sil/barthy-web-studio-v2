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
  contact: 'src/lib/contact.ts',
  footer: 'src/components/footer/Footer.tsx',
  theme: 'src/theme/ThemeContext.tsx',
  shader: 'src/components/hero/ShaderSurface.tsx',
  html: 'index.html',
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
  'BWS Presença Digital',
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
  /Certificados, badges e áreas administrativas seguem em evolução/,
  'PNQC deve deixar explícito o estado ainda evolutivo desses recursos.',
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
