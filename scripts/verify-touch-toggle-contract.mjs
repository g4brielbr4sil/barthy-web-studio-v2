/**
 * Contrato de regressão para o bug relatado em produção: "o card abre, mas
 * depois não fecha" (seção Projetos, celular real).
 *
 * Causa raiz: nenhum controle tocável do site declarava `touch-action`, e a
 * viewport permanece com zoom habilitado (sem `maximum-scale`/`user-scalable
 * =no` — e não deveria ganhar essa restrição, isso quebraria zoom/acessibi-
 * lidade). Nessas condições, navegadores móveis mantêm a detecção de gesto
 * de "double-tap to zoom" ativa em qualquer elemento tocável. Um toggle como
 * o botão "Ver detalhes"/"Fechar detalhes" do ProjectCard é tocado duas
 * vezes seguidas no mesmo ponto da tela (abrir, depois fechar) — exatamente
 * o padrão que o navegador interpreta como um duplo-toque para zoom, o que
 * consome o segundo toque em vez de despachar um segundo evento de clique.
 * O primeiro toque sempre funciona (não há toque anterior para formar um
 * par); só o segundo (fechar) é engolido. Isso bate com o relato: abre, mas
 * não fecha.
 *
 * A correção é `touch-action: manipulation` nos elementos tocáveis (button,
 * a) em src/styles/reset.css: diz ao navegador que o elemento só precisa de
 * tap/pan, então ele despacha cada toque como clique imediato, sem esperar
 * para ver se vai virar um duplo-toque de zoom.
 *
 * Este é um teste estático (lê os fontes, não monta o componente nem simula
 * toque de verdade — o projeto não tem Playwright/jsdom instalado e este
 * script segue o estilo dos outros contratos em scripts/*.mjs). Ele prova o
 * bug de forma indireta mas determinística: antes da correção,
 * reset.css não continha `touch-action` em lugar nenhum, então a asserção
 * abaixo falha contra o código antigo (pode ser confirmado revertendo
 * temporariamente o patch em src/styles/reset.css) e passa com a correção.
 * Uma regressão futura — remover a propriedade, ou movê-la para um seletor
 * que não cubra os toggles reais — voltaria a falhar aqui.
 *
 * Rode via `pnpm test:touch-toggle` (incluído em `pnpm quality`).
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

// A regra global precisa existir e cobrir button + a num único bloco, para
// que qualquer toggle nativo (botão) do site herde a correção sem precisar
// de patch por componente.
const buttonAnchorRuleMatch = sources.reset.match(
  /button,\s*\n?a\s*\{([^}]*)\}/,
)
assert.ok(
  buttonAnchorRuleMatch,
  'src/styles/reset.css deve ter uma regra `button, a { ... }` (mesmo bloco que já zera -webkit-tap-highlight-color).',
)
assert.match(
  buttonAnchorRuleMatch[1],
  /touch-action:\s*manipulation\s*;/,
  'button, a precisa de touch-action: manipulation — sem isso, dois toques seguidos no mesmo ponto (abrir/fechar um toggle) podem ser engolidos pelo gesto de duplo-toque para zoom do navegador móvel. Este é o bug real relatado em produção na seção Projetos.',
)

// A correção certa é no CSS do toque, não desabilitar zoom na viewport —
// isso quebraria acessibilidade (WCAG 1.4.4) e seria uma correção pior.
assert.doesNotMatch(
  sources.html,
  /maximum-scale|user-scalable\s*=\s*no/,
  'Não desabilite zoom na viewport para "corrigir" o toque duplo — isso piora acessibilidade. A correção é touch-action: manipulation.',
)

// Os três toggles varridos nesta auditoria (card de projeto, menu mobile do
// header, acordeão mobile de soluções) precisam continuar sendo <button>
// nativos — só assim herdam a regra global acima. Se um deles virar
// <div role="button">, a correção para de valer silenciosamente.
assert.match(
  sources.projectCard,
  /<button\s+className="project-card__action"[\s\S]*?aria-expanded=\{expanded\}/,
  'O toggle "Ver detalhes"/"Fechar detalhes" do ProjectCard precisa continuar sendo um <button> nativo com aria-expanded.',
)
assert.match(
  sources.header,
  /<button[\s\S]*?aria-expanded=\{menuOpen\}/,
  'O botão que abre/fecha o menu mobile do Header precisa continuar sendo um <button> nativo com aria-expanded.',
)
assert.match(
  sources.solutions,
  /<button[\s\S]{0,80}aria-expanded=\{expanded\}/,
  'O toggle do acordeão mobile de SolutionsSection precisa continuar sendo um <button> nativo com aria-expanded.',
)

console.log(
  'Contrato de toque (abrir/fechar em viewport mobile) verificado: touch-action: manipulation cobre todos os toggles do site.',
)
