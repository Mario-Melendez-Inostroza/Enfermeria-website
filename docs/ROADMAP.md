# Roadmap de mejoras

Memoria operativa del proceso de pasar el mockup de Figma a web lista para
producción. Contexto del proyecto y convenciones: ver `../CLAUDE.md`.

**Estado:** `[ ]` pendiente · `[x]` completado
**Última auditoría:** 2026-07-30 · **Etapas completadas:** 0, 1, 2, 3, 4 · **Siguiente:** Etapa 5
**Dominio de producción:** `https://enfermeria-website.vercel.app` (confirmado en el panel de Vercel)

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
| ~~A1~~ | ~~`hero.png` 1342 KB, 1305×1060 renderizado a 532×432, **es el LCP**~~ | ~~~80% del peso de la página~~ | ✅ Resuelto con la imagen definitiva: `hero.webp` **96 KB**, `width`/`height` + `fetchpriority="high"` |
| A2 | Los 4 campos del formulario sin `id`/`htmlFor` | Lectores de pantalla no anuncian el campo; clicar el label no enfoca | Asociar `id` ↔ `htmlFor` |
| A3 | Botón hamburguesa sin `aria-label`/`aria-expanded`/`type` | No comunica función ni estado abierto/cerrado | Añadir atributos ARIA |
| A4 | Burbuja WhatsApp **solapa** la barra inferior fija; `body` sin `padding-bottom` tapa el final del footer | Dos botones encimados (descuidado) + contenido oculto | Ocultar burbuja en móvil (`hidden md:flex`) + padding inferior |
| ~~A5~~ | ~~Contraste: `#2DB9A0` sobre blanco = 2.45:1 en "Ver servicios" y "Llamar"; eyebrow "Sobre mí" 2.64:1~~ | — | ✅ Etapa 3 · texto a `#1d766d` / `#356E9E`. *Queda solo el h1, a decisión de la clienta* |
| A6 | Fuentes por `@import` en CSS → cadena bloqueante HTML→CSS→Google→fuentes | Retrasa el primer render | `preconnect` + `link` vía `customScripts.headStart` |
| ~~A7~~ | ~~Header apiñado entre 768 y ~820 px: logo partido en dos líneas y "Contacto" tapado por el botón de WhatsApp~~ | — | ✅ Etapa 3 · nav y CTA movidos a `lg:` (1024 px); hamburguesa por debajo |

### 🟡 Medio
| # | Problema | Impacto | Solución |
|---|---|---|---|
| M1 | **Sistema de diseño definido pero sin usar**: 86 `style={{}}` inline, 62 `fontFamily` repetidos, hex a mano (`#2DB9A0`×19, `#1a2e2b`×21, `#d6f2ed`×11); tokens `teal-100`/`teal-700`/`blue-soft`/`warm-*` con **0 usos** | Cambiar un color de marca exige ~20 ediciones manuales | Por partes: **45 `fontFamily:'Outfit'` son redundantes** (verificado: `html` ya la aplica y Fraunces solo va en elementos hoja) → borrar; Fraunces → `.font-display`; hex → tokens |
| M2 | `src/imports/pasted_text/enfermeria-domicilio-stgo.html` (324 líneas) sin referenciar | Confunde: parece código vivo | Eliminar (queda en git) o mover a `docs/` |
| ~~M3~~ | ~~Sin favicon~~ | — | ✅ Etapa 4 · `public/favicon.svg` derivado del isotipo |
| ~~M4~~ | ~~Faltan `og:image`, `og:url`, `og:type`, `og:locale`, Twitter Cards, `canonical`~~ | — | ✅ Etapa 4 · metadatos completos + `og-image.jpg` 1200×630 |
| ~~M5~~ | ~~Áreas táctiles: enlaces de 20px de alto, hamburguesa 40×40~~ (eran los del **footer**, no los del menú) | — | ✅ Etapa 3 · hamburguesa 48px, menú y footer con `min-h-11` |
| ~~M6~~ | ~~Sin `prefers-reduced-motion`~~ | — | ✅ Etapa 3 · bloque en `index.css` (incluye `scroll-behavior`) |

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

