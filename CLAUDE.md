# Wedding site: notes for Claude

Jekyll site (see README.md for structure). Two rules that are easy to break:

## Fonts

- `assets/fonts/roboto-serif-latin.woff2` and `roboto-flex-latin.woff2` must keep a `STAT` table, or iOS Safari ignores `font-weight`/`font-stretch` and renders them light and narrow. After re-subsetting or replacing either file, run `python3 scripts/add-stat-table.py` (needs `fonttools` and `brotli`).
- Don't fix font mismatches with `font-variation-settings`. It inherits, so it overrides `font-weight` on children (`<strong>`, the venues app's Quicksand).
- Verify type changes in WebKit as well as Chrome. Playwright's WebKit reproduces the iOS Safari behavior.

## iOS Safari chrome color

- Safari 26 tints the status bar, toolbar and overscroll from the page background, not `theme-color`. `html` is painted `--header-bg` (same as the footer) and `body` paints `--surface`; keep that pairing in `base.css`.
- A fixed or sticky element at the top edge (the Our Story sticky nav) recolors the status bar while visible.

## Formatting

Tyler's editor runs Prettier defaults on save. Write files Prettier-formatted (`npx prettier --check <files>`).
