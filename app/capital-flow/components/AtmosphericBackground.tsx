'use client'

import { useEffect, useState } from 'react'
import StarField from './StarField'

export default function AtmosphericBackground({
  children,
}: {
  children?: React.ReactNode
}) {
  // Scale star count to viewport so phones don't render 320 absolutely
  // positioned twinkling DOM nodes.
  const [starCount, setStarCount] = useState(160)
  useEffect(() => {
    const w = window.innerWidth
    setStarCount(w < 640 ? 120 : w < 1280 ? 220 : 320)
  }, [])

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%,
            #1a1438 0%,
            #0d0a24 40%,
            #050410 70%,
            #000000 100%
          )
        `,
      }}
    >
      {/* Distant nebula glow — soft violet smear off-center */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '15%',
          top: '20%',
          width: '40vw',
          height: '40vw',
          background:
            'radial-gradient(circle, rgba(120, 70, 220, 0.18) 0%, rgba(120, 70, 220, 0) 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '10%',
          bottom: '15%',
          width: '35vw',
          height: '35vw',
          background:
            'radial-gradient(circle, rgba(70, 100, 220, 0.14) 0%, rgba(70, 100, 220, 0) 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Star field */}
      <StarField count={starCount} />

      {/* Vignette to bias attention to center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {children}
    </div>
  )
}
