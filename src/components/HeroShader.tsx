import { useEffect, useState } from 'react'
import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from 'shaders/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme, type Theme } from '../theme/ThemeContext'

type NavigatorWithGpu = Navigator & { gpu?: unknown }

const shaderPalettes: Record<
  Theme,
  {
    swirlA: string
    swirlB: string
    base: string
    down: string
    left: string
    right: string
    up: string
  }
> = {
  light: {
    swirlA: '#F6FAFD',
    swirlB: '#B3CFE5',
    base: '#F6FAFD',
    down: '#1A3D63',
    left: '#B3CFE5',
    right: '#4A7FA7',
    up: '#CD765D',
  },
  dark: {
    swirlA: '#0A1931',
    swirlB: '#1A3D63',
    base: '#111C2C',
    down: '#111C2C',
    left: '#1A3D63',
    right: '#4A7FA7',
    up: '#CD765D',
  },
}

export default function HeroShader() {
  const reducedMotion = useReducedMotion()
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
      className={`hero-shader__canvas ${ready ? 'is-ready' : ''}`}
      colorSpace="srgb"
      toneMapping="neutral"
      disableTelemetry
      aria-hidden="true"
    >
      <Swirl
        colorA={palette.swirlA}
        colorB={palette.swirlB}
        detail={2.1}
        speed={0.42}
        blend={62}
        colorSpace="oklab"
      />
      <ChromaFlow
        baseColor={palette.base}
        downColor={palette.down}
        leftColor={palette.left}
        rightColor={palette.right}
        upColor={palette.up}
        momentum={18}
        radius={4.2}
        intensity={0.78}
        opacity={theme === 'dark' ? 0.62 : 0.36}
      />
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
