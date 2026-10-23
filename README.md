# Fashion Lookbook

An editorial lookbook over four self-authored styling studies. Filter by silhouette, pick a look to open its
material notes, or step through the visible looks with "Next study". Sample content only, kept in the code. It does
not sell products or imply any brand relationship.

Live: https://fashion.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- No designer catalogues, brand tracking, trend analysis, mood boards or seasonal reports. No images: each look is
  a CSS colour study. No account, storage or shop.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: lookbook logic, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/lookbook.ts`: the four looks plus `filterLooks`, `pickSelected` and `nextLookId` (used by the page).
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
