interface Agent {
  name: string
  role: string
  status: string
  current_focus: string
  bandwidth: string
}

interface AgentStatusProps {
  agents: Record<string, Agent>
}

export default function AgentStatus({ agents }: AgentStatusProps) {
  const agentOrder = ['coo_reivax', 'cto_elon', 'cmo_gary', 'cro_warren', 'cno_negotiator']
  const agentLabels = {
    coo_reivax: '👔 COO (Reivax)',
    cto_elon: '⚡ CTO (Elon)',
    cmo_gary: '📢 CMO (Gary)',
    cro_warren: '💰 CRO (Warren)',
    cno_negotiator: '🤝 CNO (Negotiator)',
  }

  const getBandwidthColor = (bandwidth: string) => {
    switch (bandwidth) {
      case 'high':
        return 'bg-green-500/20 text-green-300'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300'
      case 'low':
        return 'bg-orange-500/20 text-orange-300'
      case 'blocked':
        return 'bg-red-500/20 text-red-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Agent Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agentOrder.map(agentKey => {
          const agent = agents[agentKey]
          if (!agent) return null

          return (
            <div key={agentKey} className="border border-border/50 rounded-lg p-4 hover:bg-white/5 transition">
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-sm">{agentLabels[agentKey as keyof typeof agentLabels]}</div>
                <span className={`text-xs px-2 py-1 rounded-full ${getBandwidthColor(agent.bandwidth)}`}>
                  {agent.bandwidth.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-2">{agent.role}</div>
              <div className="text-sm text-gray-300 italic">{agent.current_focus}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
