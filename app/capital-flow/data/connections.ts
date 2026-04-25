export type Connection = {
  from: string
  to: string
  /** 0..1 — relative volume of the corridor, used downstream for visuals */
  strength: number
}

export const CONNECTIONS: Connection[] = [
  { from: 'nyc', to: 'lon', strength: 1.0 },
  { from: 'nyc', to: 'tok', strength: 0.8 },
  { from: 'lon', to: 'fra', strength: 0.7 },
  { from: 'lon', to: 'tok', strength: 0.7 },
  { from: 'lon', to: 'dub', strength: 0.6 },
  { from: 'sin', to: 'hkg', strength: 0.8 },
  { from: 'sin', to: 'tok', strength: 0.7 },
  { from: 'syd', to: 'sin', strength: 0.5 },
  { from: 'dub', to: 'lon', strength: 0.6 },
  { from: 'fra', to: 'nyc', strength: 0.6 },
  { from: 'hkg', to: 'tok', strength: 0.5 },
]
