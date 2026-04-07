---
title: "Islands Architecture: O Segredo do Astro"
description: "Entenda como a Islands Architecture permite interatividade sob demanda sem comprometer a performance."
date: 2026-04-04
tags: ["astro", "vue", "performance", "arquitetura"]
image: ""
---

# Islands Architecture: O Segredo do Astro

Uma das features mais poderosas do Astro é a **Islands Architecture**. Mas o que isso significa?

## O Problema dos SPAs Tradicionais

Em frameworks tradicionais como React ou Vue, toda a aplicação é hidratada no cliente:

- Bundle inicial grande (200KB+)
- Tempo de carregamento lento
- Performance ruim em dispositivos antigos

## A Solução: Islands

Com a arquitetura de islands (ilhas), apenas o necessário é hidratado:

- **Conteúdo estático**: HTML puro (zero JS)
- **Componentes interativos**: Hidratados sob demanda
- **Controle granular**: Você decide o que recebe JS

## Como Funciona na Prática

No Astro, você usa **diretivas de hidratação** para controlar quando um componente se torna interativo:

```astro
---
import Counter from '../components/Counter.vue';
---

<!-- Nunca hidrata - HTML estático -->
<Counter />

<!-- Hidrata quando visível -->
<Counter client:visible />

<!-- Hidrata após carregamento -->
<Counter client:load />

<!-- Hidrata no idle -->
<Counter client:idle />
```

## Exemplo com Vue 3

Neste blog, criei componentes Vue que só carregam quando necessários:

### Componente Vue (TodoList.vue)

```vue
<template>
  <div>
    <h2>Minha Lista de Tarefas</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
    <button @click="addTodo">Adicionar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const todos = ref([
  { id: 1, text: 'Aprender Astro' },
  { id: 2, text: 'Criar meu blog' },
]);

function addTodo() {
  todos.value.push({
    id: Date.now(),
    text: 'Nova tarefa'
  });
}
</script>
```

## Resultados de Performance

Usando Islands Architecture:

| Métrica | SPA Tradicional | Astro |
|---------|----------------|-------|
| Bundle JS | ~250 KB | ~15 KB |
| Lighthouse | 85 | **100** |
| FCP | 2.1s | **0.8s** |

## Quando Usar Islands

✅ **Use quando:**
- Formulários interativos
- Contadores/carrosséis
- Componentes com estado local

❌ **Não use quando:**
- Conteúdo estático puro
- Texto e imagens simples
- Layouts e estrutura da página

## Conclusão

A Islands Architecture é o que torna Astro tão especial. Você obtém o melhor dos dois mundos: **performance de HTML estático** com **interatividade quando necessário**.

No próximo post, vou mostrar como criar um sistema de blog completo com Content Collections!
