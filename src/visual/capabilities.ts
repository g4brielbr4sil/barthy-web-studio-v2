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

export function detectWebGpu(): WebGpuCapability {
  if (typeof navigator === 'undefined') return 'unavailable'
  return 'gpu' in navigator && Boolean(navigator.gpu)
    ? 'available'
    : 'unavailable'
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
