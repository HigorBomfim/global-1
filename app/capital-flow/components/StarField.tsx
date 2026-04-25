'use client'

import { useMemo } from 'react'

type Star = {
  left: string
  top: string
  size: number
  opacity: number
  delay: number
  duration: number
  hue: number
}

export default function StarField({ count = 300 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, () => {
      const r = Math.random()
      // Most stars are tiny; a few are larger and brighter
      const size = r < 0.85 ? Math.random() * 1.2 + 0.3 : Math.random() * 2.2 + 1.2
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        opacity: Math.random() * 0.7 + 0.25,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        // 0..1 — slight blue/violet tint variation
        hue: Math.random(),
      }
    })
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => {
        const tint =
          s.hue < 0.5
            ? '255, 255, 255'
            : s.hue < 0.8
              ? '200, 210, 255'
              : '220, 200, 255'
        return (
          <div
            key={i}
            className="star absolute rounded-full"
            style={
              {
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
                background: `rgba(${tint}, 1)`,
                boxShadow:
                  s.size > 1.4
                    ? `0 0 ${s.size * 4}px rgba(${tint}, 0.8)`
                    : `0 0 ${s.size * 2}px rgba(${tint}, 0.4)`,
                ['--max-opacity' as string]: s.opacity,
                ['--twinkle-delay' as string]: `${s.delay}s`,
                ['--twinkle-duration' as string]: `${s.duration}s`,
                opacity: s.opacity,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
