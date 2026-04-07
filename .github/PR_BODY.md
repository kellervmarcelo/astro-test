## 📬 Nova funcionalidade: Formulário de Contato com Vue 3

Adicionei um componente Vue 3 de formulário de contato com validação completa, demonstrando mais um exemplo de **Islands Architecture** no projeto.

---

### ✨ O que mudou

#### Novo componente: `ContactForm.vue`
- Formulário reativo com **Vue 3 Composition API** (`<script setup>`)
- **4 campos**: nome, e-mail, assunto e mensagem
- **Validação em tempo real** com mensagens de erro inline
- **Estado de loading** com spinner animado durante o "envio"
- **Mensagem de sucesso** com transição suave (fade)
- **`alert()` formatado** exibindo todos os dados submetidos

#### Atualização: `index.astro`
- Nova seção **📬 Formulário de Contato** importando o `ContactForm`
- Componente renderizado com `client:visible` (hidrata só quando visível)

---

### 🔍 Detalhes técnicos

| Item | Detalhe |
|---|---|
| Framework | Vue 3.5 (Composition API + `ref`, `computed`) |
| Estilos | Tailwind CSS v4 (classes utilitárias) |
| Validação | Regex para e-mail, required para todos os campos |
| Transições | Vue `<Transition>` para toast de sucesso |
| Hidratação | `client:visible` (lazy hydration) |

---

### 🧪 Como testar

```bash
npm run dev
# Abra http://localhost:4321
```

1. Scroll até a seção **📬 Formulário de Contato**
2. Tente enviar vazio para ver a **validação inline**
3. Preencha corretamente e clique em **Enviar**
4. Veja o **alert** com os dados formatados

---

### 📊 Ilhas no projeto agora

| Componente | Tecnologia | Hidratação |
|---|---|---|
| `TechCard.astro` | Astro puro | Nenhuma (zero JS) |
| `Counter.astro` | `<script is:inline>` | Sempre (módulo) |
| `TodoList.vue` | Vue 3 | `client:visible` |
| `ContactForm.vue` | Vue 3 | `client:visible` |
