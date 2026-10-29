"""Generates the two wide line-art bands (fish + village) for the site."""
import math, random, sys, os

OUT = sys.argv[1]
HEAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'

# ---------------- fish band ----------------
FISH = {
"mackerel": """<path d="M-45 0 C-30 -15 10 -17 32 -5 L48 -16 L43 0 L48 16 L32 5 C10 17 -30 15 -45 0 Z"/>
<circle cx="-33" cy="-3" r="2.4" fill="#000" stroke="none"/><path d="M-24 -9 C-20 -3 -20 3 -24 9"/>
<path d="M-12 -11 q5 3 0 6 q5 3 0 6" stroke-width="1.4"/><path d="M0 -12 q5 3 0 6 q5 3 0 6" stroke-width="1.4"/><path d="M12 -10 q4 3 0 6 q4 3 0 6" stroke-width="1.4"/>
<path d="M-8 -13 C0 -22 12 -20 20 -9"/><path d="M-4 12 C3 18 12 16 18 9"/><path d="M-14 3 C-8 6 -2 5 2 2" stroke-width="1.4"/>""",
"angel": """<path d="M-30 0 C-20 -18 0 -22 14 -6 L26 -16 L24 0 L26 16 L14 6 C0 22 -20 18 -30 0 Z"/>
<path d="M-14 -14 C-6 -40 10 -38 12 -8"/><path d="M-14 14 C-6 40 10 38 12 8"/>
<path d="M-12 -14 C-16 0 -16 0 -12 14" stroke-width="1.4"/><path d="M0 -17 C-4 0 -4 0 0 17" stroke-width="1.4"/>
<circle cx="-21" cy="-3" r="2.2" fill="#000" stroke="none"/>""",
"puffer": """<circle cx="0" cy="0" r="18"/><path d="M17 -4 L30 -11 L28 0 L30 11 L17 4"/>
<circle cx="-8" cy="-6" r="2.4" fill="#000" stroke="none"/><circle cx="-18" cy="3" r="2"/>
<path d="M-2 4 C2 10 8 8 8 2" stroke-width="1.4"/>""" + "".join(
    f'<path d="M{18*math.cos(a):.1f} {18*math.sin(a):.1f} L{24*math.cos(a):.1f} {24*math.sin(a):.1f}" stroke-width="1.4"/>'
    for a in [math.radians(d) for d in range(200, 340, 22)] + [math.radians(d) for d in range(30, 160, 22)]),
"sardine": """<path d="M-20 0 C-12 -7 6 -7 14 -2 L22 -7 L20 0 L22 7 L14 2 C6 7 -12 7 -20 0 Z"/>
<circle cx="-13" cy="-1" r="1.5" fill="#000" stroke="none"/><path d="M-6 0 H10" stroke-width="1.2"/>""",
"crab": """<ellipse cx="0" cy="0" rx="16" ry="10"/><path d="M-6 -9 V-15 M6 -9 V-15"/><circle cx="-6" cy="-17" r="2" fill="#000" stroke="none"/><circle cx="6" cy="-17" r="2" fill="#000" stroke="none"/>
<path d="M-15 -4 C-24 -10 -28 -18 -22 -22 C-18 -18 -20 -14 -24 -14"/><path d="M15 -4 C24 -10 28 -18 22 -22 C18 -18 20 -14 24 -14"/>
<path d="M-12 6 L-22 12 M-14 2 L-25 5 M12 6 L22 12 M14 2 L25 5"/>""",
"star": '<path d="M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4 Z"/>',
}

def use(kind, x, y, s=1.0, flip=False, rot=0):
    sx = -s if flip else s
    return f'<g transform="translate({x} {y}) rotate({rot}) scale({sx} {s})">{FISH[kind]}</g>'

def seaweed(x, base, h, n=4):
    d = f"M{x} {base}"
    step = h / n
    for i in range(n):
        dx = 7 if i % 2 == 0 else -7
        d += f" q{dx} {-step/2} 0 {-step}"
    return f'<path d="{d}"/>'

