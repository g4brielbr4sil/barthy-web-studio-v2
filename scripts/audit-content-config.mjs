import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const paths = {
  app: 'src/app/App.tsx',
  hero: 'src/components/hero/HeroContent.tsx',
  problems: 'src/components/sections/ProblemsSection.tsx',
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
  motion: 'src/styles/motion.css',
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
  sources.problems,
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
  'Onde a Barthy entra',
  'Soluções conectadas ao seu negócio',
  'Software feito para o trabalho real',
  'Tem um processo no seu negócio que poderia funcionar melhor?',
]) {
  assert.match(
    renderedPublicCopy,
    new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `A copy comercial obrigatória deve conter: ${phrase}`,
  )
}

for (const line of ['BWS Web', 'BWS Systems', 'BWS Automations', 'BWS Care']) {
  assert.match(sources.solutionData, new RegExp(line))
}

for (const banned of [
  /Experiência editorial/i,
  /Versão editorial experimental/i,
  /dominar sua categoria/i,
  /Comprar Barthy Flow/i,
]) {
  assert.doesNotMatch(renderedPublicCopy, banned)
}

assert.match(
  sources.systems,
  /Não está disponível para contratação nesta fase\./,
  'Barthy Flow deve permanecer explicitamente indisponível durante a validação.',
)
assert.match(
  sources.projects,
  /Experiência profissional/,
  'Levens deve manter o contexto de experiência profissional.',
)
assert.match(
  sources.projects,
  /Projeto próprio em desenvolvimento/,
  'Projetos próprios não podem parecer cases de clientes.',
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
  /momentum=\{finePointer \? 32 : 13\}/,
  'O ChromaFlow autônomo deve continuar disponível em dispositivos touch.',
)
assert.doesNotMatch(
  sources.shader,
  /if \(!pageVisible\) return null/,
  'A composição WebGPU não deve desmontar apenas porque a aba perdeu visibilidade.',
)
assert.match(sources.motion, /@keyframes hero-signal/)

const appOrder = [
  '<ProblemsSection',
  '<SolutionsSection',
  '<SystemsSection',
  '<ProjectsSection',
  '<ProcessSection',
  '<ContactSection',
].map((token) => sources.app.indexOf(token))
assert.ok(appOrder.every((position) => position >= 0))
assert.deepEqual(appOrder, [...appOrder].sort((a, b) => a - b))

console.log('Auditoria de conteúdo, posicionamento e configuração concluída.')
