# Wedding site: notes for Claude

Jekyll site (see README.md for structure, EDITING.md for how content is edited). The rules below are easy to break:

## Styling

- Style through the tokens in `assets/css/tokens.css` and global element rules in `base.css`. Don't add per-page or per-component overrides that can drift; extend the global rule instead.
- Spacing uses the `--space-*` tokens for everything above 8px (`--space-150` = 24px is the paragraph gap). Decoration thicknesses (rules, underlines) are px, not em.
- Colors: `--sapphire-N` flips with `prefers-color-scheme` (100↔950, 200↔900, …); `--sapphire-N-static` never changes. Pick based on whether the element should follow the scheme. There's no manual toggle.
- Page blocks go through the `.content > *` pattern: max-width 688px (640 + 24 + 24), centered, 24px side padding and bottom padding (padding, not margin). Headings are centered globally.
- Type roles (headline, subhead, body, meta) × steps (050…400) carry their own weight tokens, ramped lighter at large sizes. Change weights in the tokens, not at the usage site.
- The ornament divider is used once per page (the first); later dividers are plain rules. Dividers max out at 640px.
- The top bar's section links (Our Story) are generated at build time from the page's `<h2 id>` headings. Never hard-code its items.

## Content and images

- Copy comes verbatim from the planning doc (typos included). Anything unwritten is a visible `TK` marker, including photo alt text, which a human writes.
- Never open or view the wedding photos.
- Run every new image through `scripts/prep-image.sh` (strips EXIF/GPS/other metadata, resizes, converts to sRGB JPEG, prints the YAML). Originals live in `~/wedding-image-originals/`, outside the repo. Keep an eye out for other hidden metadata.
- The site title is "The Wedding of Jenna Grande and Tyler Remmel" (`_config.yml`). Don't reintroduce "The Grande-Remmel Wedding". The header headline always reads "Jenna and Tyler are getting married".

## Jekyll gotchas

- `jekyll serve` doesn't reload `_config.yml`; restart it after config changes.
- Liquid `assign` leaks across includes within one page render. Reset variables you rely on at the top of an include.
- Jekyll publishes any file without front matter unless it's in `exclude` (`_config.yml`). Add new non-site files there.
- `<title>` is written by hand in `head.html`; `jekyll-seo-tag` runs with `title=false`.
- When finishing a session, stop `jekyll serve` and any headless Chrome you started.

## Fonts

- `assets/fonts/roboto-serif-latin.woff2` and `roboto-flex-latin.woff2` must keep a `STAT` table, or iOS Safari ignores `font-weight`/`font-stretch` and renders them light and narrow. After re-subsetting or replacing either file, run `python3 scripts/add-stat-table.py` (needs `fonttools` and `brotli`).
- Don't fix font mismatches with `font-variation-settings`. It inherits, so it overrides `font-weight` on children (`<strong>`, the venues app's Quicksand).
- Type changes need checking in WebKit as well as Chrome (Playwright's WebKit reproduces the iOS Safari behavior). Tyler does that check; see Visual QA.

## iOS Safari chrome color

- Safari 26 tints the status bar, toolbar and overscroll from the page background, not `theme-color`. `html` is painted `--header-bg` (same as the footer) and `.site-main` paints `--surface` (`body` has no background, so the area below the footer stays the header color); keep that pairing in `base.css` and `components.css`.
- The page runs under the status bar, but fixed elements start below it, so nothing can be painted there. Safari tints the status bar from the first fixed element about 4px below the top edge; it skips one that is 10px thick or less, has no plain `background-color`, is a pseudo-element or has `pointer-events: none`. `.site-status` (16px tall, `--tab-bg`, pulled up so only the rule's height shows) exists for this: keep `--tab-rule-weight` at 5px or more. A fixed or sticky element at the top edge recolors the status bar while visible. The top bar's tab and 4px rule are always fixed at the top edge, so the status bar takes `--tab-bg` (sapphire-500-static in light, sapphire-600-static in dark), not `--header-bg`. `theme-color` in `head.html` matches `--tab-bg` for browsers that still read it; keep the two in sync.

## Visual QA

Tyler does visual QA himself. Don't take screenshots or drive headless browsers to check how things look. When a change is ready, tell him what to look at (pages, widths, light/dark, Chrome/WebKit) and ask him to review it.

## Formatting

Tyler's editor runs Prettier defaults on save. Write files Prettier-formatted (`npx prettier --check <files>`). Don't run Prettier over Liquid-heavy `_includes/` and `_layouts/` HTML, `README.md`, or `assets/js/airtable-interface.bundle.js` (a generated build output; `npm run build` regenerates it, so `git checkout` it afterward if you didn't mean to change it).

## Deploys

- `.github/workflows/deploy-pages.yml` is the only Pages deploy workflow. Don't add a second one that also runs on push to `main`; two deploys compete for the `pages` concurrency group.
- After a push to `main`, confirm exactly one "Deploy Jekyll site to Pages" run starts and goes green (`gh run list --limit 4`).

## Git workflow

- Default to a branch and PR. Tyler may choose to push straight to `main` for smaller changes that need immediate testing (e.g. deploy workflow fixes); decide case by case, and only when he says so.
- If the working tree is on a feature branch with uncommitted changes, commit to `main` from a temporary worktree (`git worktree add <scratchpad>/main-wt main`) instead of switching branches, then remove it.
- Put `Closes #N` in the commit message to close the issue.
- `gh issue view N` can print nothing here; use `gh issue view N --json title,body,state,comments`. Issue numbers don't show under the Pull requests tab.
