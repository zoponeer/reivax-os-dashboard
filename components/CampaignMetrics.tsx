interface CampaignMetricsProps {
  emailsSent: number
  openRate: number
  replyRate: number
  responseCount: number
}

export default function CampaignMetrics({ emailsSent, openRate, replyRate, responseCount }: CampaignMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Emails Sent This Week</div>
        <div className="text-4xl font-bold">{emailsSent}</div>
        <div className="text-xs text-gray-500 mt-2">Cold email campaigns</div>
      </div>
      
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Open Rate</div>
        <div className="text-4xl font-bold text-blue-400">{openRate}%</div>
        <div className="text-xs text-gray-500 mt-2">Email opens</div>
      </div>
      
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Reply Rate</div>
        <div className="text-4xl font-bold text-green-400">{replyRate}%</div>
        <div className="text-xs text-gray-500 mt-2">Founder responses</div>
      </div>
      
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Total Responses</div>
        <div className="text-4xl font-bold text-purple-400">{responseCount}</div>
        <div className="text-xs text-gray-500 mt-2">Active conversations</div>
      </div>
    </div>
  )
}
