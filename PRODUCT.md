# Fashion Lookbook — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `fashion-lookbook`) on 2026-10-23.

## What it is

A client-only editorial page over four hard-coded, self-authored look studies (title, silhouette, mood, texture,
note and a three-colour swatch drawn in CSS). It is a portfolio surface, not a storefront or brand catalogue.

## Who it is for

A portfolio visitor who wants to see an editorial, visual-first layout with a small filter and detail view.

## What works today

1. Filter the contact sheet by silhouette (all, sculptural, longline, fluid, tailored).
2. Select a look to open its notes. If the filter hides the open look, the first visible one opens instead.
3. "Next study" steps through the visible looks only and wraps.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No Thai designer catalogues, brand tracking, trend analysis, mood boards or seasonal reports (claims removed from
  the portfolio card in the 2026-10 review). No photos, no shop, no affiliation with any brand.
- No account, storage or sync; nothing survives a reload. No product analytics beyond Vercel Analytics.

## Live URL and deploy state

- Live: https://fashion.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-fashion-frontend` has no Git link and is deployed only by CLI. The last
  production deployment is 2026-10-08 (CLI, commit d6a2fa3, Next 16.3.8): the Next 16.4.2 security patch was not
  deployed because the Vercel free-plan daily deployment limit was hit on 2026-10-23. A push to `main` does not
  deploy; the live site lags `main` until the coordinator deploys it and the owner connects Vercel Git to this
  repository (owner action D9). `NEXT_PUBLIC_SENTRY_DSN` is already set on the Vercel project (Sentry project
  `education-fashion-web`, org `personal-yu0`).

## Boundaries

- Browser-only: no API routes, no server data.
