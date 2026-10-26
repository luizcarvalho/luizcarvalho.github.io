#!/usr/bin/env python3
"""Baixa o feed RSS do Medium e grava assets/data/articles.json.

O site é estático (GitHub Pages) e não consegue ler o feed do Medium direto
do navegador por causa de CORS. Este script roda na GitHub Action
`update-articles.yml` (e pode ser rodado localmente) para gerar uma cópia
do feed servida pelo próprio domínio.

Uso: python3 scripts/update_articles.py
"""

import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

FEED_URL = "https://medium.com/feed/luizcarvalho-com/tagged/Palestra"
OUTPUT = Path(__file__).resolve().parent.parent / "assets" / "data" / "articles.json"
DESCRIPTION_LENGTH = 200

NS = {"content": "http://purl.org/rss/1.0/modules/content/"}


def fetch_feed(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (luizcarvalho.com feed sync)"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def strip_html(markup):
    text = re.sub(r"<[^>]+>", " ", markup)
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def parse_items(xml_bytes):
    root = ET.fromstring(xml_bytes)
    articles = []
    for item in root.iter("item"):
        content = item.findtext("content:encoded", default="", namespaces=NS) or item.findtext("description", default="")
        image_match = re.search(r'<img[^>]+src="([^"]+)"', content)
        # Remove o parâmetro de rastreamento "?source=rss..." do link
        link = (item.findtext("link") or "").split("?source=")[0]
        articles.append({
            "title": (item.findtext("title") or "").strip(),
            "link": link,
            "pubDate": item.findtext("pubDate") or "",
            "image": image_match.group(1) if image_match else "",
            "description": strip_html(content)[:DESCRIPTION_LENGTH] + "...",
        })
    return articles


def main():
    articles = parse_items(fetch_feed(FEED_URL))
    if not articles:
        # Não sobrescreve o arquivo bom com uma lista vazia
        sys.exit("Feed sem itens; articles.json mantido como estava.")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps({"items": articles}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(articles)} artigos gravados em {OUTPUT}")


if __name__ == "__main__":
    main()
