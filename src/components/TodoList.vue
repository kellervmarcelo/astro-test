<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const newTodo = ref('')
const todos = ref<Todo[]>([
  { id: 1, text: 'Aprender Astro', done: true },
  { id: 2, text: 'Integrar Vue com Astro', done: true },
  { id: 3, text: 'Usar Tailwind nos estilos', done: false },
])

let nextId = 4

const pendingCount = computed(() => todos.value.filter(t => !t.done).length)
const totalCount = computed(() => todos.value.length)
const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round(((totalCount.value - pendingCount.value) / totalCount.value) * 100)
})

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return
  todos.value.unshift({ id: nextId++, text, done: false })
  newTodo.value = ''
}

function toggleTodo(todo: Todo) {
  todo.done = !todo.done
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="bg-slate-800 rounded-xl p-6 max-w-lg mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold m-0">📝 Lista de Tarefas</h3>
      <span class="bg-astro/20 text-astro px-3 py-1 rounded-full text-sm font-semibold">
        {{ pendingCount }} pendente(s)
      </span>
    </div>

    <!-- Progress bar -->
    <div class="h-2 bg-slate-700 rounded-full overflow-hidden mb-1">
      <div
        class="h-full bg-gradient-to-r from-astro to-astro-light rounded-full transition-all duration-500 ease-in-out"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>
    <p class="text-xs text-slate-500 text-right mt-0 mb-0">{{ progressPercent }}% concluído</p>

    <!-- Add form -->
    <form class="flex gap-2 my-4" @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Adicionar nova tarefa..."
        class="flex-1 px-4 py-2.5 border border-slate-700 rounded-lg bg-slate-900 text-slate-200 text-sm outline-none transition-colors duration-200 focus:border-astro placeholder-slate-600"
      />
      <button
        type="submit"
        class="bg-astro text-white border-none rounded-lg px-4 py-2.5 text-xl transition-colors duration-200 hover:bg-astro-light"
      >
        +
      </button>
    </form>

    <!-- Todo list with transitions -->
    <TransitionGroup name="todo" tag="ul" class="list-none p-0 m-0 space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center justify-between p-3 bg-slate-900 rounded-lg transition-opacity duration-200 hover:bg-slate-700/50"
        :class="{ 'opacity-60': todo.done }"
      >
        <label class="flex items-center gap-3 cursor-pointer flex-1">
          <input
            type="checkbox"
            :checked="todo.done"
            @change="toggleTodo(todo)"
            class="w-[18px] h-[18px] accent-astro cursor-pointer"
          />
          <span
            class="text-sm transition-all duration-200"
            :class="todo.done ? 'line-through text-slate-600' : 'text-slate-200'"
          >
            {{ todo.text }}
          </span>
        </label>
        <button
          class="bg-none border-none text-slate-500 text-base cursor-pointer px-2 py-1 rounded transition-all duration-200 hover:text-red-500 hover:bg-red-500/10"
          @click="removeTodo(todo.id)"
          aria-label="Remover tarefa"
        >
          ✕
        </button>
      </li>
    </TransitionGroup>

    <p v-if="todos.length === 0" class="text-center text-slate-600 text-sm mt-4 mb-0">
      Nenhuma tarefa ainda. Adicione uma acima!
    </p>
  </div>
</template>

<style scoped>
/* Transições Vue — mantidas pois Tailwind não cobre animações de entrada/saída */
.todo-enter-active {
  transition: all 0.3s ease;
}
.todo-leave-active {
  transition: all 0.2s ease;
}
.todo-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.todo-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.todo-move {
  transition: all 0.3s ease;
}
</style>
