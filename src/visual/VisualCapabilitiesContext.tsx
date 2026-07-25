import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  detectBackdropFilter,
  detectSaveData,
  detectWebGpu,
  getNetworkInformation,
} from './capabilities'
import type {
  ShaderStatus,
  VisualCapabilities,
  VisualMode,
} from './visual-mode'

interface VisualCapabilitiesContextValue extends VisualCapabilities {
  markShaderLoading: () => void
  markShaderReady: () => void
  markShaderFailed: (reason?: string) => void
}
const VisualCapabilitiesContext =
  createContext<VisualCapabilitiesContextValue | null>(null)

function resolveVisualMode(
  reducedMotion: boolean,
  canAttemptShader: boolean,
  shaderStatus: ShaderStatus,
): VisualMode {
  if (reducedMotion) return 'static'
  if (canAttemptShader && shaderStatus === 'ready') return 'shader'
  return 'css-motion'
}

export function VisualCapabilitiesProvider({
  children,
}: {
  children: ReactNode
}) {
  const reducedMotion = useReducedMotion()
  const [webGpu] = useState(detectWebGpu)
  const [backdrop] = useState(detectBackdropFilter)
  const [saveData, setSaveData] = useState(detectSaveData)
  const [shaderStatus, setShaderStatus] = useState<ShaderStatus>('idle')
  const reportedFailureRef = useRef(false)

  const canAttemptShader =
    !reducedMotion && saveData === 'inactive' && webGpu === 'available'
  const mode = resolveVisualMode(
    reducedMotion,
    canAttemptShader,
    shaderStatus,
  )

  const markShaderLoading = useCallback(() => {
    setShaderStatus((current) =>
      current === 'idle' ? 'loading' : current,
    )
  }, [])

  const markShaderReady = useCallback(() => {
    setShaderStatus('ready')
  }, [])

  const markShaderFailed = useCallback((reason?: string) => {
    setShaderStatus('failed')

    if (import.meta.env.DEV && !reportedFailureRef.current) {
      reportedFailureRef.current = true
      console.info(
        '[Barthy Visual] Shader indisponível. Usando fallback CSS.',
        reason ?? 'Falha não detalhada.',
      )
    }
  }, [])

  useEffect(() => {
    const connection = getNetworkInformation()
    if (!connection) return

    const updateSaveData = () => setSaveData(detectSaveData())
    connection.addEventListener('change', updateSaveData)
    return () => connection.removeEventListener('change', updateSaveData)
  }, [])

  useEffect(() => {
    if (!canAttemptShader && shaderStatus !== 'failed') {
      setShaderStatus('idle')
    }
  }, [canAttemptShader, shaderStatus])

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.visualMode = mode
    root.dataset.webgpu = webGpu
    root.dataset.backdrop = backdrop
    root.dataset.saveData = saveData

    return () => {
      delete root.dataset.visualMode
      delete root.dataset.webgpu
      delete root.dataset.backdrop
      delete root.dataset.saveData
    }
  }, [backdrop, mode, saveData, webGpu])

  useEffect(() => {
    const root = document.documentElement
    if (reducedMotion) {
      delete root.dataset.motionReady
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      root.dataset.motionReady = 'true'
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      delete root.dataset.motionReady
    }
  }, [reducedMotion])

  const value = useMemo<VisualCapabilitiesContextValue>(
    () => ({
      mode,
      webGpu,
      backdrop,
      saveData,
      reducedMotion,
      shaderStatus,
      canAttemptShader,
      markShaderLoading,
      markShaderReady,
      markShaderFailed,
    }),
    [
      backdrop,
      canAttemptShader,
      markShaderFailed,
      markShaderLoading,
      markShaderReady,
      mode,
      reducedMotion,
      saveData,
      shaderStatus,
      webGpu,
    ],
  )

  return (
    <VisualCapabilitiesContext.Provider value={value}>
      {children}
    </VisualCapabilitiesContext.Provider>
  )
}

export function useVisualCapabilities(): VisualCapabilitiesContextValue {
  const context = useContext(VisualCapabilitiesContext)
  if (!context) {
    throw new Error(
      'useVisualCapabilities deve ser usado dentro de VisualCapabilitiesProvider.',
    )
  }
  return context
}
