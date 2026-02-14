// Data fetching utilities
const VPS_DATA_URL = process.env.NEXT_PUBLIC_VPS_DATA_URL || 'http://localhost:3000'

export async function fetchPipelineData() {
  try {
    const response = await fetch(`${VPS_DATA_URL}/api/pipeline`)
    if (!response.ok) throw new Error('Failed to fetch pipeline')
    return await response.json()
  } catch (error) {
    console.error('Pipeline fetch error:', error)
    return { deals: [], metadata: { last_updated: new Date().toISOString() } }
  }
}

export async function fetchScoredDeals() {
  try {
    const response = await fetch(`${VPS_DATA_URL}/api/scored-deals`)
    if (!response.ok) throw new Error('Failed to fetch scored deals')
    return await response.json()
  } catch (error) {
    console.error('Scored deals fetch error:', error)
    return { ranked_deals: [], generated_at: new Date().toISOString() }
  }
}

export async function fetchTeamStatus() {
  try {
    const response = await fetch(`${VPS_DATA_URL}/api/team-status`)
    if (!response.ok) throw new Error('Failed to fetch team status')
    return await response.json()
  } catch (error) {
    console.error('Team status fetch error:', error)
    return { agents: {}, last_updated: new Date().toISOString() }
  }
}

export async function fetchOutreachMetrics() {
  try {
    const response = await fetch(`${VPS_DATA_URL}/api/outreach-metrics`)
    if (!response.ok) throw new Error('Failed to fetch outreach metrics')
    return await response.json()
  } catch (error) {
    console.error('Outreach metrics fetch error:', error)
    return { emails: [], sent_at: new Date().toISOString() }
  }
}

// Parse pipeline to get stage counts
export function calculatePipelineStages(deals: any[]) {
  const stages = {
    sourced: 0,
    qualified: 0,
    outreach: 0,
    response: 0,
    loi: 0,
    closed: 0,
  }

  deals.forEach(deal => {
    const stage = deal.stage || 'sourced'
    if (stage === 'sourced' || stage === 'pending_tech_review') stages.sourced++
    else if (stage === 'qualified') stages.qualified++
    else if (stage.includes('outreach')) stages.outreach++
    else if (stage === 'founder_response' || stage === 'call_scheduled' || stage === 'call_completed')
      stages.response++
    else if (stage === 'loi_signed') stages.loi++
    else if (stage === 'closed') stages.closed++
  })

  return stages
}

// Get top 10 deals by M&A score
export function getTopDeals(rankedDeals: any[]) {
  return rankedDeals.slice(0, 10).map(deal => ({
    id: deal.id,
    name: deal.name,
    vertical: deal.vertical,
    maScore: deal.reivax_ma_score || 0,
    revenue: deal.revenue,
    stage: deal.stage,
  }))
}

// Calculate campaign metrics
export function calculateCampaignMetrics(emails: any[]) {
  const total = emails.length
  const sent = emails.filter(e => e.status === 'sent').length
  const responses = emails.filter(e => e.response).length
  
  return {
    emailsSent: total,
    openRate: total > 0 ? Math.round((responses / total) * 100) : 0,
    replyRate: total > 0 ? Math.round((responses / total) * 100) : 0,
    responseCount: responses,
  }
}
