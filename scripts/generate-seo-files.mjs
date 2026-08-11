import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'

const root = process.cwd()
const env = loadEnv(process.env.NODE_ENV ?? 'production', root, '')
const dist = resolve(root, 'dist')
const indexPath = resolve(dist, 'index.html')
const headersPath = resolve(dist, '_headers')
const robotsPath = resolve(dist, 'robots.txt')
const sitemapPath = resolve(dist, 'sitemap.xml')

function normalizeSiteUrl(value) {
  const candidate = value?.trim()
  if (!candidate) return ''

  try {
    const url = new URL(candidate)
    if (url.protocol !== 'https:') return ''
    url.pathname = url.pathname.replace(/\/+$/, '') || '/'
    url.search = ''
    url.hash = ''
    return url.toString().replace(/\/$/, '')
  } catch {
    return ''
  }
}

function normalizeImageUrl(value, siteUrl) {
  const candidate = value?.trim()
  if (!candidate) return siteUrl ? `${siteUrl}/og-barthy.svg` : ''

  try {
    return new URL(candidate, `${siteUrl}/`).toString()
  } catch {
    return ''
  }
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

const siteUrl = normalizeSiteUrl(env.VITE_BARTHY_SITE_URL)
const allowIndexing = env.VITE_BARTHY_ALLOW_INDEXING === 'true'
const analyticsToken = env.VITE_BARTHY_CF_ANALYTICS_TOKEN?.trim()

if (allowIndexing && !siteUrl) {
  throw new Error(
    'VITE_BARTHY_ALLOW_INDEXING=true exige VITE_BARTHY_SITE_URL com HTTPS.',
  )
}

let html = await readFile(indexPath, 'utf8')
html = html.replace(
  'content="noindex, nofollow"',
  `content="${allowIndexing ? 'index, follow' : 'noindex, nofollow'}"`,
)
html = html
  .replace(/<meta name="seo:absolute" content=""\s*\/?\s*>/, '')
  .replace(/\s*<link rel="canonical"[^>]*>/, '')
  .replace(/\s*<meta property="og:url"[^>]*>/, '')
  .replace(/\s*<meta property="og:image(?::(?:width|height|alt))?"[^>]*>/g, '')
  .replace(/\s*<meta name="twitter:image"[^>]*>/, '')
  .replace(/\s*"url":\s*"https?:\/\/[^\"]+",?/, '')
  .replace(
    /name="twitter:card" content="[^"]+"/,
    'name="twitter:card" content="summary"',
  )

if (siteUrl) {
  const imageUrl = normalizeImageUrl(env.VITE_BARTHY_OG_IMAGE, siteUrl)
  const absoluteTags = [
    `<link rel="canonical" href="${escapeAttribute(siteUrl)}/" />`,
    `<meta property="og:url" content="${escapeAttribute(siteUrl)}/" />`,
  ]

  if (imageUrl) {
    absoluteTags.push(
      `<meta property="og:image" content="${escapeAttribute(imageUrl)}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      '<meta property="og:image:alt" content="Barthy Web Studio, tecnologia para negócios" />',
      `<meta name="twitter:image" content="${escapeAttribute(imageUrl)}" />`,
    )
    html = html.replace('content="summary"', 'content="summary_large_image"')
  }

  html = html.replace(
    '<meta name="theme-color"',
    `${absoluteTags.join('\n    ')}\n    <meta name="theme-color"`,
  )
  html = html.replace(
    '"serviceType": [',
    `"url": "${siteUrl}/",\n        "serviceType": [`,
  )
} else {
  html = html.replace(/\n\s*\n/g, '\n')
}

if (analyticsToken) {
  const beacon = `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${escapeAttribute(analyticsToken)}"}'></script>\n  `
  html = html.replace('</body>', `${beacon}</body>`)
}

await writeFile(indexPath, html)

let headers = await readFile(headersPath, 'utf8')
headers = headers.replace(/^\s*X-Robots-Tag:.*\r?\n/gm, '')
headers = headers.replace(
  '/*\n',
  `/*\n  X-Robots-Tag: ${allowIndexing ? 'index, follow' : 'noindex, nofollow'}\n`,
)
await writeFile(headersPath, headers)

const robots = allowIndexing
  ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'
await writeFile(robotsPath, robots)

if (allowIndexing) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`
  await writeFile(sitemapPath, sitemap)
} else {
  await rm(sitemapPath, { force: true })
}

console.log(
  allowIndexing
    ? `SEO de produção gerado para ${siteUrl}.`
    : 'Build protegido com noindex; configure domínio e libere indexação explicitamente para gerar canonical e sitemap.',
)
console.log(
  analyticsToken
    ? 'Cloudflare Web Analytics injetado no build.'
    : 'Analytics não configurado (defina VITE_BARTHY_CF_ANALYTICS_TOKEN para ativar).',
)