def fish_band():
    W, H = 1200, 230
    p = [HEAD.format(w=W, h=H)]
    # sea floor
    floor = "M0 214 " + " ".join(f"Q{x+30} {206 if (x//60)%2 else 220} {x+60} 214" for x in range(0, W, 60))
    p.append(f'<path d="{floor}"/>')
    random.seed(7)
    for x in range(20, W, 23):
        if random.random() < .45:
            p.append(f'<circle cx="{x}" cy="{220+random.randint(0,6)}" r="1.2" fill="#000" stroke="none"/>')
    for x, h in [(40, 70), (52, 50), (330, 90), (342, 60), (356, 75), (700, 55), (712, 80), (980, 95), (994, 62), (1160, 70)]:
        p.append(seaweed(x, 212, h, 5 if h > 70 else 4))
    # coral fans
    for cx in (520, 1080):
        p.append(f'<path d="M{cx} 212 V180 M{cx} 196 L{cx-14} 176 M{cx} 190 L{cx+16} 168 M{cx-14} 176 L{cx-20} 164 M{cx-14} 176 L{cx-6} 162 M{cx+16} 168 L{cx+10} 154 M{cx+16} 168 L{cx+26} 158"/>')
    p.append(use("crab", 600, 196, .9))
    p.append(use("star", 860, 204, .9, rot=12))
    p.append(use("star", 250, 206, .7, rot=-20))
    # fish
    school = [("mackerel", 150, 70, 1.1, False), ("mackerel", 250, 40, .8, False), ("sardine", 95, 130, 1, False),
              ("angel", 440, 110, 1.1, True), ("sardine", 560, 62, 1.1, False), ("sardine", 600, 84, 1, False), ("sardine", 590, 40, .9, False),
              ("puffer", 780, 100, 1.1, False), ("mackerel", 920, 58, 1, True), ("angel", 1060, 96, .9, False),
              ("sardine", 1130, 40, .9, True), ("mackerel", 1010, 150, .7, True), ("sardine", 300, 150, .9, True)]
    for k, x, y, s, f in school:
        p.append(use(k, x, y, s, f))
    for x, y, r in [(110, 40, 4), (118, 26, 2.6), (400, 50, 3.5), (408, 34, 2.2), (740, 52, 3), (746, 38, 2), (1110, 70, 3.2), (1102, 56, 2), (660, 140, 2.6), (210, 120, 2.4)]:
        p.append(f'<circle cx="{x}" cy="{y}" r="{r}"/>')
    p.append("</svg>")
    return "\n".join(p)

# ---------------- village band ----------------
def stilt_house(x, w, h, base=196, roof=26, door=True, ladder=True):
    top = base - 34 - h
    s = [f'<path d="M{x} {base-34} V{top} H{x+w} V{base-34} Z"/>',
         f'<path d="M{x-10} {top} L{x+w/2} {top-roof} L{x+w+10} {top} Z"/>',
         f'<path d="M{x+w/2-6} {top-roof+8} h12" stroke-width="1.2"/>',
         f'<path d="M{x-6} {base-34} H{x+w+6}"/>']
    for i in range(0, int(w)+1, int(w/4)):
        s.append(f'<path d="M{x+i} {base-34} V{base}"/>')
    for yy in range(int(top)+8, base-36, 7):
        s.append(f'<path d="M{x+2} {yy} h{w*0.18:.0f}" stroke-width="1"/>')
    s.append(f'<rect x="{x+w*0.28:.0f}" y="{top+12}" width="{w*0.2:.0f}" height="{h*0.32:.0f}"/>')
    s.append(f'<path d="M{x+w*0.38:.0f} {top+12} v{h*0.32:.0f}" stroke-width="1"/>')
    if door:
        s.append(f'<path d="M{x+w*0.62:.0f} {base-34} v{-h*0.55:.0f} h{w*0.18:.0f} v{h*0.55:.0f}"/>')
    if ladder:
        lx = x + w * 0.66
        s.append(f'<path d="M{lx:.0f} {base-34} L{lx+12:.0f} {base} M{lx+10:.0f} {base-34} L{lx+22:.0f} {base}"/>')
        for k in range(1, 4):
            s.append(f'<path d="M{lx+3*k+1:.0f} {base-34+8.5*k:.0f} h10" stroke-width="1.2"/>')
    return "".join(s)

