import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  detectBackdropFilter,
  detectSaveData,
  detectWebGpu,
  getNetworkInformation,
} from './capabilities'
import type {
  SaveDataPreference,
  ShaderStatus,
  VisualCapabilities,
  VisualMode,
  VisualProfile,
  WebGpuCapability,
} from './visual-mode'

interface VisualCapabilitiesContextValue extends VisualCapabilities {
  markShaderLoading: () => void
  markShaderReady: () => void
  markShaderFailed: (reason?: string) => void
}
const VisualCapabilitiesContext =
  createContext<VisualCapabilitiesContextValue | null>(null)

/**
 * Same composition, four cost tiers — never a breakpoint decision.
 * - full: capable device, fine pointer, no save-data → full shader (all layers)
 * - balanced: capable device but coarse pointer (tablet/touch laptop) → shader
 *   with pointer-reactive layers dropped
 * - lite: no WebGPU, save-data, or shader failed → CSS-motion fallback
 * - static: prefers-reduced-motion → no animation, same composition frozen
 */
function resolveVisualProfile(
  reducedMotion: boolean,
  saveData: SaveDataPreference,
  webGpu: WebGpuCapability,
  pointerFine: boolean,
): VisualProfile {
  if (reducedMotion) return 'static'
  if (saveData === 'active' || webGpu === 'unavailable') return 'lite'
  return pointerFine ? 'full' : 'balanced'
}

function resolveVisualMode(
  profile: VisualProfile,
  shaderStatus: ShaderStatus,
): VisualMode {
  if (profile === 'static') return 'static'
  if (
    (profile === 'full' || profile === 'balanced') &&
    shaderStatus === 'ready'
  ) {
    return 'shader'
  }
  return 'css-motion'
}

export function VisualCapabilitiesProvider({
  children,
}: {
  children: ReactNode
}) {
  const reducedMotion = useReducedMotion()
  const pointerFine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [webGpu] = useState(detectWebGpu)
  const [backdrop] = useState(detectBackdropFilter)
  const [saveData, setSaveData] = useState(detectSaveData)
  const [shaderStatus, setShaderStatus] = useState<ShaderStatus>('idle')

  const pointer = pointerFine ? 'fine' : 'coarse'
  const profile = resolveVisualProfile(
    reducedMotion,
    saveData,
    webGpu,
    pointerFine,
  )
  const canAttemptShader = profile === 'full' || profile === 'balanced'
  const mode = resolveVisualMode(profile, shaderStatus)

  const markShaderLoading = useCallback(() => {
    setShaderStatus((current) =>
      current === 'idle' ? 'loading' : current,
    )
  }, [])

  const markShaderReady = useCallback(() => {
    setShaderStatus('ready')
  }, [])

  const markShaderFailed = useCallback((_reason?: string) => {
    setShaderStatus('failed')
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
    root.dataset.visualProfile = profile
    root.dataset.webgpu = webGpu
    root.dataset.backdrop = backdrop
    root.dataset.saveData = saveData

    return () => {
      delete root.dataset.visualMode
      delete root.dataset.visualProfile
      delete root.dataset.webgpu
      delete root.dataset.backdrop
      delete root.dataset.saveData
    }
  }, [backdrop, mode, profile, saveData, webGpu])

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
      profile,
      webGpu,
      backdrop,
      saveData,
      pointer,
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
      pointer,
      profile,
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
