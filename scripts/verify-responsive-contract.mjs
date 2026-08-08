import { readdir, readFile } from 'node:fs/promises'

const files = {
  header: 'src/components/header/Header.tsx',
  responsive: 'src/styles/responsive.css',
  motion: 'src/styles/motion.css',
  recovery: 'src/styles/components/recovery.css',
  reveal: 'src/components/ui/SectionReveal.tsx',
  footer: 'src/components/footer/Footer.tsx',
  debug: 'src/components/debug/VisualDebugPanel.tsx',
  contact: 'src/lib/contact.ts',
  contactStyles: 'src/styles/components/contact.css',
  shader: 'src/components/hero/ShaderSurface.tsx',
}

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, path]) => [
      key,
      await readFile(new URL(`../${path}`, import.meta.url), 'utf8'),
    ]),
  ),
)

const stylePaths = (await readdir(
  new URL('../src/styles', import.meta.url),
  { recursive: true },
)).filter((path) => path.endsWith('.css'))
const styleSources = await Promise.all(
  stylePaths.map((path) =>
    readFile(
      new URL(`../src/styles/${path.replaceAll('\\', '/')}`, import.meta.url),
      'utf8',
    ),
  ),
)

const checks = [
  ['horário semântico', sources.header.includes('className="header-time"')],
  ['nome acessível de Brasília', sources.header.includes('aria-label={`${time} em Brasília`}')],
  ['estado tablet unificado', sources.responsive.includes('@media (max-width: 1179px)')],
  ['estado mobile unificado', sources.responsive.includes('@media (max-width: 767px)')],
  ['estado compacto unificado', sources.responsive.includes('@media (max-width: 379px)')],
  ['breakpoint 1060 removido', !sources.responsive.includes('max-width: 1060px')],
  ['breakpoint 1120 removido', !sources.responsive.includes('max-width: 1120px')],
  ['breakpoint 1023 removido', !sources.responsive.includes('max-width: 1023px')],
  ['horário não removido', !/\.availability\s*\{[^}]*display:\s*none/s.test(sources.responsive)],
  ['movimento ambiental sem data-motion-ready', !/data-motion-ready[^\n]*hero__organic-shape/.test(sources.motion)],
  ['fallback mobile usa trajetória azul principal', sources.recovery.includes('animation-name: hero-organic-blue')],
  ['fallback mobile usa trajetória gelo principal', sources.recovery.includes('animation-name: hero-organic-ice')],
  ['fallback mobile usa trajetória Terra principal', sources.recovery.includes('animation-name: hero-organic-terra')],
  ['fallback mobile usa trajetória branca principal', sources.recovery.includes('animation-name: hero-organic-white')],
  ['ChromaFlow mantém intensidade entre ponteiros', sources.shader.includes('momentum={32}') && sources.shader.includes('radius={4.6}') && sources.shader.includes('intensity={1.05}')],
  ['FilmGrain permanece animado no touch', sources.shader.includes('<FilmGrain strength={0.035} bias={1} animated opacity={0.2} />')],
  ['readiness exige Canvas dimensionado', sources.shader.includes('isDrawableCanvas') && sources.shader.includes('canvas.width > 0')],
  ['reveal antecipado em touch', sources.reveal.includes("'18% 0px 18% 0px'")],
  ['Footer integrado ao reveal', (sources.footer.match(/<SectionReveal/g) ?? []).length === 2],
  ['badge do Contact ocupa a linha editorial', sources.contactStyles.includes('.contact__heading > .section-badge')],
  ['diagnóstico opt-in', sources.debug.includes("get('visual-debug') === '1'")],
  ['endpoint preservado', sources.contact.includes('VITE_BARTHY_CONTACT_ENDPOINT')],
  ['sem overflow-x mascarando falhas', !styleSources.some((source) => /overflow-x:\s*hidden/.test(source))],
]

const failures = checks.filter(([, passed]) => !passed)
if (failures.length > 0) {
  failures.forEach(([name]) => console.error(`Falhou: ${name}`))
  process.exitCode = 1
} else {
  console.log(`${checks.length} contratos responsivos verificados.`)
}
