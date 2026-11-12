#!/usr/bin/env python3
"""Gera o cartão de visitas (frente) em SVG, com textos convertidos em curvas.

Requer fontTools. Baixa a Hanken Grotesk (OFL) do repositório google/fonts
na primeira execução. Saída em assets/versoes/09-papelaria/.
Unidades do SVG: 1 = 0,1 mm (cartão 90 x 50 mm => 900 x 500).
"""
import os, re, urllib.request
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "versoes", "09-papelaria")
LOGO = os.path.join(ROOT, "assets", "versoes", "logo.svg")
FONT_URL = "https://github.com/google/fonts/raw/main/ofl/hankengrotesk/HankenGrotesk%5Bwght%5D.ttf"
FONT = os.path.expanduser("~/.cache/fonts/HankenGrotesk-VF.ttf")

RED, INK, WHITE, MUTED = "#FB0101", "#121214", "#FFFFFF", "#B9B9C0"
PHONE = "(63) 9 8132-9588"
EMAIL = "contato@luizcarvalho.com"
SITE = "luizcarvalho.com"
SERVICES = [["Palestras", "Inteligência Artificial"],
            ["Desenvolvimento de Software", "Curso de IA"]]

if not os.path.exists(FONT):
    os.makedirs(os.path.dirname(FONT), exist_ok=True)
    urllib.request.urlretrieve(FONT_URL, FONT)

_fonts = {}
def font(wght):
    if wght not in _fonts:
        _fonts[wght] = instantiateVariableFont(TTFont(FONT), {"wght": wght})
    return _fonts[wght]

def text(s, x, y, size, wght=500, track=0.0):
    """Retorna (d, largura) do texto s com baseline em (x, y)."""
    f = font(wght); gs = f.getGlyphSet(); cmap = f.getBestCmap(); hmtx = f["hmtx"]
    k = size / f["head"].unitsPerEm
    pen = SVGPathPen(gs); cx = 0.0
    for ch in s:
        g = cmap.get(ord(ch), ".notdef")
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, x + cx, y)))
        cx += hmtx[g][0] * k + track * size
    w = cx - track * size
    return pen.getCommands(), w

def logo(x, y, h, text_fill):
    """Logo oficial (logo.svg) com o topo-esquerdo em (x, y) e altura h."""
    svg = open(LOGO, encoding="utf-8").read()
    paths = re.findall(r'<path\s[^>]*?style="fill:(#[0-9a-fA-F]{6})[^"]*"[^>]*?\sd="([^"]+)"', svg, re.S)
    if not paths:  # atributo d antes do style
        paths = [(m.group(2), m.group(1)) for m in re.finditer(r'd="([^"]+)"[^>]*?style="fill:(#[0-9a-fA-F]{6})', svg, re.S)]
    BX, BY, BH = 41, 94, 664  # bbox do conteúdo no viewBox 1788x880
    s = h / BH
    out = [f'<g transform="translate({x:.2f} {y:.2f}) scale({s:.5f}) translate({-BX} {-BY})">']
    for fill, d in paths:
        c = RED if fill.lower() == "#fb0101" else text_fill
        out.append(f'<path fill="{c}" d="{" ".join(d.split())}"/>')
    out.append("</g>")
    return "\n".join(out), 1704 * s

def symbol_paths():
    svg = open(LOGO, encoding="utf-8").read()
    for m in re.finditer(r'<path\b[^>]*>', svg, re.S):
        tag = m.group(0)
        if "fb0101" in tag.lower():
            return " ".join(re.search(r'\sd="([^"]+)"', tag, re.S).group(1).split())

def icon(kind, x, y):
    """Ícone de linha 24x24 com topo-esquerdo em (x, y)."""
    st = f'fill="none" stroke="{RED}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"'
    if kind == "phone":
        return (f'<g transform="translate({x} {y})" {st}><rect x="6" y="1" width="12" height="22" rx="2.5"/>'
                f'<path d="M10.5 19.5h3"/></g>')
    if kind == "mail":
        return (f'<g transform="translate({x} {y})" {st}><rect x="1" y="4" width="22" height="16" rx="2.5"/>'
                f'<path d="M2 6l10 7 10-7"/></g>')
    return (f'<g transform="translate({x} {y})" {st}><circle cx="12" cy="12" r="10.5"/>'
            f'<ellipse cx="12" cy="12" rx="4.5" ry="10.5"/><path d="M1.5 12h21"/></g>')

def card(bleed=0):
    W, H, b = 900, 500, bleed
    parts = []
    # fundo + marca d'água do símbolo (sangra pela direita)
    parts.append(f'<rect x="{-b}" y="{-b}" width="{W + 2*b}" height="{H + 2*b}" fill="{INK}"/>')
    sym = symbol_paths()
    # símbolo ocupa ~x 41..645, y 407..758 no viewBox original
    s, sx, sy = 0.9, 610, 160  # escala e topo-esquerdo do símbolo (bbox ~604x351)
    # cor sólida (vermelho a ~14% sobre o grafite) em vez de opacidade: imprime igual em qualquer RIP
    parts.append(f'<path fill="#330F11" '
                 f'transform="translate({sx - 41*s:.1f} {sy - 407*s:.1f}) scale({s})" d="{sym}"/>')
    # faixa vermelha na borda esquerda
    parts.append(f'<rect x="{-b}" y="{-b}" width="{14 + b}" height="{H + 2*b}" fill="{RED}"/>')
    # logo
    g, lw = logo(70, 62, 132, WHITE)
    parts.append(g)
    # serviços
    y = 262
    for line in SERVICES:
        x = 72
        for i, item in enumerate(line):
            if i:
                parts.append(f'<circle cx="{x + 13:.1f}" cy="{y - 7.5}" r="3.2" fill="{RED}"/>'); x += 26
            d, w = text(item.upper(), x, y, 21, 600, track=0.08)
            parts.append(f'<path fill="{MUTED}" d="{d}"/>'); x += w
        y += 32
    # divisor
    parts.append(f'<rect x="72" y="326" width="56" height="4" fill="{RED}"/>')
    # contatos
    y = 378
    for kind, value in (("phone", PHONE), ("mail", EMAIL), ("globe", SITE)):
        parts.append(icon(kind, 72, y - 21))
        d, _ = text(value, 112, y, 27, 500)
        parts.append(f'<path fill="{WHITE}" d="{d}"/>')
        y += 42
    vb = f"{-b} {-b} {W + 2*b} {H + 2*b}"
    mm_w, mm_h = (W + 2*b) / 10, (H + 2*b) / 10
    return (f'<?xml version="1.0" encoding="UTF-8"?>\n'
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{mm_w:g}mm" height="{mm_h:g}mm" viewBox="{vb}">\n'
            f'<title>Cartão de visitas — Luiz Carvalho</title>\n'
            + "\n".join(parts) + "\n</svg>\n")

os.makedirs(OUT, exist_ok=True)
for name, bl in (("cartao-de-visitas-frente-90x50mm.svg", 0),
                 ("cartao-de-visitas-frente-sangria-3mm-96x56mm.svg", 30)):
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(card(bl))
    print(name)
