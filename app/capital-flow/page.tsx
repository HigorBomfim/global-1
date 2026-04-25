import AtmosphericBackground from './components/AtmosphericBackground'

export default function CapitalFlowPage() {
  return (
    <main>
      <AtmosphericBackground>
        {/* Layers 2-8 will be inserted here */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-white/30 text-xs tracking-[0.4em]">CAPITALFLOW</p>
            <p className="text-white/20 text-[10px] tracking-[0.3em] mt-2">
              LAYER 1 — ATMOSPHERIC BACKGROUND
            </p>
          </div>
        </div>
      </AtmosphericBackground>
    </main>
  )
}
