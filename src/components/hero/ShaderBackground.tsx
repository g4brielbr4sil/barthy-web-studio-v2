import {
  useEffect,
  useState,
  type ComponentType,
} from 'react'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'
import { ShaderErrorBoundary } from './ShaderErrorBoundary'

interface ShaderSurfaceProps {
  onReady: () => void
  onFailure: (reason: string) => void
}

export function ShaderBackground({ active }: { active: boolean }) {
  const [ShaderSurface, setShaderSurface] =
    useState<ComponentType<ShaderSurfaceProps> | null>(null)
  const {
    canAttemptShader,
    shaderStatus,
    markShaderLoading,
    markShaderReady,
    markShaderFailed,
  } = useVisualCapabilities()
  const shouldLoad = active && canAttemptShader && shaderStatus !== 'failed'
  const shouldKeepMounted =
    canAttemptShader &&
    shaderStatus !== 'failed' &&
    (active || shaderStatus === 'ready')

  useEffect(() => {
    if (!shouldLoad || ShaderSurface) return

    let active = true
    if (shaderStatus === 'idle') markShaderLoading()

    void import('./ShaderSurface')
      .then((module) => {
        if (active) setShaderSurface(() => module.default)
      })
      .catch((error: unknown) => {
        if (!active) return
        const reason =
          error instanceof Error
            ? error.message
            : 'Falha ao carregar o módulo do shader.'
        markShaderFailed(reason)
      })

    return () => {
      active = false
    }
  }, [
    ShaderSurface,
    markShaderFailed,
    markShaderLoading,
    shaderStatus,
    shouldLoad,
  ])

  if (!shouldKeepMounted || !ShaderSurface) return null

  return (
    <div
      className={`hero-shader ${active ? 'is-active' : 'is-paused'}`}
      aria-hidden="true"
    >
      <ShaderErrorBoundary onError={markShaderFailed}>
        <ShaderSurface
          onReady={markShaderReady}
          onFailure={markShaderFailed}
        />
      </ShaderErrorBoundary>
    </div>
  )
}
