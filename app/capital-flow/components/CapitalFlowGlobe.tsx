'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { HUBS, type Hub } from '../data/hubs'

// react-globe.gl is WebGL-only and must NOT be SSR'd
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const GLOBE_TEXTURE = '//unpkg.com/three-globe/example/img/earth-night.jpg'
const BUMP_TEXTURE = '//unpkg.com/three-globe/example/img/earth-topology.png'

export default function CapitalFlowGlobe() {
  const globeEl = useRef<any>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // Tier-1 hubs get larger pulsing rings, tier-2 get smaller ones
  const ringsData = useMemo(
    () =>
      HUBS.map((h) => ({
        lat: h.lat,
        lng: h.lng,
        maxR: h.tier === 1 ? 5 : 3,
        color: h.color,
      })),
    [],
  )

  // Basic point dots — placeholder visualisation until Layer 5 swaps
  // these for HTML markers with icons
  const pointsData = useMemo(
    () =>
      HUBS.map((h) => ({
        lat: h.lat,
        lng: h.lng,
        size: h.tier === 1 ? 0.7 : 0.5,
        color: h.color,
      })),
    [],
  )

  // Track viewport size so the canvas matches the screen
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Once the globe instance exists, configure controls + lights + camera
  useEffect(() => {
    if (!globeEl.current || size.w === 0) return

    const controls = globeEl.current.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.4
    controls.enableZoom = true
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.minDistance = 200
    controls.maxDistance = 600

    // Frame the Eurasia centre, just like the mockup
    globeEl.current.pointOfView({ lat: 30, lng: 80, altitude: 2.0 }, 0)

    const scene = globeEl.current.scene() as THREE.Scene

    // Strip any default lights that three-globe may have added
    const toRemove: THREE.Object3D[] = []
    scene.traverse((obj) => {
      if ((obj as THREE.Light).isLight) toRemove.push(obj)
    })
    toRemove.forEach((l) => scene.remove(l))

    // Soft violet ambient — fills shadow side with the night-sky tint
    const ambient = new THREE.AmbientLight(0x4433aa, 0.4)
    ambient.userData.cfTag = 'cf-ambient'
    scene.add(ambient)

    // Warm "sun" — main directional, comes from upper-right
    const sun = new THREE.DirectionalLight(0xffeecc, 1.2)
    sun.position.set(5, 3, 5)
    sun.userData.cfTag = 'cf-sun'
    scene.add(sun)

    // Rim light — purple kicker from the back-left, creates the Fresnel glow
    const rim = new THREE.DirectionalLight(0xaa44ff, 0.6)
    rim.position.set(-5, 2, -3)
    rim.userData.cfTag = 'cf-rim'
    scene.add(rim)

    // Front fill — subtle blue, brings the dayside features forward
    const front = new THREE.PointLight(0x6688ff, 0.3, 100)
    front.position.set(0, 0, 5)
    front.userData.cfTag = 'cf-front'
    scene.add(front)

    // Cap pixel ratio for performance (matches Layer 8 spec)
    const renderer = globeEl.current.renderer() as THREE.WebGLRenderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false
  }, [size.w])

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {size.w > 0 && (
        <Globe
          ref={globeEl}
          width={size.w}
          height={size.h}
          // Realistic earth — night lights baked into the diffuse map,
          // topology drives bumpScale for visible mountain relief
          globeImageUrl={GLOBE_TEXTURE}
          bumpImageUrl={BUMP_TEXTURE}
          backgroundImageUrl={null}
          backgroundColor="rgba(0,0,0,0)"
          // Surface material tweaks — bumpScale=10 gives the Himalayas / Andes real height
          onGlobeReady={() => {
            const mat = globeEl.current.globeMaterial() as THREE.MeshPhongMaterial
            mat.bumpScale = 10
            mat.shininess = 5
            mat.specular = new THREE.Color(0x223344)
            mat.emissive = new THREE.Color(0x000022)
            mat.emissiveIntensity = 0.15
            mat.needsUpdate = true
          }}
          // Fresnel-style atmosphere — saturated violet bleed
          showAtmosphere={true}
          atmosphereColor="#7744ff"
          atmosphereAltitude={0.18}
          // Layer 3 — hubs as basic markers + pulsing rings.
          // Layer 5 will replace points with HTML markers (icons, halos).
          pointsData={pointsData}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointAltitude={0.01}
          pointRadius={(d: any) => d.size}
          pointColor={(d: any) => d.color}
          pointResolution={12}
          ringsData={ringsData}
          ringLat={(d: any) => d.lat}
          ringLng={(d: any) => d.lng}
          ringMaxRadius={(d: any) => d.maxR}
          ringPropagationSpeed={2}
          ringRepeatPeriod={1500}
          ringAltitude={0.01}
          ringColor={(d: any) => (t: number) => {
            // hex -> rgba(...,1-t) so the ring fades as it expands
            const hex = d.color.replace('#', '')
            const r = parseInt(hex.slice(0, 2), 16)
            const g = parseInt(hex.slice(2, 4), 16)
            const b = parseInt(hex.slice(4, 6), 16)
            return `rgba(${r}, ${g}, ${b}, ${1 - t})`
          }}
        />
      )}
    </div>
  )
}
