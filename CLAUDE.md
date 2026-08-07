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

- `index.html` — the entire site is a single-page landing page with anchor-linked sections (`#sobre`, `#servicos`, `#conteudo`, `#casos`, `#videos`, `#palestrante`, `#publico`, `#formato`, `#faq`, `#contato`). New content should be added as a new `<section class="section ...">` block plus a corresponding nav link, not a new page. Smaller supporting blocks (a further-reading list, an author box) belong *inside* the closest existing section instead — the top nav is already at capacity, and a nav link per sub-block would overflow it.
- `about.html` — author/bio page ("Sobre Luiz Carvalho"): the E-E-A-T verification target that `index.html` links to. Uses the shared `styles.css` with `<body class="subpage">`. (`about.md` is a leftover one-line stub, not published.)
- `privacidade.html` — standalone privacy policy page (LGPD), also a `subpage`.
- `blog/` — the blog area, the one place where *new pages* (rather than new `index.html` sections) are the right answer.
  - `blog/index.html` is the hub: two `.answer-block`s explaining the blog, then a `.post-list` of `<article class="post-row">` rows, newest first. It is hand-maintained — there is no generator.
  - Each post is its own folder with an `index.html`: `blog/<slug>/index.html`, so the URL is `/blog/<slug>/`. Slugs are keyword-shaped and hyphenated (`prompt-auditoria-seguranca-app-ia`).
  - `blog/blog.css` extends `styles.css` with post-list, long-form article, callout, numbered-step, prompt-block and author-box styles. It defines no new colors — everything comes from the `:root` tokens.
  - A post carries `BlogPosting` + `WebPage` (holding `breadcrumb` and `speakable`) + `BreadcrumbList` + `FAQPage` JSON-LD, and its `BlogPosting` must also be listed in `blogPost` on `blog/index.html`'s `Blog` node.
  - Publishing a post means four extra edits: the row on `blog/index.html`, the `blogPost` entry, two `<url>` blocks in `sitemap.xml`, and the `## Blog` section of `llms.txt`.
  - Long code/prompt blocks go in `.prompt-block` (dark stage surface, copy button). Escape `<`, `>` and `&` inside `<pre><code>`, and give the `<code>` an id the inline copy script reads.
  - The blog is reached from the `#casos` section, the footer nav and the "Leitura complementar" hubs — **not** from the top nav, which is still at capacity.
- Subpages (`about.html`, `privacidade.html`, `calculadora/`, `blog/`) follow one convention: `<body class="subpage">`, a `.subpage-head` with a visible `.breadcrumb` + matching `BreadcrumbList` JSON-LD, and a minimal footer. **They must not load `script.js`** — `initNavbar()` doesn't null-guard `#navbar`/`#nav-toggle` and throws on pages without the full navbar. Use a two-line inline script for the footer year instead.
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
- JSON-LD in `index.html`'s `<head>` (`@graph` with `Person`, `ProfessionalService`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`) — the `FAQPage` schema's questions **and answers** must match the visible FAQ section (`#faq`) word-for-word; if you edit one, edit the other. Same rule for the `FAQPage` in `calculadora/index.html`.
- The `#sobre` section contains self-contained "citability" answer blocks (`.answer-block`) written for LLM extraction — keep them factual and quotable (short sentences, concrete numbers/credentials) rather than marketing copy.

## GEO writing rules (apply to any new or edited copy)

These came out of the audit in `docs/seo-diagnostic.html` and are what AI-search scorers actually measure. Apply them to every prose paragraph you add — not just to new "SEO sections".

- **Sentence length**: no sentence over 25 words. Split long ones into two. This is a hard rule; long list-sentences get restructured ("Os temas são oito. Os quatro primeiros são: …").
- **Transition words**: at least half of the content paragraphs must open with, or contain early, a connective. Vary the type — addition (*além disso, também*), contrast (*no entanto, por outro lado*), cause (*portanto, por isso, como resultado*), sequence (*primeiro, em seguida, por fim*), example (*por exemplo, ou seja*). Don't repeat the same one.
- **Plain words**: prefer the simple alternative ("tecnologias de servidor" over "server-side", "experiência de uso" over "user experience").
- **Citable answer blocks**: a `.answer-block` paragraph should be **134–167 words** and open with a direct answer statement ("X é…", "O principal motivo é…"). Shorter than ~130 words and AI engines lack context to cite it whole.
- **Q&A format**: prefer question-shaped headings and FAQ entries. New questions should come from real "People Also Ask" intent (cost, location, how to hire, what is X), not invented ones.
- **Internal links**: use descriptive anchor text inside prose, never "clique aqui". Each long-form section should link to 1–2 related sections/pages. The "Leitura complementar" blocks in `#casos` and `about.html` are the cross-linking hubs — add there when a new page appears.
- **Don't invent facts to fill these quotas.** Credentials, prices, cities, and dates must be traceable to something already on the site or confirmed by Luiz. When a fact isn't available (e.g. exact pricing), answer structurally ("depende de quatro fatores: …") instead of guessing.

## Freshness protocol (do this on every content change)

Bump the date in **all** of these, or the freshness signals contradict each other:

1. `<meta name="date">`, `<meta name="last-modified">` and `article:modified_time` in the edited page's `<head>`.
2. `dateModified` on that page's `WebPage`/`ProfilePage` JSON-LD node (and on `FAQPage`, where present).
3. The visible `<time datetime="…">` in the footer ("Conteúdo revisado e atualizado em …").
4. `<lastmod>` for that URL in `sitemap.xml`.
5. The `## Atualização` block in `llms.txt`.

`datePublished` reflects when the page first went live and should not be changed on edits.

## Verifying GEO changes

There's no test suite, so verify by script before considering the work done:

- **JSON-LD parses** and **FAQ parity holds** — parse each `application/ld+json` block with `json.loads`, then diff the `FAQPage` question/answer strings against the `<dt>`/`<dd>` text.
- **Readability/transitions** — extract `<p>`/`<dd>` text, flag any sentence over 25 words, and report the share of paragraphs containing a connective.
- **Internal links resolve** — check every non-external `href` against the file system and, for fragments, against the target page's `id` attributes.
- **Rendering** — headless Chromium is available at `~/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`; run `python3 -m http.server` and screenshot at 1280px and 390px. New prose links need explicit link styling (`.prose a`, `.bio-text a`, `.service-body p a`) — the base stylesheet doesn't style anchors inside body copy by default.

## Notes
- `_arts/` holds source design assets (logos, fonts) that are not directly published/referenced by the site — don't assume files here are live.
- Google Analytics (`gtag.js`) is loaded directly in `index.html`'s `<head>`.

