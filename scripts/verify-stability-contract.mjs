import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const originalNavigator = Object.getOwnPropertyDescriptor(
  globalThis,
  'navigator',
)
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: {
    gpu: {
      requestAdapter: async () => null,
    },
  },
})

const {
  detectWebGpu,
  getInitialWebGpuCapability,
} = await import('../src/visual/capabilities.ts?no-compatible-adapter')

assert.equal(getInitialWebGpuCapability(), 'checking')
assert.equal(await detectWebGpu(), 'unavailable')

if (originalNavigator) {
  Object.defineProperty(globalThis, 'navigator', originalNavigator)
} else {
  delete globalThis.navigator
}

const paths = {
  activeSection: '../src/hooks/useActiveSection.ts',
  capabilities: '../src/visual/capabilities.ts',
  visualContext: '../src/visual/VisualCapabilitiesContext.tsx',
  shaderBackground: '../src/components/hero/ShaderBackground.tsx',
  shaderSurface: '../src/components/hero/ShaderSurface.tsx',
  header: '../src/components/header/Header.tsx',
  headerHeight: '../src/hooks/useHeaderHeight.ts',
  projectsData: '../src/data/projects.ts',
  headers: '../public/_headers',
  llms: '../public/llms.txt',
  generator: './generate-seo-files.mjs',
}

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(paths).map(async ([name, path]) => [
      name,
      await readFile(new URL(path, import.meta.url), 'utf8'),
    ]),
  ),
)

assert.match(sources.activeSection, /if \(!hashSection\) return/)
assert.match(sources.activeSection, /isValidLocationTarget/)
assert.match(sources.activeSection, /cancelPendingLocationNavigation/)
for (const eventName of ['wheel', 'touchstart', 'pointerdown']) {
  assert.match(
    sources.activeSection,
    new RegExp(`addEventListener\\('${eventName}', cancelPendingLocationNavigation`),
  )
}

assert.match(sources.capabilities, /requestAdapter\(\)/)
assert.match(sources.capabilities, /await gpu\.requestAdapter\(\)/)
assert.match(sources.visualContext, /webGpu !== 'available'/)
assert.match(sources.shaderBackground, /active && canAttemptShader/)
assert.doesNotMatch(sources.shaderSurface, /getBoundingClientRect/)

assert.doesNotMatch(sources.header, /aria-label=\{`\$\{time\} em Brasília`\}/)
assert.match(sources.header, /<span className="header-time__value">/)
assert.match(sources.header, /<span className="header-time__zone">/)

assert.match(sources.headerHeight, /entry\.borderBoxSize/)
assert.match(sources.headerHeight, /borderBox\?\.blockSize/)

// Vitrine de Projetos: derivados reais (WebP), dimensões coerentes com o
// srcset e peso contido. O cabeçalho de cada arquivo é lido de verdade.
function webpSize(buffer) {
  assert.equal(buffer.toString('ascii', 0, 4), 'RIFF', 'arquivo não é RIFF')
  assert.equal(buffer.toString('ascii', 8, 12), 'WEBP', 'arquivo não é WebP')
  const chunk = buffer.toString('ascii', 12, 16)
  if (chunk === 'VP8X') {
    return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) }
  }
  if (chunk === 'VP8 ') {
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff }
  }
  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21)
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
  }
  throw new Error(`chunk WebP desconhecido: ${chunk}`)
}

const srcSets = [
  ...sources.projectsData.matchAll(/webpVariants\('([^']+)', \[([\d, ]+)\]/g),
]
assert.ok(srcSets.length >= 3, 'A composição Digital precisa de três imagens com variantes.')
for (const [, name, list] of srcSets) {
  const widths = list.split(',').map((width) => Number(width.trim()))
  let previousHeight = 0
  for (const width of widths) {
    const file = new URL(`../public/images/projects/${name}-${width}.webp`, import.meta.url)
    const buffer = await readFile(file)
    const size = webpSize(buffer)
    assert.equal(size.width, width, `${name}-${width}.webp deve ter ${width}px de largura real.`)
    assert.ok(size.height > previousHeight, `${name}: variantes devem crescer em altura.`)
    previousHeight = size.height
    assert.ok(buffer.length <= 64 * 1024, `${name}-${width}.webp passou de 64 KB.`)
  }
}

assert.match(sources.headers, /Content-Security-Policy: __BARTHY_CSP__/)
assert.match(sources.headers, /Strict-Transport-Security:/)
assert.match(sources.headers, /Cross-Origin-Opener-Policy: same-origin/)
assert.match(sources.generator, /createHash\('sha256'\)/)
assert.match(sources.generator, /VITE_BARTHY_CONTACT_ENDPOINT/)
assert.match(sources.generator, /\.\.\.process\.env/)
assert.match(sources.generator, /cspHeaderPattern/)

assert.ok(sources.llms.startsWith('# Barthy Web Studio\n'))
for (const href of [
  'https://barthywebstudio.tech/',
  'https://barthywebstudio.tech/#solucoes',
  'https://barthywebstudio.tech/#sistemas',
  'https://barthywebstudio.tech/#projetos',
  'https://barthywebstudio.tech/#contato',
]) {
  assert.match(sources.llms, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
}

console.log('Contratos de estabilização técnica verificados.')
