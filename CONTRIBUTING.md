# Contributing to CalculatorMap

Thanks for taking a look at CalculatorMap.

This repository is meant to stay practical, deployable, and easy to understand. Contributions are welcome when they improve the real product shape without leaking private production setup.

## Before you start

- Read [README.md](README.md) for the current product scope and local setup.
- Keep live Cloudflare resource IDs, secrets, and private bindings out of commits.
- Prefer focused pull requests over large mixed refactors.
- Follow the existing code style and route structure unless there is a strong reason to change it.

## Good contribution areas

- new calculator pages or calculator formula improvements
- zh-TW localization quality improvements
- category, cluster, and guide page improvements
- admin workflow polish
- AI SEO automation safeguards and tooling
- Cloudflare deployment ergonomics
- test coverage for important flows
- accessibility and responsive UI fixes

## Local workflow

1. Install dependencies:

```bash
nvm use
npm install
```

The project pins Node `20.20.0` in [`.nvmrc`](.nvmrc) and [`.node-version`](.node-version) so local and CI environments stay aligned.

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Create local Wrangler config files from the examples:

```bash
cp wrangler.example.jsonc wrangler.jsonc
cp wrangler.api.example.jsonc wrangler.api.jsonc
```

4. Run the app:

```bash
npm run dev
```

## Recommended checks

Run these before opening a pull request:

```bash
npm run verify
```

If your change touches the scheduled Worker or Cloudflare-specific code, also smoke-check the related local flow when possible.

## Pull request guidelines

- Explain what changed and why.
- Keep unrelated cleanup out of the same PR.
- Include screenshots for visible UI changes.
- Call out any Cloudflare or D1 assumptions.
- Mention any areas that still need follow-up.

## Content and localization notes

- Use Traditional Chinese for `zh-TW` content, not simplified Chinese.
- Keep English and `zh-TW` routes structurally aligned when possible.
- Prefer natural product copy over placeholder text.
- When editing calculator content, keep formulas, descriptions, FAQs, and result labels consistent.

## Security and privacy

- Never commit real secrets, auth credentials, production IDs, or personal data.
- Use the example Wrangler files for documentation and onboarding.
- Treat `/admin` behavior and auth changes carefully.

## If you are unsure

Open an issue first for larger changes so the scope can be aligned before implementation starts.