### [x] Etapa 2 — Performance · completada

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
- [x] **A1 (completado el 2026-08-02, al llegar la imagen definitiva)** — ver
      "Petición de la clienta" más abajo. `imagen_final.png` (2448 KB) → `hero.webp`
      (**96 KB, −96 %**), 1240×907, calidad 82, PSNR 37,4 dB. Añadidos `width`/`height`
      (se habían omitido a propósito mientras la imagen no era definitiva).
      Medido: **página completa 444 KB, LCP 568 ms**.

- **Fin:** ✅ A6 y A1 cumplidos y verificados.

### [x] Etapa 4 — SEO y compartir en redes · completada
*(C1 —activar la indexación— queda deliberadamente fuera: se ejecutará en el lanzamiento,
con la autorización de la clienta. Ver Etapa 6.)*

- [x] **M3 · Favicon** — `public/favicon.svg`, reproducción vectorial 1:1 del isotipo del header
      (círculo con degradado `#2DB9A0`→`#5B9BD5` + mismo glifo blanco). No se rediseñó nada.
      Comprobado a 16/32/48/64/96 px: de 32 px en adelante se lee bien; **a 16 px el glifo
      pierde detalle** y queda como marca de color (aceptable, es el tamaño de pestaña).
- [x] **M4 · Open Graph y Twitter Cards completos** — `og:type`, `og:url`, `og:locale` (`es_CL`),
      `og:site_name`, `og:image` (+ `width`/`height`/`type`/`alt`), `twitter:card`
      (`summary_large_image`), `twitter:title/description/image/image:alt`, `canonical`,
      `theme-color`, `author`, `geo.region`/`geo.placename`.
- [x] **og:image** — `public/og-image.jpg`, 1200×630, **71 KB**. Compuesta **solo con la identidad
      ya aprobada**: mismo isotipo, degradado del hero, blobs decorativos, tipografías Fraunces/Outfit
      y textos literales del propio sitio (titular del hero + servicios reales). Sin identidad nueva.
      Se generó en PNG (367 KB) y se pasó a **JPEG q92 → 71 KB (−81 %)** tras comparar recortes del
      texto ampliado: sin artefactos visibles.
- [x] **B4 · `sitemap.xml`** — preparado con una sola entrada (sitio de una página; las secciones
      son anclas, no URLs). Namespace `sitemaps.org` validado.
- [ ] **C1 · Activar indexación** — **sigue bloqueado a propósito** hasta que la clienta autorice.
      Único cambio pendiente: `robots.index` a `true` en `site.json`. Movido a la Etapa 6 (lanzamiento).

- **Verificado:** simulación del crawler leyendo **HTML crudo sin ejecutar JS** (así lo hacen
  WhatsApp/Facebook/X): las 20 etiquetas presentes y correctas · `og:image` y `canonical` con
  **URL absoluta** (WhatsApp no resuelve rutas relativas) · imagen realmente descargable
  (HTTP 200, cabecera JPEG válida, < 300 KB) · **doble bloqueo de indexación intacto**
  (`<meta robots="noindex, nofollow">` + `robots.txt` con `Disallow: /`) · `tsc` limpio ·
  build OK · sin cambios visuales en desktop/tablet/mobile.

> ✅ **Dominio confirmado** en el panel de Vercel: `https://enfermeria-website.vercel.app`.
> Verificado en el build que lo usan `canonical`, `og:url`, `og:image`, `twitter:image` y
> `sitemap.xml`, y que **no aparece ninguna URL de deployment con sufijo** (esas cambian en
> cada despliegue y romperían la vista previa). Si algún día se contrata dominio propio, se
> cambia en `site.json` (3 apariciones) y en `public/sitemap.xml`.

- **Fin:** ✅ completada. Metadatos, recursos y dominio verificados. Solo queda C1 en el lanzamiento.

### [x] Petición directa de la clienta (2026-08-02) — fuera del plan de etapas

Tres cambios pedidos tras revisar el preview. **Sí procedía tocar la identidad visual**
porque los pidió ella (ver la regla en `CLAUDE.md`).

