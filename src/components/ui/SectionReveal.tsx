import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { useEffect, useRef } from 'react'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'
import { observeIntersection } from '../../lib/intersectionObserver'

interface SectionRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  as?: ElementType
}

type EditorialRevealModule =
  typeof import('../../motion/editorialReveal')

let editorialRevealModule: Promise<EditorialRevealModule | null> | null = null

function loadEditorialReveal(): Promise<EditorialRevealModule | null> {
  editorialRevealModule ??= import('../../motion/editorialReveal').catch(
    () => null,
  )
  return editorialRevealModule
}

export function SectionReveal({
  children,
  as: Component = 'div',
  className = '',
  ...props
}: SectionRevealProps) {
  const rootRef = useRef<HTMLElement>(null)
  const hasRevealedRef = useRef(false)
  const { reducedMotion } = useVisualCapabilities()

  useEffect(() => {
    const root = rootRef.current
    if (
      reducedMotion ||
      hasRevealedRef.current ||
      !root ||
      !('IntersectionObserver' in window)
    ) {
      return
    }

    const targets = Array.from(root.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    )
    if (targets.length === 0) return

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    let disposed = false
    let cleanupAnimation: (() => void) | undefined
    let stopObserving: () => void = () => undefined
    const revealModule = loadEditorialReveal()

    stopObserving = observeIntersection(
      root,
      (entry) => {
        if (!entry.isIntersecting || hasRevealedRef.current) return

        hasRevealedRef.current = true
        stopObserving()

        void revealModule
          .then((module) => {
            if (disposed || !module) return

            cleanupAnimation = module.revealEditorialGroup({
              root,
              targets,
              coarsePointer,
            })
          })
          .catch(() => undefined)
      },
      {
        rootMargin: coarsePointer
          ? '18% 0px 18% 0px'
          : '8% 0px 8% 0px',
        threshold: coarsePointer ? 0.01 : 0.05,
      },
    )

    return () => {
      disposed = true
      stopObserving()
      cleanupAnimation?.()
    }
  }, [reducedMotion])

  return (
    <Component
      ref={rootRef}
      className={`section-reveal ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
