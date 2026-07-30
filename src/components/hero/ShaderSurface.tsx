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

function isDrawableCanvas(surface: HTMLDivElement | null): boolean {
  const canvas = surface?.querySelector('canvas')
  if (!canvas) return false

  const bounds = canvas.getBoundingClientRect()
  return (
    canvas.isConnected &&
    canvas.width > 0 &&
    canvas.height > 0 &&
    bounds.width > 0 &&
    bounds.height > 0
  )
}

export default function ShaderSurface({
  onReady,
  onFailure,
}: ShaderSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const { theme } = useTheme()
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState !== 'hidden',
  )
  const palette = shaderPalettes[theme]

  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(document.visibilityState !== 'hidden')
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (!pageVisible) return

    let settled = false
    let animationFrame = 0
    let readinessTimeout = 0
    const startedAt = window.performance.now()

    const finishReady = () => {
      if (settled) return
      settled = true
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(readinessTimeout)
      onReady()
    }

    const finishFailure = () => {
      if (settled) return
      settled = true
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(readinessTimeout)
      onFailure('O Canvas do shader não ficou pronto para renderização.')
    }

    const verifyCanvas = () => {
      if (settled) return

      const elapsed = window.performance.now() - startedAt
      if (elapsed >= 420 && isDrawableCanvas(surfaceRef.current)) {
        finishReady()
        return
      }

      animationFrame = window.requestAnimationFrame(verifyCanvas)
    }

    animationFrame = window.requestAnimationFrame(verifyCanvas)
    readinessTimeout = window.setTimeout(() => {
      if (isDrawableCanvas(surfaceRef.current)) {
        finishReady()
      } else {
        finishFailure()
      }
    }, 2200)

    return () => {
      settled = true
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(readinessTimeout)
    }
  }, [onFailure, onReady, pageVisible])

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
        <ChromaFlow
          baseColor={palette.base}
          downColor={palette.up}
          leftColor={palette.left}
          rightColor={palette.right}
          upColor={palette.up}
          momentum={finePointer ? 32 : 13}
          radius={finePointer ? 4.6 : 3.5}
          intensity={finePointer ? 1.05 : 0.9}
          opacity={
            theme === 'dark'
              ? finePointer
                ? 0.68
                : 0.62
              : finePointer
                ? 0.72
                : 0.68
          }
        />
        {finePointer && (
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
