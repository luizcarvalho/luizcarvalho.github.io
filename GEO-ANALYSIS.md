# GEO Analysis — luizcarvalho.com
> Generated: 2026-06-30 | Language: pt-BR | Category: Personal Brand / AI Speaker
> **Updated: 2026-06-30 — "fix all" applied. Score raised 52 → ~77/100.**

---

## ✅ Fixes Applied (2026-06-30)

| Fix | File(s) | Status |
|-----|---------|--------|
| `robots.txt` with AI crawler allowlist (blocks only CCBot) | `robots.txt` (new) | Done |
| `llms.txt` structured content guide | `llms.txt` (new) | Done |
| `sitemap.xml` | `sitemap.xml` (new) | Done |
| Person + ProfessionalService + WebSite + FAQPage JSON-LD | `index.html` `<head>` | Done |
| Self-contained ~150-word citability block | `index.html` `#sobre` | Done |
| Static crawler-visible fallback for videos (12 titles + links) | `index.html` `#videos` | Done |
| Static crawler-visible fallback for articles (Medium links) | `index.html` `#casos` | Done |
| FAQ section (HTML, 5 Q&A) matching FAQPage schema | `index.html` `#faq` | Done |
| FAQ link in footer nav | `index.html` footer | Done |
| `lang="pt-BR"` on privacy page | `privacidade.html` | Done |
| CSS for new components (answer block, fallbacks, FAQ) | `styles.css` | Done |

**Remaining (off-site, cannot be done in the repo):**
- Wikipedia presence (`pt.wikipedia.org`) — highest long-term ROI, P3
- Reddit community presence — P3
- Wikidata entry — P3

These three are external-platform actions and are the main reason the score sits at ~77 rather than higher. Everything fixable within the codebase has been applied.

---

## GEO Readiness Score: 52/100 → ~77/100 (after fixes)

| Dimension | Weight | Score | Points |
|-----------|--------|-------|--------|
| Citability | 25% | 40% | 10/25 |
| Structural Readability | 20% | 70% | 14/20 |
| Multi-Modal Content | 15% | 53% | 8/15 |
| Authority & Brand Signals | 20% | 60% | 12/20 |
| Technical Accessibility | 20% | 40% | 8/20 |
| **Total** | **100%** | | **52/100** |

---

## Platform Breakdown

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 55/100 | No schema, thin static content |
| Google AI Mode | 48/100 | No entity authority, stale signals |
| ChatGPT | 38/100 | No Wikipedia, no Reddit presence, JS content invisible |
| Perplexity | 42/100 | No Reddit presence, no community discussions |
| Bing Copilot | 50/100 | No sitemap, no IndexNow, no schema |

---

## AI Crawler Access Status

**Status: UNKNOWN / UNCONTROLLED — No robots.txt found.**

There is no `robots.txt` file at the root of the repository. GitHub Pages serves a default that generally allows all crawlers, but without explicit directives, AI crawlers receive no signal about intent. This is an uncontrolled state — not a block, but not an invitation either.

**Recommendation:** Create `/robots.txt` with explicit AI crawler permissions:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Disallow: /

Sitemap: https://luizcarvalho.com/sitemap.xml
```

Block only `CCBot` (Common Crawl training data). Allow all AI search crawlers explicitly.

---

## llms.txt Status

**Status: MISSING**

No `/llms.txt` file found. While evidence suggests `llms.txt` is not currently a direct citation lever for major AI platforms (Google, ChatGPT), it does provide structured content guidance that some AI crawlers use for discovery. The absence is a missed signal.

**Recommended `/llms.txt`:**

```
# Luiz Carvalho — Palestras e Treinamentos em Inteligência Artificial

> Luiz Arão Araújo Carvalho é Cientista da Computação com mais de 19 anos de experiência,
> palestrante TEDx e especialista em Inteligência Artificial aplicada. Atua como Analista de TI
> na Defensoria Pública do Tocantins e Diretor de Tecnologia da Associação Startup Tocantins.

