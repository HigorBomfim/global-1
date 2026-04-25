'use client'

type Trend = {
  symbol: string
  value: string
  change: string
  /** 'up' | 'down' | 'flat' */
  dir: 'up' | 'down' | 'flat'
}

const TRENDS: Trend[] = [
  { symbol: 'S&P 500', value: '$653.37', change: '+15.5%', dir: 'up' },
  { symbol: 'BTCUSD', value: '86,430', change: '+1.87%', dir: 'up' },
  { symbol: 'MTUUSD', value: '1.0654', change: '-3.97%', dir: 'down' },
  { symbol: 'GOLD', value: '2,742', change: '+14.32%', dir: 'up' },
  { symbol: 'NIKKR', value: '20,945', change: '+8.57%', dir: 'flat' },
  { symbol: 'OIL WTI', value: '1,158', change: '-2.57%', dir: 'down' },
]

function MiniSpark({ dir }: { dir: Trend['dir'] }) {
  const stroke =
    dir === 'up' ? '#34d399' : dir === 'down' ? '#fb7185' : '#cbd5e1'
  const path =
    dir === 'up'
      ? 'M0 14 L8 10 L14 12 L22 4'
      : dir === 'down'
        ? 'M0 4 L8 8 L14 6 L22 14'
        : 'M0 9 L8 9 L14 9 L22 9'
  return (
    <svg viewBox="0 0 22 18" width="34" height="14">
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function DirIcon({ dir }: { dir: Trend['dir'] }) {
  if (dir === 'up') return <span className="text-emerald-400">↗</span>
  if (dir === 'down') return <span className="text-rose-400">↘</span>
  return <span className="text-white/40">—</span>
}

function TrendRow({ trend }: { trend: Trend }) {
  const changeColor =
    trend.dir === 'up'
      ? 'text-emerald-400'
      : trend.dir === 'down'
        ? 'text-rose-400'
        : 'text-white/60'
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-b-0">
      <div className="flex items-center gap-2">
        <DirIcon dir={trend.dir} />
        <span className="text-white text-[12px] font-medium">{trend.symbol}</span>
      </div>
      <div className="flex items-center gap-3">
        <MiniSpark dir={trend.dir} />
        <div className="text-right leading-tight">
          <p className="text-white text-[12px] font-mono">{trend.value}</p>
          <p className={`text-[10px] font-mono ${changeColor}`}>{trend.change}</p>
        </div>
      </div>
    </div>
  )
}

export default function MarketTrendsCard() {
  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-center mb-2">
        <p className="text-white/40 text-[9px] tracking-[0.32em] font-mono">
          MARKET TRENDS
        </p>
        <span className="text-rose-400 text-[10px] font-mono">▼ 1.2%</span>
      </div>
      <div>
        {TRENDS.map((t) => (
          <TrendRow key={t.symbol} trend={t} />
        ))}
      </div>
    </div>
  )
}
