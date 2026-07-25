import type {
  BackdropCapability,
  SaveDataPreference,
  WebGpuCapability,
} from './visual-mode'

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean
}

type NavigatorWithCapabilities = Navigator & {
  connection?: NetworkInformationLike
  mozConnection?: NetworkInformationLike
  webkitConnection?: NetworkInformationLike
}

interface WebGpuLike {
  requestAdapter: (options?: {
    powerPreference?: 'low-power' | 'high-performance'
  }) => Promise<unknown | null>
}

function getWebGpu(): WebGpuLike | null {
  if (typeof navigator === 'undefined') return null
  const gpu = Reflect.get(navigator, 'gpu') as WebGpuLike | undefined
  return gpu?.requestAdapter ? gpu : null
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
  return getWebGpu() ? 'checking' : 'unavailable'
}

export async function verifyWebGpu(): Promise<WebGpuCapability> {
  if (typeof navigator === 'undefined') return 'unavailable'

  const gpu = getWebGpu()
  if (!gpu) return 'unavailable'

  let timeoutId = 0
  try {
    const adapter = await Promise.race([
      gpu.requestAdapter({
        powerPreference: 'low-power',
      }),
      new Promise<null>((resolve) => {
        timeoutId = window.setTimeout(() => resolve(null), 1600)
      }),
    ])
    return adapter ? 'available' : 'unavailable'
  } catch {
    return 'unavailable'
  } finally {
    window.clearTimeout(timeoutId)
  }
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
