'use client'

function Divider() {
  return <span className="w-px h-3.5 bg-white/15" />
}

function Metric({
  label,
  value,
  valueClass = 'text-white',
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/40 text-[10px] tracking-[0.18em] font-mono">
        {label}
      </span>
      <span className={`text-xs font-mono font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  )
}

export default function TopBar() {
  return (
    <div className="flex justify-between items-center w-full pointer-events-auto">
      {/* Left — logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            background:
              'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
            boxShadow:
              '0 0 16px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M3 12 L9 12 L11 7 L13 17 L15 12 L21 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="leading-tight">
          <h1 className="text-white font-extrabold text-base tracking-[0.18em]">
            CAPITAL<span className="text-cyan-400">FLOW</span>
          </h1>
          <p className="text-white/40 text-[9px] tracking-[0.32em] font-mono mt-0.5">
            GLOBAL LIQUIDITY TERMINAL · V2.4
          </p>
        </div>
      </div>

      {/* Centre — metrics pill */}
      <div className="flex items-center gap-4 px-5 py-2 bg-white/5 backdrop-blur-md
                      border border-white/10 rounded-full">
        <Metric label="UST" value="2738" />
        <Divider />
        <Metric label="MARKETS" value="OPEN" valueClass="text-emerald-400" />
        <Divider />
        <Metric label="VOLATILITY" value="LOW" valueClass="text-amber-300" />
      </div>

      {/* Right — system status */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md
                      border border-white/10 rounded-full">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
          <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-white/80 text-[11px] font-mono tracking-wider">
          SYSTEM OPERATIONAL
        </span>
      </div>
    </div>
  )
}
