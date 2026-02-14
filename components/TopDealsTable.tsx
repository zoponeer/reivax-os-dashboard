interface Deal {
  id: string
  name: string
  vertical: string
  maScore: number
  revenue: number
  stage: string
}

interface TopDealsTableProps {
  deals: Deal[]
}

export default function TopDealsTable({ deals }: TopDealsTableProps) {
  const getStageColor = (stage: string) => {
    const stageMap = {
      sourced: 'bg-blue-500/20 text-blue-300',
      qualified: 'bg-green-500/20 text-green-300',
      outreach: 'bg-yellow-500/20 text-yellow-300',
      response: 'bg-purple-500/20 text-purple-300',
      loi: 'bg-indigo-500/20 text-indigo-300',
      closed: 'bg-emerald-500/20 text-emerald-300',
    }
    return stageMap[stage as keyof typeof stageMap] || 'bg-gray-500/20 text-gray-300'
  }

  const formatRevenue = (rev: number) => {
    if (rev >= 1000000) return `$${(rev / 1000000).toFixed(1)}M`
    if (rev >= 1000) return `$${(rev / 1000).toFixed(0)}K`
    return `$${rev}`
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Top 10 Deals</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-gray-300">Company</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-300">Vertical</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-300">M&A Score</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-300">Revenue</th>
            <th className="text-center py-3 px-4 font-semibold text-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id} className="border-b border-border/50 hover:bg-white/5 transition">
              <td className="py-3 px-4 font-medium">{deal.name}</td>
              <td className="py-3 px-4 text-gray-400">{deal.vertical}</td>
              <td className="py-3 px-4 text-right">
                <span className={deal.maScore >= 80 ? 'text-green-400 font-semibold' : ''}>
                  {deal.maScore}
                </span>
              </td>
              <td className="py-3 px-4 text-right text-gray-400">{formatRevenue(deal.revenue)}</td>
              <td className="py-3 px-4 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStageColor(deal.stage)}`}>
                  {deal.stage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
