/**
 * Contrato de regressão para toque em mobile.
 *
 * Origem: o bug relatado em produção "o card abre, mas depois não fecha" na
 * seção Projetos. A vitrine atual não tem mais toggle nos cards (cada projeto
 * mostra categoria, título e descrição curta, sem conteúdo escondido atrás de
 * interação), então o contrato agora garante que ela continue assim e que os
 * toggles restantes da página sigam sendo botões nativos acessíveis.
 *
 * `touch-action: manipulation` continua como baseline global de resposta ao
 * toque; ele não é tratado como solução suficiente para toggles.
 *
 * Este script continua sendo um teste estático de contrato (o projeto não tem
 * Playwright/jsdom). A validação final do comportamento continua exigindo um
 * teste rápido em celular real após o deploy.
 */

import { strict as assert } from 'node:assert'
import { readFile } from 'node:fs/promises'

const paths = {
  reset: 'src/styles/reset.css',
  projectCard: 'src/components/projects/ProjectCard.tsx',
  projectMedia: 'src/components/projects/ProjectMedia.tsx',
  header: 'src/components/header/Header.tsx',
  solutions: 'src/components/sections/SolutionsSection.tsx',
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

// Mantém a melhoria global de responsividade ao toque sem desabilitar zoom.
const buttonAnchorRuleMatch = sources.reset.match(
  /button,\s*\n?a\s*\{([^}]*)\}/,
)
assert.ok(
  buttonAnchorRuleMatch,
  'src/styles/reset.css deve ter uma regra `button, a { ... }`.',
)
assert.match(
  buttonAnchorRuleMatch[1],
  /touch-action:\s*manipulation\s*;/,
  'button, a deve manter touch-action: manipulation como baseline de responsividade ao toque.',
)

assert.doesNotMatch(
  sources.html,
  /maximum-scale|user-scalable\s*=\s*no/,
  'Não desabilite zoom na viewport para corrigir toque; isso piora acessibilidade.',
)

// A vitrine de Projetos não esconde conteúdo atrás de hover/clique.
for (const [name, source] of [
  ['ProjectCard', sources.projectCard],
  ['ProjectMedia', sources.projectMedia],
]) {
  assert.doesNotMatch(
    source,
    /onMouseEnter|onMouseOver|onPointerEnter|aria-expanded/,
    `${name} não deve depender de hover nem esconder conteúdo atrás de toggle.`,
  )
}

// Os toggles auditados precisam continuar sendo botões nativos acessíveis.
assert.match(
  sources.header,
  /<button[\s\S]*?aria-expanded=\{menuOpen\}/,
  'O botão do menu mobile precisa continuar sendo <button> nativo com aria-expanded.',
)
assert.match(
  sources.solutions,
  /<button[\s\S]{0,80}aria-expanded=\{expanded\}/,
  'O toggle do acordeão mobile precisa continuar sendo <button> nativo com aria-expanded.',
)

console.log(
  'Contrato mobile verificado: vitrine sem toggle/hover e toggles restantes nativos.',
)
