/**
 * Contrato de regressão para o bug relatado em produção: "o card abre, mas
 * depois não fecha" (seção Projetos, celular real).
 *
 * A primeira tentativa usou apenas `touch-action: manipulation`. Ela foi
 * publicada, mas o problema continuou acontecendo no aparelho real. Portanto,
 * este contrato não trata mais essa propriedade como causa/solução suficiente.
 *
 * O ProjectCard agora trata `pointerup` de touch/pen diretamente para que abrir
 * e fechar não dependam do `click` sintético do navegador móvel. O `click`
 * continua sendo o caminho normal para mouse e teclado/acessibilidade. Um ref
 * suprime somente o click sintético que pode vir logo depois do pointerup, para
 * evitar alternância dupla.
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

// O ProjectCard precisa tratar touch/pen sem depender do click sintético.
assert.match(
  sources.projectCard,
  /const\s+ignoreNextClickRef\s*=\s*useRef\(false\)/,
  'ProjectCard precisa manter um guard para suprimir somente o click sintético após pointerup.',
)
assert.match(
  sources.projectCard,
  /onPointerUp=\{\(event\)\s*=>\s*\{[\s\S]*?event\.pointerType\s*!==\s*'touch'[\s\S]*?event\.pointerType\s*!==\s*'pen'[\s\S]*?ignoreNextClickRef\.current\s*=\s*true[\s\S]*?toggleExpanded\(\)/,
  'ProjectCard deve alternar no pointerup de touch/pen para não depender do click móvel.',
)
assert.match(
  sources.projectCard,
  /onClick=\{\(\)\s*=>\s*\{[\s\S]*?if\s*\(ignoreNextClickRef\.current\)[\s\S]*?ignoreNextClickRef\.current\s*=\s*false[\s\S]*?return[\s\S]*?toggleExpanded\(\)/,
  'ProjectCard deve preservar click para mouse/teclado e ignorar somente o click sintético pós-touch.',
)

// Os toggles auditados precisam continuar sendo botões nativos acessíveis.
assert.match(
  sources.projectCard,
  /<button\s+className="project-card__action"[\s\S]*?aria-expanded=\{expanded\}/,
  'O toggle do ProjectCard precisa continuar sendo <button> nativo com aria-expanded.',
)
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
  'Contrato mobile verificado: ProjectCard trata pointerup touch/pen e preserva click acessível.',
)
