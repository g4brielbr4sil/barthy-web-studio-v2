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

export function ShaderBackground() {
  const [ShaderSurface, setShaderSurface] =
    useState<ComponentType<ShaderSurfaceProps> | null>(null)
  const {
    canAttemptShader,
    shaderStatus,
    markShaderLoading,
    markShaderReady,
    markShaderFailed,
  } = useVisualCapabilities()
  const shouldMount =
    canAttemptShader && shaderStatus !== 'failed'

  useEffect(() => {
    if (!shouldMount || ShaderSurface) return

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
    shouldMount,
  ])

  if (!shouldMount || !ShaderSurface) return null

  return (
    <div className="hero-shader" aria-hidden="true">
      <ShaderErrorBoundary onError={markShaderFailed}>
        <ShaderSurface
          onReady={markShaderReady}
          onFailure={markShaderFailed}
        />
      </ShaderErrorBoundary>
    </div>
  )
}
