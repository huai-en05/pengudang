"""Builds the two wide line-art bands from public-domain Pearson Scott Foresman
engravings (Wikimedia Commons). Each drawing is turned into a transparent,
tinted cut-out and placed on a wide canvas.

usage: python tools/bands.py <folder with the downloaded PSF pngs> images/graphics
"""
import sys, os
from PIL import Image, ImageOps

SRC, OUT = sys.argv[1], sys.argv[2]


def cutout(name, height, colour, flip=False):
    im = Image.open(os.path.join(SRC, name)).convert("RGBA")
    bg = Image.new("RGBA", im.size, "white")
    bg.alpha_composite(im)
    grey = ImageOps.grayscale(bg)
    # dark ink -> opaque, paper -> transparent (with a little noise floor)
    alpha = grey.point(lambda v: max(0, min(255, int((235 - v) * 1.35))))
    alpha = alpha.crop(alpha.getbbox())
    w = round(alpha.width * height / alpha.height)
    alpha = alpha.resize((w, height), Image.LANCZOS)
    if flip:
        alpha = ImageOps.mirror(alpha)
    tile = Image.new("RGBA", alpha.size, colour)
    tile.putalpha(alpha)
    return tile


def band(items, size, colour, out):
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    for name, x, y, h, *rest in items:
        flip = bool(rest and rest[0])
        t = cutout(name, h, colour, flip)
        canvas.alpha_composite(t, (x - t.width // 2, y - t.height))  # x = centre, y = baseline
    canvas.save(os.path.join(OUT, out), optimize=True)
    print(out, canvas.size)


BLUE = (54, 107, 170, 255)
PINK = (249, 230, 234, 255)

# sea: drawn on a 2400 x 520 canvas (shown at half size), y = bottom of each drawing
band([
    ("starfish.png",     170, 470, 150),
    ("herring.png",      470, 230, 120, True),
    ("crab.png",         560, 480, 150),
    ("flying-fish.png",  860, 160, 120),
    ("turtle.png",      1180, 460, 300),
    ("octopus.png",     1520, 480, 230),
    ("wrasse.png",      1600, 210, 130, True),
    ("pollock.png",     1960, 300, 110),
    ("shrimp.png",      2230, 480, 230),
    ("trout---fish.png", 230, 280, 100, True),
], (2400, 520), BLUE, "fish-band.png")

# coast: palms, a hut, boats and a pelican on a 2400 x 520 canvas
band([
    ("palm-1.png",        130, 500, 420),
    ("thatch-hut.png",    400, 500, 280),
    ("banana.png",        640, 500, 330),
    ("pelican.png",       880, 500, 190, True),
    ("lateen-sails.png", 1260, 470, 330),
    ("lateen-sails.png", 1700, 440, 190, True),
    ("coconut.png",      2010, 500, 100),
    ("palm-1.png",       2250, 500, 470, True),
], (2400, 520), PINK, "village-band.png")
