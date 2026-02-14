# Reivax OS Dashboard

A real-time M&A pipeline dashboard for the Reivax operating system. Displays deal metrics, pipeline stages, campaign performance, and team workload.

**Live Demo:** [reivax-os-dashboard.vercel.app](https://reivax-os-dashboard.vercel.app)

## Features

✅ **Real-time Pipeline Metrics**
- Deal sourcing pipeline with 6 stages (sourced → qualified → outreach → response → LOI → closed)
- Top 10 deals ranked by M&A score
- Interactive donut chart visualization

✅ **Campaign Performance**
- Emails sent this week
- Open rate % and reply rate %
- Active conversation count
- Cold email outreach tracking

✅ **Agent Status**
- 5 AI agents with real-time status (COO, CTO, CMO, CRO, CNO)
- Bandwidth levels (high/medium/low/blocked)
- Current focus and task tracking

✅ **Data Integration**
- Reads from local JSON files (`/reivax-os/memory/`)
- API endpoints for each data source
- Auto-refresh every 5 minutes
- Last updated timestamp

✅ **Modern UI**
- Dark theme with Tailwind CSS
- Responsive grid layout
- Charts via Recharts
- Mobile-friendly

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Deployment:** Vercel

## Project Structure

```
reivax-os-dashboard/
├── pages/
│   ├── api/              # API endpoints (pipeline, deals, team, outreach)
│   ├── index.tsx         # Main dashboard
│   └── _app.tsx
├── components/           # Reusable UI components
│   ├── PipelineChart.tsx
│   ├── TopDealsTable.tsx
│   ├── CampaignMetrics.tsx
│   └── AgentStatus.tsx
├── lib/
│   └── api.ts           # Data fetching utilities
├── styles/
│   └── globals.css
└── package.json
```

## Data Sources

The dashboard pulls from these JSON files in your Reivax OS workspace:

- `shared-pipeline.json` - Deal pipeline and stage counts
- `scored-deals.json` - M&A scoring and deal ranking
- `team-status.json` - Agent status and bandwidth
- `outreach-log-*.json` - Email campaign metrics (latest file)

## Setup & Deployment

### Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/reivax-os-dashboard.git
cd reivax-os-dashboard

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your data path and API URL

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Deploy to Vercel

**Option 1: Direct from GitHub**

1. Push code to GitHub: `reivax-os-dashboard`
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import GitHub repo
4. Set environment variables:
   - `DATA_PATH` = `/root/.openclaw/workspace/reivax-os/memory` (if running on same server)
   - `NEXT_PUBLIC_VPS_DATA_URL` = Your VPS API URL (e.g., `https://api.reivax.com`)
5. Click Deploy

**Option 2: Vercel CLI**

```bash
npm install -g vercel
vercel
```

### Production Configuration

For production, you have two options:

**Option A: Local JSON files (if Vercel runs on same server)**
```
NEXT_PUBLIC_VPS_DATA_URL=http://localhost:3000
DATA_PATH=/root/.openclaw/workspace/reivax-os/memory
```

**Option B: Remote API (recommended)**
- Create an API endpoint on your VPS that serves JSON files
- Set `NEXT_PUBLIC_VPS_DATA_URL` to your API domain
- This keeps Vercel isolated and your VPS secure

## API Endpoints

The dashboard exposes these endpoints:

- `GET /api/pipeline` - Deal pipeline data
- `GET /api/scored-deals` - Top deals by M&A score
- `GET /api/team-status` - Agent status and bandwidth
- `GET /api/outreach-metrics` - Email campaign metrics

## Customization

### Add a New Component

Create a new component in `components/` and import it in `pages/index.tsx`:

```tsx
import NewComponent from '../components/NewComponent'

// In your JSX:
<NewComponent data={data} />
```

### Modify Refresh Rate

Edit `pages/index.tsx`:

```tsx
const interval = setInterval(loadData, 5 * 60 * 1000) // Change 5 to your minutes
```

### Customize Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      dark: '#0f172a',
      card: '#1e293b',
      // Add your colors here
    },
  },
}
```

## Troubleshooting

**"Failed to fetch pipeline"**
- Check `DATA_PATH` environment variable
- Ensure JSON files exist in `/reivax-os/memory/`
- Check file permissions

**Dashboard shows no data**
- Verify API endpoints are accessible
- Check browser console for errors
- Ensure JSON files are valid (use a JSON validator)

**Vercel deployment fails**
- Check build logs: `vercel logs`
- Verify environment variables are set
- Ensure Node version compatibility

## Performance

- **Refresh Rate:** 5 minutes (configurable)
- **Load Time:** <2 seconds (cached)
- **Bundle Size:** ~150KB (gzipped)

## Contributing

Feel free to submit PRs for:
- New dashboard sections
- UI improvements
- Performance optimizations
- Bug fixes

## License

MIT

## Support

Created for the Reivax M&A system. For issues, contact Xavier or check the GitHub repo.

---

**Last Updated:** 2026-02-14
**Status:** ✅ Live
