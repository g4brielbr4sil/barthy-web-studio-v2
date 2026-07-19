import { useEffect, useState } from 'react'
import {
  ChromaFlow,
  FilmGrain,
  FlutedGlass,
  Shader,
  Swirl,
} from 'shaders/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type NavigatorWithGpu = Navigator & { gpu?: unknown }

export default function HeroShader() {
  const reducedMotion = useReducedMotion()
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState !== 'hidden',
  )
  const hasWebGpu = Boolean((navigator as NavigatorWithGpu).gpu)

  useEffect(() => {
    const onVisibilityChange = () =>
      setPageVisible(document.visibilityState !== 'hidden')

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  if (reducedMotion || !pageVisible || !hasWebGpu) return null

  return (
    <Shader
      className="hero-shader__canvas"
      colorSpace="srgb"
      toneMapping="neutral"
      disableTelemetry
      aria-hidden="true"
    >
      <Swirl
        colorA="#F6FAFD"
        colorB="#EAF1F7"
        detail={1.7}
        speed={0.12}
        blend={44}
        colorSpace="oklab"
      />
      <ChromaFlow
        baseColor="#F6FAFD"
        downColor="#1A3D63"
        leftColor="#B3CFE5"
        rightColor="#4A7FA7"
        upColor="#CD765D"
        momentum={13}
        radius={3.5}
        intensity={0.65}
        opacity={0.14}
      />
      <FlutedGlass
        aberration={0.61}
        angle={31}
        frequency={8}
        highlight={0.12}
        highlightSoftness={0}
        lightAngle={-90}
        refraction={4}
        shape="rounded"
        softness={1}
        speed={0.15}
        opacity={0.22}
      />
      <FilmGrain strength={0.05} bias={1} animated={false} opacity={0.42} />
    </Shader>
  )
}
