import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface Session {
  key: string
  label: string
  model: string
  status: 'active' | 'completed' | 'idle' | 'error'
  totalTokens: number
  updatedAt: number
  sessionId: string
}

interface ActiveSessionsProps {
  sessions?: Session[]
}

export default function ActiveSessions({ sessions = [] }: ActiveSessionsProps) {
  const [localSessions, setLocalSessions] = useState<Session[]>(sessions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions')
        const data = await response.json()
        setLocalSessions(data.sessions || [])
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
    const interval = setInterval(fetchSessions, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 border-green-500 text-green-400'
      case 'completed':
        return 'bg-blue-500/20 border-blue-500 text-blue-400'
      case 'idle':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
      case 'error':
        return 'bg-red-500/20 border-red-500 text-red-400'
      default:
        return 'bg-gray-500/20 border-gray-500 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢'
      case 'completed':
        return '🔵'
      case 'idle':
        return '🟡'
      case 'error':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const formatTokens = (tokens: number) => {
    if (tokens > 1000000) {
      return (tokens / 1000000).toFixed(1) + 'M'
    } else if (tokens > 1000) {
      return (tokens / 1000).toFixed(1) + 'K'
    }
    return tokens.toString()
  }

  const activeCount = localSessions.filter(s => s.status === 'active').length
  const totalTokens = localSessions.reduce((sum, s) => sum + s.totalTokens, 0)

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Active Sessions</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-green-400">{activeCount}</div>
            <div className="text-xs text-gray-400">Active Sessions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-blue-400">{localSessions.length}</div>
            <div className="text-xs text-gray-400">Total Sessions</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-border/50">
            <div className="text-2xl font-bold text-purple-400">{formatTokens(totalTokens)}</div>
            <div className="text-xs text-gray-400">Tokens Used</div>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {localSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No active sessions</p>
          </div>
        ) : (
          localSessions.map(session => (
            <div
              key={session.sessionId}
              className={`border rounded-lg p-4 transition ${getStatusColor(session.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{getStatusIcon(session.status)}</span>
                  <div>
                    <h3 className="font-semibold">{session.label}</h3>
                    <p className="text-xs text-gray-400 font-mono">{session.key}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-black/30 rounded font-mono">
                  {session.status.toUpperCase()}
                </span>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-400">Model</div>
                  <div className="font-mono text-xs mt-1">{session.model.split('/').pop()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Tokens</div>
                  <div className="font-mono text-xs mt-1">{formatTokens(session.totalTokens)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Updated</div>
                  <div className="text-xs mt-1">
                    {formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border/30 text-xs text-gray-500 text-center">
        <p>Refreshes every 30 seconds</p>
      </div>
    </div>
  )
}
