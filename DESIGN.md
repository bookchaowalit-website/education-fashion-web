# Design direction — Fashion Lookbook

An editorial contact sheet of four self-authored looks. Since 2026-11-19 the site uses the shared **Reader
shell** (see `READER.md`): `app/reader-shell.css`, `components/reader-shell.tsx` and
`tests/reader-shell.test.tsx` are copied byte for byte from content-techblog-web. Geist via `next/font`
(variable on `<html>`), `--rs-*` tokens in light and dark.

- Structure: one h1 and lede, silhouette chips (`aria-pressed`) with counts, a result count, then every look
  as a card: its three-colour study (decorative), id and season as text, title, note, and the silhouette,
  atmosphere and material facts. Nothing opens off-screen, so phones see what changes.
- Four looks sit as a 2 × 2 sheet on wide screens and one column on phones.
- Floor: text ≥ 12px, controls ≥ 44px, 3px focus ring, 4.5:1 text contrast (no text on the colour blocks),
  forced colours, no horizontal scroll at 320px, footer link back to https://bookchaowalit.com/.
- Honesty: self-authored studies; not a store, no brand affiliation.
