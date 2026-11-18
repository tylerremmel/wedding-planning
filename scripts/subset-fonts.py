#!/usr/bin/env python3
"""Regenerate the self-hosted Roboto subsets in assets/fonts/ from the full Google Fonts variable fonts.

    python3 scripts/subset-fonts.py ~/Library/Fonts     # folder holding the downloaded .ttf files
    python3 scripts/add-stat-table.py                   # then re-add STAT (subsetting drops it)

Needs: pip install fonttools brotli. The full fonts come from Google Fonts (Roboto Flex, Roboto Serif and
Roboto Serif Italic, "variable" downloads). Each output keeps the Latin characters the site uses plus the
layout features below, with the axes the site doesn't vary pinned:

  roboto-serif-latin.woff2         wdth 120-150, opsz 8-144, wght 300-700, GRAD -50
  roboto-serif-latin-italic.woff2  same axes (Roboto Serif has no slnt axis; italics are a separate font)
  roboto-flex-latin.woff2          opsz 8-144, wght 100-500, slnt -10-0, wdth 151, GRAD 150, rest default

The slnt axis is what makes Flex italic (CSS oblique angle = -slnt); slnt 0 is upright.
"""

import io
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

FONTS = Path(__file__).resolve().parent.parent / "assets" / "fonts"
SERIF = {"GRAD": -50, "wdth": (120, 150), "wght": (300, 700)}
FLEX = {
    "GRAD": 150, "wdth": 151, "XOPQ": 96, "YOPQ": 79, "XTRA": 468, "YTUC": 712,
    "YTLC": 514, "YTAS": 750, "YTDE": -203, "YTFI": 738, "wght": (100, 500), "slnt": (-10, 0),
}
SERIF_FEATURES = ["liga", "lnum", "locl", "onum", "pnum", "tnum"]
FLEX_FEATURES = ["liga", "locl", "pnum"]


def build(source, limits, features, out, codepoints):
    font = instancer.instantiateVariableFont(TTFont(source), limits)
    buf = io.BytesIO()  # round-trip so the subsetter sees a fully loaded font
    font.save(buf)
    buf.seek(0)
    font = TTFont(buf)
    options = subset.Options()
    options.layout_features = features
    options.hinting = False
    options.notdef_outline = True
    options.name_IDs = [1, 2, 3, 4, 5, 6]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(FONTS / out)
    print(f"{out}: {(FONTS / out).stat().st_size} bytes")


def main(src_dir):
    src = Path(src_dir).expanduser()
    codepoints = sorted(TTFont(FONTS / "roboto-serif-latin.woff2").getBestCmap())  # keep the current set
    def find(prefix):
        return next(src.glob(prefix))
    build(find("RobotoSerif-VariableFont*"), SERIF, SERIF_FEATURES, "roboto-serif-latin.woff2", codepoints)
    build(find("RobotoSerif-Italic-VariableFont*"), SERIF, SERIF_FEATURES, "roboto-serif-latin-italic.woff2", codepoints)
    build(find("RobotoFlex-VariableFont*"), FLEX, FLEX_FEATURES, "roboto-flex-latin.woff2", codepoints)


if __name__ == "__main__":
    main(sys.argv[1])
