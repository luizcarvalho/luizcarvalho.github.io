/**
 * CALCULADORA — "Quanto custa criar um aplicativo?"
 * Recriação da calculadora original (2016), sem jQuery e sem dependências externas.
 *
 * Modelo de cálculo (idêntico ao original):
 *   1. A primeira pergunta define o VALOR/HORA (qualidade desejada).
 *   2. As demais somam HORAS de desenvolvimento.
 *   3. Preço estimado = horas × valor/hora.
 *
 * As taxas em BRL abaixo preservam os valores da versão original
 * (€60 / €40 / €20 por hora, convertidos a R$ 3,40). Ajuste-as aqui
 * se quiser recalibrar a calculadora.
 */

const RATES = {
  alta: 204,
  media: 136,
  baixa: 68,
};

/**
 * Primeira pergunta: define o valor/hora, não soma horas.
 * Demais perguntas: `hours` é somado ao total.
 */
const QUESTIONS = [
  {
    id: 'qualidade',
    text: 'Que nível de qualidade você está procurando?',
    hint: 'Isso define o valor/hora usado na estimativa.',
    options: [
      { label: 'Ótima qualidade', note: 'Time sênior, código e design refinados', rate: RATES.alta },
      { label: 'Boa relação de qualidade e preço', note: 'O equilíbrio mais comum', rate: RATES.media },
      { label: 'Não estou interessado em muita qualidade', note: 'Validação rápida, MVP enxuto', rate: RATES.baixa },
    ],
  },
  {
    id: 'plataforma',
    text: 'Qual tipo de aplicativo você precisa?',
    options: [
      { label: 'Aplicativo Android', hours: 60 },
      { label: 'Aplicativo iPhone', hours: 60 },
      { label: 'Aplicativo Web (PWA)', hours: 60 },
      { label: 'Aplicativo Android & iPhone', hours: 100 },
    ],
  },
  {
    id: 'design',
    text: 'Qual design você deseja que o seu aplicativo tenha?',
    options: [
      { label: 'Interface simples', note: 'Componentes padrão da plataforma', hours: 40 },
      { label: 'Interface personalizada', note: 'Identidade visual própria, do zero', hours: 120 },
      { label: 'Interface semelhante à Web', note: 'Adaptação de um site existente', hours: 80 },
      { label: 'Sem design', note: 'Já tenho o layout pronto', hours: 0 },
    ],
  },
  {
    id: 'monetizacao',
    text: 'Qual retorno financeiro você deseja ter?',
    options: [
      { label: 'Aplicativo gratuito com publicidade', hours: 5 },
      { label: 'Aplicativo pago', hours: 5 },
      { label: 'Compras dentro do aplicativo', hours: 40 },
      { label: 'Outros / Ainda não sei', hours: 10 },
    ],
  },
  {
    id: 'login',
    text: 'O seu aplicativo precisa de um sistema de login?',
    options: [
      { label: 'Sim, com redes sociais e e-mail', hours: 40 },
      { label: 'Sim, apenas com e-mail', hours: 25 },
      { label: 'Não é necessário login', hours: 0 },
      { label: 'Ainda não sei', hours: 20 },
    ],
  },
  {
    id: 'website',
    text: 'Seu aplicativo deve ser integrado a um website?',
    options: [
      { label: 'Sim', hours: 40 },
      { label: 'Não', hours: 0 },
      { label: 'Ainda não sei', hours: 20 },
    ],
  },
  {
    id: 'perfil',
    text: 'Os usuários devem ter seu perfil próprio?',
    options: [
      { label: 'Sim', hours: 40 },
      { label: 'Não', hours: 0 },
      { label: 'Ainda não sei', hours: 20 },
    ],
  },
  {
    id: 'admin',
    text: 'Seu aplicativo necessita de um painel administrativo?',
    options: [
      { label: 'Sim', hours: 40 },
      { label: 'Não', hours: 0 },
      { label: 'Ainda não sei', hours: 20 },
    ],
  },
  {
    id: 'idiomas',
    text: 'Quantas línguas você deseja que seu aplicativo tenha?',
    options: [
      { label: 'Uma única língua', hours: 0 },
      { label: 'Bilíngue', hours: 20 },
      { label: 'Multilíngue', hours: 40 },
    ],
  },
  {
    id: 'estagio',
    text: 'Em que estágio se encontra o seu projeto?',
    hint: 'Não altera a estimativa — ajuda a entender o ponto de partida.',
    options: [
      { label: 'É apenas uma ideia', hours: 0 },
      { label: 'Esboço já preparado', hours: 0 },
      { label: 'Aplicativo em desenvolvimento', hours: 0 },
      { label: 'Aplicativo já está pronto', hours: 0 },
    ],
  },
];

const WHATSAPP_BASE = 'https://wa.me/5563981329588?text=';

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const state = {
  step: 0,
  answers: [], // índice da opção escolhida por pergunta
};

const el = {};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooterYear();
  initCalculadora();
});

