import { useEffect, useState } from 'react'
import Head from 'next/head'
import { formatDistanceToNow } from 'date-fns'
import PipelineChart from '../components/PipelineChart'
import TopDealsTable from '../components/TopDealsTable'
import CampaignMetrics from '../components/CampaignMetrics'
import AgentStatus from '../components/AgentStatus'
import {
  fetchPipelineData,
  fetchScoredDeals,
  fetchTeamStatus,
  fetchOutreachMetrics,
  calculatePipelineStages,
  getTopDeals,
  calculateCampaignMetrics,
} from '../lib/api'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [pipelineStages, setPipelineStages] = useState({
    sourced: 0,
    qualified: 0,
    outreach: 0,
    response: 0,
    loi: 0,
    closed: 0,
  })
  const [topDeals, setTopDeals] = useState<any[]>([])
  const [campaignMetrics, setCampaignMetrics] = useState({
    emailsSent: 0,
    openRate: 0,
    replyRate: 0,
    responseCount: 0,
  })
  const [agents, setAgents] = useState({})

  const loadData = async () => {
    setLoading(true)
    try {
      const [pipelineData, scoredDeals, teamStatus, outreachData] = await Promise.all([
        fetchPipelineData(),
        fetchScoredDeals(),
        fetchTeamStatus(),
        fetchOutreachMetrics(),
      ])

      // Process pipeline data
      if (pipelineData.deals) {
        const stages = calculatePipelineStages(pipelineData.deals)
        setPipelineStages(stages)
        setLastUpdated(pipelineData.metadata?.last_updated || new Date().toISOString())
      }

      // Process scored deals
      if (scoredDeals.ranked_deals) {
        const top = getTopDeals(scoredDeals.ranked_deals)
        setTopDeals(top)
      }

      // Process campaign metrics
      if (outreachData.emails) {
        const metrics = calculateCampaignMetrics(outreachData.emails)
        setCampaignMetrics(metrics)
      }

      // Process team status
      if (teamStatus.agents) {
        setAgents(teamStatus.agents)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5 * 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>Reivax OS Dashboard</title>
        <meta name="description" content="Real-time M&A pipeline dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-dark via-card to-dark">
        {/* Header */}
        <div className="border-b border-border sticky top-0 z-50 bg-dark/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Reivax OS</h1>
                <p className="text-gray-400 text-sm">M&A Pipeline Dashboard</p>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {lastUpdated ? `Updated ${formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}` : 'Loading...'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading && !topDeals.length ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-gray-400">Loading dashboard...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* KPI Section */}
              <section>
                <h2 className="text-xl font-bold mb-4">Campaign Metrics</h2>
                <CampaignMetrics
                  emailsSent={campaignMetrics.emailsSent}
                  openRate={campaignMetrics.openRate}
                  replyRate={campaignMetrics.replyRate}
                  responseCount={campaignMetrics.responseCount}
                />
              </section>

              {/* Pipeline & Deals Section */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PipelineChart data={pipelineStages} />
                <TopDealsTable deals={topDeals} />
              </section>

              {/* Agent Status Section */}
              <section>
                <h2 className="text-xl font-bold mb-4">Team Workload</h2>
                <AgentStatus agents={agents} />
              </section>

              {/* Footer Info */}
              <section className="text-center text-xs text-gray-500 py-4 border-t border-border/30">
                <p>Dashboard refreshes every 5 minutes • Last sync: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'N/A'}</p>
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
