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
4. **Modo escuro/claro** — Botão alterna classe `light` no `body`, ativando variáveis CSS diferentes; texto do botão atualizado corretamente para "☀️ Modo Claro" quando ativo e "🌙 Modo Escuro" quando inativo
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

## Correções Aplicadas

### Bug de fonte — textos como "3em1" renderizando de forma estranha

**Causa:** A string `3em1` era renderizada com ligaduras tipográficas ativas em alguns navegadores e sistemas operacionais ao usar a fonte Georgia, fundindo os caracteres de forma incorreta.

**Correções no HTML (`index.html`):**
- `3em1` → `3 em 1` (com espaços, texto legível e semântico)
- `0` (emissão CO₂, painel Energia Solar) → `Zero` (evita ambiguidade visual)
- `25+` → `25+ anos` (mais claro e descritivo)

**Correções no CSS (`style.css`):**
Adicionadas propriedades de proteção tipográfica nos seletores `.float-num`, `.bignum-val`, `.ps-item strong` e `.counter`:

```css
font-variant-numeric: normal;
font-feature-settings: normal;
-webkit-font-smoothing: antialiased;
```

Isso desliga ligaduras numéricas que causavam a renderização incorreta nas fontes serifadas.

### Bug do botão Modo Escuro/Claro

**Causa:** O `textContent` do botão dizia "☀️ Modo Escuro" tanto no estado escuro quanto no claro.

**Correção no JS (`script.js`):** Quando o modo claro é ativado, o botão passa a exibir `"☀️ Modo Claro"`. Ao voltar ao modo escuro, exibe `"🌙 Modo Escuro"`.

### Organização do CSS

Os seletores `.ps-item strong` e `.bignum-val` foram separados do grupo principal para que não herdassem `min-width` e `font-size` incorretos, mantendo seus tamanhos próprios conforme o layout de cada seção.

---

## Créditos

- **Claude (Anthropic)** — Inteligência Artificial utilizada como apoio na criação, estruturação e correção do código
- **Dados** — IBGE, MAPA, SENAR-PR e fontes públicas do governo federal
- **Ícones** — Emojis nativos do sistema operacional (sem licença necessária)
- **Tipografia** — `system-ui` e `Georgia` — fontes nativas, sem importação externa

---

## Concurso

- **Programa:** Agrinho 2026
- **Categoria:** Programação — Subcategoria 3 (Front-End: HTML, CSS e JavaScript)
- **Organizadores:** SENAR-PR / SEED-PR / Sistema FAEP
- **Site oficial:** https://www.sistemafaep.org.br/agrinho/