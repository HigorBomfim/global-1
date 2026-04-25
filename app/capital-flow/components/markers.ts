import type { Hub } from '../data/hubs'

/**
 * Builds the HTML element rendered at each hub on the globe surface.
 * Three stacked layers create the marker:
 *   1. an outer halo that scales/fades (the "ping" pulse)
 *   2. a soft blurred mid-halo for the colour bleed
 *   3. the centre pin: rounded square with the hub icon, glowing border
 */
export function createMarkerElement(hub: Hub): HTMLElement {
  const el = document.createElement('div')
  el.className = 'hub-marker'
  el.dataset.hubId = hub.id

  const isTier1 = hub.tier === 1
  const pinSize = isTier1 ? 40 : 32
  const haloSize = isTier1 ? 56 : 44
  const midSize = isTier1 ? 36 : 28
  const iconSize = isTier1 ? 18 : 14

  el.innerHTML = `
    <div class="relative flex items-center justify-center" style="width:${haloSize}px;height:${haloSize}px;">
      <div class="pulse-ring absolute rounded-full"
           style="width:${haloSize}px;height:${haloSize}px;background:${hub.color};opacity:0.35;"></div>
      <div class="absolute rounded-full"
           style="width:${midSize}px;height:${midSize}px;background:${hub.color};filter:blur(6px);opacity:0.55;"></div>
      <div class="relative flex items-center justify-center rounded-xl border"
           style="
             width:${pinSize}px;height:${pinSize}px;
             background:linear-gradient(135deg, ${hub.color}, ${hub.color}99);
             border-color:${hub.color};
             border-width:1.5px;
             box-shadow: 0 0 18px ${hub.color}cc, 0 0 36px ${hub.color}66, inset 0 1px 0 rgba(255,255,255,0.25);
           ">
        <span style="font-size:${iconSize}px;line-height:1;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.6);">
          ${hub.icon}
        </span>
      </div>
    </div>
  `

  el.style.pointerEvents = 'auto'
  el.style.cursor = 'pointer'
  el.style.transform = 'translate(-50%, -50%)'

  // Hover affordance — slight upscale + brighter glow
  el.addEventListener('mouseenter', () => {
    const pin = el.querySelector('div > div:last-child') as HTMLElement | null
    if (pin) {
      pin.style.transform = 'scale(1.12)'
      pin.style.transition = 'transform 180ms ease-out, box-shadow 180ms ease-out'
      pin.style.boxShadow = `0 0 28px ${hub.color}, 0 0 56px ${hub.color}aa, inset 0 1px 0 rgba(255,255,255,0.4)`
    }
  })
  el.addEventListener('mouseleave', () => {
    const pin = el.querySelector('div > div:last-child') as HTMLElement | null
    if (pin) {
      pin.style.transform = 'scale(1)'
      pin.style.boxShadow = `0 0 18px ${hub.color}cc, 0 0 36px ${hub.color}66, inset 0 1px 0 rgba(255,255,255,0.25)`
    }
  })

  return el
}
