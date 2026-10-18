# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 (salida estática) + React 19 (islas con `client:*`) + TypeScript + Tailwind CSS v4 + Framer Motion. Formularios con React Hook Form + Zod. Build con pnpm. El stack ya existe y se conserva.

## Users

Reclutadores técnicos y líderes de equipo de empresa que evalúan perfiles full-stack en segundos, casi siempre llegando desde el CV, LinkedIn o GitHub. Audiencia secundaria confirmada: clientes freelance y colegas desarrolladores.

## Product Purpose

Carta de presentación profesional de **Imanol León**, Ingeniero de Sistemas y dev full-stack. Su trabajo es que un reclutador entienda en pocos segundos quién es, qué construye y cómo contactarlo. El éxito es: (1) generar una entrevista o contacto, y (2) demostrar skill técnico real a través del propio sitio.

## Positioning

Ingeniero **full-stack real**: construye sistemas completos de punta a punta, no solo front ni solo back. La prueba es **FootGamers** — plataforma de gestión de torneos que él diseñó e implementó entera: backend en Spring Boot/Java 25/JPA/PostgreSQL con JWT + OAuth2, y frontend en React 19/Vite/TypeScript. Un perfil así se diferencia de quien solo consume una API o solo pinta pantallas.

## Operating Context

- Se visita desde un enlace en el CV/LinkedIn/GitHub, en escritorio o móvil, con poco tiempo y a menudo en modo revisión rápida.
- Es una sola página (landing) con navegación por anclas: Hero, About, Projects, Contact.
- El primer viewport debe presentar al候选人 y su diferenciador de inmediato.

## Capabilities and Constraints

- Sección Hero con nombre, perfil y CTA (contacto / CV).
- Sección About con estadísticas y bio.
- Sección Projects: grilla de proyectos con modal de detalle. Contenido real ya cargado: **FootGamers** (proyecto #1). Los proyectos #2 a #6 son placeholders genéricos pendientes de reemplazar.
- Sección Contact: formulario validado (RHF + Zod) — hoy solo valida y muestra `alert`; sin backend de envío.
- Tema claro/oscuro persistido en `localStorage`.
- Botón "Download CV" inerte (sin archivo ni enlace todavía).
- Enlaces sociales y de proyecto aún genéricos/placeholder en varios puntos.
- Restricción: mantener Astro + islas de React + Tailwind v4 + TypeScript; no migrar de framework.
- Decisión pendiente de producto: idioma del sitio = **inglés** (ver Brand Commitments).

## Brand Commitments

- Nombre propio: **Imanol León**; rol: Ingeniero de Sistemas / Full-Stack Developer.
- Idioma del sitio: **inglés** (decidido por el usuario; reemplaza la mezcla EN/ES actual, que es un defecto a corregir).
- El look naranja (#F97316) sobre navy (#0B1120) actual **no es vinculante**: el usuario pidió explícitamente rediseñar/reemplazar la identidad visual. Trátalo como evidencia, no como autoridad.
- Tono: profesional, directo, técnico; sin humo ni claims inventados.

## Evidence on Hand

- **FootGamers**: proyecto real y completo, con datos verificados en los repos locales (`Proyectos_backend/FootGamer-s` y `Proyectos_fronted/foot_gamers`) y remotos en GitHub (`ImanolLeon/foot-gamers-backend`, `ImanolLeon/foot-gamers-fronted`). Es la pieza central de credibilidad.
- Foto de perfil real: `public/images/perfil.webp` (1122×1402, ya comprimida).
- 6 proyectos listados; solo FootGamers es real, los otros 5 son placeholders. **No inventar** enlaces, ni demos, ni métricas de proyectos placeholder.
- Sin CV en `public/` todavía; sin testimonios, clientes, ni benchmarks. No fabricar ninguno.

## Product Principles

1. El trabajo habla primero: muestra sistemas reales construidos, no adjetivos.
2. Full-stack de punta a punta como hilo narrativo (backend + frontend en cada proyecto).
3. Legibilidad en segundos para un reclutador con prisa; el contenido supera a la decoración.
4. Honestidad: sin claims ni métricas inventadas; lo que no existe se queda vacío o se etiqueta.
5. El propio sitio demuestra skill técnico (tipado, islas, accesibilidad, performance).

## Accessibility & Inclusion

Estándar web genérico sin requisito de producto específico confirmado, pero el sitio apunta a reclutadores: mínimo esperado = HTML semántico, foco visible, `prefers-reduced-motion` respetado, contraste AA, navegación por teclado y `aria` donde corresponda. Corregir el `lang` del documento para coincidir con el idioma elegido (inglés).
