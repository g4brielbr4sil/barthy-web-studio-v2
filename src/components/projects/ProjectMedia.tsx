import type { CSSProperties } from 'react'
import type { Project, ProjectScreen } from '../../data/projects'
import { useInView } from '../../hooks/useInView'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'

const layerRoles = ['protagonist', 'second', 'third'] as const

/** Crop fractions become CSS variables; projects.css applies them on mobile only. */
function cropStyle(screen: ProjectScreen): CSSProperties | undefined {
  const crop = screen.mobileCrop
  if (!crop) return undefined
  return {
    '--crop-x': crop.x,
    '--crop-y': crop.y,
    '--crop-w': crop.w,
  } as CSSProperties
}

export function ProjectMedia({ project }: { project: Project }) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    rootMargin: '120px',
    threshold: 0.18,
  })
  const { reducedMotion } = useVisualCapabilities()

  return (
    <div
      ref={ref}
      className="project-media"
      // Reduced motion shows the settled composition right away; the pose
      // change is a transform, so it applies without the travel.
      data-active={isInView || reducedMotion}
      role="img"
      aria-label={project.alt}
    >
      <div className={`project-visual showcase showcase--${project.variant}`}>
        {project.visual.screens.map((screen, index) => (
          <div
            key={layerRoles[index]}
            className={`showcase-layer showcase-layer--${layerRoles[index]}`}
            data-cropped={screen.mobileCrop ? 'true' : undefined}
            style={cropStyle(screen)}
          >
            <img
              src={screen.image.src}
              srcSet={screen.image.srcSet}
              sizes={screen.sizes}
              width={screen.image.width}
              height={screen.image.height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
