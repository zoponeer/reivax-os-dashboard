import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dataPath = process.env.DATA_PATH || '/root/.openclaw/workspace/reivax-os/memory'
    
    // Find latest outreach log
    const files = fs.readdirSync(dataPath)
    const outreachFiles = files.filter(f => f.startsWith('outreach-log-') && f.endsWith('.json'))
    
    if (outreachFiles.length > 0) {
      const latest = outreachFiles.sort().pop()
      const outreachFile = path.join(dataPath, latest!)
      const data = JSON.parse(fs.readFileSync(outreachFile, 'utf-8'))
      res.status(200).json(data)
    } else {
      res.status(200).json({ emails: [], sent_at: new Date().toISOString() })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Failed to fetch outreach metrics' })
  }
}
