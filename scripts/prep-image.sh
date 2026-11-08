#!/usr/bin/env bash
# Prepare photos for the public site: orient, convert to sRGB, resize, STRIP ALL METADATA
# (GPS, camera, dates, editing-software tags), recompress, lowercase .jpg name, then verify.
#
# Usage: scripts/prep-image.sh <max-long-edge-px> <input> [<input> ...]
#   e.g. scripts/prep-image.sh 1600 ~/Desktop/new-photo.JPG
# Output goes to assets/img/<lowercase-name>.jpg. Inputs are never modified. Needs: imagemagick, exiftool.
# Use this on anything exported from Photoshop/Lightroom too: they re-add their own metadata.
set -euo pipefail
max="${1:?max long edge in px}"; shift
out="$(cd "$(dirname "$0")/.." && pwd)/assets/img"
for src in "$@"; do
  name="$(basename "${src%.*}" | tr '[:upper:]' '[:lower:]')"
  dest="$out/$name.jpg"
  tmp="$(mktemp -d)/$name.jpg"
  magick "$src" -auto-orient -colorspace sRGB -resize "${max}x${max}>" -strip \
    -interlace Plane -sampling-factor 4:2:0 -quality 80 "$tmp"
  left="$(exiftool -a -G1 -s "$tmp" | grep -vE '^\[(System|ExifTool|File|Composite|JFIF)\]|^=|image files' || true)"
  if [ -n "$left" ]; then echo "WARNING: metadata remains in $name.jpg:"; echo "$left"; exit 1; fi
  mv "$tmp" "$dest"
  echo "ok  $dest  ($(du -k "$dest" | cut -f1) KB, clean). YAML to paste into a _data file:"
  echo "    - src: $name.jpg"
  echo "      alt: TK # a person writes this"
  echo "      width: $(identify -format %w "$dest")"
  echo "      height: $(identify -format %h "$dest")"
done
