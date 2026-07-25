import { createScope } from 'animejs/scope'
import { waapi } from 'animejs/waapi'
import type { RevealVariant } from '../components/ui/SectionReveal'

interface EditorialRevealOptions {
  root: HTMLElement
  targets: HTMLElement[]
  variant: RevealVariant
  coarsePointer: boolean
  onComplete: () => void
  onFailure: () => void
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

const revealPresets: Record<
  RevealVariant,
  { distance: number; duration: number; interval: number }
> = {
  heading: { distance: 14, duration: 540, interval: 55 },
  content: { distance: 16, duration: 560, interval: 60 },
  card: { distance: 18, duration: 620, interval: 70 },
  list: { distance: 14, duration: 520, interval: 55 },
  form: { distance: 12, duration: 500, interval: 50 },
  footer: { distance: 10, duration: 460, interval: 45 },
}

export function revealEditorialGroup({
  root,
  targets,
  variant,
  coarsePointer,
  onComplete,
  onFailure,
}: EditorialRevealOptions): () => void {
  const preset = revealPresets[variant]
  const distance = coarsePointer
    ? Math.max(8, Math.round(preset.distance * 0.68))
    : preset.distance
  const interval = coarsePointer
    ? Math.max(35, Math.round(preset.interval * 0.72))
    : preset.interval
  const duration = coarsePointer
    ? Math.max(380, preset.duration - 80)
    : preset.duration
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
        duration,
        delay: (_target, index) => index * interval,
        ease: 'out(3)',
        onComplete: (animation) => {
          animation.revert()
          restoreInlineMotionStyles(initialStyles)
          onComplete()
        },
      })
    })
  } catch {
    scope.revert()
    restoreInlineMotionStyles(initialStyles)
    onFailure()
    return () => undefined
  }

  return () => {
    scope.revert()
    restoreInlineMotionStyles(initialStyles)
  }
}