def palm(x, base, h, lean=1):
    tx, ty = x + 14 * lean, base - h
    s = [f'<path d="M{x} {base} C{x} {base-h*0.4} {x+10*lean} {base-h*0.75} {tx} {ty}"/>']
    for k in range(1, 6):
        yy = base - h * k / 6
        s.append(f'<path d="M{x-3+3*lean*k/6:.0f} {yy:.0f} h7" stroke-width="1"/>')
    for dx, dy in [(-26, 6), (-18, -10), (0, -16), (20, -10), (28, 6), (14, 12), (-14, 12)]:
        s.append(f'<path d="M{tx} {ty} Q{tx+dx*0.6:.0f} {ty+dy-10:.0f} {tx+dx} {ty+dy}"/>')
    return "".join(s)

def person(x, base, kind="woman", s=1.0, facing=1):
    hy = base - 46 * s
    out = [f'<circle cx="{x}" cy="{hy:.0f}" r="{6*s:.1f}"/>']
    if kind == "woman":  # hijab + long skirt
        out.append(f'<path d="M{x-7*s:.0f} {hy+2*s:.0f} C{x-9*s:.0f} {hy+12*s:.0f} {x+9*s:.0f} {hy+12*s:.0f} {x+7*s:.0f} {hy+2*s:.0f}"/>')
        out.append(f'<path d="M{x-6*s:.0f} {hy+10*s:.0f} L{x-11*s:.0f} {base} H{x+11*s:.0f} L{x+6*s:.0f} {hy+10*s:.0f}"/>')
    elif kind == "man":
        out.append(f'<path d="M{x} {hy+6*s:.0f} V{base-18*s:.0f} M{x} {base-18*s:.0f} L{x-6*s:.0f} {base} M{x} {base-18*s:.0f} L{x+6*s:.0f} {base}"/>')
        out.append(f'<path d="M{x-9*s:.0f} {hy-4*s:.0f} L{x} {hy-12*s:.0f} L{x+9*s:.0f} {hy-4*s:.0f} Z"/>')  # caping hat
    else:  # child
        out.append(f'<path d="M{x} {hy+6*s:.0f} V{base-14*s:.0f} M{x} {base-14*s:.0f} L{x-5*s:.0f} {base} M{x} {base-14*s:.0f} L{x+5*s:.0f} {base}"/>')
    # arms
    out.append(f'<path d="M{x} {hy+13*s:.0f} L{x+11*s*facing:.0f} {hy+22*s:.0f} M{x} {hy+13*s:.0f} L{x-9*s*facing:.0f} {hy+24*s:.0f}"/>')
    return "".join(out)

def boat(x, y, w, sail=False):
    s = [f'<path d="M{x} {y} Q{x+w/2} {y+16} {x+w} {y} L{x+w-8} {y-3} H{x+8} Z"/>',
         f'<path d="M{x+w*0.2:.0f} {y+4} H{x+w*0.8:.0f}" stroke-width="1"/>']
    if sail:
        s.append(f'<path d="M{x+w/2} {y-3} V{y-40} L{x+w/2+22} {y-8} Z"/>')
    else:
        s.append(f'<path d="M{x+w*0.35:.0f} {y-3} v-10 h{w*0.3:.0f} v10"/>')
    return "".join(s)

