---
title: "Content Collections: Organizando Posts no Astro"
description: "Aprenda a usar Content Collections para criar um blog organizado com type-safety e Markdown."
date: 2026-04-07
tags: ["astro", "markdown", "blog", "tutorial"]
image: ""
---

# Content Collections: Organizando Posts no Astro

Uma das features mais poderosas do Astro para blogs são as **Content Collections**. Elas permitem organizar conteúdo com type-safety completo.

## O que são Content Collections?

Content Collections são uma forma estruturada de gerenciar conteúdo em seu site Astro. Pense nelas como um **sistema de CMS type-safe** integrado ao framework.

### Vantagens

- ✅ Validação automática de frontmatter
- ✅ Autocomplete no editor
- ✅ Erros de build se algo estiver errado
- ✅ Query eficiente com `getCollection()`

## Configurando Content Collections

Primeiro, crie o arquivo de configuração:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

## Criando Posts em Markdown

Agora crie posts na pasta `src/content/blog/`:

```markdown
---
title: "Meu Primeiro Post"
description: "Uma introdução ao blog"
date: 2026-04-07
tags: ["astro", "blog"]
---

# Conteúdo do Post

Aqui vai o conteúdo do seu post em Markdown!
```

## Usando Posts nas Páginas

### Listar todos os posts

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
// Ordenar por data (mais recente primeiro)
const sortedPosts = posts.sort((a, b) => b.data.date - a.data.date);
---

{sortedPosts.map((post) => (
  <article>
    <h2>{post.data.title}</h2>
    <p>{post.data.description}</p>
    <time>{post.data.date.toLocaleDateString()}</time>
    <a href={`/blog/${post.slug}`}>Ler mais →</a>
  </article>
))}
```

### Criar páginas dinâmicas

```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

const post = Astro.props;
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

## Exemplo Prático: Blog com Tags

Você pode filtrar posts por tags:

```typescript
// Posts com a tag "astro"
const astroPosts = posts.filter(
  (post) => post.data.tags?.includes('astro')
);
```

Ou agrupar todas as tags únicas:

```typescript
const allTags = [...new Set(
  posts.flatMap((post) => post.data.tags ?? [])
)];
```

## Dicas Importantes

1. **Sempre use schema** - Garante type-safety e previne erros
2. **Use `draft: true`** - Para posts em progresso que não devem ser publicados
3. **Organize por pasta** - `blog/`, `docs/`, `snippets/`, etc.
4. **Slug automático** - Baseado no nome do arquivo

## Próximos Passos

Com Content Collections configuradas, você pode:

- Adicionar paginação à lista de posts
- Criar páginas de tags
- Implementar busca de posts
- Adicionar RSS feed
- Gerar sitemap automaticamente

## Conclusão

Content Collections tornam criar blogs no Astro uma experiência incrível. A combinação de **Markdown simples** com **type-safety** é perfeita para projetos solo e equipes.

Fique ligado nos próximos posts onde vou explorar mais features do Astro!
