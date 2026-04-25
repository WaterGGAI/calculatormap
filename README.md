# CalculatorMap

CalculatorMap is a Cloudflare-ready calculator site built with Next.js App Router, a protected admin area, D1-backed content management, and unattended AI SEO automation.

Live site: [calculatormap.com](https://calculatormap.com)

## Highlights

- Public calculator, category, guide, and static content routes
- Traditional Chinese admin area under `/admin`
- Formula-driven calculator rendering with reusable field schemas
- English and zh-TW localized site output
- SEO metadata, sitemap, robots, and JSON-LD support
- Cloudflare Worker automation for scheduled AI SEO generation
- D1 migrations and seed data for local or remote setup

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenNext for Cloudflare
- Cloudflare Workers, D1, R2, and Workers AI

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy local environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` for the public site. Browsers will prompt for credentials when visiting `http://localhost:3000/admin`.

## Build and checks

```bash
npm run typecheck
npm run build
```

## Cloudflare setup

This repository keeps live production bindings out of version control.

Create your local deployment files from the public examples:

```bash
cp wrangler.example.jsonc wrangler.jsonc
cp wrangler.api.example.jsonc wrangler.api.jsonc
```

Then update the D1 database IDs, R2 bucket name, routes, and any project-specific bindings for your own account.

Set admin credentials in Cloudflare before production deploys:

```bash
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
```

## Deploy

```bash
npm run deploy
npm run worker:deploy
```

## Automation

The API worker can run on a cron schedule and write SEO output back into D1-backed override tables.

Open `/admin/settings` to manage unattended mode:

- enable or pause automation
- set batch size
- set minimum refresh interval
- tune default task, model, tone, length, and temperature
- run a manual batch for verification

## License

MIT
