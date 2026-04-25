export type Hub = {
  id: string
  name: string
  code: string
  lat: number
  lng: number
  tier: 1 | 2
  /** 24h net flow in $B (positive = inflow, negative = outflow) */
  flow: number
  /** Pretty-formatted flow used by UI rows ("+$2.4B", "-$300M") */
  flowLabel: string
  color: string
  icon: string
}

export const HUBS: Hub[] = [
  {
    id: 'nyc',
    name: 'New York',
    code: 'NYC',
    lat: 40.71,
    lng: -74.01,
    tier: 1,
    flow: 2.4,
    flowLabel: '+$2.4B',
    color: '#a855f7',
    icon: '⚡',
  },
  {
    id: 'lon',
    name: 'London',
    code: 'LDN',
    lat: 51.51,
    lng: -0.13,
    tier: 1,
    flow: 1.8,
    flowLabel: '+$1.8B',
    color: '#06b6d4',
    icon: '🏛',
  },
  {
    id: 'tok',
    name: 'Tokyo',
    code: 'TOK',
    lat: 35.68,
    lng: 139.65,
    tier: 1,
    flow: 1.2,
    flowLabel: '+$1.2B',
    color: '#06b6d4',
    icon: '🌸',
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    code: 'HKG',
    lat: 22.32,
    lng: 114.17,
    tier: 1,
    flow: 0.9,
    flowLabel: '+$900M',
    color: '#a855f7',
    icon: '💹',
  },
  {
    id: 'sin',
    name: 'Singapore',
    code: 'SGP',
    lat: 1.35,
    lng: 103.82,
    tier: 1,
    flow: 0.51,
    flowLabel: '+$510M',
    color: '#22c55e',
    icon: '◉',
  },
  {
    id: 'dub',
    name: 'Dubai',
    code: 'DXB',
    lat: 25.2,
    lng: 55.27,
    tier: 2,
    flow: 0.22,
    flowLabel: '+$220M',
    color: '#ef4444',
    icon: '🛢',
  },
  {
    id: 'fra',
    name: 'Frankfurt',
    code: 'FRA',
    lat: 50.11,
    lng: 8.68,
    tier: 2,
    flow: 0.5,
    flowLabel: '+$500M',
    color: '#06b6d4',
    icon: '🏦',
  },
  {
    id: 'syd',
    name: 'Sydney',
    code: 'SYD',
    lat: -33.87,
    lng: 151.21,
    tier: 2,
    flow: -0.3,
    flowLabel: '-$300M',
    color: '#06b6d4',
    icon: '🌊',
  },
]

export const HUBS_BY_ID: Record<string, Hub> = HUBS.reduce(
  (acc, h) => {
    acc[h.id] = h
    return acc
  },
  {} as Record<string, Hub>,
)
