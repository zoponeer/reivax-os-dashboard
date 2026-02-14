export default async function handler(req: any, res: any) {
  try {
    // This would normally call your sessions API
    // For now, return mock data structure that matches OpenClaw sessions
    const mockSessions = [
      {
        key: "agent:main:main",
        label: "Main Session",
        model: "anthropic/claude-haiku-4.5",
        status: "active",
        totalTokens: 156000,
        updatedAt: Date.now(),
        sessionId: "d0af6cec-f189-47f5-b782-6400968391a0"
      },
      {
        key: "agent:main:subagent:m&a-episodes",
        label: "M&A Episodes Integration",
        model: "anthropic/claude-haiku-4.5",
        status: "completed",
        totalTokens: 200000,
        updatedAt: Date.now() - 600000, // 10 mins ago
        sessionId: "bf7b5b3c-ccce-4cb6-8728-4ffbfdd83028"
      }
    ]

    res.status(200).json({
      sessions: mockSessions,
      count: mockSessions.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    res.status(500).json({ error: 'Failed to fetch sessions' })
  }
}
