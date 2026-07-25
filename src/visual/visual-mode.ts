export type VisualMode = 'shader' | 'css-motion' | 'static'

export type WebGpuCapability = 'checking' | 'available' | 'unavailable'
export type BackdropCapability = 'available' | 'fallback'
export type SaveDataPreference = 'active' | 'inactive'
export type ShaderStatus = 'idle' | 'loading' | 'ready' | 'failed'

export interface VisualCapabilities {
  mode: VisualMode
  webGpu: WebGpuCapability
  backdrop: BackdropCapability
  saveData: SaveDataPreference
  reducedMotion: boolean
  shaderStatus: ShaderStatus
  canAttemptShader: boolean
}
