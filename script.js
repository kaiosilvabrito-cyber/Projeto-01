// =====================================================
// AGRINHO 2026 — script.js
// Tema: Agro Forte, Futuro Sustentável
// JavaScript puro — sem bibliotecas ou frameworks.
// Manipulação de DOM em todas as funcionalidades.
// =====================================================

// ── 1. CANVAS ANIMADO ─────────────────────────────────────────────────
// Grade hexagonal + partículas conectadas usando canvas nativo do HTML5

var canvas = document.getElementById("bg-canvas");
var ctx = canvas.getContext("2d");
var W = 0;
var H = 0;
var ptcs = []; // array de partículas

// Ajusta o canvas ao tamanho da janela
function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

// Cria uma partícula com atributos aleatórios
function novaParticula() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.8 + 0.4,
    a: Math.random() * 0.2 + 0.04,
    cor: Math.random() > 0.5 ? "#4caf50" : "#ffc107"
  };
}

// Preenche o array de partículas
function initPtcs() {
  ptcs = [];
  for (var i = 0; i < 70; i++) {
    ptcs.push(novaParticula());
  }
}

// Desenha a grade hexagonal de fundo
function desenhaHex() {
  var s = 85;
  var cols = Math.ceil(W / (s * 1.5)) + 2;
  var rows = Math.ceil(H / (s * Math.sqrt(3))) + 2;
  ctx.strokeStyle = "rgba(76,175,80,0.038)";
  ctx.lineWidth = 1;
  for (var c = -1; c < cols; c++) {
    for (var r = -1; r < rows; r++) {
      var x = c * s * 1.5;
      var y = r * s * Math.sqrt(3) + (c % 2 === 0 ? 0 : (s * Math.sqrt(3)) / 2);
      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        var ang = (Math.PI / 3) * i - Math.PI / 6;
        var px = x + s * 0.85 * Math.cos(ang);
        var py = y + s * 0.85 * Math.sin(ang);
        if (i === 0) { ctx.moveTo(px, py); }
        else         { ctx.lineTo(px, py); }
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}

// Desenha linhas entre partículas próximas
function desenhaLinhas() {
  var maxD = 115;
  ctx.lineWidth = 0.4;
  for (var i = 0; i < ptcs.length; i++) {
    for (var j = i + 1; j < ptcs.length; j++) {
      var dx = ptcs[i].x - ptcs[j].x;
      var dy = ptcs[i].y - ptcs[j].y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxD) {
        ctx.beginPath();
        ctx.moveTo(ptcs[i].x, ptcs[i].y);
        ctx.lineTo(ptcs[j].x, ptcs[j].y);
        ctx.strokeStyle = "rgba(76,175,80," + (0.08 * (1 - d / maxD)) + ")";
        ctx.stroke();
      }
    }
  }
}

// Loop de animação do canvas
function loopCanvas() {
  ctx.clearRect(0, 0, W, H);
  desenhaHex();
  desenhaLinhas();
  for (var i = 0; i < ptcs.length; i++) {
    var p = ptcs[i];
    p.x += p.vx;
    p.y += p.vy;
    // Recria a partícula se sair da tela
    if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
      ptcs[i] = novaParticula();
      continue;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.cor;
    ctx.globalAlpha = p.a;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(loopCanvas);
}

resizeCanvas();
initPtcs();
loopCanvas();

window.addEventListener("resize", function () {
  resizeCanvas();
  initPtcs();
});

// ── 2. MENU HAMBURGUER ────────────────────────────────────────────────

var hamburger = document.getElementById("hamburger");
var navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  // Alterna a classe "open" no menu — CSS cuida do visual
  var aberto = navLinks.classList.contains("open");
  if (aberto) {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
  } else {
    navLinks.classList.add("open");
    hamburger.classList.add("open");
  }
});

// Fecha o menu ao clicar em qualquer link
var todosLinks = document.querySelectorAll(".nav-links a");
for (var i = 0; i < todosLinks.length; i++) {
  todosLinks[i].addEventListener("click", function () {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
  });
}

// ── 3. NAV ATIVA AO SCROLL ────────────────────────────────────────────

var secoes = document.querySelectorAll("section[id]");
var linksNav = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  var atual = "";
  for (var i = 0; i < secoes.length; i++) {
    if (window.scrollY >= secoes[i].offsetTop - 200) {
      atual = secoes[i].id;
    }
  }
  // Remove "active" de todos e adiciona somente no link da seção atual
  for (var j = 0; j < linksNav.length; j++) {
    linksNav[j].classList.remove("active");
    if (linksNav[j].getAttribute("href") === "#" + atual) {
      linksNav[j].classList.add("active");
    }
  }
});

