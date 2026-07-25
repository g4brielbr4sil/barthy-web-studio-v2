import { createScope } from 'animejs/scope'
import { waapi } from 'animejs/waapi'

interface EditorialRevealOptions {
  root: HTMLElement
  targets: HTMLElement[]
  coarsePointer: boolean
}

interface InlineMotionStyle {
  target: HTMLElement
  opacity: string
  opacityPriority: string
  transform: string
  transformPriority: string
}

function restoreInlineMotionStyles(styles: InlineMotionStyle[]) {
  styles.forEach(({
    target,
    opacity,
    opacityPriority,
    transform,
    transformPriority,
  }) => {
    if (opacity) {
      target.style.setProperty('opacity', opacity, opacityPriority)
    } else {
      target.style.removeProperty('opacity')
    }

    if (transform) {
      target.style.setProperty('transform', transform, transformPriority)
    } else {
      target.style.removeProperty('transform')
    }
  })
}

export function revealEditorialGroup({
  root,
  targets,
  coarsePointer,
}: EditorialRevealOptions): () => void {
  const distance = coarsePointer ? 10 : 16
  const interval = coarsePointer ? 45 : 65
  const scope = createScope({ root })
  const initialStyles = targets.map((target) => ({
    target,
    opacity: target.style.getPropertyValue('opacity'),
    opacityPriority: target.style.getPropertyPriority('opacity'),
    transform: target.style.getPropertyValue('transform'),
    transformPriority: target.style.getPropertyPriority('transform'),
  }))

  try {
    scope.execute(() => {
      waapi.animate(targets, {
        opacity: [0, 1],
        transform: [
          `translate3d(0, ${distance}px, 0)`,
          'translate3d(0, 0, 0)',
        ],
        duration: 560,
        delay: (_target, index) => index * interval,
        ease: 'out(3)',
        onComplete: (animation) => {
          animation.revert()
          restoreInlineMotionStyles(initialStyles)
        },
      })
    })
  } catch {
    scope.revert()
    restoreInlineMotionStyles(initialStyles)
    return () => undefined
  }

  return () => {
    scope.revert()
    restoreInlineMotionStyles(initialStyles)
  }
}