- [x] **Logo del header más grande y más marcado** — "Salud y Estética" de `text-lg` a
      `text-2xl` y de `#1a2e2b` a `#12211F`; "en tu Hogar" de `text-xs`/`gray-500` a
      `text-sm`/`#4a6663`. El isotipo circular **no se tocó** (es la base del favicon).
      Fraunces 700 ya estaba en la URL de fuentes: no hizo falta añadir pesos.
- [x] **"Curaciones" → "Curaciones avanzadas"** en Servicios Enfermería.
- [x] **Imagen definitiva del Hero** (`imagen_final.png` → `public/images/hero.webp`).

> **La técnica anterior no servía.** La imagen previa era un recorte con transparencia
> real hecho con `rembg`; la nueva es una **foto completa de la escena, en RGB, sin
> ningún píxel transparente**. Como enfermera y paciente están **sentados** (silla y
> sofá), recortar solo a las personas los habría dejado flotando en el aire. Decisión
> acordada con el cliente: **foto completa con los bordes fundidos hacia el degradado
> del Hero.**

**Cómo se integró** (`HERO_MASK_X`/`HERO_MASK_Y` en `src/App.tsx`):

1. **Margen de sacrificio horneado en el asset.** Los sujetos llegaban casi al borde del
   encuadre, así que cualquier fundido lo bastante ancho para no leerse como rectángulo
   se los comía. Se amplió el lienzo (150/150/130/190 px) rellenando con los bordes
   propios extendidos y desenfocados. Esa franja se disuelve entera: **solo existe para
   que el fundido no toque a las personas.**
2. **Un degradado de máscara por eje, en elementos anidados.** Al anidarlos se
   multiplican de forma natural. Se descartó `mask-composite: intersect` porque **no se
   aplicó** (verificado en Chromium): las dos capas se unían en vez de intersectarse, y
   el fundido horizontal quedaba anulado por el vertical.
3. **La escala (`scale-110`) va en el elemento enmascarado, no en el `<img>` interior.**
   Puesta dentro, la imagen se salía de la caja de la máscara y, como `mask-repeat` es
   `repeat` por defecto, el degradado se **repetía** y reaparecía el borde duro.

Al ser una máscara y no una superposición, lo que asoma por el borde es el propio fondo
de la sección: **no puede aparecer halo blanco.** Se eliminó la sombra de contacto, que
existía para apoyar el recorte transparente en el suelo y ya no tenía sentido.

**Verificado:** transición de borde **medida píxel a píxel** en los cuatro lados —
gradual, sin ningún escalón (fue necesario, porque a ojo parecía un corte duro y el
contraste del propio contenido engañaba) · calidad WebP **PSNR 37,4 dB**, indistinguible
al 200 % de zoom sobre los rostros · **página 444 KB, LCP 568 ms** · logo en una sola
línea y sin colisión con la nav a 768/900/1024/1100/1200/1280/1440 px (sin regresión de
A7) · 0 overflow y 0 errores de consola en los 6 viewports · `tsc` y build limpios.

### [x] Etapa 3 — Contraste, accesibilidad y header en tablet · pendiente de visto bueno visual

- [x] **A5 · Contraste WCAG AA en elementos interactivos.** Colores calculados, no elegidos a ojo:

  | Elemento | Antes | Ahora | Ratio |
  |---|---|---|---|
  | Botón "Ver servicios" | `#2DB9A0` 2,45:1 ✗ | `#1d766d` | **5,43:1** ✓ |
  | Botón "Llamar" (barra móvil) | `#2DB9A0` 2,45:1 ✗ | `#1d766d` | **5,43:1** ✓ |
  | Check ✓ de los trust badges | `#2DB9A0` 2,45:1 ✗ | `#1d766d` | **5,43:1** ✓ |
  | Eyebrow "Sobre mí" | `#5B9BD5` 2,64:1 ✗ | `#356E9E` | **4,84:1** ✓ |

  `#1d766d` es el teal-700 que **ya estaba en la paleta**. `#356E9E` es la versión oscura del
  azul de marca `#5B9BD5` (la paleta no tenía un azul oscuro). **Los bordes teal `#2DB9A0` se
  mantienen**: solo se oscureció el texto, así que la identidad no cambia.

