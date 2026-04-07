## 🎨 Animações GSAP + ScrollTrigger

Adicionei animações profissionais com **GSAP** para tornar a página mais dinâmica e envolvente.

---

### ✨ O que foi adicionado

#### Instalação
- `gsap` (v3) com plugin **ScrollTrigger**

#### Animações implementadas

| Elemento | Animação | Gatilho |
|---|---|---|
| **Hero título** | Fade + slide-up | Page load |
| **Hero subtítulo** | Fade + slide-up (delay 0.3s) | Page load |
| **Seta scroll** | Bounce infinito | Sempre |
| **TechCards** | Stagger reveal (0.1s entre cada) | ScrollTrigger batch |
| **Seções** | Fade-in + slide-up | Scroll (top 85%) |
| **Contador** | Pulse + color shift | Ao mudar valor |
| **TodoList** | Slide-up suave | Mount do Vue |
| **ContactForm** | Shake nos erros | Validação falha |
| **Tabela rows** | Slide da esquerda | Scroll (stagger 0.08s) |
| **Footer** | Fade-in | Scroll (top 95%) |

#### Acessibilidade
- ✅ Respeita `prefers-reduced-motion: reduce`
- ✅ Desabilita todas as animações automaticamente
- ✅ Animações são CSS/GSAP-only, sem JS desnecessário

#### Performance
- ✅ GSAP carregado via `import()` dinâmico (não bloqueia initial render)
- ✅ ~70KB gzipped (GSAP core)
- ✅ `once: true` em todos os ScrollTriggers (sem re-trigger)

---

### 📊 Bundle impact

| Chunk | Size | Gzip |
|---|---|---|
| GSAP (index) | 70.4 KB | 27.8 KB |
| Vue runtime | 81.4 KB | 32.3 KB |
| TodoList | 3.7 KB | 1.9 KB |
| ContactForm | 5.7 KB | 2.2 KB |

### 🧪 Como testar

```bash
npm run dev
```

1. Abra http://localhost:4321
2. Observe a entrada do hero
3. Scroll para ver as seções animando
4. Interaja com o contador (pulse)
5. Tente enviar o formulário vazio (shake)
