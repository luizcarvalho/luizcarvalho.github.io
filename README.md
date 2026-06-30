# luizcarvalho.com

Site pessoal de **Luiz Carvalho** — Palestras e Treinamentos em Inteligência Artificial.

Site estático (HTML + CSS + JavaScript puro, **sem Jekyll**), hospedado no GitHub Pages
no domínio [luizcarvalho.com](https://luizcarvalho.com).

## Estrutura

```
.
├── index.html        # Página única (landing page) com todas as seções
├── styles.css        # Estilos (dark mode, glassmorphism)
├── script.js         # Navegação, animações e conteúdo dinâmico
├── privacidade.html  # Política de privacidade
├── assets/images/    # Favicon
├── _arts/            # Fontes de arte/logos (design source, não publicado)
├── CNAME             # Domínio customizado (luizcarvalho.com)
└── .nojekyll         # Desativa o processamento Jekyll no GitHub Pages
```

## Conteúdo dinâmico

O `script.js` carrega informações em tempo real, sem necessidade de build:

- **Artigos (Cases de Sucesso):** consumidos do feed RSS do Medium
  (`medium.com/feed/luizcarvalho-com/tagged/Palestra`) via API `rss2json`.
- **Vídeos:** lista de palestras gravadas no YouTube, com thumbnails e player embutido.
- **Ano do rodapé:** atualizado automaticamente.

## Seções da página

Hero (com foto de capa), Sobre o Programa, Serviços, Conteúdo Programático,
Cases de Sucesso (RSS), Vídeos (YouTube), Sobre o Palestrante, Público-Alvo,
Formatos, CTA de contato e rodapé.

## Desenvolvimento

Por ser um site estático, basta abrir o `index.html` no navegador ou servir a pasta:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Deploy

GitHub Pages publica diretamente a partir da raiz do repositório (branch configurada
nas opções do repositório). O arquivo `.nojekyll` garante que os arquivos sejam
servidos como estáticos, sem a etapa de build do Jekyll.
