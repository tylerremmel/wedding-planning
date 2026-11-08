#!/usr/bin/env python3
"""Add a STAT table to the self-hosted Roboto variable fonts, in place.

Why: iOS Safari (WebKit/CoreText) only maps CSS font-weight / font-stretch onto a variable font's
axes when the font has a STAT table. Our subsetting step drops it, and the fonts then render at their
lightest weight and narrowest width in Safari while looking correct in Chrome. Run this after
re-subsetting or replacing either font:

    python3 scripts/add-stat-table.py          # needs: pip install fonttools brotli

The values only label each axis; they do not change any glyphs.
"""

from pathlib import Path

from fontTools.otlLib.builder import buildStatTable
from fontTools.ttLib import TTFont

FONTS = Path(__file__).resolve().parent.parent / "assets" / "fonts"
ELIDABLE = 2  # the "normal" value for an axis, left out of style names


def values(*items):
    return [
        {"value": v, "name": n, **({"flags": ELIDABLE} if elidable else {})}
        for v, n, elidable in items
    ]


SPECS = {
    "roboto-serif-latin.woff2": [
        {"tag": "wdth", "name": "Width", "ordering": 0,
         "values": values((120, "Expanded", True), (150, "Extra Expanded", False))},
        {"tag": "opsz", "name": "Optical Size", "ordering": 1,
         "values": values((8, "Caption", False), (20, "Text", True), (144, "Display", False))},
        {"tag": "wght", "name": "Weight", "ordering": 2,
         "values": values((300, "Light", False), (400, "Regular", True),
                          (500, "Medium", False), (700, "Bold", False))},
    ],
    "roboto-flex-latin.woff2": [
        {"tag": "opsz", "name": "Optical Size", "ordering": 0,
         "values": values((8, "Caption", False), (14, "Text", True), (144, "Display", False))},
        {"tag": "wght", "name": "Weight", "ordering": 1,
         "values": values((100, "Thin", False), (300, "Light", False),
                          (400, "Regular", True), (500, "Medium", False))},
    ],
}

for filename, axes in SPECS.items():
    path = FONTS / filename
    font = TTFont(path)
    if "STAT" in font:
        del font["STAT"]
    buildStatTable(font, axes, elidedFallbackName=2)
    font.flavor = "woff2"
    font.save(path)
    print(f"{filename}: STAT written")
