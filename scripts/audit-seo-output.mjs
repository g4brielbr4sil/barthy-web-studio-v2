import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const [sourceHtml, builtHtml, headers, robots, generator] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../dist/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../dist/_headers', import.meta.url), 'utf8'),
  readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8'),
  readFile(new URL('./generate-seo-files.mjs', import.meta.url), 'utf8'),
])

for (const source of [sourceHtml, builtHtml]) {
  assert.match(source, /Barthy Web Studio \| Sites, Sistemas e Automação/)
  assert.match(source, /property="og:title"/)
  assert.match(source, /property="og:description"/)
  assert.match(source, /name="twitter:card"/)
  assert.match(source, /"@type": "ProfessionalService"/)
  assert.doesNotMatch(source, /Experiência editorial|Versão editorial experimental/)
}

assert.match(generator, /VITE_BARTHY_SITE_URL/)
assert.match(generator, /VITE_BARTHY_ALLOW_INDEXING/)
assert.match(generator, /VITE_BARTHY_OG_IMAGE/)
assert.match(generator, /rel="canonical"/)
assert.match(generator, /sitemap\.xml/)

const protectedBuild = /noindex, nofollow/.test(builtHtml)
if (protectedBuild) {
  assert.match(headers, /X-Robots-Tag: noindex, nofollow/)
  assert.match(robots, /Disallow: \//)
} else {
  assert.match(headers, /X-Robots-Tag: index, follow/)
  assert.match(robots, /Allow: \//)
  assert.match(builtHtml, /rel="canonical"/)
  assert.match(builtHtml, /property="og:url"/)
}

console.log('Metadados, política de indexação e geração de SEO verificados.')
