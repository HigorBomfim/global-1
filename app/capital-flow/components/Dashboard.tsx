'use client'

import TopBar from './TopBar'
import LiveFeedCard from './LiveFeedCard'
import ActiveHubsCard from './ActiveHubsCard'
import PortfolioCard from './PortfolioCard'
import MarketTrendsCard from './MarketTrendsCard'

/**
 * 2D HUD overlay for the Capital Flow Globe. Sits on top of the WebGL
 * canvas with pointer-events disabled by default so the globe stays
 * interactive — individual cards re-enable pointer events.
 */
export default function Dashboard() {
  return (
    <div className="absolute inset-0 pointer-events-none p-5 flex flex-col">
      <div
        className="animate-card-enter"
        style={{ animationDelay: '50ms' }}
      >
        <TopBar />
      </div>

      <div className="flex-1 flex justify-between items-start gap-6 mt-5 min-h-0">
        {/* Left column */}
        <div className="w-[300px] space-y-3 pointer-events-auto overflow-hidden">
          <div
            className="animate-card-enter"
            style={{ animationDelay: '180ms' }}
          >
            <LiveFeedCard />
          </div>
          <div
            className="animate-card-enter"
            style={{ animationDelay: '320ms' }}
          >
            <ActiveHubsCard />
          </div>
        </div>

        {/* Right column */}
        <div className="w-[300px] space-y-3 pointer-events-auto overflow-hidden">
          <div
            className="animate-card-enter"
            style={{ animationDelay: '240ms' }}
          >
            <PortfolioCard />
          </div>
          <div
            className="animate-card-enter"
            style={{ animationDelay: '380ms' }}
          >
            <MarketTrendsCard />
          </div>
        </div>
      </div>
    </div>
  )
}
