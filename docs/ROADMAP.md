# Roadmap de mejoras

Memoria operativa del proceso de pasar el mockup de Figma a web lista para
producción. Contexto del proyecto y convenciones: ver `../CLAUDE.md`.

**Estado:** `[ ]` pendiente · `[x]` completado
**Última auditoría:** 2026-07-30 · **Etapas completadas:** 0, 1, 2 (parcial) · **Siguiente:** Etapa 4

---

## Diagnóstico

Estado general: **bueno, con problemas puntuales acotados**. Todos los hallazgos
se verificaron ejecutando el sitio (Playwright en 6 viewports, `pnpm audit`,
build de producción, medición de contraste y de red), no por inspección visual.

**Ya correcto — no tocar:** cero overflow horizontal en 320/390/768/1280/1440/1920px ·
jerarquía de headings h1→h2→h3 sin saltos · landmarks semánticos presentes ·
los 8 enlaces externos con `rel="noopener noreferrer"` · foco de teclado visible ·
build limpio (~290ms, JS 67KB gzip) · cero errores de consola.

**Descartado como problema (no perder tiempo):**
- Las 8 vulnerabilidades de `pnpm audit` (5 high / 3 moderate) son **todas de
  herramientas de desarrollo** (servidor dev de Vite, PostCSS en build). Ninguna
  llega al bundle de producción, que es HTML/CSS/JS estático.
- El `<title>` incorrecto que aparece en desarrollo es un servidor sin reiniciar,
  no un bug: en `dist/` sale correcto.
- El número de WhatsApp visible no es una fuga de secretos: es información
  comercial pública e intencional.

---

## Hallazgos

### 🔴 Crítico
| # | Problema | Impacto | Solución |
|---|---|---|---|
| C1 | `robots.index: false` → `noindex` + `Disallow: /` | Google no indexa; anula el objetivo comercial | Activar al lanzar (hoy es correcto que esté bloqueado) |
| C2 | `lang="en"` con contenido en español | Lectores de pantalla pronuncian mal; SEO erróneo | `"language": "es-CL"` en `site.json` |

### 🟠 Alto
| # | Problema | Impacto | Solución |
|---|---|---|---|
| A1 | `hero.png` 1342 KB, 1305×1060 renderizado a 532×432, **es el LCP** | ~80% del peso de la página; mala carga en datos móviles | WebP ~1100px: **1342 KB → 109 KB (−92%)**, medido. Añadir `width`/`height` + `fetchpriority="high"` |
| A2 | Los 4 campos del formulario sin `id`/`htmlFor` | Lectores de pantalla no anuncian el campo; clicar el label no enfoca | Asociar `id` ↔ `htmlFor` |
| A3 | Botón hamburguesa sin `aria-label`/`aria-expanded`/`type` | No comunica función ni estado abierto/cerrado | Añadir atributos ARIA |
| A4 | Burbuja WhatsApp **solapa** la barra inferior fija; `body` sin `padding-bottom` tapa el final del footer | Dos botones encimados (descuidado) + contenido oculto | Ocultar burbuja en móvil (`hidden md:flex`) + padding inferior |
| A5 | Contraste: `#2DB9A0` sobre blanco = **2.45:1** (requiere 4.5:1) en "Ver servicios" y "Llamar"; eyebrow "Sobre mí" 2.64:1 | CTAs poco legibles con baja visión o reflejos | Texto a `#1d766d` (5.4:1), ya en la paleta. Borde/acento sin cambios |
| A6 | Fuentes por `@import` en CSS → cadena bloqueante HTML→CSS→Google→fuentes | Retrasa el primer render | `preconnect` + `link` vía `customScripts.headStart` |
| **A7** | **Header apiñado entre 768 y ~820 px**: la nav de escritorio aparece en `md:` (768 px) sin espacio suficiente → el logo se parte en dos líneas, "Sobre mí" se parte y "Contacto" queda pegado/tapado por el botón de WhatsApp. Medido: a 768–808 px `nav.right == cta.left` (separación 0). A partir de 828 px se ve bien. | Defecto visible en tablets en vertical (iPad 768/810 px) — clase de dispositivo habitual | Subir el breakpoint de la nav a `lg:` (1024 px) y mostrar el menú hamburguesa por debajo, **o** acortar el CTA a "Agendar". Requiere decisión visual → **Etapa 3** |

