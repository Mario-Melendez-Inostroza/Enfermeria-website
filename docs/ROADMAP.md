# Roadmap de mejoras

Memoria operativa del proceso de pasar el mockup de Figma a web lista para
producción. Contexto del proyecto y convenciones: ver `../CLAUDE.md`.

**Estado:** `[ ]` pendiente · `[x]` completado
**Última auditoría:** 2026-08-03 (indexación activada) · **Etapas completadas:** 0, 1, 2, 3, 4, 5, 6
**Indexación:** ✅ activa desde 2026-08-03 — `robots.index: true`, sin bloqueos, Lighthouse SEO 100/100
**Dominio de producción:** `https://saludyestetica.cl` (dominio definitivo, activo desde 2026-08-03;
reemplaza al provisional `enfermeria-website.vercel.app` usado durante el preview)

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
| ~~C1~~ | ~~`robots.index: false` → `noindex` + `Disallow: /`~~ | ~~Google no indexaba~~ | ✅ Resuelto: indexación activada el 2026-08-03, `robots.txt` permite rastreo completo |
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
| ~~M1~~ | ~~Sistema de diseño definido pero sin usar~~: 86 `style={{}}` inline, 62 `fontFamily` repetidos, hex a mano | — | ✅ Etapa 5 · 47 `fontFamily:'Outfit'` borrados, 17 Fraunces → `.font-display`, 67 hex → `var(--color-*)`. `style={{}}` bajó de 91 a 74 (lo que queda no tenía token exacto) |
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

> ✅ **Dominio definitivo activo** (2026-08-03): `https://saludyestetica.cl`, pedido
> directo de la clienta. Reemplazó al dominio provisional de Vercel en las **3
> apariciones** de `site.json` (`openGraph.image`, `canonical`, `og:url`) y en
> `public/sitemap.xml`. Confirmado con grep que no queda ninguna referencia al dominio
> anterior en el código fuente.
>
> **Verificado en el build de producción** (`dist/index.html`, `dist/sitemap.xml`,
> `dist/robots.txt`): las 20 etiquetas de metadatos usan `saludyestetica.cl` con **URL
> absoluta** · `og-image.jpg` descarga en HTTP 200 (JPEG, 71 KB) · favicon y sitemap
> accesibles · simulación de crawler (HTML crudo, sin ejecutar JS — así lo leen
> WhatsApp/Facebook/X) confirma que verán el dominio correcto · **doble bloqueo de
> indexación sigue intacto** (`noindex, nofollow` + `Disallow: /`, no se activó) ·
> **0 referencias a `http://`** en el HTML compilado ni en `src/` — todos los recursos
> (fuentes, imagen OG, assets) son `https://` o rutas relativas, sin contenido mixto ·
> `tsc --noEmit` y build limpios.

- **Fin:** ✅ completada. Metadatos, recursos y **dominio definitivo** verificados de punta a punta.

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

### [x] Etapa 3 — Contraste, accesibilidad y header en tablet · completada

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

- [x] **H1 del hero — aplicado el 2026-08-03.** "en la tranquilidad" pasa de `#2DB9A0`
      (2,45:1, no cumplía) a **`#229487`** (teal-600, ya estaba en la paleta). Medido contra
      los tres puntos del degradado del Hero (`#f0faf8`/`#EBF3FB`/`#f8f4f0`): **3,32:1 a
      3,49:1**, cumple AA (≥3:1 para texto grande) en los tres casos. Oscurecimiento apenas
      perceptible, confirmado visualmente. Cambio de una línea en `src/App.tsx`.

> **Corrección de la auditoría inicial:** M5 decía "enlaces del menú móvil 20 px". Al verificar
> con el menú **abierto** resultó que los de 20 px eran los del **footer** (4 enlaces: Inicio,
> Servicios, Cobertura, Contacto); la medición original se hizo con el menú cerrado y los
> atribuyó mal. Se corrigieron ambos.

- **Verificado:** contraste re-medido sobre el fondo realmente pintado · header en 7 anchos ·
  0 interactivos < 44 px · reduced-motion activo y desactivado · 0 overflow en los 6 viewports ·
  0 errores de consola · `tsc` limpio · build OK · comparativas antes/después generadas.
- **Fin:** ✅ sin fallos AA en CTAs ni en el h1. Etapa cerrada por completo el 2026-08-03.

### [x] Etapa 5 — Mantenibilidad · completada (2026-08-03) · sin cambio visual

- [x] **M1a · Borradas las 47 `fontFamily: 'Outfit'` redundantes** (2 más de las 45
      estimadas en la auditoría: aparecieron al agregar el logo y las redes sociales
      en trabajo posterior). `html` en `src/index.css` ya aplica Outfit globalmente,
      así que sobraban en cualquier elemento que no fuera Fraunces. Incluye también el
      `fontFamily: 'Outfit, system-ui, sans-serif'` del `<div>` raíz de `App()`, con la
      misma razón, que no había entrado en el conteo original.
