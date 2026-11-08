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

## Deploys

- `.github/workflows/deploy-pages.yml` is the only Pages deploy workflow. Don't add a second one that also runs on push to `main`; two deploys compete for the `pages` concurrency group.
- After a push to `main`, confirm exactly one "Deploy Jekyll site to Pages" run starts and goes green (`gh run list --limit 4`).

## Git workflow

- Default to a branch and PR. Tyler may choose to push straight to `main` for smaller changes that need immediate testing (e.g. deploy workflow fixes); decide case by case, and only when he says so.
- If the working tree is on a feature branch with uncommitted changes, commit to `main` from a temporary worktree (`git worktree add <scratchpad>/main-wt main`) instead of switching branches, then remove it.
- Put `Closes #N` in the commit message to close the issue.
- `gh issue view N` can print nothing here; use `gh issue view N --json title,body,state,comments`. Issue numbers don't show under the Pull requests tab.
