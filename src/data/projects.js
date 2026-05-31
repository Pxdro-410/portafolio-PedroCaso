/*
 * Estructura de cada proyecto:
 * - id: slug único
 * - title: nombre del proyecto
 * - description: qué problema resuelve
 * - techRationale: por qué se eligieron esas tecnologías
 * - tags: tecnologías usadas (máx 6)
 * - github: URL al repositorio público
 * - live: URL del deploy (null si no está desplegado)
 * - featured: true para mostrarlo destacado
 * - hasBackend: true si tiene servidor propio
 * - hasDocker: true si incluye Docker
 * - category: 'fullstack' | 'frontend' | 'backend'
 * - gradient: clases Tailwind para el hover del card
 */

export const projects = [
  {
    id: 'parroquia-san-pedro',
    title: 'Sistema Parroquia San Pedro Nolasco',
    description:
      'Sistema web de gestión administrativa para una parroquia en Guatemala. Administra grupos parroquiales, reservas de espacios, ministros, eventos y notificaciones con control de acceso basado en roles (RBAC).',
    techRationale:
      'TypeScript asegura que los modelos del RBAC (roles, permisos, grupos) sean tipados y no rompan en runtime. Express fue elegido por su ecosistema maduro de middlewares de autenticación. MariaDB encaja con el servidor Linux del cliente sin licencias adicionales. Docker Compose levanta frontend, backend y base de datos con un solo comando, crítico para un equipo de varios desarrolladores.',
    tags: ['React', 'Express', 'TypeScript', 'MariaDB', 'Docker'],
    github: 'https://github.com/hmndzzl/Software_Proyecto',
    live: 'http://158.23.60.1/login',
    featured: true,
    hasBackend: true,
    hasDocker: true,
    category: 'fullstack',
    gradient: 'from-indigo-500/20 to-violet-500/20',
  },
  {
    id: 'tienda-electronicos',
    title: 'Gestión de Tienda de Electrónicos',
    description:
      'Plataforma completa para un negocio de electrónicos. Cubre inventario, movimientos, ganancias y stock con autenticación JWT, backend Nitro, PostgreSQL y tests con Vitest — todo dockerizado en monorepo.',
    techRationale:
      'Nitro genera rutas automáticamente desde el sistema de archivos, reduciendo el código repetitivo frente a Express. PostgreSQL maneja las transacciones de inventario con garantías ACID completas. JWT mantiene la sesión sin estado en el servidor, simplificando el escalado horizontal. Vitest corre en el mismo proceso que Vite, haciendo los tests significativamente más rápidos que con Jest. Todo dockerizado para que cualquier integrante del equipo levante el monorepo sin configurar nada localmente.',
    tags: ['React', 'Nitro', 'PostgreSQL', 'Docker', 'JWT', 'Vitest'],
    github: 'https://github.com/Pxdro-410/Proy2-PedroCaso/tree/proy2/web',
    live: 'https://proy2web.netlify.app/login',
    featured: true,
    hasBackend: true,
    hasDocker: true,
    category: 'fullstack',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'f1-ratings-api',
    title: 'F1 Ratings — API REST',
    description:
      'API REST construida en Go que expone datos de pilotos de Fórmula 1 y su sistema de ratings. Devuelve únicamente JSON, agnóstica al cliente — puede ser consumida desde cualquier frontend, app móvil o script.',
    techRationale:
      'Go fue elegido por su capacidad de manejar concurrencia nativa con goroutines, ideal para una API que sirve múltiples peticiones simultáneas y tambien su facilidad de configuración para APIs. La librería estándar net/http es suficiente para este caso sin necesidad de frameworks extra, lo que reduce dependencias y simplifica el binario. Docker empaqueta el binario compilado en una imagen mínima. Railway despliega automáticamente con cada push al branch main sin configuración de infraestructura.',
    tags: ['Go', 'REST API', 'Docker', 'Railway'],
    github: 'https://github.com/Pxdro-410/Proy1web-backend-PC',
    live: 'https://proy1web-backend-pc-production.up.railway.app/piloto',
    featured: true,
    hasBackend: true,
    hasDocker: true,
    category: 'backend',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'f1-web-client',
    title: 'F1 Ratings — Web Client',
    description:
      'Cliente web para gestionar y calificar pilotos de F1. Construido con HTML, CSS y JavaScript vanilla — sin frameworks, sin librerías. Consume la API REST anterior mediante fetch() nativo y manipulación del DOM pura.',
    techRationale:
      'Cero dependencias por decisión deliberada: el objetivo era demostrar dominio de la plataforma web nativa. Fetch API con async/await maneja las peticiones a la API de Go. CSS puro, sin bundler ni npm, solo los fundamentos del navegador.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    github: 'https://github.com/Pxdro-410/Proy1web-frontend-PC',
    live: 'https://proy1web-formula1-pc.netlify.app/',
    featured: false,
    hasBackend: false,
    hasDocker: false,
    category: 'frontend',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
  {
    id: 'snake-react',
    title: 'Snake con React',
    description:
      'Implementación del clásico juego Snake en React. Demuestra el uso de componentes modulares, props, y manejo del ciclo de vida con hooks (useState, useEffect, useRef) para controlar el estado del juego en tiempo real.',
    techRationale:
      'Se implementa React para el manejo de estados y animaciones. El loop del juego usa useEffect con setInterval para el tick de estado por frame. useRef evita que el handler del teclado se recree en cada render, eliminando bugs de stale closure. El tablero se modela como array plano de celdas, lo que simplifica la detección de colisiones sin librerías de física externas. Vite proporciona HMR instantáneo durante el desarrollo.',
    tags: ['React', 'Vite', 'TypeScript'],
    github: 'https://github.com/Pxdro-410/Lab6Snake-web-PC',
    live: null,
    featured: false,
    hasBackend: false,
    hasDocker: false,
    category: 'frontend',
    gradient: 'from-emerald-500/20 to-green-500/20',
  },
  {
    id: 'calculadora-react',
    title: 'Calculadora con React + TypeScript',
    description:
      'Calculadora web construida con React, Vite y TypeScript. Enfocada en diseño de componentes tipados, testing con Vitest, documentación con Storybook y linting con ESLint.',
    techRationale:
      'TypeScript añade tipado a los props y estado de cada componente, atrapando errores en compilación antes de que lleguen al browser. Storybook aísla y documenta cada componente visualmente sin montar toda la app. Vitest con coverage muestra exactamente qué ramas de la lógica están testeadas. ESLint con la config de React asegura las reglas de hooks y buenas prácticas de componentes.',
    tags: ['React', 'TypeScript', 'Storybook', 'Vitest', 'ESLint'],
    github: 'https://github.com/Pxdro-410/lab7-web1PC',
    live: 'http://35.255.29.219/lab7web-pc/',
    featured: false,
    hasBackend: false,
    hasDocker: false,
    category: 'frontend',
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
  },
  {
    id: 'fortnite-blog',
    title: 'Fortnite Blog',
    description:
      'Mini-blog de skins y cosméticos de Fortnite construido con React Router y Vite. Consume la API REST pública de Fortnite como fuente de datos externa, sin backend propio.',
    techRationale:
      'React Router v6 maneja la navegación entre páginas del blog con rutas anidadas sin recarga completa. La API pública de Fortnite es gratuita y sin autenticación, ideal para practicar el patrón useEffect + fetch con manejo de loading, error y empty states. Vite proporciona HMR instantáneo y un bundle optimizado para producción.',
    tags: ['React', 'Vite', 'React Router', 'REST API'],
    github: 'https://github.com/Pxdro-410/Ejercicio4React-PC',
    live: null,
    featured: false,
    hasBackend: false,
    hasDocker: false,
    category: 'frontend',
    gradient: 'from-sky-500/20 to-blue-500/20',
  },
]
