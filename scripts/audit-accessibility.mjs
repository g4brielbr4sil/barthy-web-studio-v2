import { strict as assert } from 'node:assert'
import { createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
})

const countText = (source, text) => source.split(text).length - 1

const visibleText = (markup) =>
  markup
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

try {
  const [{ TextRollButton }, { SolutionArchitectureMap }, { solutionGroups }] =
    await Promise.all([
      vite.ssrLoadModule('/src/components/ui/TextRollButton.tsx'),
      vite.ssrLoadModule(
        '/src/components/solutions/SolutionArchitectureMap.tsx',
      ),
      vite.ssrLoadModule('/src/components/solutions/solution-map.data.ts'),
    ])

  const ctas = [
    'Falar sobre meu negócio',
    'Conhecer soluções',
  ]

  for (const label of ctas) {
    const markup = renderToStaticMarkup(
      React.createElement(TextRollButton, { href: '#teste' }, label),
    )
    assert.equal(
      countText(visibleText(markup), label),
      1,
      `O CTA "${label}" deve existir uma vez no conteúdo textual extraído.`,
    )
    assert.match(
      markup,
      new RegExp(`aria-label="${label}"`),
      `O CTA "${label}" deve expor um nome acessível estável.`,
    )
  }

  for (const group of solutionGroups) {
    const markup = renderToStaticMarkup(
      React.createElement(SolutionArchitectureMap, { group }),
    )
    const text = visibleText(markup)

    for (const step of group.flow) {
      assert.ok(
        countText(text, step.title) >= 1,
        `A etapa "${step.title}" deve existir no conteúdo textual do fluxo.`,
      )
    }
  }

  // Vitrine de Projetos renderizada de verdade (SSR com os providers reais).
  const [{ ProjectsSection }, { AppProviders }, { projects }] = await Promise.all([
    vite.ssrLoadModule('/src/components/sections/ProjectsSection.tsx'),
    vite.ssrLoadModule('/src/app/AppProviders.tsx'),
    vite.ssrLoadModule('/src/data/projects.ts'),
  ])
  // The site is client-rendered; the server-only useLayoutEffect notice from
  // the providers is irrelevant here and is the only message filtered.
  const consoleError = console.error
  console.error = (message, ...rest) => {
    if (typeof message === 'string' && message.includes('useLayoutEffect does nothing on the server')) return
    consoleError(message, ...rest)
  }
  let showcase
  try {
    showcase = renderToStaticMarkup(
      React.createElement(AppProviders, null, React.createElement(ProjectsSection)),
    )
  } finally {
    console.error = consoleError
  }
  const showcaseText = visibleText(showcase)
  const cards = [...showcase.matchAll(/<article class="project-card project-card--(\w+)"/g)].map(
    ([, variant]) => variant,
  )
  assert.deepEqual(
    cards,
    ['digital', 'system', 'automation'],
    'A vitrine deve renderizar Digital, Sistemas e Automação, nesta ordem.',
  )
  for (const project of projects) {
    for (const copy of [project.category, project.title, project.description]) {
      assert.equal(countText(showcaseText, copy), 1, `"${copy}" deve aparecer uma vez.`)
    }
    assert.match(
      showcase,
      new RegExp(`<h3 id="project-title-${project.id}">`),
      `${project.title} precisa de um título de nível 3 identificável.`,
    )
    if (project.visual.kind === 'pending') {
      assert.doesNotMatch(
        showcase,
        new RegExp(`aria-label="${project.alt}"`),
        `${project.title}: visual pendente não pode anunciar uma imagem que não existe.`,
      )
    } else {
      assert.match(
        showcase,
        new RegExp(`role="img" aria-label="${project.alt}"`),
        `${project.title}: o visual precisa de descrição acessível.`,
      )
    }
  }
  const images = [...showcase.matchAll(/<img [^>]*>/g)].map(([tag]) => tag)
  assert.ok(images.length >= 3, 'A composição Digital deve renderizar as três capturas reais.')
  for (const tag of images) {
    for (const attribute of ['alt=""', 'loading="lazy"', 'decoding="async"', 'srcSet=', 'sizes=', 'width=', 'height=']) {
      assert.ok(tag.includes(attribute), `Imagem da vitrine sem ${attribute}: ${tag.slice(0, 80)}`)
    }
  }
  assert.doesNotMatch(showcaseText, /PNQC|Hermes/, 'Cases retirados não aparecem na vitrine.')

  console.log('Auditoria estrutural de acessibilidade concluída.')
} finally {
  await vite.close()
}
