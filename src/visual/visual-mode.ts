export type VisualMode = 'shader' | 'css-motion' | 'static'

/**
 * Capability-driven visual profile (not breakpoint-driven).
 * FULL/BALANCED/LITE/STATIC always share the same choreography (trajectory,
 * duration, scale, shape count) — only rendering cost and tonal intensity differ.
 */
export type VisualProfile = 'full' | 'balanced' | 'lite' | 'static'

export type WebGpuCapability = 'available' | 'unavailable'
export type BackdropCapability = 'available' | 'fallback'
export type SaveDataPreference = 'active' | 'inactive'
export type PointerCapability = 'fine' | 'coarse'
export type ShaderStatus = 'idle' | 'loading' | 'ready' | 'failed'

export interface VisualCapabilities {
  mode: VisualMode
  profile: VisualProfile
  webGpu: WebGpuCapability
  backdrop: BackdropCapability
  saveData: SaveDataPreference
  pointer: PointerCapability
  reducedMotion: boolean
  shaderStatus: ShaderStatus
  canAttemptShader: boolean
}
