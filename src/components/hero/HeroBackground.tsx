import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'
import { CssMotionBackground } from './CssMotionBackground'
import { ShaderBackground } from './ShaderBackground'
import { StaticBackground } from './StaticBackground'

export function HeroBackground({ active }: { active: boolean }) {
  const { mode } = useVisualCapabilities()

  return (
    <div className="hero__background" data-mode={mode} aria-hidden="true">
      <StaticBackground />
      <CssMotionBackground />
      <ShaderBackground active={active} />
      <div className="hero__contrast-overlay" />
    </div>
  )
}
