(function () {
    var root = document.getElementById('mk-root');
    var nav = document.getElementById('mk-nav');
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { io.unobserve(e.target); load(e.target); }
        });
    }, { rootMargin: '600px 0px' }) : null;

    function load(img) {
        img.src = img.dataset.src;
        img.decode ? img.decode().then(show, show) : (img.onload = show);
        function show() { img.classList.add('is-loaded'); }
        img.onerror = show; // nunca deixa a imagem escondida
    }

    var LABELS = {
        'animado': 'Animado (GIF)',
        'com-espacamento': 'Com espaçamento', 'recorte-justo': 'Recorte justo', 'cor-original': 'Cor original',
        'mono-branca': 'Mono branca', 'mono-preta': 'Mono preta', 'texto-branco': 'Texto branco',
        'fundo-preto': 'Fundo preto', 'fundo-vermelho': 'Fundo vermelho', 'fundo-grafite': 'Fundo grafite',
        'fundo-branco': 'Fundo branco', 'com-fundo': 'Com fundo', 'sem-fundo': 'Sem fundo',
        'sem-fundo-com-espacamento': 'Sem fundo, com espaçamento', 'sem-fundo-recorte-justo': 'Sem fundo, recorte justo',
        'simbolo': 'Símbolo', 'simbolo-preto': 'Símbolo preto', 'simbolo-branco': 'Símbolo branco',
        'simbolo-vermelho': 'Símbolo vermelho', 'logo-completa': 'Logo completa', 'circulo-recortado': 'Círculo recortado',
        'estudio-escuro': 'Estúdio escuro', 'x-twitter': 'X / Twitter', 'tiktok-shorts-cortes': 'TikTok / Shorts / Cortes',
        'whatsapp-telegram-discord': 'WhatsApp / Telegram / Discord', 'header-navbar-site': 'Header / navbar do site',
        'assinatura-email': 'Assinatura de e-mail', 'favicons-e-apps': 'Favicons e apps', 'opengraph-seo': 'OpenGraph / SEO',
        'icone-arredondado-vermelho': 'Ícone arredondado vermelho', 'icone-arredondado-preto': 'Ícone arredondado preto',
        'icone-arredondado-branco': 'Ícone arredondado branco', 'sem-fundo-': 'Sem fundo',
        'overlays-video': 'Overlays de vídeo', 'vertical-cortes-1080x1920': 'Vertical (cortes) 1080×1920',
        'horizontal-1920x1080': 'Horizontal 1920×1080', 'site-email-eventos': 'Site / e-mail / eventos',
        '4x5-retrato-feed': '4:5 retrato (feed)', '16x9-widescreen': '16:9 widescreen', '9x16-vertical-stories': '9:16 vertical (stories)',
        '4x3-apresentacao': '4:3 apresentação', '3x1-faixa-horizontal': '3:1 faixa horizontal', '1x1-quadrado': '1:1 quadrado'
    };
    function label(seg) {
        if (LABELS[seg]) return LABELS[seg];
        var t = seg.replace(/-/g, ' ');
        return t.charAt(0).toUpperCase() + t.slice(1);
    }

    function copyLink(url, btn) {
        function done(ok) {
            btn.textContent = ok ? 'Copiado!' : 'Falhou';
            setTimeout(function () { btn.textContent = 'Copiar link'; }, 1500);
        }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
        } else {
            var t = document.createElement('textarea');
            t.value = url; t.style.position = 'fixed'; t.style.opacity = '0';
            document.body.appendChild(t); t.select();
            var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
            document.body.removeChild(t); done(ok);
        }
    }

    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text) n.textContent = text;
        return n;
    }

    fetch('images.json').then(function (r) { return r.json(); }).then(function (groups) {
        groups.forEach(function (g) {
            var sec = el('section', 'mk-group'); sec.id = g.id;
            sec.appendChild(el('h2', '', g.title));
            sec.appendChild(el('p', 'mk-count', g.images.length + ' arquivos'));
            var subs = {}, order = [];
            g.images.forEach(function (i) {
                if (!subs[i.path]) { subs[i.path] = []; order.push(i.path); }
                subs[i.path].push(i);
            });
            order.forEach(function (p) {
              var sub = el('div', 'mk-sub');
              if (p) sub.appendChild(el('h3', '', p.split('/').map(label).join(' › ')));
              var grid = el('div', 'mk-grid');
              subs[p].forEach(function (i) {
                var fig = el('figure', 'mk-card');
                var box = el('div', 'mk-thumb' + (/(?<!fundo-)branc[oa]|escuro/.test(i.path + i.name) ? ' on-dark' : ''));
                box.style.aspectRatio = i.w + ' / ' + i.h;
                var img = new Image();
                img.alt = 'Luiz Carvalho — ' + g.title + ' (' + i.name + ')';
                img.width = i.w; img.height = i.h;
                img.decoding = 'async';
                img.dataset.src = i.src;
                box.appendChild(img);
                fig.appendChild(box);
                var cap = el('figcaption');
                var label = el('span', '', i.name);
                label.appendChild(el('small', 'mk-path', i.w + '×' + i.h));
                var dl = el('a', '', 'Baixar'); dl.href = i.src; dl.download = i.name + '.' + (i.ext || 'png');
                var cp = el('button', 'mk-copy', 'Copiar link'); cp.type = 'button';
                cp.addEventListener('click', function () { copyLink(new URL(i.src, location.href).href, cp); });
                var actions = el('span', 'mk-actions'); actions.appendChild(cp); actions.appendChild(dl);
                cap.appendChild(label); cap.appendChild(actions);
                fig.appendChild(cap);
                grid.appendChild(fig);
                io ? io.observe(img) : load(img);
              });
              sub.appendChild(grid);
              sec.appendChild(sub);
            });
            root.appendChild(sec);
            var a = el('a', '', g.title); a.href = '#' + g.id; nav.appendChild(a);
        });
    }).catch(function () {
        root.appendChild(el('p', '', 'Não foi possível carregar as imagens. Tente recarregar a página.'));
    });
})();
