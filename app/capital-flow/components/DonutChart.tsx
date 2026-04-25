'use client'

import { useMemo } from 'react'

export type DonutSlice = {
  label: string
  value: number
  color: string
}

type Props = {
  slices: DonutSlice[]
  size?: number
  thickness?: number
  centerTitle?: string
  centerValue?: string
  centerSub?: string
}

/**
 * SVG donut. Slices are drawn with stroke-dasharray on stacked circles
 * — that lets each segment have its own colour and end-cap rounding
 * without resorting to a path-arc per slice.
 */
export default function DonutChart({
  slices,
  size = 180,
  thickness = 18,
  centerTitle,
  centerValue,
  centerSub,
}: Props) {
  const radius = (size - thickness) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * radius

  const total = useMemo(() => slices.reduce((s, x) => s + x.value, 0), [slices])

  const segments = useMemo(() => {
    let offset = 0
    return slices.map((slice) => {
      const fraction = total > 0 ? slice.value / total : 0
      const length = circumference * fraction
      const seg = {
        ...slice,
        length,
        gap: circumference - length,
        offset,
      }
      offset += length
      return seg
    })
  }, [slices, total, circumference])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        // -90deg start so first slice begins at 12 o'clock
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={thickness}
        />
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${seg.length} ${seg.gap}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
            style={{
              filter: `drop-shadow(0 0 4px ${seg.color}88)`,
              transition: 'stroke-dasharray 600ms ease-out',
            }}
          />
        ))}
      </svg>

      {(centerTitle || centerValue || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerTitle && (
            <p className="text-white/40 text-[9px] tracking-[0.25em] mb-1">
              {centerTitle}
            </p>
          )}
          {centerValue && (
            <p className="text-white text-2xl font-bold leading-none">
              {centerValue}
            </p>
          )}
          {centerSub && (
            <p className="text-cyan-300 text-[10px] mt-1 font-mono">{centerSub}</p>
          )}
        </div>
      )}
    </div>
  )
}
