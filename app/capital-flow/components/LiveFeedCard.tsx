'use client'

import Sparkline from './Sparkline'

function MiniStat({
  icon,
  label,
  value,
  change,
}: {
  icon: string
  label: string
  value: string
  change: string
}) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-xl px-3 py-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-cyan-300 text-xs">{icon}</span>
        <span className="text-emerald-400 text-[9px] font-mono">↗</span>
      </div>
      <p className="text-white/40 text-[9px] tracking-[0.2em] font-mono">{label}</p>
      <p className="text-white text-base font-bold leading-tight mt-0.5">{value}</p>
      <p className="text-white/30 text-[9px] font-mono mt-0.5">{change}</p>
    </div>
  )
}

export default function LiveFeedCard() {
  return (
    <div className="glass-card p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-white/40 text-[9px] tracking-[0.32em] font-mono mb-1.5">
            LIVE FEED
          </p>
          <h2 className="text-white text-base font-semibold flex items-center gap-2">
            <span className="relative w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
              <span className="relative block w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-300">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
              Global Capital
            </span>
          </h2>
        </div>
        <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
          <span>▲</span> LAY
        </span>
      </div>

      {/* Hero number */}
      <div>
        <p className="text-white/40 text-[9px] tracking-[0.28em] font-mono flex items-center gap-2">
          TOTAL INFLOW [24H]
          <span className="text-emerald-400 ml-auto">▲ +134%</span>
        </p>
        <p className="text-5xl font-extrabold text-white mt-2 leading-none tracking-tight">
          $7.42<span className="text-cyan-400">B</span>
        </p>

        <div className="mt-3 -mx-1">
          <Sparkline />
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <MiniStat icon="⚡" label="TOTAL" value="$4.2K" change="+1%" />
        <MiniStat icon="◐" label="LATENCY" value="42ms" change="+20%" />
      </div>
    </div>
  )
}
