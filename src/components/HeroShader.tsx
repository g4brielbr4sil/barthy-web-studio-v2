import { useEffect, useState } from 'react'
import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  RadialGradient,
  Shader,
  Swirl,
} from 'shaders/react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme, type Theme } from '../theme/ThemeContext'

type NavigatorWithGpu = Navigator & { gpu?: unknown }

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

export default function HeroShader() {
  const reducedMotion = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const { theme } = useTheme()
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState !== 'hidden',
  )
  const [ready, setReady] = useState(false)
  const hasWebGpu = Boolean((navigator as NavigatorWithGpu).gpu)
  const palette = shaderPalettes[theme]

  useEffect(() => {
    const onVisibilityChange = () =>
      setPageVisible(document.visibilityState !== 'hidden')

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (!hasWebGpu && import.meta.env.DEV) {
      console.info(
        '[Barthy V2] WebGPU não está disponível. Usando o fallback visual.',
      )
    }
  }, [hasWebGpu])

  useEffect(() => {
    if (reducedMotion || !pageVisible || !hasWebGpu) {
      setReady(false)
      return
    }

    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setReady(true))
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [hasWebGpu, pageVisible, reducedMotion])

  if (reducedMotion || !pageVisible || !hasWebGpu) return null

  return (
    <Shader
      className={`hero-shader__canvas ${ready ? 'is-ready' : ''} ${
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
            opacity={theme === 'dark' ? 0.68 : 0.56}
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
            opacity={theme === 'dark' ? 0.28 : 0.22}
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
  )
}
