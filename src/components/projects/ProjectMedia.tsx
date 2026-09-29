import type { ReactNode } from 'react'
import type { ProjectVisualKind } from '../../data/projects'
import { useInView } from '../../hooks/useInView'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'
import { HermesVisual } from './HermesVisual'
import { PnqcVisual } from './PnqcVisual'

interface ProjectMediaProps {
  kind: ProjectVisualKind
  label: string
}

const visuals: Record<ProjectVisualKind, ReactNode> = {
  pnqc: <PnqcVisual />,
  hermes: <HermesVisual />,
}

export function ProjectMedia({ kind, label }: ProjectMediaProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    rootMargin: '120px',
    threshold: 0.18,
  })
  const { reducedMotion } = useVisualCapabilities()

  return (
    <div
      ref={ref}
      className="project-media"
      // Reduced motion shows the settled pose right away; the pose change is
      // a transform, so it applies without the 700ms travel.
      data-active={isInView || reducedMotion}
      role="img"
      aria-label={label}
    >
      {visuals[kind]}
    </div>
  )
}