### 🟡 Medio
| # | Problema | Impacto | Solución |
|---|---|---|---|
| M1 | **Sistema de diseño definido pero sin usar**: 86 `style={{}}` inline, 62 `fontFamily` repetidos, hex a mano (`#2DB9A0`×19, `#1a2e2b`×21, `#d6f2ed`×11); tokens `teal-100`/`teal-700`/`blue-soft`/`warm-*` con **0 usos** | Cambiar un color de marca exige ~20 ediciones manuales | Por partes: **45 `fontFamily:'Outfit'` son redundantes** (verificado: `html` ya la aplica y Fraunces solo va en elementos hoja) → borrar; Fraunces → `.font-display`; hex → tokens |
| M2 | `src/imports/pasted_text/enfermeria-domicilio-stgo.html` (324 líneas) sin referenciar | Confunde: parece código vivo | Eliminar (queda en git) o mover a `docs/` |
| M3 | Sin favicon | Icono genérico en pestaña y marcadores | Derivar del isotipo circular del header |
| M4 | Faltan `og:image`, `og:url`, `og:type`, `og:locale`, Twitter Cards, `canonical` | **Al compartir por WhatsApp —canal principal— no sale imagen de vista previa** | Completar en `site.json` + `customScripts` |
| M5 | Áreas táctiles: enlaces del menú móvil 20px de alto, hamburguesa 40×40 (mín. 44×44) | Toques fallidos; el público objetivo incluye personas mayores | Aumentar padding vertical y tamaño |
| M6 | Sin `prefers-reduced-motion` (hay `animate-pulse` y transiciones) | Molesto con sensibilidad al movimiento | `@media (prefers-reduced-motion: reduce)` en `index.css` |

### 🟢 Bajo
| # | Problema | Solución |
|---|---|---|
| B1 | `HowSection` y `CtaSection` sin `id` | Añadir por consistencia |
| B2 | Teléfono sin `pattern`; `window.open` puede bloquearse sin avisar | Validar y dar feedback |
| B3 | `App.tsx` con 989 líneas | Dividir en `components/` + `data/` **solo si** el sitio crece |
| B4 | Sin `sitemap.xml` | Añadir al activar la indexación |
| B5 | Menores disponibles: React 19.2.4→19.2.8, Vite 8.0.3→8.1.5, Tailwind 4.2.2→4.3.3 | Actualizar en QA |

---

## Etapas

Orden acordado: **0 → 1 → 2 → 4 → 3 → 5 → 6**
(La 4 se adelanta a la 3 porque la vista previa del enlace en WhatsApp da valor
de negocio inmediato, mientras la 3 requiere validación visual de la clienta.)

### [x] Etapa 0 — Documentación
Dejar memoria estable entre sesiones.
- [x] `CLAUDE.md` reescrito (antes solo contenía `@AGENTS.md`, que describía el
      entorno de Figma Make y ya no refleja la realidad: el deploy es Vercel)
- [x] `docs/ROADMAP.md` creado
- **Fin:** ambos archivos creados, concisos y sin solapamiento. ✅

### [x] Etapa 1 — Críticos y victorias rápidas · riesgo muy bajo
Corregir accesibilidad/SEO con cambios mínimos.
- [x] C2 · `language: es-CL` en `site.json` → HTML compilado con `lang="es-CL"`
- [x] A2 · `id="campo-*"` + `htmlFor` en los 4 campos
- [x] A3 · `type="button"`, `aria-label` dinámico, `aria-expanded`, `aria-controls="menu-movil"`
- [x] A4 · Burbuja WhatsApp `hidden md:flex` (en móvil ya está la barra inferior) + `pb-24 md:pb-0` en el contenedor raíz
- [x] M2 · Eliminado `src/imports/` (324 líneas, sin referencias; recuperable en git)
- [x] B1 · `id="como-solicitar"` y `id="cta"`
- **Verificado:** ✅ `lang=es-CL` en `dist/` · los 4 campos con label asociado y **clic en el label enfoca el input** · ARIA alterna correctamente al abrir/cerrar el menú · burbuja oculta en móvil, **0 solapes** · footer completamente visible (termina en 748px, la barra empieza en 767px) · las 8 secciones con `id` · **0 errores de consola** · **0 overflow horizontal** en 320/390/768/1280/1440/1920 · `tsc --noEmit` limpio · build OK (196ms).
- **Fin:** ✅ cumplido. Sin cambios de diseño; A4 solo corrige el defecto de solape.

> **Nota de método:** al medir el footer con `window.scrollTo` el test daba un falso
> negativo — `html { scroll-behavior: smooth }` en `index.css` anima el scroll y la
> medición ocurría antes de llegar al final. Con `behavior: 'instant'` + espera a que
> `scrollY` se estabilice, el resultado es correcto. Tenerlo en cuenta en futuros tests.

> **Fuera de alcance (movido a Etapa 3):** se probó agrandar el botón hamburguesa y
> el espaciado del menú móvil, pero eso es **M5** (áreas táctiles) y pertenece a la
> Etapa 3, que requiere validación visual de la clienta. Se revirtió para no mezclar.

### [~] Etapa 2 — Performance · A6 completado · A1 en espera de la imagen definitiva

