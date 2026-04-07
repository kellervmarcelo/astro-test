# QWEN.md — Contexto do Projeto: astro-test

## Visão Geral

**astro-test** é um projeto de demonstração e aprendizado do framework **Astro 5**. Ele serve como playground para os principais conceitos do Astro:

- **Zero JavaScript por padrão** — páginas renderizadas como HTML estático puro
- **Islands Architecture** — componentes interativos que hidratam sob demanda
- **Multi-Framework** — componentes Vue 3 coexistem com componentes Astro puros na mesma página
- **Styling com Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Animações com GSAP** — ScrollTrigger para animações baseadas em scroll
- **Deploy automático no GitHub Pages** — via GitHub Actions

**Repositório:** https://github.com/kellervmarcelo/astro-test  
**Deploy:** https://kellervmarcelo.github.io/astro-test/

## Stack de Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Astro | 5.18 | Framework principal |
| Vue 3 | 3.5 | Componentes reativos (TodoList, ContactForm) |
| Tailwind CSS | 4.2 | Estilização completa via `@tailwindcss/vite` |
| GSAP | 3.14 | Animações (hero, scroll reveals, shake, pulse) |
| TypeScript | 5.0 | Type-checking strict |

## Estrutura do Projeto

```
astro-test/
├── src/
│   ├── components/
│   │   ├── Counter.astro        # Ilha interativa (vanilla JS, script is:inline)
│   │   ├── TechCard.astro       # Card estático (zero JS)
│   │   ├── TodoList.vue         # Lista de tarefas (Vue 3, client:visible)
│   │   └── ContactForm.vue      # Formulário com validação (Vue 3, client:visible)
│   ├── layouts/
│   │   └── BaseLayout.astro     # Layout base com HTML semântico + import do CSS global
│   ├── pages/
│   │   └── index.astro          # Página principal + script GSAP
│   └── styles/
│       └── global.css           # @import "tailwindcss" + @theme custom colors
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # CI: type-check + build
│   │   └── deploy.yml           # CD: deploy ao GitHub Pages
│   └── PULL_REQUEST_TEMPLATE.md
├── astro.config.mjs             # Vue integration + Tailwind via Vite + base path
├── tsconfig.json                # extends: astro/tsconfigs/strict
└── package.json
```

## Comandos Principais

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:4321)
# Nota: com base path configurado, acesse http://localhost:4321/astro-test/
npm run dev

# Build de produção (output em dist/)
npm run build

# Preview local do build
npm run preview

# Type-check TypeScript
npx astro check
```

## Configuração Importante

### Base Path (GitHub Pages)

O projeto está configurado com `base: '/astro-test'` em `astro.config.mjs` para funcionar corretamente no GitHub Pages. Isso significa que **localmente** o servidor dev também exige o prefixo `/astro-test`.

### Custom Theme Tailwind

Cores customizadas definidas em `src/styles/global.css`:
```css
@theme {
  --color-astro: #FF5D01;
  --color-astro-light: #FF8C42;
}
```
Uso: `text-astro`, `bg-astro/10`, `border-astro`, `from-astro to-astro-light`

## Arquitetura: Islands em Ação

O projeto demonstra três níveis de interatividade:

| Componente | Tecnologia | JavaScript | Hidratação |
|---|---|---|---|
| `TechCard.astro` | Astro puro | **Zero** | Nenhuma |
| `Counter.astro` | `<script is:inline>` | ~100 bytes | Sempre (módulo) |
| `TodoList.vue` | Vue 3 | ~85 KB gzip | `client:visible` |
| `ContactForm.vue` | Vue 3 | ~85 KB gzip | `client:visible` |

## CI/CD

### Pull Request (qual branch)
1. **Type Check** — `npx astro check` (zero errors)
2. **Build** — `npm run build` (sem falhas)

### Merge na main
1. **Build** — `withastro/action@v6`
2. **Deploy** — `actions/deploy-pages@v5` → GitHub Pages

### Branch Protection (main)
- Status checks `Type Check` e `Build` devem passar
- Sem requirement de code review (projeto solo)

## Convenções de Desenvolvimento

- **Branches**: usar prefixos `feature/`, `fix/`, `chore/` seguido de descrição simples (ex: `feature/vue-contact-form`, `fix/gsap-animations`)
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **TypeScript**: mode strict — usar `as Element` ou `as any` quando necessário para interoperabilidade com libs sem tipos (GSAP)
- **Componentes estáticos**: nunca usar `opacity-0` sem fallback — conteúdo deve ser visível mesmo se JS falhar
- **Acessibilidade**: respeitar `prefers-reduced-motion` para desabilitar animações

## Notas de Troubleshooting Conhecidas

| Problema | Solução |
|---|---|
| Cards invisíveis no build | Remover `opacity-0` e `anim-hidden` do TechCard |
| GSAP não carrega | Usar `<script>` (não `is:inline` ou `type="module"`) para que o Vite processe imports npm |
| `astro check` error ts(2339) em `window.counterPulse` | Usar `(window as any).counterPulse` |
| `astro check` error ts(2345) em `gsap.from(section)` | Cast: `section as Element` |
| Dev server 404 na raiz | Acessar com base path: `http://localhost:4321/astro-test/` |
