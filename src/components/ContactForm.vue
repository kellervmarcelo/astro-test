<script setup lang="ts">
import { ref, watch } from 'vue'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const successMsg = ref('')

const errors = ref<Partial<Record<keyof FormData, string>>>({})

function validate(): boolean {
  errors.value = {}

  if (!form.value.name.trim()) errors.value.name = 'Nome é obrigatório'
  if (!form.value.email.trim()) {
    errors.value.email = 'E-mail é obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'E-mail inválido'
  }
  if (!form.value.subject.trim()) errors.value.subject = 'Assunto é obrigatório'
  if (!form.value.message.trim()) {
    errors.value.message = 'Mensagem é obrigatória'
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Mensagem deve ter pelo menos 10 caracteres'
  }

  return Object.keys(errors.value).length === 0
}

// Shake animation when errors appear
watch(errors, async (newErrors) => {
  const { gsap } = await import('gsap')
  Object.keys(newErrors).forEach((field) => {
    const el = document.getElementById(`cf-${field}`)
    if (el) {
      gsap.fromTo(el, { x: [-6, 6, -4, 4, -2, 0] }, { duration: 0.4, ease: 'power2.out' })
    }
  })
}, { deep: true })

function handleSubmit() {
  if (!validate()) return

  isSubmitting.value = true

  setTimeout(() => {
    const data = form.value
    alert(
      `✅ Mensagem enviada com sucesso!\n\n` +
      `👤 Nome: ${data.name}\n` +
      `📧 E-mail: ${data.email}\n` +
      `📋 Assunto: ${data.subject}\n` +
      `💬 Mensagem: ${data.message}`
    )
    form.value = { name: '', email: '', subject: '', message: '' }
    successMsg.value = 'Mensagem enviada com sucesso!'
    isSubmitting.value = false
    setTimeout(() => { successMsg.value = '' }, 4000)
  }, 800)
}

function getErrorClass(field: keyof FormData): string {
  return errors.value[field]
    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
    : 'border-slate-700 focus:border-astro focus:ring-1 focus:ring-astro/30'
}
</script>

<template>
  <form
    class="contact-form bg-slate-800 rounded-xl p-6 max-w-lg mx-auto space-y-5"
    @submit.prevent="handleSubmit"
    novalidate
  >
    <Transition name="fade">
      <div
        v-if="successMsg"
        class="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center"
      >
        {{ successMsg }}
      </div>
    </Transition>

    <div>
      <label for="cf-name" class="block text-sm font-medium text-slate-300 mb-1.5">
        Nome <span class="text-red-400">*</span>
      </label>
      <input
        id="cf-name"
        v-model="form.name"
        type="text"
        placeholder="Seu nome"
        :class="['w-full px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 text-sm outline-none transition-all duration-200 placeholder-slate-600 border', getErrorClass('name')]"
      />
      <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
    </div>

    <div>
      <label for="cf-email" class="block text-sm font-medium text-slate-300 mb-1.5">
        E-mail <span class="text-red-400">*</span>
      </label>
      <input
        id="cf-email"
        v-model="form.email"
        type="email"
        placeholder="seu@email.com"
        :class="['w-full px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 text-sm outline-none transition-all duration-200 placeholder-slate-600 border', getErrorClass('email')]"
      />
      <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label for="cf-subject" class="block text-sm font-medium text-slate-300 mb-1.5">
        Assunto <span class="text-red-400">*</span>
      </label>
      <input
        id="cf-subject"
        v-model="form.subject"
        type="text"
        placeholder="Sobre o que deseja falar?"
        :class="['w-full px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 text-sm outline-none transition-all duration-200 placeholder-slate-600 border', getErrorClass('subject')]"
      />
      <p v-if="errors.subject" class="text-red-400 text-xs mt-1">{{ errors.subject }}</p>
    </div>

    <div>
      <label for="cf-message" class="block text-sm font-medium text-slate-300 mb-1.5">
        Mensagem <span class="text-red-400">*</span>
      </label>
      <textarea
        id="cf-message"
        v-model="form.message"
        rows="4"
        placeholder="Escreva sua mensagem..."
        :class="['w-full px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 text-sm outline-none transition-all duration-200 placeholder-slate-600 border resize-none', getErrorClass('message')]"
      ></textarea>
      <p v-if="errors.message" class="text-red-400 text-xs mt-1">{{ errors.message }}</p>
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full bg-astro hover:bg-astro-light disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
    >
      <template v-if="isSubmitting">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Enviando...
      </template>
      <template v-else>
        Enviar Mensagem
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </template>
    </button>
  </form>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
