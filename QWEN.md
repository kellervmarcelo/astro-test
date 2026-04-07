# QWEN.md — Contexto do Projeto: astro-test

## Visão Geral

**astro-test** é um **blog pessoal** construído com **Astro 5**. O projeto começou como um playground de aprendizado e evoluiu para um blog completo com Content Collections, rotas dinâmicas e deploy automático.

- **Content Collections** — posts em Markdown com schema type-safe
- **Zero JavaScript por padrão** — páginas estáticas ultra-rápidas
- **Islands Architecture** — componentes Vue hidratam sob demanda
- **Rotas dinâmicas** — uma página gerada para cada post automaticamente
- **Styling com Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Animações com GSAP** — ScrollTrigger na landing page
- **Deploy automático no GitHub Pages** — via GitHub Actions

**Repositório:** https://github.com/kellervmarcelo/astro-test
**Deploy:** https://kellervmarcelo.github.io/astro-test/

## Stack de Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Astro | 5.18 | Framework principal |
| Vue 3 | 3.5 | Componentes reativos (futuro uso) |
| Tailwind CSS | 4.2 | Estilização via `@tailwindcss/vite` |
| GSAP | 3.14 | Animações de scroll na landing page |
| TypeScript | 5.0 | Type-checking strict |
| Markdown | — | Escrita de posts |

## Estrutura do Projeto

```
astro-test/
├── src/
│   ├── components/
│   │   ├── BlogCard.astro         # Card de preview de posts
│   │   ├── PostLayout.astro       # Layout para posts individuais
│   │   ├── TagList.astro          # Lista de tags com filtro
│   │   ├── Counter.astro          # Ilha interativa (vanilla JS)
│   │   ├── TechCard.astro         # Card estático (zero JS)
│   │   ├── TodoList.vue           # Lista de tarefas (Vue 3)
│   │   └── ContactForm.vue        # Formulário com validação (Vue 3)
│   ├── content/
│   │   └── blog/
│   │       ├── config.ts          # Schema type-safe para posts
│   │       ├── primeiro-post.md
│   │       ├── segundo-post.md
│   │       └── terceiro-post.md
│   ├── layouts/
│   │   └── BaseLayout.astro       # Layout base com navbar sticky
│   ├── pages/
│   │   ├── index.astro            # Landing page do blog
│   │   └── blog/
│   │       ├── index.astro        # Lista todos os posts
│   │       └── [...slug].astro    # Template dinâmico de posts
│   └── styles/
│       └── global.css             # @import "tailwindcss" + @theme
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI: type-check + build
│       └── deploy.yml             # CD: deploy ao GitHub Pages
├── astro.config.mjs               # Vue + Tailwind + base path
├── tsconfig.json                  # extends: astro/tsconfigs/strict
└── package.json
```

## Comandos Principais

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:4321/astro-test/)
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

O projeto está configurado com `base: '/astro-test'` em `astro.config.mjs`. Isso significa que **localmente** o servidor dev também exige o prefixo `/astro-test`.

### Custom Theme Tailwind

Cores customizadas definidas em `src/styles/global.css`:
```css
@theme {
  --color-astro: #FF5D01;
  --color-astro-light: #FF8C42;
}
```
Uso: `text-astro`, `bg-astro/10`, `border-astro`, `from-astro to-astro-light`

### Content Collections Schema

Definido em `src/content/config.ts`:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
```

### Helper de URLs

Todos os links internos usam a função `resolve()` para respeitar o base path:

```typescript
const resolve = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return cleanBase + path;
};
```

## Arquitetura: Páginas do Blog

### Landing Page (`/`)
- Hero com apresentação pessoal
- Grid de posts recentes (3 mais recentes)
- Seção "Sobre mim"
- Call-to-action para o blog completo
- Animações GSAP com scroll reveal

### Lista de Blog (`/blog`)
- Todos os posts ordenados por data
- Filtro por tags via query param
- Componente TagList para navegação por categorias

### Posts Individuais (`/blog/[slug]`)
- Template dinâmico gerado via `getStaticPaths()`
- Renderização do Markdown com `<Content />`
- Navegação anterior/próximo post
- Layout otimizado para leitura (prose)

## Criando Novos Posts

1. Crie um arquivo `.md` em `src/content/blog/`
2. Adicione o frontmatter com título, descrição, data e tags
3. Escreva o conteúdo em Markdown
4. O Astro gera automaticamente a página em `/blog/nome-do-arquivo`

Exemplo:
```markdown
---
title: "Meu Novo Post"
description: "Descrição breve do post"
date: 2026-04-07
tags: ["astro", "tutorial"]
---

# Conteúdo

Escreva aqui...
```

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

- **Branches**: SEMPRE criar a partir da `main`, usar prefixos `feature/`, `fix/`, `chore/`
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **TypeScript**: mode strict — usar casts quando necessário para libs sem tipos
- **Acessibilidade**: respeitar `prefers-reduced-motion` para desabilitar animações

## Notas de Troubleshooting Conhecidas

| Problema | Solução |
|---|---|
| Dev server 404 na raiz | Acessar com base path: `http://localhost:4321/astro-test/` |
| Links quebrados | Verificar se usam `resolve()` helper |
| Posts não aparecem | Verificar `draft: true` no frontmatter |
| `astro check` errors | Usar `(window as any)` para globals dinâmicos |
| Tags não filtram | Verificar query param `?tag=nome` |
