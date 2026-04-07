## 🎨 GSAP Animations — Implementação Corrigida

Adicionei animações profissionais com **GSAP + ScrollTrigger** em toda a página.

> Esta branch parte da `main` limpa (sem GSAP). Implementação feita do zero com script loading correto via Vite.

---

### ✨ Animações implementadas

| Elemento | Animação | Gatilho |
|---|---|---|
| **Hero título** | Fade + slide-up de baixo | Page load (delay 0.2s) |
| **Hero subtítulo** | Fade + slide-up de baixo | Page load (delay 0.5s) |
| **Seta scroll** | Bounce infinito | Contínuo |
| **Seções** | Fade-in + slide-up | Scroll (top 85%, once) |
| **Contador** | Pulse + troca de cor | Ao clicar +/−/reset |
| **TodoList** | Slide-up suave | Mount do Vue |
| **ContactForm** | Shake nos inputs com erro | Validação falha |
| **Tabela rows** | Stagger slide da esquerda | Scroll (0.08s entre rows) |
| **Footer** | Fade-in | Scroll (top 95%) |

---

### 🔧 Detalhes técnicos

- **GSAP carregado corretamente**: `<script>` sem `is:inline` — processado pelo Vite, imports de npm funcionam
- **Zero arquivos extras**: código inline no `<script>` da página, sem módulos separados
- **Acessibilidade**: respeita `prefers-reduced-motion: reduce`
- **Performance**: `once: true` em todos os ScrollTriggers (sem re-trigger)

### 📦 Arquivos modificados

```
 src/components/ContactForm.vue   + watch + gsap shake nos erros
 src/components/Counter.astro     + counter-value class + window.counterPulse
 src/components/TechCard.astro    - removido opacity-0 (cards visíveis)
 src/components/TodoList.vue      + onMounted + gsap from()
 src/pages/index.astro            + hero classes, anim-section, script GSAP
 package.json                     + gsap dependency
```

---

### 🧪 Como testar

```bash
npm run dev
# Abra http://localhost:4321/astro-test/
```

1. Observe a entrada do hero (fade + slide-up)
2. Veja a seta ↓ animando (bounce)
3. Scroll para ver seções aparecendo
4. Interaja com o contador (pulse)
5. Tente enviar o formulário vazio (shake)

### ✅ Build
```
1 page built in 1.38s
```
