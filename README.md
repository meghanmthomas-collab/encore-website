# Encore

A video training platform where former professional dancers build a second career teaching dancers online.

**What's in this preview build**

| Area | Where | What it does |
| --- | --- | --- |
| Landing page | `/` | Explains Encore to dancers and to former pros |
| Media marketplace | `/marketplace` | Search and filter classes, programs and live sessions; buy a class |
| Class pages | `/class/:id` | Video player, outline, instructor, checkout, "where your money goes" |
| Instructors | `/instructors` | Instructor pages with all-access subscriptions |
| Fee breakdowns | `/pricing` | Plans, per-sale table, earnings calculator, FAQ |
| Professional back office | `/studio` | Overview dashboard, classes & videos, upload, students, earnings & payouts, profile & plan |
| Customer profile backend | `/account` | Library with watch progress, subscriptions, purchase history, profile |

Sign in from the site with either role ("dancer" or "instructor"). Any password works.

## Important: this is a working prototype

- Instructors, classes and numbers are **sample content** (`src/lib/data.js`).
- Sign-in, payments and uploads are **simulated**. Everything a visitor does is saved only in their own browser.
- All fees live in one file: `src/lib/fees.js`. Change a number there and the whole site updates.

To launch for real, the next steps are:

1. **Accounts** — e.g. Supabase or Clerk for sign-up and sign-in.
2. **Payments & payouts** — Stripe Connect (lets instructors get paid directly, with the platform fee taken automatically).
3. **Video hosting** — e.g. Mux or Cloudflare Stream for uploads and secure streaming.
4. **Database** — store classes, purchases and progress instead of using sample data.

## Running it

The site deploys automatically to GitHub Pages every time `main` changes (see `.github/workflows/deploy.yml`).

To run it on a computer: install Node.js 20+, then `npm install` and `npm run dev`.

Built with React, Vite, Tailwind CSS and lucide icons.
