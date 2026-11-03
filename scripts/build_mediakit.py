#!/usr/bin/env python3
"""Gera mediakit/images.json a partir de assets/versoes (requer Pillow)."""
import json, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(ROOT, "assets", "versoes")
TITLES = {
    "01-logo-sem-fundo": "Logo sem fundo",
    "02-logo-com-fundo": "Logo com fundo",
    "03-simbolo": "Símbolo",
    "04-enquadramentos": "Enquadramentos",
    "05-perfil-avatares": "Perfil e avatares",
    "06-banners-e-capas": "Banners e capas",
    "07-redes-sociais": "Redes sociais",
    "08-web-favicons-email": "Web, favicons e e-mail",
}
groups = {k: [] for k in TITLES}
for dp, _, fs in os.walk(BASE):
    for f in fs:
        if not f.lower().endswith((".png", ".gif")):
            continue
        p = os.path.join(dp, f)
        rel = os.path.relpath(p, BASE).replace(os.sep, "/")
        with Image.open(p) as im:
            w, h = im.size
        groups[rel.split("/")[0]].append({"src": "/assets/versoes/" + rel, "w": w, "h": h,
                                          "name": os.path.splitext(f)[0], "ext": os.path.splitext(f)[1][1:].lower(), "path": "/".join(rel.split("/")[1:-1])})
out = []
for k, items in groups.items():
    items.sort(key=lambda i: (i["path"].startswith("animado"), i["path"], i["name"]))
    out.append({"id": k, "title": TITLES[k], "images": items})
with open(os.path.join(ROOT, "mediakit", "images.json"), "w", encoding="utf-8") as fh:
    json.dump(out, fh, ensure_ascii=False, separators=(",", ":"))
print(sum(len(g["images"]) for g in out), "imagens")