- [x] **M1b · Los 17 usos de `fontFamily: 'Fraunces, Georgia, serif'` migrados a la
      clase `.font-display`** (ya definida en `src/index.css`, mismo valor exacto).
      Un caso (logo del header) ya tenía la clase puesta y el estilo inline quedaba
      duplicado sin usarse; se limpió el duplicado.
- [x] **M1c · 67 apariciones de 8 colores hex con token exacto en la paleta**
      (`#2DB9A0`, `#d6f2ed`, `#f0faf8`, `#1d766d`, `#5B9BD5`, `#EBF3FB`, `#77cec2`,
      `#229487`) reemplazadas por `var(--color-teal-*)` / `var(--color-blue-soft)` /
      `var(--color-blue-light)`, que ya declara `@theme` en `src/index.css`. Se dejaron
      sin tocar los hex que **no tienen un token equivalente exacto** en la paleta
      (`#1a2e2b`, `#25D366` —verde de marca de WhatsApp—, `#4a6663`, `#356E9E`,
      `#12211F`, y tres colores puntuales del degradado del Hero): inventar un token
      nuevo para esos habría sido una decisión de diseño fuera del alcance de esta
      etapa, no un refactor mecánico.

- **Verificado tras cada sub-paso:** `tsc --noEmit` y build limpios · captura de página
  completa (desktop 1280px y móvil 390px) antes/después de M1a+M1b y de M1c, comparadas
  **píxel a píxel** (no a ojo). Resultado: **0 diferencias en desktop**; en móvil, un
  único clúster de diferencias resultó ser antialiasing del texto nativo del `<select>`
  "Selecciona tu comuna" (mismo texto, misma posición, solo el suavizado de las letras
  varía) — confirmado como ruido de renderizado y no un cambio real: 3 capturas
  consecutivas del build final en esa misma región dieron 0 píxeles de diferencia entre
  sí, y un intento de realinear la comparación con desplazamientos de ±2 px no redujo el
  conteo, descartando que fuera un desplazamiento de layout. También se confirmó por
  separado que el punto `animate-pulse` de "Disponible en Santiago" cambia de píxeles
  entre dos capturas del **mismo** build (fase de la animación en el instante de la
  captura), así que esa fuente de ruido ya era conocida y se excluyó del análisis.
  0 overflow y 0 errores de consola en los 6 viewports estándar.

- **Fin:** ✅ sin regresiones visuales, tokens en uso donde existía un equivalente
  exacto. Quedan **74 `style={{}}`** (bajaron de 91): son props que no son fuente ni
  color con token exacto (background con gradientes, boxShadow, borderColor sin
  token, etc.) — no se tocaron, no era el objetivo de esta etapa.

### [x] Etapa 6 — QA final y lanzamiento · completada

Auditoría completa (2026-08-03) hecha como revisión senior — código, rendimiento,
accesibilidad, SEO, UX, responsive, seguridad, buenas prácticas y mantenibilidad — con
la condición explícita de no alterar el diseño aprobado. **Todo lo implementable sin
tocar el diseño quedó implementado**; lo que sí requería una decisión visual se dejó
documentado en vez de improvisarlo (ver más abajo).

- [x] **B5 · Dependencias actualizadas dentro de los rangos `^` ya declarados**
      (`pnpm update`, sin saltos de mayor): `react`/`react-dom` → 19.2.8, `vite` →
      8.2.0, `tailwindcss` + `@tailwindcss/vite` → 4.3.3, `@vitejs/plugin-react` →
      6.0.5, tipos al día. **Fuera de rango, no tocados sin decisión explícita**:
      `typescript` (5→7), `@types/node` (22→26), `oxfmt` (0.2→0.61) — son saltos
      mayores que podrían romper algo; quedan para una revisión planeada aparte.
- [x] **B2 · Formulario** — `window.open` ahora lleva `'noopener,noreferrer'` y, si el
      navegador bloquea el popup, cae a `location.href` para que el usuario no se
      quede sin respuesta. El teléfono tiene `pattern="[+]?[0-9 ]{8,15}"` con mensaje
      de validación.
