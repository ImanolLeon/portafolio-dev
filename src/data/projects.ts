import { boolean } from "astro:schema";
import { tr } from "zod/locales";

// ==========================================
// --- TIPOS E INTERFACES ---
// ==========================================

export interface ProjectCompetency {
  /** Tecnología o competencia aplicada (ej. "Spring Boot") */
  tech: string;
  /** Qué se hizo concretamente con esa tecnología: uno o varios puntos concretos */
  details: string[];
}

export interface Project {
  id: number;
  title: string;
  /** Descripción corta para la tarjeta */
  description: string;
  /** Descripción ampliada para el modal */
  longDescription: string;
  image: string;
  /** Galería de capturas para el carrusel del modal */
  gallery?: string[];
  tech: string[];
  /** Competencias y aportes concretos por tecnología */
  competencies: ProjectCompetency[];
  /** Resultados o características destacadas */
  highlights: string[];
  github: string;
  demo: string;
  inProduction?: boolean; 
  inDesarrollo?:boolean;
  inCompletado?:boolean;
}

// ==========================================
// --- DATOS DE LOS PROYECTOS ---
// ==========================================

export const projects: Project[] = [
  
  // ------------------------------------------
  // PROYECTO 1: FootGamers
  // ------------------------------------------
  {
    id: 1,
    title: "FootGamers",
    description:
      "Plataforma full-stack para gestionar torneos de fútbol 1v1: inscripciones, grupos, llaves de eliminación directa y clasificaciones en tiempo real.",
    longDescription:
      "Sistema completo para organizar torneos de fútbol individual. Los administradores crean torneos con cupo y cantidad de grupos, asignan a los participantes y el sistema arma el calendario; los jugadores se inscriben, confirman resultados y siguen su avance. Lo diseñé e implementé de punta a punta: backend en Spring Boot y frontend en React, con autenticación por JWT y login social.",
    image: "/placeholder1.svg",
    tech: ["Spring Boot", "React", "Docker"],
    competencies: [
      {
        tech: "Spring Boot",
        details: [
          "API por capas: controladores REST, interfaces de servicio, implementaciones y repositorios JPA.",
          "DTOs de request/response separados de las entidades.",
          "Validación de entrada y manejo global de excepciones (ApiException + @ControllerAdvice).",
          "Autenticación stateless con JWT mediante un filtro propio que valida el token en cada request.",
          "Contraseñas cifradas con BCrypt.",
          "Login social con Google y Discord vía OAuth2.",
          "Control de acceso por roles (ADMINISTRADOR / JUGADOR).",
        ],
      },
      {
        tech: "React",
        details: [
          "Dos paneles diferenciados por rol (administrador y jugador).",
          "Rutas protegidas mediante guardas de autenticación y rol.",
          "Contexto de sesión que persiste el token.",
          "Clientes HTTP tipados que normalizan los errores del backend.",
        ],
      },
      {
        tech: "Docker",
        details: [
          "Backend empaquetado con su Dockerfile de Spring Boot.",
          "Frontend servido por Nginx con proxy inverso hacia la API.",
        ],
      },
    ],
    highlights: [
      "Ciclo completo del torneo: inscripciones con cupo, grupos y fases (grupos, octavos, cuartos, semifinales y final)",
      "Generación automática de grupos (aleatoria, equilibrada o manual) y de llaves de eliminación directa",
      "Tablas de clasificación en tiempo real: puntos, victorias/empates/derrotas y diferencia de goles",
      "Dos paneles diferenciados por rol con rutas protegidas",
      "Tests unitarios con JUnit para autenticación y el filtro JWT",
    ],
    github: "https://github.com/ImanolLeon/foot-gamers-backend",
    demo: "https://github.com/ImanolLeon/foot-gamers-fronted",
    inDesarrollo:true,
  },

  // ------------------------------------------
  // PROYECTO 2: BellidoMap
  // ------------------------------------------
  {
    id: 2,
    title: "BellidoMap",
    description:
      "Sistema de gestión escolar full-stack: matrículas, estudiantes, apoderados, grados, secciones y aulas, con autenticación JWT.",
    longDescription:
      "Plataforma completa para administrar la información del Colegio María Parado de Bellido. El personal gestiona grados, secciones, aulas y turnos; registra a los estudiantes junto a sus apoderados y controla el ciclo de matrícula con sus estados (pendiente, realizada, cancelada). Los usuarios ingresan al portal con autenticación por JWT. Desarrollé una arquitectura por capas y una landing del colegio con portal de acceso para estudiantes.",
     image: "/images/bellido/principal.png",
    gallery: [
      "/images/bellido/principal.png",
      "/images/bellido/login.png", 
    ],
    tech: ["Spring Boot", "React", "PostgreSQL"],
    competencies: [
      {
        tech: "Spring Boot",
        details: [
          "API REST por capas: controladores, interfaces de servicio, implementaciones y repositorios JPA.",
          "DTOs de request/response separados de las entidades.",
          "Validación de entrada y manejo global de excepciones (ApiException y GlobalExceptionHandler).",
          "Autenticación stateless con JWT mediante un filtro propio por request.",
          "Contraseñas cifradas con BCrypt y control de acceso por roles.",
          "Datos de prueba iniciales mediante un DataSeeder.",
        ],
      },
      {
        tech: "React",
        details: [
          "Landing del colegio por secciones: niveles, propuesta, estadísticas, vida escolar y campus.",
          "Portal de acceso para estudiantes con formulario de login.",
          "Enrutado propio con la History API, sin librería de rutas.",
          "Estilos con Tailwind CSS v4 y React Compiler para optimizar renders.",
        ],
      },
      {
        tech: "PostgreSQL / JPA",
        details: [
          "Modelo del dominio: Usuario, Estudiante, Apoderado, Matrícula, Grado, Sección, Aula y Turno.",
          "Relaciones OneToOne, OneToMany y ManyToOne entre entidades.",
          "Cascada al borrar estudiantes y estado de matrícula como enum (PENDIENTE, REALIZADA, CANCELADA).",
        ],
      },
    ],
    highlights: [
      "Gestión integral de matrículas, estudiantes y apoderados",
      "Autenticación por JWT con contraseñas cifradas",
      "Arquitectura por capas con DTOs y manejo global de errores",
      "Landing del colegio con portal de acceso para estudiantes",
    ],
    github: "https://github.com/ImanolLeon/bellido-backend",
    demo: "https://github.com/ImanolLeon/bellido-fronted",
    inDesarrollo:true,
  },

  // ------------------------------------------
  // PROYECTO 3: Sistema de Reservas
  // ------------------------------------------
  {
    id: 3,
    title: "Sistema de Reservas ",
    description:
      "Sistema para reservar campos de fútbol con alquiler de balones y camisetas: horarios, estados de reserva, seguridad por roles y permisos.",
    longDescription:
      "Es un sistema de reservas para canchas de fútbol. El usuario elige un campo, la fecha, el día y la franja horaria, y puede añadir alquiler de balones y camisetas a la misma reserva. Cada campo registra su tamaño, su superficie (natural, sintético o losa) y su condición, y las reservas se gestionan con estados (disponible, pendiente o reservada). Está expuesto como API REST con Spring Boot y persistencia en MySQL. Es un proyecto únicamente de backend, sin frontend.",
    image: "/images/reserva-cancha/dashboard.png",
    gallery: [
      "/images/reserva-cancha/dashboard.png",
    ],
    tech: ["Spring Boot","NextJs", "MySQL", "Spring Security"],
    competencies: [
      {
        tech: "Spring Boot",
        details: [
          "API REST por capas: controladores, servicios y repositorios.",
          "DTOs de request/response con mappers propios.",
          "Manejo global de excepciones (ApiExcepcion y ExcepcionGeneral).",
          "Seguridad con roles y permisos (RBAC), contraseñas cifradas con BCrypt y sesión stateless.",
        ],
      },
      {
        tech: "Validaciones personalizadas",
        details: [
          "Anotaciones propias con ConstraintValidator para validar el formato de la hora.",
          "Validación del día y del id antes de guardar la reserva.",
          "Errores claros devueltos al cliente cuando la entrada no es válida.",
        ],
      },
      {
        tech: "Spring Data JPA",
        details: [
          "Modelo del dominio: campo de fútbol, reserva, reserva de balón, reserva de camiseta, balón, camiseta y usuario.",
          "Enums para el estado de la reserva, el tamaño, la superficie y la condición del campo.",
          "Relaciones OneToMany y OneToOne entre entidades.",
          "Filtrado dinámico de reservas con JPA Specifications: por día, fecha, nombre de campo y hora de inicio.",
          "Persistencia en MySQL y entorno de pruebas con H2.",
        ],
      },
    ],
    highlights: [
      "Reserva de campos de fútbol con alquiler de balones y camisetas",
      "Filtrado dinámico de reservas con JPA Specifications",
      "Validaciones personalizadas de hora, día e id",
      "Control de acceso por roles y permisos (RBAC)",
      "Cobertura de código medida con JaCoCo",
    ],
    github: "https://github.com/ImanolLeon/SistemaReservas",
    demo: "",
  
  },

  // ------------------------------------------
  // PROYECTO 4: Pet'Salud
  // ------------------------------------------
  {
    id: 4,
    title: "Pet'Salud",
    description:
      "Sistema de gestión veterinaria que integra un panel administrativo para la gestión de citas, clientes e historial clínico, junto con una landing page pública orientada a la captación de clientes.",
    longDescription:
      "Aplicación web para administrar una clínica veterinaria. Permite registrar a los clientes y sus mascotas (con foto, especie, raza, edad, sexo y peso), agendar citas por veterinario y llevar el historial clínico de cada consulta (diagnóstico, tratamiento y observaciones). Para evitar dobles reservas, cada cita es única por veterinario, fecha y hora. Se construyó como una aplicación MVC con vistas en Thymeleaf y seguridad por roles: el administrador gestiona el panel y los usuarios, el veterinario ve su agenda y la recepción administra las citas. Incluye una lading page para todo el publico interesado y un login que solo personal autorizado puede acceder a el.",
    image: "/images/gestion-veterinaria/landing.png",
    gallery: [
      "/images/gestion-veterinaria/landing.png",
      "/images/gestion-veterinaria/login.png",
      "/images/gestion-veterinaria/dashboard.png",
    ],
    tech: ["Spring Boot", "Thymeleaf","Mysql","Docker"],
    competencies: [
      {
        tech: "Spring Boot",
        details: [
          "Arquitectura MVC con controladores, servicios y repositorios.",
          "Inicio de sesión con formulario y contraseñas cifradas con BCrypt.",
          "Modelo del dominio: cliente, mascota, cita, historial clínico y veterinario.",
          "Relaciones OneToMany y OneToOne con borrado en cascada.",
          "Integración de la librería de JavaScript FullCalendar en el panel de administración para la gestión visual de citas."
        ],
      },
      {
        tech: "Thymeleaf",
        details: [
          "Vistas server-side con una plantilla base y fragments reutilizables (menú y layout).",
          "Formularios y listados para clientes, mascotas, citas e historial.",
          "Panel de administración y agenda del veterinario como vistas separadas.",
        ],
      },
    ],
    highlights: [
      "Gestión de clientes, mascotas, citas e historial clínico",
      "Subida de fotos de mascotas con nombre UUID",
      "Citas únicas por veterinario, fecha y hora (sin dobles reservas)",
      "Acceso por roles: administrador, veterinario y recepción",
      "Vistas server-side con Thymeleaf y fragments reutilizables",
    ],
    github: "https://github.com/ImanolLeon/PetPeru-gestionVeterinaria",
    demo: "https://petsalud.imanol.uk/",
    inProduction: true
  },
];