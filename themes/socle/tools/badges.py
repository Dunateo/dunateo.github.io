"""Pixel-art category badges for the daily news (16x16 grid, Socle palette).

Each badge is a self-contained tile (type colour background + glyph), so it reads the same
in light and dark themes. Regenerate after editing a sprite:

    python3 themes/socle/tools/badges.py            # writes static/img/badges/*.svg
    python3 themes/socle/tools/badges.py sheet.png  # also writes a preview sheet (needs Pillow)
"""

from __future__ import annotations

import sys
from pathlib import Path

PALETTE = {
    "K": "#0b0b0d",  # ink
    "W": "#ffffff",
    "C": "#f5f3ee",  # paper
    "S": "#cfcbc2",  # line-soft
    "Y": "#ffd60a",  # mantis-yellow
    "O": "#ff8a3d",  # mantis-orange
    "P": "#ff5c8a",  # mantis-pink
}

# id: (background, rows). "." = background.
BADGES = {
    # Exploited in the wild: flame
    "exploited": ("#c2261b", [
        "................",
        ".......W........",
        ".......WW.......",
        "......WWW.......",
        "......WYWW......",
        ".....WWYYW..W...",
        ".....WYYYWW.WW..",
        "....WWYYYYW.WW..",
        "...WWYYOYYWWYW..",
        "...WYYOOOYYWYW..",
        "..WWYOOOOOYYYW..",
        "..WYYOOWOOOYYW..",
        "..WYOOWWWOOOYW..",
        "..WYOOWWWOOYYW..",
        "...WYYOOOOYYW...",
        "....WWWWWWWW....",
    ]),
    # Vulnerability: a bug
    "vulnerability": ("#ff8a3d", [
        "................",
        "...K........K...",
        "....K......K....",
        ".....KKKKKK.....",
        "....KKWKKWKK....",
        ".....KKKKKK.....",
        "...KKKK..KKKK...",
        "KK.KKKK..KKKK.KK",
        "..KKKKK..KKKKK..",
        "..KKKKK..KKKKK..",
        "KK.KKKK..KKKK.KK",
        "..KKKKK..KKKKK..",
        "...KKKK..KKKK...",
        "KK..KKK..KKK..KK",
        ".....KK..KK.....",
        "................",
    ]),
    # Ransomware: padlock
    "ransomware": ("#ff5c8a", [
        "................",
        "......KKKK......",
        ".....KWWWWK.....",
        "....KWKKKKWK....",
        "....KWK..KWK....",
        "....KWK..KWK....",
        "..KKKKKKKKKKKK..",
        "..KWWWWWWWWWWK..",
        "..KWWWKKKKWWWK..",
        "..KWWWKKKKWWWK..",
        "..KWWWWKKWWWWK..",
        "..KWWWWKKWWWWK..",
        "..KWWWWWWWWWWK..",
        "..KSSSSSSSSSSK..",
        "..KKKKKKKKKKKK..",
        "................",
    ]),
    # Data breach: a leaking drop
    "breach": ("#1f4fe0", [
        "................",
        ".......KK.......",
        "......KWWK......",
        "......KWWK......",
        ".....KWWWWK.....",
        ".....KWWWWK.....",
        "....KWWWWWWK....",
        "...KWWWWWWWWK...",
        "...KWSWWWWWWK...",
        "..KWWSWWWWWWWK..",
        "..KWWSWWWWWWWK..",
        "..KWWWSWWWWWWK..",
        "..KWWWWWWWWWWK..",
        "...KWWWWWWWWK...",
        "....KKWWWWKK....",
        "......KKKK......",
    ]),
    # Malware: a virus
    "malware": ("#2ee59d", [
        ".......KK.......",
        ".......KK.......",
        "..KK..KKKK..KK..",
        "...KK.KKKK.KK...",
        "....KKKKKKKK....",
        "...KKPPKKKKKK...",
        "...KPPKKKKKKK...",
        "KKKKKKKKKKKKKKKK",
        "KKKKKKKKKKKPKKKK",
        "...KKKKKKKPPK...",
        "...KKKKKKKKKK...",
        "....KKKKKKKK....",
        "...KK.KKKK.KK...",
        "..KK..KKKK..KK..",
        ".......KK.......",
        ".......KK.......",
    ]),
    # Supply chain: a parcel
    "supply-chain": ("#d97a00", [
        "................",
        "................",
        "....KKKKKKKK....",
        "...KCCCKKCCCK...",
        "..KCCCCKKCCCCK..",
        ".KKKKKKKKKKKKKK.",
        ".KCCCCCKKCCCCCK.",
        ".KCCCCCKKCCCCCK.",
        ".KCCCCCCCCCCCCK.",
        ".KCCCCCCCCCCCCK.",
        ".KCCKKKCCCCCCCK.",
        ".KCCCCCCCCCCCCK.",
        ".KCCKKKKKCCCCCK.",
        ".KCCCCCCCCCCCCK.",
        ".KKKKKKKKKKKKKK.",
        "................",
    ]),
    # APT / nation-state: a ghost
    "apt": ("#002fa7", [
        "................",
        "......WWWW......",
        "....WWWWWWWW....",
        "...WWWWWWWWWW...",
        "..WWWWWWWWWWWW..",
        "..WWKKWWWWKKWW..",
        "..WWKKWWWWKKWW..",
        "..WWWWWWWWWWWW..",
        "..WWWWWWWWWWWW..",
        "..WWWWWKKWWWWW..",
        "..WWWWWWWWWWWS..",
        "..WWWWWWWWWWWS..",
        "..WWWWWWWWWWSS..",
        "..WWW.WWWW.WWS..",
        "..WW...WW...WS..",
        "................",
    ]),
    # Law & policy: a sheriff shield
    "law": ("#11a08a", [
        "................",
        "..KKKKKKKKKKKK..",
        "..KWWWWWWWWWWK..",
        "..KWWWWYYWWWWK..",
        "..KWWWWYYWWWWK..",
        "..KWYYYYYYYYWK..",
        "..KWWYYYYYYWWK..",
        "..KWWWYYYYWWWK..",
        "..KWWYYWWYYWWK..",
        "..KWYYWWWWYYWK..",
        "...KWWWWWWWWK...",
        "....KWWWWWWK....",
        ".....KWWWWK.....",
        "......KWWK......",
        ".......KK.......",
        "................",
    ]),
}