- [x] **A6 · Fuentes fuera de la cadena de bloqueo**
  - `@import` eliminado de `src/index.css`; ahora `preconnect` + `<link rel="stylesheet">` en el `<head>` vía `customScripts.headEnd` de `site.json`.
  - Se usó `headEnd` (no `headStart`) para que `<meta charset>` siga siendo lo primero del `<head>`; las fuentes quedan igualmente antes del CSS de la app.
  - **Pesos recortados a los realmente usados**, verificado en runtime: se usan Outfit 400/500/600 y Fraunces 600/700. Se eliminaron de la URL **Outfit 300 y 700, y Fraunces 400 e itálica**, que no se usaban.
  - **Medido (build de producción, red emulada 4 Mbps / 60 ms latencia, media de varias pasadas):**

    | Métrica | Antes | Después | Δ |
    |---|---|---|---|
    | CSS de fuentes | 9 595 B | 5 183 B | **−46 %** |
    | Total fuentes | 106,6 KB | 102,3 KB | −4 % |
    | 1ª petición de fuente arranca | 713 ms | ~450 ms | **−263 ms (−37 %)** |
    | Última fuente lista | 867 ms | ~580 ms | **−287 ms (−33 %)** |
    | FCP | 968 ms | ~795 ms | **−173 ms (−18 %)** |

    Los archivos de fuente pesan lo mismo (97,3 KB): Google sirve fuentes variables y el
    navegador ya descargaba solo el subconjunto latino. La ganancia real está en **eliminar
    el salto de la cadena** (antes el CSS de fuentes no arrancaba hasta que se descargaba y
    parseaba `index.css`) y en un CSS de fuentes casi la mitad de grande.
  - **Sin regresión visual:** antes y después se descargan **exactamente las mismas 5 font-faces**
    (Fraunces 600/700, Outfit 400/500/600) y se usan las mismas 6 combinaciones. Verificado en
    desktop/tablet/mobile con `document.fonts.ready` antes de capturar.

- [x] **A1 (parcial) · `fetchpriority="high"` en el `<img>` del hero** — independiente de qué
      imagen se use, así que sirve igual con la definitiva.
- [ ] **A1 (pendiente) · Optimizar el asset del hero** — **la clienta va a sustituir la imagen**,
      así que convertir la actual sería trabajo desechable. Se hará cuando llegue la definitiva.

  > **Procedimiento para la imagen definitiva** (medido sobre la actual: 1342 KB → 109 KB, −92 %):
  > 1. Redimensionar a ~1100 px de ancho (se renderiza a 532 px; 1100 cubre pantallas 2×).
  > 2. Exportar a **WebP calidad 82** conservando el canal alfa (`Image.save(..., 'WEBP', quality=82, method=6)`).
  > 3. Añadir `width`/`height` al `<img>` con las dimensiones reales → evita CLS.
  >    **No se han puesto ahora a propósito:** con la imagen actual quedarían obsoletos y
  >    provocarían una reserva de espacio con proporción incorrecta.
  > 4. Comparar visualmente antes/después y comprobar que la transparencia se mantiene.

- **Fin:** ✅ A6 cumplido y verificado · ⏳ A1 a la espera de la imagen definitiva.

### [ ] Etapa 4 — SEO y compartir en redes · antes del lanzamiento
Que el enlace se vea bien al compartirlo y sea indexable.
- [ ] M3 · Favicon
- [ ] M4 · `og:image`, `canonical`, Twitter Cards
- [ ] B4 · `sitemap.xml`
- [ ] C1 · **Activar indexación — solo con el visto bueno final de la clienta**
- **Verificar:** validar la vista previa del enlace; comprobar `robots.txt` y metaetiquetas en el build.
- **Fin:** enlace con vista previa correcta e indexable.

### [ ] Etapa 3 — Contraste, accesibilidad y header en tablet · requiere validación de la clienta
Cumplir WCAG AA en elementos interactivos y corregir el apiñamiento del header.
- [ ] A5 · Texto de botones a `#1d766d`
- [ ] **A7 · Header apiñado en 768–820 px** (descubierto durante la Etapa 2; ver tabla de hallazgos)
- [ ] M5 · Áreas táctiles ≥ 44px
- [ ] M6 · `prefers-reduced-motion`
- **Verificar:** re-medir contraste; todos los interactivos ≥ 4.5:1.
- **Fin:** sin fallos AA en CTAs.
- **Riesgo:** **cambio visual sutil** — mostrar comparativa a la clienta antes de confirmar.

### [ ] Etapa 5 — Mantenibilidad · sin cambio visual
Que modificar la marca deje de costar 20 ediciones.
- [ ] M1a · Borrar las 45 `fontFamily: 'Outfit'` redundantes (riesgo cero)
- [ ] M1b · Fraunces → clase `.font-display`
- [ ] M1c · Hex repetidos → tokens de Tailwind
- **Verificar:** comparación visual antes/después **en cada sub-paso**.
- **Fin:** sin regresiones visuales y con los tokens en uso.
- **Riesgo:** bajo; hacerlo en **commits separados** para poder revertir.

### [ ] Etapa 6 — QA final
- [ ] B5 · Actualizar dependencias
- [ ] B2 · Validación del formulario
- [ ] Repaso en los 6 viewports
- [ ] Verificar el deploy en Vercel
- **Fin:** build limpio, sin errores de consola, aprobación de la clienta.

---

## Decisión de arquitectura

**Mantener la estructura actual.** Para una sola página informativa, `App.tsx`
con componentes locales es apropiado y fácil de mantener. La única evolución que
aportaría valor real (y solo si el sitio crece) es extraer datos a `src/data/` y
componentes a `src/components/` — pero **primero** la Etapa 5, porque es lo que
de verdad abarata cada cambio futuro.
