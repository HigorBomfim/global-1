import AtmosphericBackground from './components/AtmosphericBackground'
import CapitalFlowGlobe from './components/CapitalFlowGlobe'
import Dashboard from './components/Dashboard'

export default function CapitalFlowPage() {
  return (
    <main>
      <AtmosphericBackground>
        <CapitalFlowGlobe />
        <Dashboard />
      </AtmosphericBackground>
    </main>
  )
}