- [x] **Seguridad · cabeceras HTTP** — no existían. Se creó `vercel.json` con
      `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
      `Permissions-Policy` y una `Content-Security-Policy` (`script-src 'self'`;
      `style-src` necesita `'unsafe-inline'` porque el sitio usa `style={{}}` de React
      en vez de solo clases — es el único trade-off, documentado aquí). **No se pueden
      probar cabeceras HTTP contra un `vite preview` local** (Vercel las aplica en su
      capa de routing) — **verificar una vez con `securityheaders.com` o `curl -I`
      después del próximo deploy**, sobre todo que Google Fonts y los enlaces a
      WhatsApp sigan funcionando.
- [x] **Accesibilidad** — 2 `<nav>` (header/footer) sin distinguir → `aria-label`
      añadido a cada uno; menú móvil pasó de `<div>` a `<nav>` con su propio label;
      8 emoji/símbolos puramente decorativos (✓, 🏠, 🏡, 📱🕐📍) marcados
      `aria-hidden="true"` para que un lector de pantalla no los anuncie por su nombre
      cuando el texto de al lado ya dice lo mismo; botón "Enviar otro mensaje" sin
      `type="button"` corregido; **skip-link activado** (`accessibility.addBypassLinks`
      en `site.json`) — el plugin de Figma Make traía el texto hardcodeado en inglés
      ("Skip to content"), se tradujo a "Saltar al contenido" en `vite.config.ts`.
      Solo es visible al navegar con Tab, no cambia el diseño visual normal.
- [x] **SEO** — meta description de 184 caracteres (Google trunca ~155-160) acortada a
      136 sin perder los servicios mencionados; datos estructurados **JSON-LD
      `LocalBusiness`** añadidos (nombre, teléfono, comunas de cobertura, dirección) —
      mejora la posibilidad de resultados enriquecidos, no se renderiza en la página.
- [x] **Rendimiento** — `scroll` listener del header sin `{ passive: true }`
      (`src/App.tsx`), micro-optimización estándar.
- [x] **Mantenibilidad** — `#aee4da` hardcodeado en `src/index.css` (scrollbar) era
      exactamente `--color-teal-200`; quedó fuera del barrido de la Etapa 5 porque esa
      etapa solo tocó `App.tsx`. Migrado al token.
- [x] **Repaso en los 6 viewports** (320/390/768/1280/1440/1920): 0 overflow, 0
      errores de consola. **Diff de página completa píxel a píxel** contra el estado
      previo a esta etapa: **0 diferencias en móvil**; en desktop, el único resto (60
      píxeles) coincide exactamente con el punto `animate-pulse` de "Disponible en
      Santiago" ya caracterizado como ruido de animación en la Etapa 5 — confirmado,
      no un cambio real.

> **Documentado, no implementado — requiere una decisión de la clienta:**
> **`apple-touch-icon`** para iOS. El favicon SVG actual no cubre el ícono de pantalla
> de inicio en iOS (usa un PNG dedicado de 180×180). Generarlo bien implica decidir
> cuánto relleno/zona segura dejar alrededor del isotipo para que no se vea recortado
> con las esquinas redondeadas que aplica iOS — es una micro-decisión sobre un asset de
> marca, no un cambio mecánico, así que no se improvisó.

- [x] **C1 · Indexación activada (2026-08-03), con autorización explícita del cliente**
      — dominio definitivo `https://saludyestetica.cl` ya en producción.
  - `robots.index: true` en `site.json` → la etiqueta `<meta name="robots" ...>`
    **ya no se genera** (el plugin solo la agrega cuando `index === false`).
    Confirmado con grep sobre `dist/index.html`: cero apariciones de
    `robots`/`noindex`/`nofollow`.
  - `vite.config.ts` — antes, cuando `index` no era `false`, no se generaba **ningún**
    `robots.txt` (string vacío). Se cambió la lógica para que en ese caso emita uno
    explícito: `User-agent: *` / `Allow: /` / `Sitemap: https://saludyestetica.cl/sitemap.xml`.
    Preferible a dejar el archivo ausente: es explícito y ayuda a los crawlers a
    encontrar el sitemap directamente.
  - **Lighthouse SEO: 100/100.** El audit `is-crawlable` ("Page isn't blocked from
    indexing") pasa con score 1 y **cero directivas de bloqueo detectadas**.
  - **Re-auditoría SEO completa** (misma metodología de la Etapa 4: HTML crudo, sin
    ejecutar JS, como lo leen los crawlers reales): canonical, las 20 etiquetas
    Open Graph/Twitter, JSON-LD y `sitemap.xml` — todos apuntan a
    `https://saludyestetica.cl` con URL absoluta. `robots.txt`, `sitemap.xml` y
    `og-image.jpg` responden HTTP 200.
  - Actualizado el comentario desactualizado en `public/sitemap.xml` que aún decía
    "mientras robots.index sea false" (arrastrado desde la Etapa 4).
  - 0 overflow y 0 errores de consola en los 6 viewports · `tsc` y build limpios ·
    **sin cambios de diseño ni de contenido visible**, tal como se pidió.
- [ ] Verificar el deploy en Vercel con el build final (incluye confirmar las
      cabeceras de seguridad en producción, ver nota de `vercel.json` en el bloque
      anterior — es lo único que no se pudo probar en local).

- **Fin:** ✅ Etapa 6 completada. Build limpio, sin errores de consola, sin cambios de
  diseño, indexación activa y verificada. Solo queda confirmar las cabeceras HTTP una
  vez que el build llegue a producción.

---

## Decisión de arquitectura

**Mantener la estructura actual.** Para una sola página informativa, `App.tsx`
con componentes locales es apropiado y fácil de mantener. La única evolución que
aportaría valor real (y solo si el sitio crece) es extraer datos a `src/data/` y
componentes a `src/components/` — pero **primero** la Etapa 5, porque es lo que
de verdad abarata cada cambio futuro.
