# Agrinho 2026 — Agro Forte, Futuro Sustentável

## Objetivo do Projeto

Site desenvolvido para o **Concurso Agrinho 2026**, Subcategoria 3 — Programação Front-End (HTML, CSS e JavaScript), promovido pelo **SENAR-PR** em parceria com a **SEED-PR**.

O tema central é **"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**.

O projeto aborda como o agronegócio brasileiro pode crescer de forma responsável, preservando a biodiversidade, os recursos hídricos e os ecossistemas que sustentam a vida e a própria produção agrícola.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica (`section`, `nav`, `footer`, `canvas`, `button`, `ul`) |
| **CSS3** | Variáveis CSS, Grid, Flexbox, Media Queries, `@keyframes`, `IntersectionObserver` |
| **JavaScript** (puro) | Canvas 2D, manipulação de DOM, eventos, `IntersectionObserver`, `setInterval` |

> ✅ Sem bibliotecas ou frameworks externos  
> ✅ CSS em arquivo separado (`style.css`)  
> ✅ JavaScript em arquivo separado (`script.js`)  
> ✅ Sem CSS inline ou interno no HTML  
> ✅ Sem JS inline ou interno no HTML  

---

## Estrutura de Arquivos

```
agrinho2026/
│
├── index.html    → Estrutura HTML semântica
├── style.css     → Todos os estilos (externo)
├── script.js     → Todo o JavaScript (externo)
└── README.md     → Documentação do projeto
```

---

## Funcionalidades JavaScript (Manipulação de DOM)

1. **Canvas animado** — Grade hexagonal + partículas conectadas com `canvas` 2D e `requestAnimationFrame`
2. **Menu hamburguer** — Alterna classe `open` no elemento da nav para mostrar/esconder em mobile
3. **Nav ativa** — Monitora scroll e adiciona classe `active` ao link da seção visível
4. **Modo escuro/claro** — Botão alterna classe `light` no `body`, ativando variáveis CSS diferentes
5. **Reveal ao scroll** — `IntersectionObserver` adiciona classe `visible` aos elementos ao entrar na tela
6. **Barras animadas** — Preenchem-se via `style.width` ao entrar na viewport
7. **Contadores animados** — Animam os números via `setInterval` e `textContent`
8. **Tabs interativas** — Alternam painéis via `classList.add/remove`
9. **Folhas flutuantes** — Cria/remove elementos `span` dinamicamente no DOM
10. **Quiz completo** — Cria opções com `createElement`, exibe feedback, placar e resultado detalhado

---

## Seções do Site

| Seção | Conteúdo |
|-------|----------|
| Início | Hero com contadores animados e cards de estatísticas |
| Tema | Explicação do tema com cards visuais e badges |
| Pilares | Comparativo agronegócio × meio ambiente |
| Práticas | 6 práticas sustentáveis em tabs interativas |
| Números | Gráficos de barras, big numbers e linha do tempo |
| Quiz | 5 perguntas com feedback e placar |
| Créditos | Tecnologias, fontes e crédito ao Claude (IA) |

---

## Responsividade

Adaptado para diferentes tamanhos de tela via **CSS Media Queries**:
- **Desktop** (> 1000px): layouts em grid de múltiplas colunas
- **Tablet** (≤ 1000px): coluna única, hero empilhado
- **Mobile** (≤ 768px): menu hamburguer, ajustes gerais
- **Mobile pequeno** (≤ 520px): ajustes adicionais de tipografia e espaçamento

---

## Créditos

- **Claude (Anthropic)** — Inteligência Artificial utilizada como apoio na criação e estruturação do código
- **Dados** — IBGE, MAPA, SENAR-PR e fontes públicas do governo federal
- **Ícones** — Emojis nativos do sistema operacional (sem licença necessária)
- **Tipografia** — `system-ui` e `Georgia` — fontes nativas, sem importação externa

---

## Concurso

- **Programa:** Agrinho 2026
- **Categoria:** Programação — Subcategoria 3 (Front-End: HTML, CSS e JavaScript)
- **Organizadores:** SENAR-PR / SEED-PR / Sistema FAEP
- **Site oficial:** https://www.sistemafaep.org.br/agrinho/