def village_band():
    W, H = 1200, 240
    base = 214
    p = [HEAD.format(w=W, h=H)]
    p.append(f'<path d="M0 {base} H560"/><path d="M1200 {base} H900"/>')
    # sea between: waves
    for row, yy in enumerate([base + 6, base + 14, base + 22]):
        wave = f"M{0 if row else 0} {yy} " + " ".join(f"q12 -5 24 0" for _ in range(50))
        p.append(f'<path d="{wave}" stroke-width="1.3"/>')
    p.append(f'<circle cx="1080" cy="46" r="20"/>')
    for bx, by in [(140, 40), (162, 30), (720, 50), (742, 58), (990, 30)]:
        p.append(f'<path d="M{bx-7} {by} q3.5 -5 7 0 q3.5 -5 7 0" stroke-width="1.4"/>')
    p.append(palm(30, base, 120, 1))
    p.append(stilt_house(70, 92, 62))
    p.append(palm(190, base, 95, -1))
    p.append(stilt_house(215, 74, 48, ladder=False))
    # mosque
    mx = 330
    p.append(f'<path d="M{mx} {base} V140 H{mx+80} V{base}"/><path d="M{mx+8} 140 C{mx+8} 104 {mx+72} 104 {mx+72} 140"/><path d="M{mx+40} 112 V96"/><path d="M{mx+36} 92 a4 4 0 1 0 8 0 a6 6 0 1 1 -8 0" stroke-width="1.4"/>')
    p.append(f'<path d="M{mx+28} {base} V176 a12 12 0 0 1 24 0 V{base}"/><path d="M{mx+98} {base} V120 M{mx+90} {base} V120 M{mx+88} 120 L{mx+94} 106 L{mx+100} 120 Z"/>')
    p.append(palm(450, base, 110, 1))
    # people on land
    p.append(person(485, base, "woman", 1.0, 1))
    p.append('<path d="M500 186 q6 10 14 0 Z"/>')  # basket on arm
    p.append(person(520, base, "child", .8, -1))
    p.append(person(540, base, "child", .7, 1))
    # jetty over the water
    p.append(f'<path d="M560 {base-8} H700"/>' + "".join(f'<path d="M{x} {base-8} V{base+24}"/>' for x in range(570, 701, 26)))
    p.append(person(640, base - 8, "man", .95, 1))
    p.append('<path d="M651 172 L700 140 M700 140 L706 196" stroke-width="1.2"/>')  # fishing rod + line
    # boats
    p.append(boat(720, base + 2, 70))
    p.append(boat(800, base + 6, 60, sail=True))
    # kelong (fishing platform on poles)
    kx = 880
    p.append(f'<path d="M{kx} 160 H{kx+100}"/><path d="M{kx+10} 160 V128 H{kx+60} V160"/><path d="M{kx+4} 128 L{kx+35} 108 L{kx+66} 128 Z"/>')
    for x in range(kx, kx + 101, 14):
        p.append(f'<path d="M{x} 160 V{base+24}"/>')
    p.append(f'<path d="M{kx} 172 L{kx+98} 200 M{kx} 200 L{kx+98} 172" stroke-width="1"/>')
    p.append(f'<path d="M{kx+70} 160 V146 M{kx+78} 160 V146 M{kx+68} 146 H{kx+92} V160" stroke-width="1.2"/>')
    p.append(stilt_house(1000, 80, 54))
    p.append(palm(1110, base, 104, -1))
    p.append(person(1150, base, "woman", .95, -1))
    p.append(f'<path d="M1132 162 q-14 -10 -28 0" stroke-width="1"/>')  # clothesline
    p.append("</svg>")
    return "\n".join(p)

def tint(svg, colour):
    return svg.replace('stroke="#000"', f'stroke="{colour}"').replace('fill="#000"', f'fill="{colour}"')

# Colours are baked in (no CSS masks) so the drawings also show when the site is opened from disk.
open(os.path.join(OUT, "fish-band.svg"), "w").write(tint(fish_band(), "#366baa"))
open(os.path.join(OUT, "village-band.svg"), "w").write(tint(village_band(), "#f9e6ea"))
print("ok")
