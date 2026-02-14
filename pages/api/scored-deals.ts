import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dataPath = process.env.DATA_PATH || '/root/.openclaw/workspace/reivax-os/memory'
    const dealsFile = path.join(dataPath, 'scored-deals.json')
    
    if (fs.existsSync(dealsFile)) {
      const data = JSON.parse(fs.readFileSync(dealsFile, 'utf-8'))
      res.status(200).json(data)
    } else {
      res.status(200).json({ ranked_deals: [], generated_at: new Date().toISOString() })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Failed to fetch scored deals' })
  }
}