// ==========================================
// NAVBAR (versão local — a home usa script.js)
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!navbar || !navToggle || !navMenu) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ==========================================
// CALCULADORA
// ==========================================
function initCalculadora() {
  el.intro = document.getElementById('calc-intro');
  el.quiz = document.getElementById('calc-quiz');
  el.result = document.getElementById('calc-result');
  if (!el.intro || !el.quiz || !el.result) return;

  el.question = document.getElementById('calc-question');
  el.hint = document.getElementById('calc-hint');
  el.options = document.getElementById('calc-options');
  el.stepLabel = document.getElementById('calc-step');
  el.progress = document.getElementById('calc-progress-bar');
  el.running = document.getElementById('calc-running');
  el.runningValue = document.getElementById('calc-running-value');
  el.back = document.getElementById('calc-back');

  el.price = document.getElementById('calc-price');
  el.hours = document.getElementById('calc-hours');
  el.rate = document.getElementById('calc-rate');
  el.summary = document.getElementById('calc-summary');
  el.whatsapp = document.getElementById('calc-whatsapp');

  document.getElementById('calc-begin').addEventListener('click', start);
  document.getElementById('calc-reset').addEventListener('click', reset);
  el.back.addEventListener('click', goBack);

  document.addEventListener('keydown', onKeydown);
}

function start() {
  state.step = 0;
  state.answers = [];
  el.intro.hidden = true;
  el.result.hidden = true;
  el.quiz.hidden = false;
  renderQuestion();
  el.quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function reset() {
  state.step = 0;
  state.answers = [];
  el.result.hidden = true;
  el.quiz.hidden = true;
  el.intro.hidden = false;
  el.intro.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderQuestion() {
  const q = QUESTIONS[state.step];
  const total = QUESTIONS.length;

  el.question.textContent = q.text;
  el.hint.textContent = q.hint || '';
  el.hint.hidden = !q.hint;
  el.stepLabel.textContent = `Pergunta ${state.step + 1} de ${total}`;
  el.progress.style.width = `${(state.step / total) * 100}%`;
  el.back.hidden = state.step === 0;

  const chosen = state.answers[state.step];
  el.options.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'calc-option';
    if (chosen === i) btn.classList.add('is-selected');
    btn.dataset.index = String(i);

    const key = document.createElement('span');
    key.className = 'calc-option-key';
    key.textContent = String(i + 1);

    const label = document.createElement('span');
    label.className = 'calc-option-label';
    label.textContent = opt.label;

    btn.append(key, label);

    if (opt.note) {
      const note = document.createElement('span');
      note.className = 'calc-option-note';
      note.textContent = opt.note;
      btn.appendChild(note);
    }

    btn.addEventListener('click', () => choose(i));
    el.options.appendChild(btn);
  });

  // Estimativa parcial só faz sentido depois da 1ª pergunta.
  const showRunning = state.step > 0;
  el.running.hidden = !showRunning;
  if (showRunning) el.runningValue.textContent = BRL.format(totalPrice());

  el.question.focus();
}

function choose(index) {
  state.answers[state.step] = index;

  if (state.step < QUESTIONS.length - 1) {
    state.step++;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (state.step === 0) return;
  state.step--;
  renderQuestion();
}

function onKeydown(event) {
  if (el.quiz.hidden) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  if (event.key === 'Backspace') {
    event.preventDefault();
    goBack();
    return;
  }

  const n = Number(event.key);
  const count = QUESTIONS[state.step].options.length;
  if (Number.isInteger(n) && n >= 1 && n <= count) {
    event.preventDefault();
    choose(n - 1);
  }
}

// ---------- Cálculo ----------

function hourlyRate() {
  const chosen = state.answers[0];
  return chosen === undefined ? 0 : QUESTIONS[0].options[chosen].rate;
}

function totalHours() {
  return state.answers.reduce((sum, choice, q) => {
    if (q === 0 || choice === undefined) return sum;
    return sum + (QUESTIONS[q].options[choice].hours || 0);
  }, 0);
}

function totalPrice() {
  return totalHours() * hourlyRate();
}

function showResult() {
  const hours = totalHours();
  const rate = hourlyRate();

  el.price.textContent = BRL.format(hours * rate);
  el.hours.textContent = `${hours} h`;
  el.rate.textContent = `${BRL.format(rate)}/h`;

  el.summary.innerHTML = '';
  QUESTIONS.forEach((q, i) => {
    const choice = state.answers[i];
    if (choice === undefined) return;
    const opt = q.options[choice];

    const row = document.createElement('div');
    row.className = 'calc-summary-row';

    const question = document.createElement('span');
    question.className = 'calc-summary-q';
    question.textContent = q.text;

    const answer = document.createElement('span');
    answer.className = 'calc-summary-a';
    answer.textContent = opt.label;

    const weight = document.createElement('span');
    weight.className = 'calc-summary-w';
    weight.textContent = i === 0 ? `${BRL.format(opt.rate)}/h` : `${opt.hours} h`;

    row.append(question, answer, weight);
    el.summary.appendChild(row);
  });

  const message =
    `Olá Luiz! Usei a calculadora do seu site e a estimativa do meu aplicativo ` +
    `ficou em ${BRL.format(hours * rate)} (${hours} horas). Gostaria de conversar sobre o projeto.`;
  el.whatsapp.href = WHATSAPP_BASE + encodeURIComponent(message);

  el.progress.style.width = '100%';
  el.quiz.hidden = true;
  el.result.hidden = false;
  el.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
