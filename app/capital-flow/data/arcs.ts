import { HUBS_BY_ID } from './hubs'
import { CONNECTIONS, type Connection } from './connections'

export type Arc = {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  /** [start, end] — three-globe interpolates a gradient stroke for a 2-tuple */
  color: [string, string]
  altitude: number
  stroke: number
  /** 0..1 — staggers the dash animation per arc so the band looks like a stream */
  dashOffset: number
}

/**
 * Cycled colour pairs for the gradient strokes. Mixing roxo/violeta,
 * pink, and cyan tones is what turns a stack of plain arcs into the
 * "particle ribbon" effect from the mockup.
 */
const COLOR_PAIRS: Array<[string, string]> = [
  ['#a855f7', '#06b6d4'], // violet  -> cyan
  ['#ec4899', '#a855f7'], // pink    -> violet
  ['#06b6d4', '#22d3ee'], // cyan tones
  ['#8b5cf6', '#ec4899'], // violet  -> pink
  ['#22d3ee', '#a855f7'], // cyan    -> violet
  ['#7c3aed', '#06b6d4'], // deep violet -> cyan
]

const ARCS_PER_CONNECTION = 6

/**
 * Deterministic-ish jitter using a tiny LCG seeded by indices. Avoids
 * Math.random() so the arc layout is stable across renders / hydration.
 */
function jitter(seed: number, salt: number): number {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function generateLayeredArcs(connections: Connection[] = CONNECTIONS): Arc[] {
  const arcs: Arc[] = []

  connections.forEach((conn, ci) => {
    const from = HUBS_BY_ID[conn.from]
    const to = HUBS_BY_ID[conn.to]
    if (!from || !to) return

    for (let i = 0; i < ARCS_PER_CONNECTION; i++) {
      const colors = COLOR_PAIRS[i % COLOR_PAIRS.length]
      const altJitter = jitter(ci, i) * 0.05
      const strokeJitter = jitter(ci, i + 100) * 0.4
      const dashJitter = jitter(ci, i + 200) * 0.2

      arcs.push({
        startLat: from.lat,
        startLng: from.lng,
        endLat: to.lat,
        endLng: to.lng,
        color: colors,
        // Slightly different arc heights stack the strokes into a ribbon
        altitude: 0.25 + i * 0.04 + altJitter,
        // Vary stroke width per layer; stronger corridors get a thicker band
        stroke: (0.3 + strokeJitter) * (0.6 + 0.4 * conn.strength),
        // Staggered dash phase makes the animation read as a moving stream
        dashOffset: i / ARCS_PER_CONNECTION + dashJitter,
      })
    }
  })

  return arcs
}

export const ARCS_DATA: Arc[] = generateLayeredArcs()
