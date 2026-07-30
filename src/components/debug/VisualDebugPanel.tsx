import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useVisualCapabilities } from '../../hooks/useVisualCapabilities'

interface ViewportSnapshot {
  width: number
  height: number
  dpr: number
  canvases: number
}

function getViewportSnapshot(): ViewportSnapshot {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
    canvases: document.querySelectorAll('canvas').length,
  }
}

function isVisualDebugEnabled(): boolean {
  return new URLSearchParams(window.location.search).get('visual-debug') === '1'
}

function VisualDebugPanelContent() {
  const [open, setOpen] = useState(true)
  const [viewport, setViewport] = useState(getViewportSnapshot)
  const coarsePointer = useMediaQuery('(pointer: coarse)')
  const finePointer = useMediaQuery('(pointer: fine)')
  const {
    mode,
    webGpu,
    backdrop,
    saveData,
    reducedMotion,
    shaderStatus,
  } = useVisualCapabilities()

  useEffect(() => {
    let animationFrame = 0
    const update = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        setViewport(getViewportSnapshot())
      })
    }

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', update)
    }
  }, [shaderStatus])

  if (!open) return null

  const pointer = coarsePointer ? 'coarse' : finePointer ? 'fine' : 'indefinido'

  return (
    <aside className="visual-debug" aria-label="Diagnóstico visual">
      <div className="visual-debug__header">
        <strong>Visual debug</strong>
        <button
          type="button"
          aria-label="Fechar diagnóstico visual"
          onClick={() => setOpen(false)}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <dl>
        <div>
          <dt>Viewport</dt>
          <dd>{viewport.width} × {viewport.height}</dd>
        </div>
        <div>
          <dt>DPR</dt>
          <dd>{viewport.dpr.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Visual mode</dt>
          <dd>{mode}</dd>
        </div>
        <div>
          <dt>WebGPU</dt>
          <dd>{webGpu}</dd>
        </div>
        <div>
          <dt>Shader</dt>
          <dd>{shaderStatus}</dd>
        </div>
        <div>
          <dt>Reduced motion</dt>
          <dd>{reducedMotion ? 'reduce' : 'no-preference'}</dd>
        </div>
        <div>
          <dt>Save Data</dt>
          <dd>{saveData}</dd>
        </div>
        <div>
          <dt>Pointer</dt>
          <dd>{pointer}</dd>
        </div>
        <div>
          <dt>Backdrop filter</dt>
          <dd>{backdrop}</dd>
        </div>
        <div>
          <dt>Canvas</dt>
          <dd>{viewport.canvases}</dd>
        </div>
      </dl>
    </aside>
  )
}

export function VisualDebugPanel() {
  return isVisualDebugEnabled() ? <VisualDebugPanelContent /> : null
}
