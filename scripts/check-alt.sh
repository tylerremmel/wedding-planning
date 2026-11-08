#!/usr/bin/env bash
# Finds images whose alt text is still "TK". In production these render as alt="" (hidden from screen readers).
# Default: print GitHub warning annotations and exit 0. With --strict: exit 1 if any are found
# (switch CI to --strict once all alt text is written).
set -euo pipefail
cd "$(dirname "$0")/.."

hits=$(grep -rnE '^\s*alt:\s*["'"'"']?TK["'"'"']?\s*$' --include='*.md' --include='*.yml' --include='*.html' \
  --exclude-dir=node_modules --exclude-dir=_site --exclude-dir=.git --exclude-dir=docs --exclude=EDITING.md . || true)

if [ -z "$hits" ]; then echo "No alt: TK found."; exit 0; fi

echo "$hits" | while IFS=: read -r file line _; do
  echo "::warning file=${file#./},line=${line}::alt text is still TK (renders as alt=\"\" in production)"
done
echo "$(echo "$hits" | wc -l | tr -d ' ') image(s) still have alt: TK"
[ "${1:-}" = "--strict" ] && exit 1
exit 0
