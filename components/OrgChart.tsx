interface Agent {
  name: string
  role: string
  status: string
  current_focus: string
  bandwidth: string
  deals_assigned?: number
  deals_closed?: number
}

interface OrgChartProps {
  agents: Record<string, Agent>
}

export default function OrgChart({ agents }: OrgChartProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-500 bg-green-500/10'
      case 'idle':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'blocked':
        return 'border-red-500 bg-red-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  const getBandwidthDot = (bandwidth: string) => {
    switch (bandwidth) {
      case 'high':
        return '🟢'
      case 'medium':
        return '🟡'
      case 'low':
        return '🟠'
      case 'blocked':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const agentData = {
    coo_reivax: {
      title: 'COO',
      name: 'Reivax',
      icon: '👔',
      description: 'Deal Orchestrator',
      color: 'from-amber-500 to-orange-500',
    },
    cto_elon: {
      title: 'CTO',
      name: 'Elon',
      icon: '⚡',
      description: 'Sourcing & Architecture',
      color: 'from-blue-500 to-cyan-500',
    },
    cmo_gary: {
      title: 'CMO',
      name: 'Gary',
      icon: '📢',
      description: 'Outreach & Brand',
      color: 'from-orange-500 to-red-500',
    },
    cro_warren: {
      title: 'CRO',
      name: 'Warren',
      icon: '💰',
      description: 'Scoring & Growth',
      color: 'from-green-500 to-emerald-500',
    },
    cno_negotiator: {
      title: 'CNO',
      name: 'Negotiator',
      icon: '🤝',
      description: 'Deal Strategy',
      color: 'from-purple-500 to-pink-500',
    },
  }

  const countActiveDeals = () => {
    let total = 0
    Object.values(agents).forEach(agent => {
      total += agent.deals_assigned || 0
    })
    return total
  }

  const countClosedDeals = () => {
    let total = 0
    Object.values(agents).forEach(agent => {
      total += agent.deals_closed || 0
    })
    return total
  }

  const activeAgents = Object.keys(agents).filter(key => agents[key].status === 'active').length

  return (
    <div className="bg-card rounded-lg p-8 border border-border">
      {/* Header Stats */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Organization Chart</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-green-400">{activeAgents}</div>
            <div className="text-xs text-gray-400">Active Agents</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-blue-400">{countActiveDeals()}</div>
            <div className="text-xs text-gray-400">Active Deals</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-emerald-400">{countClosedDeals()}</div>
            <div className="text-xs text-gray-400">Deals Closed</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-purple-400">{Object.keys(agents).length}</div>
            <div className="text-xs text-gray-400">Total Team</div>
          </div>
        </div>
      </div>

      {/* CEO/COO Node */}
      <div className="flex justify-center mb-12">
        {agents.coo_reivax && (
          <div className={`border-2 rounded-lg p-4 bg-gradient-to-r ${agentData.coo_reivax.color} bg-opacity-10 w-80`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{agentData.coo_reivax.icon}</span>
              <div>
                <div className="font-bold text-lg">{agentData.coo_reivax.name}</div>
                <div className="text-xs text-gray-400">{agentData.coo_reivax.title}</div>
              </div>
            </div>
            <div className="text-sm text-gray-300">{agentData.coo_reivax.description}</div>
            <div className="text-xs text-gray-400 mt-2 flex items-center gap-2">
              {getBandwidthDot(agents.coo_reivax.bandwidth)} {agents.coo_reivax.bandwidth.toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Vertical Line to Department Heads */}
      <div className="flex justify-center mb-4">
        <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-transparent"></div>
      </div>

      {/* Department Heads Row */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        {['cto_elon', 'cmo_gary', 'cro_warren', 'cno_negotiator'].map(agentKey => {
          const agent = agents[agentKey]
          const meta = agentData[agentKey as keyof typeof agentData]

          if (!agent) return null

          return (
            <div key={agentKey} className="flex flex-col items-center">
              {/* Line from parent */}
              <div className="w-1 h-6 bg-gray-600/50 mb-4"></div>

              {/* Agent Card */}
              <div className={`border-2 rounded-lg p-4 w-full ${getStatusColor(agent.status)} cursor-pointer hover:shadow-lg transition`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{meta.icon}</span>
                  <div>
                    <div className="font-bold">{meta.name}</div>
                    <div className="text-xs text-gray-400">{meta.title}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-3">{meta.description}</div>

                {/* Status & Bandwidth */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-green-400 font-semibold">{agent.status.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Bandwidth:</span>
                    <span className="flex items-center gap-1">
                      {getBandwidthDot(agent.bandwidth)} {agent.bandwidth.toUpperCase()}
                    </span>
                  </div>
                  {agent.deals_assigned !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Deals:</span>
                      <span className="font-semibold">{agent.deals_assigned}</span>
                    </div>
                  )}
                </div>

                {/* Current Focus */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-gray-400 italic line-clamp-2">{agent.current_focus}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Stats */}
      <div className="border-t border-border/30 pt-6">
        <div className="text-center text-xs text-gray-500">
          <p>Team Status: {activeAgents === 5 ? '🟢 All Systems Operational' : `🟡 ${5 - activeAgents} agents idle`}</p>
        </div>
      </div>
    </div>
  )
}
