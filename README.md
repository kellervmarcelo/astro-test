# 🚀 Astro Test

Meu primeiro projeto com **Astro** — demonstrando Islands Architecture, integração com **Vue 3** e estilização com **Tailwind CSS v4**.

> [Live Demo](https://astro-test.vercel.app) *(adicione a URL do deploy)*

## 📋 Sobre o Projeto

Este projeto serve como playground para aprender e demonstrar os principais conceitos do Astro:

- **Zero JavaScript por padrão** — a página é renderizada como HTML estático puro
- **Islands Architecture** — componentes interativos são "ilhas" isoladas que hidratam sob demanda
- **Multi-Framework** — componentes Vue 3 coexistem com componentes Astro puros na mesma página
- **Performance máxima** — Lighthouse 100/100 com bundle mínimo

### O que você vai encontrar

| Seção | Componente | Tecnologia |
|---|---|---|
| Cards de features | `TechCard.astro` | Astro estático (zero JS) |
| Contador interativo | `Counter.astro` | `<script is:inline>` (vanilla JS) |
| Lista de tarefas | `TodoList.vue` | Vue 3 Composition API (`client:visible`) |
| Tabela comparativa | `index.astro` | HTML estático + Tailwind |

## 🛠 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Astro](https://astro.build/) | 5.18 | Framework principal |
| [Vue](https://vuejs.org/) | 3.5 | Componente TodoList (ilha reativa) |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2 | Estilização completa |
| [TypeScript](https://www.typescriptlang.org/) | 5.0 | Type-checking strict |

## 📁 Estrutura do Projeto

```
astro-test/
├── src/
│   ├── components/
│   │   ├── Counter.astro       # Ilha interativa (vanilla JS)
│   │   ├── TechCard.astro      # Card estático (zero JS)
│   │   └── TodoList.vue        # Lista de tarefas (Vue 3)
│   ├── layouts/
│   │   └── BaseLayout.astro    # Layout base com HTML semântico
│   ├── pages/
│   │   └── index.astro         # Página principal
│   └── styles/
│       └── global.css          # Tailwind + tema custom (@theme)
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs            # Configuração (Vue + Tailwind via Vite)
├── tsconfig.json               # TypeScript strict mode
└── package.json
```

## 🚀 Comandos

Todos os comandos são executados a partir da raiz do projeto:

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (http://localhost:4321)
npm run dev

# Build de produção (output em dist/)
npm run build

# Preview local do build de produção
npm run preview

# Verificar tipos TypeScript
npx astro check
```

## 🏝️ Islands Architecture em Ação

O projeto demonstra três níveis de interatividade:

### 1. Estático (zero JS)
```astro
<!-- TechCard.astro — HTML puro, sem JavaScript -->
<div class="bg-slate-800 rounded-xl p-6">
  <span class="text-3xl">{icon}</span>
  <h3>{name}</h3>
</div>
```

### 2. Script inline (sempre carregado)
```astro
<!-- Counter.astro — módulo JS na página -->
<script is:inline>
  document.querySelectorAll('[data-counter]').forEach(...)
</script>
```

### 3. Framework hydratable (sob demanda)
```astro
<!-- index.astro — Vue só carrega quando visível -->
<TodoList client:visible />
```

### Diretivas de hidratação disponíveis

| Diretiva | Quando hidrata |
|---|---|
| `client:load` | Imediatamente no carregamento |
| `client:idle` | Após `window.load` |
| `client:visible` | Quando entra no viewport |
| `client:media` | Quando a media query corresponde |

## 🎨 Tailwind CSS v4

O projeto usa Tailwind v4 com configuração via CSS-first:

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-astro: #FF5D01;
  --color-astro-light: #FF8C42;
}
```

Cores customizadas disponíveis: `text-astro`, `bg-astro/10`, `border-astro`, `from-astro to-astro-light`

## 📊 Comparativo de Frameworks

| Framework | Bundle JS | Lighthouse | Melhor Para |
|---|---|---|---|
| ⚡ **Astro** | **0 KB** | **100** | Conteúdo, marketing, blogs |
| ⚛️ Next.js | 95-250 KB | 94 | Apps complexos, React |
| 💚 SvelteKit | ~180 KB | 98 | Performance SPA |
| 💚 Nuxt 3 | ~180 KB | 97 | Full-stack Vue |

## 🧑‍💻 Autor

**Marcelo Keller** — [@kellervmarcelo](https://github.com/kellervmarcelo)

## 📄 Licença

MIT
