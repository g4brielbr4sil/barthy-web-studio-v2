import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const [sourceHtml, builtHtml, headers, robots, generator, llms] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../dist/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../dist/_headers', import.meta.url), 'utf8'),
  readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8'),
  readFile(new URL('./generate-seo-files.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../dist/llms.txt', import.meta.url), 'utf8'),
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
assert.match(headers, /Content-Security-Policy:/)
assert.match(headers, /script-src 'self' 'sha256-/)
assert.match(
  headers,
  /script-src [^;]*https:\/\/static\.cloudflareinsights\.com/,
)
assert.match(
  headers,
  /connect-src [^;]*https:\/\/cloudflareinsights\.com/,
)
assert.doesNotMatch(headers, /script-src [^;]*'unsafe-inline'/)
assert.doesNotMatch(headers, /script-src [^;]*'unsafe-eval'/)
assert.doesNotMatch(headers, /(?:^|\s)\*(?:\s|;)/m)
assert.match(headers, /Strict-Transport-Security: max-age=31536000(?:\r?\n|$)/)
assert.doesNotMatch(headers, /includeSubDomains|preload/)
assert.match(headers, /Cross-Origin-Opener-Policy: same-origin/)
assert.match(headers, /X-Content-Type-Options: nosniff/)
assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/)
assert.match(headers, /Permissions-Policy:/)
assert.doesNotMatch(headers, /__BARTHY_CSP__/)

const inlineScripts = [
  ...builtHtml.matchAll(
    /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi,
  ),
]
assert.ok(inlineScripts.length > 0)
for (const [, content] of inlineScripts) {
  const digest = createHash('sha256').update(content).digest('base64')
  assert.ok(
    headers.includes(`'sha256-${digest}'`),
    'Todo script inline do build precisa ter hash correspondente na CSP.',
  )
}

assert.match(llms, /^# Barthy Web Studio$/m)
assert.match(llms, /https:\/\/barthywebstudio\.tech\/#contato/)

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
