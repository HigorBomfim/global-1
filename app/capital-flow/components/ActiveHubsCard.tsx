'use client'

import { HUBS, type Hub } from '../data/hubs'

function HubRow({ hub }: { hub: Hub }) {
  const positive = hub.flow >= 0
  return (
    <div
      className="flex items-center justify-between rounded-lg px-3 py-2.5
                 bg-white/[0.02] border border-white/5
                 hover:bg-white/[0.05] transition-colors cursor-default"
    >
      <div className="flex items-center gap-2.5">
        <span
          className="w-1 h-7 rounded-full"
          style={{
            background: hub.color,
            boxShadow: `0 0 8px ${hub.color}`,
          }}
        />
        <div>
          <p className="text-white text-[13px] font-medium leading-tight">{hub.name}</p>
          <p className="text-white/30 text-[9px] font-mono tracking-widest mt-0.5">
            {hub.code}
          </p>
        </div>
      </div>
      <span
        className={`text-[11px] font-mono font-semibold ${
          positive ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {hub.flowLabel}
      </span>
    </div>
  )
}

export default function ActiveHubsCard() {
  const visible = HUBS.slice(0, 5)
  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-center mb-3">
        <p className="text-white/40 text-[9px] tracking-[0.32em] font-mono">
          ACTIVE HUBS
        </p>
        <span className="text-white/40 text-[10px] font-mono">
          {visible.length} nodes
        </span>
      </div>
      <div className="space-y-1.5">
        {visible.map((hub) => (
          <HubRow key={hub.id} hub={hub} />
        ))}
      </div>
    </div>
  )
}
