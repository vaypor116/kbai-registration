# Kids Build with AI 2.0 — Registration Platform
**Powered by TheWHY Africa Initiative · REALMS Group Africa**

---

## Deploy in 4 Steps

### Step 1 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) → Create a new project
2. Go to **SQL Editor** → paste and run the contents of `supabase-schema.sql`
3. Go to **Storage** → New Bucket → Name it `student-photos` → set as **Public**
4. Go to **Settings → API** → copy:
   - **Project URL** (looks like `https://abcxyz.supabase.co`)
   - **service_role** key (under "Project API keys" — NOT the anon key)

### Step 2 — Push to GitHub

```bash
cd kbai-registration
git init
git add .
git commit -m "Initial commit — Kids Build with AI 2.0 registration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kbai-registration.git
git push -u origin main
```

### Step 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Vercel will auto-detect Next.js — no build config needed
3. Before clicking Deploy, go to **Environment Variables** and add:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` |

4. Click **Deploy** — Vercel gives you a live URL in ~60 seconds

### Step 4 — Share the link

Your shareable registration link will be:
```
https://kbai-registration.vercel.app/register
```
(or whatever domain Vercel assigns — you can add a custom domain too)

---

## Local Development

```bash
# Install dependencies
npm install

# Create your env file (already created — just fill in your values)
# Edit .env.local with your Supabase URL and service role key

# Run locally
npm run dev
# → Open http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts        ← Backend API — Supabase keys live here (server-only)
│   ├── register/
│   │   ├── page.tsx            ← Public registration page
│   │   └── register.module.css
│   ├── layout.tsx              ← Root layout + fonts + metadata
│   ├── page.tsx                ← Redirects / → /register
│   └── globals.css
├── components/
│   ├── RegistrationForm.tsx    ← 4-step form with camera + upload
│   ├── RegistrationForm.module.css
│   └── Starfield.tsx           ← Animated background
└── lib/
    ├── supabase.ts             ← Supabase admin client (server-side only)
    └── types.ts                ← TypeScript types
```

## Security Model

- **Supabase keys are NEVER in the browser** — they live only in Vercel environment variables
- All form submissions go to `/api/register` (a Next.js server function)
- The server validates age, required fields, and file size before touching the database
- Photos are uploaded server-side using the service role key
- Row Level Security is enabled on the `students` table

## Viewing Registrations

Go to your **Supabase Dashboard → Table Editor → students** to see all registrations in real time.

You can also export to CSV from there for your records.

---

## Custom Domain (Optional)

In Vercel → your project → Settings → Domains → add your domain (e.g. `register.kidsbuilwithai.com`)
