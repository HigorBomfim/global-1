'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { HUBS, type Hub } from '../data/hubs'
import { ARCS_DATA } from '../data/arcs'
import { createMarkerElement } from './markers'

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

  // Layer 5 — HTML markers (one DOM node per hub) replace the
  // placeholder spheres from Layer 3. The data is passed straight from
  // HUBS so each marker has access to colour + icon + tier.
  const htmlData = useMemo(() => HUBS.map((h) => ({ ...h })), [])

  // Track viewport size so the canvas matches the screen.
  // Throttled with rAF — resizing fires hundreds of events otherwise.
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        setSize({ w: window.innerWidth, h: window.innerHeight }),
      )
    }
    update()
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Pause the auto-rotate when the tab is hidden — reclaims CPU/GPU
  // for whatever the user is actually looking at, and the globe
  // resumes seamlessly when they come back.
  useEffect(() => {
    const onVisibility = () => {
      const controls = globeEl.current?.controls?.()
      if (!controls) return
      controls.autoRotate = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Once the globe instance exists, configure controls + lights + camera
  useEffect(() => {
    if (!globeEl.current || size.w === 0) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const controls = globeEl.current.controls()
    controls.autoRotate = !reduceMotion
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
          // Layer 4 — particle-stream arcs.
          // Each connection is rendered as 6 overlapping arcs with
          // varied altitude / stroke / dash phase, producing a
          // braided ribbon rather than a single line.
          arcsData={ARCS_DATA}
          arcStartLat={(d: any) => d.startLat}
          arcStartLng={(d: any) => d.startLng}
          arcEndLat={(d: any) => d.endLat}
          arcEndLng={(d: any) => d.endLng}
          arcColor={(d: any) => d.color}
          arcAltitude={(d: any) => d.altitude}
          arcStroke={(d: any) => d.stroke}
          arcDashLength={0.4}
          arcDashGap={0.1}
          arcDashAnimateTime={2000}
          arcDashInitialGap={(d: any) => d.dashOffset}
          arcsTransitionDuration={0}
          // Layer 5 — HTML markers (rounded pin + icon + halos) per hub
          htmlElementsData={htmlData}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlAltitude={0.02}
          htmlElement={(d: any) => createMarkerElement(d as Hub)}
          htmlElementVisibilityModifier={(el: HTMLElement, isVisible: boolean) => {
            // Hide markers on the back side of the globe so they don't
            // bleed through the surface
            el.style.opacity = isVisible ? '1' : '0'
            el.style.pointerEvents = isVisible ? 'auto' : 'none'
            el.style.transition = 'opacity 200ms ease-out'
          }}
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