def check(name: str, rows: list[str]) -> None:
    if len(rows) != 16 or any(len(r) != 16 for r in rows):
        raise SystemExit(f"{name}: sprite must be 16x16")
    unknown = {c for r in rows for c in r} - set(PALETTE) - {"."}
    if unknown:
        raise SystemExit(f"{name}: unknown colours {unknown}")


def to_svg(background: str, rows: list[str]) -> str:
    rects = []
    for y, row in enumerate(rows):
        x = 0
        while x < 16:
            c = row[x]
            run = 1
            while x + run < 16 and row[x + run] == c:
                run += 1
            if c != ".":
                rects.append(f'<rect x="{x}" y="{y}" width="{run}" height="1" fill="{PALETTE[c]}"/>')
            x += run
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" '
            'shape-rendering="crispEdges">'
            f'<rect width="16" height="16" fill="{background}"/>' + "".join(rects) + "</svg>\n")


def main() -> None:
    out = Path(__file__).resolve().parent.parent / "static" / "img" / "badges"
    out.mkdir(parents=True, exist_ok=True)
    for name, (background, rows) in BADGES.items():
        check(name, rows)
        (out / f"{name}.svg").write_text(to_svg(background, rows), encoding="utf-8")
    print(f"wrote {len(BADGES)} badges to {out}")

    if len(sys.argv) > 1:  # preview sheet
        from PIL import Image, ImageDraw
        scale, pad = 8, 16
        sheet = Image.new("RGB", (len(BADGES) * (16 * scale + pad) + pad, 16 * scale + 2 * pad), "#f5f3ee")
        draw = ImageDraw.Draw(sheet)
        for i, (background, rows) in enumerate(BADGES.values()):
            ox = pad + i * (16 * scale + pad)
            draw.rectangle([ox, pad, ox + 16 * scale - 1, pad + 16 * scale - 1], fill=background)
            for y, row in enumerate(rows):
                for x, c in enumerate(row):
                    if c != ".":
                        draw.rectangle([ox + x * scale, pad + y * scale,
                                        ox + (x + 1) * scale - 1, pad + (y + 1) * scale - 1], fill=PALETTE[c])
        sheet.save(sys.argv[1])
        print(f"preview sheet: {sys.argv[1]}")


if __name__ == "__main__":
    main()
