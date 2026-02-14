# 🚀 Reivax OS Dashboard - Quick Setup

**Status:** ✅ Built & Ready for Deployment

## In 3 Minutes

### 1. Create GitHub Repo

Go to [github.com/new](https://github.com/new) and create:
- **Repository name:** `reivax-os-dashboard`
- **Description:** Real-time M&A pipeline dashboard for Reivax OS
- **Public:** ✅ Yes
- **Initialize README:** ❌ No (we have one)

### 2. Push Code

```bash
cd /root/.openclaw/workspace/reivax-os-dashboard

git config --global user.email "xavier@reivax.com"
git config --global user.name "Xavier"

git remote add origin https://github.com/YOUR_USERNAME/reivax-os-dashboard.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

**Easiest Method:**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Paste your GitHub URL
4. Click "Import"
5. **Environment Variables:**
   - `DATA_PATH` → `/root/.openclaw/workspace/reivax-os/memory`
   - `NEXT_PUBLIC_VPS_DATA_URL` → `http://localhost:3000`
6. Click "Deploy"
7. ⏳ Wait 2-3 minutes
8. 🎉 Your dashboard is live!

**Dashboard URL:** `https://reivax-os-dashboard.vercel.app`

## What You Get

✅ **Real-Time Pipeline**
- 6-stage funnel: sourced → qualified → outreach → response → LOI → closed
- Interactive donut chart with deal counts

✅ **Top 10 Deals**
- Ranked by M&A score
- Shows vertical, revenue, stage
- Highlights top performers (score ≥80)

✅ **Campaign Metrics**
- Emails sent this week
- Open rate & reply rate percentages
- Response count

✅ **Agent Status**
- 5 agents: COO, CTO, CMO, CRO, CNO
- Bandwidth levels: high/medium/low/blocked
- Current focus on each agent

✅ **Auto-Refresh**
- Every 5 minutes
- Last updated timestamp

## Verify It Works

Once deployed:
1. Visit `https://reivax-os-dashboard.vercel.app`
2. You should see:
   - ✅ Green "Live" indicator with pulse
   - ✅ Campaign metrics at top
   - ✅ Pipeline donut chart
   - ✅ Top 10 deals table
   - ✅ Agent status cards

## If Data Doesn't Show

**Check the basics:**
1. Are JSON files in `/root/.openclaw/workspace/reivax-os/memory/`?
   - `shared-pipeline.json`
   - `scored-deals.json`
   - `team-status.json`
   - `outreach-log-*.json`

2. Are they readable? (chmod 644)

3. Is `DATA_PATH` set correctly in Vercel?

4. Check browser console (F12 → Console) for fetch errors

## Local Testing (Optional)

```bash
cd /root/.openclaw/workspace/reivax-os-dashboard
npm run dev
# Open http://localhost:3000
```

## Features Summary

| Feature | Status |
|---------|--------|
| Real-time pipeline metrics | ✅ |
| Top 10 deals ranking | ✅ |
| Campaign metrics (emails, rates) | ✅ |
| Agent status & bandwidth | ✅ |
| Interactive donut chart | ✅ |
| Responsive design | ✅ |
| Auto-refresh (5 min) | ✅ |
| Dark theme UI | ✅ |
| Last updated timestamp | ✅ |
| Mobile friendly | ✅ |

## Next Steps

After deployment:

1. **Share the link:** Send `https://reivax-os-dashboard.vercel.app` to your team
2. **Custom domain:** Add `dashboard.reivax.com` in Vercel Settings → Domains
3. **Auto-update JSON:** Set up a cron job to refresh the data files
4. **Monitor:** Check Vercel Analytics for performance

## Troubleshooting

**"Failed to fetch pipeline"**
- Verify JSON files exist in the data path
- Check file permissions (must be readable)
- Restart the API if using remote endpoint

**"No data shows on dashboard"**
- Check API endpoints: Vercel Logs → `vercel logs`
- Verify environment variables are set correctly
- Browser console (F12) should show fetch errors

**Build failed**
- Check build logs in Vercel dashboard
- Ensure all dependencies installed: `npm install`
- Verify `package.json` is valid JSON

## Support

- **Docs:** See `README.md` for detailed features
- **Deployment:** See `DEPLOYMENT.md` for advanced setup
- **Code:** Browse `/components/` and `/pages/` for customization

---

**Built:** 2026-02-14  
**Next.js Version:** 14.2.35  
**Status:** Production-Ready ✅