// ── 4. MODO ESCURO / CLARO ────────────────────────────────────────────

var btnTheme = document.getElementById("btnTheme");
var modoClaro = false;

btnTheme.addEventListener("click", function () {
  modoClaro = !modoClaro;
  if (modoClaro) {
    // Adiciona classe ao body — CSS aplica as variáveis do modo claro
    document.body.classList.add("light");
    // Manipula o textContent do botão via DOM
    btnTheme.textContent = "☀️ Modo Claro";
  } else {
    document.body.classList.remove("light");
    btnTheme.textContent = "🌙 Modo Escuro";
  }
});

// ── 5. REVEAL AO SCROLL (IntersectionObserver) ───────────────────────

var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

var revealObs = new IntersectionObserver(function (entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add("visible");
    }
  }
}, { threshold: 0.1 });

for (var i = 0; i < revealEls.length; i++) {
  revealObs.observe(revealEls[i]);
}

// ── 6. BARRAS DE GRÁFICO ─────────────────────────────────────────────

var barras = document.querySelectorAll(".b-fill");
var barrasAtivadas = false;

var barObs = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !barrasAtivadas) {
    barrasAtivadas = true;
    for (var i = 0; i < barras.length; i++) {
      // Usa closure para capturar corretamente cada barra
      (function (barra) {
        setTimeout(function () {
          // Manipula o style.width diretamente no DOM
          barra.style.width = barra.getAttribute("data-w") + "%";
        }, 250);
      })(barras[i]);
    }
    barObs.disconnect();
  }
}, { threshold: 0.25 });

var barCard = document.querySelector(".chart-card");
if (barCard) { barObs.observe(barCard); }

// ── 7. CONTADORES ANIMADOS ────────────────────────────────────────────

function animarContador(el) {
  var alvo = parseInt(el.getAttribute("data-target"));
  var sufixo = el.getAttribute("data-suffix") || "";
  var atual = 0;
  var passo = alvo / 55;
  var timer = setInterval(function () {
    atual += passo;
    if (atual >= alvo) {
      atual = alvo;
      clearInterval(timer);
    }
    // Altera o textContent do elemento via DOM
    el.textContent = Math.floor(atual) + sufixo;
  }, 22);
}

// Contador dos float cards do hero
var floatNums = document.querySelectorAll(".float-num[data-target]");
var floatAtivado = false;

var floatObs = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !floatAtivado) {
    floatAtivado = true;
    for (var i = 0; i < floatNums.length; i++) {
      animarContador(floatNums[i]);
    }
    floatObs.disconnect();
  }
}, { threshold: 0.5 });

var heroCards = document.querySelector(".hero-cards");
if (heroCards) { floatObs.observe(heroCards); }

// Contador dos big numbers da seção dados
var bigNums = document.querySelectorAll(".counter[data-target]");
var bigAtivado = false;

var bigObs = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !bigAtivado) {
    bigAtivado = true;
    for (var i = 0; i < bigNums.length; i++) {
      animarContador(bigNums[i]);
    }
    bigObs.disconnect();
  }
}, { threshold: 0.3 });

var bignumsEl = document.querySelector(".bignums");
if (bignumsEl) { bigObs.observe(bignumsEl); }

// ── 8. TABS DAS PRÁTICAS ──────────────────────────────────────────────

var tabBtns    = document.querySelectorAll(".tab-btn");
var tabPanels  = document.querySelectorAll(".tab-panel");

for (var i = 0; i < tabBtns.length; i++) {
  tabBtns[i].addEventListener("click", function () {
    var idx = this.getAttribute("data-tab");

    // Remove "active" de todos os botões e adiciona no clicado
    for (var j = 0; j < tabBtns.length; j++) {
      tabBtns[j].classList.remove("active");
    }
    this.classList.add("active");

    // Esconde todos os painéis e mostra o correto
    for (var k = 0; k < tabPanels.length; k++) {
      tabPanels[k].classList.remove("active");
    }
    document.querySelector(".tab-panel[data-panel='" + idx + "']").classList.add("active");
  });
}

// ── 9. FOLHAS FLUTUANTES ──────────────────────────────────────────────

var emojis = ["🍃", "🌿", "🌾", "🍀"];

function criarFolha() {
  var el = document.createElement("span");
  el.className = "leaf";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "-30px";
  el.style.fontSize = (0.8 + Math.random() * 0.6) + "rem";
  var dur = 10 + Math.random() * 10;
  el.style.animation = "leafFall " + dur + "s linear";

  document.body.appendChild(el);

  // Remove o elemento do DOM após a animação terminar
  setTimeout(function () {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }, dur * 1000);
}

