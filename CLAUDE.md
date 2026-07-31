# Salud y Estética en tu Hogar

Landing page **informativa** de una enfermera que ofrece atención de enfermería y
servicios estéticos a domicilio en Santiago, Chile. Su objetivo es presentar los
servicios y derivar el contacto a WhatsApp.

Sitio **estático**: sin backend, sin base de datos, sin autenticación, sin rutas.
Toda "conversión" termina en un enlace `wa.me`.

## Stack

- React 19 + TypeScript 5.9 (strict, `noUnusedLocals`/`noUnusedParameters`)
- Vite 8 · Tailwind CSS v4 (plugin `@tailwindcss/vite`, sin `tailwind.config`)
- Gestor de paquetes: **pnpm** (existe `pnpm-lock.yaml`; no usar `npm install`)
- Deploy: **Vercel** (autodetecta Vite → build `vite build`, salida `dist/`)

## Comandos

```bash
pnpm install
pnpm run dev      # http://localhost:8443
pnpm run build    # -> dist/
npx tsc --noEmit  # typecheck (el build de Vite NO valida tipos)
```

## Arquitectura

Deliberadamente plana. **No introducir router, gestor de estado, capa de
servicios ni patrones empresariales**: para una sola página informativa serían
complejidad sin retorno.

- `src/App.tsx` — la página entera (~990 líneas): iconos SVG inline, secciones
  como componentes locales, y los datos (servicios, comunas, pasos) como arrays
  dentro de cada componente.
- `src/index.css` — tokens `@theme` de Tailwind v4 (paleta teal/azul/warm),
  import de fuentes de Google, estilos globales.
- `.figma/make/site.json` — **fuente de la metadata del HTML** (`title`,
  `description`, `robots`, `icons`, `openGraph`, `customScripts`).
  `vite.config.ts` la inyecta en `index.html` al compilar.
- `public/images/` — assets estáticos servidos desde la raíz (`/images/...`).

`index.html` solo contiene marcadores `<!-- figma:* -->`; **no editarlo
directamente** para metadatos — se configuran en `site.json`.

> `vite.config.ts` importa `site.json` al arrancar: **tras editarlo hay que
> reiniciar el servidor de desarrollo** o seguirás viendo el valor anterior.

## Convenciones

- Secciones: un componente por sección en `App.tsx`, con `id` para el anclaje
  del menú (`#inicio`, `#servicios`, `#cobertura`, `#sobre-mi`, `#contacto`).
- Iconos: SVG inline `viewBox="0 0 24 24"`, `stroke="currentColor"`,
  `strokeWidth={2}`; el color se hereda del contenedor.
- Enlaces a WhatsApp: **siempre** con el helper `wa(mensaje)` de `App.tsx`
  (línea ~5). Nunca escribir una URL `wa.me` a mano.
- Todo enlace externo lleva `target="_blank"` + `rel="noopener noreferrer"`.
- Contenido en español de Chile. El sitio no tiene i18n ni la necesita.
- **Fuentes:** se cargan desde el `<head>` (`customScripts.headEnd` en `site.json`), no con
  `@import` en el CSS. La URL pide **solo los pesos en uso**: Outfit 400/500/600 y
  Fraunces 600/700. Si añades un peso nuevo (p. ej. `font-bold` en texto de cuerpo, que
  sería Outfit 700), **agrégalo también a esa URL**; si no, el navegador lo sintetiza y
  se ve peor.

## Identidad visual (no cambiar sin pedirlo la clienta)

| Uso | Color |
|---|---|
| Teal principal (acentos, iconos) | `#2DB9A0` |
| Teal oscuro (texto sobre claro) | `#1d766d` |
| Casi negro (títulos) | `#1a2e2b` |
| Azul secundario | `#5B9BD5` |
| Verde WhatsApp (CTAs) | `#25D366` |

Tipografías: **Fraunces** (serif, títulos y logo) · **Outfit** (sans, cuerpo).
`html` ya aplica Outfit globalmente en `index.css`.

## Reglas al modificar

- **No rediseñar por iniciativa propia.** El diseño actual está aprobado por la
  clienta; cambiar espaciados, colores o tipografías requiere una razón objetiva
  (accesibilidad, bug) o petición explícita.
- **Verificar visualmente** los cambios de UI en desktop, tablet y móvil antes
  de darlos por buenos, no solo compilar.
- No añadir dependencias sin justificación clara.
- `robots.index` está en `false` a propósito: el sitio es una vista previa para
  la clienta. **Activar la indexación solo cuando ella dé el visto bueno final.**

## Estado del trabajo

El plan de mejoras por etapas, con prioridades y estado de cada tarea, está en
**`docs/ROADMAP.md`** — consultarlo al empezar una sesión.
