# Portfolio — Imanol León

Portfolio web personal de **Imanol León**, Ingeniero de Sistemas y desarrollador full-stack. Sitio moderno, responsive y con modo claro/oscuro, construido con **Astro** + **React** (islas) + **TypeScript** + **Tailwind CSS** y animaciones con **Framer Motion**.

---

## 🎯 ¿Para qué se hizo este portafolio?

Este sitio no es solo una landing bonita: es mi **carta de presentación profesional** en la web. Nace de la necesidad de tener un único lugar donde mostrar, de forma clara y atractiva, quién soy, qué sé hacer y qué he construido.

Objetivos concretos:

- **Conseguir oportunidades laborales** — servir como enlace de referencia en mi CV, LinkedIn y GitHub, para que reclutadores y clientes vean mi perfil en segundos.
- **Demostrar mis habilidades técnicas de verdad** — no basta con decir "sé React y Java": el propio sitio es la prueba, ya que está construido con un stack moderno de front-end y buenas prácticas (componentes tipados, islas de React, validación de formularios, theming, accesibilidad).
- **Centralizar mis proyectos** — agrupar los trabajos más representativos (APIs de microservicios, automatizaciones con n8n, apps con React/Next.js) en tarjetas con descripción, stack y enlaces a código y demo.
- **Facilitar el contacto** — ofrecer un formulario directo para que cualquiera pueda escribirme sin fricción.
- **Reflejar mi identidad visual** — un diseño oscuro con acento naranja, animaciones sutiles y una estética limpia que comunica profesionalismo y atención al detalle.

**Público objetivo:** reclutadores técnicos, líderes de equipo, clientes freelance y colegas desarrolladores.

**Perfil que comunica:** desarrollo full-stack con **Java + Spring Boot** en el backend, **React + Next.js** en el frontend, microservicios escalables, contenedores con **Docker** y automatización de flujos con **n8n**, sobre entornos **Linux**.

---

## ✨ Características

- Tema oscuro (navy `#0B1120` / `#0F172A`) con acento naranja (`#F97316`) y **toggle de modo claro** persistido en `localStorage`.
- Navbar flotante con blur, enlaces de navegación y menú hamburguesa en móvil.
- Secciones: **Hero**, **About**, **Projects** y **Contact**.
- Hero con avatar SVG y **badges flotantes** de tecnologías (TypeScript, Next.js, Docker, n8n, Linux, Spring) animados.
- Animaciones de entrada al hacer scroll, hover en tarjetas y micro-interacciones.
- Formulario de contacto con validación **React Hook Form + Zod**.
- HTML accesible (`aria-label`, `alt`, labels asociados) y scroll suave.
- **Modal de detalle por proyecto**: al hacer clic en una tarjeta se abre una ventana con la descripción ampliada, las competencias aplicadas por tecnología (ej. qué se hizo con Spring Boot) y los enlaces a código y demo. Se cierra con `Escape`, clic fuera o el botón ✕.
- Datos de proyectos en un array tipado (`src/data/projects.ts`) para editar el contenido sin tocar los componentes.
- SEO básico (título y meta description) y favicon.

## 🧱 Stack

| Capa           | Tecnología                          |
| :------------- | :---------------------------------- |
| Framework      | Astro 7 (salida estática)           |
| UI interactiva | React 19 (islas con `client:*`)     |
| Lenguaje       | TypeScript                          |
| Estilos        | Tailwind CSS v4                     |
| Animaciones    | Framer Motion                       |
| Iconos         | lucide-react + SVG propios          |
| Formularios    | React Hook Form + Zod               |

## 📁 Estructura

```text
/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── placeholder*.svg      # imágenes de ejemplo para los proyectos
├── src
│   ├── components
│   │   ├── Navbar.tsx        # navegación + toggle de tema
│   │   ├── Hero.tsx          # presentación principal + redes
│   │   ├── About.tsx         # sobre mí + estadísticas
│   │   ├── Projects.tsx      # grilla de proyectos (abre el modal)
│   │   ├── ProjectModal.tsx  # modal con el detalle y competencias del proyecto
│   │   ├── Contact.tsx       # formulario validado
│   │   ├── Footer.tsx        # cierre + redes
│   │   └── icons.tsx         # iconos SVG de redes sociales
│   ├── data
│   │   └── projects.ts       # datos tipados de los proyectos
│   ├── layouts
│   │   └── Layout.astro      # <head>, fuentes y metadata
│   ├── pages
│   │   └── index.astro       # página única que compone las secciones
│   └── styles
│       └── global.css        # tema, colores y estilos base
├── astro.config.mjs
└── package.json
```

## 🧞 Comandos

| Comando          | Acción                                               |
| :--------------- | :--------------------------------------------------- |
| `pnpm install`   | Instala dependencias                                 |
| `pnpm dev`       | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build`     | Genera el sitio de producción en `./dist/`           |
| `pnpm preview`   | Previsualiza el build localmente                     |
| `pnpm astro ...` | Ejecuta comandos del CLI (ej. `astro check`)         |

> Requiere **Node >= 22.22.0**.

## ✏️ Personalización

- **Proyectos:** edita el array en `src/data/projects.ts` (título, descripción, imagen, stack, enlaces).
- **Redes sociales:** actualiza las URLs en `Hero.tsx` y `Footer.tsx` (hoy apuntan a los dominios genéricos).
- **CV:** agrega tu PDF en `public/` y enlázalo en el botón "Download CV" de `Hero.tsx`.
- **Colores y fuentes:** ajústalos en el bloque `@theme` de `src/styles/global.css`.
- **Formulario de contacto:** conecta `onSubmit` en `Contact.tsx` a un servicio de envío (Formspree, EmailJS, tu API, etc.); actualmente solo valida y muestra un `alert`.

## 🚧 Estado del proyecto

Funcional y compilando limpio (`astro check` sin errores, `astro build` OK). Pendiente de contenido real: textos de perfil definitivos, enlaces a proyectos y redes, CV descargable y backend del formulario.
