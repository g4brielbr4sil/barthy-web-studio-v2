import type {
  BackdropCapability,
  SaveDataPreference,
  WebGpuCapability,
} from './visual-mode'

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean
}

interface NavigatorWithCapabilities extends Navigator {
  connection?: NetworkInformationLike
  mozConnection?: NetworkInformationLike
  webkitConnection?: NetworkInformationLike
}

let webGpuDetection: Promise<WebGpuCapability> | null = null

export function getNetworkInformation(): NetworkInformationLike | null {
  if (typeof navigator === 'undefined') return null

  const navigatorWithCapabilities = navigator as NavigatorWithCapabilities
  return (
    navigatorWithCapabilities.connection ??
    navigatorWithCapabilities.mozConnection ??
    navigatorWithCapabilities.webkitConnection ??
    null
  )
}

export function detectSaveData(): SaveDataPreference {
  return getNetworkInformation()?.saveData ? 'active' : 'inactive'
}

function getGpuApi(): GPU | null {
  if (typeof navigator === 'undefined') return null
  return 'gpu' in navigator && navigator.gpu ? navigator.gpu : null
}

export function getInitialWebGpuCapability(): WebGpuCapability {
  return getGpuApi() ? 'checking' : 'unavailable'
}

export function detectWebGpu(): Promise<WebGpuCapability> {
  webGpuDetection ??= (async () => {
    const gpu = getGpuApi()
    if (!gpu) return 'unavailable'

    try {
      return (await gpu.requestAdapter()) ? 'available' : 'unavailable'
    } catch {
      return 'unavailable'
    }
  })()

  return webGpuDetection
}

export function detectBackdropFilter(): BackdropCapability {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return 'fallback'
  }

  const supported =
    CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)')

  return supported ? 'available' : 'fallback'
}
