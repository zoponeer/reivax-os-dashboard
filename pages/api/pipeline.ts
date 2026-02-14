import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dataPath = process.env.DATA_PATH || '/root/.openclaw/workspace/reivax-os/memory'
    const pipelineFile = path.join(dataPath, 'shared-pipeline.json')
    
    if (fs.existsSync(pipelineFile)) {
      const data = JSON.parse(fs.readFileSync(pipelineFile, 'utf-8'))
      res.status(200).json(data)
    } else {
      res.status(200).json({ deals: [], metadata: { last_updated: new Date().toISOString() } })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Failed to fetch pipeline data' })
  }
}