criarFolha();
setInterval(criarFolha, 4500);

// ── 10. QUIZ INTERATIVO ───────────────────────────────────────────────
// Toda a lógica manipula elementos do DOM:
// textContent, classList, createElement, appendChild, removeChild

var perguntas = [
  {
    q: "Qual sistema combina lavoura, pecuária e floresta no mesmo espaço aumentando a produtividade sem desmatar?",
    ops: [
      "Monocultura extensiva",
      "Integração Lavoura-Pecuária-Floresta (ILPF)",
      "Queimada controlada",
      "Pastagem solteira"
    ],
    ok: 1,
    fb: "✅ Correto! A ILPF é um dos sistemas mais sustentáveis do agro brasileiro, aumentando produtividade e recuperando solos sem novos desmatamentos."
  },
  {
    q: "Quanto da vegetação nativa o Brasil preserva em seu território?",
    ops: [
      "Cerca de 20%",
      "Cerca de 40%",
      "Cerca de 66%",
      "Cerca de 85%"
    ],
    ok: 2,
    fb: "✅ Correto! O Brasil preserva cerca de 66% de sua vegetação nativa — índice superior ao de muitos países desenvolvidos."
  },
  {
    q: "O que são as APPs no Código Florestal Brasileiro?",
    ops: [
      "Aplicativos de Produção Pecuária",
      "Áreas de Produção Permanente",
      "Áreas de Preservação Permanente",
      "Autorizações de Plantio do Paraná"
    ],
    ok: 2,
    fb: "✅ Correto! As Áreas de Preservação Permanente protegem matas ciliares, nascentes e encostas — essenciais para a água e o clima."
  },
  {
    q: "Qual técnica de irrigação reduz o desperdício de água em até 70%?",
    ops: [
      "Irrigação por aspersão",
      "Irrigação por inundação",
      "Irrigação por sulcos",
      "Irrigação por gotejamento"
    ],
    ok: 3,
    fb: "✅ Correto! O gotejamento entrega água direto na raiz, sendo muito mais eficiente que os métodos tradicionais."
  },
  {
    q: "Qual o percentual aproximado que o agronegócio representa no PIB brasileiro?",
    ops: [
      "Cerca de 5%",
      "Cerca de 15%",
      "Cerca de 27%",
      "Cerca de 50%"
    ],
    ok: 2,
    fb: "✅ Correto! O agronegócio representa cerca de 27% do PIB e é o principal setor do superávit comercial do Brasil."
  }
];

// Referências aos elementos do DOM
var quizStart       = document.getElementById("quizStart");
var quizQWrap       = document.getElementById("quizQuestionWrap");
var quizResultWrap  = document.getElementById("quizResultWrap");
var btnStartQuiz    = document.getElementById("btnStartQuiz");
var qzCounter       = document.getElementById("qzCounter");
var qzBar           = document.getElementById("qzBar");
var qzScore         = document.getElementById("qzScore");
var qzQuestion      = document.getElementById("qzQuestion");
var qzOptions       = document.getElementById("qzOptions");
var qzFeedback      = document.getElementById("qzFeedback");
var btnNext         = document.getElementById("btnNext");
var qrIcon          = document.getElementById("qrIcon");
var qrTitle         = document.getElementById("qrTitle");
var qrScore         = document.getElementById("qrScore");
var qrMsg           = document.getElementById("qrMsg");
var qrDetail        = document.getElementById("qrDetail");
var btnRestart      = document.getElementById("btnRestart");

var qAtual      = 0;
var qPontos     = 0;
var qRespondeu  = false;
var qRespostas  = []; // guarda resultado de cada resposta para o detalhe final

// Inicia o quiz — esconde tela de início e mostra tela de pergunta
btnStartQuiz.addEventListener("click", function () {
  quizStart.classList.add("hidden");
  quizQWrap.classList.remove("hidden");
  renderPergunta();
});

