import type { CSSProperties } from 'react'
import type {
  CompositionVisual,
  Project,
  ProjectImage,
  ScreenVisual,
} from '../../data/projects'
import { useInView } from '../../hooks/useInView'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'

function ProjectPicture({
  image,
  sizes,
  className,
  style,
}: {
  image: ProjectImage
  sizes: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <img
      className={className}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt=""
      loading="lazy"
      decoding="async"
      style={style}
    />
  )
}

/** BWS Digital: home in front, second page behind, cropped form in front-right. */
function DigitalComposition({ visual }: { visual: CompositionVisual }) {
  return (
    <div className="project-visual digital-composition">
      <div className="digital-layer digital-layer--secondary">
        <ProjectPicture
          image={visual.secondary}
          sizes="(max-width: 767px) 66vw, (max-width: 1179px) 56vw, 520px"
        />
      </div>
      <div className="digital-layer digital-layer--primary">
        <ProjectPicture
          image={visual.primary}
          sizes="(max-width: 767px) 82vw, (max-width: 1179px) 72vw, 680px"
        />
      </div>
      <div className="digital-layer digital-layer--detail">
        <ProjectPicture
          image={visual.detail}
          sizes="(max-width: 767px) 50vw, (max-width: 1179px) 34vw, 310px"
        />
      </div>
    </div>
  )
}

/** BWS Sistemas / BWS Automação: a single product screen in its own viewport. */
function ProductScreen({ visual }: { visual: ScreenVisual }) {
  return (
    <div className="project-visual product-viewport">
      <ProjectPicture
        image={visual.image}
        sizes="(max-width: 899px) 94vw, (max-width: 1179px) 46vw, 660px"
        style={
          visual.focus
            ? ({ '--project-focus': visual.focus } as CSSProperties)
            : undefined
        }
      />
    </div>
  )
}

export function ProjectMedia({ project }: { project: Project }) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    rootMargin: '120px',
    threshold: 0.18,
  })
  const { reducedMotion } = useVisualCapabilities()
  const { visual } = project
  const pending = visual.kind === 'pending'

  return (
    <div
      ref={ref}
      className="project-media"
      // Reduced motion shows the settled pose right away; the pose change is
      // a transform, so it applies without the travel.
      data-active={isInView || reducedMotion}
      {...(pending
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': project.alt })}
    >
      {visual.kind === 'composition' && (
        <DigitalComposition visual={visual} />
      )}
      {visual.kind === 'screen' && <ProductScreen visual={visual} />}
      {pending && (
        // asset pending: neutral surface sized for the final 16:10 screen.
        <div
          className="project-visual product-viewport product-viewport--pending"
          data-asset="pending"
        />
      )}
    </div>
  )
}