- [x] **A7 · Header apiñado en tablet.** Nav y CTA pasan de `md:` (768 px) a `lg:` (1024 px); por
      debajo se muestra el menú hamburguesa. Verificado a 768/800/820/900/1000/1024/1280 px:
      **sin logo partido y sin colisión** en ningún ancho.

- [x] **M5 · Áreas táctiles ≥ 44 px.** Hamburguesa `p-2`→`p-3` (40→48 px), enlaces del menú móvil
      con `min-h-11`, y **enlaces del footer** (que en realidad eran los que medían 20 px —
      ver nota abajo). Verificado: **0 elementos interactivos por debajo de 44 px**.

- [x] **M6 · `prefers-reduced-motion`.** Bloque en `index.css` que neutraliza animaciones y
      transiciones e incluye `scroll-behavior: auto` (el scroll suave también es movimiento).
      Verificado con `reducedMotion: 'reduce'` y comprobado que **sin la preferencia el sitio
      sigue animando igual**.

- [ ] **Pendiente de decisión de la clienta — h1 del hero.** "en la tranquilidad" en `#2DB9A0`
      da **2,45:1** y a 60 px necesitaría 3:1. **No se ha cambiado** porque es el elemento más
      identitario del sitio. Propuesta preparada: `#229487` (**teal-600, ya en la paleta**) →
      **3,71:1**, cumple AA con un oscurecimiento apenas perceptible. Es un cambio de una línea
      en `src/App.tsx` (`<span style={{ color: ... }}>` del h1).

> **Corrección de la auditoría inicial:** M5 decía "enlaces del menú móvil 20 px". Al verificar
> con el menú **abierto** resultó que los de 20 px eran los del **footer** (4 enlaces: Inicio,
> Servicios, Cobertura, Contacto); la medición original se hizo con el menú cerrado y los
> atribuyó mal. Se corrigieron ambos.

- **Verificado:** contraste re-medido sobre el fondo realmente pintado · header en 7 anchos ·
  0 interactivos < 44 px · reduced-motion activo y desactivado · 0 overflow en los 6 viewports ·
  0 errores de consola · `tsc` limpio · build OK · comparativas antes/después generadas.
- **Fin:** ✅ sin fallos AA en CTAs. Falta solo el visto bueno visual de la clienta y su decisión sobre el h1.

### [ ] Etapa 5 — Mantenibilidad · sin cambio visual
Que modificar la marca deje de costar 20 ediciones.
- [ ] M1a · Borrar las 45 `fontFamily: 'Outfit'` redundantes (riesgo cero)
- [ ] M1b · Fraunces → clase `.font-display`
- [ ] M1c · Hex repetidos → tokens de Tailwind
- **Verificar:** comparación visual antes/después **en cada sub-paso**.
- **Fin:** sin regresiones visuales y con los tokens en uso.
- **Riesgo:** bajo; hacerlo en **commits separados** para poder revertir.

### [ ] Etapa 6 — QA final y lanzamiento
- [ ] B5 · Actualizar dependencias
- [ ] B2 · Validación del formulario
- [ ] Repaso en los 6 viewports
- [ ] Verificar el deploy en Vercel
- [ ] **C1 · Activar la indexación** (`robots.index: true`) — **último paso, solo con la
      autorización explícita de la clienta.** Después: comprobar que `robots.txt` deja de
      servir `Disallow: /` y que desaparece `<meta name="robots" content="noindex, nofollow">`,
      y validar la vista previa del enlace en WhatsApp con el sitio ya publicado.
- **Fin:** build limpio, sin errores de consola, aprobación de la clienta.

---

## Decisión de arquitectura

**Mantener la estructura actual.** Para una sola página informativa, `App.tsx`
con componentes locales es apropiado y fácil de mantener. La única evolución que
aportaría valor real (y solo si el sitio crece) es extraer datos a `src/data/` y
componentes a `src/components/` — pero **primero** la Etapa 5, porque es lo que
de verdad abarata cada cambio futuro.
