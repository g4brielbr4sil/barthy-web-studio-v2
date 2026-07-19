import { useEffect, useRef, type ReactNode } from 'react'
import type { ProjectVisualKind } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { HermesVisual } from './HermesVisual'
import { LevensVisual } from './LevensVisual'
import { PnqcVisual } from './PnqcVisual'

interface ProjectMediaProps {
  kind: ProjectVisualKind
  label: string
  videoSrc?: string
  posterSrc?: string
}

const visuals: Record<ProjectVisualKind, ReactNode> = {
  levens: <LevensVisual />,
  pnqc: <PnqcVisual />,
  hermes: <HermesVisual />,
}

export function ProjectMedia({
  kind,
  label,
  videoSrc,
  posterSrc,
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, isInView } = useInView<HTMLDivElement>({
    rootMargin: '120px',
    threshold: 0.18,
  })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return

    if (isInView) {
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [isInView, reducedMotion])

  return (
    <div
      ref={ref}
      className="project-media"
      data-active={isInView && !reducedMotion}
      role="img"
      aria-label={label}
    >
      {videoSrc && !reducedMotion ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : posterSrc && reducedMotion ? (
        <img src={posterSrc} alt="" loading="lazy" decoding="async" />
      ) : (
        visuals[kind]
      )}
    </div>
  )
}
