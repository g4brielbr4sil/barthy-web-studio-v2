---
name: animejs-v4
description: Planejar, implementar, revisar e corrigir animações com Anime.js v4 em projetos web, especialmente React, TypeScript e Vite. Usar quando a tarefa mencionar Anime.js, animejs, timelines, stagger, createScope, onScroll, WAAPI do Anime.js, migração de sintaxe v3 para v4, cleanup de animações em React, reduced motion ou auditoria de desempenho de animações Anime.js. Não usar para instalar a biblioteca sem uma necessidade concreta de runtime.
---

# Anime.js v4

## Contrato de trabalho

1. Ler a arquitetura de movimento, dependências e componentes afetados antes de editar.
2. Confirmar que a tarefa autoriza implementação. Para auditoria, explicação ou planejamento, não instalar pacotes.
3. Verificar a versão atual com `npm view animejs version` antes de adicionar a dependência.
4. Instalar somente o pacote oficial `animejs`, usando o gerenciador já adotado pelo projeto.
5. Não substituir CSS, Motion, shaders ou outra solução funcional sem justificar a troca.
6. Preservar conteúdo visível, navegação, acessibilidade e fallback sem JavaScript.
7. Validar em produção local, movimento reduzido, mobile e desktop.

Antes de implementar ou revisar código Anime.js, ler
[`references/animejs-v4.md`](references/animejs-v4.md).

## Escolher a ferramenta mínima

- Preferir CSS para hover, focus, transições simples e estados declarativos.
- Preferir `waapi.animate()` para transformações e opacidade simples que devam
  continuar suaves sob carga e quando bundle mínimo importa.
- Usar `animate()` para timelines complexas, SVG, objetos JavaScript,
  callbacks avançados ou propriedades não atendidas pela WAAPI.
- Usar `createTimeline()` quando a sincronização entre várias etapas for parte
  do comportamento, não apenas para encadear efeitos decorativos.
- Usar `onScroll()` somente quando o progresso da animação precisa acompanhar
  o scroll. Para simples entrada em viewport, considerar a infraestrutura de
  IntersectionObserver já existente no projeto.

## Implementar em React

1. Criar um `ref` para a raiz do componente.
2. Criar a animação dentro de `useEffect`.
3. Usar `createScope({ root })` para limitar seletores ao componente.
4. Declarar `mediaQueries` no Scope, incluindo movimento reduzido.
5. Retornar `scope.revert()` no cleanup.
6. Confirmar comportamento sob React StrictMode.
7. Não consultar ou animar elementos fora da raiz sem necessidade explícita.

Padrão:

```tsx
import { animate } from 'animejs/animation'
import { createScope } from 'animejs/scope'
import { useEffect, useRef } from 'react'

export function MotionBlock() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = createScope({
      root: rootRef,
      mediaQueries: {
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
    }).add(({ matches }) => {
      if (matches.reduceMotion) return

      animate('[data-motion-item]', {
        opacity: [0, 1],
        y: [16, 0],
        duration: 520,
        ease: 'out(3)',
      })
    })

    return () => scope.revert()
  }, [])

  return <div ref={rootRef}>{/* conteúdo */}</div>
}
```

O conteúdo deve continuar visível se o efeito não inicializar. Quando a
entrada começar em `opacity: 0`, aplicar esse estado somente depois que a
capacidade de movimento estiver confirmada.

## Acessibilidade e progressive enhancement

- Tratar `prefers-reduced-motion: reduce` como requisito funcional.
- No modo reduzido, preservar o estado final sem deslocamentos ou loops.
- Não atrelar conteúdo essencial a `onComplete`.
- Não impedir teclado, foco, leitura ou interação durante a animação.
- Evitar parallax e rastreamento de ponteiro em `pointer: coarse`.
- Manter fallback estático coerente quando JavaScript, GPU ou a biblioteca
  falharem.
- Pausar ou desmontar loops quando a aba ou o elemento não estiver visível.

## Performance

- Priorizar `transform` e `opacity`.
- Evitar animar `width`, `height`, `top`, `left`, filtros pesados e sombras
  grandes em muitos elementos.
- Não manter `will-change` permanentemente.
- Não criar state React por frame.
- Não combinar múltiplos loops concorrentes sobre a mesma propriedade.
- Importar submódulos quando isso reduzir o bundle e o bundler não conseguir
  eliminar código não usado.
- Medir o bundle antes e depois quando a dependência for adicionada.

## Sintaxe v4

Usar imports nomeados como:

```ts
import { animate, createTimeline, stagger } from 'animejs'
```

Ou imports granulares:

```ts
import { animate } from 'animejs/animation'
import { createTimeline } from 'animejs/timeline'
import { createScope } from 'animejs/scope'
import { onScroll } from 'animejs/events'
import { stagger } from 'animejs/utils'
import * as waapi from 'animejs/waapi'
```

Não gerar padrões antigos baseados em default import `anime()` ou
`anime.timeline()`.

## Validação mínima

Executar os comandos definidos pelo projeto e registrar limitações reais.
Além disso, confirmar:

- cleanup após mount/unmount repetido;
- zero conteúdo preso em opacidade zero;
- movimento reduzido sem animação relevante;
- ausência de overflow horizontal;
- ausência de erros ou warnings no console;
- comportamento em pointer fine e coarse;
- bundle dentro do orçamento acordado;
- nenhuma nova dependência além de `animejs`, se a instalação foi autorizada.
