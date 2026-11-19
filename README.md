# Salud y Estética en tu Hogar

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

> Sitio web de un servicio de enfermería y estética a domicilio en Santiago, con solicitud de horas por WhatsApp.

**Sitio en vivo:** [enfermeria-website.vercel.app/](https://enfermeria-website.vercel.app/)

## Sobre el proyecto

Sitio de presentación para un servicio de salud y estética a domicilio, dirigido a personas y familias de Santiago. Explica los servicios y facilita pedir una atención por WhatsApp. Al ser un servicio de salud, el sitio no publica datos de pacientes ni testimonios con información personal.

## Funcionalidades

- Servicios de enfermería y servicios estéticos
- Atención a domicilio por comuna
- Explicación de cómo solicitar una atención
- Contacto directo por WhatsApp
- Diseño responsive

## Stack

| Capa | Tecnología |
| --- | --- |
| Interfaz | React, TypeScript |
| Estilos | Tailwind CSS |
| Build | Vite |
| Hosting | Vercel (con `vercel.json`) |

## Estructura del proyecto

```text
src/             código de la aplicación
public/images/   imágenes del sitio
docs/            roadmap y documentación para IA (docs/ia)
vercel.json      configuración de Vercel
```

## Cómo ejecutarlo

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # vista previa del build
```

## Despliegue

El sitio se despliega en **Vercel**: cada push a la rama `main` genera un nuevo despliegue de producción.

## Documentación para trabajo con IA

El repositorio incluye el contexto que necesita un asistente de programación (o un nuevo desarrollador) para trabajar con criterio:

- [`AGENTS.md`](AGENTS.md): reglas y comandos para agentes de IA
- [`docs/ia/CONTEXTO.md`](docs/ia/CONTEXTO.md): objetivo, público y alcance del sitio
- [`docs/ia/REGLAS.md`](docs/ia/REGLAS.md): convenciones de código y de contenido
- [`docs/ia/DECISIONES.md`](docs/ia/DECISIONES.md): decisiones técnicas y su motivo
- [`docs/ia/ROADMAP.md`](docs/ia/ROADMAP.md): próximos pasos
- [`docs/ia/FLUJO-DE-TRABAJO.md`](docs/ia/FLUJO-DE-TRABAJO.md) y [`docs/ia/PROMPTS.md`](docs/ia/PROMPTS.md): flujo de trabajo con IA y plantillas de instrucciones

## Autor

**Mario Meléndez** — Estudiante de Ingeniería en Informática (Duoc UC) · Desarrollo web para pymes con **MM Digital Solutions**.
[Perfil de GitHub](https://github.com/Mario-Melendez-Inostroza)
