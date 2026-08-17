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

  console.log('Auditoria estrutural de acessibilidade concluída.')
} finally {
  await vite.close()
}
