# Deployment Guide

## Quick Start (5 minutes to live dashboard)

### Step 1: Create GitHub Repository

```bash
# If you haven't already, create a public repo on GitHub:
# https://github.com/new
# Name: reivax-os-dashboard
# Description: Real-time M&A pipeline dashboard for Reivax OS
# Public: Yes
# No README (we have one)
```

### Step 2: Push Code to GitHub

```bash
cd /tmp/reivax-os-dashboard

# Configure git (do this once)
git config --global user.email "xavier@reivax.com"
git config --global user.name "Xavier"

# Add remote and push
git remote add origin https://github.com/yourusername/reivax-os-dashboard.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Option A: Web Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com/new)
2. Click "Import Git Repository"
3. Paste: `https://github.com/yourusername/reivax-os-dashboard`
4. Click Import
5. Set Environment Variables:
   - Name: `DATA_PATH`
   - Value: `/root/.openclaw/workspace/reivax-os/memory`
   - Name: `NEXT_PUBLIC_VPS_DATA_URL`
   - Value: `http://localhost:3000` (or your VPS API)
6. Click Deploy
7. Wait 2-3 minutes
8. Your dashboard is live at: `https://reivax-os-dashboard.vercel.app`

**Option B: Vercel CLI**

```bash
npm install -g vercel

cd /tmp/reivax-os-dashboard

# Login with your Vercel account
vercel login

# Deploy
vercel --prod

# You'll be prompted for project name, environment variables, etc.
```

### Step 4: Configure Vercel Environment Variables

Go to your Vercel dashboard:
- Project Settings → Environment Variables
- Add:
  - `DATA_PATH` = `/root/.openclaw/workspace/reivax-os/memory`
  - `NEXT_PUBLIC_VPS_DATA_URL` = `http://localhost:3000`

### Step 5: Test the Dashboard

1. Visit: `https://reivax-os-dashboard.vercel.app`
2. You should see:
   - ✅ Campaign Metrics (emails sent, open rate, reply rate)
   - ✅ Pipeline Overview (donut chart with deal counts)
   - ✅ Top 10 Deals (table with M&A scores)
   - ✅ Agent Status (5 agents with bandwidth)
   - ✅ Last updated timestamp

## Troubleshooting Deployment

### "Build failed: Module not found"
- Check `package.json` dependencies are correct
- Run `npm install` locally first
- Check `tsconfig.json` paths

### "Dashboard shows no data"
- Verify `DATA_PATH` points to correct directory
- Check JSON files exist:
  - `/root/.openclaw/workspace/reivax-os/memory/shared-pipeline.json`
  - `/root/.openclaw/workspace/reivax-os/memory/scored-deals.json`
  - `/root/.openclaw/workspace/reivax-os/memory/team-status.json`
  - `/root/.openclaw/workspace/reivax-os/memory/outreach-log-*.json`
- Check file permissions (must be readable)

### "API requests timing out"
- If using local `DATA_PATH`, Vercel can't access your server
- **Solution:** Create a reverse proxy or use a proper API
- See "Remote API Setup" below

## Advanced: Remote API Setup

For production, serve JSON files via HTTP API:

```bash
# Create a simple Node.js API server
cat > /root/reivax-api.js << 'EOF'
const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_PATH = '/root/.openclaw/workspace/reivax-os/memory';

const routes = {
  '/api/pipeline': 'shared-pipeline.json',
  '/api/scored-deals': 'scored-deals.json',
  '/api/team-status': 'team-status.json',
  '/api/outreach-metrics': 'outreach-log-2026-02-14.json',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const file = routes[req.url];
  if (!file) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const data = fs.readFileSync(path.join(DATA_PATH, file), 'utf-8');
    res.writeHead(200);
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Server error' }));
  }
});

server.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});
EOF

# Run it
node /root/reivax-api.js &

# Or use PM2 for production:
# npm install -g pm2
# pm2 start /root/reivax-api.js --name "reivax-api"
# pm2 save
```

Then in Vercel, set:
```
NEXT_PUBLIC_VPS_DATA_URL=https://your-api-domain.com
```

## Auto-Deploy on Push

Vercel automatically deploys when you push to GitHub:

```bash
cd /tmp/reivax-os-dashboard

# Make a change
echo "# Updated $(date)" >> README.md

# Commit and push
git add README.md
git commit -m "Update README"
git push origin main

# Vercel will automatically rebuild and deploy!
# Check deployment status: vercel logs
```

## Custom Domain

In Vercel Dashboard:
1. Go to Settings → Domains
2. Add custom domain (e.g., `dashboard.reivax.com`)
3. Point DNS to Vercel nameservers
4. Wait 5-10 minutes for propagation

## Monitoring

- Vercel Analytics: Track page load performance
- Check deployment logs: `vercel logs`
- Monitor API errors: Browser DevTools → Network tab

## Next Steps

1. ✅ Deploy dashboard
2. 📧 Share link with team: `https://reivax-os-dashboard.vercel.app`
3. 🔄 Set up cron job to update JSON files every hour
4. 📊 Add more metrics/charts as needed
5. 🚀 Custom domain setup

---

**Need help?** Check the README.md for feature details, or contact support.
