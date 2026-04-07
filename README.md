# 📝 Kellerv Marcelo — Blog Pessoal

Blog pessoal construído com **Astro 5**, **Vue 3** e **Tailwind CSS v4**. Um espaço para compartilhar aprendizados, tutoriais e insights sobre desenvolvimento web moderno.

> **Live Demo:** https://kellervmarcelo.github.io/astro-test/

## 📋 Sobre o Projeto

Este projeto começou como um playground para aprender Astro e evoluiu para um **blog pessoal completo**. Ele demonstra os principais recursos do Astro aplicados a um projeto real:

- **Content Collections** — gerenciamento de posts com type-safety e Markdown
- **Zero JavaScript por padrão** — páginas estáticas ultra-rápidas
- **Islands Architecture** — interatividade Vue quando necessário
- **Rotas dinâmicas** — geração automática de páginas para cada post
- **Deploy automático** — CI/CD para GitHub Pages via GitHub Actions

### O que você vai encontrar

| Seção | Componente | Tecnologia |
|---|---|---|
| Landing page | `index.astro` | Hero + posts recentes + sobre |
| Lista de blog | `blog/index.astro` | Grid de posts com filtro por tags |
| Post individual | `blog/[slug].astro` | Renderização de Markdown + navegação |
| Card de post | `BlogCard.astro` | Preview com data, descrição e tags |
| Lista de tags | `TagList.astro` | Filtro interativo por categoria |
| Layout de post | `PostLayout.astro` | Template consistente para leitura |

## 🛠 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Astro](https://astro.build/) | 5.18 | Framework principal |
| [Vue](https://vuejs.org/) | 3.5 | Componentes reativos (futuro) |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2 | Estilização via `@tailwindcss/vite` |
| [GSAP](https://gsap.com/) | 3.14 | Animações de scroll |
| [TypeScript](https://www.typescriptlang.org/) | 5.0 | Type-checking strict |
| [Markdown](https://daringfireball.net/projects/markdown/) | — | Escrita de posts |

## 📁 Estrutura do Projeto

```
astro-test/
├── src/
│   ├── components/
│   │   ├── BlogCard.astro       # Card de preview de posts
│   │   ├── PostLayout.astro     # Layout para posts individuais
│   │   ├── TagList.astro        # Lista de tags com filtro
│   │   ├── Counter.astro        # Ilha interativa (vanilla JS)
│   │   ├── TechCard.astro       # Card estático (zero JS)
│   │   ├── TodoList.vue         # Lista de tarefas (Vue 3)
│   │   └── ContactForm.vue      # Formulário com validação (Vue 3)
│   ├── content/
│   │   └── blog/
│   │       ├── config.ts        # Schema type-safe para posts
│   │       ├── primeiro-post.md
│   │       ├── segundo-post.md
│   │       └── terceiro-post.md
│   ├── layouts/
│   │   └── BaseLayout.astro     # Layout base com navbar
│   ├── pages/
│   │   ├── index.astro          # Landing page do blog
│   │   └── blog/
│   │       ├── index.astro      # Lista todos os posts
│   │       └── [...slug].astro  # Template dinâmico de posts
│   └── styles/
│       └── global.css           # Tailwind + tema custom
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── .github/
│   └── workflows/
│       ├── ci.yml               # CI: type-check + build
│       └── deploy.yml           # CD: deploy ao GitHub Pages
├── astro.config.mjs             # Vue + Tailwind + base path
├── tsconfig.json                # TypeScript strict mode
└── package.json
```

## 🚀 Comandos

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

## ✍️ Criando Novos Posts

Posts são escritos em **Markdown** e ficam em `src/content/blog/`:

```markdown
---
title: "Título do Post"
description: "Uma breve descrição do post"
date: 2026-04-07
tags: ["astro", "web-dev", "tutorial"]
---

# Conteúdo do Post

Escreva seu post aqui usando Markdown...
```

O Astro gera automaticamente a página em `/blog/seu-post` e adiciona o post à lista em `/blog`.

### Schema de Posts

Cada post deve seguir o schema definido em `src/content/config.ts`:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | ✅ | Título do post |
| `description` | string | ✅ | Descrição breve |
| `date` | date | ✅ | Data de publicação |
| `tags` | string[] | ❌ | Tags/categorias |
| `image` | string | ❌ | Imagem de capa |
| `draft` | boolean | ❌ | Rascunho (padrão: false) |

## 🎨 Estilização

O projeto usa **Tailwind CSS v4** com tema customizado:

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-astro: #FF5D01;
  --color-astro-light: #FF8C42;
}
```

Cores disponíveis: `text-astro`, `bg-astro/10`, `border-astro`, `from-astro to-astro-light`

## 🏗 Arquitetura

### Content Collections

Posts são gerenciados pelo sistema de Content Collections do Astro, que garante:
- ✅ Validação automática de frontmatter
- ✅ Autocomplete no editor
- ✅ Erros de build se algo estiver errado
- ✅ Query eficiente com `getCollection()`

### Rotas Dinâmicas

O arquivo `blog/[...slug].astro` usa `getStaticPaths()` para gerar uma página estática para cada post:

```typescript
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}
```

### Navegação entre Posts

Cada post inclui links para o post anterior e próximo, ordenados por data.

## 📊 Performance

| Métrica | Valor |
|---|---|
| Bundle JS (home) | ~15 KB gzip |
| Lighthouse | 100 |
| FCP | < 1s |
| Posts estáticos | Zero JS |

## 🧑‍💻 Autor

**Marcelo Keller** — [@kellervmarcelo](https://github.com/kellervmarcelo)

- GitHub: https://github.com/kellervmarcelo
- Blog: https://kellervmarcelo.github.io/astro-test/

## 📄 Licença

MIT
