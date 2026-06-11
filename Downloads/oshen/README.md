# OSHEN — Africa's Community Investment Platform

Built by Realm Technology | Founded by Rinji Richard John

## Deploy to Vercel in 3 Steps

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "OSHEN MVP — initial launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/oshen.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo
4. Click Deploy — Vercel auto-detects Next.js

### Step 3 — Your site is live
Vercel gives you a free URL instantly: `oshen.vercel.app`

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel

## Pages & Features
- Landing page with hero, stats, how it works
- Live investment listings with filters & OSHEN Scores
- Investor signup & BVN verification flow
- Investor dashboard with portfolio tracking
- Builder application (3-step form)
- Builder dashboard with milestone tracking
- Listing detail modal
- OPay payment integration (ready to wire up)

## Next Steps for Production
1. Connect to a real database (Supabase or PlanetScale)
2. Integrate OPay Business API
3. Add Smile Identity for real BVN verification
4. SEC registration as crowdfunding intermediary
5. Hire backend developer for escrow and transaction logic

---
© 2025 Realm Technology Ltd.