// Renderiza a pergunta atual no DOM
function renderPergunta() {
  var p = perguntas[qAtual];
  qRespondeu = false;

  // Atualiza textos via DOM
  qzCounter.textContent = (qAtual + 1) + " / " + perguntas.length;
  qzScore.textContent   = qPontos + " pts";
  qzQuestion.textContent = p.q;
  qzFeedback.textContent = "";

  // Atualiza a barra de progresso
  var pct = ((qAtual + 1) / perguntas.length) * 100;
  qzBar.style.width = pct + "%";

  // Esconde botão de avançar
  btnNext.classList.add("hidden");

  // Remove todas as opções antigas do DOM
  qzOptions.innerHTML = "";

  // Cria e insere os botões de opção dinamicamente
  for (var i = 0; i < p.ops.length; i++) {
    var btn = document.createElement("button");
    btn.className = "qz-opt";
    btn.textContent = p.ops[i];
    btn.setAttribute("data-idx", i);
    btn.addEventListener("click", responder);
    qzOptions.appendChild(btn);
  }
}

// Processa a resposta — manipula classes e texto no DOM
function responder(e) {
  if (qRespondeu) { return; }
  qRespondeu = true;

  var escolha = parseInt(e.target.getAttribute("data-idx"));
  var p = perguntas[qAtual];
  var bots = qzOptions.querySelectorAll(".qz-opt");

  // Desabilita todos os botões e marca correto/errado via classList
  for (var i = 0; i < bots.length; i++) {
    bots[i].disabled = true;
    if (i === p.ok)                             { bots[i].classList.add("correct"); }
    else if (i === escolha && escolha !== p.ok) { bots[i].classList.add("wrong"); }
  }

  var acertou = (escolha === p.ok);

  if (acertou) {
    qPontos++;
    qzFeedback.textContent = p.fb;
  } else {
    qzFeedback.textContent = "❌ Errado. " + p.fb.replace("✅ Correto! ", "");
  }

  // Guarda o resultado desta pergunta para o detalhe final
  qRespostas.push({
    pergunta: p.q.substring(0, 55) + "...",
    acertou: acertou
  });

  // Atualiza o placar no DOM
  qzScore.textContent = qPontos + " pts";

  // Mostra o botão de avançar
  btnNext.classList.remove("hidden");
  btnNext.textContent = (qAtual === perguntas.length - 1) ? "Ver Resultado 🏆" : "Próxima →";
}

// Avança para a próxima pergunta ou exibe resultado
btnNext.addEventListener("click", function () {
  qAtual++;
  if (qAtual < perguntas.length) {
    renderPergunta();
  } else {
    mostrarResultado();
  }
});

// Exibe a tela de resultado — altera múltiplos elementos do DOM
function mostrarResultado() {
  quizQWrap.classList.add("hidden");
  quizResultWrap.classList.remove("hidden");

  var total = perguntas.length;
  var pct   = Math.round((qPontos / total) * 100);

  // Altera o placar via textContent
  qrScore.textContent = qPontos + " de " + total + " corretas  (" + pct + "%)";

  // Define ícone, título e mensagem com base na pontuação
  var icone, titulo, msg;

  if (qPontos === total) {
    icone  = "🏆";
    titulo = "Perfeito!";
    msg    = "Você acertou tudo! É um verdadeiro defensor do agro sustentável.";
  } else if (qPontos >= 4) {
    icone  = "🌾";
    titulo = "Muito bem!";
    msg    = "Excelente! Você entende a importância do equilíbrio entre produção e natureza.";
  } else if (qPontos >= 3) {
    icone  = "🌱";
    titulo = "Bom resultado!";
    msg    = "Você está no caminho certo. Continue explorando o tema do Agrinho 2026!";
  } else {
    icone  = "📚";
    titulo = "Continue aprendendo!";
    msg    = "Releia o conteúdo do site e tente novamente. O conhecimento é a raiz do futuro!";
  }

  // Atualiza os elementos do DOM
  qrIcon.textContent  = icone;
  qrTitle.textContent = titulo;
  qrMsg.textContent   = msg;

  // Cria a lista de detalhes das respostas dinamicamente
  qrDetail.innerHTML = "";
  for (var i = 0; i < qRespostas.length; i++) {
    var row = document.createElement("div");
    row.className = "qr-row " + (qRespostas[i].acertou ? "ok" : "fail");
    row.textContent = (qRespostas[i].acertou ? "✅ " : "❌ ") + qRespostas[i].pergunta;
    qrDetail.appendChild(row);
  }

  // Atualiza a barra de progresso para 100%
  qzBar.style.width = "100%";
}

// Reinicia o quiz — reseta variáveis e o DOM
btnRestart.addEventListener("click", function () {
  qAtual     = 0;
  qPontos    = 0;
  qRespondeu = false;
  qRespostas = [];

  quizResultWrap.classList.add("hidden");
  quizQWrap.classList.remove("hidden");
  qzBar.style.width = "20%";
  btnNext.textContent = "Próxima →";
  renderPergunta();
});