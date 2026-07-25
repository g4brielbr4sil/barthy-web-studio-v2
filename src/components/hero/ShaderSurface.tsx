import { useEffect, useRef, useState } from 'react'
import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  RadialGradient,
  Shader,
  Swirl,
} from 'shaders/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useTheme, type Theme } from '../../theme/ThemeContext'

interface ShaderSurfaceProps {
  onLoading: () => void
  onReady: () => void
  onFailure: (reason: string) => void
}
const shaderPalettes: Record<
  Theme,
  {
    swirlA: string
    swirlB: string
    base: string
    left: string
    right: string
    up: string
  }
> = {
  light: {
    swirlA: '#F6FAFD',
    swirlB: '#B3CFE5',
    base: '#F6FAFD',
    left: '#B3CFE5',
    right: '#4A7FA7',
    up: '#CD765D',
  },
  dark: {
    swirlA: '#0A1931',
    swirlB: '#1A3D63',
    base: '#111C2C',
    left: '#1A3D63',
    right: '#4A7FA7',
    up: '#CD765D',
  },
}

export default function ShaderSurface({
  onLoading,
  onReady,
  onFailure,
}: ShaderSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const { theme } = useTheme()
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState !== 'hidden',
  )
  const palette = shaderPalettes[theme]

  useEffect(() => {
    const onVisibilityChange = () => {
      const visible = document.visibilityState !== 'hidden'
      if (!visible) {
        readyRef.current = false
        onLoading()
      }
      setPageVisible(visible)
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [onLoading])

  useEffect(() => {
    if (!pageVisible) return

    onLoading()
    let firstFrame = 0
    let secondFrame = 0
    let thirdFrame = 0
    let readinessTimeout = 0
    let canvas: HTMLCanvasElement | null = null

    const fail = (reason: string) => {
      if (readyRef.current) readyRef.current = false
      onFailure(reason)
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      fail('O contexto gráfico do shader foi perdido.')
    }

    const verifyRenderableCanvas = () => {
      canvas = surfaceRef.current?.querySelector('canvas') ?? null
      if (!canvas) return false

      const rect = canvas.getBoundingClientRect()
      if (
        canvas.width <= 0 ||
        canvas.height <= 0 ||
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return false
      }

      if (!readyRef.current) {
        readyRef.current = true
        canvas.addEventListener('contextlost', onContextLost)
        canvas.addEventListener('webglcontextlost', onContextLost)
        onReady()
      }
      return true
    }

    const verifyAfterLayout = () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
      window.cancelAnimationFrame(thirdFrame)
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          thirdFrame = window.requestAnimationFrame(() => {
            const wasReady = readyRef.current
            if (!verifyRenderableCanvas() && wasReady) {
              fail('O Canvas do shader não ficou renderizável.')
            }
          })
        })
      })
    }

    const canvasObserver = new MutationObserver(() => {
      if (!verifyRenderableCanvas()) return
      canvasObserver.disconnect()
    })
    if (surfaceRef.current) {
      canvasObserver.observe(surfaceRef.current, {
        childList: true,
        subtree: true,
      })
    }

    verifyAfterLayout()
    readinessTimeout = window.setTimeout(() => {
      if (!verifyRenderableCanvas()) {
        fail('O Canvas do shader não foi criado a tempo.')
      }
    }, 2200)

    window.addEventListener('orientationchange', verifyAfterLayout)
    window.addEventListener('resize', verifyAfterLayout, { passive: true })

    return () => {
      canvasObserver.disconnect()
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
      window.cancelAnimationFrame(thirdFrame)
      window.clearTimeout(readinessTimeout)
      window.removeEventListener('orientationchange', verifyAfterLayout)
      window.removeEventListener('resize', verifyAfterLayout)
      canvas?.removeEventListener('contextlost', onContextLost)
      canvas?.removeEventListener('webglcontextlost', onContextLost)
    }
  }, [onFailure, onLoading, onReady, pageVisible])

  if (!pageVisible) return null

  return (
    <div ref={surfaceRef} className="hero-shader__surface">
      <Shader
        className={`hero-shader__canvas ${
          finePointer ? 'is-pointer-reactive' : 'is-autonomous'
        }`}
        colorSpace="srgb"
        toneMapping="neutral"
        disableTelemetry
        aria-hidden="true"
      >
        <Swirl
          colorA={palette.swirlA}
          colorB={palette.swirlB}
          detail={{
            type: 'auto-animate',
            mode: 'ping-pong',
            outputMin: 1.75,
            outputMax: 2.65,
            speed: 0.018,
            easing: 'sine',
          }}
          speed={0.31}
          blend={{
            type: 'auto-animate',
            mode: 'ping-pong',
            outputMin: 52,
            outputMax: 68,
            speed: 0.011,
            easing: 'sine',
          }}
          colorSpace="oklab"
        />
        {finePointer && (
          <>
            <ChromaFlow
              baseColor={palette.base}
              downColor={palette.up}
              leftColor={palette.left}
              rightColor={palette.right}
              upColor={palette.up}
              momentum={32}
              radius={4.6}
              intensity={1.05}
              opacity={theme === 'dark' ? 0.68 : 0.72}
            />
            <RadialGradient
              colorA={palette.up}
              colorB={palette.base}
              center={{
                type: 'mouse-position',
                smoothing: 0.9,
                momentum: 0.08,
                reach: 0.42,
              }}
              radius={{
                type: 'auto-animate',
                mode: 'ping-pong',
                outputMin: 0.38,
                outputMax: 0.52,
                speed: 0.014,
                easing: 'sine',
              }}
              repeat={1}
              aspect={0.68}
              skewAngle={{
                type: 'auto-animate',
                mode: 'loop',
                outputMin: 0,
                outputMax: 360,
                speed: 0.006,
              }}
              colorSpace="oklab"
              opacity={theme === 'dark' ? 0.28 : 0.4}
            />
          </>
        )}
        <FlutedGlass
          aberration={0.48}
          angle={31}
          frequency={7}
          highlight={0.16}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={3.2}
          shape="rounded"
          softness={1}
          speed={0.32}
          opacity={theme === 'dark' ? 0.28 : 0.22}
        />
        <FilmGrain strength={0.035} bias={1} animated opacity={0.2} />
      </Shader>
    </div>
  )
}
