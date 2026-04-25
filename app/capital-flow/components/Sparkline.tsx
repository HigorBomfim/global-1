'use client'

import { useMemo } from 'react'

type Props = {
  data?: number[]
  width?: number
  height?: number
  /** Stroke colour for the line + area gradient anchor */
  color?: string
}

const DEFAULT_DATA = [
  18, 22, 17, 24, 20, 28, 25, 32, 27, 36, 33, 41, 38, 46, 42, 51, 48, 58, 55, 65,
  60, 72, 68, 80, 76, 88, 84, 96, 92, 104, 99, 110,
]

export default function Sparkline({
  data = DEFAULT_DATA,
  width = 260,
  height = 80,
  color = '#06b6d4',
}: Props) {
  const { line, area, dotX, dotY } = useMemo(() => {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const stepX = width / (data.length - 1)

    const points = data.map((v, i) => {
      const x = i * stepX
      const y = height - ((v - min) / range) * (height - 4) - 2
      return { x, y }
    })

    const linePath = points
      .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
      .join(' ')

    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`

    const last = points[points.length - 1]
    return { line: linePath, area: areaPath, dotX: last.x, dotY: last.y }
  }, [data, width, height])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      className="block"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spark-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#spark-fill)" />
      <path
        d={line}
        fill="none"
        stroke="url(#spark-stroke)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sparkline-path"
      />
      <circle cx={dotX} cy={dotY} r="2.5" fill={color} />
      <circle cx={dotX} cy={dotY} r="6" fill={color} opacity="0.25" />
    </svg>
  )
}
