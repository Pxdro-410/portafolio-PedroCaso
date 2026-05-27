/*
 * Estructura de cada proyecto:
 * - id: slug único
 * - title: nombre del proyecto
 * - description: qué problema resuelve
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
    tags: ['Go', 'REST API', 'Docker', 'Railway'],
    github: 'https://github.com/Pxdro-410/Proy1web-backend-PC',
    live: 'https://proy1web-backend-pc-production.up.railway.app/piloto',
    featured: false,
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
    tags: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    github: 'https://github.com/Pxdro-410/Proy1web-frontend-PC',
    live: 'https://proy1web-formula1-pc.netlify.app/',
    featured: false,
    hasBackend: false,
    hasDocker: false,
    category: 'frontend',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
]