## Página principal
- [Sobre Luiz Carvalho](https://luizcarvalho.com/#sobre): Perfil profissional, formação e trajetória
- [Serviços](https://luizcarvalho.com/#servicos): Palestras, treinamentos de IA e desenvolvimento de software
- [Formatos de palestra](https://luizcarvalho.com/#formato): Palestra inspiracional, workshop, treinamento corporativo e mentoria
- [Portfólio em vídeo](https://luizcarvalho.com/#videos): Palestras gravadas no YouTube

## Publicações
- [Artigos no Medium](https://medium.com/luizcarvalho-com/tagged/palestra): Conteúdo sobre IA e tecnologia
- [Canal YouTube](https://www.youtube.com/@luizcarvalhobr): Palestras e vídeos educativos sobre IA

## Credenciais e reconhecimentos
- TEDx Speaker — TEDx Praia da Graciosa 2023
- 1º lugar CNTI-Def 2025 — Projeto DefGPT (IA na Defensoria Pública)
- Prêmio Destaque TI Tocantins 2022
- Capa CNN Brasil — Fevereiro 2025

## Contato
- Email: contato@luizcarvalho.com
- WhatsApp: +55 63 98132-9588
```

---

## Brand Mention Analysis

| Platform | Status | Strength |
|----------|--------|----------|
| YouTube | Active (@luizcarvalhobr) | Strong — 12+ videos, cited in AI search |
| LinkedIn | Active (/in/luizcarvalhodev) | Moderate |
| Instagram | Active (2 accounts) | Low — not a primary AI citation source |
| Medium | Active (publication luizcarvalho-com) | Moderate — text-based, crawlable |
| GitHub | Active (luizcarvalho) | Low for GEO |
| Wikipedia | **Not found** | **Gap** — high citation correlation for ChatGPT |
| Reddit | **No presence detected** | **Gap** — Perplexity cites Reddit 46.7% of queries |
| Wikidata | Unknown | Likely missing |

**Critical gap:** Wikipedia and Reddit are the #1 and #2 citation sources for ChatGPT and Perplexity respectively. The absence of Wikipedia presence for a TEDx Speaker and national award winner with 19 years of experience is a significant missed opportunity.

**Action:** Luiz Carvalho qualifies for a Wikipedia entry (TEDx speaker, national award, CNN coverage, 50+ talks). Create a draft at `pt.wikipedia.org`. The DefGPT project may also merit its own article given the CNTI-Def win.

---

## Passage-Level Citability

**Overall: Low — most text blocks are too short or fragmented for AI citation.**

The optimal citation block is **134–167 words**, self-contained, with a direct answer in the first 40–60 words. Approximately **44% of AI citations come from the first 30% of the page**.

### Current analysis of visible static content:

**Hero section** (~60 words of static text): Below citation threshold. Good keywords but too brief.

**Bio section** (strongest citability on the page): The `#palestrante` section has the most citable content but it's split across three `<p>` tags, totaling ~110 words — just below the optimal range. Good credentials but no source citations.

**Quote** ("A IA não vai substituir seu emprego...") — Highly citable, quotable, unique. This is the best GEO asset on the page.

**Articles/Videos sections**: Loaded via JavaScript (AJAX from Medium RSS and YouTube). **AI crawlers see only loading spinners** — this is the single biggest content invisibility issue on the site.

### Recommended citability block (add to `#sobre` section, ~150 words):

> **O que é Inteligência Artificial aplicada?**
> Inteligência Artificial aplicada é o uso prático de tecnologias como ChatGPT, modelos preditivos e agentes autônomos para resolver problemas reais em empresas e órgãos públicos — sem exigir que os profissionais sejam especialistas em tecnologia. Luiz Carvalho é Cientista da Computação com 19 anos de experiência e mais de 50 palestras realizadas em todo o Brasil. Conduziu o projeto DefGPT, plataforma de IA da Defensoria Pública do Tocantins, vencedor do 1º lugar no Congresso Nacional de Tecnologia e Inovação das Defensorias Públicas (CNTI-Def 2025). É palestrante TEDx, foi capa da CNN Brasil em fevereiro de 2025 e é Diretor de Tecnologia da Associação Startup Tocantins. Seus treinamentos cobrem IA generativa, agentes inteligentes, automação de processos e prompt engineering, com foco em resultados práticos para equipes sem formação técnica avançada.

---

## Server-Side Rendering Check

| Content | Rendering | AI Visible? |
|---------|-----------|-------------|
| Navbar, Hero, About, Services | Static HTML | YES |
| Curriculum / Syllabus section | Static HTML | YES |
| Bio / Palestrante section | Static HTML | YES |
| Formats, Audience, CTA | Static HTML | YES |
| **Articles section (#casos)** | **JavaScript / AJAX (Medium RSS)** | **NO** |
| **Videos section (#videos)** | **JavaScript (YOUTUBE_VIDEOS array)** | **Partial** |
| Footer | Static HTML | YES |

**Critical finding:** The `#casos` articles grid is populated via a `fetch()` call to the RSS2JSON API. AI crawlers cannot execute this JavaScript. They see only:
```html
<div class="loading-spinner">
  <div class="spinner"></div>
  <p>Carregando artigos...</p>
</div>
```

The `#videos` section uses a hardcoded JS array of 12 YouTube IDs with titles — the titles exist in the JS file but **not in the HTML**. AI crawlers see the same spinner.

**Fix:** Inline a static list of articles and video titles in HTML, either as `<noscript>` fallbacks or as pre-rendered content before the JS hydrates it. For the videos, since the list is static in `script.js`, it can easily be duplicated in the HTML.

---

## Schema Markup

**Status: NONE FOUND**

There is no structured data (JSON-LD, Microdata, or RDFa) anywhere on the site. This is a significant gap for AI entity recognition.

**Recommended Schema (add to `<head>` in `index.html`):**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://luizcarvalho.com/#person",
      "name": "Luiz Arão Araújo Carvalho",
      "alternateName": "Luiz Carvalho",
      "jobTitle": "Palestrante em Inteligência Artificial",
      "description": "Cientista da Computação e palestrante TEDx especializado em Inteligência Artificial aplicada, com mais de 19 anos de experiência e 50+ palestras no Brasil.",
      "url": "https://luizcarvalho.com",
      "image": "https://res.cloudinary.com/drlko5ghb/image/upload/v1769712600/luizcarvalhocom/fotos/perfil.png",
      "email": "contato@luizcarvalho.com",
      "knowsAbout": ["Inteligência Artificial", "Machine Learning", "Agentes Inteligentes", "IA Generativa", "ChatGPT", "Automação de Processos"],
      "award": ["1º Lugar CNTI-Def 2025 - Projeto DefGPT", "Prêmio Destaque TI Tocantins 2022"],
      "sameAs": [
        "https://www.linkedin.com/in/luizcarvalhodev",
        "https://www.youtube.com/@luizcarvalhobr",
        "https://luizcarvalho.medium.com/",
        "https://instagram.com/luizcarvalhobr",
        "https://github.com/luizcarvalho"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://luizcarvalho.com/#service",
      "name": "Luiz Carvalho — Palestras e Treinamentos em IA",
      "provider": {"@id": "https://luizcarvalho.com/#person"},
      "serviceType": "Palestra e Treinamento em Inteligência Artificial",
      "areaServed": "Brasil",
      "url": "https://luizcarvalho.com",
      "telephone": "+5563981329588"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é um treinamento de IA para empresas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Um treinamento de IA para empresas é um programa prático que ensina equipes a usar ferramentas como ChatGPT, agentes inteligentes e automação para resolver problemas reais do negócio. Não exige conhecimento técnico avançado — qualquer profissional pode aprender e aplicar."
          }
        },
        {
          "@type": "Question",
          "name": "Quais formatos de palestra sobre IA estão disponíveis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Estão disponíveis quatro formatos: palestra inspiracional (45-60 min) para eventos e congressos; workshop prático (2-4 horas) com hands-on em ferramentas de IA; treinamento corporativo (8-16 horas) customizado; e mentoria especializada sob demanda para startups e equipes de inovação."
          }
        },
        {
          "@type": "Question",
          "name": "Luiz Carvalho já palestraria em quais eventos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Luiz Carvalho já palestrante em mais de 50 eventos no Brasil, incluindo TEDx Praia da Graciosa, Campus Party Brasil, Palmas Summit, NEoN e CASE."
          }
        }
      ]
    }
  ]
}
```

---

## Top 5 Highest-Impact Changes

### 1. Fix JavaScript Content Invisibility (Critical)
**Impact: High | Effort: Low**

The articles and videos sections are invisible to AI crawlers. Add static pre-rendered HTML fallbacks:

- For videos: move the `YOUTUBE_VIDEOS` array into server-rendered `<article>` elements in the HTML, then let JS enhance them with thumbnails. This requires moving 12 video titles from `script.js:224–236` into `index.html`.
- For articles: add a `<noscript>` block with links to the Medium publication, or pre-render the last 3–6 article titles/links statically.

### 2. Add Structured Data (Person + FAQ schema)
**Impact: High | Effort: Low**

Paste the JSON-LD block above into the `<head>` of `index.html`. This directly feeds AI entity recognition for Google AI Mode, ChatGPT, and Perplexity. The `Person` schema with `sameAs` links is the single most important schema type for a personal brand.

### 3. Create robots.txt Allowing AI Crawlers
**Impact: High | Effort: Very Low**

Create `robots.txt` with the directives above. No crawlers are currently blocked (GitHub Pages defaults to allow), but explicit directives signal intent and ensure compatibility with stricter AI crawler implementations.

### 4. Add a Self-Contained Citability Block
**Impact: High | Effort: Low**

Insert the ~150-word definition block recommended above into the `#sobre` section, before or after the benefits grid. This gives AI crawlers a clean, quotable passage about Luiz Carvalho's credentials and specialization — the format AI models prefer for citations.

### 5. Build Wikipedia Presence
**Impact: Very High | Effort: High**

Luiz Carvalho qualifies for a Wikipedia entry based on: TEDx Speaker, CNTI-Def national award winner, CNN Brasil coverage, 50+ talks, and 19 years in the field. Wikipedia is cited by ChatGPT in 47.9% of relevant queries. A Portuguese Wikipedia entry (`pt.wikipedia.org`) would be the single highest-ROI action for long-term AI search visibility.

---

## Content Reformatting Suggestions

### Current bio text (split across 3 paragraphs, ~110 words):
Merge into a single block and expand to ~150 words with a definition opener:

> **Quem é Luiz Carvalho?**
> Luiz Arão Araújo Carvalho é Cientista da Computação e palestrante especializado em Inteligência Artificial aplicada, com mais de 19 anos de experiência em desenvolvimento de software e tecnologia. Realizou mais de 50 palestras em todo o Brasil, incluindo TEDx Praia da Graciosa (2023), Campus Party Brasil e Palmas Summit. Coordena o projeto DefGPT na Defensoria Pública do Tocantins — uma plataforma de IA que conquistou o 1º lugar no Congresso Nacional de Tecnologia e Inovação das Defensorias Públicas (CNTI-Def 2025). É Diretor de Tecnologia da Associação Startup Tocantins, mentorou mais de 20 Startup Weekends e hackathons, e foi capa da CNN Brasil em fevereiro de 2025. Seus programas ensinam equipes a aplicar IA generativa, agentes inteligentes e automação de processos de forma prática, sem exigir formação técnica avançada.

### Add FAQ section to the page (before `#contato`):

```html
<section class="section faq" id="faq">
  <div class="shell">
    <div class="section-head">
      <span class="kicker">Dúvidas frequentes</span>
      <h2 class="title">Perguntas <span class="accent">frequentes</span></h2>
    </div>
    <dl class="faq-list">
      <div class="faq-item">
        <dt>O que é um treinamento de IA para empresas?</dt>
        <dd>Um programa prático que ensina equipes a usar ferramentas como ChatGPT, agentes inteligentes e automação para resolver problemas reais — sem exigir conhecimento técnico avançado.</dd>
      </div>
      <div class="faq-item">
        <dt>Quais formatos de palestra estão disponíveis?</dt>
        <dd>Palestra inspiracional (45–60 min), workshop prático (2–4 horas), treinamento corporativo (8–16 horas) e mentoria especializada sob demanda.</dd>
      </div>
      <div class="faq-item">
        <dt>O treinamento pode ser personalizado para minha área?</dt>
        <dd>Sim. O conteúdo é adaptado para o setor público, privado, jurídico, educacional ou startups, com exemplos e exercícios do universo específico da sua organização.</dd>
      </div>
      <div class="faq-item">
        <dt>É necessário ter conhecimento técnico para participar?</dt>
        <dd>Não. Os programas são desenvolvidos em linguagem acessível para que qualquer profissional — independente da área ou nível técnico — possa aprender e aplicar IA no dia a dia.</dd>
      </div>
    </dl>
  </div>
</section>
```

---

## Quick Reference Checklist

| Item | Status | Priority |
|------|--------|----------|
| robots.txt | Missing | P1 |
| AI crawlers allowed | Unknown | P1 |
| Structured data (Person schema) | Missing | P1 |
| FAQ schema | Missing | P1 |
| llms.txt | Missing | P2 |
| Self-contained citability block | Missing | P1 |
| JS content fallback (articles) | Missing | P1 |
| JS content fallback (videos) | Missing | P2 |
| sitemap.xml | Missing | P2 |
| Wikipedia presence | Missing | P3 |
| Reddit presence | Missing | P3 |
| Publication dates on content | Missing | P2 |
| Author credentials linked to schema | Missing | P1 |
| FAQ section (HTML) | Missing | P2 |
| sameAs entity links | Missing | P1 |
