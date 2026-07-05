# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal landing page for Luiz Carvalho (AI speaker/trainer in Brazil), in Portuguese (pt-BR), hosted on GitHub Pages at `luizcarvalho.com`. It is a **static site with no build step**: plain HTML, CSS, and vanilla JavaScript. There is no package.json, bundler, or test suite.

## Running locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works — there's nothing to compile or install.

## Architecture

- `index.html` — the entire site is a single-page landing page with anchor-linked sections (`#sobre`, `#servicos`, `#conteudo`, `#casos`, `#videos`, `#palestrante`, `#publico`, `#formato`, `#faq`, `#contato`). New content should be added as a new `<section class="section ...">` block plus a corresponding nav link, not a new page.
- `about.html` / `about.md` — secondary bio page (about.md is a stub reference, about.html has the rendered content).
- `privacidade.html` — standalone privacy policy page.
- `styles.css` — single stylesheet driving the whole site. All design tokens (colors, spacing, radii, shadows, motion) are CSS custom properties in `:root` at the top — colors use OKLCH. Reuse these tokens instead of hardcoding new values. Design language is "Keynote": light, editorial, warm clay accent color, no glassmorphism/gradient text/card grids.
- `script.js` — vanilla JS, no framework, no bundler. Handles: navbar scroll/toggle, smooth scroll, scroll-reveal via `IntersectionObserver`, and two client-side-rendered feeds:
  - **Articles**: fetched at runtime from the Medium RSS feed (`medium.com/feed/luizcarvalho-com/tagged/Palestra`) through the `rss2json` public API (`RSS2JSON_API` constant), rendered with pagination (`ARTICLES_PER_PAGE`).
  - **Videos**: a hardcoded `YOUTUBE_VIDEOS` array of `{id, title}`; thumbnails load from `img.youtube.com`, and clicking a thumbnail swaps in a lazy-loaded YouTube iframe embed. To add/remove a video, edit this array directly.
  - Because these feeds are JS-rendered, `index.html` also carries **static crawler-visible fallback content** (links/titles) for AI/search crawlers that don't execute JavaScript — keep these fallbacks in sync when changing the video list or article source.

## SEO / GEO (AI search) setup

This site has been explicitly tuned for both traditional SEO and GEO (Generative Engine Optimization — visibility in AI Overviews, ChatGPT, Perplexity, Bing Copilot). When editing head/meta content, keep these in sync:

- `robots.txt` — explicitly allows major AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, OAI-SearchBot) and disallows only `CCBot` (Common Crawl training data). Don't casually add blanket `Disallow` rules.
- `llms.txt` — structured Markdown summary of the site's pages, credentials, and contact info for LLM consumption. Update it when sections/links in `index.html` change materially.
- `sitemap.xml` — keep URLs in sync with actual pages.
- JSON-LD in `index.html`'s `<head>` (`@graph` with `Person`, `ProfessionalService`, `WebSite`, `FAQPage`) — the `FAQPage` schema's questions must match the visible FAQ section content (`#faq`) word-for-word; if you edit one, edit the other.
- The `#sobre` section contains a short, self-contained "citability" answer block written for LLM extraction — keep it factual and quotable (short sentences, concrete numbers/credentials) rather than marketing copy.

## Notes

- `.env` / `.env.example` contain Cloudinary/TinyPNG placeholder keys but nothing in the current codebase reads them — they are not wired into any build or script.
- Profile/OG images are hosted on Cloudinary (`res.cloudinary.com/drlko5ghb/...`), not stored in the repo.
- `_arts/` holds source design assets (logos, fonts) that are not directly published/referenced by the site — don't assume files here are live.
- Google Analytics (`gtag.js`) is loaded directly in `index.html`'s `<head>`.
