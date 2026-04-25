import AtmosphericBackground from './components/AtmosphericBackground'
import CapitalFlowGlobe from './components/CapitalFlowGlobe'

export default function CapitalFlowPage() {
  return (
    <main>
      <AtmosphericBackground>
        <CapitalFlowGlobe />
        {/* Layers 3-8 will be inserted here */}
      </AtmosphericBackground>
    </main>
  )
}
