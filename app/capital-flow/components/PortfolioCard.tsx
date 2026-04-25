'use client'

import DonutChart, { type DonutSlice } from './DonutChart'

const ASSETS: DonutSlice[] = [
  { label: 'Equities', value: 33, color: '#06b6d4' },
  { label: 'Crypto', value: 28, color: '#a855f7' },
  { label: 'Forex', value: 17, color: '#ec4899' },
  { label: 'Bonds', value: 14, color: '#22c55e' },
  { label: 'Commodities', value: 8, color: '#eab308' },
]

function AssetRow({ slice }: { slice: DonutSlice }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: slice.color, boxShadow: `0 0 6px ${slice.color}` }}
        />
        <span className="text-white/85">{slice.label}</span>
      </div>
      <span className="text-white/60 font-mono">{slice.value} %</span>
    </div>
  )
}

export default function PortfolioCard() {
  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-white/40 text-[9px] tracking-[0.32em] font-mono mb-1">
            PORTFOLIO
          </p>
          <h2 className="text-white text-base font-semibold leading-tight">
            Asset Distribution
          </h2>
        </div>
        <span className="text-white/40 text-[10px] font-mono">Q4 2025</span>
      </div>

      <div className="flex items-center justify-center my-2">
        <DonutChart
          slices={ASSETS}
          size={170}
          thickness={16}
          centerTitle="AUM"
          centerValue="$48.2B"
          centerSub="+$178.32%"
        />
      </div>

      <div className="space-y-1.5 mt-4">
        {ASSETS.map((slice) => (
          <AssetRow key={slice.label} slice={slice} />
        ))}
      </div>
    </div>
  )
}
