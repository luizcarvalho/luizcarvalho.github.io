/**
 * LUIZ CARVALHO - LANDING PAGE VSL
 * JavaScript: Navegação, RSS Feed, YouTube Integration, Animações
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  loadMediumArticles();
  loadYouTubeVideos();
});

// ==========================================
// NAVBAR
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.sobre-card, .conteudo-card, .publico-card, .formato-card, .achievement-item'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// MEDIUM RSS FEED
// ==========================================
// Usando rss2json API que já resolve CORS
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const MEDIUM_FEED_URL = 'https://medium.com/feed/luizcarvalho-com/tagged/Palestra';

let allArticles = [];
let displayedArticles = 0;
const ARTICLES_PER_PAGE = 9;

async function loadMediumArticles() {
  const grid = document.getElementById('casos-grid');
  const loadMoreContainer = document.getElementById('load-more-casos');
  const loadMoreBtn = document.getElementById('btn-load-casos');

  try {
    const response = await fetch(RSS2JSON_API + encodeURIComponent(MEDIUM_FEED_URL));
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS feed error');
    }

    allArticles = data.items.map(item => {
      const title = item.title || '';
      const link = item.link || '';
      const pubDate = item.pubDate || '';
      const content = item.content || item.description || '';

      // Extract image from thumbnail or content
      let image = item.thumbnail || '';
      if (!image) {
        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
        image = imgMatch ? imgMatch[1] : '';
      }

      // Extract description (clean HTML and limit characters)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const description = tempDiv.textContent?.substring(0, 200) + '...' || '';

      return { title, link, pubDate, image, description };
    });

    // Clear loading spinner
    grid.innerHTML = '';

    // Display first batch
    displayArticles();

    // Setup load more
    if (allArticles.length > ARTICLES_PER_PAGE) {
      loadMoreContainer.style.display = 'block';
      loadMoreBtn.addEventListener('click', displayArticles);
    }

  } catch (error) {
    console.error('Erro ao carregar artigos:', error);
    grid.innerHTML = `
            <div class="loading-spinner">
                <p>Não foi possível carregar os artigos. Visite o <a href="https://medium.com/luizcarvalho-com/tagged/palestra" target="_blank" style="color: var(--accent-tertiary);">Medium</a> diretamente.</p>
            </div>
        `;
  }
}

function displayArticles() {
  const grid = document.getElementById('casos-grid');
  const loadMoreContainer = document.getElementById('load-more-casos');

  const nextBatch = allArticles.slice(displayedArticles, displayedArticles + ARTICLES_PER_PAGE);

  nextBatch.forEach(article => {
    const card = createArticleCard(article);
    grid.appendChild(card);
  });

  displayedArticles += nextBatch.length;

  // Hide load more if no more articles
  if (displayedArticles >= allArticles.length) {
    loadMoreContainer.style.display = 'none';
  }

  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.caso-card').forEach(card => {
      card.classList.add('reveal', 'active');
    });
  }, 100);
}

function createArticleCard(article) {
  const card = document.createElement('article');
  card.className = 'caso-card';

  const date = article.pubDate ? formatDate(article.pubDate) : '';
  const imageUrl = article.image || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%231a1a25" width="400" height="200"/><text x="50%" y="50%" fill="%236366f1" text-anchor="middle" dy=".3em" font-size="48">LC</text></svg>';

  card.innerHTML = `
        <img src="${imageUrl}" alt="${article.title}" class="caso-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22><rect fill=%22%231a1a25%22 width=%22400%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236366f1%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2248%22>LC</text></svg>'">
        <div class="caso-content">
            <span class="caso-date">${date}</span>
            <h3 class="caso-title">${escapeHtml(article.title)}</h3>
            <p class="caso-description">${escapeHtml(article.description)}</p>
            <a href="${article.link}" target="_blank" class="caso-link">
                Ler artigo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    `;

  return card;
}

// ==========================================
// YOUTUBE VIDEOS
// ==========================================
const YOUTUBE_VIDEOS = [
  { id: 'VLVoUs1F5yg', title: 'Case: DefGPT – Plataforma Inteligente para Eficiência na Defensoria' },
  { id: '9Yj4mqsBt6E', title: 'Agentes IA: A Nova Revolução da Inteligência Artificial - Palmas Summit' },
  { id: '4bgoxDx0VbI', title: 'Como criar seu próprio ChatGPT - Palmas Summit' },
  { id: 'Cqivy1GoQW8', title: 'INTELIGÊNCIA ARTIFICIAL: Como usar ChatGPT e Engenharia de Prompt' },
  { id: 'ZCZVaDy7uXM', title: 'Como o Metaverso Pode Destruir o Mundo | Campus Party 14' },
  { id: 'R3FPEUGfrUA', title: 'Palestra: Agentes Inteligentes a atual era da I.A. - Araguaína' },
  { id: '5k-hyrpsZ84', title: 'Como Criar um Pitch Matador para Seus Projetos | Oficina Completa (Sebrae)' },
  { id: 'NJUqWZhTtUM', title: 'Como Fazer um Pitch Matador | Feira Época - Araguaína' },
  { id: '4l68HiMFFCk', title: 'Palestra: Chatbots e a nova era das aplicações móveis - Congresso CIT' },
  { id: 'OcDpKtsHpAY', title: 'DefGPT - A Inteligência Artificial da Defensoria Pública - IV Workshop DevColab' },
  { id: '_XiJXZFB8O4', title: 'DefGPT - Plataforma de IA da Defensoria Pública - ENASTIC + CNTI 2025' },
  { id: 'zJz9vzG8K8s', title: 'Sua empresa Não precisa de IA - Especialista em Inteligência Artificial' }
];

let displayedVideos = 0;
const VIDEOS_PER_PAGE = 9;

function loadYouTubeVideos() {
  const grid = document.getElementById('videos-grid');
  const loadMoreContainer = document.getElementById('load-more-videos');
  const loadMoreBtn = document.getElementById('btn-load-videos');

  // Clear loading
  grid.innerHTML = '';

  // Display first batch
  displayVideos();

  // Setup load more
  if (YOUTUBE_VIDEOS.length > VIDEOS_PER_PAGE) {
    loadMoreContainer.style.display = 'block';
    loadMoreBtn.addEventListener('click', displayVideos);
  }
}

function displayVideos() {
  const grid = document.getElementById('videos-grid');
  const loadMoreContainer = document.getElementById('load-more-videos');

  const nextBatch = YOUTUBE_VIDEOS.slice(displayedVideos, displayedVideos + VIDEOS_PER_PAGE);

  nextBatch.forEach(video => {
    const card = createVideoCard(video);
    grid.appendChild(card);
  });

  displayedVideos += nextBatch.length;

  // Hide load more if no more videos
  if (displayedVideos >= YOUTUBE_VIDEOS.length) {
    loadMoreContainer.style.display = 'none';
  }

  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.video-card').forEach(card => {
      card.classList.add('reveal', 'active');
    });
  }, 100);
}

function createVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'video-card';

  card.innerHTML = `
        <div class="video-thumbnail" data-video-id="${video.id}">
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                 alt="${escapeHtml(video.title)}"
                 onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
            <div class="play-button">
                <svg viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21"/>
                </svg>
            </div>
        </div>
        <div class="video-content">
            <h3 class="video-title">${escapeHtml(video.title)}</h3>
        </div>
    `;

  // Click to load iframe
  card.querySelector('.video-thumbnail').addEventListener('click', function () {
    const videoId = this.dataset.videoId;
    this.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
  });

  return card;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
