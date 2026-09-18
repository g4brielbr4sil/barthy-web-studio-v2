import { strict as assert } from 'node:assert'
import { readFile, stat } from 'node:fs/promises'

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
  pnqc: '../src/components/projects/PnqcVisual.tsx',
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

assert.match(sources.pnqc, /srcSet:/)
assert.match(sources.pnqc, /sizes=\{dashboardSizes\}/)
assert.match(sources.pnqc, /sizes=\{secondarySizes\}/)

for (const image of ['catalog', 'course', 'dashboard']) {
  const original = await stat(
    new URL(`../public/images/projects/pnqc-${image}.jpg`, import.meta.url),
  )

  for (const width of [480, 960, 1440]) {
    const variant = await stat(
      new URL(
        `../public/images/projects/pnqc-${image}-${width}.jpg`,
        import.meta.url,
      ),
    )
    assert.ok(
      variant.size < original.size,
      `pnqc-${image}-${width}.jpg deve ser menor que o original.`,
    )
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
