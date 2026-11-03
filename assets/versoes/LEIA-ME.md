# Pacote Completo de Identidade Visual — Luiz Carvalho (PNG)

Todos os arquivos deste pacote foram gerados diretamente a partir do vetor oficial (`logo.svg`) com nitidez máxima, perfis de cor padronizados e ajustes ópticos (como compensação para corte circular em avatares e zonas de segurança *Safe Zones* em capas de redes sociais).

> **Dica rápida:** Abra o arquivo **`CATALOGO-VISUAL.png`** nesta pasta para visualizar uma prancha geral com exemplos de todas as variações.

---

## Paleta Oficial Utilizada

| Cor | Hexadecimal | Uso Principal |
| :--- | :--- | :--- |
| **Vermelho Marca** | `#FB0101` | Símbolo infinito *"Ca"*, destaques e fundos de impacto |
| **Preto Puro** | `#000000` | Tipografia principal (modo claro) e fundos OLED/escuros |
| **Grafite Estúdio** | `#121214` | Fundos *Dark Mode* modernos, banners e cards |
| **Branco Puro** | `#FFFFFF` | Tipografia invertida (modo escuro), marcas d'água e fundos limpos |

---

## Guia das Pastas

### `01-logo-sem-fundo/` — Logo Completa Transparente
Ideal para aplicar sobre sites, vídeos, thumbnails, apresentações, documentos e artes no Canva/Figma/Photoshop.
- **`recorte-justo/`**: Sem margens extras (proporção exata `~2.57:1`). Perfeito para alinhar via CSS em sites, assinaturas e layouts. Tamanhos de `180px` até `4096px` (4K).
- **`com-espacamento/`**: Já inclui margem de proteção ao redor da logo para nunca encostar nas bordas.
- **4 variações de cor:**
  - `cor-original`: Símbolo vermelho + texto preto *(para fundos claros)*
  - `texto-branco`: Símbolo vermelho + texto branco *(para fundos escuros)*
  - `mono-preta`: 100% preta *(documentos P&B, carimbos, impressões)*
  - `mono-branca`: 100% branca *(marcas d'água em fotos/vídeos e fundos vermelhos/coloridos)*

### `02-logo-com-fundo/` — Logo Completa com Fundo Sólido
Versões prontas com fundo **Branco**, **Preto**, **Grafite** e **Vermelho**, tanto com **espaçamento padrão** quanto com **espaçamento amplo** (`600px` até `4096px`).

### `03-simbolo/` — Símbolo Isolado (*"Ca"* Infinito)
Apenas o ícone da marca, ideal para miniaturas onde o nome completo ficaria pequeno:
- **`sem-fundo-recorte-justo/`**: Vermelho, Preto e Branco (`64px` a `2048px`).
- **`sem-fundo-com-espacamento/`**: Centralizado em quadrado `1:1` transparente (`256px` a `2048px`).
- **`com-fundo/`**: Quadrados `1:1` com fundo Branco, Preto, Grafite e Vermelho (`256px` a `2048px`).

### `04-enquadramentos/` — Proporções Padronizadas, Espaçamentos e Overlays de Vídeo
Arquivos já diagramados nas proporções universais (com e sem fundo, e com **espaçamento padrão** e **espaçamento amplo**):
- **`1x1-quadrado/`** (`1080x1080` e `2048x2048`) — Posts, grids de parceiros/patrocinadores
- **`16x9-widescreen/`** (`1920x1080` Full HD e `3840x2160` 4K) — Slides, aulas, TV, intros de vídeo
- **`4x3-apresentacao/`** (`1600x1200`) — Apresentações clássicas e documentos
- **`3x1-faixa-horizontal/`** (`1800x600`) — Cabeçalhos e réguas de logos de eventos
- **`4x5-retrato-feed/`** (`1080x1350`) — Proporção vertical do Feed Instagram/LinkedIn
- **`9x16-vertical-stories/`** (`1080x1920`) — Stories, Reels, Shorts e TikTok
- **`overlays-video/`**: PNGs transparentes em `1920x1080` (horizontal) e `1080x1920` (vertical/cortes) com a logo ou símbolo já posicionados nos cantos seguros (versão sólida e versão marca d'água suave). Basta arrastar por cima do vídeo no editor!

### `05-perfil-avatares/` — Fotos de Perfil (Com Ajuste Óptico Circular)
Todas as redes sociais recortam a foto de perfil em **círculo**. Os arquivos desta pasta possuem compensação óptica vertical para que nem o símbolo nem a palavra *"Carvalho"* sejam cortados pelas bordas circulares:
- **`simbolo/`**: Recomendado para leitura imediata em miniaturas pequenas (`180x180` até `1080x1080`).
- **`logo-completa/`**: Logo inteira equilibrada dentro do círculo (`320x320` até `1080x1080`).
- Inclui também a subpasta **`circulo-recortado/`** com o avatar já em formato redondo e exterior transparente (ótimo para e-mails, Notion, Linktree e slides).

### `06-banners-e-capas/` — Capas Oficiais com Zonas de Segurança (*Safe Zones*)
Disponíveis nos estilos **Estúdio Escuro**, **Estúdio Claro**, **Fundo Branco**, **Fundo Preto** e **Fundo Vermelho**:
- **`youtube-2560x1440/`**: Logo contida rigorosamente dentro da área segura central (`1546x423`) para aparecer inteira na TV, no computador e no celular.
- **`linkedin-pessoal-1584x396/`** e **`linkedin-empresa-1128x191/`**: Versões **alinhadas à direita** (para que a sua foto de perfil na esquerda nunca cubra a logo!) e versões centralizadas.
- **`x-twitter-1500x500/`**: Versões alinhadas à direita e centralizadas respeitando o recorte mobile.
- **`facebook-capa/`**: Versão Retina HD (`1702x630`) e padrão (`851x315`) com margem lateral segura para celular.
- **`site-email-eventos/`**: Hero de site (`1920x600`), topo de e-mail/newsletter (`1200x300` e `600x150`) e capas de formulários/eventos (`1600x400`).

### `07-redes-sociais/` — Kits Prontos Separados por Rede
Atalhos organizados por plataforma para você abrir a pasta da rede e já ter tudo na mão:
- **`instagram/`**: Perfil, Capas de Destaques (*Highlights*), Cards de Feed (`1:1` e `4:5`) e tela de Stories/Reels (`9:16`).
- **`youtube/`**: Foto do canal (`800x800`), Banner (`2560x1440`), Botão de Marca d'Água do Player (`150x150` e `800x800`) e tela `1920x1080`.
- **`linkedin/`**: Perfil, Capa Pessoal, Capa Empresa e Card de Link/Post (`1200x627`).
- **`tiktok-shorts-cortes/`**: Perfil, Overlays transparentes de topo/base (fora dos botões e legendas) e tela final `9:16`.
- **`x-twitter/`**, **`facebook/`** e **`whatsapp-telegram-discord/`**.

### `08-web-favicons-email/` — Site, Apps, SEO e Assinatura de E-mail
- **`favicons-e-apps/`**: `favicon.ico` multi-resolução, PNGs de `16x16` até `512x512` (sem fundo e com cantos arredondados estilo app) e `apple-touch-icon-180x180.png`.
- **`opengraph-seo/`**: Imagens `1200x630` (universal) e `1200x1200` (preview quadrado do WhatsApp) para quando compartilharem o link do seu site.
- **`header-navbar-site/`**: Logos sem margem em alturas exatas (`32px` a `120px` `@2x Retina`) prontas para o menu do site.
- **`assinatura-email/`**: Logos leves (`160px` a `400px`) e avatares circulares prontos para Gmail, Outlook e Apple Mail.
