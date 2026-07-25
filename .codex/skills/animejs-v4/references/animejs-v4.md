# Anime.js v4 reference

## Estado verificado

- Pacote oficial: `animejs`
- Linha principal: v4
- Versão verificada em 24 de julho de 2026: `4.5.0`
- Instalação, somente quando autorizada: `pnpm add animejs`
- Documentação oficial: https://animejs.com/documentation/

Sempre consultar a documentação oficial quando a precisão de uma API puder ter
mudado desde esta verificação.

## Imports principais

```ts
import {
  animate,
  createScope,
  createTimeline,
  onScroll,
  stagger,
  utils,
  waapi,
} from 'animejs'
```

Subpaths oficiais:

```ts
import { animate } from 'animejs/animation'
import { createTimer } from 'animejs/timer'
import { createTimeline } from 'animejs/timeline'
import { createAnimatable } from 'animejs/animatable'
import { createDraggable } from 'animejs/draggable'
import { createLayout } from 'animejs/layout'
import { createScope } from 'animejs/scope'
import { engine } from 'animejs/engine'
import * as events from 'animejs/events'
import * as easings from 'animejs/easings'
import * as utils from 'animejs/utils'
import * as svg from 'animejs/svg'
import * as text from 'animejs/text'
import * as waapi from 'animejs/waapi'
```

## Decisão entre CSS, WAAPI e engine JavaScript

| Necessidade | Preferência |
| --- | --- |
| Hover, focus e estado simples | CSS |
| Transform e opacity simples | `waapi.animate()` |
| Bundle mínimo para efeito básico | `waapi.animate()` |
| Timeline complexa | `animate()` + `createTimeline()` |
| SVG, atributo DOM ou objeto JS | `animate()` |
| Canvas, WebGL ou WebGPU | `animate()` |
| Muitos alvos ou callbacks avançados | `animate()` |

A documentação oficial estima aproximadamente 3 kB para a versão WAAPI e
10 kB para `animate()`, antes de composição com outros módulos.

## React e cleanup

Combinar `useEffect()` com `createScope({ root })`. Toda instância criada
dentro do Scope deve ser revertida no cleanup:

```tsx
useEffect(() => {
  const scope = createScope({
    root,
    mediaQueries: {
      reduceMotion: '(prefers-reduced-motion: reduce)',
      coarsePointer: '(pointer: coarse)',
    },
  }).add(({ matches }) => {
    if (matches.reduceMotion) {
      utils.set('[data-item]', { opacity: 1, x: 0 })
      return
    }

    animate('[data-item]', {
      opacity: [0, 1],
      x: matches.coarsePointer ? 0 : [20, 0],
      delay: stagger(70),
    })
  })

  return () => scope.revert()
}, [])
```

`scope.revert()` destrói as instâncias declaradas no escopo e restaura os
valores. Para uma instância isolada, `animation.revert()` cancela, limpa estilos
inline e também reverte um ScrollObserver vinculado.

## Movimento reduzido

Definir a media query no Scope:

```ts
createScope({
  mediaQueries: {
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
})
```

O estado reduzido deve:

- manter o conteúdo no estado final;
- evitar loops, scrubbing e deslocamentos;
- evitar duração artificial apenas para preservar callbacks;
- continuar oferecendo a mesma navegação e interação.

## Timeline e stagger

```ts
const timeline = createTimeline({
  defaults: { duration: 600, ease: 'out(3)' },
})

timeline
  .label('start')
  .add('[data-title]', { opacity: [0, 1], y: [18, 0] }, 'start')
  .add(
    '[data-item]',
    { opacity: [0, 1], y: [12, 0], delay: stagger(60) },
    '<+=120',
  )
```

Usar labels e posições relativas para expressar intenção. Evitar números
absolutos espalhados sem relação semântica.

## Scroll

`onScroll()` pode ser usado diretamente no `autoplay`:

```ts
animate(target, {
  x: 100,
  autoplay: onScroll({
    target,
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
  }),
})
```

Usar somente quando a animação precisa acompanhar o progresso. Reverter a
animação ou o Scope no cleanup. Não adicionar um segundo sistema de scroll se o
projeto já possui um observer suficiente.

## Manutenção de estilos

- `utils.set()` aplica valores imediatamente.
- `utils.cleanInlineStyles(instance)` remove estilos inline adicionados pela
  instância.
- `utils.remove(targets, instance?, propertyName?)` remove alvos de animações.
- `revert()` deve ser a primeira opção para destruir e restaurar.

## Armadilhas de migração v3 para v4

- Não usar default import `anime`.
- Substituir `anime({...})` por `animate(targets, parameters)`.
- Substituir `anime.timeline()` por `createTimeline()`.
- Substituir `anime.stagger()` por `stagger()`.
- Não copiar exemplos v3 sem confrontar parâmetros, easings e métodos com a
  documentação v4.

## Fontes oficiais

- Instalação: https://animejs.com/documentation/getting-started/installation/
- Imports: https://animejs.com/documentation/getting-started/module-imports/
- React: https://animejs.com/documentation/getting-started/using-with-react/
- Animation: https://animejs.com/documentation/animation/
- Timeline: https://animejs.com/documentation/timeline/
- Scope: https://animejs.com/documentation/scope/
- WAAPI: https://animejs.com/documentation/web-animation-api/when-to-use-waapi/
- Scroll: https://animejs.com/documentation/events/onscroll/
- Cleanup: https://animejs.com/documentation/animation/animation-methods/revert/
